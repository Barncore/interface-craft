# Authority, taste and project files

## Authority order

When sources disagree, the higher one wins. A lower source can fill a silence but cannot override a higher one.

1. Safety, accessibility, legal, required format, and hard technical constraints.
2. The user's explicit instruction for this task.
3. The project's confirmed intent: confirmed entries in `DESIGN-BRIEF.md`, and `PRODUCT.md` where it exists.
4. The project's approved design: `DESIGN.md`.
5. The project overlay: the user's explicit reactions in this project.
6. Taste evidence for this medium, from the user's taste profile skill.
7. Broad taste defaults, from the taste profile's cross-medium parts.
8. Craft references in this plugin, industry conventions, and model priors.

Provisional interpretations in the brief are hypotheses under discussion, not authority. They inform the work until the user confirms or corrects them.

Name a consequential conflict and the level that settled it. Keep the narrower evidence: a preference shown in one kind of artifact does not automatically carry to another. If the user explicitly asks for something their taste profile argues against, follow the instruction unless it breaks level 1. If two project files contradict each other and the answer changes the outcome, ask one decisive question.

## Reading taste

This plugin contains no taste of its own. If the user has a taste profile skill (a skill describing what they have liked, chosen and said, often named something like `my-taste`), read the part for the current medium (visual, UI and web for most work here) and treat it as evidence about them. If there's no taste profile, work from the brief alone.

Decide first whose project this is. When the work expresses the user themselves (their studio, their tools, their own sites), their taste weighs heavily. When it serves another brand or audience, the brief outranks their taste. People can love a palette they would never choose for themselves because it belongs to that brand. Say which situation applies.

Treat any reference recipes or default palettes in a taste profile as strong hypotheses, not settled rules. Use them as a starting point for the user's own projects and vary them, because staleness is a failure too. They are never a template for every project.

Where the profile marks an area as low-confidence or doesn't cover it, say so and treat the direction as open. A preference invented to fill that gap corrupts the evidence later, when the choice gets recorded as if it were theirs.

## Project files

| File | Written by | Rules |
| --- | --- | --- |
| `DESIGN-BRIEF.md` (project root) | `intent-interview` | The user's side: what they said and decided. Updated after each answered round. |
| `.interface-craft/seeds.md` | `intent-interview` | The AI's side: themes, readings and judge ratings under development. Never a decision until it appears in the brief. |
| `DESIGN.md` (project root) | `build`, `feedback` | What the project actually uses: tokens, components, motion values, rules with reasons, lint exceptions. Describe reality, not aspiration. |
| `.interface-craft/events.jsonl` | `feedback` scripts | The user's explicit reactions. Append-only; corrections are new events. |
| `.interface-craft/overlay.md` | `feedback` scripts | Derived from events; safe to delete and rebuild. Ranks below `DESIGN.md`. |
| `.interface-craft/reviews.jsonl` | `verify` | Reviewer findings and their outcomes. Kept apart from the user's reactions so model judgments never count as taste evidence. |
| `.interface-craft/findings.json` | `verify` | Open blocking findings, read by the Stop hook. |
| `.interface-craft/concepts/` | `intent-interview`, `explore` | Generated concept images. |
| `.interface-craft/no-detect` | the user | Present means the write-time detector stays silent. |

Older projects may keep `DESIGN.md` or `PRODUCT.md` inside `.interface-craft/`, and may have a `FEEDBACK.jsonl` from version 1. Read them where they are. Treat entries in a v1 `FEEDBACK.jsonl` whose `type` starts with `verify-` as reviewer findings, not user reactions.

## Write boundary

Reading context never writes anything. An interview may maintain its brief. Building may update `DESIGN.md` when the build changes what the project uses. A review, audit or critique writes only `reviews.jsonl` and `findings.json`, and edits nothing else unless the user asks for fixes. Creating other project files needs the user's go-ahead.
