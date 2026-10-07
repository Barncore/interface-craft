# Expressive interaction and material behaviour

Read this when experimental interaction, spatial depth, responsive material or perceptual transformation could define the experience. The brief can imply the opportunity without naming an effect or a library, so bring these possibilities in early, while composition and interaction are still open.

## Design the behaviour first

Describe what the interface should feel like to manipulate: tension, weight, elasticity, flow, friction, optical depth, or an unfamiliar but coherent physics. Connect that character to the subject and to what the user is doing. Invented physics convinces when cause and response stay readable.

Decide what changes with input, where the transformation happens, and what stays still enough to orient the user. A stable centre surrounded by exaggerated distortion lets the eye land somewhere clear while the rest of the surface gets strange.

Match the intensity to the experience and how often it repeats. A restrained work tool and an immersive exploratory site make different, equally deliberate choices; for task interfaces, read `build`'s motion-mechanics reference.

## Choose material by meaning

| What the motion communicates | Material to reach for |
| --- | --- |
| Continuity or relationship | Shared-element motion, FLIP transforms, view transitions, deliberate spatial movement |
| Focus or depth | Bounded blur, filters, backdrop, light and shadow changes |
| Reveal or composition | Masks, clip paths, cropping, controlled occlusion |
| Material or energy | Colour, gradient position, texture, distortion, shaders |
| State or feedback | The smallest change that makes cause and result unmistakable |

## From experience to technique

| Intended quality | Techniques | The distinction that matters |
| --- | --- | --- |
| A surface that folds, curls or stretches | Subdivided geometry, vertex deformation, 3D transforms | Transforming a flat card moves a rigid plane. Bending its silhouette needs geometry deformation. |
| Liquid or elastic imagery | Texture-coordinate (UV) displacement, noise or flow fields, spring-driven deformation | A fluid look may need only controllable distortion. Simulate only when persistent flow or physical interplay matters. |
| Momentum, drag, a lingering trace | Velocity-driven smearing, directional sampling, temporal feedback | A spatial smear stretches the current frame; a temporal trail keeps previous frames. Pick the visual memory the interaction needs. |
| Prismatic edges, optical instability | Chromatic fringing by offsetting colour channels, refraction | Control where the effect appears and keep content readable through masking, limited intensity or a separate clear layer. |
| Weight, tension, release | Springs, damping, inertia, constraints, gesture mapping | Tune response, interruption and settling. Elastic response alone does not need 3D. |
| An inhabitable scene | Perspective, parallax, occlusion, lighting, camera choreography | Keep the relationship between navigation, content and viewpoint consistent. |
| A responsive atmosphere | Particles, procedural fields, light, ripple displacement | Tie environmental change to a meaningful action or rhythm so it belongs to the interaction. |

## What "extraordinary" means per surface

- **Marketing and visual surfaces:** sensory. A scroll-driven reveal, a shader field, a cinematic transition, cursor-responsive generative work. Open on the wow; no loader theatre.
- **Functional UI:** feel. A dialog morphing from its trigger, drag with physical momentum, a huge table that stays smooth.
- **Performance-critical UI:** invisible. Heavy work off the main thread; the interface never hesitates.
- **Data-heavy UI:** fluidity. GPU-rendered charts, animated transitions between data states, layouts that settle naturally.

Focus creates impact. Two extraordinary moments competing on one screen read as noise.

## Choose the renderer

Use the simplest approach that keeps the defining behaviour, and reuse the project's stack where it fits.

- **HTML, CSS and SVG:** native controls, transform-based depth, masks, vector morphing, filters (SVG displacement, turbulence and morphology chains give organic distortion that CSS can animate), `@property` for animating gradients and colours. Start here when these can carry the idea.
- **Canvas 2D:** custom drawing, compositing, image and particle work without a 3D scene. OffscreenCanvas can move it into a worker. Keep the semantic interaction outside the drawing surface.
- **WebGL and shaders:** deformable meshes, per-pixel distortion, many particles, multi-pass effects. Vertex work changes geometry; fragment work changes pixels. GPU rendering can serve a flat-looking interface too. Use WebGPU where available, with a WebGL2 fallback.
- **Three.js (or OGL, regl):** when scene organisation, cameras, geometry and materials make the work simpler. It is a graphics library, not a style or a requirement for every shader.

A hybrid often fits best: semantic HTML for content and controls, a graphics layer for the expressive surface, with selected state, positions and hit targets kept in sync. Check current APIs and browser support before implementing: [MDN WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API), [Three.js fundamentals](https://threejs.org/manual/pages/fundamentals.html), [MDN Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API), [The Book of Shaders](https://thebookofshaders.com/).

## Make it real, then check it

Prototype the uncertain behaviour with representative content before building the interface around it. A still image can settle composition but never gesture response, interruption or settling. Ambitious effects rarely work first time: render, look, adjust, and expect several rounds.

The unenhanced experience must still be good: gate features with `@supports` and capability checks. Aim for 60fps and simplify below 50. Initialise heavy resources near the viewport, pause rendering when the surface is offscreen or inactive, and release graphics resources on removal. Tune pixel density, geometry, texture sizes and passes by what is actually expensive on a mid-range device.

Before handing off, run four checks. The removal test: take the effect away; is it missed? The device test: phone, tablet, low-end laptop; still smooth? The context test: right for this brand and audience? The fidelity test: compare the working interaction with the intended material character; did simplification remove the defining effect, or did extra effects dilute it? Report what was exercised and what remains untested, because screenshots do not establish motion quality.
