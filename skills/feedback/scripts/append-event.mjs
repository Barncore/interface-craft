#!/usr/bin/env node
// Appends one explicit user reaction to <project>/.interface-craft/events.jsonl after validating it.
// Usage: node append-event.mjs --root <project-root> --event <event.json>
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

function argsOf(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  }
  return out;
}

function assert(condition, message) { if (!condition) throw new Error(message); }
function nonEmpty(value) { return typeof value === 'string' && value.trim().length > 0; }

const args = argsOf(process.argv.slice(2));
assert(args.event, 'Usage: node append-event.mjs --root <project-root> --event <event.json>');
const root = path.resolve(String(args.root || process.cwd()));
const source = path.resolve(String(args.event));
const target = path.join(root, '.interface-craft', 'events.jsonl');
const event = JSON.parse(fs.readFileSync(source, 'utf8'));

const allowedKeys = new Set([
  'eventId', 'timestamp', 'projectId', 'artifactId', 'eventType', 'decision', 'scope',
  'confidence', 'evidence', 'provenance', 'invariants', 'axis', 'selected', 'rejected',
  'tags', 'signal', 'correctsEventId', 'domain'
]);
for (const key of Object.keys(event)) assert(allowedKeys.has(key), `Unknown event property: ${key}`);

for (const key of ['projectId', 'artifactId', 'decision', 'evidence']) assert(nonEmpty(event[key]), `${key} must be a non-empty string.`);
assert(['selection', 'rejection', 'rating', 'reaction', 'dismissal', 'correction'].includes(event.eventType), 'Invalid eventType.');
assert(['artifact', 'project', 'domain', 'global', 'unknown'].includes(event.scope), 'Invalid scope.');
assert(typeof event.confidence === 'number' && event.confidence >= 0 && event.confidence <= 1, 'confidence must be between 0 and 1.');
assert(event.provenance && ['user', 'imported-user-record', 'correction'].includes(event.provenance.source), 'Invalid provenance.source.');
assert(['verbatim', 'paraphrase', 'structured-selection'].includes(event.provenance.captureMode), 'Invalid provenance.captureMode.');
for (const key of Object.keys(event.provenance)) assert(['source', 'captureMode', 'sourceRef'].includes(key), `Unknown provenance property: ${key}`);
if (event.provenance.sourceRef !== undefined) assert(nonEmpty(event.provenance.sourceRef), 'provenance.sourceRef must be a non-empty string.');
if (event.eventType === 'correction') assert(nonEmpty(event.correctsEventId), 'correction events require correctsEventId.');
if (event.timestamp) assert(!Number.isNaN(Date.parse(event.timestamp)), 'timestamp must be a valid date-time.');
if (event.eventId) assert(nonEmpty(event.eventId) && event.eventId.length >= 8, 'eventId must contain at least 8 characters.');
if (event.invariants) assert(Array.isArray(event.invariants) && event.invariants.every(nonEmpty), 'invariants must be an array of non-empty strings.');
if (event.rejected) assert(Array.isArray(event.rejected) && event.rejected.every(nonEmpty), 'rejected must be an array of non-empty strings.');
if (event.tags) assert(Array.isArray(event.tags) && event.tags.every(nonEmpty), 'tags must be an array of non-empty strings.');
if (event.signal) {
  for (const key of Object.keys(event.signal)) assert(['key', 'value', 'polarity'].includes(key), `Unknown signal property: ${key}`);
  assert(nonEmpty(event.signal.key) && nonEmpty(event.signal.value), 'signal.key and signal.value are required.');
  assert(['support', 'contradict'].includes(event.signal.polarity), 'Invalid signal.polarity.');
}

const normalized = {
  ...event,
  schemaVersion: 1,
  eventId: event.eventId || crypto.randomUUID(),
  timestamp: event.timestamp || new Date().toISOString()
};
const existing = fs.existsSync(target) ? fs.readFileSync(target, 'utf8').split(/\r?\n/).filter(Boolean).map((line, index) => {
  try { return JSON.parse(line); } catch { throw new Error(`Invalid existing JSON at ${target}:${index + 1}`); }
}) : [];
assert(!existing.some((item) => item.eventId === normalized.eventId), `Duplicate eventId: ${normalized.eventId}`);
if (normalized.eventType === 'correction') {
  const matches = existing.filter((item) => item.eventId === normalized.correctsEventId && item.projectId === normalized.projectId);
  assert(matches.length === 1, `correctsEventId must match exactly one prior event in the same project: ${normalized.correctsEventId}`);
}
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.appendFileSync(target, `${JSON.stringify(normalized)}\n`, 'utf8');
process.stdout.write(`${JSON.stringify({appended: target, eventId: normalized.eventId}, null, 2)}\n`);
