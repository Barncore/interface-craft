# Motion mechanics

## Match motion to the brief

Name what each motion does: feedback, spatial continuity, state indication, preventing a jarring change, explanation, delight, atmosphere or play. Its purpose sets its intensity.

By default, reserve expressive motion for occasional moments in frequent-use task interfaces, unless the user or the brief calls for a richer motion language. In immersive and exploratory experiences, motion can be central to how the interface communicates; develop it with `explore/references/expressive-interaction.md`. Either way, repeated actions stay responsive and essential information stays readable.

## Defaults for task interfaces

These values come from Emil Kowalski's practice and are tuned for product UI. Start from the project's motion tokens when they exist.

- **Frequency.** Anything seen a hundred times a day, and anything triggered from the keyboard, gets no animation; there it reads as lag. Tens of times a day: fast and subtle, or nothing. Occasional: standard. Rare and first-time: room for delight.
- **Duration.** Press feedback 100 to 160ms; tooltips and small popovers 125 to 200ms; dropdowns and selects 150 to 250ms; modals and drawers 200 to 500ms. UI motion generally stays under 300ms. A deliberately authored focal entrance can take 500 to 800ms. Explanatory and marketing motion can run longer.
- **Easing.** Entering and exiting: a strong ease-out. Moving between on-screen positions: ease-in-out. Constant motion: linear. Ease-in on UI delays the very moment the user is watching. The built-in CSS curves are weak; useful custom ones are `cubic-bezier(0.23, 1, 0.32, 1)` for UI ease-out, `cubic-bezier(0.77, 0, 0.175, 1)` for on-screen movement, and `cubic-bezier(0.32, 0.72, 0, 1)` for an iOS-like drawer.
- **Physicality.** Enter from `scale(0.9 to 0.97)` with opacity, never `scale(0)`. Popovers, menus and tooltips grow from their trigger (`transform-origin` at the trigger); modals stay centred. Press feedback around `scale(0.97)` on `:active`. Exits are quieter than entrances.
- **Stagger** only things that appear as a list, 30 to 80ms apart, with a capped total. It is decorative, so it never blocks interaction, and not every scrolled section is a list.
- **Asymmetric timing.** Slow where the user is deciding (a press-and-hold), fast where the system responds (the release).
- **Masking a rough crossfade.** A brief `filter: blur(2px)` during the transition blends two states into one perceived change; keep blur under 20px, as heavy blur is expensive in Safari.
- After the first tooltip in a toolbar opens, show the rest instantly with no delay or animation.

## Implementation

1. Choose the simplest approach that keeps the intended behaviour: CSS transitions, CSS animations, the Web Animations API, or an existing motion library for springs, gestures and orchestration. Deformable surfaces, optical effects and spatial scenes need the renderers in `expressive-interaction.md`.
2. For DOM motion, animate `transform` and `opacity`. Animating width, height, margin, padding, top or left forces layout every frame.
3. Name the properties you transition; never `transition: all`.
4. Transitions retarget mid-flight; keyframes restart from zero. Use transitions (or springs) for anything triggered rapidly, like toasts and toggles. `@starting-style` animates entry from `display: none` without JavaScript.
5. In Framer Motion, the `x`, `y` and `scale` shorthands run on the main thread and drop frames under load; animate a full `transform` string instead. CSS animations survive a busy main thread better than rAF loops.
6. Setting a CSS variable on a parent to drive children's transforms recalculates every child's style; set `transform` on the element directly.
7. `will-change` sparingly, only around a known expensive animation, and removed at rest. Bound blur, filter, shadow and canvas work to small regions.
8. Nonessential loops stop when offscreen or hidden. Scroll-driven animation needs a reason the scroll relationship matters, and a static fallback.
9. Gate hover motion behind `@media (hover: hover) and (pointer: fine)`.
10. Motion is never the only cue for a state.

## Reduced motion

Respect `prefers-reduced-motion` with an intentional alternative that keeps state change and hierarchy: replace slides and scales with an opacity change, drop parallax and autoplay. A global `0.01ms` kill switch that erases useful feedback is a defect too.

## Check

Inspect enter, interruption, reversal and exit. A beautiful entrance with a confused exit is still confused. For gestures, read [direct-manipulation.md](direct-manipulation.md); for measured containers and exit lifecycles, [interaction-craft.md](interaction-craft.md).
