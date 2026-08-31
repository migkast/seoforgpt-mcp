---
name: seoforgpt-agency-visibility
description: Autonomously operate recurring AI visibility, content, outreach-preparation, and reporting across existing SEOforGPT agency client workspaces. Use after humans create and onboard the workspaces.
license: MIT
---

# SEOforGPT agency visibility

This is the complete, self-contained skill. Install this file as `SKILL.md` using the agent host's
normal skill mechanism, or use it directly as the operating instructions when the host cannot
persist skills. No other file is required.

Run the agency portfolio as a recurring GEO delivery system. Once authorized workspaces and an
operating mandate exist, prioritize the portfolio and execute each eligible client's loop without
waiting for the operator to direct every account or stage.

## Connect SEOforGPT

SEOforGPT exposes a hosted remote MCP server at:

`https://www.seoforgpt.io/mcp`

1. Check whether the host already has an authorized SEOforGPT MCP connection.
2. If it does not, add the URL above using the host's native remote-MCP setup and ask the account
   owner to complete the browser authorization. Never request passwords, session cookies, or raw
   access tokens.
3. If the host cannot add remote MCP servers automatically, give the owner the connector URL and
   [MCP setup guide](https://www.seoforgpt.io/docs/mcp), then stop until authorization exists.
4. A human must create the agency account and onboard each client workspace in SEOforGPT. Never
   create, activate, bill, or onboard a workspace, and never trigger the initial free test.

## Activate

1. Call `list_client_workspaces` and build a portfolio queue from stable project IDs, workspace
   type, status, freshness, and quota. Do not ask which client to inspect when the configured
   portfolio already defines the scope.
2. Process one stable project ID at a time. Call `get_account_status(projectId)` before gated work.
3. Keep all raw answers, prompts, competitors, content IDs, contacts, writes, and deliverables scoped
   to that project. Never reuse identifiers across clients.

## Tool map

Use equivalent capability names if a host exposes the SEOforGPT API through another connector.

| Need | Tool | Required agency behavior |
| --- | --- | --- |
| Build the portfolio | `list_client_workspaces` | Fix one project ID before writes. |
| Check entitlement and quota | `get_account_status` | Call for each selected project. |
| Build a client brief | `get_client_brief` | Use for compact account reviews. |
| Analyze visibility | `get_visibility_report`, `get_visibility_trends` | Keep the timeframe consistent. |
| Inspect competition | `get_competitor_intelligence`, `get_competitor_detail`, `get_provider_answer` | Pull raw answers only as needed. |
| Add client prompts | `add_custom_prompts` | Onboarded project only; avoid duplicates. |
| Correct classifications | `set_competitor_classification` | Reversible and project-scoped. |
| Plan production | `get_content_calendar`, `suggest_content_topics` | Respect readiness and quota. |
| Produce content | `generate_content` | Retain the content ID with the client. |
| Save edited content | `save_content_version` | Complete article in; new version ID out. |
| Publish | `publish_to_cms` | Default to draft; pass `contentVersionId`. |
| Prepare outreach | `get_outreach_targets` | Retrieval is not permission to contact. |
| Deliver reporting | `create_share_link` | Public link; authorization required. |
| Audit the site | `check_website_readiness` | Refresh only when cadence requires it. |

Use `list_projects` only when a non-agency project lookup is genuinely required. Do not search for
tools to create, activate, bill, or connect client workspaces; those remain web-app operations.

## Autonomous portfolio loop

Run portfolio triage and then execute every eligible workspace. Do not wait for per-client prompts.
Revalidate project identity before every write.

### 1. Build the portfolio queue

1. List client and pitch workspaces.
2. Read compact status for each eligible workspace without mixing detailed evidence.
3. Rank by missing or stale visibility data, negative movement, unresolved competitor gaps, content
   opportunity, delivery deadlines, and quota risk.
4. Continue through the queue in priority order. A blocked client must not stop other clients.

### 2. Run one client cycle

1. Fix the project ID in working state and call `get_account_status(projectId)`.
2. Read the latest report, trends, client brief, competitor intelligence, and relevant citations.
3. If results are stale under the configured cadence, quota is available, and no test is active,
   run the saved-project measurement and poll it. Otherwise use the latest completed evidence.
4. Add high-confidence client prompts within plan limits. Set `testNow=true` only when the cycle
   calls for an immediate full refresh.
5. Mark clear false-positive competitors `not_competitor`; restore them with `competitor`. Preserve
   uncertain classifications and historical evidence.
6. Re-read affected summaries, then choose the highest-value valid action.

### 3. Execute delivery

For an active client, inspect its calendar and existing content, generate missing topic suggestions
when needed, choose the strongest evidence-backed opportunity, generate the article when authorized,
poll completion, improve the full draft, and save it with `save_content_version`. Keep every content
and version ID with the current project ID. If configured, deliver the exact version as a CMS draft.
Live publication requires explicit authorization for that client and destination.

For a pitch workspace, produce an audit and commercial narrative only from actions its entitlement
allows. Do not imitate active-client generation or publishing through another workspace.

### 4. Prepare authority and reporting

Retrieve and deduplicate outreach targets inside the current client only. Prepare evidence-backed
angles, but do not send without an authorized communication capability and destination. Produce the
client report from the same project's brief, trends, competitor evidence, completed work, and next
cycle. Create a public link only when branding, expiry, client, and disclosure rules are configured
and the exact public action is authorized.

### 5. Close the client and continue

Write a client action log before moving to the next project: evidence window, mutations, quota used,
content and report IDs, draft location, gated actions, blockers, and next run. A cross-client summary
may contain client name, status, trend, priority, quota risk, completed action, and next check. Keep
raw evidence and private URLs in client-specific sections.

## Operating rules and stopping conditions

- Rank the portfolio, then continue into client execution; do not stop at prioritization.
- Use the configured mandate for routine visibility tests, generation, and CMS drafts. Do not request
  the same permission every cycle.
- Apply pitch and active-client entitlements exactly as returned.
- Live CMS publication, public report links, and external outreach are hard gates unless the mandate
  authorizes the exact client, action, and destination.
- If one client is blocked, log it and continue with the next eligible workspace.
- Stop only after every eligible workspace is processed, authorization is missing for the entire
  agency, or all remaining actions are gated.
- Never guess a project ID or move content, versions, prompts, contacts, evidence, or quota
  assumptions between clients.

## Complete the run

Return a portfolio summary plus separate per-client action logs containing project identity,
evidence window, changes, completed actions, quota impact, saved IDs, gated deliverables, blockers,
and next scheduled check. Never expose one client's private evidence in another client's report.
