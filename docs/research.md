# The research behind the intent interview

Before redesigning interface-craft's intent interview, we researched how creative people communicate abstract ideas, how designers draw a brief out of a client, what the evidence says about brainstorming, and what a language model needs to hear to make non-generic work. This is that research, done in October 2026. Section 6 says what we made of it, and the last section says what changed in the plugin.

Each claim carries its evidence class:

- **[experiment]:** a controlled study
- **[meta]:** a meta-analysis or systematic review
- **[field]:** an observational or interview study of real practice
- **[practice]:** a practitioner method with no controlled evidence behind it
- **[theory]:** a conceptual model

Most sources were read through their abstracts and summaries. Paton and Dorst's briefing study was read in full.

## The short version

1. **People are poor at describing their own taste, and good at recognising it.** Asking people to explain why they like something makes their judgments worse and their choices less satisfying. Reactions to concrete things are more reliable than descriptions.
2. **Abstract insight is reached through concrete material, not by asking abstract questions.** Strong interview traditions start with specific stories and episodes. They climb to meaning with "why does that matter?", then sharpen with contrasts.
3. **Metaphor, analogy and contrast are how designers get clients past their first frame.** Experienced designers deliberately use them, plus several rough conjectures, to loosen a client's fixed idea.
4. **Keeping several options alive beats developing one.** This holds across science (multiple working hypotheses), design (parallel prototyping) and testing (alternatives draw more honest criticism than a single design).
5. **A single polished example causes fixation, and AI images make it worse.** People who ideated with an AI image generator produced fewer, less varied, less original ideas.
6. **Selection is the weak link.** People reliably pick the feasible idea over the original one. Models have the same pull toward the typical.
7. **Models collapse to the most typical answer unless the prompt makes them range.** Asking for several candidates (with rough probabilities), reasoning step by step, and supplying concrete particulars all measurably widen output.

## 1. Communicating abstract ideas

### Description degrades taste; recognition doesn't

