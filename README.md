# SEOforGPT agent plugin

SEOforGPT helps brands and agencies understand and improve how they appear in AI answers.
This public repository is the install and discovery package for the hosted SEOforGPT MCP.

It includes:

- the SEOforGPT Brand Visibility skill;
- the SEOforGPT Agency Visibility skill;
- manifests for Agent Plugins, Cursor/Grok Bot, and Grok Build;
- metadata for the official MCP Registry and Glama.

The repository does not run a second MCP server. Every supported client connects to the
maintained hosted service:

```text
https://www.seoforgpt.io/mcp
```

Authentication uses the normal SEOforGPT OAuth flow. Do not put API keys or account data in
this repository.

## Install

### Grok Bot and Cursor

After marketplace approval, search for SEOforGPT under Plugins in Grok Bot or Cursor and install
it. For local Cursor testing, clone or symlink this repository under
`~/.cursor/plugins/local/seoforgpt`, then reload Cursor.

After installation, connect the SEOforGPT MCP when prompted, sign in to SEOforGPT, and approve
access. Start with the read-only project listing before running or publishing anything.

### Grok Build

Use the same repository as a Grok plugin. Its `.grok-plugin/plugin.json` manifest and `.mcp.json`
configuration point Grok Build to the hosted SEOforGPT MCP.

### Other Agent Plugins clients

Clients implementing the Agent Plugins specification can use the root `plugin.json` and
`mcp.json` files.

### Direct remote MCP setup

For clients that accept a remote MCP URL directly, use:

```text
https://www.seoforgpt.io/mcp
```

Setup guide: https://www.seoforgpt.io/docs/mcp

## Included skills

### Brand Visibility

`skills/seoforgpt-brand-visibility` guides a brand team through visibility trends, competitors,
cited sources, prompt gaps, website readiness, and prioritized next actions.

### Agency Visibility

`skills/seoforgpt-agency-visibility` guides an agency through client selection, account health,
client briefs, shareable reports, prospect tests, and portfolio-level prioritization.

Both skills require the assistant to identify the project before using project-scoped tools and
to have an explicit operating mandate before quota-consuming tests or other consequential
actions. Publishing, public report links, and outreach remain explicit approval gates.

## Maintained source and support

- Product: https://www.seoforgpt.io
- MCP documentation: https://www.seoforgpt.io/docs/mcp
- Hosted MCP source: https://github.com/migkast/seoforgpt.io/tree/main/mcp
- Issues: https://github.com/migkast/seoforgpt-mcp/issues

The previous experimental Cloudflare Worker implementation was retired. This repository is now
deliberately a small, public distribution package for the hosted MCP and its skills.
