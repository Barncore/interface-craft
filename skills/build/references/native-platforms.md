# Native platforms

For native or platform-adaptive iOS, iPadOS and Android apps. Start from the platform and the user's activity rather than transplanting a web layout. Native controls are a baseline, not an instruction to make every app look the same: the product's identity lives in composition, content and visual language. Platform guidance changes, so check the current official docs when an API or convention affects the build.

## iOS and iPadOS

Sources: [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/), especially [layout](https://developer.apple.com/design/human-interface-guidelines/layout) and [typography](https://developer.apple.com/design/human-interface-guidelines/typography).

- Respect safe areas and system gestures.
- Navigating through a hierarchy is different from a temporary task in a sheet. Not every task belongs in a modal stack.
- Preserve position and entered data when dismissing, returning or resizing.
- Design text growth with Dynamic Type and inspect the large accessibility sizes. A compact control row may need to become a vertical flow; keep the hierarchy rather than shrinking text.
- Check VoiceOver order, names, actions and focus after transitions. Pair haptic or sound feedback with a visible state.
- On iPad, plan for changing window sizes, multiple columns, pointer and keyboard. A larger screen is room for simultaneous context, not a magnified phone.
- Custom motion and materials keep clear boundaries, readable contrast, and reduced-motion and reduced-transparency alternatives.

## Android and adaptive windows

Sources: [layout basics](https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-basics), [adaptive apps](https://developer.android.com/develop/ui/compose/layouts/adaptive/get-started-with-adaptive-apps).

- Lay out from the available window, not a phone-or-tablet label: resizing, rotation, folds, insets and the keyboard all change it. A list-detail or supporting-pane arrangement often keeps context better than one stretched column, and selection and entered data survive the change.
- Use the system Back model consistently, including transient surfaces.
- Keep visible focus for keyboard and alternative input; check TalkBack names, reading order and state announcements; give every gesture-only action an accessible path.
- Treat density, font scaling and touch reach as real layout conditions. A brand palette and motion language can coexist with platform components, so check contrast and semantic roles after customising.

## Touch, motion and haptics

For both platforms. These replace web habits that don't survive a touchscreen; the frequency gate and timing values in [motion-mechanics.md](motion-mechanics.md) still apply.

- Platform controls (switches, pickers, navigation bars, sheets) already carry the design language. Use them directly rather than wrapping them to route through the theme.
- Feedback on press-in, commit on press-out. Waiting for the release before showing anything is the latency people feel.
- Feedback by role. Buttons scale slightly (around 0.97, in 100 to 150ms) or dim; full-width rows highlight their background instead, because a scaling row reads as the whole screen squishing. A ripple belongs in a Material-styled app; a custom-designed app is more coherent with one press treatment on both platforms.
- Touch targets of at least 44×44pt on iOS and 48×48dp on Android. Extend the hit area rather than growing the visual, and let a press survive a finger drifting a few points.
- Tabs are peers, so switching tabs never slides: sliding implies a depth that isn't there, and people pay for it dozens of times a session.
- A haptic fires in the same frame as the visual it confirms, at most once per user action, and never as the only feedback, since many people switch haptics off. Match it to the moment: a selection tick as a value passes a step (picker, slider detent, segmented control); a light impact when something snaps home or a drag commits; a medium impact for a heavy landing or a destructive action; a success or error notification for an operation's outcome. Nothing on scroll, and nothing on an entrance the user didn't cause.
- Text scales, so a height measured at the default size is wrong at 200%. Measure at layout time or animate a transform; never animate to a hard-coded height.
- Motion runs on the UI thread. In React Native that means Reanimated and Gesture Handler rather than core `Animated` or `PanResponder`, and the native stack's screen transitions rather than ones rebuilt in JavaScript. Judge feel on a release build on the slowest supported device; a simulator, Expo Go and a fast phone all flatter it.

## Reviewing native work

The bundled web detector and `live-edit` don't apply to native projects. The lint reviewer uses [native-checks.md](../../verify/references/native-checks.md) instead; read it while building, too, since its twenty signs are the habits generated mobile apps fall into.
