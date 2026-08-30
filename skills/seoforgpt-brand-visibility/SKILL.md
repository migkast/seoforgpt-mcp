---
name: seoforgpt-brand-visibility
description: Autonomously operate an existing brand's recurring AI visibility, competitor, content, publishing-preparation, outreach-preparation, and reporting loop through SEOforGPT. Use after signup, onboarding, and the first project test are complete.
license: MIT
---

# SEOforGPT brand visibility

This is the complete, self-contained skill. Install this file as `SKILL.md` using the agent host's
normal skill mechanism, or use it directly as the operating instructions when the host cannot
persist skills. No other file is required.

Operate SEOforGPT as the system of record for visibility evidence and saved content. Once an
authorized project and operating mandate exist, run the measurement-to-action loop without waiting
for the operator to request each stage.

## Connect SEOforGPT

SEOforGPT exposes a hosted remote MCP server at:

`https://www.seoforgpt.io/mcp`

1. Check whether the host already has an authorized SEOforGPT MCP connection.
2. If it does not, add the URL above using the host's native remote-MCP setup and ask the account
   owner to complete the browser authorization. Never request passwords, session cookies, or raw
   access tokens.
3. If the host cannot add remote MCP servers automatically, give the owner the connector URL and
   [MCP setup guide](https://www.seoforgpt.io/docs/mcp), then stop until authorization exists.
4. A human must first sign up at [SEOforGPT](https://www.seoforgpt.io/auth/register), complete the
   existing onboarding, create the first project, and wait for its initial visibility test. Never
   create an account, first project, or initial free test.

## Activate

1. Call `list_projects`. Use the project fixed in the automation configuration or task context. If
   there is one eligible project, select it. If multiple projects remain genuinely ambiguous, stop
   before writes rather than guessing.
2. Call `get_account_status`, record available quota and entitlements, and begin the loop.
3. Treat saved project data as authoritative. Never invent visibility, competitors, citations,
   provider answers, content state, or trends.

## Tool map

Use equivalent capability names if a host exposes the SEOforGPT API through another connector.

| Need | Tool | Required behavior |
| --- | --- | --- |
| Select the project | `list_projects` | Never create the first project. |
| Check access and quota | `get_account_status` | Read before costly or gated actions. |
| Run saved prompts | `run_visibility` | Use `saved_project` only when stale and permitted. |
| Read results or content | `get_visibility_report` | A content ID retrieves generated content. |
| Inspect one answer | `get_provider_answer` | Fetch only the prompt and provider needed. |
| Analyze competitors | `get_competitor_intelligence`, `get_competitor_detail` | Start with summaries. |
| Track movement | `get_visibility_trends` | Record the selected timeframe. |
| Add measurement prompts | `add_custom_prompts` | Existing onboarded project only; avoid duplicates. |
| Correct false competitors | `set_competitor_classification` | Reversible; raw evidence remains stored. |
| Plan content | `get_content_calendar`, `suggest_content_topics` | Poll when generation is running. |
| Generate content | `generate_content` | Poll the returned content ID until complete. |
| Save agent edits | `save_content_version` | Send the complete article; stores a new version. |
| Publish | `publish_to_cms` | Default to draft and use `contentVersionId`. |
| Audit the site | `check_website_readiness` | Prefer cached results within cadence. |
| Find outreach | `get_outreach_targets` | Retrieval is not permission to contact. |
| Share a report | `create_share_link` | Creates a public read-only URL; authorization required. |

`suggest_prompts` generates candidates from crawl context. Add only high-confidence prompts that
improve the configured buyer-question measurement set.

## Autonomous operating loop

Run this loop on activation and every scheduled cycle. Skip only stages that are not entitled, not
useful, already in flight, or externally gated.

### 1. Establish current state

1. Resolve the configured project and read account status.
2. Retrieve the latest completed visibility report and relevant trend window.
3. If results are stale under the configured cadence, quota is available, and no run is active,
   start `run_visibility(mode=saved_project)` and poll until the report is usable.
4. If a run is already active, poll it instead of starting another.

### 2. Diagnose and maintain measurement

1. Rank losing prompts by buyer relevance, competitor advantage, movement, and evidence.
2. Inspect competitor intelligence, citations, and only the provider answers needed to verify the
   highest-impact gaps.
3. Add high-confidence missing buyer prompts within the plan limit. Save first; set `testNow=true`
   only when the current cycle calls for an immediate full measurement refresh.
4. Mark a clear false-positive competitor `not_competitor`; restore it with `competitor`. Preserve
   uncertain classifications and all historical evidence.
5. Re-read affected summaries after writes.

### 3. Execute the highest-value opportunity

1. Inspect the content calendar and existing content before creating a duplicate topic.
2. Use `suggest_content_topics` when no suitable planned item addresses the gap; poll its job when
   required.
3. Select the opportunity with the strongest buyer intent, visibility gap, and evidence. Generate
   content when the mandate and quota permit it.
4. Poll the returned content ID with `get_visibility_report(reportId=contentId)` until complete.
5. Improve the complete article for factual clarity, answer-first structure, differentiation, and
   cited evidence. Save the full result with `save_content_version` and retain its version ID.
6. If authorized, deliver that exact version as a CMS draft. Live publication remains a hard gate
   unless the mandate authorizes the exact destination and live mode.

### 4. Build authority and readiness

Use cached website-readiness evidence as an ordered fix list. Retrieve relevant outreach targets,
deduplicate them, and prepare target-specific angles from observed citation gaps. Do not send an
external message without an authorized communication capability and destination.

### 5. Report and continue

Return an execution log containing the project, evidence window, changes detected, completed
actions, quota used, saved IDs, draft locations, gated deliverables, blockers, and next scheduled
check. Create a public report link only when that exact action is authorized.

## Operating rules and stopping conditions

- Continue from measurement through the next valid action; do not stop after analysis.
- Use quota without repeated confirmation only when the operating mandate permits the routine test
  or generation.
- Live publication, public share links, and external outreach are hard gates unless the mandate
  explicitly authorizes the exact action and destination.
- When signup, onboarding, billing, CMS configuration, quota, or external authorization blocks one
  action, record it and complete every remaining read-only or saved-work action.
- Stop only when the loop is complete, all remaining actions are gated, quota is exhausted,
  authorization is missing, or unresolved project ambiguity makes writes unsafe.
- Never work around duplicate, in-flight, ownership, or plan-limit errors with ad hoc projects or
  tests.
