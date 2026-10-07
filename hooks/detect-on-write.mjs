#!/usr/bin/env node
// PostToolUse (Write|Edit|MultiEdit): runs the pinned Impeccable detector on a styled file the
// moment it is written. Advisory only, never blocking: the detector flags stylistic choices
// (glow, a dark foundation, a particular font) that a brief can legitimately want, so blocking
// on it would make the hook expensive enough to switch off.
// Stays silent when the detector isn't installed, the file isn't styled, or the project has
// opted out with .interface-craft/no-detect.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readStdin, parseJson, readJsonFile, emit, projectDir, failOpen } from './lib.mjs';

const STYLED = new Set(['.css', '.scss', '.sass', '.less', '.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte', '.astro']);
const scanner = process.env.INTERFACE_CRAFT_SCANNER || fileURLToPath(new URL('../tools/scan-design.mjs', import.meta.url));

await failOpen(async () => {
  const input = parseJson(await readStdin());
  const file = input?.tool_input?.file_path;
  if (!file || !STYLED.has(path.extname(file).toLowerCase()) || !fs.existsSync(file)) return;
  if (/[\\/](node_modules|\.git|dist|build)[\\/]/.test(file)) return;
  const root = projectDir(input);
  if (fs.existsSync(path.join(root, '.interface-craft', 'no-detect'))) return;
  if (!fs.existsSync(scanner)) return;

  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'ic-detect-'));
  try {
    spawnSync(process.execPath, [scanner, '--mode', 'source', '--target', file, '--out', out, '--root', root], {
      encoding: 'utf8', timeout: 35000, windowsHide: true,
    });
    const report = readJsonFile(path.join(out, 'scan-report.json'));
    const findings = report?.normalized?.findings || [];
    if (!report || report.status === 'operational-failure' || !findings.length) return;

    const lines = findings.slice(0, 8).map((f) => {
      const where = f.line ? `:${f.line}` : '';
      const note = f.candidateHardGate ? ' (accessibility candidate: confirm before treating as a defect)' : '';
      return `- ${f.disposition}  ${f.ruleId}  ${path.basename(f.file || file)}${where}${note}`;
    });
    if (findings.length > 8) lines.push(`- ...and ${findings.length - 8} more`);
    const message = [
      `interface-craft detector on ${path.basename(file)} (advisory, not blocking):`,
      ...lines,
      'Stylistic items are critique, not defects: keep them if the brief or DESIGN.md\'s lint exceptions call for them. Turn this off for the project with .interface-craft/no-detect.',
    ].join('\n');
    emit({ hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: message } });
  } finally {
    fs.rmSync(out, { recursive: true, force: true });
  }
});
