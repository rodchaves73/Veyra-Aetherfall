import { bytesToHex, constantTimeEqual, hexToBytes, hmacSha256 } from './encoding.ts';

export type NormalizedTelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
};

export type ValidatedTelegramInitData = {
  authDate: number;
  user: NormalizedTelegramUser;
  fields: Record<string, string>;
};

export type ValidateTelegramInitDataArgs = {
  initData: string;
  botToken: string;
  nowSeconds: number;
  maxAgeSeconds: number;
};

type TelegramUserInput = {
  id?: unknown;
  first_name?: unknown;
  last_name?: unknown;
  username?: unknown;
  language_code?: unknown;
  is_premium?: unknown;
  photo_url?: unknown;
};

const MAX_INIT_DATA_LENGTH = 8192;
const MAX_FUTURE_SKEW_SECONDS = 30;
const MAX_AUTH_AGE_SECONDS = 600;
const MAX_NAME_LENGTH = 128;
const MAX_USERNAME_LENGTH = 64;
const MAX_LANGUAGE_CODE_LENGTH = 16;
const MAX_PHOTO_URL_LENGTH = 512;

export class TelegramInitDataError extends Error {
  constructor(message = 'Invalid Telegram initData') {
    super(message);
    this.name = 'TelegramInitDataError';
  }
}

export function buildTelegramDataCheckString(initData: string): string {
  const params = new URLSearchParams(initData);
  const entries = Array.from(params.entries())
    .filter(([key]) => key !== 'hash')
    .sort(([leftKey, leftValue], [rightKey, rightValue]) => (leftKey === rightKey ? leftValue.localeCompare(rightValue) : leftKey.localeCompare(rightKey)));

  return entries.map(([key, value]) => `${key}=${value}`).join('\n');
}

export async function validateTelegramInitData({ initData, botToken, nowSeconds, maxAgeSeconds }: ValidateTelegramInitDataArgs): Promise<ValidatedTelegramInitData> {
  if (typeof initData !== 'string' || initData.length === 0) {
    throw new TelegramInitDataError();
  }

  if (initData.length > MAX_INIT_DATA_LENGTH) {
    throw new TelegramInitDataError();
  }

  if (typeof botToken !== 'string' || botToken.length === 0) {
    throw new TelegramInitDataError();
  }

  const effectiveMaxAge = normalizeMaxAge(maxAgeSeconds);
  const params = new URLSearchParams(initData);
  const receivedHash = params.get('hash');

  if (!receivedHash || !/^[0-9a-f]{64}$/i.test(receivedHash)) {
    throw new TelegramInitDataError();
  }

  const authDateRaw = params.get('auth_date');
  if (!authDateRaw || !/^\d+$/.test(authDateRaw)) {
    throw new TelegramInitDataError();
  }

  const authDate = Number(authDateRaw);
  if (!Number.isSafeInteger(authDate) || authDate <= 0) {
    throw new TelegramInitDataError();
  }

  if (authDate > nowSeconds + MAX_FUTURE_SKEW_SECONDS) {
    throw new TelegramInitDataError();
  }

  if (nowSeconds - authDate > effectiveMaxAge) {
    throw new TelegramInitDataError();
  }

  const dataCheckString = buildTelegramDataCheckString(initData);
  const secretKey = await hmacSha256('WebAppData', botToken);
  const expectedHash = bytesToHex(await hmacSha256(secretKey, dataCheckString));

  if (!constantTimeEqual(hexToBytes(expectedHash), hexToBytes(receivedHash.toLowerCase()))) {
    throw new TelegramInitDataError();
  }

  const user = parseTelegramUser(params.get('user'));
  const fields: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    if (key !== 'hash') {
      fields[key] = value;
    }
  }

  return { authDate, user, fields };
}

function normalizeMaxAge(maxAgeSeconds: number): number {
  if (!Number.isFinite(maxAgeSeconds) || maxAgeSeconds <= 0) {
    throw new TelegramInitDataError();
  }

  return Math.min(Math.floor(maxAgeSeconds), MAX_AUTH_AGE_SECONDS);
}

function parseTelegramUser(value: string | null): NormalizedTelegramUser {
  if (!value) {
    throw new TelegramInitDataError();
  }

  let parsed: TelegramUserInput;
  try {
    parsed = JSON.parse(value) as TelegramUserInput;
  } catch {
    throw new TelegramInitDataError();
  }

  const id = parsed.id;
  const firstName = parsed.first_name;

  if (typeof id !== 'number' || !Number.isSafeInteger(id) || id <= 0) {
    throw new TelegramInitDataError();
  }

  if (typeof firstName !== 'string' || firstName.length === 0 || firstName.length > MAX_NAME_LENGTH) {
    throw new TelegramInitDataError();
  }

  const user: NormalizedTelegramUser = {
    id,
    first_name: firstName,
  };

  assignLimitedString(user, 'last_name', parsed.last_name, MAX_NAME_LENGTH);
  assignLimitedString(user, 'username', parsed.username, MAX_USERNAME_LENGTH);
  assignLimitedString(user, 'language_code', parsed.language_code, MAX_LANGUAGE_CODE_LENGTH);
  assignLimitedString(user, 'photo_url', parsed.photo_url, MAX_PHOTO_URL_LENGTH);

  if (parsed.is_premium !== undefined) {
    if (typeof parsed.is_premium !== 'boolean') {
      throw new TelegramInitDataError();
    }
    user.is_premium = parsed.is_premium;
  }

  return user;
}

function assignLimitedString<T extends keyof NormalizedTelegramUser>(target: NormalizedTelegramUser, key: T, value: unknown, maxLength: number): void {
  if (value === undefined) return;
  if (typeof value !== 'string' || value.length > maxLength) {
    throw new TelegramInitDataError();
  }
  Object.assign(target, { [key]: value });
}
