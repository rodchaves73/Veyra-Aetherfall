import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { buildCorsHeaders, handleOptions } from "../_shared/cors.ts";
import { SessionTokenError, verifySessionToken } from "../_shared/sessionToken.ts";
Deno.serve(async (request: Request) => {
  const options = handleOptions(request); if (options) return withNoStore(options);
  const cors = buildCorsHeaders(request); if (!cors.allowed) return jsonError(403, 'origin_forbidden', 'Origin is not allowed.', cors.headers);
  if (request.method !== 'GET') return jsonError(405, 'method_not_allowed', 'Method not allowed.', cors.headers);
  const config = readConfig(); if (!config) return jsonError(503, 'config_missing', 'Game state is not configured.', cors.headers);
  const token = getBearerToken(request); if (!token) return jsonError(401, 'invalid_session', 'Session token is required.', cors.headers);
  try {
    const claims = await verifySessionToken({ token, secret: config.sessionSecret, nowSeconds: Math.floor(Date.now() / 1000) });
    const supabase = createClient(config.supabaseUrl, config.serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: player, error: playerError } = await supabase.from('veyra_players').select('id, telegram_user_id, display_name, account_status, player_level, player_xp, power_score, campaign_chapter, campaign_stage, onboarding_status, last_bootstrap_at').eq('telegram_user_id', claims.user.id).single();
    if (playerError || !player) return jsonError(404, 'player_not_found', 'Player was not found.', cors.headers);
    const { data: starterResult, error: starterError } = await supabase.rpc('veyra_claim_starter_pack', { p_player_id: player.id });
    if (starterError) return jsonError(500, 'game_state_failed', 'Game state failed.', cors.headers);
    const [currencies, heroes, shards, banners, pity] = await Promise.all([
      supabase.from('veyra_player_currencies').select('*').eq('player_id', player.id).maybeSingle(),
      supabase.from('veyra_player_heroes').select('id, hero_id, level, stars, power_score, veyra_game_heroes(name, rarity, element, class, race, faction)').eq('player_id', player.id),
      supabase.from('veyra_hero_shards').select('hero_id, quantity').eq('player_id', player.id),
      supabase.from('veyra_gacha_banners').select('*').eq('is_active', true),
      supabase.from('veyra_gacha_pity').select('*').eq('player_id', player.id),
    ]);
    return jsonResponse(200, { ok: true, gameState: { player, currencies: currencies.data ?? {}, heroes: heroes.data ?? [], heroShards: shards.data ?? [], banners: (banners.data ?? []).map(mapBanner), pity: pity.data ?? [], starter: { granted: Boolean(starterResult?.starterGranted ?? starterResult?.starter_granted ?? true), grantedAt: starterResult?.grantedAt ?? starterResult?.granted_at ?? null }, featureFlags: { serverGacha: true, adClaims: false, battleRewards: false } } }, cors.headers);
  } catch (error) { if (error instanceof SessionTokenError) return jsonError(401, 'invalid_session', 'Session token is invalid or expired.', cors.headers); return jsonError(500, 'internal_error', 'Internal game state error.', cors.headers); }
});
function mapBanner(row: Record<string, unknown>) { return { id: row.id, name: row.name, bannerType: row.banner_type, tokenType: row.token_type, pityGroup: row.pity_group, rates: row.rates, featuredHeroIds: row.featured_hero_ids ?? [], startsAt: row.starts_at, endsAt: row.ends_at, isActive: row.is_active }; }
function readConfig() { const supabaseUrl = Deno.env.get('SUPABASE_URL'); const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'); const sessionSecret = Deno.env.get('VEYRA_SESSION_SECRET'); return supabaseUrl && serviceRoleKey && sessionSecret ? { supabaseUrl, serviceRoleKey, sessionSecret } : null; }
function getBearerToken(request: Request) { return /^Bearer\s+(.+)$/i.exec(request.headers.get('Authorization') ?? '')?.[1]?.trim() || null; }
function jsonError(status: number, code: string, message: string, headers: Headers) { return jsonResponse(status, { ok: false, error: { code, message } }, headers); }
function jsonResponse(status: number, body: unknown, headers: Headers) { const h = new Headers(headers); h.set('Content-Type', 'application/json; charset=utf-8'); h.set('Cache-Control', 'no-store'); return new Response(JSON.stringify(body), { status, headers: h }); }
function withNoStore(response: Response) { response.headers.set('Cache-Control', 'no-store'); return response; }
declare const Deno: { env: { get(name: string): string | undefined }; serve(handler: (request: Request) => Response | Promise<Response>): void };
