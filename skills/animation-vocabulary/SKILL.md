---
name: animation-vocabulary
description: Names motion and interaction effects. Use when the user asks what an effect is called, or describes an animation, transition, scroll or WebGL effect without knowing the term to ask for.
---

# Animation vocabulary

Turn a description of what someone sees or feels ("the bouncy thing when a popover opens", "the cards stretch like taffy when you swipe") into the precise term, so they know what to ask a designer, a developer or an AI for.

Read for the sensation, not the keywords. Lead with the best-matching term and a one-line definition. If two terms compete, add one or two alternates with how they differ. If the effect combines several mechanisms, name each part ("a stagger of scale-in entrances"; "a 3D fold with velocity smearing and chromatic fringing"). If it has a specific published name, give that too, with where it comes from. Keep it short: a naming question wants a name, not an essay. The glossary below is a seed, not a boundary; use any established term that fits better, and say plainly when your answer is an approximation.

For "the bouncy thing when a popover opens", the answer looks like this:

> **Pop in:** an element appears with a slight overshoot, as if it bounced into place.
>
> Close alternates: **scale in** (grows from slightly smaller with a fade, no overshoot); **spring** (physics-driven settling, where the overshoot comes from low damping).

## Entrances and exits

- **Fade in / out:** appears or disappears by opacity.
- **Slide in:** enters from off-screen along one edge.
- **Scale in:** grows from slightly smaller to full size, usually with a fade.
- **Pop in:** appears with a slight overshoot.
- **Reveal:** content uncovered gradually, usually by an animated clip path or mask.
- **Enter / exit transition:** the motion an element plays when added to or removed from the screen.

## Sequencing and timing

- **Keyframes:** fixed points in an animation that the browser fills between.
- **Interpolation (tweening):** generating the in-between values so motion is continuous.
- **Stagger:** items animate one after another with a small delay, making a cascade.
- **Orchestration:** timing several animations so they read as one coordinated motion.
- **Delay / duration:** time before an animation starts / how long it runs.
- **Fill mode:** whether an element holds its first or last frame outside the animation.
- **Stepped animation:** motion in discrete jumps, like a flip clock.

## Transforms and space

- **Translate, scale, rotate, skew:** move, resize, spin, or shear an element.
- **3D tilt / flip:** rotation around the X or Y axis, giving depth.
- **Perspective:** how strong the 3D effect looks; lower values exaggerate depth.
- **Transform origin:** the anchor point a scale or rotation grows or spins from.
- **Origin-aware animation:** an element grows out of its trigger, like a popover from the button that opened it, rather than from its own centre.
- **Parallax:** layers move at different speeds, suggesting depth.

## Between states

- **Crossfade:** one element fades out as another fades in, in the same spot.
- **Continuity transition:** keeps you oriented by visibly connecting before and after.
- **Morph:** one shape smoothly becomes another, like Dynamic Island.
- **Shared element transition:** an element travels and transforms between positions, like a thumbnail expanding into a card.
- **Layout animation (FLIP):** an element animates to its new size or position instead of snapping.
- **View transition:** the browser animates between two states or pages, linking shared elements.
- **Accordion / collapse:** a section animates its height open and closed.
- **Direction-aware transition:** forward slides one way and back slides the other.

## Scroll

- **Scroll reveal:** elements animate in as they enter the viewport.
- **Scroll-driven (scroll-linked) animation:** progress tied directly to scroll position.
- **Scrollytelling:** a narrative whose scenes change as you scroll.
- **Scroll snapping:** scrolling settles on defined positions.
- **Pinning:** a section holds in place while its contents animate, then releases.

## Interaction and feedback

