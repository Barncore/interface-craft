---
name: deslop
description: Strip generated cruft from code, copy and decoration while keeping the design's intent. Use after a big generation pass, or when asked to clean up, de-slop, simplify or remove over-engineering.
---

# Deslop

Remove what the generator added for its own comfort and keep everything that does work. Generated code piles up defensive scaffolding because writing it costs nothing and the model can't tell which risks are real; a human reviewer would delete most of it on sight. The goal is a less generated result, never a less designed one.

Start from the current diff or the files the user named. If there is no trustworthy baseline, say so and work conservatively. Leave pre-existing debt alone unless the user includes it or it blocks a safe cleanup.

## Remove

- **Comments that restate the code**, section banners, "TODO: implement" on implemented functions, JSDoc that repeats the signature.
- **Checks that guard nothing:** null checks on values that can't be null, try/catch that logs and rethrows unchanged, fallbacks for props that have defaults, optional chaining on required values.
- **Needless indirection:** single-use wrappers, variables assigned and used once on the next line, one-key config objects, abstractions with exactly one implementation and none planned.
- **Type escapes** (`any`, `as unknown as`, `@ts-ignore`, lint disables) added to silence an error rather than document a real exception.
- **Duplicates of the system:** components or tokens recreated instead of reused, and dependencies added for something the platform already does.
- **Decoration with no job in the brief:** chips, dividers, icon tiles, gradients, glows and cards that encode nothing.
- **Hollow copy:** hedging ("you may want to", "simply", "just"), vague headings, invented metrics, promotional filler, helper text that repeats the label.
- **Dead ceremony:** unused imports, unreachable branches, leftover `console.log`, commented-out attempts.

## Keep, even when it looks redundant

- Error handling around I/O: network, filesystem, parsing and user input fail for real.
- Comments that explain why: constraints, workarounds, links to issues.
- Accessibility attributes, focus behaviour, reduced-motion paths, and all states. They are invisible in a screenshot and do real work.
- Validation, security, data integrity and destructive-action safeguards.
- Responsive and localisation behaviour, and anything a test asserts.
- Guards and type escapes that carry a comment explaining the case; someone hit that bug.
- The approved signature idea and every intentional expressive detail. Deslop is not a beige-ification pass.

When you can't tell whether something guards a real case, keep it and flag it. A deleted safeguard fails silently in production; a kept one costs three lines.

## Finish

Run the type checker and tests, and for visual work compare before and after renders of the main states. Report the removals as counts (`-34 comments, -6 null checks, -2 wrappers, -1 any`), then list what you kept that looked like slop and why; that list is where the judgment was. Line count is not the measure of success.
