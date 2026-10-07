#!/usr/bin/env node
// Stop: holds the turn open while verify has recorded unresolved BLOCKING findings in
// .interface-craft/findings.json. Only open blocking entries gate; warnings never do.
// Loop safety matters more than the check: a Stop hook that re-fires on its own continuation
// loops exactly when the user most needs to talk to the agent. Two guards: honour
// stop_hook_active, and fire once per revision of the findings file.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { readStdin, parseJson, readJsonFile, emit, projectDir, failOpen } from './lib.mjs';

await failOpen(async () => {
  const input = parseJson(await readStdin());
  if (input?.stop_hook_active === true) return;
  const dir = path.join(projectDir(input), '.interface-craft');
  const findingsFile = path.join(dir, 'findings.json');
  const stamp = path.join(dir, '.gate-fired');
  if (!fs.existsSync(findingsFile)) return;

  const findings = readJsonFile(findingsFile);
  const open = Array.isArray(findings?.blocking) ? findings.blocking.filter((f) => (f.status || 'open') === 'open') : [];
  if (!open.length) {
    fs.rmSync(stamp, { force: true });
    return;
  }

  const signature = crypto.createHash('sha256').update(fs.readFileSync(findingsFile)).digest('hex');
  if (fs.existsSync(stamp) && fs.readFileSync(stamp, 'utf8') === signature) return;
  fs.writeFileSync(stamp, signature);

  const list = open.slice(0, 10).map((f) => `  - ${f.file || '?'}: ${f.summary || 'unspecified'}`).join('\n');
  emit({
    decision: 'block',
    reason: `${open.length} unresolved BLOCKING design finding(s) from verify:\n${list}\n\nFix them, or mark each "dismissed" in .interface-craft/findings.json and record the user's reason through the feedback skill. A rule the user keeps dismissing may belong in DESIGN.md's lint exceptions.`,
  });
});
