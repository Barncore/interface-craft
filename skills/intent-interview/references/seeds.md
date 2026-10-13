# Seeds

A seed is one reading of the project: small, cheap, and likely to be dropped. Seeds live in `.interface-craft/seeds.md`, built from [SEEDS.template.md](../assets/SEEDS.template.md), apart from the user's brief.

Seeds exist because a model's default is one typical reading, formed almost at once. Holding several, ideally contradictory, readings delays that collapse until the user's answers can choose. They gain detail as their number shrinks: a line or two each after round one, a full spec for the three that survive round two. Detail added too early makes a seed hard to drop and anchors everything after it.

## Contents

- After round one
- Independent seeding
- After round two

## After round one

### Themes, paradox, default

- **Themes:** the three to five deeper themes that keep surfacing across the answers. Quote the answers each theme comes from.
- **Core paradox:** what makes this project hard to get right. For example: artists want to trust the engineer completely and also stay in charge of their music.
- **Category default:** the page this kind of project usually ships, plus its predictable opposite. Both are ruts. Naming them makes them visible as starting points to move away from.

### Growing seeds

Grow seeds from the themes and the paradox. Generate more than you keep, then merge readings that differ only in surface treatment. Keep the genuinely distinct ones, whatever the count; five to nine is typical. A model generating many ideas in one pass repeats itself, so expect to merge a lot.

Spread the set on two axes.

**Distance**, how far the reading travels from the expected:

- **obvious/fitting (match the vibe):** the reading the brief most naturally suggests, executed extremely well. Include at least one deliberately. It's the control that makes the others legible, and the convention the user can always choose.
- **creative/inventive (the artisan's opportunity to shine):** a reading that finds an original but well-grounded way to express the project. Include at least one.
- **wild/extreme (dare to push the boundaries):** a reading that risks something. Include at least one.

A wild/extreme seed comes from the paradox, or from an analogy with a different world ("approach it as if it were a radio station", "as if it were a tailor's fitting"). The inverse of the obvious (dark where the default is light, chaotic where it's tidy) is the second most predictable answer, so it doesn't count as wild.

**Lead**, what the reading puts first. A lead is a bias, not an exclusion; every reading still has to work in the other areas.

- **function/elegance (usability priority/bias):** practicality, clarity, speed and ease carry the character.
- **style/visual-led (graphic priority/bias):** aesthetic, art, colour and image carry the character.
- **immersion/atmosphere (sensory priority/bias):** light, material, sound, depth and motion carry the character.
- **narrative/sequence (story priority/bias):** the experience unfolds in an order, and pacing and reveal carry the character.
- **interaction/agency (participation priority/bias):** the visitor acts, plays, explores and shapes what happens, and that carries the character.

Leave the user's taste profile out of seeding. Seeds draw only on this interview and the project's own material.

### The seed card

```markdown
### <short name>
- **Frame:** Approach it as if it were <X>, so <consequence for the experience>.
- **Grows from:** <the theme or the user's words it comes from, quoted>
- **Distance:** obvious/fitting | creative/inventive | wild/extreme
- **Lead:** function/elegance | style/visual-led | immersion/atmosphere | narrative/sequence | interaction/agency
- **Distinctive moves:** <the 2 to 4 design dimensions where this reading has a real idea, each described concretely>
- **Gives up:** <what this reading sacrifices>
- **Typicality:** high | medium | low (how likely a typical designer or model would land here for this brief)
- **Support:** stated | inferred | speculative (how directly the user's answers back it)
- **Status:** live | dormant | chosen | merged into <name>
```

Typicality and support are coarse on purpose. A model's sense of its own confidence is poorly calibrated, and fine percentages would be false precision. Typicality is the useful one: it makes the obvious reading visibly obvious, and it shows when every seed has drifted toward the centre.

### Choosing round two's questions

Look at where the strongest seeds disagree: about who it's for, what it should feel like to use, what it leads with, how much it explains. Ask about the disagreements the user's knowledge can settle. Add at least one question that no seed generated.

## Independent seeding

Use this for a large or high-stakes project, or when the user asks. Individuals generating ideas separately and then pooling them beat a group generating together, and pooling ideas from different models widened AI idea diversity in studies. So instead of one pass, dispatch blind agents in parallel. Each gets the brief and the round-one answers, but neither your seeds nor each other's. Each gets a lens:

- **Graphic designer:** readings led by visual language, composition and type.
- **Interaction designer:** readings led by behaviour, agency and sequence.
- **Provocateur:** readings from far analogies and the paradox.

Each returns three to five seed cards. One lens can run through Codex for a different model's instincts: `codex exec` with the same brief, asking for markdown seed cards. Pool all the cards, then merge.

Cost: about 30k to 60k tokens per Claude agent, around two minutes in parallel. Tell the user the agent count before dispatching.

## After round two

Update the cards: revise labels, add readings the answers grew, mark the rest dormant. Dormant seeds stay in the file; round-three feedback sometimes revives one.

### The judge

Dispatch the `seed-judge` agent with the paths to `DESIGN-BRIEF.md` and `seeds.md`. It reads the live cards, rates each one on fit (how well it serves the confirmed intent) and distinctiveness (distance from the category default) separately, and nominates an obvious/fitting, a creative/inventive and a wild/extreme reading. Fit and distinctiveness stay separate because one combined score lets the safe choice win. You make the final call. Record the judge's ratings and your choice in `seeds.md`.

### The twelve-dimension spec

Expand each of the three chosen readings across the twelve groups in [design-dimensions.md](../../explore/references/design-dimensions.md):

- **Overall angle:** 30 to 80 words on what the experience is and why it fits the brief.
- **One entry per dimension,** 10 to 50 words on how this reading would use it and why:
  - composition and tension
  - space and density
  - type as a system
  - colour relationships
  - images and art direction
  - surface, light and depth
  - motion and time
  - interaction and agency
  - navigation and space
  - sequence and revelation
  - rules and controlled surprise
  - adaptation and limits

Write concrete decisions, not adjectives. "A dominant headline set in a narrow grotesque that runs off the right edge" is a decision; "bold typography" is not. Where a reading genuinely has nothing distinctive to say in a dimension, write "follows convention" and move on rather than inventing filler.

These specs feed the reading-board prompts in [visual-interpretation.md](visual-interpretation.md), and later the build.
