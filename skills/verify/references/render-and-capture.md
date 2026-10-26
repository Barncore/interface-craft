# Render and capture

## Choose the surface

- **The built-in browser pane** (`mcp__Claude_Browser__*`) suits interactive spot checks: start the dev server with `preview_start`, navigate, screenshot, read the console. `resize_window` emulates mobile and tablet; reset it to desktop when done. Emulation shows layout at a phone's width but none of a phone browser's behaviour (the tap highlight, the URL bar's effect on viewport units, input zoom, overscroll, the software keyboard), so a finding or a pass in those areas from emulation alone is unverified.
- **Headless Playwright** suits batch captures across viewports and scripted flows. The pane depends on the host window being drawn and can stall on screenshots; a headless script doesn't, and it doubles as a regression check to rerun after fixes. Look for an existing install first (the project's devDependencies, another agent runtime) and an installed browser channel (Edge or Chrome). Collect `pageerror` and console errors in every run.
- **Claude in Chrome** (`mcp__claude-in-chrome__*`) when the user asks for their real browser.
- **A local file outside any server:** serve its folder with `py -3 -m http.server <port> --bind 127.0.0.1` and open it over HTTP; `file://` previews render statically and some features fail. A local render lacks a hosted wrapper's viewport meta, so inject one before measuring at narrow widths.
- **Desktop apps (Electron, Tauri)** that no browser tool can drive: give the app a self-capture mode instead of downgrading to a source review. Environment variables in the main process can open a named screen, size the window, capture after a short delay and quit, pointed at an isolated data folder with seeded fixtures (and an empty one for empty states). Every capture then becomes a one-line command that works on dev and installed builds alike. A colon in a screenshot filename fails silently on Windows.
- **Native iOS and Android apps:** an Android emulator runs on Windows, macOS and Linux; an iOS simulator needs macOS with Xcode. Capture each platform the app ships on. A React Native app's web build is no stand-in, because it draws web elements rather than the platform's controls, navigation and insets. Without a simulator or emulator, review from source and say which platform went unseen.

## Capture

- Viewports: 390px and 1440px wide at minimum, plus any the project defines.
- States that don't appear on load: hover, focus (tab through), active, empty, loading, error, success, disabled, long content, light and dark themes, reduced motion. For any component that shows user data, render it with worst-case data as well as the demo data ([worst-case-data.md](worst-case-data.md)).
- The console, for errors and failed requests.
- For motion, a single still proves nothing about timing, interruption or settling. Capture frames at exact times, as "Capture motion frame by frame" below describes, and capture the reduced-motion version too. Separately, fire a rapid trigger (a toggle, a toast) several times in a live page to see whether it restarts from zero, because the frame capture plays its trigger once.
- Moments that only show in use: a return to a screen or route already visited (do entrances replay?), and a first load beside a refetch (does an empty state flash?). In a native app, also each field focused with the keyboard open.

Look at every capture before any reviewer sees it. A blank screen, an error overlay, a crash or the wrong screen shows a broken build, not the design. Report it as a hard gate (a build or runtime error in [gate-policy.md](gate-policy.md)), keep it from the craft reviewer, and get a good capture of that viewport or platform before anyone judges the design there.

When a check can come back false, assert it rather than eyeballing a screenshot: count elements, check computed styles, confirm drawn coordinates sit inside their container, read back the output of driving a control. Some verification surfaces fail by returning plausible output; an assertion catches what a glance passes. For interactive lists, record scroll position and open disclosures before and after an in-place action; whole-view re-renders silently reset them, and a static screenshot never shows it.

## Capture motion frame by frame

Motion watched in real time can't be replayed exactly, and a screen recording drifts from run to run. [capture-motion.mjs](../scripts/capture-motion.mjs) takes every frame at an exact virtual time instead, so two runs give identical frames and any frame can be compared with any other:

```bash
node "<verify skill folder>/scripts/capture-motion.mjs" http://127.0.0.1:5173/ --out .interface-craft/motion/menu --width 390 --height 844 --scale 2 --trigger "document.querySelector('[data-menu-button]').click()" --sheet 0,100,200,400
```

It stops the page's JS clock and its animation timeline before the page loads, then moves both forward one frame at a time. CSS transitions, CSS animations and `element.animate()` land on their exact value at each frame's time. Motion driven from `requestAnimationFrame` (Framer Motion, GSAP, hand-written loops) can sit up to one 16ms tick behind, the same on every run. Time 0 is the frame where `--trigger` runs, or page load when there is no trigger. `--help` lists the options.

- It needs Playwright, found in the project or npm's global folder (or passed with `--playwright <package folder>`), and Chrome or Edge, because stopping the animation timeline is a Chromium DevTools call. Without them, step through the DevTools Animations panel instead and say so in the report.
- An animation started by a timer, rather than by the trigger or by page load, can land up to one frame late.
- Scroll-driven animations are left alone. Capture them by scrolling to set positions.
- `--clip` measures its box once, before the start frame, so clip to the container, not to the element that moves.
- `--reduced-motion` captures the reduced-motion version: the movement should go while the state change stays.

Give reviewers `sheet.png` rather than dozens of frames: the frames nearest the times you list, side by side. Pick the moments that tell the story: the start, the middle of the move, where it lands, and the exit. `capture.json` maps every frame to its time.

### Loops and stories return to rest

Anything that loops or acts something out (a pulse, a marquee, a chart that redraws, a product visual playing a story) has to come back exactly to its resting design. If it doesn't, each cycle drifts and the join between cycles jumps. Check it with [compare-renders.mjs](../scripts/compare-renders.mjs) at `--sigma 0 --grid 0`, which reports `"identical": true` only for pixel-identical frames:

- **Rest:** the frame where a cycle ends matches the resting state captured before the motion started.
- **Seam:** the first frame of a cycle matches the frame exactly one cycle later (at 60fps, the cycle length in seconds times 60 frames on).
- **Reset:** after a replay, a close and reopen, or a reset to empty, the first frame matches the first frame of the original run. The seam check can't catch state that failed to reset, because both its frames come from the same cycle; this one can.

When other things on the page are still moving, score only the looping element with `--region name=x,y,w,h` (in screenshot pixels) and look for `inf` on that region. When a check fails, add `--diff <file.png>` for an amplified difference image that shows what didn't come back.

## Clean up

Stop any server you started for the review, and only those. Record what was rendered and how, so the report can state its method.
