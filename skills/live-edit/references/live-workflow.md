# Live editing

The engine injects selection controls into a running local page. The user picks an element and asks for a change; you build variants in source; the user flips between them in the page and accepts or discards. You do the design work; the tool only carries requests and swaps variants.

Commands go through the launcher, with the actual project root. `<plugin root>` is two folders above the `live-edit` skill folder.

```bash
node "<plugin root>/tools/impeccable/run.mjs" --root <project> live
node "<plugin root>/tools/impeccable/run.mjs" --root <project> live-poll
```

## Prepare

- Inspect the entry point, the dev command, uncommitted changes, and the project's `DESIGN-BRIEF.md` and `DESIGN.md`.
- The tool needs `.impeccable/live/config.json` naming the real entry files, the insertion point and the comment syntax. Use the tool's diagnostics and the inspected framework structure; never guess a framework's entry path. Check the Content Security Policy without weakening it. A plain HTML setup can name `index.html` with `insertBefore: "</html>"`, `commentSyntax: "html"`, and `cspChecked: true` only after you have actually checked.
- Save the exact current bytes of every file the session can touch, outside the served folder, and note their paths. A git commit alone doesn't preserve uncommitted work.
- Avoid minified or generated source. Try an unfamiliar framework adapter on a disposable copy first.
- Start the app's own dev server and the live tool, then open the local page in the browser pane. The launcher writes boot output to `.impeccable/live/live-boot.log` and redacts session tokens. Never expose the server publicly; treat session tokens as temporary credentials.

## Handle a request

Poll with a command that can wait. A generate event carries the picked element, the request, and often a proposed source span. Check the actual source against `replaceStartLine` and `replaceEndLine`, and reject a span that includes unrelated content. If the locator can't find the element, `live-wrap` accepts an observed id, class or selector plus file or text hints; a tag name alone isn't enough.

Build all the requested variants in one source edit using the returned wrapper contract. Shape them from the brief and the creative philosophy, not from the tool's defaults. Keep ids, ARIA relationships, handlers and content outside the chosen scope intact, and never publish an empty wrapper between edits. Then reply:

```bash
node "<plugin root>/tools/impeccable/run.mjs" --root <project> live-poll --reply <id> done --file <relative-file>
```

Reply `error "short reason"` if generation fails, so the page leaves its busy state. Don't reuse a session id that was already completed or discarded. Poll again for accept, discard or steering, and inspect the result of any mechanical accept or discard before treating it as done. `live-status` and `live-resume` recover an interrupted session; `--help` lists the pinned command's exact options.

## Finish

Check the accepted change survived in source and nothing unrelated moved, then run verify's inline check. Stop the tool:

```bash
node "<plugin root>/tools/impeccable/run.mjs" --root <project> live-server stop
```

Confirm the live markers and temporary wrappers are gone, reload the page, and stop only the dev server you started. If cleanup changed unrelated code, restore just those files from the snapshot, after checking for concurrent edits. In the September 2026 pilot, cleanup on a minified document removed existing inline styles, so never assume a discard is a full rollback.

Coverage: one static HTML flow on Windows x64 with Edge or Chrome was exercised. Other frameworks and browsers are untested. When the tool can't locate an element safely, fall back to ordinary source edits compared in the browser.

Protocol source: [Impeccable live reference](https://github.com/pbakaus/impeccable/blob/main/skill/reference/live.md). This adapts the mechanism, not upstream's design rules.
