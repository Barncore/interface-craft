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
- For motion, capture a short sequence or step through it; a single still proves nothing about timing, interruption or settling. On the web, fire a rapid trigger (a toggle, a toast) several times to see whether it restarts from zero; slow playback to 10% in the DevTools Animations panel to see the detail; and emulate reduced motion (the DevTools Rendering panel, or `page.emulateMedia({ reducedMotion: 'reduce' })` in Playwright) to confirm movement drops while opacity feedback stays.
- Moments that only show in use: a return to a screen or route already visited (do entrances replay?), and a first load beside a refetch (does an empty state flash?). In a native app, also each field focused with the keyboard open.

Look at every capture before any reviewer sees it. A blank screen, an error overlay, a crash or the wrong screen shows a broken build, not the design. Report it as a hard gate (a build or runtime error in [gate-policy.md](gate-policy.md)), keep it from the craft reviewer, and get a good capture of that viewport or platform before anyone judges the design there.

When a check can come back false, assert it rather than eyeballing a screenshot: count elements, check computed styles, confirm drawn coordinates sit inside their container, read back the output of driving a control. Some verification surfaces fail by returning plausible output; an assertion catches what a glance passes. For interactive lists, record scroll position and open disclosures before and after an in-place action; whole-view re-renders silently reset them, and a static screenshot never shows it.

## Clean up

Stop any server you started for the review, and only those. Record what was rendered and how, so the report can state its method.
