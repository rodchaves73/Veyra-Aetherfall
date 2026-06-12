import { buildCorsHeaders, isPreflightRequest } from '../_shared/cors.ts';
import { SessionTokenError, verifySessionToken } from '../_shared/sessionToken.ts';

declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

type ErrorCode = 'invalid_session' | 'missing_session' | 'forbidden_origin' | 'method_not_allowed' | 'auth_not_configured' | 'internal_error';

Deno.serve(async (request) => {
  const cors = buildCorsHeaders(request, Deno.env.get('ALLOWED_ORIGINS'));
  const headers = cors.headers;
  headers.set('Cache-Control', 'no-store');
  headers.set('Content-Type', 'application/json');

  if (isPreflightRequest(request)) {
    return cors.ok ? new Response(null, { status: 204, headers }) : errorResponse('forbidden_origin', 'Origin is not allowed.', cors.status ?? 403, headers);
  }

  if (!cors.ok) {
    return errorResponse('forbidden_origin', 'Origin is not allowed.', cors.status ?? 403, headers);
  }

  if (request.method !== 'GET') {
    return errorResponse('method_not_allowed', 'Method not allowed.', 405, headers);
  }

  const sessionSecret = Deno.env.get('VEYRA_SESSION_SECRET');
  if (!sessionSecret || sessionSecret.length < 32) {
    return errorResponse('auth_not_configured', 'Authentication is not configured.', 503, headers);
  }

  const token = extractBearerToken(request.headers.get('Authorization'));
  if (!token) {
    return errorResponse('missing_session', 'Bearer session token is required.', 401, headers);
  }

  try {
    const session = await verifySessionToken({ token, secret: sessionSecret, nowSeconds: Math.floor(Date.now() / 1000) });

    return jsonResponse(
      {
        ok: true,
        session: {
          expiresAt: session.exp,
          source: session.source,
          user: session.user,
        },
      },
      200,
      headers,
    );
  } catch (error) {
    if (error instanceof SessionTokenError) {
      return errorResponse('invalid_session', 'Session token is invalid or expired.', 401, headers);
    }

    return errorResponse('internal_error', 'Internal error.', 500, headers);
  }
});

function extractBearerToken(value: string | null): string | undefined {
  if (!value) return undefined;
  const match = /^Bearer\s+(.+)$/i.exec(value);
  return match?.[1];
}

function jsonResponse(body: unknown, status: number, headers: Headers): Response {
  return new Response(JSON.stringify(body), { status, headers });
}

function errorResponse(code: ErrorCode, message: string, status: number, headers: Headers): Response {
  return jsonResponse({ ok: false, error: { code, message } }, status, headers);
}
