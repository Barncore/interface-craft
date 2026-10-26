#!/usr/bin/env node
// Measures how closely a render matches a reference image: PSNR overall and per
// region, plus an amplified difference image that shows where they differ.
// Needs ffmpeg and ffprobe on PATH. See ../references/render-and-capture.md.
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const HELP = `Usage: node compare-renders.mjs <reference.png> <render.png> [options]

  --sigma <n>                  Blur both images first, in pixels (default 1.2). Use 0 for an
                               exact comparison, such as a loop's first and last frame
  --region <name>=<x,y,w,h>    Also score this rectangle, in reference pixels (repeatable)
  --grid <cols>x<rows>         Also score every cell of a grid and list the 5 worst
                               (default 4x3; 0 to skip)
  --diff <file.png>            Write the difference image, amplified 8x so faint errors show

PSNR is in dB, higher is closer; "inf" means pixel-identical. A render of another size
is scaled to the reference first, and the output says so.`;

function parseArgs(argv) {
  const o = { sigma: 1.2, grid: '4x3', regions: [], files: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help') o.help = true;
    else if (a === '--region') {
      const [name, rect] = argv[++i].split('=');
      const [x, y, w, h] = rect.split(',').map(Number);
      o.regions.push({ name, x, y, w, h });
    } else if (a.startsWith('--')) o[a.slice(2)] = argv[++i];
    else o.files.push(a);
  }
  o.sigma = Number(o.sigma);
  return o;
}

function ffmpeg(tool, args) {
  const r = spawnSync(tool, args, { encoding: 'utf8', maxBuffer: 1 << 24 });
  if (r.error) throw new Error(`${tool} could not run (${r.error.code}). Is it installed and on PATH?`);
  if (r.status !== 0) throw new Error(`${tool} failed:\n${r.stderr.trim()}`);
  return r;
}

function size(file) {
  const r = ffmpeg('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-of', 'csv=p=0:s=x', file]);
  const [w, h] = r.stdout.trim().split('x').map(Number);
  return { w, h };
}

// One input's filter chain: optional scale to the reference size, a common
// pixel format, optional crop to a region, optional blur.
function chain(index, scaleTo, rect, sigma) {
  const steps = [];
  if (scaleTo) steps.push(`scale=${scaleTo.w}:${scaleTo.h}:flags=lanczos`);
  steps.push('format=gbrp');
  if (rect) steps.push(`crop=${rect.w}:${rect.h}:${rect.x}:${rect.y}`);
  if (sigma > 0) steps.push(`gblur=sigma=${sigma}`);
  return `[${index}:v]${steps.join(',')}`;
}

function psnr(ref, render, scaleTo, rect, sigma) {
  const graph = `${chain(0, null, rect, sigma)}[x];${chain(1, scaleTo, rect, sigma)}[y];[x][y]psnr`;
  const r = ffmpeg('ffmpeg', ['-hide_banner', '-nostats', '-i', ref, '-i', render, '-lavfi', graph, '-f', 'null', '-']);
  const m = /average:(inf|[\d.]+)/.exec(r.stderr);
  if (!m) throw new Error(`no PSNR in ffmpeg output:\n${r.stderr}`);
  return m[1] === 'inf' ? 'inf' : Math.round(Number(m[1]) * 10) / 10;
}

function main() {
  const o = parseArgs(process.argv.slice(2));
  if (o.help || o.files.length !== 2) { console.log(HELP); process.exit(o.help ? 0 : 1); }
  const [ref, render] = o.files.map((f) => resolve(f));
  const a = size(ref), b = size(render);
  const scaleTo = a.w === b.w && a.h === b.h ? null : a;

  const result = {
    reference: ref, render, size: `${a.w}x${a.h}`,
    scaled: scaleTo ? `${b.w}x${b.h} -> ${a.w}x${a.h}` : false, sigma: o.sigma,
  };
  result.overall = psnr(ref, render, scaleTo, null, o.sigma);
  result.identical = result.overall === 'inf';
  result.regions = o.regions.map((rect) => ({ ...rect, db: psnr(ref, render, scaleTo, rect, o.sigma) }));

  if (o.grid && o.grid !== '0') {
    const [cols, rows] = o.grid.split('x').map(Number);
    const cw = Math.floor(a.w / cols), ch = Math.floor(a.h / rows);
    const cells = [];
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const rect = { name: `col ${c + 1}, row ${r + 1}`, x: c * cw, y: r * ch, w: cw, h: ch };
      cells.push({ ...rect, db: psnr(ref, render, scaleTo, rect, o.sigma) });
    }
    const n = (v) => (v === 'inf' ? Infinity : v);
    result.worstCells = cells.sort((p, q) => n(p.db) - n(q.db)).slice(0, 5);
  }

  if (o.diff) {
    const amp = 'min(val*8\\,255)';
    const graph = `${chain(0, null, null, o.sigma)}[x];${chain(1, scaleTo, null, o.sigma)}[y];` +
      `[x][y]blend=all_mode=difference,lutrgb=r=${amp}:g=${amp}:b=${amp}`;
    ffmpeg('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', ref, '-i', render,
      '-lavfi', graph, '-frames:v', '1', '-update', '1', resolve(o.diff)]);
    result.diff = resolve(o.diff);
  }
  console.log(JSON.stringify(result, null, 2));
}

try { main(); } catch (e) { console.error(e.message || e); process.exit(1); }
