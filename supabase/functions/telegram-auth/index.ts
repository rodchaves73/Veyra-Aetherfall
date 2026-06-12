import { buildCorsHeaders, isPreflightRequest } from '../_shared/cors.ts';
import { TelegramInitDataError, validateTelegramInitData } from '../_shared/telegramInitData.ts';
import { SessionTokenError, signSessionToken } from '../_shared/sessionToken.ts';

declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

type ErrorCode = 'invalid_body' | 'invalid_init_data' | 'forbidden_origin' | 'method_not_allowed' | 'payload_too_large' | 'internal_error' | 'auth_not_configured';

type AuthRequestBody = {
  initData?: unknown;
};

const MAX_BODY_BYTES = 10_240;
const DEFAULT_AUTH_MAX_AGE_SECONDS = 300;
const DEFAULT_SESSION_TTL_SECONDS = 900;
const MAX_AUTH_MAX_AGE_SECONDS = 600;
const MAX_SESSION_TTL_SECONDS = 3600;

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

  if (request.method !== 'POST') {
    return errorResponse('method_not_allowed', 'Method not allowed.', 405, headers);
  }

  const contentLength = request.headers.get('Content-Length');
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    return errorResponse('payload_too_large', 'Payload too large.', 413, headers);
  }

  const contentType = request.headers.get('Content-Type') ?? '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return errorResponse('invalid_body', 'Request body must be JSON.', 400, headers);
  }

  const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
  const sessionSecret = Deno.env.get('VEYRA_SESSION_SECRET');
  if (!botToken || !sessionSecret || sessionSecret.length < 32) {
    return errorResponse('auth_not_configured', 'Authentication is not configured.', 503, headers);
  }

  try {
    const bodyText = await request.text();
    if (bodyText.length > MAX_BODY_BYTES) {
      return errorResponse('payload_too_large', 'Payload too large.', 413, headers);
    }

    const body = JSON.parse(bodyText) as AuthRequestBody;
    if (typeof body.initData !== 'string') {
      return errorResponse('invalid_body', 'Invalid request body.', 400, headers);
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    const validated = await validateTelegramInitData({
      initData: body.initData,
      botToken,
      nowSeconds,
      maxAgeSeconds: readBoundedIntegerEnv('TELEGRAM_AUTH_MAX_AGE_SECONDS', DEFAULT_AUTH_MAX_AGE_SECONDS, MAX_AUTH_MAX_AGE_SECONDS),
    });
    const signed = await signSessionToken({
      user: validated.user,
      secret: sessionSecret,
      nowSeconds,
      ttlSeconds: readBoundedIntegerEnv('VEYRA_SESSION_TTL_SECONDS', DEFAULT_SESSION_TTL_SECONDS, MAX_SESSION_TTL_SECONDS),
    });

    return jsonResponse(
      {
        ok: true,
        session: {
          accessToken: signed.token,
          expiresAt: signed.claims.exp,
          source: signed.claims.source,
          user: signed.claims.user,
        },
      },
      200,
      headers,
    );
  } catch (error) {
    if (error instanceof TelegramInitDataError) {
      return errorResponse('invalid_init_data', 'Telegram authentication data is invalid or expired.', 401, headers);
    }

    if (error instanceof SyntaxError) {
      return errorResponse('invalid_body', 'Invalid JSON body.', 400, headers);
    }

    if (error instanceof SessionTokenError) {
      return errorResponse('auth_not_configured', 'Authentication is not configured.', 503, headers);
    }

    return errorResponse('internal_error', 'Internal error.', 500, headers);
  }
});

function readBoundedIntegerEnv(name: string, defaultValue: number, maxValue: number): number {
  const raw = Deno.env.get(name);
  if (!raw) return defaultValue;

  const parsed = Number(raw);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    return defaultValue;
  }

  return Math.min(parsed, maxValue);
}

function jsonResponse(body: unknown, status: number, headers: Headers): Response {
  return new Response(JSON.stringify(body), { status, headers });
}

function errorResponse(code: ErrorCode, message: string, status: number, headers: Headers): Response {
  return jsonResponse({ ok: false, error: { code, message } }, status, headers);
}
