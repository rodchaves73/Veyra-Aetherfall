import { base64UrlToJson, constantTimeEqual, hmacSha256, jsonToBase64Url } from "./encoding.ts";
import type { NormalizedTelegramUser } from "./telegramInitData.ts";

const ISSUER = "veyra-auth";
const AUDIENCE = "veyra-mini-app";
const SOURCE = "telegram";
const MIN_SECRET_LENGTH = 32;
const MAX_TTL_SECONDS = 3600;
const HEADER = { alg: "HS256", typ: "JWT" } as const;

export type VeyraSessionClaims = {
  iss: typeof ISSUER;
  aud: typeof AUDIENCE;
  sub: string;
  iat: number;
  exp: number;
  jti: string;
  source: typeof SOURCE;
  user: NormalizedTelegramUser;
};

export class SessionTokenError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = "SessionTokenError";
  }
}

export async function signSessionToken(input: {
  secret: string;
  user: NormalizedTelegramUser;
  nowSeconds: number;
  ttlSeconds: number;
}): Promise<{ token: string; claims: VeyraSessionClaims }> {
  assertSecret(input.secret);
  if (!Number.isFinite(input.ttlSeconds) || input.ttlSeconds <= 0 || input.ttlSeconds > MAX_TTL_SECONDS) {
    throw new SessionTokenError("TTL_INVALID", "Session TTL is invalid.");
  }
  const iat = Math.floor(input.nowSeconds);
  const exp = iat + Math.floor(input.ttlSeconds);
  const claims: VeyraSessionClaims = {
    iss: ISSUER,
    aud: AUDIENCE,
    sub: String(input.user.id),
    iat,
    exp,
    jti: crypto.randomUUID(),
    source: SOURCE,
    user: input.user,
  };
  const signingInput = `${jsonToBase64Url(HEADER)}.${jsonToBase64Url(claims)}`;
  const signature = jsonToBase64UrlBytes(await hmacSha256(input.secret, signingInput));
  return { token: `${signingInput}.${signature}`, claims };
}

export async function verifySessionToken(input: {
  token: string;
  secret: string;
  nowSeconds: number;
}): Promise<VeyraSessionClaims> {
  assertSecret(input.secret);
  if (typeof input.token !== "string" || input.token.length === 0) {
    throw new SessionTokenError("TOKEN_REQUIRED", "Session token is required.");
  }
  const parts = input.token.split(".");
  if (parts.length !== 3 || parts.some((part) => part.length === 0)) {
    throw new SessionTokenError("TOKEN_FORMAT_INVALID", "Session token format is invalid.");
  }
  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = jsonToBase64UrlBytes(await hmacSha256(input.secret, signingInput));
  if (!constantTimeEqual(new TextEncoder().encode(expectedSignature), new TextEncoder().encode(encodedSignature))) {
    throw new SessionTokenError("TOKEN_SIGNATURE_INVALID", "Session token signature is invalid.");
  }

  const header = safeDecode<Record<string, unknown>>(encodedHeader, "TOKEN_HEADER_INVALID");
  if (header.alg !== "HS256" || header.typ !== "JWT" || Object.keys(header).length !== 2) {
    throw new SessionTokenError("TOKEN_HEADER_INVALID", "Session token header is invalid.");
  }

  const claims = safeDecode<Record<string, unknown>>(encodedPayload, "TOKEN_PAYLOAD_INVALID");
  validateClaims(claims, Math.floor(input.nowSeconds));
  return claims as VeyraSessionClaims;
}

function assertSecret(secret: string): void {
  if (typeof secret !== "string" || secret.length < MIN_SECRET_LENGTH) {
    throw new SessionTokenError("SECRET_INVALID", "Session secret is invalid.");
  }
}

function safeDecode<T>(value: string, code: string): T {
  try {
    return base64UrlToJson<T>(value);
  } catch {
    throw new SessionTokenError(code, "Session token JSON is invalid.");
  }
}

function validateClaims(claims: Record<string, unknown>, nowSeconds: number): void {
  if (claims.iss !== ISSUER) throw new SessionTokenError("ISSUER_INVALID", "Session issuer is invalid.");
  if (claims.aud !== AUDIENCE) throw new SessionTokenError("AUDIENCE_INVALID", "Session audience is invalid.");
  if (typeof claims.sub !== "string" || claims.sub.length === 0) throw new SessionTokenError("SUBJECT_INVALID", "Session subject is invalid.");
  if (!Number.isSafeInteger(claims.iat) || Number(claims.iat) <= 0) throw new SessionTokenError("IAT_INVALID", "Session issued-at is invalid.");
  if (!Number.isSafeInteger(claims.exp) || Number(claims.exp) <= Number(claims.iat)) throw new SessionTokenError("EXP_INVALID", "Session expiry is invalid.");
  if (Number(claims.exp) <= nowSeconds) throw new SessionTokenError("TOKEN_EXPIRED", "Session token is expired.");
  if (Number(claims.exp) - Number(claims.iat) > MAX_TTL_SECONDS) throw new SessionTokenError("TTL_INVALID", "Session TTL is invalid.");
  if (typeof claims.jti !== "string" || claims.jti.length === 0) throw new SessionTokenError("JTI_INVALID", "Session id is invalid.");
  if (claims.source !== SOURCE) throw new SessionTokenError("SOURCE_INVALID", "Session source is invalid.");
  validateUser(claims.user);
  if (claims.sub !== String((claims.user as NormalizedTelegramUser).id)) throw new SessionTokenError("SUBJECT_INVALID", "Session subject is invalid.");
}

function validateUser(user: unknown): asserts user is NormalizedTelegramUser {
  if (!user || typeof user !== "object" || Array.isArray(user)) throw new SessionTokenError("USER_INVALID", "Session user is invalid.");
  const candidate = user as Record<string, unknown>;
  if (!Number.isSafeInteger(candidate.id) || Number(candidate.id) <= 0) throw new SessionTokenError("USER_INVALID", "Session user is invalid.");
  if (typeof candidate.firstName !== "string" || candidate.firstName.length === 0) throw new SessionTokenError("USER_INVALID", "Session user is invalid.");
}

function jsonToBase64UrlBytes(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
}
