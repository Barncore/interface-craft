# Direct manipulation

For drag, swipe, drawers, reordering, scrubbers and any interaction where an object should feel attached to the user's movement. These principles hold across visual styles; they need neither an Apple look nor a particular spring library. Sources: Emil Kowalski's apple-design notes and Apple's [Designing Fluid Interfaces](https://developer.apple.com/videos/play/wwdc2018/803/).

## Keep contact

- Preserve the offset between the pointer and the point where the object was grabbed, in one coordinate space, so scrolling, transforms and nested containers don't cause jumps.
- Use [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) with pointer capture once dragging starts, so the drag continues outside the element. Set `touch-action` for the intended gesture while leaving unrelated native scrolling alone. Its values name what the browser keeps: `pan-y` on a horizontal carousel means the browser still handles vertical panning, and `none` belongs only on an element that handles every gesture itself. A carousel on native scroll needs no `touch-action` at all: `scroll-snap-type: x mandatory` on the track and `scroll-snap-align: start` on the slides, whose physics beat a hand-rolled spring.
- Recognise every plausible gesture in parallel from the first movement, then cancel the losers once intent is clear. A recogniser that reports only a final state (a `swipeleft` event) throws away the continuous tracking that feedback needs. Double-tap detection delays every single tap, so pay that cost only where a double-tap does something.
- Ignore extra touch points once a drag has begun, or the object jumps.
- Distinguish a tap from a drag with a small movement threshold, and use hysteresis near boundaries so states don't flicker. Tune the distances to the gesture.
- Handle cancellation and lost capture, and give every gesture a keyboard or control-based equivalent.

## Carry motion, not just a destination

- During the drag, position follows input directly, unless resistance is part of the material. In React, it follows through a motion value or a ref, never component state (see item 8 in [motion-mechanics.md](motion-mechanics.md)).
- Estimate release velocity from a short window of timestamped samples; an old sample after a pause should not fling the object.
- A flick should be enough: dismiss on velocity (roughly `|distance| / elapsedMs > 0.11`) rather than demanding a distance threshold.
- Decide commit or reverse by the direction of the release velocity, not the position: a drawer dragged 80% closed and then flicked back open stays open.
- Project the release velocity to choose the snap target, bounded to valid destinations, then hand the current position and velocity to the settling animation. Check the animation API's units, since pixels per second, normalised velocity and spring parameters don't interchange, and guard tiny remaining distances against division by zero.
- When new input interrupts settling, continue from the visible position and current velocity. Retargeting from the logical destination makes a jump.

## Boundaries

- Past a boundary, movement meets rising resistance (rubber-banding) instead of an invisible wall. The overshoot never creates an invalid selected state.
- Anchor expansion to its source when that relationship explains the interface, and keep object identity across transitions. A different exit path can signal a different meaning, such as throwing something away.

## Springs

Springs settle on physical parameters instead of a fixed duration and keep velocity when interrupted, which suits gestures. Apple-style parameters are easy to reason about, for example `{ type: "spring", duration: 0.5, bounce: 0 }`: critically damped, graceful and quiet, the default for most UI. In a task interface, add bounce (around 0.2) only when the gesture itself carried momentum, such as a flick, a throw or a drag release. Overshoot on a menu that just faded in feels wrong; overshoot on a card you flicked feels right. Playful and expressive work can carry more, set by the brief (see `explore/references/expressive-interaction.md`).

Move a 2D drag with independent X and Y springs. One spring on the 2D distance desyncs when the two axes have different velocities. For decorative pointer-following, interpolate through a spring rather than tying the value straight to the pointer.

## Check

Exercise a grab, a slow release, a flick, a pause before release, a reversal during settling, boundary resistance, cancellation, and an interrupted close and reopen, with touch scrolling, keyboard operation and reduced motion. Make smoothness claims only after trying representative hardware.
