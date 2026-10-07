# Accessibility gates

Accessibility sits at the top of the authority order: above explicit instruction, project direction and taste. Most of it comes free from using the platform properly. Walk the interface as a keyboard-only user first (every flow completes without a mouse), then as a screen-reader user (each control announces a name, a role and its state). When unsure, prefer the platform default over a custom rebuild, and remove ARIA rather than add it.

## The gates

1. **Native elements first.** `<button>` for actions; `<a href>` for navigation, so Cmd, Ctrl and middle-click work. Never a clickable `<div>` or `<span>`. No ARIA beats bad ARIA.
2. **Visible focus.** Style `:focus-visible`, not bare `:focus`. Prefer the browser's own indicator; a custom ring is at least a 2px solid perimeter, checked against every colour it crosses and in forced-colours mode. `outline: none` only with a verified replacement.
3. **Keyboard paths.** Every pointer interaction has one, following the ARIA Authoring Practices: Escape closes overlays, arrow keys move within composite widgets, Tab moves between widgets, Enter and Space activate. Only `tabindex="0"` and `"-1"`; composite widgets use a roving tabindex.
4. **Trap and restore focus.** Modals make the background `inert`, move focus inside on open, return it to the trigger on close, and set `overscroll-behavior: contain`.
5. **Target size.** WCAG 2.5.8 AA asks for 24×24 CSS px or its spacing exceptions. Aim for 44×44 on touch and 40×40 on desktop where density allows; extend small visible targets with a pseudo-element, and never let extended hit areas overlap.
6. **Labelled, typed controls.** Every input has a `<label>`, and a placeholder is never the label. Label and control share one hit target. `autocomplete` with a meaningful `name`, the right `type` and `inputmode`. Never block paste.
7. **Errors that announce.** Keep submit enabled until the request starts, then show progress with the label kept. Validate on submit: `aria-invalid="true"`, `aria-describedby` pointing at inline error text, and focus moved to the first invalid field. Native `disabled` for genuinely unavailable controls; `aria-disabled` only when keeping focusability is intentional, with behaviour blocked in code.
8. **Accessible names.** Icon-only buttons get a descriptive `aria-label`; the visible label text appears in the accessible name; decorative elements get `aria-hidden="true"`, never on anything focusable.
9. **Not colour alone.** Status has a second cue: an icon, text or underline. Contrast is measured on the rendered pair (see `build/references/colour-systems.md` for thresholds).
10. **Reduced motion.** Movement is opt-in under `prefers-reduced-motion: no-preference`, and the reduced path keeps state changes visible (an opacity change, not nothing). Autoplaying media has a visible pause control. Toasts that carry actions or errors stay until dismissed.
11. **Announced updates.** `aria-describedby` for field validation; a polite `role="status"` region, rendered empty before it is updated, for non-urgent updates such as toasts and result counts; `role="alert"` only for urgent errors.
12. **Alt text by purpose.** Decorative images `alt=""`; informative images describe the meaning; functional images describe the action (`alt="Search"`, not "magnifying glass").
13. **Structure is navigation.** Headings describe their sections and form a coherent outline. One visible `<main>`. A "Skip to content" link first when repeated chrome precedes the content. Anchored headings get `scroll-margin-top`.
14. **Zoom and reflow.** Works at 200% zoom and reflows at 320px wide without horizontal scrolling. `min-height`, not fixed `height`, on text containers. Never `user-scalable=no` or `maximum-scale=1`.

## Also check

- Interactive states increase contrast: hover, active and focus are more prominent than rest.
- Disabled controls get no tooltip; tooltips on disabled elements are unreachable.
- Hover styles sit behind `@media (hover: hover)`, and no autofocus on touch devices.
- Persona walks for the primary action, when the review is broad: an impatient power user (no keyboard path, no bulk actions, forced onboarding), a confused first-timer (icon-only navigation, jargon, no visible help), a keyboard or screen-reader user, a stress tester (edge inputs, refresh mid-flow, silent failures), and a distracted one-thumbed phone user (top-of-screen actions, lost state, tiny targets). Report specific failing elements, never persona prose.
- Cognitive load: count what a user must hold in mind at once. Four is fine; five to seven wants grouping; eight or more is overload.
