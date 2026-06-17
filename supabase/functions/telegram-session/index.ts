import { buildCorsHeaders, handleOptions } from "../_shared/cors.ts";
import {
  SessionTokenError,
  verifySessionToken,
} from "../_shared/sessionToken.ts";

Deno.serve(async (request: Request) => {
  const options = handleOptions(request);
  if (options) return withNoStore(options);
  const cors = buildCorsHeaders(request);
  if (!cors.allowed) {
    return jsonError(
      403,
      "ORIGIN_FORBIDDEN",
      "Origin is not allowed.",
      cors.headers,
    );
  }
  if (request.method !== "GET") {
    return jsonError(
      405,
      "METHOD_NOT_ALLOWED",
      "Method not allowed.",
      cors.headers,
    );
  }
  const sessionSecret = Deno.env.get("VEYRA_SESSION_SECRET");
  if (!sessionSecret) {
    return jsonError(
      503,
      "CONFIG_MISSING",
      "Authentication is not configured.",
      cors.headers,
    );
  }
  const authorization = request.headers.get("Authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(authorization);
  if (!match) {
    return jsonError(
      401,
      "AUTHORIZATION_INVALID",
      "Session token is required.",
      cors.headers,
    );
  }
  try {
    const claims = await verifySessionToken({
      token: match[1],
      secret: sessionSecret,
      nowSeconds: Math.floor(Date.now() / 1000),
    });
    return jsonResponse(200, {
      ok: true,
      session: { expiresAt: claims.exp, source: "telegram", user: claims.user },
    }, cors.headers);
  } catch (error) {
    if (error instanceof SessionTokenError) {
      return jsonError(
        401,
        error.code,
        "Session token is invalid or expired.",
        cors.headers,
      );
    }
    return jsonError(
      500,
      "INTERNAL_ERROR",
      "Internal session error.",
      cors.headers,
    );
  }
});

function jsonError(
  status: number,
  code: string,
  message: string,
  headers: Headers,
): Response {
  return jsonResponse(status, { ok: false, error: { code, message } }, headers);
}

function jsonResponse(
  status: number,
  body: unknown,
  headers: Headers,
): Response {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Content-Type", "application/json; charset=utf-8");
  responseHeaders.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders,
  });
}

function withNoStore(response: Response): Response {
  response.headers.set("Cache-Control", "no-store");
  return response;
}

declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};
