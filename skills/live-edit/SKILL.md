---
name: live-edit
description: Live-edit a running local web page by pointing at elements. Use when the user wants to click an element in their local site, try variants in place, and keep or discard them.
---

# Live edit

Make small design decisions visible in the actual running interface. The user picks an element in their local page and asks for a change; you build variants in source; they flip between them in the page and keep or discard. You do the design work, guided by the brief and [the creative philosophy](../route/references/creative-philosophy.md). The tool only carries requests and swaps variants.

The engine is the pinned Impeccable binary bundled in this plugin at `<plugin root>/tools/impeccable/`, where `<plugin root>` is two folders above this skill's folder. It is Windows x64 only, downloads nothing, and sends no telemetry.

Follow [live-workflow.md](references/live-workflow.md) for setup, handling requests and cleanup. It matters because the tool edits source: work on a local development copy, snapshot every file the tool can touch first (a git commit alone doesn't keep uncommitted work), check each source span before writing variants, and confirm cleanup removed every temporary wrapper.

Use it only for an authorised live-edit task on a local development server, never on a deployed site. It covers web projects only; native iOS and Android work doesn't apply. If the tool can't locate an element safely, or the machine isn't Windows x64, make the change in source and compare it in the browser instead, or use `explore` for a full-size comparison.
