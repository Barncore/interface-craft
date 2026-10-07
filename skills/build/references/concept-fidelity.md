# Building from an approved concept

Use this when the user has chosen an image, comp or prototype as the build target. An image made in the intent interview expresses an interpretation; it becomes a build target only when the user says so, and then only for the parts they selected. Check the brief for which role each image has.

The failure this prevents: an ambitious concept is approved, and the build quietly swaps its hard parts (the imagery, the material, the composition) for familiar components, producing a polished generic approximation.

## Read the concept as a system

Write down what the concept establishes: component grammar, corner language, line weights, elevation, type ramp, palette, and the few relationships that define it (the balance of masses, type-to-image ratio, focal point, empty space, density, the order attention travels). Regions the concept never shows get built from this record; without it they fall back to stock boxes and hairline grids.

Inventory every major visible ingredient, each with its medium: semantic HTML, CSS or SVG, an existing asset, a generated raster, a sourced raster, an icon library, canvas or WebGL, or a deliberate omission. Give the primary action its own row. An ingredient that never gets written down is the one the build silently drops.

## Choose each medium by what the region shows

Decide by what the concept depicts, never by what feels easiest in the current stack.

- People, products, machinery, anything with lighting and depth, and named textures (woven cloth, paper grain, brushed metal) are raster. A CSS gradient is not a texture.
- Style doesn't move that line: a region with perspective, shading or figure drawing is illustration however line-drawn it looks.
- Precise geometry, flat shape systems, diagrams, controls, expressive motion and anything interactive belong to SVG, canvas or WebGL. A raster there flattens what should move, scale and respond.
- Never crop pixels out of the concept itself; its resolution is far below asset grade. Regenerate image-native regions cleanly at full resolution, using the concept as reference.
- A field built from many small elements carries a quantity: note its density and coverage ("thousands of glyphs over two-thirds of the first screen, dense at the top"). The same field at a tenth of the density passes every checklist and is not the design.
- Never rasterise core text or controls. Dropping an image-native region is the user's decision, never a silent simplification.

## Build in two phases

1. **Reproduce.** Rebuild the concept at its own viewport until a screenshot at the same size overlays it closely: materials, components, elevation and assets included. The only allowed differences are fonts (the closest obtainable face), icons (unless a library was chosen) and real defects in the concept. Check type early: render one headline word against the concept; a visibly wider or lighter silhouette means the wrong face. Prove the first screen before building past it. Models reliably believe their recreation matches when it doesn't, so the side-by-side comparison is the authority. A region that keeps losing the comparison ships as a rendered asset composited into the page.
2. **Bring it to life.** Only then make static regions animate and respond, then handle reveals, motion and responsiveness. Translate to real content, semantic controls, keyboard use, text growth and smaller screens, keeping the reading order and defining relationships rather than shrinking the desktop picture. Explain any material departure and why.

Keeping the palette and mood while redrawing the layout is a second art direction, not an adaptation. Ask before substituting a different visual driver.

Keep each generated asset's prompt alongside it (a sidecar note) so later work understands the asset. Generated imagery is material, not proof: it never stands in for real photographs, testimonials or product claims.

## Check

Compare the rendered result with the concept at the composition level first, then type metrics, optical alignment, spacing, asset quality and interaction states. Say which parts were actually rendered and compared.
