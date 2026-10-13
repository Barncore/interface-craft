---
name: build
description: Implement or revise a website, app screen or component once its direction is clear. Use for UI builds, redesigns, bolder or quieter passes, building from an approved concept, and native app screens.
---

# Build

Implement the brief as a design engineer: the project's character intact, its system respected, every state handled. Read [the creative philosophy](../route/references/creative-philosophy.md) for creative choices, and the brief (`DESIGN-BRIEF.md`), `DESIGN.md` and the project overlay for what has already been decided. When the brief has a direction spec from the intent interview, it's your plan: build from its frame and its twelve dimensions, and use the direction image as a reference for feel, not as a target to copy. If a website or app still has no settled direction, run `intent-interview` first.

## What done looks like

- The work expresses the brief's confirmed intent, and you can state its design thesis in a sentence or two: subject, audience, purpose and the visual logic connecting them.
- It reuses the project's existing tokens, components and conventions, unless the brief explicitly replaces them. Without a `DESIGN.md`, find the system before adding to it: a styling library in the package manifest (Tailwind, NativeWind, Tamagui, a CSS-in-JS theme), a token or theme file, CSS custom properties. Extend what you find in its own idiom, names and scale. Where a project has only repeated raw values, derive tokens from the most frequent ones, snapped to a 4-unit scale, rather than inventing a fresh set. No rival mini-system appears beside the existing one, in CSS or in a native theme.
- Execution matches the vision. Expressive work gets enough craft to land; minimal work gets exact spacing, type, rhythm and states.
- Every relevant state exists: loading, empty, error, disabled, success, destructive, long content. It works by keyboard, shows visible focus, keeps readable contrast, honours reduced motion, and holds up at narrow and wide viewports.
- Real content wherever it exists. Invented copy reads like the product; claims, prices and customers are never invented.
- You have looked at the rendered result at representative viewports and states and fixed what you saw. Say exactly what was and wasn't rendered or exercised.
- `DESIGN.md` reflects any tokens, components or rules the build introduced, each rule with its reason.

For new work, plan before code: palette roles with values, type roles and scale, the spacing and layout logic, surfaces and elevation, the interaction and state language, and one signature element. Review that plan against the brief and against what you would produce for any similar project, revise the generic parts, then build to the revised plan. [concept-derivation.md](../explore/references/concept-derivation.md) has the method.

Watch CSS specificity as you write: a type selector and a class can cancel each other out, especially on section padding and margins.

## References

Read [frontend-mechanics.md](references/frontend-mechanics.md) for any web UI work, and [motion-mechanics.md](references/motion-mechanics.md) whenever motion is added or changed. Load the rest when the work touches them:

| Reference | When |
| --- | --- |
| [type-mechanics.md](references/type-mechanics.md) | Choosing or setting type, scales, wrapping, numerals, font loading |
| [colour-systems.md](references/colour-systems.md) | Palettes, semantic colour roles, themes, contrast |
| [interface-copy.md](references/interface-copy.md) | Any user-facing text: labels, errors, empty states, onboarding |
| [direct-manipulation.md](references/direct-manipulation.md) | Drag, swipe, snapping, gesture-driven or interruptible motion |
| [interaction-craft.md](references/interaction-craft.md) | Measured containers, exit lifecycles, shared-element identity, sound, prefetching, icon morphs |
| [concept-fidelity.md](references/concept-fidelity.md) | The user chose an image, comp or prototype as the build target |
| [transformations.md](references/transformations.md) | Feedback like bolder, quieter, more delightful, distil, harden, overdrive |
| [native-platforms.md](references/native-platforms.md) | iOS, iPadOS or Android work |
| [worst-case-data.md](../verify/references/worst-case-data.md) | Lists, cards, tables or any component that shows user data |
| [expressive-interaction.md](../explore/references/expressive-interaction.md) | Spatial, material or experimental interaction, shaders, 3D |
| [repertoire.md](../explore/references/repertoire.md) | A component or effect reference would help |

## Decisions

- Typography, layout, structure, colour, motion and copy each encode something true about the product or its content.
- Install a library only when the existing stack and platform primitives can't do the job well.
- Taste breaks ties; it never overrides explicit instruction or the project's truth. Contextual taste outranks global taste.
- A polish pass refines; it never smuggles in a redesign. If the concept itself is wrong, say so and recommend a redesign instead.

## Finish

Run `verify` before delivering substantial new work or a new direction. For a small scoped change, check the rendered result yourself and run the accessibility gates in `verify/references/accessibility-gates.md` against the diff.

Lead the hand-off with what is now built: the important files changed, the core design decision, what you verified and how, and any remaining risk.
