const ALLOWED_HEADERS = "authorization, apikey, content-type, x-client-info";

export type CorsResult = {
  allowed: boolean;
  headers: Headers;
  status?: number;
};

export function buildCorsHeaders(request: Request): CorsResult {
  const origin = request.headers.get("Origin");
  const headers = new Headers({ Vary: "Origin" });
  if (!origin) {
    return { allowed: true, headers };
  }
  const allowedOrigins = parseAllowedOrigins();
  if (!allowedOrigins.includes(origin)) {
    return { allowed: false, headers, status: 403 };
  }
  headers.set("Access-Control-Allow-Origin", origin);
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", ALLOWED_HEADERS);
  headers.set("Access-Control-Max-Age", "600");
  return { allowed: true, headers };
}

export function handleOptions(request: Request): Response | null {
  if (request.method !== "OPTIONS") return null;
  const cors = buildCorsHeaders(request);
  return new Response(null, {
    status: cors.allowed ? 204 : 403,
    headers: cors.headers,
  });
}

function parseAllowedOrigins(): string[] {
  const raw = getEnv("ALLOWED_ORIGINS");
  if (!raw) return [];
  return raw.split(",").map((origin) => origin.trim()).filter((origin) =>
    origin.length > 0 && origin !== "*"
  );
}

function getEnv(name: string): string | undefined {
  const runtime = globalThis as typeof globalThis & {
    Deno?: { env: { get(name: string): string | undefined } };
  };
  return runtime.Deno?.env.get(name);
}
