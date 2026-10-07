// Shared helpers for interface-craft hooks. Hooks fail open: any error ends in a silent exit 0,
// and test-hooks.mjs is the heartbeat that proves they still emit valid JSON on this machine.
import fs from 'node:fs';

export function readStdin(timeoutMs = 2000) {
  return new Promise((resolve) => {
    if (process.stdin.isTTY) { resolve(''); return; }
    let data = '';
    const timer = setTimeout(() => resolve(data), timeoutMs);
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { data += chunk; });
    process.stdin.on('end', () => { clearTimeout(timer); resolve(data); });
    process.stdin.on('error', () => { clearTimeout(timer); resolve(data); });
  });
}

export function parseJson(text) {
  try { return JSON.parse(text); } catch { return null; }
}

export function readJsonFile(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return null; }
}

export function emit(object) {
  process.stdout.write(JSON.stringify(object));
}

export function projectDir(input) {
  return process.env.CLAUDE_PROJECT_DIR || input?.cwd || process.cwd();
}

export async function failOpen(main) {
  try { await main(); } catch { /* fail open: never block the user's turn on a hook bug */ }
  process.exitCode = 0;
}
