import { hmacSha256, jsonToBase64url, base64urlEncodeBytes, base64urlToJson } from './encoding.ts';
import { signSessionToken, verifySessionToken, type VeyraSessionClaims } from './sessionToken.ts';
import type { NormalizedTelegramUser } from './telegramInitData.ts';

declare const Deno: {
  test(name: string, fn: () => void | Promise<void>): void;
};

const SECRET = 'test-session-secret-with-more-than-32-chars';
const NOW_SECONDS = 1_700_000_000;
const USER: NormalizedTelegramUser = { id: 42, first_name: 'Ada', username: 'ada_test' };

Deno.test('signSessionToken emits and verifySessionToken verifies a session', async () => {
  const signed = await signSessionToken({ user: USER, secret: SECRET, nowSeconds: NOW_SECONDS, ttlSeconds: 900, jti: 'test-jti' });
  const verified = await verifySessionToken({ token: signed.token, secret: SECRET, nowSeconds: NOW_SECONDS + 1 });

  assertEquals(verified.sub, '42');
  assertEquals(verified.exp, NOW_SECONDS + 900);
  assertEquals(verified.user.first_name, 'Ada');
});

Deno.test('signSessionToken rejects a short secret', async () => {
  await assertRejects(() => signSessionToken({ user: USER, secret: 'short', nowSeconds: NOW_SECONDS, ttlSeconds: 900 }));
});

Deno.test('verifySessionToken rejects a tampered signature', async () => {
  const signed = await signSessionToken({ user: USER, secret: SECRET, nowSeconds: NOW_SECONDS, ttlSeconds: 900 });
  await assertRejects(() => verifySessionToken({ token: `${signed.token.slice(0, -1)}x`, secret: SECRET, nowSeconds: NOW_SECONDS }));
});

Deno.test('verifySessionToken rejects a tampered payload', async () => {
  const signed = await signSessionToken({ user: USER, secret: SECRET, nowSeconds: NOW_SECONDS, ttlSeconds: 900 });
  const [header, payload, signature] = signed.token.split('.');
  const claims = base64urlToJson<VeyraSessionClaims>(payload);
  const tamperedPayload = jsonToBase64url({ ...claims, sub: '99' });
  await assertRejects(() => verifySessionToken({ token: `${header}.${tamperedPayload}.${signature}`, secret: SECRET, nowSeconds: NOW_SECONDS }));
});

Deno.test('verifySessionToken rejects an expired token', async () => {
  const signed = await signSessionToken({ user: USER, secret: SECRET, nowSeconds: NOW_SECONDS, ttlSeconds: 10 });
  await assertRejects(() => verifySessionToken({ token: signed.token, secret: SECRET, nowSeconds: NOW_SECONDS + 11 }));
});

Deno.test('verifySessionToken rejects an incorrect issuer', async () => {
  const token = await createSignedToken({ iss: 'wrong-issuer' });
  await assertRejects(() => verifySessionToken({ token, secret: SECRET, nowSeconds: NOW_SECONDS }));
});

Deno.test('verifySessionToken rejects an incorrect audience', async () => {
  const token = await createSignedToken({ aud: 'wrong-audience' });
  await assertRejects(() => verifySessionToken({ token, secret: SECRET, nowSeconds: NOW_SECONDS }));
});

Deno.test('verifySessionToken rejects an invalid format', async () => {
  await assertRejects(() => verifySessionToken({ token: 'not-a-valid-token', secret: SECRET, nowSeconds: NOW_SECONDS }));
});

Deno.test('verifySessionToken rejects an unexpected algorithm', async () => {
  const token = await createSignedToken({}, { alg: 'none', typ: 'JWT' });
  await assertRejects(() => verifySessionToken({ token, secret: SECRET, nowSeconds: NOW_SECONDS }));
});

Deno.test('signSessionToken rejects excessive TTL', async () => {
  await assertRejects(() => signSessionToken({ user: USER, secret: SECRET, nowSeconds: NOW_SECONDS, ttlSeconds: 3601 }));
});

async function createSignedToken(claimOverrides: Record<string, unknown>, headerOverrides: Record<string, unknown> = {}): Promise<string> {
  const claims: VeyraSessionClaims = {
    iss: 'veyra-auth',
    aud: 'veyra-mini-app',
    sub: '42',
    iat: NOW_SECONDS,
    exp: NOW_SECONDS + 900,
    jti: 'test-jti',
    source: 'telegram',
    user: USER,
  };
  const header = jsonToBase64url({ alg: 'HS256', typ: 'JWT', ...headerOverrides });
  const payload = jsonToBase64url({ ...claims, ...claimOverrides });
  const signingInput = `${header}.${payload}`;
  const signature = base64urlEncodeBytes(await hmacSha256(SECRET, signingInput));
  return `${signingInput}.${signature}`;
}

function assertEquals(actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`Expected ${String(expected)}, received ${String(actual)}`);
  }
}

async function assertRejects(fn: () => Promise<unknown>): Promise<void> {
  try {
    await fn();
  } catch {
    return;
  }

  throw new Error('Expected promise to reject');
}
