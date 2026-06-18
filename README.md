# SEOforGPT MCP

## This old repository is deprecated

This repository used to contain an experimental standalone SEOforGPT MCP server. It is no longer used, maintained, published, or deployed.

The active SEOforGPT MCP is now hosted by SEOforGPT directly:

```text
https://www.seoforgpt.io/mcp
```

Use the current setup guide:

```text
https://www.seoforgpt.io/docs/mcp
```

Current source lives in the main SEOforGPT product repository:

```text
https://github.com/migkast/seoforgpt.io/tree/main/mcp
```

The old code was removed from this repository on purpose so users do not install or deploy an obsolete MCP server.

## What is SEOforGPT?

SEOforGPT is the AI visibility platform built for marketing agencies and SEO consultants.

It helps teams audit any client for free, see where that brand is invisible in AI answers, monitor competitors and cited sources, generate content that closes those gaps, publish to the client's CMS, and share white-label client reports.

In short: SEOforGPT helps brands and agencies understand and improve how they appear in ChatGPT, Claude, Perplexity, Gemini, and other AI answer engines.

## Use the hosted MCP instead

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

Full instructions:

```text
https://www.seoforgpt.io/docs/mcp
```

## What can you use it for?

Once connected, ask your assistant to use SEOforGPT for workflows like:

- List your SEOforGPT projects.
- Run a saved visibility check for a brand.
- Test a custom brand and prompt set.
- Fetch the latest visibility report.
- See whether visibility score and appearance rate are improving or declining.
- Inspect which competitors are winning AI answers.
- Drill into one competitor's prompts, models, categories, and cited sources.
- Create an agency-ready client brief with trend, competitor, citation, prompt, and next-action signals.
- Create a public read-only share link for a client report.
- List agency client and pitch workspaces.
- Check plan, quota, workspace status, and feature access.
- Run the GEO and LLM-readiness assessment.
- Generate blog, LinkedIn, or thread content from visibility findings.
- Publish existing generated content to a connected CMS.
- Generate advanced prompt suggestions from crawl data.

Example prompts:

```text
Use SEOforGPT. First list my projects and ask me which one to use.
```

```text
Use SEOforGPT for the project I choose. Show me whether visibility is getting better or worse, then summarize the latest report.
```

```text
Use SEOforGPT. List my client workspaces, ask which client to use, then create a client brief with trend, competitor signal, losing prompts, cited domains, and 3 next actions.
```

```text
Use SEOforGPT to check website readiness for the project I choose and turn it into a prioritized checklist.
```

## Current hosted MCP tools

The maintained hosted connector exposes these tools:

- `list_projects`
- `run_visibility`
- `get_visibility_report`
- `get_visibility_trends`
- `get_competitor_intelligence`
- `get_competitor_detail`
- `get_client_brief`
- `get_provider_answer`
- `create_share_link`
- `list_client_workspaces`
- `get_account_status`
- `publish_to_cms`
- `check_website_readiness`
- `generate_content`
- `suggest_prompts`

## For scripts and direct integrations

If you are building a script, cron job, CI workflow, or direct HTTP integration, use SEOforGPT Public API v1 instead of this old repository:

```text
https://www.seoforgpt.io/docs/api
```

## Why this repository still exists

Some third-party MCP directories and old links still point here. This repository is kept as a redirect notice so those visitors can find the current hosted connector.
