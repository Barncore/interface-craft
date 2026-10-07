# Finding motion opportunities

Read this when asked where motion would help, or to make an interface feel more alive. It is a search and a filter: propose the few moments that genuinely benefit, with exact values, and reject the rest. This pass reports; it changes no code unless the user asks.

First decide what kind of experience this is. In an immersive or expressive experience, motion can be central to how the interface communicates; develop it with [expressive-interaction.md](expressive-interaction.md) and the gate below loosens accordingly. In a task interface used daily, restraint is the craft, and most candidates should fail the gate.

## The gate for task interfaces

Run every candidate through four questions and record the answers.

1. **Frequency.** How often will someone see it? Actions repeated a hundred times a day, and anything keyboard-initiated (command palettes, shortcuts, focus jumps), get no animation: there it reads as lag. Tens of times a day get only fast, near-imperceptible motion. Occasional moments (modals, drawers, toasts) get standard motion. Rare and first-time moments (onboarding, empty states, success) hold the delight budget.
2. **Purpose.** Name it: feedback, spatial consistency, state indication, preventing a jarring change, explanation, or delight (rare moments only). "It looks good" is not a purpose.
3. **Speed.** Can it stay inside the budget in `build`'s motion-mechanics reference? If it only works slow and showy, it fails here.
4. **Function.** Does motion help or hinder? Data someone is reading or acting on should not move for style.

## Where to look

- **Feedback gaps:** pressable elements with no pressed state; destructive actions where a hold-to-confirm fill would prevent slips.
- **Teleporting state:** content that appears, vanishes or swaps with no bridge; accordions that snap; list items added or removed abruptly.
- **Missing spatial story:** popovers and menus with no connection to their trigger; sheets and toasts that leave a different way than they came.
- **Group entrances:** an occasionally seen grid that pops in all at once.
- **Gesture seams:** draggable or swipeable elements that snap with no physics.
- **Flat rare moments:** first run, empty states, completion and celebration rendered with no life.

Useful searches: conditional renders with no transition (`{isOpen &&`, `display: none` toggles), click handlers on elements with no pressed or transition styles, accordion markup, drag handlers, lists rendered with `.map(`, empty-state and success components.

## Report

1. **Opportunities**, ordered by leverage: location, what happens today, purpose, frequency, and the motion with exact properties, duration and curve, reusing the project's motion tokens. Five to seven at most for a whole app, fewer for one view.
2. **Rejected candidates:** two to five places you considered and deliberately left alone, each with the gate question that ruled it out. This section is what separates a filter from a wishlist.
3. **Verdict:** how much motion this interface actually needs, whether it is already close, and the single highest-leverage change. Finding nothing worth adding is a good result.
