import { bytesToHex, constantTimeEqual, hexToBytes, hmacSha256 } from "./encoding.ts";

const MAX_INIT_DATA_LENGTH = 8192;
const DEFAULT_MAX_AGE_SECONDS = 300;
const MAX_ALLOWED_AGE_SECONDS = 600;
const MAX_FUTURE_SECONDS = 30;
const MAX_NAME_LENGTH = 128;
const MAX_USERNAME_LENGTH = 64;
const MAX_LANGUAGE_LENGTH = 16;
const MAX_PHOTO_URL_LENGTH = 512;

export type NormalizedTelegramUser = {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  photoUrl?: string;
};

export type ValidatedTelegramInitData = {
  authDate: number;
  user: NormalizedTelegramUser;
};

export class TelegramInitDataError extends Error {
  constructor(public readonly code: string, message: string) {
    super(message);
    this.name = "TelegramInitDataError";
  }
}

export async function validateTelegramInitData(input: {
  initData: string;
  botToken: string;
  nowSeconds: number;
  maxAgeSeconds?: number;
}): Promise<ValidatedTelegramInitData> {
  const { initData, botToken, nowSeconds } = input;
  const maxAgeSeconds = clampMaxAge(input.maxAgeSeconds);

  if (typeof initData !== "string" || initData.length === 0) {
    throw new TelegramInitDataError("INIT_DATA_REQUIRED", "Telegram initData is required.");
  }
  if (initData.length > MAX_INIT_DATA_LENGTH) {
    throw new TelegramInitDataError("INIT_DATA_TOO_LARGE", "Telegram initData is too large.");
  }
  if (typeof botToken !== "string" || botToken.length === 0) {
    throw new TelegramInitDataError("BOT_TOKEN_REQUIRED", "Telegram bot token is not configured.");
  }

  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) {
    throw new TelegramInitDataError("HASH_REQUIRED", "Telegram initData hash is required.");
  }
  if (!/^[0-9a-f]{64}$/i.test(hash)) {
    throw new TelegramInitDataError("HASH_INVALID", "Telegram initData hash is invalid.");
  }

  const pairs: string[] = [];
  params.forEach((value, key) => {
    if (key !== "hash") {
      pairs.push(`${key}=${value}`);
    }
  });
  pairs.sort();
  const dataCheckString = pairs.join("\n");
  const secretKey = await hmacSha256("WebAppData", botToken);
  const expectedHash = bytesToHex(await hmacSha256(secretKey, dataCheckString));

  if (!constantTimeEqual(hexToBytes(expectedHash), hexToBytes(hash))) {
    throw new TelegramInitDataError("SIGNATURE_INVALID", "Telegram initData signature is invalid.");
  }

  const authDateRaw = params.get("auth_date");
  if (!authDateRaw) {
    throw new TelegramInitDataError("AUTH_DATE_REQUIRED", "Telegram auth_date is required.");
  }
  if (!/^\d+$/.test(authDateRaw)) {
    throw new TelegramInitDataError("AUTH_DATE_INVALID", "Telegram auth_date is invalid.");
  }
  const authDate = Number(authDateRaw);
  if (!Number.isSafeInteger(authDate) || authDate <= 0) {
    throw new TelegramInitDataError("AUTH_DATE_INVALID", "Telegram auth_date is invalid.");
  }
  if (authDate > nowSeconds + MAX_FUTURE_SECONDS) {
    throw new TelegramInitDataError("AUTH_DATE_FUTURE", "Telegram auth_date is in the future.");
  }
  if (nowSeconds - authDate > maxAgeSeconds) {
    throw new TelegramInitDataError("AUTH_DATE_EXPIRED", "Telegram initData is expired.");
  }

  const userRaw = params.get("user");
  if (!userRaw) {
    throw new TelegramInitDataError("USER_REQUIRED", "Telegram user is required.");
  }
  let userValue: unknown;
  try {
    userValue = JSON.parse(userRaw);
  } catch {
    throw new TelegramInitDataError("USER_JSON_INVALID", "Telegram user JSON is invalid.");
  }

  return { authDate, user: normalizeTelegramUser(userValue) };
}

function clampMaxAge(maxAgeSeconds: number | undefined): number {
  if (maxAgeSeconds === undefined) {
    return DEFAULT_MAX_AGE_SECONDS;
  }
  if (!Number.isFinite(maxAgeSeconds) || maxAgeSeconds <= 0) {
    return DEFAULT_MAX_AGE_SECONDS;
  }
  return Math.min(Math.floor(maxAgeSeconds), MAX_ALLOWED_AGE_SECONDS);
}

function normalizeTelegramUser(value: unknown): NormalizedTelegramUser {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TelegramInitDataError("USER_INVALID", "Telegram user is invalid.");
  }
  const user = value as Record<string, unknown>;
  if (!Number.isSafeInteger(user.id) || Number(user.id) <= 0) {
    throw new TelegramInitDataError("USER_ID_INVALID", "Telegram user id is invalid.");
  }
  const firstName = readRequiredString(user.first_name, "USER_FIRST_NAME_INVALID", MAX_NAME_LENGTH);
  const normalized: NormalizedTelegramUser = { id: Number(user.id), firstName };
  const lastName = readOptionalString(user.last_name, "USER_LAST_NAME_INVALID", MAX_NAME_LENGTH);
  const username = readOptionalString(user.username, "USER_USERNAME_INVALID", MAX_USERNAME_LENGTH);
  const languageCode = readOptionalString(user.language_code, "USER_LANGUAGE_INVALID", MAX_LANGUAGE_LENGTH);
  const photoUrl = readOptionalString(user.photo_url, "USER_PHOTO_URL_INVALID", MAX_PHOTO_URL_LENGTH);
  if (lastName !== undefined) normalized.lastName = lastName;
  if (username !== undefined) normalized.username = username;
  if (languageCode !== undefined) normalized.languageCode = languageCode;
  if (typeof user.is_premium === "boolean") normalized.isPremium = user.is_premium;
  if (user.is_premium !== undefined && typeof user.is_premium !== "boolean") {
    throw new TelegramInitDataError("USER_PREMIUM_INVALID", "Telegram premium flag is invalid.");
  }
  if (photoUrl !== undefined) normalized.photoUrl = photoUrl;
  return normalized;
}

function readRequiredString(value: unknown, code: string, maxLength: number): string {
  if (typeof value !== "string" || value.trim().length === 0 || value.length > maxLength) {
    throw new TelegramInitDataError(code, "Telegram user field is invalid.");
  }
  return value;
}

function readOptionalString(value: unknown, code: string, maxLength: number): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value !== "string" || value.length === 0 || value.length > maxLength) {
    throw new TelegramInitDataError(code, "Telegram user field is invalid.");
  }
  return value;
}
