import { buildCorsHeaders, handleOptions } from "../_shared/cors.ts";
import { signSessionToken } from "../_shared/sessionToken.ts";
import { TelegramInitDataError, validateTelegramInitData } from "../_shared/telegramInitData.ts";

const MAX_BODY_BYTES = 10_240;
const DEFAULT_AUTH_MAX_AGE_SECONDS = 300;
const DEFAULT_SESSION_TTL_SECONDS = 900;

Deno.serve(async (request: Request) => {
  const options = handleOptions(request);
  if (options) return withNoStore(options);
  const cors = buildCorsHeaders(request);
  if (!cors.allowed) return jsonError(403, "ORIGIN_FORBIDDEN", "Origin is not allowed.", cors.headers);
  if (request.method !== "POST") return jsonError(405, "METHOD_NOT_ALLOWED", "Method not allowed.", cors.headers);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return jsonError(400, "CONTENT_TYPE_INVALID", "Expected application/json.", cors.headers);
  }
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return jsonError(413, "PAYLOAD_TOO_LARGE", "Request payload is too large.", cors.headers);
  }
  const botToken = Deno.env.get("TELEGRAM_BOT_TOKEN");
  const sessionSecret = Deno.env.get("VEYRA_SESSION_SECRET");
  if (!botToken || !sessionSecret) return jsonError(503, "CONFIG_MISSING", "Authentication is not configured.", cors.headers);

  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return jsonError(413, "PAYLOAD_TOO_LARGE", "Request payload is too large.", cors.headers);
    body = JSON.parse(text);
  } catch {
    return jsonError(400, "BODY_INVALID", "Request body is invalid.", cors.headers);
  }
  if (!body || typeof body !== "object" || typeof (body as { initData?: unknown }).initData !== "string") {
    return jsonError(400, "BODY_INVALID", "Request body is invalid.", cors.headers);
  }

  try {
    const nowSeconds = Math.floor(Date.now() / 1000);
    const validated = await validateTelegramInitData({
      initData: (body as { initData: string }).initData,
      botToken,
      nowSeconds,
      maxAgeSeconds: readBoundedNumber("TELEGRAM_AUTH_MAX_AGE_SECONDS", DEFAULT_AUTH_MAX_AGE_SECONDS, 600),
    });
    const { token, claims } = await signSessionToken({
      secret: sessionSecret,
      user: validated.user,
      nowSeconds,
      ttlSeconds: readBoundedNumber("VEYRA_SESSION_TTL_SECONDS", DEFAULT_SESSION_TTL_SECONDS, 3600),
    });
    return jsonResponse(200, { ok: true, session: { accessToken: token, expiresAt: claims.exp, source: "telegram", user: claims.user } }, cors.headers);
  } catch (error) {
    if (error instanceof TelegramInitDataError) {
      return jsonError(401, error.code, "Telegram authentication is invalid or expired.", cors.headers);
    }
    return jsonError(500, "INTERNAL_ERROR", "Internal authentication error.", cors.headers);
  }
});

function readBoundedNumber(name: string, fallback: number, max: number): number {
  const raw = Deno.env.get(name);
  if (!raw) return fallback;
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? Math.min(Math.floor(value), max) : fallback;
}

function jsonError(status: number, code: string, message: string, headers: Headers): Response {
  return jsonResponse(status, { ok: false, error: { code, message } }, headers);
}

function jsonResponse(status: number, body: unknown, headers: Headers): Response {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Content-Type", "application/json; charset=utf-8");
  responseHeaders.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(body), { status, headers: responseHeaders });
}

function withNoStore(response: Response): Response {
  response.headers.set("Cache-Control", "no-store");
  return response;
}

declare const Deno: { env: { get(name: string): string | undefined }; serve(handler: (request: Request) => Response | Promise<Response>): void };
