import { getSupabaseFunctionsBaseUrl } from '../supabase/client';
import type { VeyraAuthClientError, VeyraAuthResult, VeyraAuthSession, VeyraTelegramUser } from './veyraAuthTypes';

type JsonRecord = Record<string, unknown>;
type SafeResult<T> = { data: T; error: null } | { data: null; error: VeyraAuthClientError };

const safeMessages = {
  supabase_not_configured: 'Supabase frontend configuration is unavailable.',
  missing_init_data: 'Telegram Mini App init data is unavailable.',
  network_error: 'Authentication service is unreachable.',
  invalid_response: 'Authentication service returned an invalid response.',
  auth_unavailable: 'Telegram authentication is unavailable.',
  session_unavailable: 'Telegram session verification is unavailable.',
} satisfies Record<VeyraAuthClientError['code'], string>;

const makeError = (code: VeyraAuthClientError['code']): VeyraAuthClientError => ({ code, message: safeMessages[code] });
const isRecord = (value: unknown): value is JsonRecord => typeof value === 'object' && value !== null && !Array.isArray(value);
const readJson = async (response: Response): Promise<unknown> => { try { return await response.json(); } catch { return null; } };
const readString = (record: JsonRecord, key: string): string | undefined => { const value = record[key]; return typeof value === 'string' && value.trim().length > 0 ? value : undefined; };
const readNumber = (record: JsonRecord, key: string): number | undefined => { const value = record[key]; return typeof value === 'number' && Number.isFinite(value) ? value : undefined; };

const mapTelegramUser = (value: unknown): VeyraTelegramUser | null => {
  if (!isRecord(value)) return null;
  const id = readNumber(value, 'id');
  const firstName = readString(value, 'firstName') ?? readString(value, 'first_name');
  if (!id || !firstName) return null;
  return {
    id,
    firstName,
    lastName: readString(value, 'lastName') ?? readString(value, 'last_name'),
    username: readString(value, 'username'),
    languageCode: readString(value, 'languageCode') ?? readString(value, 'language_code'),
    isPremium: typeof value.isPremium === 'boolean' ? value.isPremium : typeof value.is_premium === 'boolean' ? value.is_premium : undefined,
    photoUrl: readString(value, 'photoUrl') ?? readString(value, 'photo_url'),
  };
};

const mapSession = (value: unknown): VeyraAuthSession | null => {
  if (!isRecord(value)) return null;
  const source = value.source === 'telegram' ? 'telegram' : null;
  const expiresAt = readNumber(value, 'expiresAt') ?? readNumber(value, 'expires_at');
  const user = mapTelegramUser(value.user);
  if (!source || !expiresAt || !user) return null;
  return { source, expiresAt, user };
};

const mapAuthPayload = (value: unknown): VeyraAuthResult | null => {
  if (!isRecord(value)) return null;
  const sessionRecord = isRecord(value.session) ? value.session : value;
  const accessToken = readString(value, 'accessToken') ?? readString(value, 'access_token') ?? readString(sessionRecord, 'accessToken') ?? readString(sessionRecord, 'access_token');
  const session = mapSession(sessionRecord);
  if (!accessToken || !session) return null;
  return { accessToken, session };
};

export const authenticateTelegram = async (initData: string): Promise<SafeResult<VeyraAuthResult>> => {
  const functionsBaseUrl = getSupabaseFunctionsBaseUrl();
  if (!functionsBaseUrl) return { data: null, error: makeError('supabase_not_configured') };
  if (!initData) return { data: null, error: makeError('missing_init_data') };
  try {
    const response = await fetch(`${functionsBaseUrl}/telegram-auth`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ initData }) });
    const json = await readJson(response);
    if (!response.ok) return { data: null, error: makeError('auth_unavailable') };
    const payload = mapAuthPayload(json);
    return payload ? { data: payload, error: null } : { data: null, error: makeError('invalid_response') };
  } catch {
    return { data: null, error: makeError('network_error') };
  }
};

export const verifyTelegramSession = async (accessToken: string): Promise<SafeResult<VeyraAuthSession>> => {
  const functionsBaseUrl = getSupabaseFunctionsBaseUrl();
  if (!functionsBaseUrl) return { data: null, error: makeError('supabase_not_configured') };
  if (!accessToken) return { data: null, error: makeError('session_unavailable') };
  try {
    const response = await fetch(`${functionsBaseUrl}/telegram-session`, { method: 'GET', headers: { Authorization: `Bearer ${accessToken}` } });
    const json = await readJson(response);
    if (!response.ok) return { data: null, error: makeError('session_unavailable') };
    const session = mapSession(isRecord(json) && 'session' in json ? json.session : json);
    return session ? { data: session, error: null } : { data: null, error: makeError('invalid_response') };
  } catch {
    return { data: null, error: makeError('network_error') };
  }
};
