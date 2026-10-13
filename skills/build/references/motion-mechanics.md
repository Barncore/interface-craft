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
2. For DOM motion, animate `transform` and `opacity`. Animating width, height, margin, padding, top or left forces layout every frame. An animated `box-shadow` repaints the element every frame and is the one people miss: animate `filter: drop-shadow()` instead, and check the render, since `drop-shadow` follows the element's visible shape rather than its box.
3. Name the properties you transition; never `transition: all`.
4. Transitions retarget mid-flight; keyframes restart from zero. Use transitions (or springs) for anything triggered rapidly, like toasts and toggles. `@starting-style` animates entry from `display: none` without JavaScript.
5. Motion that runs while the page is doing heavy work (a page transition, a tab indicator during navigation, anything alongside data fetching or hydration) belongs in CSS or the Web Animations API, which survive a busy main thread better than rAF loops. Framer Motion's `x`, `y`, `scale` and `rotate` shorthands are driven by CSS variables, which aren't hardware-accelerated; they read better, so keep them by default and switch to a full `transform` string for motion that has to survive a busy page.
6. Setting a CSS variable on a parent to drive children's transforms recalculates every child's style; set `transform` on the element directly.
7. `will-change` sparingly, only around a known expensive animation. A browser can hand an animation from the CPU to the GPU mid-flight, and the hand-off can shift the element by a pixel at the start or end; `will-change` promotes it up front so no hand-off happens. So remove it at rest on a large or rarely animated layer, where it only holds memory, and leave it on a small element whose shift would show. Bound blur, filter, shadow and canvas work to small regions.
8. Never drive an animation through React state. A `setState` per frame re-renders the component every frame, and the render alone blows the budget. State updates inside `requestAnimationFrame`, `pointermove`, `scroll` or drag handlers are the sign; drive the motion with a motion value, a ref or CSS instead.
9. Nonessential loops stop when offscreen or hidden. Scroll-driven animation needs a reason the scroll relationship matters, and a static fallback.
10. Gate hover motion behind `@media (hover: hover) and (pointer: fine)`.
11. Motion is never the only cue for a state.

## When it stutters

For web animation that drops frames; native apps keep motion on the UI thread instead, as [native-platforms.md](native-platforms.md) says. Name the cause before changing code, and work down this list, which runs from the most common cause:

1. Which properties animate? Anything but `transform` and `opacity` is the first suspect: layout properties, then `box-shadow` and `border-radius`, which don't look like layout.
2. Is the page busy at the same moment (navigation, fetching, hydration, a long task)? Move the animation to CSS or the Web Animations API.
3. Is React re-rendering every frame?
4. Does it get worse as content grows? An inherited CSS variable, or too many nodes animating at once.
5. Is a CSS variable animated, directly or through Framer Motion's shorthands?
6. Is a `blur()` above 20px animated?
7. Only then add `will-change: transform`. Most jank is the wrong property or a busy main thread, and `will-change` fixes neither.

A frame at 60Hz has 16.7ms; at 120Hz, which most phones and many laptops now run, it has 8ms, so design against 8ms. A fast development machine proves nothing: say which findings came from reading the code and which need a recording on a real device.

## Reduced motion

Respect `prefers-reduced-motion` with an intentional alternative that keeps state change and hierarchy: replace slides and scales with an opacity change, drop parallax and autoplay. A global `0.01ms` kill switch that erases useful feedback is a defect too.

## Check

Inspect enter, interruption, reversal and exit. A beautiful entrance with a confused exit is still confused.

To fix motion that feels wrong, take the earliest move that works: delete it (it's frequent, keyboard-triggered or has no purpose), reduce it (shorter, smaller, fewer properties), fix the easing, fix the origin and physicality, then make it interruptible. Retuning the curve of an animation that shouldn't exist is wasted polish. For gestures, read [direct-manipulation.md](direct-manipulation.md); for measured containers and exit lifecycles, [interaction-craft.md](interaction-craft.md).
