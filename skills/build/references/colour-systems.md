# Colour systems

Choosing a palette is a design decision covered by the brief, the colour strategy in `concept-derivation.md`, and the colour dimensions in `explore`. This file covers building the system well.

## Respect what exists

Preserve an established token API and colour notation unless the task includes a colour-system migration. A consistent hex system beats a lone OKLCH value dropped into it. OKLCH is a good authoring space, not a reason to migrate a working system.

## OKLCH as an authoring space

`oklch(L C H / alpha)`: lightness 0 to 1, chroma from 0 to roughly 0.4 (the maximum depends on lightness and hue), hue in degrees. Unlike HSL, hue stays stable as lightness changes and chroma doesn't depend on lightness, so ramps hold their character.

- Build a primitive palette around the project's anchors, then map it to semantic roles (surface, text, border, action, status). Components consume roles, so a theme changes the mapping, not every component.
- Vary chroma through a ramp rather than holding it constant; very light and very dark steps need less to stay in gamut. For equal vividness across hues, match chroma as a share of each hue's maximum, not as an absolute value. More than about 10 degrees of hue spread across a ramp reads as drift.
- A valid OKLCH value can sit outside sRGB or even Display P3. Reduce chroma while keeping lightness and hue to bring it in, and check gradients as well as endpoints. `@supports` tests syntax support, not the display's gamut; use `@media (color-gamut: p3)` for wide-gamut enhancement with an sRGB fallback. Use a tested colour library for conversion instead of hand arithmetic.
- In Tailwind v4, define scales in `@theme` with OKLCH values.

## Using colour

- **One colour, one meaning.** If a hue signals "interactive", that hue on static text tells people to click something that isn't clickable.
- **Tokens by role, used in their role.** A separator token used as text breaks the next theme change. If a role has no token, add one rather than borrowing by value.
- **Emphasis.** When filled colour marks the primary action, give it to one action per decision context and keep peers neutral. Colour on the background reads as primary; colour on the label reads as a link. Selected states may use the accent on glyph and label.
- **Commit at region scale.** Let the strongest colour own a deliberate region or role; scattered tiny accents over a neutral ground aren't a strategy.
- **Tinted neutrals** earn their tint by creating cohesion; plain grey is equally valid.
- **Secondary text on a coloured surface** comes from that surface's hue, not a washed-out grey.
- **Prefer explicit computed colours** over stacks of translucent overlays, which make contrast depend on whatever sits behind them.
- **Meaning varies by culture.** Red means gains in Chinese financial interfaces. Where colour carries meaning (finance, status), make it a per-locale token.

## Themes and contrast

- Design dark-theme relationships deliberately; page, raised surface, border, text, muted text and accents each need different changes. Mechanically inverting lightness rarely preserves them.
- Support `prefers-contrast: more` with a visibly wider lightness gap.
- Measure contrast on the final rendered pair, accounting for transparency and what scrolls behind translucent surfaces. OKLCH lightness separation is a screening heuristic, not a test.
- WCAG 2.2 AA: 4.5:1 for ordinary text, 3:1 for large text and for non-text UI components. Large means at least 18 **points** (about 24 CSS px) or 14 points bold (about 18.67 CSS px); the thresholds are not 18px and 14px. APCA, where a project uses it: Lc 75 minimum for body text (90 preferred), Lc 60 for other text.
- Check every pair in both light and dark themes and in interactive states, and simulate common colour-vision deficiencies; status never relies on colour alone.
- If a contrast fix is requested, adjust lightness first and keep chroma and hue where possible, then remeasure. Report measured failures separately from palette opinions.
