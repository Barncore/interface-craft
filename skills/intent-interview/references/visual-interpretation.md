# Visual interpretation

Two kinds of image, at two moments:

- **Reading boards** open round three: three of them, one per reading, made to be reacted to and taken apart. They're probes, not proposals.
- **The direction image** comes at the close: one image of the merged direction, the thing that can be judged as an outcome.

The difference matters. One polished image invites fixation and polite approval, and a user who saw images without context once judged a whole interview on them. Three contrasting boards draw more honest criticism, and the board format looks like work in progress.

## Generate

Claude has no image model, so the plugin borrows Codex's. `scripts/codex-image.mjs` runs `codex exec` headlessly with Codex's built-in image tool, on the user's ChatGPT plan, with no API key. It runs Codex at high reasoning effort by default, about two minutes per image. Codex's built-in tool has no quality setting of its own; effort governs how carefully Codex reads the prompt before drawing.

For the three reading boards, write the three prompts to files and run them together in one call:

```bash
node "<this skill's dir>/scripts/codex-image.mjs" --jobs <jobs.json>
```

`jobs.json` is an array of `{"prompt": "<prompt file>", "out": "<project>/.interface-craft/concepts/<NN>-<slug>.png"}`. The script runs the jobs in parallel and prints a JSON array of results. Three boards took 126 seconds in parallel, against 327 seconds one after another. For a single image, use `--prompt-file <file> --out <png>`. Run either with a Bash timeout of at least 13 minutes.

The script never overwrites an existing file, so pick a new name for each revision. If it fails (Codex missing, signed out or timing out), say so plainly and continue in words.

## Write the prompts

Build each prompt from the reading's twelve-dimension spec in `seeds.md`.

1. **The same frame for every board in a set.** Use identical wording for the surface and framing across the three, so the comparison is about the readings and not the presentation. In the parallel test, one board had no phone frame and the other two did.
2. **The board.** "A concept board on a plain light-grey background. On the left, about two-thirds of the width: <the key screen>. On the right, a narrow column with three or four small swatches of materials, textures or details from this reading's world, and a small label reading '<reading name>'." Describe the key screen as a desktop browser viewport (16:10) for a website, or a phone screen without a device frame for an app. Name its regions in order and their scale relationships.
3. **The idea as something visible.** State the reading's defining idea as something the picture shows, not only as a sentence. "The library is proudest when its shelf is empty" survived only in a counter's wording; "most rows lit and departing, one lonely tool left on the platform" would have shown it.
4. **Example copy in the project's voice.** Give a line or two of real-sounding copy. Asked only for "a note in their own words", the model wrote "Made a garden bed." Something like "Finally fixed the side gate, it's so much better now" sets the voice.
5. **Real names and facts.** Use the project's real name and real copy where the brief has them, and ask for neutral placeholders otherwise. The image model invents brand names, slogans and claims, and puts real trademarks on products.

The image model has defaults of its own. Asked for "a calm, well-made instrument" with "one warm accent", it returned a cream ground with an amber button. Put the reading's distinctive moves into the prompt, not just its adjectives. Check every board before showing it: if it fails the swap test from the creative philosophy (could an unrelated product use it unchanged?), regenerate with more of the project in the prompt.

## The direction image

At the close, generate one image of the merged direction as a clean key screen, at the fidelity of a real design, without the board format. Build its prompt from the written direction in the brief: the frame, the one thing, and what it takes from each reading. Show it with the written direction.

## Present

Look at every image yourself first (Read the file), then send them to the user: SendUserFile in the desktop app, otherwise give the paths.

For the reading boards, open with one line framing them: three readings of the project to react to and take parts from, after which you'll merge what works into one direction. Name each board by its reading, with one line on what it's trying. Flag invented copy, names and logos as incidental. Then ask round three's questions (see [question-craft.md](question-craft.md)).

When a reading's defining idea is behaviour (resistance, a transition, a gesture), a still can't show it. If the host has an inline widget tool, you can add a small live HTML mock of that one interaction beside its board. Otherwise describe the behaviour in a line.

Take feedback at the level the user gives it. "That's the feeling" confirms a reading, not its pictured typeface. Record every image in the brief with its path, the reading it shows, and what the user kept or rejected. Move replaced images to Superseded so they can't become accidental build targets. If the user later chooses an image as the build target, `build`'s [concept-fidelity.md](../../build/references/concept-fidelity.md) governs from then on.