- **Introspection hurts preference.** Students who analysed why they liked strawberry jams agreed less with experts than students who just tasted [experiment] ([Wilson and Schooler 1991](https://acawiki.org/Thinking_Too_Much:_Introspection_Can_Reduce_the_Quality_of_Preferences_and_Decisions)). People asked to list reasons for liking art posters chose differently and were less satisfied with their choice three weeks later [experiment] ([Wilson et al. 1993](https://journals.sagepub.com/doi/10.1177/0146167293193010)). The mechanism: reasons that are easy to put into words displace the real, harder-to-verbalise causes of a reaction.
- **Verbal overshadowing.** Describing a face, a colour or a wine in words can impair later recognition of it. The effect is strongest where perceptual skill outruns verbal skill [experiment] ([Melcher and Schooler 1996](https://labs.psych.ucsb.edu/schooler/jonathan/sites/labs.psych.ucsb.edu.schooler.jonathan/files/pubs/schooler-wine_tasting.pdf); [overview](https://en.wikipedia.org/wiki/Verbal_overshadowing)). That describes most non-designers judging design: they know it when they see it and lack the vocabulary.
- **Generic answers describe who people want to be.** "Talk about their life, not your idea"; "ask about specifics in the past, not generics or opinions about the future" [practice] ([Fitzpatrick, The Mom Test](https://www.sachinrekhi.com/the-mom-test-rob-fitzpatrick)).

What this means: a question like "what would make this feel unmistakably yours?" asks for exactly the verbal self-analysis that degrades judgment. An early tester rejected it on sight, and the research backs them. Ask about the project, and let reactions to concrete work carry the taste.

### Metaphor, analogy and mood boards

- In Paton and Dorst's interviews with 15 experienced visual-communication designers, the designers named three main enablers for reframing a client's brief [field] ([Paton and Dorst 2010, DTRS8](https://opus.lib.uts.edu.au/bitstream/10453/16593/1/2010000364OK.pdf); full paper in Design Studies 2011):
  - **Metaphor and analogy**, visual and verbal. One designer: "people find it easier to talk about unrelated things."
  - **Contextual engagement:** immersing in the client's world.
  - **Conjecture:** "multiple conjectures were often posed and were kept rough", deliberately to loosen fixation on one outcome.
- The same study names the barriers to reframing: the client's fixation on their initial idea, a "problem-solving" model of design, and resistance to the process. It also found that briefing language has to be co-created in conversation. Clichés, jargon and buzzwords carry "default" ways of thinking that block new frames.
- Designers talked about **tone** as the thing that is "really hard to grasp" yet is what "people read without reading", and steered clients toward it through analogy.
- Mood boards play five roles in early design: framing, aligning stakeholders, paradoxing (exploring apparently contradictory ideas), abstracting, and directing [field] ([Lucero 2012](https://users.aalto.fi/~luceroa1/publications/2012/lucero12_moodboards.pdf)).
- ZMET has participants bring images that represent their feelings about a topic, then interviews them about the images to surface the "deep metaphors" behind conscious attitudes [practice, widely used in marketing research] ([overview](https://en.wikipedia.org/wiki/Zaltman_metaphor_elicitation_technique)).

### Contrast reveals what words can't

- The repertory grid asks how two of three examples are alike and different from the third. The answers come out as the person's own bipolar constructs ("calm vs anxious", "crafted vs assembled") without them needing design vocabulary. It has been used to map aesthetic design spaces in HCI [field/method] ([Exploring the design space of aesthetics with the repertory grid](https://arxiv.org/pdf/2008.07862)).
- Spradley's ethnographic interview uses contrast questions ("what's the difference between A and B?") to find the meaning behind terms [practice, foundational in qualitative research] ([Spradley's question types](https://slcc.pressbooks.pub/socialchange/chapter/ethnographic-interviewing/)).

### Stating a vision so others can use judgment

- **Commander's intent:** state the purpose, the key tasks and the end state, so people can depart from the plan sensibly when things change [practice, military doctrine] ([summary](https://www.smartbrief.com/original/fixing-strategy-execution-commanders-intent)).
- **Creative briefs** in advertising converge on a small set of parts: the human insight (not the product truth), the tension or barrier, one single-minded proposition, reasons to believe, the desired response, and tone [practice] ([Saatchi model and common brief elements](https://beyond-the-brief.beehiiv.com/p/creative-brief-examples-that-work)).
- **Frames:** Dorst's frame creation formalises a working frame as "if the problem situation is approached as if it is X, then Y" [theory/practice] ([Dorst, Frame Innovation 2015](https://proakatemia-esseepankki.tuni.fi/?p=47270)).

## 2. Probing a client for a brief

### Start concrete, climb to meaning, then contrast

- **Descriptive, then structural, then contrast.** Spradley's sequence: descriptive questions ("walk me through a typical...", specific examples, experiences, in the person's own language), then structural questions (how things relate and group), then contrast questions (what distinguishes them) [practice].
- **Laddering** climbs from attributes to consequences to values by repeatedly asking why something matters [practice with a large research literature] ([Reynolds and Gutman 1988; overview](https://en.wikipedia.org/wiki/Ladder_interview)). Laddering about the project's goals is different from asking someone to justify an aesthetic reaction; the second is the introspection that degrades judgment.
- **Anchor on a real episode.** The Jobs to Be Done switch interview reconstructs a specific moment of change as a timeline: first thought, passive looking, active looking, deciding. It reads motivation from the story rather than from opinions. It maps the four forces: the push of the old situation, the pull of the new, anxiety, and habit [practice] ([Moesta and Spiek](https://www.koji.so/docs/switch-interviews-jtbd-method)).
- **Follow-up questions** signal listening and draw out more than new topics do [experiment-backed, popular summary] ([Brooks and John, HBR 2018](https://qz.com/work/1320203/how-to-ask-smart-questions-according-to-a-harvard-study)).

### Distance and paradox open things up

- **Psychological distance.** Thinking about the distant future makes people represent things more abstractly, and abstract construal improved creative insight in experiments [experiment] ([Förster, Friedman and Liberman 2004](https://www.academy.ac.il/SystemFiles/26136.pdf)). GV's brand sprint opens with a "20-year roadmap" exercise for the same reason [practice].
- **Paradox.** Dorst's frame creation asks early why the problem is hard: what core paradox sits underneath it. Frames are then built from deep "themes" in the people involved, not from the surface request [theory/practice].
- **Tension in briefs.** Advertising briefs build the creative idea around a tension or barrier [practice]. In early tests, the most useful answers ("technical but approachable", "premium without pretentious") were tensions.

### Practitioner toolkits worth knowing

- **GV Brand Sprint** (three hours): a 20-year roadmap; what, how, why; top three values; top three audiences; personality sliders; a competitive landscape [practice] ([summary](https://www.sessionlab.com/?p=2570)).
- **How Might We** questions, from Min Basadur's work at Procter & Gamble, turn a problem into an invitation to ideas [practice] ([Basadur](https://www.basadur.com/?p=7453)).
- **Designers' identity questions**, quoted in Paton and Dorst: "How do you see yourself? How do you want people to feel about you? How do you actually behave? How would you like to behave?" The gap between actual and aspirational is the material [field].

## 3. Divergence, frames and fixation

- **Problem finding predicts originality.** Art students who spent longer exploring and rearranging the objects before drawing produced work judged more original. They were also more successful as artists years later [field, longitudinal] ([Getzels and Csikszentmihalyi 1976](https://muse.jhu.edu/article/599015/summary)).
- **Problem and solution co-evolve.** In protocol studies of experienced designers, creative design looks like the problem and the solution developing together; the "creative event" is a frame that links them [field] ([Dorst and Cross 2001](https://oro.open.ac.uk/3278)). A brief should keep evolving once concrete work appears, which supports the evolving brief and the image in round three.
- **Multiple working hypotheses.** Chamberlin warned in 1890 of "parental affection" for a first explanation. One early favourite leads to unconscious selection of supporting evidence, so hold several, ideally contradictory, at once [theory] ([Chamberlin](https://serc.carleton.edu/resources/13526.html)).
- **Parallel beats serial.** Designers who made several prototypes before feedback produced better ads (click-through and expert ratings), more diverse work, and more self-efficacy than those who iterated on one. Serial designers took critique as a threat to their only option [experiment] ([Dow et al. 2010](https://cs303.stanford.edu/papers/ParallelPrototyping2010-final.pdf)).
- **Alternatives draw honest criticism.** Users shown one design rated it higher and were reluctant to criticise. Shown the same design among three, they gave more and stronger criticism [experiment] ([Tohidi, Buxton, Baecker and Sellen 2006](https://www.microsoft.com/en-us/research/?p=151922)).
- **Design fixation.** After seeing an example, designers reuse its features even when its flaws are pointed out [experiment] ([Jansson and Smith 1991](https://cognitive.designsociety.org/download-publication/39819/Studying+design+fixation+with+a+computer-based+task)). Ideating with an AI image generator raised fixation on the initial example and produced fewer ideas with less variety and lower originality [experiment, N=60] ([Wadinambiarachchi et al. 2024](https://arxiv.org/pdf/2403.11164)).
- **Rough invites exploration.** Buxton's qualities of a sketch: quick, inexpensive, disposable, plentiful, minimal detail, ambiguous, and suggesting and exploring rather than confirming [practice] ([Buxton, Sketching User Experiences](https://hci.stanford.edu/courses/cs377e/2015/sp/lectures/07-design-exploration.pdf)).
- **Selection is weak.** People prefer feasible ideas to original ones, and their selections from a pool were no better than chance [experiment] ([Rietzschel, Nijstad and Stroebe](https://research.rug.nl/en/publications/productivity-is-not-enough-a-comparison-of-interactive-and-nomina/)).

## 4. What the evidence says about brainstorming

- **Alone, then together.** Individuals working alone and pooling their ideas (nominal groups) beat face-to-face brainstorming groups on quantity and quality. Production blocking (waiting your turn) explains most of the loss [meta] ([Mullen, Johnson and Salas 1991; Diehl and Stroebe 1987](https://en.wikipedia.org/wiki/Production_blocking)). Alternating individual and group phases ("hybrid brainstorming") does better than either alone [experiment] ([Korde and Paulus 2017](https://mavmatrix.uta.edu/psychology_dissertations/44)).
- **Incubation works, especially for divergent tasks.** A meta-analysis of incubation studies found a reliable positive effect, largest for divergent thinking [meta] ([Sio and Ormerod 2009](https://pubmed.ncbi.nlm.nih.gov/19210055/)). Time between rounds is useful, not just politeness.
- **Moderate constraints help.** A cross-disciplinary review suggests creativity rises with some constraint and falls with too much or too little; with no constraints, people settle on the familiar path [review] ([Acar, Tarakci and van Knippenberg 2019](https://openaccess.city.ac.uk/id/eprint/20459/)).
- **Closer analogies helped more than distant ones** on OpenIDEO, against the popular "far analogy" idea [field] ([Chan, Dow and Schunn 2015](https://www.lrdc.pitt.edu/Schunn/papers/Chan-Dow-Schun-desstudies-nearfar-inpress.pdf)).
- **Improvisation loosens set patterns.** Verbal and musical improvisation raised divergent-thinking scores against controls [experiment] ([Lewis and Lovatt 2013](https://uhra.herts.ac.uk/id/eprint/25347/)). Sawyer's research frames group creativity as emergent from close listening and building on others [field/theory] ([Sawyer](https://blog.webex.com/collaboration/hybrid-work/creativity-collaboration-keith-sawyer/)).
- **Candour about early work.** Pixar's Braintrust starts from "early on, all our movies suck" and gives candid notes peer to peer, without hierarchy [practice] ([Catmull, Creativity, Inc.](https://shortform.com/blog/?p=21508)).
- **Provocation tools** like Oblique Strategies and de Bono's lateral thinking are popular and plausible, but I found no controlled evidence for them [practice] ([Oblique Strategies](https://fourweekmba.com/oblique-strategies)).

## 5. The model's side

- **Distributional convergence.** Anthropic's own explanation: without direction, models sample from the high-probability centre of their training data, and safe design choices dominate that data, hence Inter, purple gradients and minimal motion. Specific, opinionated guidance on type, colour, motion and backgrounds moved output away from that centre [practice, vendor] ([Anthropic, Improving frontend design through Skills](https://claude.com/blog/improving-frontend-design-through-skills)).
- **Typicality bias.** Post-training pushes models toward familiar answers because human raters favour typical text. Asking for several responses with probabilities ("verbalized sampling") raised creative-writing diversity 1.6 to 2.1 times over direct prompting, and more capable models benefited more [experiment] ([Zhang et al. 2025](https://arxiv.org/abs/2510.01171v3)).
- **AI idea pools are narrow but fixable.** GPT-4 idea pools were less diverse than human groups. Chain-of-thought prompting gave the most diverse pool and came close to human groups [experiment] ([Meincke, Mollick and Terwiesch 2024](https://arxiv.org/pdf/2402.01727)). In a separate study, LLM ideas were better on average and seven times more likely to reach the top 10 percent, but less diverse [experiment] ([Girotra et al.](https://knowledge.wharton.upenn.edu/article/is-chatgpt-a-better-entrepreneur-than-most/)).
- **Generating more doesn't keep giving more.** In an ideation agent, 4,000 generated seed ideas contained only about 200 unique ones [experiment] ([Si, Yang and Hashimoto 2024](https://arxiv.org/pdf/2409.04109)).
- **Homogenisation.** AI help made individual stories more creative but made stories more similar to each other [experiment] ([Doshi and Hauser 2024](https://pmc.ncbi.nlm.nih.gov/articles/PMC11244532)). ChatGPT users' ideas were less semantically distinct from each other than users of another tool [experiment] ([Anderson, Shah and Kreminski 2024](https://arxiv.org/abs/2402.01536v2)).
- **Good questioning beats self-written prompts.** Models that elicit intent through open-ended questions get more informative specifications than people's own prompts or examples. Users find this less effort and say it surfaces considerations they hadn't anticipated [experiment] ([GATE, Li et al.](https://iclr.cc/virtual/2025/poster/29967)).

What the model needs to hear, inferred from the above: particulars rather than adjectives, a tension, a frame, the category default named so it can be avoided, and the user's own words. A brief of adjectives ("calm, premium, trustworthy") leaves the model at the centre of the distribution. Even the image model did this in testing: "calm, well-made instrument" came back as a cream ground with an amber button.

## 6. What this means for the intent interview

This section is interpretation, not a finding.

**Two axes, not one.** The research separates the form of a question from the breadth of possibility. Form moves from concrete (stories, specific moments, real people and objects) to abstract (why it matters, what it's like, the paradox, the distant future) to contrast (this versus that, where the boundary is). Breadth diverges through rounds one and two, and converges in round three, mostly through recognition rather than more questioning. "Facts first, then divergence" mixes the two axes. A concrete story question is factual in form and divergent in what it yields.

**The interview's real job is harvesting what the model needs.** Most of it is concrete material and tension rather than declared preferences: the specific moments, the objects of the subject's world, the paradox, the shift from how people see it now to how they should, the one thing it must say, the category default to avoid, and the user's own metaphors and words.

**Holding several readings is the right mechanism, in a better shape.** Multiple working hypotheses, parallel prototyping, verbalized sampling and designers' rough conjectures all point the same way. The model's default is one typical reading, so without the instruction the interview would converge faster. What's worth changing: the fixed count of three (it invites a padded third), readings derived only by sorting facts (they need a leap from metaphor, analogy or paradox), round two aimed only at the existing readings (leave room for territory none of them covers), and choosing the "strongest" for round three (selection drifts toward the typical).

**Round three should probably show more than one image.** One polished image invites fixation and polite approval. Two or three contrasting interpretations draw more honest criticism and protect against picking the typical one.

## What changed in the plugin

- Round one asks for concrete episodes, people and objects; round two climbs to meaning and contrasts. The question repertoire in `skills/intent-interview/references/question-craft.md` grew out of sections 1 and 2.
- The interview holds several readings ("seeds") in a separate scratchpad, spread on two axes, with a blind judge before narrowing. That follows section 3 and the model findings in section 5.
- Round three opens with three contrasting reading boards instead of one image, framed as probes, and the close produces one direction image. That follows the fixation and alternatives findings in section 3.
- Users are never asked why they like a visual, following section 1.
