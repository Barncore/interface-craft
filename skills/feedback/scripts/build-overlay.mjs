#!/usr/bin/env node
// Rebuilds <project>/.interface-craft/overlay.md from the append-only events.jsonl.
// Also lists user choices from a version 1 FEEDBACK.jsonl, skipping reviewer findings.
// Usage: node build-overlay.mjs --root <project-root>
import fs from 'node:fs';
import path from 'node:path';

function argsOf(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  }
  return out;
}

function readLines(file) {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map((line, index) => {
    try { return JSON.parse(line); } catch { throw new Error(`Invalid JSON at ${file}:${index + 1}`); }
  });
}

function safe(text) { return String(text ?? '').replace(/\s+/g, ' ').trim(); }

const args = argsOf(process.argv.slice(2));
const root = path.resolve(String(args.root || process.cwd()));
const dir = path.join(root, '.interface-craft');
const events = readLines(path.join(dir, 'events.jsonl')).sort((a, b) => String(a.timestamp).localeCompare(String(b.timestamp)));
const corrected = new Set(events.filter((e) => e.eventType === 'correction').map((e) => e.correctsEventId));
const active = events.filter((e) => !corrected.has(e.eventId));
const legacy = readLines(path.join(dir, 'FEEDBACK.jsonl')).filter((e) => !String(e.type || '').startsWith('verify'));

const lines = [
  '# Project overlay',
  '',
  '> Derived from the user\'s explicit, append-only reactions. Ranks below DESIGN.md. Never edits global taste. Safe to delete and rebuild.',
  '',
  `Events: ${events.length}; active: ${active.length}; version 1 records: ${legacy.length}.`,
  '',
];

if (!active.length && !legacy.length) lines.push('_No explicit feedback recorded yet._', '');

const groups = new Map();
for (const event of active) {
  const key = event.axis || event.signal?.key || 'general';
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(event);
}
for (const key of [...groups.keys()].sort()) {
  lines.push(`## ${safe(key)}`, '');
  for (const event of groups.get(key).slice(-12)) {
    const choice = event.selected ? ` Selected: ${safe(event.selected)}.` : '';
    const rejected = event.rejected?.length ? ` Rejected: ${event.rejected.map(safe).join(', ')}.` : '';
    lines.push(`- **${event.eventType}** (${event.scope}, confidence ${Number(event.confidence).toFixed(2)}): ${safe(event.decision)}${choice}${rejected}`);
    lines.push(`  Evidence: ${safe(event.evidence)} (\`${event.eventId}\`)`);
  }
  lines.push('');
}

if (legacy.length) {
  lines.push('## Version 1 records', '');
  for (const entry of legacy.slice(-20)) {
    const chosen = entry.chosen ? ` Chosen: ${safe(entry.chosen)}.` : '';
    const rejected = entry.rejected?.length ? ` Rejected: ${entry.rejected.map(safe).join(', ')}.` : '';
    lines.push(`- **${safe(entry.type)}** ${safe(entry.axis)}.${chosen}${rejected} ${entry.comment ? `"${safe(entry.comment)}"` : ''}`.trimEnd());
  }
  lines.push('');
}

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'overlay.md'), `${lines.join('\n')}\n`, 'utf8');
process.stdout.write(`${JSON.stringify({ events: events.length, active: active.length, legacy: legacy.length, overlay: path.join(dir, 'overlay.md') })}\n`);
