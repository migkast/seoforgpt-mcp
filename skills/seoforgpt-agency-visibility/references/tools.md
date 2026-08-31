# Agency tool guide

| Need | Tool | Agency rule |
| --- | --- | --- |
| Build portfolio queue | `list_client_workspaces` | Fix one stable project ID in working state before writes. |
| Check entitlement/quota | `get_account_status` | Call per selected project. |
| Build client brief | `get_client_brief` | Use for compact account reviews. |
| Analyze visibility | `get_visibility_report`, `get_visibility_trends` | Keep timeframe consistent. |
| Inspect competitors | `get_competitor_intelligence`, `get_competitor_detail`, `get_provider_answer` | Pull raw answers only when necessary. |
| Add client prompts | `add_custom_prompts` | Onboarded project only; save before testing. |
| Correct classification | `set_competitor_classification` | Reversible and project-scoped. |
| Plan production | `get_content_calendar`, `suggest_content_topics` | Work within returned readiness and quota. |
| Produce content | `generate_content` | Keep the returned content ID with the client record. |
| Save edited version | `save_content_version` | Complete blog text in; new version ID out; no model call. |
| Publish | `publish_to_cms` | Default draft; pass `contentVersionId` for saved agent edits. |
| Prepare outreach | `get_outreach_targets` | Retrieval is not authorization to contact. |
| Deliver reporting | `create_share_link` | Use only when branding, expiry, client, and public-link authority are configured. |
| Audit site | `check_website_readiness` | Refresh only when the operating cadence requires it. |

Use `list_projects` only when a non-agency project lookup is genuinely needed. Do not search for tools to create, activate, bill, or connect a client workspace; those remain web-app operations.
