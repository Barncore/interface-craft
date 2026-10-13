---
name: intent-interview
description: Discovery interview for a new website or app direction. Use when starting a site or UI whose look isn't decided, or when the user asks to be interviewed, to find the direction, or to write the design brief.
---

# Intent interview

The user knows what the project is for. You own the translation into design. The interview's job is to collect the material a model needs to escape generic output: specific stories, the user's own words and metaphors, the tensions in the project, what it must say, and how it should shift people's view. From that material it grows several readings, and the user's reactions select and develop one.

People describe their taste badly and recognise it well. Asking someone why they like a visual makes their judgment worse, while their reaction to something concrete is reliable. So the interview asks about the project in words, saves taste for things the user can see, and keeps your guesses separate from their answers.

Spend the time and tokens. A direction set right here saves far more rework than it costs.

## Before the first question

Run the interview for a new website or app UI whose direction isn't settled. A scoped change inside an established direction doesn't need one. If the user asks to skip or shorten it, do that.

Read everything that already exists: `DESIGN-BRIEF.md`, `PRODUCT.md`, the README, an existing site, the conversation. Facts that sit in documents get read, not asked.

If none of that says what the project actually is (the user called the skill with little more than "help me design a website"), open with one invitation before round one: ask them to tell you about the project in their own words, what it is, who it's for and where it's at. An open first question lets the user set the frame in their own language before your questions shape it, and round one then builds on what they said instead of asking generic questions. If they've already described the project, skip this.

Tell the user the shape in two or three sentences. There are three rounds of questions about the project. Round three opens with three rough readings as images, to react to and take parts from. The interview ends with one direction. In testing, a user who saw images without that framing took them as the finished result and judged the whole interview on them.

Keep two files, and keep them apart:

- `DESIGN-BRIEF.md` at the project root: the user's side, what they said and decided. Template: [DESIGN-BRIEF.template.md](assets/DESIGN-BRIEF.template.md).
- `.interface-craft/seeds.md`: your side, the themes, readings and judgments you're developing. Template: [SEEDS.template.md](assets/SEEDS.template.md).

Keeping them separate makes it impossible for a guess to pass as a decision. The seeds file isn't secret, but the interview doesn't present it; the readings reach the user as images in round three. Update both after every answered round, so a pause or a new session costs nothing.

## How to ask

Ask about the project, never about its design. The user can answer questions about what the project does, who it's for, the moments it lives in, and what's hard about it. They can't answer questions about colours, fonts, layouts or "identity" before they've seen anything, and those questions hand back the translation you are here to do.

| Hands the design back | Draws on the project |
| --- | --- |
| "What would make this feel unmistakably yours?" | "Tell me about the last client who sent you a mix. What was going on for them that week?" |
| "What colours or mood do you like?" | "What do people in your field usually get wrong that this project gets right?" |

- Each question asks one main thing, in plain words, numbered so answers can point back to it.
- Ask in prose. Offered options turn a discovery question into a design vote on something the user hasn't seen.
- Ask 3 to 7 questions a round: fewer when little is open, never padded, never several hidden in one.
- Never ask the user to explain why they like something visual. Ask what feels right or wrong for the project, and which parts they'd keep. Reasons they volunteer are welcome; take them at face value.

Write the questions fresh for each project. Before every round, question-storm privately: draft 15 to 25 candidates from the families of moves in [question-craft.md](references/question-craft.md) (moments, motives, difference, tension, time, their language, indirect), then choose the few that pass its filter. Read it before the first round; it also lists the questions to avoid.

## Round one: stories and meaning

Collect concrete material. Ask for specific moments, people, objects and episodes rather than general descriptions, because people describe who they want to be when they speak in generalities and who they are when they tell a story. Round one leans on the moments, motives and difference families, and the scene.

Listen for the user's own metaphors, tensions ("technical but approachable") and turns of phrase. Write them down verbatim; they're the most valuable thing round one produces.

## Between rounds one and two: themes and seeds

Digest the answers in `seeds.md`. The method and the seed format are in [seeds.md](references/seeds.md). In short:

1. **Themes.** Name the three to five deeper themes that keep surfacing across the answers. Name the core paradox: what makes this project hard to get right. Name the category default: the page this kind of project usually ships, and its predictable opposite.
2. **Seeds.** Grow readings from the themes, each one a frame: "approach it as if it were X, so Y". Generate freely, then merge near-duplicates down to the genuinely distinct ones, usually five to nine. Spread them on two axes:
   - **Distance:**
     - **obvious/fitting:** matches the vibe. Include at least one on purpose.
     - **creative/inventive:** the artisan's opportunity to shine. Include at least one.
     - **wild/extreme:** dares to push the boundaries. Include at least one.
   - **Lead**, what the seed puts first:
     - **function/elegance:** usability priority or bias
     - **style/visual-led:** graphic priority or bias
     - **immersion/atmosphere:** sensory priority or bias
     - **narrative/sequence:** story priority or bias
     - **interaction/agency:** participation priority or bias

   A wild/extreme seed grows from the paradox or a far analogy, not from flipping the obvious; the inverse of the default is the second most predictable answer.
