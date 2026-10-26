# Notices and credits

interface-craft is licensed under the Apache License 2.0 (see `LICENSE`). It stands on other people's work, credited here.

## Bundled, unmodified

`tools/impeccable/engine/` contains `@impeccable/cli-windows-x64@0.1.5` from [pbakaus/impeccable](https://github.com/pbakaus/impeccable), unmodified, under its own licence in `tools/impeccable/engine/LICENSE`. Its registry integrity hash and file hashes are recorded in `tools/impeccable/provenance.json`. The launcher, detector wrapper and rule adapter around it (`tools/*.mjs`, `tools/impeccable/run.mjs`) are part of this project.

## Adapted and rewritten

These sources shaped the guidance. Their ideas are rewritten here in our own words, and in places their specific values or term lists are adapted. Their licences are in `licenses/`.

| Source | Licence | What came from it |
| --- | --- | --- |
| Emil Kowalski's skills, [emilkowalski/skills](https://github.com/emilkowalski/skills) | MIT, `licenses/emilkowalski-skills-MIT.txt` | Motion timing, easing and physicality defaults; direct-manipulation and gesture guidance, including parallel recognition, velocity-direction commits and the spring defaults (from `apple-design`); the full-size variant picker (from `prototype`); the motion-opportunity gate; the animation vocabulary glossary; the worst-case data method, its value list and per-field truncation (from `break-ui`); the motion review checks and fix order (from `review-animations` and `improve-animations`); the mobile-browser fixes (from `mobile-native`); the stutter diagnosis order and the `will-change`, shadow and Framer Motion shorthand guidance (from `animation-performance`) |
| Expo's skills, [expo/skills](https://github.com/expo/skills) | MIT, `licenses/expo-skills-MIT.txt` | The native pattern checks and their React Native search patterns (from `expo-design-system`'s native-slop list); the web patterns adapted from it; the native touch, press, haptics and UI-thread rules (from `expo-animation`, written with Emil Kowalski); adopting an existing styling system before building; judging each viewport and platform separately; voiding a broken capture |
| Jakub Krehel's skills, [jakubkrehel/skills](https://github.com/jakubkrehel/skills) | MIT, `licenses/jakubkrehel-skills-MIT.txt` | Typography, colour (OKLCH), layout, accessibility and interface-writing guidance |
| Anthropic's frontend-design skill, [anthropics/skills](https://github.com/anthropics/skills) | Apache 2.0, `licenses/anthropic-frontend-design-Apache-2.0.txt` | Grounding a direction in its subject, the opening as a thesis, structure as information, the plan-then-critique pass, the calibration list of generated-design clusters |
| User Interface Wiki, [raphaelsalaja/userinterface-wiki](https://github.com/raphaelsalaja/userinterface-wiki) | MIT, `licenses/userinterface-wiki-MIT.txt` | Measured containers, exit lifecycles, interface sound, prefetching and icon morphs |
| Impeccable's guidance, [pbakaus/impeccable](https://github.com/pbakaus/impeccable) | Rewritten, not copied | Ideas behind the concept-derivation method, transformation verbs, concept fidelity, craft details and review process |
| Vercel's Web Interface Guidelines, [vercel.com/design/guidelines](https://vercel.com/design/guidelines) | Rewritten, not copied | The topics covered by `skills/verify/references/interface-checklist.md` |
| Elaya's AI Design Skills, [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) | MIT, `licenses/elayadesign-ai-design-skills-MIT.txt` | From `design-to-motion`: capturing motion with a fake clock and seeking each animation by hand, the rest, seam and reset checks for loops, scoring a rebuild against its reference by PSNR with a difference image, and product visuals that act out a story on a loop. Stopping the animation timeline before load, the calibration bands and the two scripts in `skills/verify/scripts/` are this project's own |
| Design Layer, [Barncore/design-layer](https://github.com/Barncore/design-layer) | Apache 2.0 | The Codex plugin this version merges with. Its intent interview, evolving brief, creative philosophy, reference repertoire and feedback scripts are the base of this version's process. |

## Referenced

The reference repertoire points to [21st.dev](https://21st.dev/community/components), [Designeer](https://www.designeer.xyz/) and [Recent](https://recent.design/) as places to look for examples. Nothing from them is bundled. The research behind the intent interview is summarised, with sources, in `docs/research.md`.
