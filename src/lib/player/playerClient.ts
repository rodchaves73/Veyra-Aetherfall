import { getSupabaseFunctionsBaseUrl } from '../supabase/client';
import type { PlayerBootstrapError, PlayerBootstrapResult, VeyraPlayer, VeyraPlayerAccountStatus, VeyraPlayerOnboardingStatus, VeyraPlayerProfile } from './playerTypes';

type JsonRecord = Record<string, unknown>;

const safeMessages = {
  supabase_not_configured: 'Supabase frontend configuration is unavailable.',
  missing_access_token: 'Player sync requires an authenticated Veyra session.',
  network_error: 'Player sync service is unreachable.',
  invalid_response: 'Player sync service returned an invalid response.',
  player_bootstrap_unavailable: 'Player sync is unavailable.',
} satisfies Record<PlayerBootstrapError['code'], string>;

const makeError = (code: PlayerBootstrapError['code']): PlayerBootstrapError => ({ code, message: safeMessages[code] });
const isRecord = (value: unknown): value is JsonRecord => typeof value === 'object' && value !== null && !Array.isArray(value);
const readJson = async (response: Response): Promise<unknown> => { try { return await response.json(); } catch { return null; } };
const readString = (record: JsonRecord, key: string): string | undefined => { const value = record[key]; return typeof value === 'string' && value.trim().length > 0 ? value : undefined; };
const readNumber = (record: JsonRecord, key: string): number | undefined => { const value = record[key]; return typeof value === 'number' && Number.isFinite(value) ? value : undefined; };
const isAccountStatus = (value: unknown): value is VeyraPlayerAccountStatus => value === 'active' || value === 'limited' || value === 'banned' || value === 'deleted';
const isOnboardingStatus = (value: unknown): value is VeyraPlayerOnboardingStatus => value === 'new' || value === 'started' || value === 'completed' || value === 'skipped';
const readNullableString = (record: JsonRecord, key: string): string | null | undefined => { const value = record[key]; if (value === null) return null; return typeof value === 'string' && value.trim().length > 0 ? value : undefined; };

const mapProfile = (value: unknown): VeyraPlayerProfile | null => {
  if (!isRecord(value)) return null;
  const level = readNumber(value, 'level');
  const xp = readNumber(value, 'xp');
  const powerScore = readNumber(value, 'powerScore');
  const campaignChapter = readNumber(value, 'campaignChapter');
  const campaignStage = readNumber(value, 'campaignStage');
  const onboardingStatus = value.onboardingStatus;
  const lastBootstrapAt = readNullableString(value, 'lastBootstrapAt');
  if (level === undefined || xp === undefined || powerScore === undefined || campaignChapter === undefined || campaignStage === undefined || !isOnboardingStatus(onboardingStatus) || lastBootstrapAt === undefined) return null;
  return { level, xp, powerScore, campaignChapter, campaignStage, onboardingStatus, lastBootstrapAt };
};

const mapPlayer = (value: unknown): VeyraPlayer | null => {
  if (!isRecord(value)) return null;
  const id = readString(value, 'id');
  const telegramUserId = readNumber(value, 'telegramUserId') ?? readNumber(value, 'telegram_user_id');
  const displayName = readString(value, 'displayName') ?? readString(value, 'display_name');
  const accountStatus = value.accountStatus ?? value.account_status;
  const createdAt = readString(value, 'createdAt') ?? readString(value, 'created_at');
  const updatedAt = readString(value, 'updatedAt') ?? readString(value, 'updated_at');
  const lastSeenAt = readString(value, 'lastSeenAt') ?? readString(value, 'last_seen_at');
  const profile = mapProfile(value.profile);
  if (!id || telegramUserId === undefined || !displayName || !isAccountStatus(accountStatus) || !createdAt || !updatedAt || !lastSeenAt || !profile) return null;
  return { id, telegramUserId, displayName, accountStatus, createdAt, updatedAt, lastSeenAt, profile };
};

export const bootstrapPlayer = async (accessToken: string): Promise<PlayerBootstrapResult> => {
  const functionsBaseUrl = getSupabaseFunctionsBaseUrl();
  if (!functionsBaseUrl) return { data: null, error: makeError('supabase_not_configured') };
  if (!accessToken) return { data: null, error: makeError('missing_access_token') };
  try {
    const response = await fetch(`${functionsBaseUrl}/player-bootstrap`, { method: 'GET', headers: { Authorization: `Bearer ${accessToken}` } });
    const json = await readJson(response);
    if (!response.ok) return { data: null, error: makeError('player_bootstrap_unavailable') };
    const player = mapPlayer(isRecord(json) && 'player' in json ? json.player : json);
    return player ? { data: player, error: null } : { data: null, error: makeError('invalid_response') };
  } catch {
    return { data: null, error: makeError('network_error') };
  }
};
