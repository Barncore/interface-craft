#!/usr/bin/env node
// Generates images through Codex's built-in image tool by running `codex exec`
// headlessly. Uses the user's ChatGPT plan; no API key.
//
// One image (prints one JSON line):
//   node codex-image.mjs --out <file.png> (--prompt-file <file> | --prompt <text>) [--effort high] [--timeout 720]
// Several in parallel (prints a JSON array, one result per job, in job order):
//   node codex-image.mjs --jobs <jobs.json> [--effort high] [--timeout 720]
//   jobs.json: [{"prompt": "<prompt file>", "out": "<file.png>"}, ...]
//
// CODEX_BIN overrides the Codex executable; a .js or .mjs path runs under Node (used by tests).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    const key = argv[i];
    if (!key.startsWith('--')) continue;
    const value = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
    out[key.slice(2)] = value;
  }
  return out;
}

function onPath(name) {
  const exts = process.platform === 'win32' ? ['.exe', '.cmd', ''] : [''];
  for (const dir of (process.env.PATH || '').split(path.delimiter)) {
    for (const ext of exts) {
      const candidate = path.join(dir, name + ext);
      if (!dir || !fs.existsSync(candidate) || candidate.includes('WindowsApps')) continue;
      if (ext === '.cmd') {
        // An npm install on Windows puts a .cmd shim on PATH. Node won't start a .cmd without a
        // shell, and a shell would mangle the prompt, so run the package's JS entry instead.
        const entry = path.join(dir, 'node_modules', '@openai', 'codex', 'bin', 'codex.js');
        if (fs.existsSync(entry)) return entry;
        continue;
      }
      return candidate;
    }
  }
  return null;
}

function findCodex() {
  if (process.env.CODEX_BIN && fs.existsSync(process.env.CODEX_BIN)) return process.env.CODEX_BIN;
  const fromPath = onPath('codex');
  if (fromPath) return fromPath;
  if (process.platform === 'win32') {
    // The Codex desktop app ships its CLI inside the Store package; the folder name changes on update.
    const ps = spawnSync('powershell.exe', ['-NoProfile', '-Command', '(Get-AppxPackage OpenAI.Codex).InstallLocation'], { encoding: 'utf8', windowsHide: true });
    const root = (ps.stdout || '').trim().split(/\r?\n/)[0];
    const candidate = root && path.join(root, 'app', 'resources', 'codex.exe');
    if (candidate && fs.existsSync(candidate)) return candidate;
  }
  return null;
}

function looksLikeImage(file) {
  try {
    const fd = fs.openSync(file, 'r');
    const head = Buffer.alloc(12);
    fs.readSync(fd, head, 0, 12, 0);
    fs.closeSync(fd);
    const png = head[0] === 0x89 && head.toString('ascii', 1, 4) === 'PNG';
    const jpg = head[0] === 0xff && head[1] === 0xd8;
    const webp = head.toString('ascii', 0, 4) === 'RIFF' && head.toString('ascii', 8, 12) === 'WEBP';
    return png || jpg || webp;
  } catch {
    return false;
  }
}

