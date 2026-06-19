# SEOforGPT MCP

SEOforGPT MCP is a hosted remote MCP connector that lets AI assistants use SEOforGPT workflows directly in chat.

Use it to audit how a brand appears in ChatGPT, Claude, Perplexity, Gemini, and other AI answer engines, compare competitors, inspect cited sources, check whether a site is ready for AI search, generate GEO content briefs, publish approved content to a CMS, and create shareable client reports.

The product behind the connector is SEOforGPT, an AI visibility platform built for marketing agencies, SEO consultants, and marketing teams.

## Use the hosted SEOforGPT MCP

The active SEOforGPT MCP is hosted by SEOforGPT directly:

```text
https://www.seoforgpt.io/mcp
```

Setup guide:

```text
https://www.seoforgpt.io/docs/mcp
```

Current source:

```text
https://github.com/migkast/seoforgpt.io/tree/main/mcp
```

## Important: this repository is only a redirect

This repository used to contain an experimental standalone SEOforGPT MCP server. That old Cloudflare Worker prototype is no longer used, maintained, published, or deployed.

The old implementation was removed from this repository so users do not install or deploy an obsolete MCP server. Use the hosted SEOforGPT MCP URL above instead.

## Connect in Claude

The hosted MCP lets compatible AI assistants use SEOforGPT directly in chat. You connect with your normal SEOforGPT account through OAuth. You do not paste an API key into Claude for the standard hosted flow.

Recommended Claude setup:

1. Open Claude.
2. Go to Customize -> Connectors -> Add custom connector.
3. Name it `SEOforGPT`.
4. Paste this Remote MCP server URL:

```text
https://www.seoforgpt.io/mcp
```

5. Leave Advanced settings empty.
6. Click Add, then Connect.
7. Sign in to SEOforGPT and approve access.

Full setup instructions:

```text
https://www.seoforgpt.io/docs/mcp
```

## Workflows for marketing teams

Marketing teams can use the SEOforGPT AI visibility MCP to bring GEO and AI SEO workflows into their assistant.

### Check visibility movement

Use this for weekly brand monitoring and leadership updates. The assistant can list your SEOforGPT projects, show whether visibility score and appearance rate improved or declined, and summarize what changed versus the previous report.

Example:

```text
Use SEOforGPT. First list my projects and ask me which one to use. Then show visibility trends for the selected project and summarize what changed versus the prior report.
```

### Inspect one competitor

Use this for competitive reviews and positioning work. The assistant can identify the strongest competitor, inspect where they win, show which AI models mention them, and summarize the cited sources helping them appear.

Example:

```text
Use SEOforGPT for the project I choose. Find the strongest competitor, inspect their detail, and explain where they win, which models mention them, and what I should do next.
```

### Turn visibility data into a content brief

Use this when deciding what to publish next. The assistant can review visibility findings, identify prompts where the brand is missing or outranked, and turn those gaps into article ideas or content briefs.

Example:

```text
Use SEOforGPT on my selected project. Review the visibility findings and give me 3 article ideas with the strongest opportunity behind each one.
```

### Check site readiness for AI search

Use this for GEO audits, technical SEO reviews, and implementation planning. The assistant can run the LLM-readiness assessment and turn the result into a prioritized fix list.

Example:

```text
Use SEOforGPT to check website readiness for the project I choose. Then give me the top fixes in priority order with a short reason for each.
```

## Workflows for agencies and SEO consultants

Agencies can use the SEOforGPT AI SEO MCP to manage client visibility, create client-ready reporting, and prioritize accounts that need action.

### Create a client visibility brief

Use this for monthly reporting and client check-ins. The assistant can list client workspaces, ask which client to use, then create a brief with visibility trend, biggest competitor signal, cited domains, losing prompts, and next actions.

Example:

```text
Use SEOforGPT. List my client workspaces, ask which client to use, then create a client brief with trend, competitor signal, losing prompts, cited domains, and 3 next actions.
```

### Prepare a shareable client report

Use this for client reporting handoff and async updates. The assistant can check account status, create a public read-only share link from the latest completed visibility report, and summarize what the client should look at first.

Example:

```text
Use SEOforGPT for the client project I choose. Check account status, create a 30-day share link for the latest completed visibility report, and summarize what the client should look at first.
```

### Review every client workspace

Use this for agency operations and account prioritization. The assistant can list active clients, check quota and feature access, and identify which accounts need a visibility review, content action, or quota attention.

Example:

```text
Use SEOforGPT to list my client workspaces. For each active client, check account status and tell me which ones need a visibility review, content action, or quota attention.
```

### Test a prospect or custom prompt set

Use this for pilots, prospecting, and one-off GEO experiments. The assistant can ask for the project, brand name, and prompts, then run a custom visibility check and summarize the result.

Example:

```text
I want to test a different brand with SEOforGPT. Ask me for the project, the brand name, and the prompts I want to test, then run the custom visibility check and summarize the result.
```

## Current hosted MCP tools

The maintained SEOforGPT hosted MCP exposes these tools:

- `list_projects`: list projects so the assistant can ask which one to use.
- `run_visibility`: run saved-project or custom-brand visibility workflows.
- `get_visibility_report`: fetch summary, raw, or agent-safe full visibility report data.
- `get_visibility_trends`: show whether visibility score and appearance rate improved or declined.
- `get_competitor_intelligence`: pull agent-safe competitor slices and answer gaps.
- `get_competitor_detail`: inspect one competitor with threat, model share, winning prompts, categories, and sources.
- `get_client_brief`: create an agency-ready brief with trend, competitor, citation, prompt, and next-action signals.
- `get_provider_answer`: fetch one raw provider answer and citations for drill-down.
- `create_share_link`: create a public read-only brand visibility report link.
- `list_client_workspaces`: list agency client and pitch workspaces with billing and quota context.
- `get_account_status`: check plan, quota, workspace status, and feature access.
- `publish_to_cms`: publish an existing generated content item to the connected CMS.
- `check_website_readiness`: run the GEO and LLM-readiness assessment.
- `generate_content`: generate blog, LinkedIn, or thread content.
- `suggest_prompts`: generate advanced crawl-based prompt suggestions.

## When to use another SEOforGPT surface

Use the hosted MCP when you want AI assistant workflows through a GEO MCP, AI SEO MCP, or AI visibility MCP.

Use SEOforGPT Public API v1 for scripts, cron jobs, CI workflows, or direct HTTP integrations:

```text
https://www.seoforgpt.io/docs/api
```

Use the SEOforGPT web app when you want the full visual dashboard, agency workspace management, white-label reporting, billing, CMS setup, and account configuration.

## Why this repository still exists

Some third-party MCP directories and old links still point here. This repository is kept as a redirect notice so those visitors can find the current hosted SEOforGPT MCP connector.
