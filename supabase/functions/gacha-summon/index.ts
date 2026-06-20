import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { buildCorsHeaders, handleOptions } from "../_shared/cors.ts";
import { SessionTokenError, verifySessionToken } from "../_shared/sessionToken.ts";
Deno.serve(async (request: Request) => {
  const options = handleOptions(request); if (options) return withNoStore(options);
  const cors = buildCorsHeaders(request); if (!cors.allowed) return jsonError(403, 'origin_forbidden', 'Origin is not allowed.', cors.headers);
  if (request.method !== 'POST') return jsonError(405, 'method_not_allowed', 'Method not allowed.', cors.headers);
  const config = readConfig(); if (!config) return jsonError(503, 'config_missing', 'Gacha summon is not configured.', cors.headers);
  const token = getBearerToken(request); if (!token) return jsonError(401, 'invalid_session', 'Session token is required.', cors.headers);
  const body = await readBody(request); if (!body) return jsonError(400, 'invalid_json', 'Invalid JSON body.', cors.headers);
  const bannerId = typeof body.bannerId === 'string' ? body.bannerId : ''; const pullCount = body.pullCount === 10 ? 10 : body.pullCount === 1 ? 1 : 0;
  if (!bannerId) return jsonError(400, 'invalid_banner', 'Banner is invalid.', cors.headers); if (!pullCount) return jsonError(400, 'invalid_pull_count', 'Pull count must be 1 or 10.', cors.headers);
  try {
    const claims = await verifySessionToken({ token, secret: config.sessionSecret, nowSeconds: Math.floor(Date.now() / 1000) });
    const supabase = createClient(config.supabaseUrl, config.serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: player } = await supabase.from('veyra_players').select('id').eq('telegram_user_id', claims.user.id).single();
    if (!player) return jsonError(404, 'player_not_found', 'Player was not found.', cors.headers);
    const { data, error } = await supabase.rpc('veyra_perform_gacha_summon', { p_player_id: player.id, p_banner_id: bannerId, p_pull_count: pullCount });
    if (error) return jsonError(400, mapRpcError(error.message), 'Summon failed.', cors.headers);
    return jsonResponse(200, { ok: true, ...data }, cors.headers);
  } catch (error) { if (error instanceof SessionTokenError) return jsonError(401, 'invalid_session', 'Session token is invalid or expired.', cors.headers); return jsonError(500, 'summon_failed', 'Summon failed.', cors.headers); }
});
async function readBody(request: Request): Promise<Record<string, unknown> | null> { try { const value = await request.json(); return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null; } catch { return null; } }
function mapRpcError(message: string) { return ['invalid_banner', 'inactive_banner', 'invalid_pull_count', 'insufficient_currency'].find((code) => message.includes(code)) ?? 'summon_failed'; }
function readConfig() { const supabaseUrl = Deno.env.get('SUPABASE_URL'); const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'); const sessionSecret = Deno.env.get('VEYRA_SESSION_SECRET'); return supabaseUrl && serviceRoleKey && sessionSecret ? { supabaseUrl, serviceRoleKey, sessionSecret } : null; }
function getBearerToken(request: Request) { return /^Bearer\s+(.+)$/i.exec(request.headers.get('Authorization') ?? '')?.[1]?.trim() || null; }
function jsonError(status: number, code: string, message: string, headers: Headers) { return jsonResponse(status, { ok: false, error: { code, message } }, headers); }
function jsonResponse(status: number, body: unknown, headers: Headers) { const h = new Headers(headers); h.set('Content-Type', 'application/json; charset=utf-8'); h.set('Cache-Control', 'no-store'); return new Response(JSON.stringify(body), { status, headers: h }); }
function withNoStore(response: Response) { response.headers.set('Cache-Control', 'no-store'); return response; }
declare const Deno: { env: { get(name: string): string | undefined }; serve(handler: (request: Request) => Response | Promise<Response>): void };
