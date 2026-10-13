# How interface-craft works, and why

## The problem it's built around

Ask a model for a landing page with no direction and you get the centre of its training data: a familiar font, a soft gradient, a hero and three cards. Anthropic calls this distributional convergence. More rules about style don't fix it, because the model just converges on the rules. What fixes it is material: specific, true, slightly odd things about this particular project that the model couldn't have guessed.

People are bad at handing that material over on request. Ask someone what feel they want and you get "clean and modern". Ask them why they like a design and research says their judgment actually gets worse. But ask about the last customer who walked in, or what their field gets wrong, and the good stuff comes out. Show them three rough directions and they'll tell you exactly which bits are right.

So interface-craft is mostly a machine for collecting material and keeping options open long enough for your reactions to choose. The building and reviewing parts make sure what gets chosen is built properly.

## The stance

The plugin's creative philosophy (`skills/route/references/creative-philosophy.md`) comes down to this: you know the project, Claude owns the translation into design. Start from what makes the project particular, give it a character of its own, go past the obvious treatment, and keep it good to use.

A direction has to pass two checks before it counts as committed. The memory test asks what someone would describe an hour after seeing one screen; if the answer is just a mood, the direction isn't there yet. The swap test asks whether an unrelated product could use it unchanged; if it could, it's generic, however polished.

Mechanics like type scales, motion timing and colour systems are defaults with reasons, not laws. The exceptions are accessibility and your hard constraints.

## The interview, round by round

The full process is in `skills/intent-interview/SKILL.md`. Here's the shape and the reasoning.

### Before round one: find out what the project is

Claude reads whatever exists: the brief, the README, the current site. If you haven't said what the project is, it asks you to describe it in your own words first. It also tells you the shape of what's coming, because an early tester who wasn't told took the round-three images as the finished design.

### Round one asks for stories

"Tell me about the last person who…", "what's the best and worst morning you've had", "what would the street lose if this shut". Specific episodes get you who people actually are. General questions get who they'd like to be.

### Between rounds, Claude grows seeds

Claude finds the themes running through your answers. It names the core paradox, meaning what makes this project hard to get right, and the category default, meaning the page this kind of project always ships. Then it grows several readings, or seeds, each framed as "approach it as if it were X, so Y". They're spread on purpose along two axes.

