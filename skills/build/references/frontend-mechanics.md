# Frontend mechanics

The craft floor for web UI. These are defaults that generated interfaces most often miss. A brief's own words can earn any of them back, but reaching for one of the "AI tells" because the axis was free means no decision was made.

## Semantics and states

- Native elements first: `<button>` for actions, `<a href>` for navigation, real `<label>`s, `<table>` for tables. ARIA only where no native element exists.
- Every interactive component ships its full set of states: default, hover, focus, active, disabled, loading, error. Skeletons beat spinners for content that has a shape.
- Design the absence and failure states, not just the happy path: loading, empty, error, disabled, success, destructive, permission, long content. Empty states say what the place is and give one next action.
- Prefer undo over confirmation when recovery is safe; confirm only what is truly unrecoverable.
- Optimistic local updates roll back with clear feedback on a server error. Feedback appears near its trigger.
- Overlays escape `overflow` ancestors (dialog, popover, portal). A modal is for tasks that need interruption or protected focus; try inline or progressive disclosure first.
- Default state keeps content visible: if a script fails, entrance animations must not leave the page blank.

## Layout and space

- Group with space first, background shapes second, separator lines last. In task UIs the gap between groups is roughly twice the gap within a group, or grouping reads as noise. Alternate tight and generous intervals; one spacing value repeated everywhere is density without cadence.
- A 4-unit base scale gives the useful middle steps an 8-only scale misses. Optical corrections may break the scale when they improve the composition.
- Heading spacing is asymmetric: more space above a heading than below it.
- Density follows use. Frequent, simple tasks tolerate more density than rare, complex decisions, and a compact region can sit inside a spacious page.
- Align to shared edges; every stray edge reads as noise. Use logical properties (`margin-inline-start`) for anything direction-dependent.
- Keep controls visibly distinct from static content.
- Content and media can bleed to the viewport edges; controls and text stay inside the layout margins and safe areas. `env(safe-area-inset-*)` returns zero without `viewport-fit=cover` in the viewport meta.
- Breakpoints come from where the content stops fitting, not device presets. Hold the expanded layout as long as it fits; prefer container queries for components. Author mobile-first.
- Detect input, not screen size: `@media (pointer: coarse)` gets larger targets, `(hover: hover)` gates hover styles. A touchscreen laptop breaks any width-based guess.
- On mobile, primary controls sit within thumb reach; at narrow widths data tables become stacked cards rather than shrinking or side-scrolling. Keep the same information architecture everywhere and hide nothing important on mobile.
- Hint at hidden content: let the next carousel item peek past the edge, or show a disclosure control.
- No fixed widths or heights on text containers; plan for long and translated strings.

## Geometry and depth

- Nested radii are concentric: outer radius equals inner radius plus padding. Mismatched radii are one of the loudest tells of generated UI.
- Real shadows have offset and soft blur; a zero-offset coloured halo is decoration, not depth. Layered `box-shadow` reads as depth better than a flat border.
- Optical alignment beats geometric for icons in buttons, punctuation and curves.
- Decorative layers (glows, gradients, blurs) set `pointer-events: none`.
- A 1px outline helps images hold their edge against a similar background.

## Common AI tells

Each is legitimate when the brief earns it. Reached for by default, it marks the work as generated.

- Same-size cards of icon, heading and text as the page's whole structure; cards nested inside cards
- An eyebrow label above every heading; numbered markers on content that isn't a sequence
- Gradient text as the only visual idea; a coloured `border-left` stripe on cards and callouts
- Hard offset block shadows outside a genuinely neobrutalist world
- Sparklines, progress rings and soft rounded rectangles standing in for real content
- Pulsing-dot loaders, hero "Introducing" chips, generic CTAs ("Get started", "Learn more")
- Grey text on coloured backgrounds (derive secondary text from the surface's hue instead)
- Emoji or Unicode glyphs as an icon system (use one drawn icon family, matched to the type's weight)
- A system font as the display voice of a page meant to have its own world
- Bounce easing on functional UI

## Images and performance

- `<img>` gets explicit width and height or `aspect-ratio`; lazy-load below the fold; prioritise the hero.
- `srcset` and `sizes` for resolution switching; `<picture>` for art direction with different crops. Modern formats (AVIF, WebP) around 80 to 85 percent quality, and never a 3000px image in a 300px slot.
- Measure before optimising, on a mid-range device with a throttled connection, and fix the biggest bottleneck first. Core Web Vitals budgets: LCP under 2.5s, INP under 200ms, CLS under 0.1.
- Subset fonts with `unicode-range` and load only the weights in use.
- Virtualise long lists; avoid layout reads during render; batch DOM reads and writes.
- When real imagery is implied, look for the subject's actual objects rather than the category's stock image. One decisive photo beats five mediocre ones. Check that image URLs resolve.

## Finishing pass

Triage in this order, and bring everything up to the same bar before perfecting one corner: broken or blocked tasks and misleading state; missing states; flow, hierarchy and responsive problems; visual and motion inconsistencies; code and asset cleanup. Classify each inconsistency before fixing it (a missing token, a one-off that should use a shared component, a mismatch with neighbouring flows, or a plain local defect) and fix it at the narrowest correct level.
