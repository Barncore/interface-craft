#!/usr/bin/env node
// Deterministic frame capture of web motion: every frame is taken at an exact
// time, so two runs give identical frames and a frame can be compared with any
// other. See ../references/render-and-capture.md for when and how to use it.
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { execSync, execFileSync } from 'node:child_process';

const HELP = `Usage: node capture-motion.mjs <url> --out <dir> [options]

  --out <dir>          Folder for frames/, capture.json and sheet.png (required)
  --width <px>         Viewport width (default 1440)
  --height <px>        Viewport height (default 900)
  --scale <n>          Device scale factor (default 1)
  --fps <n>            Frames per second of virtual time (default 60)
  --seconds <n>        Length of the capture after the start frame (default 2)
  --pre <n>            Frames recorded before the start frame (default 10)
  --trigger <js>       Expression run in the page at the start frame, for example
                       "document.querySelector('#menu').click()"
  --clip <selector>    Capture only this element's box, measured once before the
                       start frame: clip to a container, not to the element that moves
  --sheet <ms,ms,...>  Also write sheet.png: the frames nearest these times after
                       the start frame, side by side (needs ffmpeg on PATH)
  --reduced-motion     Emulate prefers-reduced-motion: reduce
  --channel <name>     Browser channel: chrome, msedge or chromium. Default: try
                       chrome, then msedge, then Playwright's own Chromium
  --playwright <dir>   Path to a playwright or playwright-core package folder.
                       Default: resolve from the current folder, then npm's global root

Time 0 is the start frame. Page load counts as time 0 when there is no trigger.`;

function parseArgs(argv) {
  const opts = { width: 1440, height: 900, scale: 1, fps: 60, seconds: 2, pre: 10 };
  const flags = new Set(['reduced-motion', 'help']);
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) { opts.url ??= a; continue; }
    const key = a.slice(2);
    if (flags.has(key)) { opts[key] = true; continue; }
    opts[key] = argv[++i];
  }
  for (const k of ['width', 'height', 'scale', 'fps', 'seconds', 'pre']) opts[k] = Number(opts[k]);
  return opts;
}

function loadPlaywright(explicit) {
  const req = createRequire(import.meta.url);
  const candidates = [];
  if (explicit) candidates.push(resolve(explicit));
  const local = createRequire(join(process.cwd(), 'index.js'));
  for (const name of ['playwright', 'playwright-core']) {
    try { candidates.push(local.resolve(name)); } catch {}
  }
  try {
    const root = execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    candidates.push(join(root, 'playwright'), join(root, 'playwright-core'));
  } catch {}
  for (const c of candidates) {
    try { return req(c); } catch {}
  }
  throw new Error('Playwright not found. Run from a project that has playwright or playwright-core installed, or pass --playwright <package folder>.');
}

async function launch(chromium, channel) {
  const order = channel ? [channel === 'chromium' ? undefined : channel] : ['chrome', 'msedge', undefined];
  let last;
  for (const ch of order) {
    try { return { browser: await chromium.launch(ch ? { channel: ch } : {}), channel: ch ?? 'chromium' }; }
    catch (e) { last = e; }
  }
  throw last;
}

// Runs in the page. Holds every document-timeline animation (CSS transitions,
// CSS animations, element.animate) at the elapsed virtual time since it was
// first seen. JS-driven motion needs nothing: it reads the faked clock.
function seek() {
  const now = performance.now();
  for (const a of document.getAnimations()) {
    if (a.timeline !== document.timeline) continue; // scroll-driven: leave alone
    if (a.__icMark === undefined) {
      a.__icMark = now;
      a.__icBase = a.currentTime ?? 0;
      a.pause();
    }
    a.currentTime = a.__icBase + (now - a.__icMark);
  }
  return now;
}

async function main() {
  const o = parseArgs(process.argv.slice(2));
  if (o.help || !o.url || !o.out) { console.log(HELP); process.exit(o.help ? 0 : 1); }

  const { chromium } = loadPlaywright(o.playwright);
  const { browser, channel } = await launch(chromium, o.channel);
  const context = await browser.newContext({
    viewport: { width: o.width, height: o.height },
    deviceScaleFactor: o.scale,
    reducedMotion: o['reduced-motion'] ? 'reduce' : 'no-preference',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });

  // Stop the document timeline before anything loads, so load animations wait
  // for the first seek instead of running on real time.
  const cdp = await context.newCDPSession(page);
  await cdp.send('Animation.enable');
  await cdp.send('Animation.setPlaybackRate', { playbackRate: 0 });

  // Freeze the JS clock (Date, timers, requestAnimationFrame, performance) too.
  await page.clock.install({ time: 0 });
  await page.clock.pauseAt(1000);

  await page.goto(o.url, { waitUntil: 'load' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((img) => img.decode().catch(() => {})));
  });

  let clip;
  if (o.clip) {
    const box = await page.locator(o.clip).first().boundingBox();
    if (!box) throw new Error(`--clip ${o.clip} matched nothing visible`);
    clip = box;
  }

  const framesDir = join(o.out, 'frames');
  mkdirSync(framesDir, { recursive: true });
  const total = o.pre + Math.round(o.seconds * o.fps) + 1;
  const frames = [];
  let startNow;
  for (let i = 0; i < total; i++) {
    let now;
    if (i === o.pre && o.trigger) {
      now = await page.evaluate(([expr, seekSrc]) => {
        (0, eval)(expr);
        return (0, eval)(`(${seekSrc})`)();
      }, [o.trigger, seek.toString()]);
    } else {
      now = await page.evaluate(seek);
    }
    if (i === o.pre) startNow = now;
    const file = `${String(i).padStart(5, '0')}.png`;
    await page.screenshot({ path: join(framesDir, file), clip });
    frames.push({ file, now });
    // Whole milliseconds that average exactly 1000/fps, so time never drifts.
    const dt = Math.round(((i + 1) * 1000) / o.fps) - Math.round((i * 1000) / o.fps);
    await page.clock.runFor(dt);
  }
  for (const f of frames) { f.t = Math.round(f.now - startNow); delete f.now; }

  const out = {
    url: o.url, channel, viewport: { width: o.width, height: o.height, scale: o.scale },
    fps: o.fps, pre: o.pre, trigger: o.trigger ?? null, reducedMotion: !!o['reduced-motion'],
    note: 't is ms after the start frame; negative t is before it',
    errors, frames,
  };

  if (o.sheet) {
    const picks = o.sheet.split(',').map(Number).map((ms) =>
      frames.reduce((best, f) => (Math.abs(f.t - ms) < Math.abs(best.t - ms) ? f : best)));
    const args = ['-hide_banner', '-loglevel', 'error', '-y'];
    for (const p of picks) args.push('-i', join(framesDir, p.file));
    const sheet = join(o.out, 'sheet.png');
    args.push('-filter_complex', picks.length > 1 ? `hstack=inputs=${picks.length}` : 'null', sheet);
    try {
      execFileSync('ffmpeg', args, { stdio: ['ignore', 'ignore', 'pipe'] });
      out.sheet = { file: 'sheet.png', frames: picks.map((p) => ({ file: p.file, t: p.t })) };
    } catch (e) {
      out.sheet = { error: `ffmpeg failed or is missing: ${String(e.stderr || e.message).trim()}` };
    }
  }

  writeFileSync(join(o.out, 'capture.json'), JSON.stringify(out, null, 2));
  await browser.close();
  console.log(JSON.stringify({ out: resolve(o.out), channel, frames: frames.length, errors: errors.length, sheet: out.sheet ?? null }));
}

main().catch((e) => { console.error(e.message || e); process.exit(1); });
