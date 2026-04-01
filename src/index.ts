import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { SeoForGptApiError, SeoForGptClient, type SeoForGptProject } from "./sgpt-client.js";
import * as z from "zod/v4";

declare const process:
  | {
      env: Record<string, string | undefined>;
    }
  | undefined;

type Env = {
  SEOFORGPT_API_KEY?: string;
};

type JsonRecord = Record<string, unknown>;

const SERVER_INFO = {
  name: "seoforgpt-mcp",
  version: "1.0.0",
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, Last-Event-ID, MCP-Protocol-Version, Mcp-Protocol-Version, mcp-protocol-version, mcp-session-id",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Expose-Headers":
    "MCP-Protocol-Version, Mcp-Protocol-Version, mcp-protocol-version, mcp-session-id",
};

const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand_name: z.string().nullable(),
  website_url: z.string().nullable(),
});

const errorSchema = z.object({
  error: z.string(),
  details: z.string(),
});

const listProjectsOutputSchema = z.union([
  z.object({
    projects: z.array(projectSchema),
  }),
  errorSchema,
]);

const visibilitySummaryItemSchema = z.object({
  prompt: z.string().nullable(),
  model: z.string().nullable(),
  appears: z.boolean().nullable(),
  rank: z.number().nullable(),
  competitors: z.array(z.string()),
});

const visibilitySummaryOutputSchema = z.union([
  z.object({
    reportId: z.string().nullable(),
    projectId: z.string().nullable(),
    brand: z.string().nullable(),
    queryCount: z.number(),
    summary: z.array(visibilitySummaryItemSchema),
    rawReport: z.unknown(),
  }),
  errorSchema,
]);

const fullReportOutputSchema = z.union([
  z.object({
    reportId: z.string().nullable(),
    report: z.unknown(),
  }),
  errorSchema,
]);

function getApiKey(env?: Env): string {
  const processEnvKey =
    typeof process !== "undefined" ? process.env.SEOFORGPT_API_KEY : undefined;
  const apiKey = env?.SEOFORGPT_API_KEY ?? processEnvKey;

  if (!apiKey) {
    throw new SeoForGptApiError(
      "Missing SEOFORGPT_API_KEY",
      "Set SEOFORGPT_API_KEY in wrangler.toml, a Wrangler secret, or the runtime environment."
    );
  }

  return apiKey;
}

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body, null, 2), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...CORS_HEADERS,
      ...(init?.headers ?? {}),
    },
  });
}

function normalizeProjects(projects: SeoForGptProject[]) {
  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    brand_name: project.brand_name,
    website_url: project.website_url,
  }));
}

function asObject(value: unknown): JsonRecord | null {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as JsonRecord;
  }

  return null;
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function asString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function asBoolean(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function flattenObjects(value: unknown): JsonRecord[] {
  if (Array.isArray(value)) {
    return value.flatMap(flattenObjects);
  }

  const object = asObject(value);
  if (!object) {
    return [];
  }

  return [
    object,
    ...Object.values(object).flatMap((item) => flattenObjects(item)),
  ];
}

function uniqueStrings(values: Array<string | null | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value)))];
}

function extractReportId(payload: unknown): string | null {
  for (const object of flattenObjects(payload)) {
    const directId = asString(object.reportId) ?? asString(object.report_id);
    if (directId) {
      return directId;
    }

    const nestedReport = asObject(object.report);
    const nestedId =
      (nestedReport && (asString(nestedReport.id) ?? asString(nestedReport.reportId))) ||
      null;
    if (nestedId) {
      return nestedId;
    }
  }

  return null;
}

function extractVisibilitySummary(report: unknown): Array<z.infer<typeof visibilitySummaryItemSchema>> {
  const results: Array<z.infer<typeof visibilitySummaryItemSchema>> = [];

  for (const object of flattenObjects(report)) {
    const appears =
      asBoolean(object.appears) ??
      asBoolean(object.brandAppears) ??
      asBoolean(object.brand_visible) ??
      asBoolean(object.visible);
    const rank =
      asNumber(object.rank) ??
      asNumber(object.position) ??
      asNumber(object.brandRank) ??
      asNumber(object.brand_rank);

    const competitorValues = [
      ...asArray(object.competitors),
      ...asArray(object.competitor_brands),
      ...asArray(object.alternative_brands),
    ]
      .map((entry) => {
        if (typeof entry === "string") {
          return entry;
        }

        const nested = asObject(entry);
        if (!nested) {
          return null;
        }

        return (
          asString(nested.name) ??
          asString(nested.brand) ??
          asString(nested.brand_name)
        );
      });

    const prompt =
      asString(object.prompt) ??
      asString(object.query) ??
      asString(object.searchQuery) ??
      asString(object.search_query);
    const model =
      asString(object.model) ??
      asString(object.platform) ??
      asString(object.provider) ??
      asString(object.engine);

    const meaningful =
      prompt !== null ||
      model !== null ||
      appears !== null ||
      rank !== null ||
      competitorValues.some((value) => value !== null);

    if (!meaningful) {
      continue;
    }

    results.push({
      prompt,
      model,
      appears,
      rank,
      competitors: uniqueStrings(competitorValues),
    });
  }

  const deduped = new Map<string, z.infer<typeof visibilitySummaryItemSchema>>();
  for (const item of results) {
    const key = JSON.stringify(item);
    deduped.set(key, item);
  }

  return [...deduped.values()];
}

