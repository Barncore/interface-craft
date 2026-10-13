# Native pattern checks

For iOS and Android apps, whether built in SwiftUI, UIKit, Jetpack Compose, React Native, Expo or Flutter. The bundled engine reads web pages only, so on a native project these checks replace it and the web pattern checks in [detector.md](detector.md). Like those, they report presence. Whether a present pattern is wrong for this app is someone else's call, and a **Lint exception** in `DESIGN.md` makes any of them right.

These are the habits generated mobile apps share: web conventions carried onto a phone, and one platform dressed in the other's idiom. Several resemble a web check (cards, emoji icons, flat spacing), but the native fix differs, so this list stands on its own. One runs the other way: on the web, a system font as a page's display voice is the tell; on a phone, system type carries Dynamic Type, every weight and the platform's feel, so replacing it wholesale is the tell.

## The signs

| Rule id | What's present | Native instead | Disposition |
| --- | --- | --- | --- |
| `web-modal` | A custom centred dialog for picking or composing that ignores the keyboard and the platform's dismissal | The platform sheet or an anchored menu; a system alert only for consequential confirmations | warning |
| `x-button-sheet` | A sheet that closes only from an "X" in a corner, with no grabber and no swipe to dismiss | A native sheet with detents and drag to dismiss; Cancel and Done where the platform puts them | warning |
| `emoji-icons` | Emoji as tab icons, buttons or empty-state art | SF Symbols on iOS, Material Symbols on Android: one icon family per platform | critique |
| `gradient-hero` | A decorative gradient intro that pushes the screen's task below the fold | The screen's content under a navigation title; a hero only where the brief asks for one | critique |
| `floating-pill-tab-bar` | A custom rounded, inset, shadowed tab bar hovering above the home indicator | The platform tab bar, with its system placement, material and behaviour | critique |
| `font-replaces-system` | A downloaded font replacing system type throughout, without the weights or Dynamic Type scaling to carry it | System type (SF, Roboto) by default; brand type where the brief asks, checked for weights and scaling | critique |
| `everything-card` | Every row and section in its own rounded, shadowed card; cards inside cards | Grouped lists (iOS inset-grouped, Material list sections), grouped by background and hairlines | critique |
| `shadowboxing` | Heavy soft shadows (opacity 0.15 or more, radius 10 or more) doing hierarchy's job on white-on-white surfaces | Two or three elevation levels from tokens, with hierarchy from the type ramp and grouping. iOS uses little shadow | critique |
| `wireframe-borders` | A 1px grey border round every container, often Tailwind's `#E5E7EB` | Spacing and surface contrast; hairlines only as list separators, in the platform's separator colour | critique |
| `alert-confirmation` | Alerts that interrupt routine undoable actions, announce success, or replace inline field errors | A system alert only for rare irreversible actions; undo for routine ones; field errors inline; success shown in the UI | warning |
| `hand-rolled-header` | The navigation bar hidden and rebuilt as a text title and custom back button, losing large-title collapse, back-swipe and scroll-to-top | The stack's own header, configured rather than rebuilt | warning |
| `uniform-spacing` | The same 16pt padding at every level, so section gaps equal row gaps and proximity means nothing | A spacing scale with distinct steps: row gap, then group gap, then section gap | critique |
| `press-scale-everywhere` | One shrink-on-press on every tappable, full-width rows included, or React Native's `TouchableOpacity` fade | Feedback by role: rows highlight their background, buttons scale slightly or dim (see [native-platforms.md](../../build/references/native-platforms.md)) | warning |
| `grand-entrance` | Staggered fade-ins on every list and screen, replaying on every visit | Entrances only for rare or first-time moments; routine screens just appear | critique |
| `onboarding-carousel` | Promotional slides before the first useful screen that collect nothing and teach nothing the user needs | Useful content first, with guidance in context; onboarding only for required setup | critique |
| `platform-costume` | One platform in the other's idiom: a floating action button or ripple in an iOS app; back chevrons, large titles or iOS switches on Android | Each platform's own idiom, or a deliberate cross-platform treatment recorded in `DESIGN.md` | warning |
| `safe-area-collision` | Content under the notch, Dynamic Island or home indicator, or patched with a fixed top margin | Headers and tab bars handle insets; elsewhere, the platform's safe-area insets | candidate hard gate |
| `dark-mode-break` | Hard-coded white, black or grey values that break when the system theme flips | Semantic system colours through the theme; brand colours as declared light and dark pairs | candidate hard gate |
| `false-empty` | A full-screen spinner between every state, or "No items yet" flashing while the first load resolves | Loading, empty, error and content as separate states; stale content kept while refreshing; skeletons when the layout is known | candidate hard gate |
| `keyboard-hides-input` | The focused field or its submit button disappearing behind the keyboard, or a button above the keyboard needing two taps | The real keyboard frame tracked, so the field and its action stay visible and taps reach controls while the keyboard is open | candidate hard gate |

A candidate hard gate becomes a hard-gate failure only once a screenshot or the running app confirms it, under the terms in [gate-policy.md](gate-policy.md): hidden content, unusable contrast, false system state, or a blocked primary task.

## How to check

Some signs live in the code, some only show on a screen, and some only show in use. Check each where it can be seen.

**In the files, React Native and Expo only.** Search the changed files with the Grep tool, glob `*.{tsx,jsx,ts,js}`. A hit is a candidate to read in context, never a finding by itself: import lines and legitimate uses match too.

- `Touchable(Opacity|Highlight|WithoutFeedback)` → `press-scale-everywhere`
- `<Modal\b` → `web-modal`
- `Alert\.alert` → `alert-confirmation`
- `LinearGradient|experimental_backgroundImage` → `gradient-hero`
- `headerShown:\s*false` → `hand-rolled-header`
- `tabBarStyle` → `floating-pill-tab-bar`
- `fontFamily:`, excluding the project's theme files → `font-replaces-system`
- `['"]#(fff|ffffff|000|000000)['"]`, case-insensitive, excluding the theme files → `dark-mode-break`
- `shadowOpacity|shadowRadius|elevation:` → `shadowboxing`; read the values
- `borderWidth:\s*1\b` → `wireframe-borders`
- `entering=\{\w+\.delay\(` → `grand-entrance`
- `[\p{Emoji_Presentation}\x{FE0F}]` → `emoji-icons`; emoji in content is fine, emoji standing in for an icon is the sign

SwiftUI, UIKit, Compose and Flutter have no file patterns here yet; rely on the two checks below.

**On a screenshot:** `x-button-sheet`, `everything-card`, `wireframe-borders`, `uniform-spacing`, `gradient-hero`, `floating-pill-tab-bar`, `onboarding-carousel`, `safe-area-collision`, and `platform-costume` on each platform the app ships on.

**In the running app:** `grand-entrance` (leave a screen and return), `false-empty` (watch the first load and a refresh), `keyboard-hides-input` (focus each field with the keyboard open), `press-scale-everywhere` (press a row and a button). When nothing runs the app, report these as unchecked rather than clean.

Report each finding with its rule id and disposition, in the lint report format. New signs join this list under the rule in [detector.md](detector.md#adding-a-pattern).
