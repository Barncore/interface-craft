#!/usr/bin/env node
// UserPromptSubmit: adds a short routing directive to every turn.
// Skill activation by description matching is a hope; this makes routing an instruction.
// It fires unconditionally because prompt-keyword heuristics miss follow-ups like
// "make it warmer" that carry no design words. The directive tells the model to ignore
// it for work with no visible surface, so always firing costs less than missing a turn.
import { readStdin, emit, failOpen } from './lib.mjs';

const directive = `<interface-craft>
If this request will create, change or review anything with a visible surface (a web page, app screen, component, deck or document layout, visual or motion work), invoke the interface-craft:route skill before generating anything. If it has no visible surface, ignore this note and don't mention it.
</interface-craft>`;

await failOpen(async () => {
  await readStdin();
  emit({ hookSpecificOutput: { hookEventName: 'UserPromptSubmit', additionalContext: directive } });
});
