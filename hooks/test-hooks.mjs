#!/usr/bin/env node
// Heartbeat for the hooks. The hooks fail open by design, so a broken hook is silent;
// this proves each one still emits valid JSON on this machine. Run: node hooks/test-hooks.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const results = [];

function run(script, input, env = {}) {
  const r = spawnSync(process.execPath, [path.join(here, script)], {
    input: JSON.stringify(input), encoding: 'utf8', timeout: 60000, env: { ...process.env, ...env }, windowsHide: true,
  });
  let json = null;
  if (r.stdout.trim()) { try { json = JSON.parse(r.stdout); } catch { json = 'INVALID'; } }
  return { status: r.status, stdout: r.stdout, json };
}

function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
}

const project = fs.mkdtempSync(path.join(os.tmpdir(), 'ic-hooktest-'));
const env = { CLAUDE_PROJECT_DIR: project };
try {
  // Routing directive
  const route = run('route-directive.mjs', { prompt: 'make it warmer' }, env);
  check('route-directive emits a UserPromptSubmit directive', route.status === 0 && route.json?.hookSpecificOutput?.hookEventName === 'UserPromptSubmit' && /route skill/.test(route.json.hookSpecificOutput.additionalContext));

  // Stop gate
  const dir = path.join(project, '.interface-craft');
  fs.mkdirSync(dir, { recursive: true });
  const gateInput = { stop_hook_active: false, cwd: project };
  check('blocking-gate is silent without findings.json', run('blocking-gate.mjs', gateInput, env).stdout === '');
  fs.writeFileSync(path.join(dir, 'findings.json'), JSON.stringify({ blocking: [{ id: 't1', file: 'a.css', summary: 'test finding', status: 'open' }] }));
  const first = run('blocking-gate.mjs', gateInput, env);
  check('blocking-gate blocks on an open blocking finding', first.json?.decision === 'block' && /test finding/.test(first.json.reason));
  check('blocking-gate fires once per findings revision', run('blocking-gate.mjs', gateInput, env).stdout === '');
  check('blocking-gate honours stop_hook_active', run('blocking-gate.mjs', { stop_hook_active: true, cwd: project }, env).stdout === '');
  fs.writeFileSync(path.join(dir, 'findings.json'), JSON.stringify({ blocking: [{ id: 't1', file: 'a.css', summary: 'test finding', status: 'fixed' }] }));
  check('blocking-gate is silent once findings resolve', run('blocking-gate.mjs', gateInput, env).stdout === '' && !fs.existsSync(path.join(dir, '.gate-fired')));

  // Detector
  const ts = path.join(project, 'logic.ts');
  fs.writeFileSync(ts, 'export const x = 1;\n');
  check('detect-on-write ignores unstyled files', run('detect-on-write.mjs', { tool_input: { file_path: ts }, cwd: project }, env).stdout === '');
  const css = path.join(project, 'page.css');
  fs.writeFileSync(css, 'h1 { background: linear-gradient(90deg, #a855f7, #ec4899); -webkit-background-clip: text; background-clip: text; color: transparent; }\n.card { transition: all 300ms; }\n');
  const scanner = process.env.INTERFACE_CRAFT_SCANNER || path.join(here, '..', 'tools', 'scan-design.mjs');
  const detect = run('detect-on-write.mjs', { tool_input: { file_path: css }, cwd: project }, env);
  if (fs.existsSync(scanner)) {
    check('detect-on-write reports findings on a styled file', detect.json?.hookSpecificOutput?.hookEventName === 'PostToolUse' && /detector/.test(detect.json.hookSpecificOutput.additionalContext), detect.json?.hookSpecificOutput?.additionalContext?.split('\n').slice(0, 3).join(' | '));
  } else {
    check('detect-on-write stays silent without the detector', detect.stdout === '', 'detector not installed; skipped the findings check');
  }
  fs.writeFileSync(path.join(dir, 'no-detect'), '');
  check('detect-on-write honours .interface-craft/no-detect', run('detect-on-write.mjs', { tool_input: { file_path: css }, cwd: project }, env).stdout === '');
} finally {
  fs.rmSync(project, { recursive: true, force: true });
}

for (const r of results) console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.detail ? `  (${r.detail})` : ''}`);
const failed = results.filter((r) => !r.ok).length;
console.log(failed ? `${failed} failed` : `all ${results.length} passed`);
process.exitCode = failed ? 1 : 0;