function runJob(codex, job, effort, timeoutSeconds) {
  return new Promise((resolve) => {
    const out = path.resolve(job.out);
    const dir = path.dirname(out);
    const name = path.basename(out);
    if (fs.existsSync(out)) {
      resolve({ ok: false, out, error: `Refusing to overwrite ${out}. Choose a new file name for each image.` });
      return;
    }
    let brief;
    try {
      brief = job.promptText ?? fs.readFileSync(path.resolve(job.prompt), 'utf8');
    } catch (error) {
      resolve({ ok: false, out, error: `Cannot read prompt file ${job.prompt}: ${error.message}` });
      return;
    }
    fs.mkdirSync(dir, { recursive: true });
    const prompt = [
      'Generate one image with your built-in image generation tool. Do not write code or HTML, and do not use the CLI or API fallback.',
      '',
      brief.trim(),
      '',
      `When the image is generated, copy the generated file into the current working directory as ${name}. Reply with only its absolute path.`,
    ].join('\n');
    const lastMessage = path.join(os.tmpdir(), `codex-image-${process.pid}-${Date.now()}-${Math.random().toString(36).slice(2)}.txt`);
    const args = ['exec', '--ephemeral', '--skip-git-repo-check', '-s', 'workspace-write', '-c', `model_reasoning_effort=${effort}`, '-C', dir, '-o', lastMessage, prompt];
    const viaNode = /\.(c|m)?js$/i.test(codex);
    const started = Date.now();
    let log = '';
    let child;
    try {
      child = spawn(viaNode ? process.execPath : codex, viaNode ? [codex, ...args] : args, { stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true });
    } catch (error) {
      resolve({ ok: false, out, error: error.message });
      return;
    }
    const keep = (chunk) => { log = (log + chunk).slice(-4000); };
    child.stdout.on('data', keep);
    child.stderr.on('data', keep);
    const timer = setTimeout(() => child.kill(), timeoutSeconds * 1000);
    const finish = (status, spawnError) => {
      clearTimeout(timer);
      const seconds = Math.round((Date.now() - started) / 1000);
      const reply = fs.existsSync(lastMessage) ? fs.readFileSync(lastMessage, 'utf8').trim() : '';
      try { fs.unlinkSync(lastMessage); } catch { /* already gone */ }
      // Codex sometimes saves under its own generated_images folder and reports that path instead.
      const reported = reply.split(/\r?\n/).map((line) => line.trim().replace(/^`|`$/g, '')).find((line) => line && fs.existsSync(line));
      if (!fs.existsSync(out) && reported && looksLikeImage(reported)) fs.copyFileSync(reported, out);
      if (fs.existsSync(out) && looksLikeImage(out)) {
        resolve({ ok: true, path: out, seconds, bytes: fs.statSync(out).size });
      } else {
        resolve({ ok: false, out, seconds, error: spawnError ? spawnError.message : `No image at ${out} (codex exit ${status}).`, reply: reply.slice(0, 500), logTail: log.slice(-1500) });
      }
    };
    child.on('error', (error) => finish(null, error));
    child.on('close', (status) => finish(status));
  });
}

const args = parseArgs(process.argv.slice(2));
const effort = typeof args.effort === 'string' ? args.effort : 'high';
const timeoutSeconds = Number(args.timeout) > 0 ? Number(args.timeout) : 720;
const usage = 'Usage: node codex-image.mjs (--out <file.png> (--prompt-file <file> | --prompt <text>) | --jobs <jobs.json>) [--effort high] [--timeout 720]';

if (args.which) {
  // Used by tools/doctor.mjs: report which Codex executable would run, and exit.
  process.stdout.write(`${JSON.stringify({ codex: findCodex() })}\n`);
  process.exit(0);
}

let jobs = null;
let single = false;
if (args.jobs) {
  try {
    jobs = JSON.parse(fs.readFileSync(path.resolve(String(args.jobs)), 'utf8'));
    if (!Array.isArray(jobs) || !jobs.length || !jobs.every((j) => j && typeof j.prompt === 'string' && typeof j.out === 'string')) throw new Error('expected a non-empty array of {"prompt", "out"}');
  } catch (error) {
    process.stdout.write(`${JSON.stringify({ ok: false, error: `Bad --jobs file: ${error.message}` })}\n`);
    process.exit(1);
  }
} else if (args.out && (args['prompt-file'] || args.prompt)) {
  single = true;
  jobs = [{ out: String(args.out), prompt: args['prompt-file'] ? String(args['prompt-file']) : null, promptText: args['prompt-file'] ? undefined : String(args.prompt) }];
} else {
  process.stdout.write(`${JSON.stringify({ ok: false, error: usage })}\n`);
  process.exit(1);
}

const codex = findCodex();
if (!codex) {
  const error = 'Codex CLI not found. Set CODEX_BIN, put codex on PATH, or install the Codex desktop app.';
  process.stdout.write(`${JSON.stringify(single ? { ok: false, error } : jobs.map((j) => ({ ok: false, out: j.out, error })))}\n`);
  process.exit(1);
}

const results = await Promise.all(jobs.map((job) => runJob(codex, job, effort, timeoutSeconds)));
process.stdout.write(`${JSON.stringify(single ? results[0] : results)}\n`);
process.exitCode = results.every((r) => r.ok) ? 0 : 1;
