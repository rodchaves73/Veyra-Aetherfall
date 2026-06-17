import { bytesToHex, hmacSha256 } from "./encoding.ts";
import { validateTelegramInitData } from "./telegramInitData.ts";

declare const Deno: {
  test(name: string, fn: () => void | Promise<void>): void;
};

const BOT_TOKEN = "123456:fake-test-token";
const NOW = 1_700_000_000;

Deno.test("validates signed initData and normalizes user", async () => {
  const initData = await buildInitData({
    auth_date: String(NOW),
    query_id: "abc",
    user: JSON.stringify(user()),
  });
  const result = await validateTelegramInitData({
    initData,
    botToken: BOT_TOKEN,
    nowSeconds: NOW,
    maxAgeSeconds: 300,
  });
  assertEquals(result.user.firstName, "Veyra");
  assertEquals(result.user.id, 12345);
});

Deno.test("accepts signatures independent of field order", async () => {
  const initData = await buildInitData({
    user: JSON.stringify(user()),
    auth_date: String(NOW),
    query_id: "abc",
  });
  await validateTelegramInitData({
    initData,
    botToken: BOT_TOKEN,
    nowSeconds: NOW,
    maxAgeSeconds: 300,
  });
});

Deno.test("rejects tampered hash", async () => {
  const initData = `${await buildInitData({
    auth_date: String(NOW),
    user: JSON.stringify(user()),
  })}`.replace(/.$/u, "0");
  await assertRejects(
    () =>
      validateTelegramInitData({
        initData,
        botToken: BOT_TOKEN,
        nowSeconds: NOW,
      }),
    "SIGNATURE_INVALID",
  );
});

Deno.test("rejects tampered field", async () => {
  const initData = (await buildInitData({
    auth_date: String(NOW),
    user: JSON.stringify(user()),
  })).replace("Veyra", "Evil");
  await assertRejects(
    () =>
      validateTelegramInitData({
        initData,
        botToken: BOT_TOKEN,
        nowSeconds: NOW,
      }),
    "SIGNATURE_INVALID",
  );
});

Deno.test("rejects missing hash", async () => {
  await assertRejects(
    () =>
      validateTelegramInitData({
        initData: `auth_date=${NOW}&user={}`,
        botToken: BOT_TOKEN,
        nowSeconds: NOW,
      }),
    "HASH_REQUIRED",
  );
});

Deno.test("rejects missing user", async () => {
  const initData = await buildInitData({ auth_date: String(NOW) });
  await assertRejects(
    () =>
      validateTelegramInitData({
        initData,
        botToken: BOT_TOKEN,
        nowSeconds: NOW,
      }),
    "USER_REQUIRED",
  );
});

Deno.test("rejects invalid user JSON", async () => {
  const initData = await buildInitData({ auth_date: String(NOW), user: "{" });
  await assertRejects(
    () =>
      validateTelegramInitData({
        initData,
        botToken: BOT_TOKEN,
        nowSeconds: NOW,
      }),
    "USER_JSON_INVALID",
  );
});

Deno.test("rejects expired auth_date", async () => {
  const initData = await buildInitData({
    auth_date: String(NOW - 301),
    user: JSON.stringify(user()),
  });
  await assertRejects(
    () =>
      validateTelegramInitData({
        initData,
        botToken: BOT_TOKEN,
        nowSeconds: NOW,
        maxAgeSeconds: 300,
      }),
    "AUTH_DATE_EXPIRED",
  );
});

Deno.test("rejects future auth_date", async () => {
  const initData = await buildInitData({
    auth_date: String(NOW + 31),
    user: JSON.stringify(user()),
  });
  await assertRejects(
    () =>
      validateTelegramInitData({
        initData,
        botToken: BOT_TOKEN,
        nowSeconds: NOW,
      }),
    "AUTH_DATE_FUTURE",
  );
});

Deno.test("rejects unsafe user id", async () => {
  const initData = await buildInitData({
    auth_date: String(NOW),
    user: JSON.stringify({ ...user(), id: Number.MAX_SAFE_INTEGER + 1 }),
  });
  await assertRejects(
    () =>
      validateTelegramInitData({
        initData,
        botToken: BOT_TOKEN,
        nowSeconds: NOW,
      }),
    "USER_ID_INVALID",
  );
});

Deno.test("rejects oversized payload", async () => {
  await assertRejects(
    () =>
      validateTelegramInitData({
        initData: "a".repeat(8193),
        botToken: BOT_TOKEN,
        nowSeconds: NOW,
      }),
    "INIT_DATA_TOO_LARGE",
  );
});

async function buildInitData(fields: Record<string, string>): Promise<string> {
  const pairs = Object.entries(fields).map(([key, value]) => `${key}=${value}`)
    .sort();
  const dataCheckString = pairs.join("\n");
  const secret = await hmacSha256("WebAppData", BOT_TOKEN);
  const hash = bytesToHex(await hmacSha256(secret, dataCheckString));
  const params = new URLSearchParams(fields);
  params.set("hash", hash);
  return params.toString();
}

function user() {
  return {
    id: 12345,
    first_name: "Veyra",
    last_name: "Tester",
    username: "veyra_test",
    language_code: "en",
    is_premium: false,
  };
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
