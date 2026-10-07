# Render and capture

## Choose the surface

- **The built-in browser pane** (`mcp__Claude_Browser__*`) suits interactive spot checks: start the dev server with `preview_start`, navigate, screenshot, read the console. `resize_window` emulates mobile and tablet; reset it to desktop when done.
- **Headless Playwright** suits batch captures across viewports and scripted flows. The pane depends on the host window being drawn and can stall on screenshots; a headless script doesn't, and it doubles as a regression check to rerun after fixes. Look for an existing install first (the project's devDependencies, another agent runtime) and an installed browser channel (Edge or Chrome). Collect `pageerror` and console errors in every run.
- **Claude in Chrome** (`mcp__claude-in-chrome__*`) when the user asks for their real browser.
- **A local file outside any server:** serve its folder with `py -3 -m http.server <port> --bind 127.0.0.1` and open it over HTTP; `file://` previews render statically and some features fail. A local render lacks a hosted wrapper's viewport meta, so inject one before measuring at narrow widths.
- **Desktop apps (Electron, Tauri)** that no browser tool can drive: give the app a self-capture mode instead of downgrading to a source review. Environment variables in the main process can open a named screen, size the window, capture after a short delay and quit, pointed at an isolated data folder with seeded fixtures (and an empty one for empty states). Every capture then becomes a one-line command that works on dev and installed builds alike. A colon in a screenshot filename fails silently on Windows.

## Capture

- Viewports: 390px and 1440px wide at minimum, plus any the project defines.
- States that don't appear on load: hover, focus (tab through), active, empty, loading, error, success, disabled, long content, light and dark themes, reduced motion.
- The console, for errors and failed requests.
- For motion, capture a short sequence or step through it; a single still proves nothing about timing, interruption or settling.

When a check can come back false, assert it rather than eyeballing a screenshot: count elements, check computed styles, confirm drawn coordinates sit inside their container, read back the output of driving a control. Some verification surfaces fail by returning plausible output; an assertion catches what a glance passes. For interactive lists, record scroll position and open disclosures before and after an in-place action; whole-view re-renders silently reset them, and a static screenshot never shows it.

## Clean up

Stop any server you started for the review, and only those. Record what was rendered and how, so the report can state its method.
