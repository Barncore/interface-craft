#!/usr/bin/env node
// Checks that interface-craft can run on this machine.
//   node tools/doctor.mjs           quick checks (a few seconds)
//   node tools/doctor.mjs --image   also generates one test image through Codex (about two minutes)
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imageScript = path.join(root, 'skills', 'intent-interview', 'scripts', 'codex-image.mjs');
const wantImage = process.argv.includes('--image');
const lines = [];
let failures = 0;

function report(status, name, detail = '') {
  if (status === 'FAIL') failures += 1;
  lines.push(`${status.padEnd(5)} ${name}${detail ? `: ${detail}` : ''}`);
}

function run(cmd, args, options = {}) {
  const viaNode = /\.(c|m)?js$/i.test(cmd);
  return spawnSync(viaNode ? process.execPath : cmd, viaNode ? [cmd, ...args] : args, { encoding: 'utf8', windowsHide: true, timeout: 60000, ...options });
}

// Node
const major = Number(process.versions.node.split('.')[0]);
if (major >= 18) report('OK', 'Node', process.versions.node);
else report('FAIL', 'Node', `${process.versions.node}; interface-craft needs Node 18 or later`);

// Hooks
const hooks = run(path.join(root, 'hooks', 'test-hooks.mjs'), [], { timeout: 180000 });
const summary = (hooks.stdout || '').trim().split(/\r?\n/).pop() || hooks.stderr || 'no output';
if (hooks.status === 0) report('OK', 'Hooks', summary);
else report('FAIL', 'Hooks', `${summary}. Run "node hooks/test-hooks.mjs" for details.`);

// Detector
if (process.platform === 'win32' && process.arch === 'x64') {
  const engine = path.join(root, 'tools', 'impeccable', 'engine', 'bin', 'impeccable.exe');
  const version = fs.existsSync(engine) ? run(engine, ['--version']) : null;
  if (version && version.status === 0) report('OK', 'Detector', `Impeccable ${version.stdout.trim()}`);
  else report('WARN', 'Detector', 'bundled engine did not run; reviews fall back to pattern checks');
} else {
  report('INFO', 'Detector', `the bundled engine is Windows x64 only; on ${process.platform} ${process.arch} the reviewers use pattern checks and live-edit is unavailable`);
}

// Codex
const which = run(imageScript, ['--which']);
let codex = null;
try { codex = JSON.parse(which.stdout).codex; } catch { /* reported below */ }
if (!codex) {
  report('WARN', 'Codex', 'not found. The interview still works but skips its images. See docs/setup.md, "Set up Codex for images".');
} else {
  const version = run(codex, ['--version']);
  report(version.status === 0 ? 'OK' : 'WARN', 'Codex', `${(version.stdout || '').trim() || 'version unknown'} at ${codex}`);
  const login = run(codex, ['login', 'status']);
  const text = `${login.stdout || ''}${login.stderr || ''}`.trim();
  if (login.status === 0 && /chatgpt/i.test(text)) report('OK', 'Codex login', text);
  else if (login.status === 0) report('WARN', 'Codex login', `${text}. Images are meant to use a ChatGPT sign-in; run "codex login" and choose ChatGPT.`);
  else report('WARN', 'Codex login', 'not signed in. Run "codex login" and choose ChatGPT.');

  if (wantImage) {
    const out = path.join(os.tmpdir(), `interface-craft-doctor-${Date.now()}.png`);
    const prompt = 'A small test image: a single paper boat on calm water, flat illustration, no text.';
    const result = run(imageScript, ['--prompt', prompt, '--out', out], { timeout: 900000 });
    let parsed = null;
    try { parsed = JSON.parse(result.stdout); } catch { /* reported below */ }
    if (parsed?.ok) report('OK', 'Test image', `${parsed.seconds}s, saved to ${parsed.path}`);
    else report('FAIL', 'Test image', parsed?.error || (result.stderr || 'no output').trim().slice(0, 300));
  } else {
    lines.push('      (run with --image to generate one test image through Codex, about two minutes)');
  }
}

console.log(`interface-craft doctor (${root})\n`);
console.log(lines.join('\n'));
console.log(failures ? `\n${failures} check(s) failed.` : '\nReady.');
process.exitCode = failures ? 1 : 0;
