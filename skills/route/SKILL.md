---
name: route
description: Entry point for work with a visible surface. Use before building, redesigning, exploring or reviewing a website, app UI, screen, component, deck or document layout, visual or motion work.
---

# Route

Work out what kind of design work this is, gather the context it needs, and hand it to one skill. Route makes no design decisions itself; its job is that the next skill starts with the right brief and the right authority order.

## Does this need routing?

Route anything where composition, hierarchy, type, colour, motion or interaction decides whether the work succeeds: websites, app screens, components, dashboards, decks and document layouts, data visualisations, generated visuals. Skip it when the visible form is incidental: refactors, backend endpoints, scripts, plain answers.

A follow-up inside work already routed this session ("make it warmer", "tighten the spacing") goes straight to the skill already in play. Reuse the context you hold instead of re-reading it.

## Read the context

Read whichever of these exist. Route reads; it creates nothing.

| Source | Where to look | What it carries |
| --- | --- | --- |
| `DESIGN-BRIEF.md` | project root, or the brief path the project already uses | The user's side of the intent interview: their words, decisions, the confirmed direction and its spec |
| `.interface-craft/seeds.md` | project | The interview's readings in progress. Read it only to continue an unfinished interview; nothing in it is a decision. |
| `DESIGN.md` | project root, then `.interface-craft/` | Approved design: tokens, components, motion values, lint exceptions |
| `PRODUCT.md` | project root, then `.interface-craft/` | Older product records. Read it as intent. |
| `.interface-craft/overlay.md` | project | The user's explicit reactions in this project, derived from `events.jsonl` |
| The user's taste profile skill, if any (for example `my-taste`) | global, separate from this plugin | What the user has liked and chosen. Read its visual and UI part as contextual evidence. |

Read [authority-and-context.md](references/authority-and-context.md) when two sources disagree, before leaning on taste, and before writing any project file. Read [creative-philosophy.md](references/creative-philosophy.md) whenever the work involves creative direction, and carry it into the hand-off.

## Pick the next skill

| Situation | Next |
| --- | --- |
| A new website or app UI whose direction isn't settled: no brief, or a brief with open interpretations | `intent-interview` |
| A direction exists but a choice is open, or the user asks for options, concepts or variants | `explore` |
| The direction is clear enough to build, or the request is a scoped change | `build` |
| An artifact exists and needs checking before delivery, or the user asks for a review or critique | `verify` |
| The user picks, rejects or explains a design choice | `feedback`, then continue with whatever comes next |
| Generated code, copy or decoration needs cleaning | `deslop` |
| "What's that effect called?" | `animation-vocabulary` |
| Pointing at elements in a running local page to tune them live | `live-edit` |
| "Check my interface-craft setup" | Run `node "<plugin root>/tools/doctor.mjs"` (add `--image` to test Codex images) and report what it says. `<plugin root>` is two folders above this skill's folder. |

Documents, decks and charts go to their format skill (`docx`, `pptx`, `pdf`, `dataviz`) with the creative philosophy carried in. They get an interview only when the user asks for one. A standalone generated image uses the Codex bridge in `intent-interview/scripts/codex-image.mjs`.

Requests that span several skills run in order: interview, explore if a choice is open, build, verify, feedback. "Give me options and build the best one" means explore, then wait for the user's pick unless they handed you the choice. "Audit and fix" means verify, fix the confirmed findings, then verify again with a fresh reviewer.

## Hand off

Say in one line which skill comes next and why. Name the governing authority level when two sources conflicted. Pass along:

- the artifact and the single job it does for its audience
- the user's explicit instructions for this task
- the brief's location and status
- taste signals that apply, labelled as contextual evidence with their domain
- what is still uncertain
