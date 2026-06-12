import { bytesToHex, hmacSha256 } from './encoding.ts';
import { buildTelegramDataCheckString, validateTelegramInitData } from './telegramInitData.ts';

declare const Deno: {
  test(name: string, fn: () => void | Promise<void>): void;
};

const BOT_TOKEN = '1234567890:TEST_BOT_TOKEN_ONLY';
const NOW_SECONDS = 1_700_000_000;

Deno.test('buildTelegramDataCheckString sorts fields and removes hash only', () => {
  const initData = 'z=last&hash=abc&a=first&auth_date=1700000000&user=%7B%22id%22%3A1%2C%22first_name%22%3A%22Ada%22%7D';
  assertEquals(buildTelegramDataCheckString(initData), 'a=first\nauth_date=1700000000\nuser={"id":1,"first_name":"Ada"}\nz=last');
});

Deno.test('validateTelegramInitData accepts a valid signature', async () => {
  const initData = await createInitData({ auth_date: String(NOW_SECONDS), user: JSON.stringify(validUser()) });
  const result = await validateTelegramInitData({ initData, botToken: BOT_TOKEN, nowSeconds: NOW_SECONDS, maxAgeSeconds: 300 });

  assertEquals(result.authDate, NOW_SECONDS);
  assertEquals(result.user.id, 42);
  assertEquals(result.user.first_name, 'Ada');
});

Deno.test('validateTelegramInitData rejects a tampered hash', async () => {
  const initData = `${await createInitData({ auth_date: String(NOW_SECONDS), user: JSON.stringify(validUser()) })}0`;
  await assertRejects(() => validateTelegramInitData({ initData, botToken: BOT_TOKEN, nowSeconds: NOW_SECONDS, maxAgeSeconds: 300 }));
});

Deno.test('validateTelegramInitData rejects a tampered field', async () => {
  const initData = (await createInitData({ auth_date: String(NOW_SECONDS), user: JSON.stringify(validUser()) })).replace('Ada', 'Eve');
  await assertRejects(() => validateTelegramInitData({ initData, botToken: BOT_TOKEN, nowSeconds: NOW_SECONDS, maxAgeSeconds: 300 }));
});

Deno.test('validateTelegramInitData rejects missing user', async () => {
  const initData = await createInitData({ auth_date: String(NOW_SECONDS), query_id: 'test' });
  await assertRejects(() => validateTelegramInitData({ initData, botToken: BOT_TOKEN, nowSeconds: NOW_SECONDS, maxAgeSeconds: 300 }));
});

Deno.test('validateTelegramInitData rejects invalid user JSON', async () => {
  const initData = await createInitData({ auth_date: String(NOW_SECONDS), user: '{invalid' });
  await assertRejects(() => validateTelegramInitData({ initData, botToken: BOT_TOKEN, nowSeconds: NOW_SECONDS, maxAgeSeconds: 300 }));
});

Deno.test('validateTelegramInitData rejects expired auth_date', async () => {
  const initData = await createInitData({ auth_date: String(NOW_SECONDS - 301), user: JSON.stringify(validUser()) });
  await assertRejects(() => validateTelegramInitData({ initData, botToken: BOT_TOKEN, nowSeconds: NOW_SECONDS, maxAgeSeconds: 300 }));
});

Deno.test('validateTelegramInitData rejects auth_date too far in the future', async () => {
  const initData = await createInitData({ auth_date: String(NOW_SECONDS + 31), user: JSON.stringify(validUser()) });
  await assertRejects(() => validateTelegramInitData({ initData, botToken: BOT_TOKEN, nowSeconds: NOW_SECONDS, maxAgeSeconds: 300 }));
});

Deno.test('validateTelegramInitData rejects an unsafe user id', async () => {
  const initData = await createInitData({ auth_date: String(NOW_SECONDS), user: JSON.stringify({ ...validUser(), id: Number.MAX_SAFE_INTEGER + 1 }) });
  await assertRejects(() => validateTelegramInitData({ initData, botToken: BOT_TOKEN, nowSeconds: NOW_SECONDS, maxAgeSeconds: 300 }));
});

Deno.test('validateTelegramInitData rejects an oversized payload', async () => {
  const initData = `auth_date=${NOW_SECONDS}&user=${'x'.repeat(9000)}&hash=${'a'.repeat(64)}`;
  await assertRejects(() => validateTelegramInitData({ initData, botToken: BOT_TOKEN, nowSeconds: NOW_SECONDS, maxAgeSeconds: 300 }));
});

async function createInitData(fields: Record<string, string>): Promise<string> {
  const params = new URLSearchParams(fields);
  const dataCheckString = buildTelegramDataCheckString(params.toString());
  const secretKey = await hmacSha256('WebAppData', BOT_TOKEN);
  const hash = bytesToHex(await hmacSha256(secretKey, dataCheckString));
  params.set('hash', hash);
  return params.toString();
}

function validUser(): Record<string, unknown> {
  return { id: 42, first_name: 'Ada', username: 'ada_test', language_code: 'en', is_premium: true };
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
