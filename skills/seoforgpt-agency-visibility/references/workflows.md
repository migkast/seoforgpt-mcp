# Agency autonomous operating loop

Run portfolio triage and then execute each eligible workspace. Do not wait for per-client prompts.
Keep project identity attached to all state and revalidate it before every write.

## 1. Build the portfolio queue

1. List client and pitch workspaces.
2. Read compact status for each eligible workspace without mixing detailed evidence.
3. Rank by missing or stale visibility data, negative movement, unresolved competitor gaps, content
   opportunity, delivery deadlines, and quota risk.
4. Continue through the queue in priority order. A blocked client must not stop other clients.

## 2. Run one client cycle

1. Fix the project ID in working state and call `get_account_status(projectId)`.
2. Read the latest report, trends, client brief, competitor intelligence, and relevant citations.
3. If results are stale under the configured cadence, quota is available, and no test is active,
   run the saved-project measurement and poll it. Otherwise use the latest completed evidence.
4. Maintain high-confidence client prompts and clear false-positive competitor classifications.
5. Re-read affected summaries, then choose the highest-value valid action.

## 3. Execute delivery

For active clients, inspect the calendar and existing content, generate missing topic suggestions when
needed, choose the strongest evidence-backed opportunity, generate the article when authorized, poll
completion, improve the full draft, and save it with `save_content_version`. Keep every content and
version ID with the current project ID. If configured, deliver the exact version as a CMS draft. Live
publication requires explicit authorization for that client and destination.

For pitch workspaces, produce an audit and commercial narrative from the actions the entitlement
allows. Do not imitate active-client generation or publishing through another workspace.

## 4. Prepare authority and reporting

Retrieve and deduplicate outreach targets inside the current client only. Prepare evidence-backed
angles, but do not send without an authorized communication capability and destination. Produce the
client report from the same project's brief, trends, competitor evidence, completed work, and next
cycle. Create a public link only when authorized branding, expiry, client, and disclosure policy are
already configured.

## 5. Close the client and continue

Write a client action log before moving to the next project: evidence window, mutations, quota used,
content/report IDs, draft location, gated actions, blockers, and next run. Cross-client summaries may
contain operational fields such as client name, status, trend, priority, quota risk, completed action,
and next check; keep raw evidence and private URLs in client-specific sections.

## Stopping conditions

Stop the portfolio run only after all eligible workspaces are processed, authorization is missing for
the entire agency, or every remaining action is externally gated. Never guess a project ID or move
content, versions, prompts, contacts, or quota assumptions between clients.
