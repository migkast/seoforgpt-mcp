# SEOforGPT MCP Server

Remote MCP server for SEOforGPT, built with Node.js, TypeScript, `@modelcontextprotocol/sdk`, and Cloudflare Workers using the `streamable-http` transport.

## Features

- `list_projects`: list all SEOforGPT projects for the configured API key
- `check_brand_visibility`: run custom AI visibility checks for a brand across 3 to 5 prompts
- `run_project_analysis`: run saved prompts for an existing SEOforGPT project
- `get_visibility_report`: fetch a full previously generated report

## Quick start

```bash
SEOFORGPT_API_KEY=sgpt_xxx
```

Install dependencies and build:

```bash
npm install
npm run build
```

Run locally with Cloudflare Workers:

```bash
npm run dev
```

Deploy when you have your Cloudflare credentials available:

```bash
npm run deploy
```

## Configuration

The server expects one environment variable:

- `SEOFORGPT_API_KEY`: your SEOforGPT API key, sent to the upstream API as `Authorization: Bearer <SEOFORGPT_API_KEY>`

For local or deployed Worker environments, you can set it in `wrangler.toml`, via `wrangler secret put SEOFORGPT_API_KEY`, or through your deployment environment.

## Endpoints

- `GET /`: basic server metadata
- `GET /health`: health check
- `POST /mcp`: MCP streamable HTTP endpoint

## Claude Desktop config

```json
{
  "mcpServers": {
    "seoforgpt": {
      "command": "npx",
      "args": ["-y", "seoforgpt-mcp"],
      "env": { "SEOFORGPT_API_KEY": "sgpt_your_key_here" }
    }
  }
}
```

## Smithery URL

`https://seoforgpt-mcp.workers.dev`

## Tool usage examples

### 1. List projects

```json
{
  "name": "list_projects",
  "arguments": {}
}
```

### 2. Check brand visibility

```json
{
  "name": "check_brand_visibility",
  "arguments": {
    "brand": "Acme",
    "queries": [
      "Best CRM for small businesses",
      "Top alternatives to HubSpot for startups",
      "Which sales tools are best for B2B teams"
    ]
  }
}
```

### 3. Run a saved project analysis

```json
{
  "name": "run_project_analysis",
  "arguments": {
    "projectId": "proj_123"
  }
}
```

### 4. Get a report

```json
{
  "name": "get_visibility_report",
  "arguments": {
    "reportId": "report_123"
  }
}
```

## Development notes

- The implementation is stateless and creates a fresh MCP server per request, which fits Cloudflare Workers well.
- All tool failures are normalized to `{ "error": "...", "details": "..." }` so the Worker does not crash on upstream API failures.
- The server uses `process.env.SEOFORGPT_API_KEY` with an `env` binding fallback for Worker compatibility.
