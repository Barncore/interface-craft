# The detector

Deterministic detection of known generated-UI patterns, used by the lint reviewer. It reports what is present; whether a present pattern is wrong for this project is someone else's call.

This file covers websites and web apps. For a native iOS or Android app, the engine can't read the code and the web patterns don't fit: follow [native-checks.md](native-checks.md) instead, and use this file only for **Lint exceptions** and [Adding a pattern](#adding-a-pattern).

## The engine

The pinned Impeccable engine is bundled in this plugin under `tools/` (Windows x64 only, no download, no telemetry). `<plugin root>` is two folders above the `verify` skill folder; give the lint reviewer the absolute path.

```bash
node "<plugin root>/tools/scan-design.mjs" --mode source --target <file> [--target <file> ...] --out <report-dir> --root <project-root>
node "<plugin root>/tools/scan-design.mjs" --mode browser --target <http://localhost:...> --out <report-dir> --root <project-root>
```

Use browser mode when JavaScript or rendered styles matter; source mode does not run scripts. Write reports to a temporary folder, not the project. The wrapper writes `scan-report.json` with the engine's exit code, a `status` of `completed`, `findings` or `operational-failure`, and normalised findings.

On a machine that isn't Windows x64 the engine can't run; the wrapper reports an operational failure. Say so and use the web pattern checks below.

## Dispositions

The adapter maps each rule to a disposition:

- Accessibility and interaction-correctness rules (`low-contrast`, `missing-alt`, `missing-label`, `empty-link`, `empty-button`, `positive-tabindex`, `clickable-div`, `clickable-span`) become warnings marked `candidateHardGate`. They become hard-gate failures only once confirmed in the source or the running page, and project configuration can't reclassify them.
- Stylistic generated-UI rules (`ai-color-palette`, `gradient-text`, `excessive-rounded-cards`, `card-on-card`, `side-tab`, `border-accent-on-rounded`, `marquee`, `bounce-easing`, `overused-font`, `dark-glow`) become critique. Glow, a dark foundation, a particular font or a gradient can be exactly right for a brief; a rule cannot tell a reference-grade glow from a cheap one.
- Everything else becomes a warning.

A project can record deliberate choices in `DESIGN.md` under **Lint exceptions** (rule id, why it applies here, who decided, date). Report a finding covered by an exception as approved, with the exception cited. For the adapter to apply an override itself, `.interface-craft/config.json` can hold `{"audit":{"impeccable":{"overrides":{"<rule>":{"disposition":"approved","reason":"...","sourceRef":"DESIGN.md#lint-exceptions"}}}}}`.

## Limits

An empty findings array is not a complete audit. In the pinned engine's pilot (nine cases, September 2026) it caught linked CSS and rendered contrast changes, missed a JavaScript-only condition in source mode as expected, and missed an unlabelled input. An exit code of 1, invalid JSON or a timeout is an operational failure, never a pass. Don't rerun a scan that already returned usable findings in the same review.

## Web pattern checks

Without the engine, or alongside it, look for these by reading the changed files. They are presence checks only.

- warm cream grounds near `#F4F1EA` with a high-contrast serif and terracotta accent; near-black with a single acid-green or vermilion accent; broadsheet hairline columns
- same-size icon-heading-text card grids as the whole structure; cards inside cards
- an eyebrow label or "Introducing" chip above headings; numbered markers on non-sequential content
- gradient text; a coloured `border-left` stripe on cards and callouts; hard offset block shadows
- pulsing-dot or spinner-only loading; generic CTAs ("Get started", "Learn more")
- grey text on coloured backgrounds; emoji or Unicode glyphs as icons
- `transition: all`; bounce or elastic easing on functional UI; `scale(0)` entrances
- mismatched nested radii; zero-offset coloured glows used as shadows
- italic accent words in headings; monospace labels outside code and data; pill-shaped buttons as the default
- a 1px grey border round every container (`border-gray-200`, `#E5E7EB`) doing the grouping that space should do; a large soft shadow on every card
- one padding and gap value at every level, so the gap between sections equals the gap between items
- every section fading or sliding up on scroll, or every list staggering in
- in an app screen or tool, a decorative hero or gradient band above the task
- `ease-in` (not `ease-in-out`) on UI transitions; UI transition durations over 300ms; `@keyframes` on toasts or toggles

To find the motion in the changed files, search for `transition`, `animation`, `@keyframes`, `motion.`, `animate={`, `useSpring`, `ease-in`, `transform-origin` and `prefers-reduced-motion`.

Two patterns only show on a running page, so check them when a URL is available: leave a route and return to see whether entrances replay, and watch a first load and a refetch to see whether an empty state ("No results", "Nothing here yet") flashes before the data arrives. The flash is a candidate hard gate, as false system state; replaying entrances are critique.

## Adding a pattern

A pattern joins the web list or the native list only after the same failure shows up across several generations; one model's one-off quirk stays out until it repeats. Keep each list near twenty lines, because recognition drops as a list grows: when one goes in, look for one that generated work no longer shows and take it out. A sign that holds on both platforms goes in both lists, each worded with its own platform's fix.
