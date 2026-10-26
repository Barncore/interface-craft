# Interface checklist

Mechanics that generated interfaces most often get wrong. The correctness reviewer walks this list against the changed files after the accessibility gates. Each item is a default with a reason; the project's own conventions win on style questions such as capitalisation, and `accessibility-gates.md` wins wherever the two disagree. Informed by Vercel's [Web Interface Guidelines](https://vercel.com/design/guidelines), written here in our own words.

## Semantics and focus

- Actions are buttons, navigation is links (so new-tab and middle-click work), and nothing clickable is a bare `div` or `span`.
- Icon-only controls have an accessible name; purely decorative icons are hidden from assistive technology.
- Every form control has a label, and clicking the label focuses the control.
- Interactive elements show a visible focus style via `:focus-visible`; compound controls can use `:focus-within`.
- Headings form a real outline, a skip link reaches the main content, and anchored headings set `scroll-margin-top`.
- Updates that appear without a page change (toasts, validation, counts) are announced politely.

## Forms

- Inputs carry a meaningful `name`, the right `type` and `inputmode`, an `autocomplete` value where one applies, and an `enterkeyhint` where the return key does something specific.
- Paste is never blocked.
- Spellcheck is off for emails, codes and usernames.
- The submit button stays enabled until the request starts, then shows progress.
- Errors sit next to their field, and the first one gets focus after a failed submit.
- Placeholders show an example of the expected format.
- Leaving a page with unsaved changes asks first.

## Motion

- Movement respects `prefers-reduced-motion`.
- Animate `transform` and `opacity`, and list the transitioned properties rather than using `transition: all`.
- `transform-origin` matches where the motion should come from; SVG transforms go on a group with `transform-box: fill-box`.
- Animations can be interrupted by new input.
- Nothing animates on a keyboard shortcut, a command-palette toggle, or anything used a hundred times a day.
- No `ease-in` on UI motion: entrances and exits ease out, on a strong custom curve rather than a built-in one.
- UI motion stays under 300ms unless a reason is stated (an authored focal entrance, explanatory or marketing motion).
- Anything fired rapidly (toasts, toggles) uses transitions or springs, not keyframes, so a repeat retargets instead of restarting from zero.
- A press-and-hold is slow while the user decides and fast on release, not symmetric.
- Several hand-typed curves that almost match are a missing motion token.
- Loops and stories end exactly on their resting state, and a replay starts from the same frame as the first run: the rest, seam and reset checks in `render-and-capture.md`.

## Text and content

- Use the ellipsis character, typographic quotes, and non-breaking spaces inside values like `10 MB` and key combinations.
- Loading labels end in an ellipsis: "Saving…".
- Numbers that update or sit in columns use tabular figures.
- Headings wrap with `text-wrap: balance` or `pretty`.
- Containers survive long content: truncation, line clamping or word breaking where needed, and `min-width: 0` on flex children that must shrink.
- Empty strings and empty lists render a deliberate state, not a broken layout.
- Copy uses active voice and second person, names specific actions ("Save API key", not "Continue"), and error messages say how to fix the problem.

## Images and performance

- Images have explicit dimensions so the layout doesn't jump; below-the-fold images load lazily; the hero image gets priority.
- Long lists are virtualised or use `content-visibility`.
- Rendering doesn't read layout (`getBoundingClientRect`, `offsetHeight`) in the hot path, and reads and writes to the DOM are batched.
- Controlled inputs stay cheap per keystroke.
- Critical fonts are preloaded with a sensible `font-display`, and asset origins get a `preconnect`.

## Navigation and state

- The URL reflects state that someone might share or return to: filters, tabs, pagination, open panels.
- Destructive actions ask for confirmation or offer undo.

## Touch, layout and theming

- Taps don't wait on double-tap zoom (`touch-action: manipulation`). The tap highlight is off, and every tappable element has its own `:active` state instead.
- Modals, drawers and sheets contain their scroll (`overscroll-behavior: contain`), and an app's root sets `overscroll-behavior: none` unless pull-to-refresh is wanted.
- Full-height layouts use `100dvh` (app shells) or `100svh` (heroes), never a bare `100vh`.
- During a drag, text selection is off and the dragged element is inert.
- Autofocus is rare and avoided on touch devices.
- Full-bleed layouts respect safe-area insets, and no container shows an accidental scrollbar.
- Layout uses flex and grid rather than JavaScript measurement.
- Dark themes set `color-scheme: dark`, there's one `theme-color` per colour scheme matched to the header's colour, and native selects get explicit colours.

## Locale

- Dates, times, numbers and currency use `Intl` formatters, not hand-built formats.
- Language comes from the browser's language settings, not the IP address.
- Brand names, code and identifiers are marked `translate="no"`.

## Hydration and interactive states

- Inputs with a `value` have an `onChange`, or use a default value instead.
- Dates and times rendered on the server and the client don't mismatch.
- Buttons and links have a hover state, and hover, active and focus states increase contrast rather than reduce it.

## Red flags

Disabling zoom (`user-scalable=no`, `maximum-scale=1`), blocking paste, `transition: all`, removing outlines with no replacement, click handlers on `div`s, images without dimensions, unvirtualised long lists, unlabelled inputs or icon buttons, hand-built date or number formats, and autofocus without a clear reason.
