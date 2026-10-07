#!/usr/bin/env node
// Proposes taste-profile candidates from repeated, independent, explicit feedback.
// Emits proposals only; it never edits any taste file.
// Usage: node propose-promotions.mjs (--events <events.jsonl> ... | --scan <folder> ...) [--min-count 3] [--min-confidence 0.75]
import fs from 'node:fs';
import path from 'node:path';

function parse(argv) {
  const out = { events: [], scan: [] };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--events') out.events.push(path.resolve(argv[++i]));
    else if (argv[i] === '--scan') out.scan.push(path.resolve(argv[++i]));
    else if (argv[i] === '--min-count') out.minCount = Number(argv[++i]);
    else if (argv[i] === '--min-confidence') out.minConfidence = Number(argv[++i]);
  }
  return out;
}

// Finds <project>/.interface-craft/events.jsonl under a folder, skipping dependency and VCS folders.
function findLedgers(start, depth = 0, found = []) {
  if (depth > 5) return found;
  let entries;
  try { entries = fs.readdirSync(start, { withFileTypes: true }); } catch { return found; }
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const full = path.join(start, entry.name);
    if (entry.name === '.interface-craft') {
      const ledger = path.join(full, 'events.jsonl');
      if (fs.existsSync(ledger)) found.push(ledger);
    } else if (!['node_modules', '.git', 'dist', 'build', 'out'].includes(entry.name)) {
      findLedgers(full, depth + 1, found);
    }
  }
  return found;
}

function read(file) {
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).map((line, index) => {
    try { return JSON.parse(line); } catch { throw new Error(`Invalid JSON at ${file}:${index + 1}`); }
  });
}

const args = parse(process.argv.slice(2));
const files = [...new Set([...args.events, ...args.scan.flatMap((dir) => findLedgers(dir))])];
if (!files.length) {
  console.error('Usage: node propose-promotions.mjs (--events <events.jsonl> ... | --scan <folder> ...) [--min-count 3] [--min-confidence 0.75]');
  process.exit(2);
}
const minCount = Number.isFinite(args.minCount) ? args.minCount : 3;
const minConfidence = Number.isFinite(args.minConfidence) ? args.minConfidence : 0.75;
const unique = new Map();
for (const event of files.flatMap((file) => read(file).map((e) => ({ ...e, sourceFile: file })))) {
  const identity = `${event.projectId}\u0000${event.eventId}`;
  if (unique.has(identity)) throw new Error(`Duplicate projectId/eventId across ledgers: ${event.projectId}/${event.eventId}`);
  unique.set(identity, event);
}
const all = [...unique.values()];
const corrected = new Set(all.filter((e) => e.eventType === 'correction').map((e) => `${e.projectId}\u0000${e.correctsEventId}`));
const events = all.filter((e) => !corrected.has(`${e.projectId}\u0000${e.eventId}`) && e.signal);
const groups = new Map();
for (const event of events) {
  const id = `${event.signal.key}\u0000${event.signal.value}`;
  if (!groups.has(id)) groups.set(id, []);
  groups.get(id).push(event);
}

const summarize = (e) => ({ eventId: e.eventId, projectId: e.projectId, domain: e.domain || null, artifactId: e.artifactId, scope: e.scope, confidence: e.confidence, evidence: e.evidence });
const proposals = [];
for (const items of groups.values()) {
  const support = items.filter((e) => e.signal.polarity === 'support');
  const contradict = items.filter((e) => e.signal.polarity === 'contradict');
  const projects = new Set(support.map((e) => e.projectId));
  const domains = new Set(support.map((e) => e.domain).filter((d) => typeof d === 'string' && d.trim()));
  const independent = projects.size >= 2 || domains.size >= 2;
  const mean = support.length ? support.reduce((sum, e) => sum + Number(e.confidence || 0), 0) / support.length : 0;
  if (support.length < minCount || !independent || mean < minConfidence || contradict.length >= support.length) continue;
  const { key, value } = support[0].signal;
  proposals.push({
    key,
    value,
    candidateWording: `When project and domain context permit, prefer ${value} for ${key}.`,
    supportCount: support.length,
    contradictCount: contradict.length,
    distinctProjects: projects.size,
    distinctDomains: domains.size,
    meanConfidence: Number(mean.toFixed(3)),
    supportingEvidence: support.map(summarize),
    contradictingEvidence: contradict.map(summarize),
    status: contradict.length ? 'proposal with contradictions: keep the contexts apart, needs user approval' : 'proposal: needs user approval',
  });
}

process.stdout.write(`${JSON.stringify({
  ledgers: files,
  thresholds: { minCount, minConfidence },
  rule: 'Support must meet minCount, span two or more projects or named domains, meet mean confidence, and outnumber contradictions.',
  proposals,
}, null, 2)}\n`);
