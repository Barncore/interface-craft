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

The bundled web detector and `live-edit` don't apply to native projects.