3. **Labels.** Give each seed two coarse labels:
   - **Typicality:** how likely a typical designer, or model, would land on this reading for this brief.
   - **Support:** stated, inferred or speculative, according to how directly the user's answers back it.

Seeds draw only on this interview and the project's own material. Leave the user's taste profile out until round three; a favourite is an example, and examples cause fixation. On the user's own projects their taste still arrives through their answers, which is right.

For a large or high-stakes project, or when the user asks for it, seed independently: dispatch two or three blind agents with different lenses and pool their seeds before merging. One of them can run through Codex for a different model's instincts. Say how many agents you're dispatching before you do; [seeds.md](references/seeds.md) has the brief and the cost.

## Round two: climb and contrast

Now ask questions that climb from the stories to what they mean, and that bring out the user's own contrasts. Aim most questions at where the strongest seeds disagree, and pick disagreements the user's knowledge can settle. Aim at least one question somewhere no seed reaches, so the answers can grow a reading you haven't thought of.

Round two leans on the tension, their-language, motives and time families in [question-craft.md](references/question-craft.md), with indirect moves when answers come out generic. Keep every question about the project; this round still generates possibilities and isn't a disguised vote between styles. A one-line "here's what I'm hearing" is fine. The seeds themselves stay in their file.

## Between rounds two and three: three readings

Update the seeds: revise labels, add any reading the answers grew, and mark the rest dormant rather than deleting them. Then narrow to three:

- **The most obvious/fitting reading.** It stays in as the control; the obvious reading makes the other two legible, and people criticise more honestly when they can compare.
- **The most creative/inventive reading.**
- **A wild/extreme reading.**

Selection drifts toward the safe and typical, for people and models alike, so a blind judge helps here. Dispatch the `seed-judge` agent with the brief and the seed cards. It rates fit and distinctiveness separately and nominates a three. Tell the user you're dispatching one agent. You make the final call and record the judge's ratings beside it.

Expand each of the three across the twelve dimensions in [design-dimensions.md](../explore/references/design-dimensions.md): an overall angle of 30 to 80 words, then 10 to 50 words per dimension on how this reading would use it and why. These specs become the image prompts.

## Round three: react, then resolve

Open the round with three reading boards, generated in parallel and presented as [visual-interpretation.md](references/visual-interpretation.md) describes. Name them by their readings, not A, B and C. Say in a line what each is trying.

Then ask questions about the boards, not about taste:

- what each gets right for the project
- what it gets wrong
- what they'd keep from each
- what's missing from all three

"What would you steal from each?" works better than "which one?", because it asks for parts and signals that a merged direction comes next. Feedback that changes the intent can revive a dormant seed or reopen discovery.

## The close: one direction

Converge on one direction, usually a hybrid, and write it into the brief:

- the frame
- the one thing it must say
- the shift (how people should see the project after, against how they see it before)
- the tension it holds
- what it takes from each reading
- what it rules out, including the category default

Taste joins here. If the user has a taste profile skill (for example `my-taste`), read it as [authority-and-context.md](../route/references/authority-and-context.md) describes: heavily on their own projects, below the brief on anyone else's.

Then write the direction's full spec into the brief, in the same format the three readings used in `seeds.md`: an overall angle of 30 to 80 words, then 10 to 50 words on each of the twelve design dimensions. This spec is what the build works from. An image alone makes a builder reverse-engineer pixels, which ends in either a literal copy or a generic approximation; the spec carries the reasons, and the image carries the feel.

Then make one direction image from that spec: the merged direction as a clean screen, at the fidelity of a real design. This is the image that can be judged as an outcome. Show it with the written direction.

Close with the AskUserQuestion tool, or a plain question where that tool doesn't exist:

- start building
- another round of questions
- another set of readings

Put your recommendation first with a one-line reason, and name any open question that would still change the direction.

## When things change

- **No image bridge** (Codex missing, signed out or failing): tell the user and run round three from the three readings written out in words, then the close in words. Don't substitute a hand-built mockup for the reading boards.
- **The direction shifts mid-interview:** run another round. Keep asking while answers could still change the direction; move to design once seeing work would teach more than another question.
- **Before building:** check the brief reflects the latest answers and reactions, and pass its path to the next skill.
