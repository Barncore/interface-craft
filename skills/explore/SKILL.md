---
name: explore
description: Design directions and variants. Use when asked for options, concepts, alternatives or a comparison, when one design axis needs tuning, or to compare variants full size in a picker.
---

# Explore

Use exploration when a direction, or one choice inside a direction, is genuinely open. Make the differences between options visible, then recommend one. The user should judge rendered work, never descriptions of it, and a set of options exists to resolve a real decision, not to fill a quota.

Read the brief (`DESIGN-BRIEF.md`) and [the creative philosophy](../route/references/creative-philosophy.md) first. For a website or app with no settled intent yet, run `intent-interview` before exploring.

## Concept directions

Use this when the direction itself is open. Derive concepts from the subject with [concept-derivation.md](references/concept-derivation.md), and use [design-dimensions.md](references/design-dimensions.md) to see which decisions each concept is making. Concepts should differ in their underlying logic, not just their palette. For each one, define:

- its thesis and emotional register
- a visual language grounded in the subject
- the hierarchy and spatial model
- type and colour roles
- the signature idea
- its motion posture
- its strongest upside and its biggest risk

Hold the job, audience, required content, accessibility floor and hard constraints fixed across all of them.

Pick the medium for what the user needs to judge. Concept images through the Codex bridge (`intent-interview/scripts/codex-image.mjs`) suit composition and atmosphere before any code. Working builds suit interaction, density and scale.

When concepts are built as working pages, give each one to a separate agent that sees the brief and its own concept, never its siblings. Agents that can see each other differentiate politely around a shared centre; blind ones spread. Tell the user how many agents you are dispatching before you do. Build every option to the same fidelity, so presentation quality doesn't decide the winner.

## Calibration on one axis

Use this when a direction exists and one property needs tuning: density, contrast, expressive intensity, spatial depth, motion energy, type voice, copy register. A vague bundle like "make it nicer" is not an axis; turn it into one with [transformations.md](../build/references/transformations.md) first.

Name the axis and its poles before you make anything, and label each variant by its position (`quiet`, `balanced`, `vivid`). Change only that axis and say what is held constant.

- **The axis is a value** (a typeface, a spacing scale, a colour temperature, an easing curve): render the swap yourself in one shared artifact, everything else byte-identical. Blind agents here would vary every other axis too and ruin the comparison.
- **The axis needs interpretation** (personality, layout structure, motion language): use blind agents as for concepts.

If two axes are both uncertain, run them one after the other. A crossed grid cannot tell you which change the user was responding to.

## Showing the options

Show renders, captured at the same viewport, data and state. When the question is about behaviour, scale or context, build a full-size picker from [picker.html](assets/picker.html): one variant at a time, at real size, in realistic surroundings, switched instantly with number keys. Thumbnails distort spacing and scale.

Give each option one honest line on when it wins and one on what it costs. Then recommend, with reasons tied to the brief, clearly separated from the options themselves.

When the user chooses, integrate only that option, or a combination they name. Remove the prototype surface and the unchosen variants unless they ask to keep them, and check no picker code leaked into the deliverable. Record the choice with `feedback`, keeping their words verbatim.

## More references

- [repertoire.md](references/repertoire.md): component and effect families, and where to find live examples (21st.dev, Designeer, Recent).
- [expressive-interaction.md](references/expressive-interaction.md): read when material behaviour, spatial depth or experimental interaction could define the experience, even if the user never named a technique, and when a marketing page shows product visuals that could act out their job.
- [motion-opportunities.md](references/motion-opportunities.md): read when asked where motion would help, or to make an interface feel more alive.