- **Hover effect, press feedback:** a visual change on pointer-over; a subtle scale-down on press so it feels physical.
- **Hold to confirm:** a fill grows while the button is held.
- **Drag, drag to reorder, swipe to dismiss:** moving an object by grabbing it; rearranging a list as others make room; flicking something away to close it.
- **Rubber-banding:** rising resistance and snap-back when you drag past a boundary.
- **Momentum / inertia:** motion that carries velocity after release.
- **Magnetic cursor:** an element pulls toward the pointer as it approaches.
- **Cursor follower:** an element trails the pointer, often through a spring.
- **Shake:** a quick side-to-side jitter signalling rejected input.
- **Ripple:** a circle expanding from the tap point.

## Easing and springs

- **Easing:** how speed changes over an animation. **Ease-out** starts fast and settles (the default for responsive UI); **ease-in** starts slow; **ease-in-out** is slow, fast, slow; **linear** is constant.
- **Cubic-bezier:** a custom easing curve. **Asymmetric easing** accelerates and decelerates at different rates.
- **Spring:** motion driven by stiffness, damping and mass rather than a duration. **Damping** sets how fast it settles; low damping gives **bounce**. **Perceptual duration** is when it looks finished.
- **Interruptible animation:** can be redirected mid-flight, keeping its velocity.

## Ambient motion

- **Loop, yoyo (alternate):** repeats; plays forward then back.
- **Marquee:** content scrolling continuously.
- **Float, pulse, orbit:** gentle drifting; repeating scale or opacity; circling another element.
- **Idle animation:** subtle life while an element waits.

## Material, optical and WebGL effects

- **Vertex deformation (mesh deformation):** bending, folding or curling a surface's actual geometry, so its silhouette changes, not just its angle.
- **Fold / curl / page-turn effect:** a surface bending over itself as if made of paper or fabric.
- **UV displacement (distortion):** shifting where an image samples its pixels, making it ripple, warp or flow.
- **Liquid distortion:** displacement that behaves like fluid, often driven by noise or a flow field.
- **Image smearing (velocity smear):** an image stretches along the direction of motion, faster movement giving longer streaks.
- **Motion trail / temporal feedback:** previous frames linger and fade, leaving a trace.
- **Motion blur:** blur along the direction of movement.
- **Chromatic aberration (chromatic fringing, RGB split):** red, green and blue channels offset slightly, giving prismatic edges.
- **Refraction:** content behind a surface bends as if seen through glass or water.
- **Caustics:** the bright rippling light patterns of light through water.
- **Metaballs (gooey effect):** blobs that merge and separate like liquid.
- **Dithering / halftone:** tone built from patterns of dots or pixels.
- **Noise / flow field:** procedural randomness that drives organic movement or texture.
- **Particles:** many small elements animated together, often responding to the pointer.
- **Shader:** a small GPU program that draws or transforms pixels (fragment shader) or geometry (vertex shader).
- **Post-processing:** effects applied to the whole rendered frame, such as bloom, grain or aberration.
- **Bloom / glow:** bright areas bleeding soft light.
- **Clip path / mask:** revealing part of an element through a hard-edged shape, or a soft fadeable one.
- **Line drawing:** an SVG path that draws itself in.
- **Text morph, number ticker, typewriter:** text changing character by character; digits rolling to a value; text appearing one character at a time.
- **Skeleton / shimmer:** a placeholder with a moving sheen while content loads.

## Performance

- **Frame rate, jank, dropped frame:** frames drawn per second; visible stutter; a missed frame.
- **Compositing / hardware acceleration:** animating `transform` and `opacity` on the GPU without redoing layout or paint.
- **Layout thrashing:** animating width, height, top or left, forcing layout every frame.
- **will-change:** a hint that an element will animate, so the browser can prepare a layer.

## Principles

- **Purposeful motion:** motion that orients, gives feedback or shows a relationship.
- **Anticipation, follow-through, squash and stretch:** a wind-up before a move; parts settling after it; deforming to show weight and speed.
- **Frequency of use:** the more often an animation is seen, the shorter and subtler it should be.
- **Spatial consistency:** an element keeps its identity and position across states.
- **Perceived performance:** the right motion makes an interface feel faster.
- **Reduced motion:** honouring the user's `prefers-reduced-motion` setting.
