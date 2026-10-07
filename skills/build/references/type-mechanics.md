# Type mechanics

Choosing type is a design decision covered by the brief and the dimensions in `explore`. This file covers setting it well.

## Choosing and loading

- Choose a face by how it behaves in this content: x-height, width, aperture, stroke contrast, terminals, rhythm. Two faces at the same `font-size` can look different sizes. Compare real labels, numerals, punctuation and long text.
- Pair for contrast, not similarity: a deliberate display and reading split reads as intent, two near-identical sans-serifs read as a mistake. Rarely more than three families.
- Some faces are where generated design lands by default: Inter as display, Space Grotesk, Space Mono, IBM Plex, DM Sans and DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans, Syne, Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader. Each can be right; choosing one needs a reason specific to this brief, and a subject association (books mean serif, tech means mono) is not that reason.
- A page meant to have its own world sources and self-hosts a display face with the right character. The closest installed system font is a fallback, not a choice.
- Use the `Display` cut for large sizes and the `Text` cut for reading sizes where a family ships both. Weights under 300 are for display sizes (28px and up); below 18px stay at 400 or heavier.
- Serve `.woff2`. Load the weights and styles the design uses, so the browser doesn't synthesise them. Disable synthesis only after checking every emphasis state survives the full fallback stack, and prefer the specific longhands (`font-synthesis-weight`) over the blanket `none`.
- Match fallback metrics (`size-adjust`, `ascent-override`) so the web-font swap doesn't reflow the page.

## Properties over raw tags

Use the property when one exists: `font-weight: 650`, `font-optical-sizing: auto`, `font-variant-numeric: tabular-nums`, `font-variant-caps`, `font-variant-position`. They keep working on a non-variable fallback; `font-variation-settings` and `font-feature-settings` silently do nothing there. Save raw tags for custom axes (`"GRAD"`) and features with no property (`"ss01"`, `"cv11"`), and check what each numbered slot does in that font.

## Scale, spacing and rhythm

- A small named scale, deviated from rarely. On a team, name sizes by use (`text-body-sm`). Heading levels map to descending steps, and a child heading never outweighs its parent.
- Product UI wants a predictable rem scale; fluid `clamp()` sizing suits display type on expressive and marketing surfaces.
- Line-height is unitless: headings around 1.1, body 1.5 to 1.6, and anything wrapping to three or more lines at least 1.4, even in tight rows. Wider measures need more leading; tune the pair together.
- Large headings often want slightly negative tracking (not tighter than about -0.04em); small uppercase labels want a little positive tracking; body text wants neither.
- Light text on dark surfaces needs compensation: a touch more line-height, a little more tracking, and sometimes one weight step up.
- Display type tops out around 6rem in most layouts. Run real copy at every breakpoint and fix what overflows.
- Mark paragraph boundaries one way: spacing or first-line indent, never both.
- `text-box: trim-both cap alphabetic` removes the font's built-in leading in buttons and badges (Chromium 133+, Safari 18.2+; progressive enhancement).

## Wrapping and measure

- Long-form text sits around 60 to 75 characters per line, in any unit.
- `text-wrap: balance` on headings, `text-wrap: pretty` on short descriptions, neither on long-form paragraphs.
- `overflow-wrap: break-word` where URLs, IDs or long words could escape; `white-space: nowrap` on labels and badges where a break looks broken; flex children need `min-width: 0` to truncate.
- Truncate with `text-overflow: ellipsis` or `line-clamp`, and keep the full value reachable when it matters.
- `text-align: start` in interfaces; justify only in a deliberate editorial layout.

## Details

- `font-variant-numeric: tabular-nums` on any number that changes or aligns in a column, not on prose.
- Write copy in natural case and style it with `text-transform`.
- Typographic punctuation: curly quotes in prose (straight in code), an en dash for ranges, the single ellipsis character, `&nbsp;` inside values like `10&nbsp;MB`.
- Underlines from the font: `text-underline-position: from-font` and `text-decoration-thickness: from-font`, or set offset and thickness by hand with `text-decoration-skip-ink: auto`. Only colour animates reliably on a real underline; build anything else as a separate element.
- Font weight never changes on hover or selection, because it shifts layout.
- Inputs stay at 16px on mobile or iOS Safari zooms the page. Never fix that with `maximum-scale=1`, which blocks zoom in other browsers and fails WCAG.
- Apply `-webkit-font-smoothing: antialiased` and `-moz-osx-font-smoothing: grayscale` once at the root.
- Keep text selectable; `user-select: none` only on a specific drag or gesture surface where selection interferes. `::selection` can carry the brand if the pair stays legible.
- Set `lang` so quotes, hyphenation and pronunciation come out right. Mixed-direction values go in `<bdi>`; digits never reverse.
