# Gate policy

Three kinds of finding, kept apart. Mixing them is how a taste opinion gets dressed up as a defect, or a real defect gets waved through as taste.

## Hard gates

A hard gate fails only on a demonstrated violation:

- an inaccessible name, keyboard trap, unreachable control, invisible focus, or unusable contrast
- an unsafe or destructive action without confirmation or recovery
- a broken required flow, invalid output format, missing required content, or a build or runtime error
- clipping or overlap that hides required content or a control at a supported viewport
- motion that ignores a required reduced-motion alternative or creates a real usability problem
- semantic deception: false system state, or feedback that contradicts the result

Severity: **critical** (safety, irreversible loss, or a broadly unusable primary flow), **high** (blocks a primary task or a required accessibility path), **medium** (materially impairs a secondary path or a common state), **low** (an objective defect with narrow impact). Between two levels, ask whether a user would contact support about it; if yes, take the higher.

A detector finding that suggests a hard-gate failure is a candidate until a reviewer confirms it in the source or the running page.

## Warnings

Likely problems that need context: inconsistent tokens, nested cards, unclear hierarchy, weak empty states, excessive animation, arbitrary ornament, copy friction, a maintainability hazard. Rank them; they block only if they expose a gate.

## Critique

Subjective interpretation: visual identity, emotional register, originality, an intentional glow or gradient or asymmetry, density, balance, taste fit. Critique goes to the user to adjudicate.

## Evidence

Every finding names the check, the observed evidence, its location, its impact and a proposed fix. A runtime claim that wasn't exercised is marked unverified. A degraded run says so at the top.

## Verdict

Derive it from the findings, never from a feeling: `Block` if any hard gate failed; `Needs review` if gates pass but material warnings remain; `Approve` only when gates pass and nothing actionable remains.
