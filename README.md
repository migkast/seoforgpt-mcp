# Glim AI agent plugin

Glim AI helps brands and agencies understand and improve how they appear in AI answers.
This public repository is the install and discovery package for the hosted Glim AI MCP.

It includes:

- the Glim AI Brand Visibility skill;
- the Glim AI Agency Visibility skill;
- manifests for Agent Plugins, Cursor/Grok Bot, and Grok Build;
- metadata for the official MCP Registry and Glama.

The repository does not run a second MCP server. Every supported client connects to the
maintained hosted service:

```text
https://tryglim.ai/mcp
```

Existing plugin manifests retain `https://www.seoforgpt.io/mcp` and their `seoforgpt`
identifiers so installed connections continue working without reconnecting. Both domains
use the same accounts, workspaces and quotas.

Authentication uses the normal Glim AI OAuth flow. Do not put API keys or account data in
this repository.

## Network access and permissions

This package contains no executable hooks, install scripts, telemetry, or bundled MCP runtime. Its
only runtime network destination is the hosted HTTPS MCP endpoint at
`https://www.seoforgpt.io/mcp` for existing plugin connections. New direct connections can use
`https://tryglim.ai/mcp`. Both endpoints serve Glim AI. Users authenticate directly with Glim AI
through OAuth, and the hosted service applies the connected account's project permissions, plan, and quotas. The plugin
does not request filesystem, shell, SSH, environment-variable, or local credential access.

## Install

### Grok Bot and Cursor

After marketplace approval, search for Glim AI under Plugins in Grok Bot or Cursor; existing
listings may still show SEOforGPT. For local Cursor testing, clone or symlink this repository under
`~/.cursor/plugins/local/seoforgpt`, then reload Cursor.

After installation, connect the Glim AI MCP when prompted, sign in to Glim AI, and approve
access. Start with the read-only project listing before running or publishing anything.

### Grok Build

Use the same repository as a Grok plugin. Its `.grok-plugin/plugin.json` manifest and `.mcp.json`
configuration point Grok Build to the hosted Glim AI MCP.

### Other Agent Plugins clients

Clients implementing the Agent Plugins specification can use the root `plugin.json` and
`mcp.json` files.

### Direct remote MCP setup

For clients that accept a remote MCP URL directly, use:

```text
https://tryglim.ai/mcp
```

Setup guide: https://tryglim.ai/docs/mcp

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

- Product: https://tryglim.ai
- MCP documentation: https://tryglim.ai/docs/mcp
- Hosted MCP source: https://github.com/migkast/seoforgpt.io/tree/main/mcp
- Issues: https://github.com/migkast/seoforgpt-mcp/issues

The previous experimental Cloudflare Worker implementation was retired. This repository is now
deliberately a small, public distribution package for the hosted MCP and its skills.
