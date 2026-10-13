# Worst-case data

For checking a list, card, table, profile or any component that shows user data against the data it will really get. It holds for websites and native apps alike: the data is the same, and only the environment checks and the fixes differ, so those are split by platform below.

Demo data is chosen, usually without anyone deciding to, to make the design look good: names that fit on one line, counts that never need a separator, every optional field filled. The job is to undo that choice one field at a time.

## Method

- **Plausible or schema-backed values.** Each value is something a real user could produce, or the actual limit from the validation schema, database column or API contract. `aaaaaaaa` and 5,000-character names prove nothing, and the designer rightly dismisses them as "that never happens". No limit anywhere is a finding in itself: say the field is unbounded and test something long but believable. A 50-character input that saves to a 255-character column will meet a longer value eventually, through an import or the API.
- **Change the data, not the component.** The worst case enters where the demo data does: the fixture, the mock, the props, the API stub. Editing markup or styles to force a break tests the edit, not the component.
- **Spread the failures.** The first rows of a list are what's on screen, so give each a different failure rather than stacking them all into row 1.
- **Go past long text.** Long names are the obvious break. What ships broken is the short name that leaves an orphaned separator, the missing avatar, the count of exactly one ("1 members"), the empty list, the badge whose text got translated.
- **Keep the fixture** next to the demo data, shaped exactly like it, unless the user says otherwise. It's the regression test for the next change to the component.

## Values that break the most

| Value | What it breaks |
| --- | --- |
| An emoji-first name (`🦊 Fox`) | Initials taken with `.charAt(0)` return half a surrogate pair |
| A CJK name with no spaces (`王秀英`) | First-and-last-word initials find one word, and the text breaks anywhere |
| "Jo", or a name ending "Montgomery III" | Initials logic that assumes two words gives "J" or "CI" |
| An email or URL on a long shared domain | Runs past the edge, and end truncation makes every row look identical |
| Translated UI copy (`Paramètres de confidentialité et de sécurité`) | Copy runs about 30% longer in translation, so buttons and badges overflow |
| Exactly one item; exactly a page; a page plus one | "1 members", "Showing 40 of 40", an empty page 2 |
| 12 days, 11 months and 3 years ago | Relative-time thresholds; switch to an absolute date after about a week |
| Some optional fields filled and others not, in one list | Misaligned rows and orphaned placeholders |
| The current user in the list | A missing "You" label, and actions that shouldn't apply to yourself |
| A touch device | Hover-only actions (the ••• that appears on hover) are unreachable |

Also run the categories in the Harden matrix ([transformations.md](../../build/references/transformations.md)): empty, many, special characters, right-to-left text, slow and failed networks.

## Environment

- **Web:** browser zoom at 200%, a narrow container as well as a narrow viewport, and a raised default font size.
- **Native:** the largest accessibility text size (Dynamic Type on iOS, font scale on Android), and the platform's right-to-left layout direction.

## Fixes

**Any platform:**

- Decide wrap, truncate or clamp field by field, using the rule in [type-mechanics.md](../../build/references/type-mechanics.md).
- Take initials from grapheme clusters (`Intl.Segmenter` on the web), first and last word, with a fallback icon.
- When an optional field is missing, omit its line or reserve its height on purpose; never render a placeholder dash.

**Web layout:**

- `flex-shrink: 0` on avatars, icons, badges, trailing actions and any fixed-size box, so long text can't squash them.
- `min-width: 0` on the text column (`minmax(0, 1fr)` in grid), so text truncates or wraps instead of overflowing.
- Top-align a row (`align-items: flex-start`) once its text can wrap; a centred avatar beside a three-line name looks adrift.
- A fixed-height container that cuts the last row mid-glyph needs a visible scrollbar or a fade mask.
