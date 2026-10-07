# Direct manipulation

For drag, swipe, drawers, reordering, scrubbers and any interaction where an object should feel attached to the user's movement. These principles hold across visual styles; they need neither an Apple look nor a particular spring library. Sources: Emil Kowalski's apple-design notes and Apple's [Designing Fluid Interfaces](https://developer.apple.com/videos/play/wwdc2018/803/).

## Keep contact

- Preserve the offset between the pointer and the point where the object was grabbed, in one coordinate space, so scrolling, transforms and nested containers don't cause jumps.
- Use [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) with pointer capture once dragging starts, so the drag continues outside the element. Set `touch-action` for the intended gesture while leaving unrelated native scrolling alone.
- Ignore extra touch points once a drag has begun, or the object jumps.
- Distinguish a tap from a drag with a small movement threshold, and use hysteresis near boundaries so states don't flicker. Tune the distances to the gesture.
- Handle cancellation and lost capture, and give every gesture a keyboard or control-based equivalent.

## Carry motion, not just a destination

- During the drag, position follows input directly, unless resistance is part of the material.
- Estimate release velocity from a short window of timestamped samples; an old sample after a pause should not fling the object.
- A flick should be enough: dismiss on velocity (roughly `|distance| / elapsedMs > 0.11`) rather than demanding a distance threshold.
- Project the release velocity to choose the snap target, bounded to valid destinations, then hand the current position and velocity to the settling animation. Check the animation API's units, since pixels per second, normalised velocity and spring parameters don't interchange, and guard tiny remaining distances against division by zero.
- When new input interrupts settling, continue from the visible position and current velocity. Retargeting from the logical destination makes a jump.

## Boundaries

- Past a boundary, movement meets rising resistance (rubber-banding) instead of an invisible wall. The overshoot never creates an invalid selected state.
- Anchor expansion to its source when that relationship explains the interface, and keep object identity across transitions. A different exit path can signal a different meaning, such as throwing something away.

## Springs

Springs settle on physical parameters instead of a fixed duration and keep velocity when interrupted, which suits gestures. Apple-style parameters are easy to reason about, for example `{ type: "spring", duration: 0.5, bounce: 0.2 }`. Keep bounce subtle (0.1 to 0.3) and reserve it for drag-to-dismiss and playful moments; work tools usually want none. For decorative pointer-following, interpolate through a spring rather than tying the value straight to the pointer.

## Check

Exercise a grab, a slow release, a flick, a pause before release, a reversal during settling, boundary resistance, cancellation, and an interrupted close and reopen, with touch scrolling, keyboard operation and reduced motion. Make smoothness claims only after trying representative hardware.
