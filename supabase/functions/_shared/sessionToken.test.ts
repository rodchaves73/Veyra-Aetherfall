import { base64UrlToJson, jsonToBase64Url } from "./encoding.ts";
import { signSessionToken, verifySessionToken } from "./sessionToken.ts";

declare const Deno: {
  test(name: string, fn: () => void | Promise<void>): void;
};

const SECRET = "fake-session-secret-with-at-least-32-chars";
const NOW = 1_700_000_000;
const USER = { id: 12345, firstName: "Veyra", username: "veyra_test" };

Deno.test("signs and verifies a session token", async () => {
  const { token, claims } = await signSessionToken({
    secret: SECRET,
    user: USER,
    nowSeconds: NOW,
    ttlSeconds: 900,
  });
  const verified = await verifySessionToken({
    token,
    secret: SECRET,
    nowSeconds: NOW + 1,
  });
  assertEquals(verified.jti, claims.jti);
  assertEquals(verified.user.id, USER.id);
});

Deno.test("rejects short secret", async () => {
  await assertRejects(
    () =>
      signSessionToken({
        secret: "short",
        user: USER,
        nowSeconds: NOW,
        ttlSeconds: 900,
      }),
    "SECRET_INVALID",
  );
});

Deno.test("rejects tampered signature", async () => {
  const { token } = await signSessionToken({
    secret: SECRET,
    user: USER,
    nowSeconds: NOW,
    ttlSeconds: 900,
  });
  await assertRejects(
    () =>
      verifySessionToken({
        token: `${token.slice(0, -1)}x`,
        secret: SECRET,
        nowSeconds: NOW,
      }),
    "TOKEN_SIGNATURE_INVALID",
  );
});

Deno.test("rejects tampered payload", async () => {
  const { token } = await signSessionToken({
    secret: SECRET,
    user: USER,
    nowSeconds: NOW,
    ttlSeconds: 900,
  });
  const [header, payload, signature] = token.split(".");
  const claims = base64UrlToJson<Record<string, unknown>>(payload);
  const tampered = `${header}.${
    jsonToBase64Url({ ...claims, sub: "999" })
  }.${signature}`;
  await assertRejects(
    () =>
      verifySessionToken({ token: tampered, secret: SECRET, nowSeconds: NOW }),
    "TOKEN_SIGNATURE_INVALID",
  );
});

Deno.test("rejects expired token", async () => {
  const { token } = await signSessionToken({
    secret: SECRET,
    user: USER,
    nowSeconds: NOW,
    ttlSeconds: 10,
  });
  await assertRejects(
    () => verifySessionToken({ token, secret: SECRET, nowSeconds: NOW + 11 }),
    "TOKEN_EXPIRED",
  );
});

Deno.test("rejects incorrect issuer", async () => {
  await assertPayloadPatch({ iss: "other" }, "ISSUER_INVALID");
});

Deno.test("rejects incorrect audience", async () => {
  await assertPayloadPatch({ aud: "other" }, "AUDIENCE_INVALID");
});

Deno.test("rejects invalid format", async () => {
  await assertRejects(
    () =>
      verifySessionToken({
        token: "bad.token",
        secret: SECRET,
        nowSeconds: NOW,
      }),
    "TOKEN_FORMAT_INVALID",
  );
});

Deno.test("rejects different algorithm", async () => {
  const { token } = await signSessionToken({
    secret: SECRET,
    user: USER,
    nowSeconds: NOW,
    ttlSeconds: 900,
  });
  const [, payload, signature] = token.split(".");
  const tampered = `${
    jsonToBase64Url({ alg: "none", typ: "JWT" })
  }.${payload}.${signature}`;
  await assertRejects(
    () =>
      verifySessionToken({ token: tampered, secret: SECRET, nowSeconds: NOW }),
    "TOKEN_SIGNATURE_INVALID",
  );
});

Deno.test("rejects excessive TTL", async () => {
  await assertRejects(
    () =>
      signSessionToken({
        secret: SECRET,
        user: USER,
        nowSeconds: NOW,
        ttlSeconds: 3601,
      }),
    "TTL_INVALID",
  );
});

async function assertPayloadPatch(
  patch: Record<string, unknown>,
  code: string,
): Promise<void> {
  const { token } = await signSessionToken({
    secret: SECRET,
    user: USER,
    nowSeconds: NOW,
    ttlSeconds: 900,
  });
  const [header, payload] = token.split(".");
  const claims = base64UrlToJson<Record<string, unknown>>(payload);
  const signingInput = `${header}.${jsonToBase64Url({ ...claims, ...patch })}`;
  const signature = await signRaw(signingInput);
  await assertRejects(
    () =>
      verifySessionToken({
        token: `${signingInput}.${signature}`,
        secret: SECRET,
        nowSeconds: NOW,
      }),
    code,
  );
}

async function signRaw(signingInput: string): Promise<string> {
  const { hmacSha256 } = await import("./encoding.ts");
  const bytes = await hmacSha256(SECRET, signingInput);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(
    /=+$/u,
    "",
  );
}

function assertEquals(actual: unknown, expected: unknown): void {
  if (actual !== expected) {
    throw new Error(`Expected ${String(expected)}, got ${String(actual)}`);
  }
}

async function assertRejects(
  fn: () => Promise<unknown>,
  code: string,
): Promise<void> {
  try {
    await fn();
  } catch (error) {
    if (
      error && typeof error === "object" && "code" in error &&
      error.code === code
    ) return;
    throw new Error(
      `Expected ${code}, got ${String((error as { code?: unknown })?.code)}`,
      { cause: error },
    );
  }
  throw new Error(`Expected rejection ${code}`);
}