function toToolResult<T extends JsonRecord>(payload: T) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(payload, null, 2),
      },
    ],
    structuredContent: payload,
  };
}

function toErrorResult(error: unknown) {
  if (error instanceof SeoForGptApiError) {
    return toToolResult(error.toResponse());
  }

  const details = error instanceof Error ? error.message : "Unknown error";
  return toToolResult({
    error: "Unexpected server error",
    details,
  });
}

async function resolveProjectId(
  client: SeoForGptClient,
  explicitProjectId?: string
): Promise<string> {
  if (explicitProjectId) {
    return explicitProjectId;
  }

  const projects = await client.listProjects();
  const firstProject = projects[0];

  if (!firstProject) {
    throw new SeoForGptApiError(
      "No SEOforGPT projects found",
      "Create a project in SEOforGPT first or provide an explicit projectId."
    );
  }

  return firstProject.id;
}

function createServer(env?: Env): McpServer {
  const apiKey = getApiKey(env);
  const client = new SeoForGptClient(apiKey);
  const server = new McpServer(SERVER_INFO, {
    capabilities: {
      logging: {},
    },
  });

  server.registerTool(
    "list_projects",
    {
      description: "List all SEOforGPT projects for this API key",
      outputSchema: listProjectsOutputSchema,
    },
    async () => {
      try {
        const projects = await client.listProjects();
        return toToolResult({
          projects: normalizeProjects(projects),
        });
      } catch (error) {
        return toErrorResult(error);
      }
    }
  );

  server.registerTool(
    "check_brand_visibility",
    {
      description:
        "Check how a brand appears in AI answers (ChatGPT, Perplexity, Claude, Gemini). Runs 3-5 prompts and returns visibility data including which competitors appear instead.",
      inputSchema: {
        brand: z.string().min(1).describe("Brand name to evaluate"),
        queries: z
          .array(z.string().min(1))
          .min(3)
          .max(5)
          .describe("Three to five prompts to analyze"),
        projectId: z
          .string()
          .min(1)
          .optional()
          .describe("Optional SEOforGPT project ID; defaults to the first project"),
      },
      outputSchema: visibilitySummaryOutputSchema,
    },
    async ({ brand, queries, projectId }) => {
      try {
        const resolvedProjectId = await resolveProjectId(client, projectId);
        const rawReport = await client.analyzeCustom({
          projectId: resolvedProjectId,
          brand,
          prompts: queries,
        });

        return toToolResult({
          reportId: extractReportId(rawReport),
          projectId: resolvedProjectId,
          brand,
          queryCount: queries.length,
          summary: extractVisibilitySummary(rawReport),
          rawReport,
        });
      } catch (error) {
        return toErrorResult(error);
      }
    }
  );

  server.registerTool(
    "run_project_analysis",
    {
      description: "Run all saved visibility prompts for a SEOforGPT project",
      inputSchema: {
        projectId: z.string().min(1).describe("SEOforGPT project ID"),
      },
      outputSchema: visibilitySummaryOutputSchema,
    },
    async ({ projectId }) => {
      try {
        const rawReport = await client.analyzeProject({ projectId });
        return toToolResult({
          reportId: extractReportId(rawReport),
          projectId,
          brand: null,
          queryCount: extractVisibilitySummary(rawReport).length,
          summary: extractVisibilitySummary(rawReport),
          rawReport,
        });
      } catch (error) {
        return toErrorResult(error);
      }
    }
  );

  server.registerTool(
    "get_visibility_report",
    {
      description: "Get the full results of a previously run AI visibility analysis",
      inputSchema: {
        reportId: z.string().min(1).describe("SEOforGPT report ID"),
      },
      outputSchema: fullReportOutputSchema,
    },
    async ({ reportId }) => {
      try {
        const report = await client.getReport(reportId);
        return toToolResult({
          reportId: extractReportId(report) ?? reportId,
          report,
        });
      } catch (error) {
        return toErrorResult(error);
      }
    }
  );

  return server;
}

async function handleMcpRequest(request: Request, env?: Env): Promise<Response> {
  try {
    const server = createServer(env);
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    await server.connect(transport);
    const response = await transport.handleRequest(request);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...CORS_HEADERS,
        ...Object.fromEntries(response.headers.entries()),
      },
    });
  } catch (error) {
    const payload =
      error instanceof SeoForGptApiError
        ? error.toResponse()
        : {
            error: "Failed to initialize SEOforGPT MCP server",
            details: error instanceof Error ? error.message : "Unknown error",
          };

    return jsonResponse(payload, { status: 500 });
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: CORS_HEADERS,
      });
    }

    if (url.pathname === "/") {
      return jsonResponse({
        name: SERVER_INFO.name,
        version: SERVER_INFO.version,
        transport: "streamable-http",
        endpoint: "/mcp",
      });
    }

    if (url.pathname === "/health") {
      return jsonResponse({
        status: "ok",
        service: SERVER_INFO.name,
      });
    }

    if (url.pathname === "/mcp") {
      return handleMcpRequest(request, env);
    }

    return jsonResponse(
      {
        error: "Not found",
        details: "Use /mcp for the MCP endpoint.",
      },
      { status: 404 }
    );
  },
};
