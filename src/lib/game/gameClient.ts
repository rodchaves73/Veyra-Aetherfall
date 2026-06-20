import { getSupabaseFunctionsBaseUrl } from '../supabase/client';
import type { GameState, SummonResult } from './gameTypes';
const readJson = async (response: Response) => { try { return await response.json(); } catch { return null; } };
export const fetchGameState = async (token: string): Promise<GameState> => {
  const base = getSupabaseFunctionsBaseUrl();
  if (!base) throw new Error('supabase_not_configured');
  const response = await fetch(`${base}/game-state`, { headers: { Authorization: `Bearer ${token}` } });
  const json = await readJson(response);
  if (!response.ok || !json?.ok) throw new Error(json?.error?.code ?? 'game_state_failed');
  return json.gameState as GameState;
};
export const performGachaSummon = async (token: string, bannerId: string, pullCount: 1 | 10): Promise<SummonResult> => {
  const base = getSupabaseFunctionsBaseUrl();
  if (!base) throw new Error('supabase_not_configured');
  const response = await fetch(`${base}/gacha-summon`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ bannerId, pullCount }) });
  const json = await readJson(response);
  if (!response.ok || !json?.ok) return { ok: false, error: json?.error ?? { code: 'summon_failed', message: 'Summon failed.' } };
  return json as SummonResult;
};
