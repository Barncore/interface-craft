# Setting up interface-craft

Fifteen minutes, most of it waiting on installers. The plugin works as soon as it's installed; Codex is only needed for the images in round three of the interview, and the interview runs fine without them.

## 1. Check the basics

You need Claude Code and Node.js 18 or later. In a terminal:

```bash
node --version
```

Anything from `v18` up is fine. If Node is missing, install the LTS version from [nodejs.org](https://nodejs.org). The plugin's hooks and scripts are plain Node with no packages to install, but they do need Node itself.

## 2. Install the plugin

From a terminal:

```bash
claude plugin marketplace add Barncore/interface-craft
claude plugin install interface-craft@interface-craft
```

Inside a Claude Code session, the same thing as slash commands:

```text
/plugin marketplace add Barncore/interface-craft
/plugin install interface-craft@interface-craft
```

Pick "Install for you" (user scope) so it works in every project. If Claude Code says to reload, run `/reload-plugins`.

In the Claude desktop app's Code tab, add the marketplace from a terminal as above (the desktop app reads the same settings), then use **+ > Plugins > Add plugin** and choose interface-craft.

Check it landed: type `/` in a session and look for `interface-craft:route`, `interface-craft:intent-interview` and friends.

Marketplaces other than Anthropic's don't auto-update by default. To get new versions, run `claude plugin update interface-craft@interface-craft`, or turn on auto-update for this marketplace in `/plugin` under **Marketplaces**.

## 3. Run the setup check

Ask Claude in any session:

> Check my interface-craft setup.

It runs the bundled doctor and reports back. You can also run it yourself; the plugin lives under `~/.claude/plugins/cache/interface-craft/interface-craft/<version>/`:

```bash
node ~/.claude/plugins/cache/interface-craft/interface-craft/2.1.0/tools/doctor.mjs
```

You want to see:

```text
OK    Node: 22.x
OK    Hooks: all 9 passed
OK    Detector: Impeccable 4.0.0
OK    Codex: codex-cli 0.160.x at ...
OK    Codex login: Logged in using ChatGPT
```

On a Mac or Linux machine the detector line says `INFO` instead: the bundled detector is Windows-only, and the reviewers fall back to their own checks. That's expected, not a fault. Codex shows `WARN` until you've done the next step.

## 4. Set up Codex for images

The interview's reading boards and direction image come from OpenAI's image model. Claude can't make images itself, so interface-craft runs the Codex CLI in the background (`codex exec`, no window) and asks Codex's built-in image tool to draw. It uses your ChatGPT sign-in, so there's no API key and no separate bill; images count against your ChatGPT plan's Codex usage.

### Install Codex

On macOS or Linux, OpenAI's installer is the quickest:

```bash
curl -fsSL https://chatgpt.com/codex/install.sh | sh
```

On any platform with Node, npm works too:

```bash
npm install -g @openai/codex
```

On Windows, the Codex desktop app is enough on its own. interface-craft finds the command-line Codex that ships inside the app.

OpenAI's [Codex CLI page](https://learn.chatgpt.com/docs/codex/cli) has the current options if these have moved on.

### Sign in with ChatGPT

```bash
codex login
```

Choose **Sign in with ChatGPT** and finish in the browser. Then check:

```bash
codex login status
```

It should say `Logged in using ChatGPT`. An API-key login can work too, but then images bill to your API account instead of your plan.

### Test an actual image

Ask Claude to "check my interface-craft setup with a test image", or run the doctor with `--image`:

```bash
node ~/.claude/plugins/cache/interface-craft/interface-craft/2.1.0/tools/doctor.mjs --image
```

It generates one small picture through Codex, which takes about two minutes, and prints where it saved it. If that works, round three will work.

### How the image step behaves

- Each image runs Codex at high reasoning effort, about two minutes. The interview generates its three reading boards in parallel, so round three waits about two minutes, not six.
- Codex runs with `--ephemeral`, so these runs don't clutter your Codex history, and in its `workspace-write` sandbox rooted at the folder the image goes into, so it can't write anywhere else in your project.
- Images are saved in your project at `.interface-craft/concepts/`, and the interview records each one in `DESIGN-BRIEF.md`.
- If Codex isn't there, isn't signed in, or fails, the interview says so and carries on in words. Nothing breaks.

## 5. Optional: a taste profile

interface-craft carries no taste of its own. If you have a skill that describes what you like (a "taste profile", for example one called `my-taste`), the plugin reads its visual and UI part as evidence and weighs it heavily on your own projects. Without one, it designs from the brief. When you repeatedly react the same way across projects, the `feedback` skill writes proposed taste entries to `.interface-craft/taste-proposals.md`, which is a good way to start one.

## 6. Turning things down

| Part | What it does | How to quiet it |
| --- | --- | --- |
| Write-time detector | Scans styled files as Claude writes them (Windows only) | Create an empty file at `.interface-craft/no-detect` in that project |
| Routing hook | Adds about 60 tokens to every prompt so Claude remembers to route design work | Disable the plugin where you don't want it: `claude plugin disable interface-craft@interface-craft`, or toggle it in `/plugin` |
| Stop gate | Holds Claude's turn while a review has blocking findings open in `.interface-craft/findings.json` | Mark the finding `"dismissed"` there, or tell Claude to dismiss it |

## When something's off

| Symptom | Likely cause and fix |
| --- | --- |
| The doctor won't start (`node: command not found`) | Node isn't installed or isn't on your PATH. Install Node LTS and restart your terminal and Claude Code. |
| Doctor says `Hooks: FAIL` | Run `node hooks/test-hooks.mjs` from the plugin folder to see which hook failed and why. |
| `Codex: not found` | Codex isn't installed, or isn't on your PATH. Install it as above. If it lives somewhere unusual, set `CODEX_BIN` to the full path of the `codex` executable. |
| `Codex login: not signed in` | Run `codex login` and choose ChatGPT. |
| Test image fails with a timeout | Codex was slow or busy. Try once more. If it keeps failing, run `codex exec "say hi"` in a terminal to see Codex's own error. |
| Test image fails, Codex otherwise works | Your Codex version or plan may not expose the built-in image tool. Update Codex (`npm install -g @openai/codex@latest`, or update the app) and try again. |
| Interview never asks questions, just builds | Routing didn't fire. Say "use interface-craft to interview me about this project", or start with `/interface-craft:intent-interview`. |
| `npx` or npm errors in a project whose path contains `&` | Not this plugin's fault: npm's Windows shims break on `&`, `(`, `)` or `!` in a path. interface-craft avoids npx for that reason. |

Still stuck? Open an issue on [GitHub](https://github.com/Barncore/interface-craft/issues) with the doctor's output.
