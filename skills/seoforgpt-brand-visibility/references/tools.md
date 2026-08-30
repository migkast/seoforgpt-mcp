# SEOforGPT tool guide

Use capability names when a host exposes equivalent names through REST or another connector.

| Need | Tool | Important behavior |
| --- | --- | --- |
| Select workspace | `list_projects` | Never create the first project. |
| Check plan/quota | `get_account_status` | Read before costly or gated actions. |
| Run saved prompts | `run_visibility` | Use `saved_project` when results are stale and the mandate permits quota use. |
| Read results | `get_visibility_report` | Also retrieves generated content by content ID. |
| Inspect one answer | `get_provider_answer` | Fetch only the prompt/provider needed. |
| Analyze competition | `get_competitor_intelligence`, `get_competitor_detail` | Start with summary data. |
| Track movement | `get_visibility_trends` | State the selected timeframe. |
| Add measurement prompts | `add_custom_prompts` | Existing onboarded project only; avoid duplicates and save before testing. |
| Correct false competitors | `set_competitor_classification` | Reversible; raw evidence remains stored. |
| Plan content | `get_content_calendar`, `suggest_content_topics` | Poll when the response says generation is running. |
| Generate content | `generate_content` | Poll the returned content ID until complete. |
| Save agent edits | `save_content_version` | Send the complete edited blog; stores a new version without a model call. |
| Publish | `publish_to_cms` | Default to draft; use `contentVersionId` for an agent-edited version. |
| Audit site | `check_website_readiness` | Use cached results unless the operating cadence requires a refresh. |
| Find outreach | `get_outreach_targets` | Do not send outreach without separate authorization. |
| Share report | `create_share_link` | Creates a public read-only link. |

`suggest_prompts` generates candidates from crawl context. Add only high-confidence prompts that
improve the configured buyer-question measurement set.
