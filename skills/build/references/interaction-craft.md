# Interaction craft

Focused notes for content that changes size, things that leave, sound, loading ahead of intent, and fine icon behaviour. Selected from [User Interface Wiki](https://github.com/raphaelsalaja/userinterface-wiki) principles; the framework in use may already solve some of these.

## Containers that animate to fit content

Separate the element you measure from the wrapper whose size animates. Measuring the animated wrapper feeds its in-between sizes back into its own target. Observe intrinsic changes (fonts loading, responsive wrapping, async data) and batch reads and writes to avoid a measurement loop.

A first measurement of zero may mean "not laid out yet" or a genuinely collapsed state; keep the first visible render sensible without breaking real collapse. An `overflow: hidden` wrapper can clip focus rings, shadows and popovers, so choose clipping deliberately. Test content replacement and rapid successive changes, not only the first expansion.

## Exits and view transitions

Visual departure and logical removal are different moments. Keep an exiting node mounted for its transition, then remove it when it finishes, and make sure cleanup still happens under reduced motion or interruption, when the end event may never fire.

Decide whether a departing element can still take input. A dismissed control should not stay behind as a ghost hit target or tab stop: move focus somewhere meaningful before making it inert or removing it. An intentionally reversible sheet may stay grabbable while it closes.

For shared-element and view transitions, give each participating element a distinct identity and link only what should appear continuous. The page must stay usable when transitions are unsupported or reduced. Check back navigation, focus and cancellation, not just the forward transition.

## Sound

Use sound when it adds useful feedback or character the brief wants. It is opt-in, has mute and volume control, and never carries essential information alone. Respect user-activation rules ([Web Audio best practices](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Best_practices)).

Reuse one audio context rather than creating one per tap. Shape amplitude with a short attack and release to avoid clicks, and schedule against the audio clock when timing matters. Exponential gain ramps need a positive target, so ramp to a small positive value before stopping. Stop and disconnect finished sources, cap overlapping voices, and test rapid repeats at normal listening volume.

## Loading ahead of intent

When navigation latency is a measured problem, hover dwell, focus, viewport proximity or pointer trajectory can trigger prefetching. Deduplicate requests and bound concurrency so a sweep across a menu doesn't fire a burst. Prefetch only what is safe to fetch speculatively, never a state-changing action, and weigh bandwidth and cache freshness against the latency won.

## Icons and fine type

A morph makes related icon states feel like one object; compatible path structure helps, and a crossfade is clearer for unrelated shapes. Keep the accessible name and state accurate throughout. Stylistic sets and alternate glyphs can clarify identifiers, codes and numerals; check the actual characters and the fallback.

Pseudo-elements and layered backgrounds can add material detail without extra semantic nodes. Decorative layers must not intercept input or hide focus.

Before hand-off, exercise the lifecycle or state change that brought you here and report what you actually observed.
