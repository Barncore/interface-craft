---
name: feedback
description: Record my explicit design reactions and promote repeated ones. Use when I pick, reject, rate or explain a design choice, dismiss a review finding, or ask what you've learned about my design taste.
---

# Feedback

Turn the user's explicit reactions into evidence that later work can use, without letting one mood harden into a rule. Everything else in this plugin spends taste; this is the part that earns it.

## What counts

Record only what the user explicitly said or chose: a selection, a rejection, a rating, a reaction, a dismissed review finding, or a correction of an earlier record. Silence, continued work and the absence of complaint are not approval. Reviewer findings and your own judgments never go in this ledger; they live in `reviews.jsonl`.

## Record it

Write one event as JSON following [event-contract.md](references/event-contract.md), save it to a temporary file, then run:

```bash
node "<this skill's dir>/scripts/append-event.mjs" --root <project-root> --event <event.json>
node "<this skill's dir>/scripts/build-overlay.mjs" --root <project-root>
```

The first validates and appends to `.interface-craft/events.jsonl`; the second rebuilds `.interface-craft/overlay.md`. Keep the user's words verbatim in `evidence`. "Less literal, keep the energy" is two instructions, and paraphrase tends to lose the second. Default the scope to the project, record what had to stay the same in `invariants`, and record rejected options too, since what someone turns down is often more telling. A correction is a new event pointing at the old one; history is never rewritten.

## The ladder

- **One comment** changes the artifact and nothing else. It stops "I dislike this card" from becoming "never use cards".
- **Repeated within one project** (two or more times): add a line to `DESIGN.md` citing the evidence and its scope, and tell the user it happened. No approval needed.
- **Repeated across distinct projects or domains:** a candidate for the taste profile. Two pages of one site are one project; the point is to show the preference is about the person, not the product. Run the proposal script, present each candidate with supporting and contradicting evidence, and ask. Nothing reaches the taste profile without the user's explicit yes.
- **Contradictions stay contradictions.** Record both sides with their conditions ("dense in tools, sparse on showpieces") instead of averaging them. Averaging is how a sharp profile turns to mush.
- **Low-confidence areas** (those the taste profile marks low-confidence or not covered) need a deliberate comparison where the user chose knowingly; passive reactions alone don't promote.

```bash
node "<this skill's dir>/scripts/propose-promotions.mjs" --scan "<the folder that holds the user's projects>"
```

`--scan` finds every project ledger under a folder; `--events <file>` adds individual ledgers. Thresholds default to three supporting events across two projects or domains, mean confidence 0.75, and more support than contradiction.

The taste profile is the user's own skill, maintained separately, so don't edit it directly. For an approved promotion, write the exact wording and which medium's part it belongs in to `.interface-craft/taste-proposals.md`, and tell the user it's there to apply. If they have no taste profile yet, that file is where one can start.

## Writing a promotion

Cite the evidence and keep the boundary, because a rule without its boundary overreaches:

```markdown
- Entrance stagger at 80ms, not 150ms.
  Evidence: chose "balanced" over "quiet" and "vivid" on motion energy (2026-08-06); corrected a 150ms stagger unprompted (2026-08-12).
  Boundary: the stagger itself stays; the objection was to the timing.
  Scope: project. 2 events, 1 project.
```

## Never promote

- anything from a `source-only` review
- your own or a reviewer's judgment
- inferences about character, politics, health or personality drawn from aesthetic choices; the profile describes taste, not the person
- a dismissed rule, unless the user dismissed it repeatedly; then record its absence (in `DESIGN.md`'s lint exceptions) rather than its opposite