Distance runs from obvious/fitting (match the vibe), through creative/inventive (the artisan's chance to shine), to wild/extreme (dare to push the boundaries). Lead is what each seed puts first: function, style, atmosphere, story or participation.

Holding several readings at once is an old defence against falling for your first idea. Scientists have argued for it since 1890 under the name "multiple working hypotheses", and asking a model for several candidates measurably widens what it produces. Your taste profile stays out of this step. A favourite is an example, and examples cause fixation.

### Round two climbs and contrasts

Questions push on the words you used. They ask where the line sits between two qualities ("serious, but when does serious turn unwelcoming?"), and they offer three scenes in words to find out which two belong together. Most of these questions aim at where the seeds disagree. At least one goes somewhere none of them reach.

### A blind judge narrows to three

A separate agent that didn't write the seeds rates each one for fit and for distinctiveness, separately. It suggests one obvious/fitting, one creative/inventive and one wild/extreme reading. It exists because people and models both drift toward the safe choice when they pick from their own list.

### Round three opens with three reading boards

Each board is a key screen beside a few swatches from that reading's world, and all three are generated in parallel. Showing three instead of one matters. People shown a single design rate it higher and criticise it less, while people shown alternatives give more and sharper criticism. A single AI image also measurably increases fixation. The questions ask what each board gets right and wrong, and what you'd steal from each, which tells you a merge comes next.

### The close is one direction

Claude merges what you kept into one direction, writes its full twelve-dimension spec into `DESIGN-BRIEF.md`, and makes one direction image. The spec is what gets built; the image is a reference for the feel. Only now does your taste profile weigh in.

The research behind each of these choices, with sources and how strong the evidence is, is in [research.md](research.md).

## Your words and Claude's guesses live in different files

| File | Whose side | What's in it |
| --- | --- | --- |
| `DESIGN-BRIEF.md` | yours | What you said and decided, your exact words, the confirmed direction and its spec |
| `.interface-craft/seeds.md` | Claude's | Themes, seeds, the judge's ratings, the three full readings |

Keeping them apart makes it impossible for a guess to pass as a decision. Both update after every round, so stopping halfway and picking up later costs nothing.

Other files a project gathers:

| File | What it holds |
| --- | --- |
| `DESIGN.md` | What the project actually uses: tokens, components, motion values, and any lint exceptions you've approved |
| `.interface-craft/events.jsonl` | Your explicit reactions, append-only |
| `.interface-craft/overlay.md` | A readable summary of those reactions, rebuilt from the events |
| `.interface-craft/reviews.jsonl` | Reviewer findings, kept apart from your reactions so a model's opinion never counts as your taste |
| `.interface-craft/findings.json` | Open blocking findings, which the Stop gate reads |
| `.interface-craft/concepts/` | Generated images |

## Reviews come from agents that didn't build it

A reviewer that watched the work being built tends to agree with it. So `verify` renders the result, takes screenshots, and hands them to three agents in parallel, each in its own context.

| Reviewer | What it checks | What it never sees |
| --- | --- | --- |
| Lint | Runs the deterministic detector and checks for known generated-UI patterns; on a native iOS or Android app, the native pattern checks instead | The brief or anyone's taste, because its value is objectivity |
| Correctness | Accessibility and interface standards. The only track that can block delivery. | The craft critique |
| Craft | Whether the work feels arrived at and serves the brief | The detector output, which would anchor it |

Findings come in three kinds that never get mixed up. Hard-gate failures are demonstrable defects. Warnings are likely problems that need context. Critique is a judgment call, and judgment calls are yours. A glow or a serif can be exactly right for a brief, so the detector reports those as critique, never as defects.

## Web and native keep separate rules

A website and a native app fail in different ways, so they get separate checks rather than one blended list. Some signs of generated work look alike on both, such as cards inside cards or emoji standing in for icons, but the fix differs: grouped lists and the platform's icon set on a phone, CSS on the web. One runs in reverse. On the web, a system font as a page's display voice reads as generated; on a phone, replacing the system font everywhere does, because system type carries Dynamic Type and the platform's feel. So the web checks live in `verify/references/detector.md`, the native ones in `verify/references/native-checks.md`, and a sign that holds on both appears in both, each with its own fix. Guidance that holds everywhere, such as testing with worst-case data or judging each viewport on its own, says so and splits only its fixes.

The same care applies to sources. Emil Kowalski's motion and gesture defaults are tuned for product interfaces, so they set the defaults for task UI, and expressive or immersive work follows its brief instead.

## One bad mood doesn't become a rule

The `feedback` skill turns your explicit reactions into evidence, one step at a time:

1. One comment changes one artifact. "I don't like this card" stays about this card.
2. The same reaction repeated within a project becomes a line in `DESIGN.md`, with the evidence cited.
3. The same reaction repeated across different projects becomes a proposal for your taste profile, and only goes in with your yes.

Contradictions stay contradictions, recorded with their conditions ("dense in tools, sparse on showpieces"). Averaging them is how a sharp taste turns into mush.

## Hooks fail open, so there's a heartbeat

Three hooks run in the background:

- a one-line routing reminder on every prompt
- the detector on styled files as they're written
- a Stop gate that holds Claude's turn while blocking findings are open

All three fail open: if one breaks, your session carries on. The catch with failing open is that a broken hook is silent. An earlier version of this plugin had all three hooks quietly doing nothing. So there's a heartbeat, `hooks/test-hooks.mjs`, which the setup doctor runs to prove each hook still produces valid output.

## Where it came from

interface-craft started as a Claude Code plugin built around one person's taste profile. It had strong review machinery, but its rules pushed every project toward the same look. Its sibling, [Design Layer](https://github.com/Barncore/design-layer), was developed for Codex and got the design thinking right: the intent interview, the evolving brief, and taste as context rather than a template. Version 2 merged the two. It kept Design Layer's thinking and interface-craft's Claude-specific machinery, and rewrote the text throughout. Version 2.1 rebuilt the interview around seeds, reading boards and the research in [research.md](research.md). Version 2.2 added native app checks adapted from Expo's skills, and more of Emil Kowalski's guidance: worst-case data, motion review, stutter diagnosis and gesture defaults.
