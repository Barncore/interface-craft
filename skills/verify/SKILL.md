---
name: verify
description: Render and review a visible artifact with three blind reviewers. Use before delivering UI work, after substantial styled changes, or when asked to check, review, audit, QA or critique a design.
---

# Verify

Judge the pixels, then let reviewers who didn't build the work judge it too. A review that reads CSS infers what something looks like; one that reads a screenshot observes it. And a reviewer that watched the work being built will agree with it, which is why the three reviewers run in their own contexts, blind to each other and to the reasoning that produced the artifact.

## Scale the review to the change

- **Full review:** substantial new work, a new direction, a page or screen about to be delivered, or whenever the user asks. Three reviewer agents. Tell the user you are dispatching three agents before you do.
- **Inline check:** a small scoped change inside an established design. Render it, look at it yourself, and run [accessibility-gates.md](references/accessibility-gates.md) against the diff. No agents.

Review the diff, not the codebase, unless the user asks for a full audit; then say plainly that it will be slow.

## 1. Render and capture

Render the artifact and capture it at the viewports and states that matter, following [render-and-capture.md](references/render-and-capture.md): at least 390px and 1440px wide, plus hover, focus, empty, loading, error and any theme variants, with the console read for errors.

If nothing can render it, say so, review from source, and mark every finding `source-only`. Craft judgments from source are inference, and they never feed taste promotion.

## 2. Three reviewers, in parallel

Dispatch all three in one message so they run concurrently. Give each the absolute paths it needs; agents don't inherit your context.

| Agent | Answers | Give it | Withhold |
| --- | --- | --- | --- |
| `lint-reviewer` | Does it contain known generated-UI patterns? | Changed files, any rendered URL, `DESIGN.md` (its lint exceptions), the path to [detector.md](references/detector.md); for a native app, also the screenshots and the path to [native-checks.md](references/native-checks.md) | The brief, taste, everything else |
| `correctness-reviewer` | Does it meet interface and accessibility standards? | Screenshots, changed files, the brief's hard constraints, paths to [accessibility-gates.md](references/accessibility-gates.md), [interface-checklist.md](references/interface-checklist.md) and [gate-policy.md](references/gate-policy.md) | Taste |
| `craft-reviewer` | Does it feel arrived at, and does it serve this brief? | Screenshots, `DESIGN-BRIEF.md`, `DESIGN.md`, the paths to [the creative philosophy](../route/references/creative-philosophy.md) and [critique-rubric.md](references/critique-rubric.md), and the applicable taste slice labelled as contextual evidence | Detector output and the other reviewers' findings |

Lint and correctness stay away from taste because their value is objectivity; taste context makes them argue instead of check. The craft reviewer never sees detector output, because a deterministic finding anchors judgment even when it is right.

## 3. Consolidate

Merge the three reports using [gate-policy.md](references/gate-policy.md). The same defect found twice is one finding, at the higher severity. A defect that recurs across many places is one systemic finding with a count. Order by severity, then lint before correctness before craft, cheapest to resolve first.

Open the report with the method (for example, "rendered at 390 and 1440, three reviewers") and the verdict, which follows from the findings: `Block` if a hard gate failed, `Needs review` if gates pass but material warnings remain, `Approve` otherwise. A degraded run (no render, or fewer than three reviewers) opens with a `DEGRADED` line and the reason. For each finding give: location (`file:line` or the screenshot region), what's wrong, why it matters, and the fix. For a motion finding, the fix follows the order in the Check section of [motion-mechanics.md](../build/references/motion-mechanics.md): deleting the animation comes before tuning it. No preamble, no praise paragraph.

Craft findings are arguments for the user to adjudicate; never apply them on your own. Confirmed lint and correctness defects can be fixed directly when you are verifying your own build. When the user asked only for a review, report and change nothing.

## 4. Record

- Append each finding and its outcome to `.interface-craft/reviews.jsonl`, one JSON object per line: `{"ts","track","severity","location","summary","status"}` with status `open`, `fixed` or `dismissed`.
- Write open blocking findings to `.interface-craft/findings.json` as `{"blocking":[{"id","file","summary","status":"open"}]}`, so the Stop hook can hold the turn while they are unresolved. Mark them `fixed` or `dismissed` as they resolve.
- When the user dismisses a finding, record that through `feedback` with their reason. A dismissal is their evidence; the finding itself is not. A rule they keep dismissing is a rule that is wrong for them, and may belong in `DESIGN.md`'s lint exceptions.

## Re-verify after fixes

Fix in one batch, then confirm once. Re-run the specific reproductions behind the fixed findings yourself. Send the areas the fixes touched to a fresh reviewer who hasn't seen the first findings, to catch what the fixes broke; a reviewer holding the old findings can only check whether they were fixed. A claimed fix that doesn't show in re-captured evidence is unresolved. Then stop polishing.
