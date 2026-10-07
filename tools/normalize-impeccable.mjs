#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function argsOf(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith('--')) out[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
  }
  return out;
}

const allowed = new Set(['fail', 'warn', 'critique', 'approved']);
const protectedFailRules = new Set([
  'low-contrast', 'missing-alt', 'missing-label', 'empty-link', 'empty-button',
  'positive-tabindex', 'clickable-div', 'clickable-span'
]);
const warningRules = new Set([
  'outline-none', 'autofocus', 'layout-transition', 'transition-all'
]);
const critiqueRules = new Set([
  'ai-color-palette', 'gradient-text', 'excessive-rounded-cards', 'card-on-card',
  'side-tab', 'border-accent-on-rounded', 'marquee', 'bounce-easing',
  'overused-font', 'dark-glow'
]);

const args = argsOf(process.argv.slice(2));
if (!args.input) {
  console.error('Usage: node normalize-impeccable.mjs --input <findings.json> [--config <.interface-craft/config.json>]');
  process.exit(2);
}

const inputPath = path.resolve(String(args.input));
const findings = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
if (!Array.isArray(findings)) throw new Error('Impeccable JSON must be an array of findings.');
const configPath = args.config ? path.resolve(String(args.config)) : path.join(process.cwd(), '.interface-craft', 'config.json');
let config = {};
const adapterWarnings = [];
if (fs.existsSync(configPath)) {
  try { config = JSON.parse(fs.readFileSync(configPath, 'utf8')); }
  catch (error) { adapterWarnings.push({type: 'invalid-config', configPath, message: error.message}); }
}
const overrides = config?.audit?.impeccable?.overrides || {};

function defaultDisposition(finding) {
  const id = String(finding.antipattern || finding.id || 'unknown');
  if (finding.advisory === true) return {disposition: 'warn', candidateHardGate: false};
  if (protectedFailRules.has(id)) return {disposition: 'warn', candidateHardGate: true};
  if (warningRules.has(id)) return {disposition: 'warn', candidateHardGate: false};
  if (critiqueRules.has(id)) return {disposition: 'critique', candidateHardGate: false};
  return {disposition: 'warn', candidateHardGate: false};
}

const normalized = findings.map((finding) => {
  const ruleId = String(finding.antipattern || finding.id || 'unknown');
  const override = overrides[ruleId];
  const defaults = defaultDisposition(finding);
  const overrideComplete = override && allowed.has(override.disposition) && typeof override.reason === 'string' && override.reason.trim() && typeof override.sourceRef === 'string' && override.sourceRef.trim();
  const protectedDowngrade = defaults.candidateHardGate && overrideComplete;
  if (override && !overrideComplete) adapterWarnings.push({type: 'invalid-override', ruleId, message: 'Override requires a valid disposition, reason, and sourceRef.'});
  if (protectedDowngrade) adapterWarnings.push({type: 'rejected-protected-override', ruleId, message: 'Protected hard-gate candidates cannot be reclassified by project configuration; verify the condition in the artifact.'});
  if (!protectedFailRules.has(ruleId) && !warningRules.has(ruleId) && !critiqueRules.has(ruleId) && finding.advisory !== true && String(finding.severity || '').toLowerCase() === 'error') {
    adapterWarnings.push({type: 'unclassified-error-rule', ruleId, message: 'Unknown detector error kept as a warning pending policy classification and verification.'});
  }
  const validOverride = overrideComplete && !protectedDowngrade;
  const disposition = validOverride ? override.disposition : defaults.disposition;
  return {
    ruleId,
    disposition,
    overrideReason: validOverride ? override.reason.trim() : null,
    overrideSourceRef: validOverride ? override.sourceRef.trim() : null,
    candidateHardGate: defaults.candidateHardGate,
    requiresVerification: defaults.candidateHardGate,
    dispositionOnVerification: defaults.candidateHardGate ? 'fail' : null,
    detectorSeverity: finding.severity || null,
    name: finding.name || null,
    description: finding.description || null,
    file: finding.file || null,
    line: Number.isFinite(finding.line) ? finding.line : null,
    snippet: finding.snippet || null,
    advisory: finding.advisory === true
  };
});

const counts = Object.fromEntries([...allowed].map((key) => [key, normalized.filter((x) => x.disposition === key).length]));
process.stdout.write(`${JSON.stringify({schemaVersion: 1, source: inputPath, config: fs.existsSync(configPath) ? configPath : null, counts, adapterWarnings, findings: normalized}, null, 2)}\n`);
