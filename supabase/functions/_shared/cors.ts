export type CorsResult = {
  ok: boolean;
  status?: number;
  headers: Headers;
};

const ALLOWED_HEADERS = 'authorization, apikey, content-type, x-client-info';
const ALLOWED_METHODS = 'GET, POST, OPTIONS';

export function buildCorsHeaders(request: Request, allowedOriginsConfig: string | undefined): CorsResult {
  const headers = new Headers({
    Vary: 'Origin',
    'Access-Control-Allow-Headers': ALLOWED_HEADERS,
    'Access-Control-Allow-Methods': ALLOWED_METHODS,
  });
  const origin = request.headers.get('Origin');

  if (!origin) {
    return { ok: true, headers };
  }

  const allowedOrigins = parseAllowedOrigins(allowedOriginsConfig);
  if (allowedOrigins.includes(origin)) {
    headers.set('Access-Control-Allow-Origin', origin);
    return { ok: true, headers };
  }

  return { ok: false, status: 403, headers };
}

export function isPreflightRequest(request: Request): boolean {
  return request.method === 'OPTIONS';
}

export function parseAllowedOrigins(value: string | undefined): string[] {
  if (!value) return [];

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0 && origin !== '*');
}
