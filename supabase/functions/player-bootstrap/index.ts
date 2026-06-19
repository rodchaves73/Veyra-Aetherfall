import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { buildCorsHeaders, handleOptions } from "../_shared/cors.ts";
import {
  SessionTokenError,
  verifySessionToken,
} from "../_shared/sessionToken.ts";
import type { NormalizedTelegramUser } from "../_shared/telegramInitData.ts";

type AccountStatus = "active" | "limited" | "banned" | "deleted";

type PlayerRow = {
  id: string;
  telegram_user_id: number;
  display_name: string;
  account_status: AccountStatus;
  created_at: string;
  updated_at: string;
  last_seen_at: string;
};

Deno.serve(async (request: Request) => {
  const options = handleOptions(request);
  if (options) return withNoStore(options);

  const cors = buildCorsHeaders(request);
  if (!cors.allowed) {
    return jsonError(
      403,
      "ORIGIN_FORBIDDEN",
      "Origin is not allowed.",
      cors.headers,
    );
  }

  if (request.method !== "GET") {
    return jsonError(
      405,
      "METHOD_NOT_ALLOWED",
      "Method not allowed.",
      cors.headers,
    );
  }

  const config = readConfig();
  if (!config) {
    return jsonError(
      503,
      "CONFIG_MISSING",
      "Player bootstrap is not configured.",
      cors.headers,
    );
  }

  const token = getBearerToken(request);
  if (!token) {
    return jsonError(
      401,
      "AUTHORIZATION_INVALID",
      "Session token is required.",
      cors.headers,
    );
  }

  try {
    const claims = await verifySessionToken({
      token,
      secret: config.sessionSecret,
      nowSeconds: Math.floor(Date.now() / 1000),
    });
    const user = claims.user;
    const supabase = createClient(config.supabaseUrl, config.serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("veyra_players")
      .upsert({
        telegram_user_id: user.id,
        telegram_username: optionalText(user.username),
        telegram_first_name: user.firstName,
        telegram_last_name: optionalText(user.lastName),
        telegram_language_code: optionalText(user.languageCode),
        telegram_is_premium: typeof user.isPremium === "boolean"
          ? user.isPremium
          : null,
        telegram_photo_url: optionalText(user.photoUrl),
        display_name: buildDisplayName(user),
        last_seen_at: now,
      }, { onConflict: "telegram_user_id" })
      .select(
        "id, telegram_user_id, display_name, account_status, created_at, updated_at, last_seen_at",
      )
      .single<PlayerRow>();

    if (error || !data) {
      console.error("Player bootstrap persistence failed.", {
        code: error?.code,
        message: error?.message,
        details: error?.details,
        hint: error?.hint,
      });
      return jsonError(
        500,
        "PLAYER_BOOTSTRAP_FAILED",
        "Player bootstrap failed.",
        cors.headers,
      );
    }

    if (data.account_status === "banned" || data.account_status === "deleted") {
      return jsonError(
        403,
        "ACCOUNT_BLOCKED",
        "Player account is not available.",
        cors.headers,
      );
    }

    return jsonResponse(200, {
      ok: true,
      player: {
        id: data.id,
        telegramUserId: data.telegram_user_id,
        displayName: data.display_name,
        accountStatus: data.account_status,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        lastSeenAt: data.last_seen_at,
      },
    }, cors.headers);
  } catch (error) {
    if (error instanceof SessionTokenError) {
      return jsonError(
        401,
        error.code,
        "Session token is invalid or expired.",
        cors.headers,
      );
    }
    console.error("Player bootstrap internal error.");
    return jsonError(
      500,
      "INTERNAL_ERROR",
      "Internal player bootstrap error.",
      cors.headers,
    );
  }
});

function readConfig(): {
  supabaseUrl: string;
  serviceRoleKey: string;
  sessionSecret: string;
} | null {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const sessionSecret = Deno.env.get("VEYRA_SESSION_SECRET");
  if (!supabaseUrl || !serviceRoleKey || !sessionSecret) return null;
  return { supabaseUrl, serviceRoleKey, sessionSecret };
}

function getBearerToken(request: Request): string | null {
  const authorization = request.headers.get("Authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(authorization);
  return match?.[1]?.trim() || null;
}

function buildDisplayName(user: NormalizedTelegramUser): string {
  const username = optionalText(user.username);
  if (username) return `@${username}`;
  const names = [user.firstName, user.lastName].map(optionalText).filter(Boolean);
  return names.join(" ").trim() || "Veyra Player";
}

function optionalText(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : null;
}

function jsonError(
  status: number,
  code: string,
  message: string,
  headers: Headers,
): Response {
  return jsonResponse(status, { ok: false, error: { code, message } }, headers);
}

function jsonResponse(
  status: number,
  body: unknown,
  headers: Headers,
): Response {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Content-Type", "application/json; charset=utf-8");
  responseHeaders.set("Cache-Control", "no-store");
  return new Response(JSON.stringify(body), { status, headers: responseHeaders });
}

function withNoStore(response: Response): Response {
  response.headers.set("Cache-Control", "no-store");
  return response;
}

declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};
