const SEOFORGPT_API_BASE_URL =
  "https://pcflzzytgkcoqmpozdjn.supabase.co/functions/v1/public-api-v1/v1";

export interface SeoForGptProject {
  id: string;
  name: string;
  brand_name: string | null;
  website_url: string | null;
  [key: string]: unknown;
}

export interface SeoForGptApiErrorShape extends Record<string, unknown> {
  error: string;
  details: string;
}

export class SeoForGptApiError extends Error {
  readonly details: string;
  readonly status?: number;

  constructor(message: string, details: string, status?: number) {
    super(message);
    this.name = "SeoForGptApiError";
    this.details = details;
    this.status = status;
  }

  toResponse(): SeoForGptApiErrorShape {
    return {
      error: this.message,
      details: this.details,
    };
  }
}

export interface AnalyzeCustomRequest {
  projectId: string;
  brand: string;
  prompts: string[];
}

export interface AnalyzeProjectRequest {
  projectId: string;
}

function formatUnknownError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return "Unknown error";
  }
}

export class SeoForGptClient {
  constructor(private readonly apiKey: string) {}

  async listProjects(): Promise<SeoForGptProject[]> {
    const response = await this.request<unknown>("/projects", {
      method: "GET",
    });

    if (!Array.isArray(response)) {
      throw new SeoForGptApiError(
        "Unexpected response from SEOforGPT list projects endpoint",
        "Expected an array of projects."
      );
    }

    return response.map((project) => {
      const item = project as Record<string, unknown>;

      return {
        id: String(item.id ?? ""),
        name: String(item.name ?? ""),
        brand_name:
          item.brand_name == null ? null : String(item.brand_name),
        website_url:
          item.website_url == null ? null : String(item.website_url),
        ...item,
      };
    });
  }

  analyzeCustom(payload: AnalyzeCustomRequest): Promise<unknown> {
    return this.request("/analyze/custom", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  analyzeProject(payload: AnalyzeProjectRequest): Promise<unknown> {
    return this.request("/analyze/project", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  getReport(reportId: string): Promise<unknown> {
    return this.request(`/reports/${encodeURIComponent(reportId)}`, {
      method: "GET",
    });
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${SEOFORGPT_API_BASE_URL}${path}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          ...(init.headers ?? {}),
        },
      });

      const contentType = response.headers.get("content-type") ?? "";
      const isJson = contentType.includes("application/json");
      const payload = isJson ? await response.json() : await response.text();

      if (!response.ok) {
        const details =
          typeof payload === "string"
            ? payload
            : JSON.stringify(payload, null, 2);

        throw new SeoForGptApiError(
          `SEOforGPT API request failed with status ${response.status}`,
          details,
          response.status
        );
      }

      return payload as T;
    } catch (error) {
      if (error instanceof SeoForGptApiError) {
        throw error;
      }

      throw new SeoForGptApiError(
        "SEOforGPT API request failed",
        formatUnknownError(error)
      );
    }
  }
}
