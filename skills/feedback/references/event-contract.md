# Event contract

One JSON object per explicit reaction. `append-event.mjs` rejects unknown fields and bad values, adds `eventId`, `timestamp` and `schemaVersion` when missing, and refuses a duplicate id.

## Required

| Field | Value |
| --- | --- |
| `projectId` | A stable project name, for example `tool-library` |
| `artifactId` | The file, route, screen or experiment, for example `home-screen` |
| `eventType` | `selection`, `rejection`, `rating`, `reaction`, `dismissal` or `correction` |
| `decision` | One factual sentence: what the user chose, rejected or said |
| `scope` | `artifact`, `project`, `domain`, `global` or `unknown`. Default to `project`. |
| `confidence` | 0 to 1: confidence in your transcription and scope, not in the strength of the taste |
| `evidence` | The user's words, verbatim where possible |
| `provenance` | `{"source": "user" \| "imported-user-record" \| "correction", "captureMode": "verbatim" \| "paraphrase" \| "structured-selection", "sourceRef": "optional pointer"}` |

## Optional

| Field | Use |
| --- | --- |
| `domain` | A cross-project domain such as `product-ui`, `editorial`, `immersive-site`, `document` |
| `axis`, `selected`, `rejected`, `invariants` | For choices from an exploration: the axis varied, the option chosen, the options turned down, and what was held constant |
| `signal` | `{"key", "value", "polarity": "support" \| "contradict"}`. The promotable claim, such as `{"key": "home-screen", "value": "show what is out in use rather than what is available", "polarity": "support"}`. Only events with a signal can feed taste proposals. |
| `tags` | Free labels |
| `correctsEventId` | Required for a `correction`: the id of the event it supersedes, in the same project |

## Example

```json
{
  "projectId": "tool-library",
  "artifactId": "home-screen",
  "domain": "product-ui",
  "eventType": "selection",
  "decision": "Took the departures-board reading for the home screen over the street map, keeping the map for search.",
  "scope": "project",
  "confidence": 0.9,
  "evidence": "The board is the one. Keep the map for finding stuff though.",
  "provenance": {"source": "user", "captureMode": "verbatim"},
  "axis": "home screen reading",
  "selected": "departures board",
  "rejected": ["street map as home"],
  "invariants": ["the borrow flow", "the tool data"],
  "signal": {"key": "home-screen", "value": "show what is out in use rather than what is available", "polarity": "support"}
}
```
