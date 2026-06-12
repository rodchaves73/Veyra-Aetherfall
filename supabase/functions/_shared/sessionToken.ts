import { base64urlDecodeToBytes, base64urlToJson, constantTimeEqual, hmacSha256, jsonToBase64url } from './encoding.ts';
import type { NormalizedTelegramUser } from './telegramInitData.ts';

export type VeyraSessionClaims = {
  iss: 'veyra-auth';
  aud: 'veyra-mini-app';
  sub: string;
  iat: number;
  exp: number;
  jti: string;
  source: 'telegram';
  user: NormalizedTelegramUser;
};

export type SignSessionTokenArgs = {
  user: NormalizedTelegramUser;
  secret: string;
  nowSeconds: number;
  ttlSeconds: number;
  jti?: string;
};

export type VerifySessionTokenArgs = {
  token: string;
  secret: string;
  nowSeconds: number;
};

const SESSION_ISSUER = 'veyra-auth';
const SESSION_AUDIENCE = 'veyra-mini-app';
const SESSION_SOURCE = 'telegram';
const MIN_SECRET_LENGTH = 32;
const MAX_SESSION_TTL_SECONDS = 3600;
const MAX_CLOCK_SKEW_SECONDS = 30;

export class SessionTokenError extends Error {
  constructor(message = 'Invalid Veyra session token') {
    super(message);
    this.name = 'SessionTokenError';
  }
}

export async function signSessionToken({ user, secret, nowSeconds, ttlSeconds, jti }: SignSessionTokenArgs): Promise<{ token: string; claims: VeyraSessionClaims }> {
  assertValidSecret(secret);

  if (!Number.isSafeInteger(nowSeconds) || nowSeconds <= 0) {
    throw new SessionTokenError();
  }

  if (!Number.isFinite(ttlSeconds) || ttlSeconds <= 0 || ttlSeconds > MAX_SESSION_TTL_SECONDS) {
    throw new SessionTokenError();
  }

  assertValidUser(user);

  const issuedAt = Math.floor(nowSeconds);
  const claims: VeyraSessionClaims = {
    iss: SESSION_ISSUER,
    aud: SESSION_AUDIENCE,
    sub: String(user.id),
    iat: issuedAt,
    exp: issuedAt + Math.floor(ttlSeconds),
    jti: jti ?? crypto.randomUUID(),
    source: SESSION_SOURCE,
    user,
  };

  const header = jsonToBase64url({ alg: 'HS256', typ: 'JWT' });
  const payload = jsonToBase64url(claims);
  const signingInput = `${header}.${payload}`;
  const signature = await signInput(signingInput, secret);

  return { token: `${signingInput}.${signature}`, claims };
}

export async function verifySessionToken({ token, secret, nowSeconds }: VerifySessionTokenArgs): Promise<VeyraSessionClaims> {
  assertValidSecret(secret);

  if (typeof token !== 'string' || token.length === 0 || token.length > 8192) {
    throw new SessionTokenError();
  }

  if (!Number.isSafeInteger(nowSeconds) || nowSeconds <= 0) {
    throw new SessionTokenError();
  }

  try {
    const parts = token.split('.');
    if (parts.length !== 3 || parts.some((part) => part.length === 0)) {
      throw new SessionTokenError();
    }

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const header = parseObject(base64urlToJson<unknown>(encodedHeader));
    if (header.alg !== 'HS256' || header.typ !== 'JWT') {
      throw new SessionTokenError();
    }

    const signingInput = `${encodedHeader}.${encodedPayload}`;
    const expectedSignature = await signInput(signingInput, secret);

    if (!constantTimeEqual(base64urlDecodeToBytes(expectedSignature), base64urlDecodeToBytes(encodedSignature))) {
      throw new SessionTokenError();
    }

    const claims = parseClaims(base64urlToJson<unknown>(encodedPayload));

    if (claims.iat > nowSeconds + MAX_CLOCK_SKEW_SECONDS) {
      throw new SessionTokenError();
    }

    if (claims.exp <= nowSeconds) {
      throw new SessionTokenError();
    }

    return claims;
  } catch (error) {
    if (error instanceof SessionTokenError) {
      throw error;
    }

    throw new SessionTokenError();
  }
}

function assertValidSecret(secret: string): void {
  if (typeof secret !== 'string' || secret.length < MIN_SECRET_LENGTH) {
    throw new SessionTokenError();
  }
}

async function signInput(input: string, secret: string): Promise<string> {
  return jsonSafeBase64url(await hmacSha256(secret, input));
}

function jsonSafeBase64url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function parseClaims(value: unknown): VeyraSessionClaims {
  const object = parseObject(value);

  if (object.iss !== SESSION_ISSUER || object.aud !== SESSION_AUDIENCE || object.source !== SESSION_SOURCE) {
    throw new SessionTokenError();
  }

  if (typeof object.sub !== 'string' || object.sub.length === 0) {
    throw new SessionTokenError();
  }

  if (typeof object.iat !== 'number' || typeof object.exp !== 'number' || !Number.isSafeInteger(object.iat) || !Number.isSafeInteger(object.exp) || object.iat <= 0 || object.exp <= object.iat) {
    throw new SessionTokenError();
  }

  if (typeof object.jti !== 'string' || object.jti.length === 0) {
    throw new SessionTokenError();
  }

  const user = parseUser(object.user);
  if (object.sub !== String(user.id)) {
    throw new SessionTokenError();
  }

  return {
    iss: SESSION_ISSUER,
    aud: SESSION_AUDIENCE,
    sub: object.sub,
    iat: object.iat,
    exp: object.exp,
    jti: object.jti,
    source: SESSION_SOURCE,
    user,
  };
}

function parseUser(value: unknown): NormalizedTelegramUser {
  const object = parseObject(value);
  const id = object.id;
  const firstName = object.first_name;

  if (typeof id !== 'number' || !Number.isSafeInteger(id) || typeof firstName !== 'string') {
    throw new SessionTokenError();
  }

  const user: NormalizedTelegramUser = {
    id,
    first_name: firstName,
  };
  assertValidUser(user);

  assignOptionalString(user, 'last_name', object.last_name, 128);
  assignOptionalString(user, 'username', object.username, 64);
  assignOptionalString(user, 'language_code', object.language_code, 16);
  assignOptionalString(user, 'photo_url', object.photo_url, 512);

  if (object.is_premium !== undefined) {
    if (typeof object.is_premium !== 'boolean') {
      throw new SessionTokenError();
    }
    user.is_premium = object.is_premium;
  }

  return user;
}

function assertValidUser(user: NormalizedTelegramUser): void {
  if (!Number.isSafeInteger(user.id) || user.id <= 0 || typeof user.first_name !== 'string' || user.first_name.length === 0 || user.first_name.length > 128) {
    throw new SessionTokenError();
  }
}

function assignOptionalString<T extends keyof NormalizedTelegramUser>(target: NormalizedTelegramUser, key: T, value: unknown, maxLength: number): void {
  if (value === undefined) return;
  if (typeof value !== 'string' || value.length > maxLength) {
    throw new SessionTokenError();
  }
  Object.assign(target, { [key]: value });
}

function parseObject(value: unknown): Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new SessionTokenError();
  }

  return value as Record<string, unknown>;
}
