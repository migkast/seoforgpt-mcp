# SEOforGPT MCP Server — Launch Checklist
_Author: Ergo | Date: 2026-04-01 | Do these steps after Codex build completes_

---

## Step 1: Verify build
```bash
cd /home/node/.openclaw/workspace/seoforgpt-mcp
npm run build
# Must produce dist/index.js with no errors
```

## Step 2: Smoke test (dry run — no real API key needed for compilation check)
```bash
# Check the 4 tools are defined in src/index.ts
grep -c "server.tool\|tool(" src/index.ts
# Should show 4
```

## Step 3: Publish to npm
```bash
# Set npm auth from .secrets (NPM_TOKEN if available, else: npm login)
npm publish --access public
# Package name: seoforgpt-mcp
# After publish, users can: npx seoforgpt-mcp
```

## Step 4: Deploy to Cloudflare Workers (needs CF_API_TOKEN)
```bash
# Get CF_API_TOKEN from Miguel — he has Cloudflare account
# Add to .secrets: CF_API_TOKEN=...
export CF_API_TOKEN=$(grep CF_API_TOKEN ~/.openclaw/workspace/.secrets | cut -d= -f2)
npx wrangler deploy
# URL will be: https://seoforgpt-mcp.{account}.workers.dev
```

## Step 5: Submit to Smithery (smithery.ai)
- URL: https://smithery.ai/new
- Name: SEOforGPT Brand Visibility
- Description: "Track how your brand appears in ChatGPT, Perplexity, Claude, and Gemini answers. Check AI visibility, find which competitors appear instead of you, and monitor GEO performance."
- GitHub repo: https://github.com/ergopitrez/seoforgpt-mcp
- Transport: streamable-http
- Config schema: `{ "SEOFORGPT_API_KEY": { "type": "string", "description": "Your SEOforGPT API key (starts with sgpt_)" } }`

## Step 6: AgentMade submission
- Submit seoforgpt-mcp as a new build on agentmade.work
- Category: MCP / Tools
- Description: first MCP server for GEO/AI visibility monitoring

## Step 7: SEOforGPT product page update
- Add "Works with Claude Desktop, Cursor, Windsurf" to homepage
- Add MCP section to docs/API page
- Add to the product feature list

## Step 8: Announce
- X post (via xposts.json queue — Miguel approves)
- Reddit: r/ClaudeAI, r/cursor, r/LocalLLaMA — "Built a free MCP server for AI brand visibility"
- Moltbook: "just shipped seoforgpt-mcp"

---

## Smithery listing copy (paste-ready)

**Title:** SEOforGPT Brand Visibility MCP

**Short description (100 chars):**
Live custom AI visibility checks — test the exact prompts your customers use, not a database of generic searches.

**Full description:**
Ahrefs Brand Radar tracks 356M auto-generated search prompts. That's useful for market-level signal. But it can't tell you how your brand appears when someone asks your specific question — the one your actual customers type.

The SEOforGPT MCP server lets any AI assistant run live visibility checks using prompts you define. Ask Claude: "check how SEOforGPT appears when someone asks ChatGPT for brand monitoring tools" — and get real, live data back: which AI models mention you, what competitors appear instead, your rank, and the exact framing used.

Custom prompts. Live results. No Ahrefs subscription required.

**4 tools included:**
- `list_projects` — List all your SEOforGPT projects
- `check_brand_visibility` — Run live checks with your custom queries across ChatGPT, Perplexity, Claude, Gemini
- `run_project_analysis` — Run all saved visibility prompts for a project
- `get_visibility_report` — Get full results from a previous analysis run

**Use case:** Ask your AI coding assistant "how does my brand rank for [key prompt]?" without leaving your workflow.

**Requires:** SEOforGPT API key (free tier available at seoforgpt.io)
