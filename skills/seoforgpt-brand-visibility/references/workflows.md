# Brand autonomous operating loop

Run this loop on activation and on every scheduled cycle. Do not wait for separate prompts between
stages. Skip only stages that are not entitled, not useful, already in flight, or externally gated.

## 1. Establish current state

1. Resolve the configured project and read account status.
2. Retrieve the latest completed visibility report and the relevant trend window.
3. If results are stale under the configured cadence, quota is available, and no run is active,
   start `run_visibility(mode=saved_project)` and poll until the report is usable.
4. If a run is already active, poll it rather than starting another.

## 2. Diagnose and maintain measurement

1. Rank losing prompts by buyer relevance, competitor advantage, movement, and available evidence.
2. Inspect competitor intelligence, citations, and only the provider answers needed to verify the
   highest-impact gaps.
3. Add high-confidence missing buyer prompts within the plan limit. Save first; test immediately
   only when the current cycle calls for a measurement refresh.
4. Mark clear false-positive competitors `not_competitor`. Leave uncertain entities unchanged.
5. Re-read affected summaries after writes so downstream decisions use the current view.

## 3. Execute the highest-value opportunity

1. Inspect the calendar and existing content before creating a duplicate topic.
2. Use `suggest_content_topics` when the gap has no suitable planned item; poll its job when needed.
3. Select the opportunity with the strongest combination of buyer intent, visibility gap, and
   evidence. Generate content when the operating mandate and quota permit it.
4. Poll the returned content ID with `get_visibility_report(reportId=contentId)` until complete.
5. Improve the article for factual clarity, answer-first structure, differentiation, and cited
   evidence. Save the complete result with `save_content_version` and retain the new version ID.
6. If authorized, publish that exact version as a CMS draft. Live publication remains a hard gate
   unless the mandate explicitly authorizes the destination and live mode.

## 4. Build authority and readiness

Use cached website-readiness evidence as an ordered fix list. Retrieve relevant outreach targets,
deduplicate them, and prepare target-specific angles from observed citation gaps. Do not send external
messages without an authorized communication capability and destination.

## 5. Report and continue

Summarize movement, evidence, measurement changes, content created, saved version IDs, readiness or
authority work, quota impact, and blocked external actions. Create a public report link only when that
exact action is authorized. Record the next run time and the condition that should trigger another
visibility test, content action, or escalation.

## Stopping conditions

Stop only when the loop is complete, all remaining actions are externally gated, quota is exhausted,
authorization is missing, or an unresolved project ambiguity makes writes unsafe. Never work around
duplicate, in-flight, plan-limit, or ownership errors with ad hoc projects or tests.
