# Plano de Schema Supabase

Tabelas futuras planejadas:

- `players`
- `player_profiles`
- `player_inventory`
- `player_heroes`
- `player_gacha_state`
- `player_campaign_progress`
- `player_dungeon_runs`
- `player_ad_claims`
- `player_aether_fountain`
- `player_wallets`
- `purchase_history`
- `stars_orders`
- `ton_payments`
- `aether_balances`
- `aether_ledger`
- `reward_pools`
- `withdrawals`
- `fraud_flags`

Use RLS, Edge Functions e service role apenas em ambiente server-side seguro.

## Terminologia de schema

- Tabelas e colunas planejadas com prefixo `ton_*` representam a rede/protocolo TON.
- A UI pode exibir o ativo como Gram/GRAM.
- Renomear schema para `gram_*` exige ADR futura e migração específica.


## Fase 2D | `public.veyra_players`

A migration `202606180001_create_veyra_players.sql` prepara a tabela mínima `public.veyra_players` para bootstrap server-side do jogador real.

Campos principais:

- `id` UUID interno.
- `telegram_user_id` único, derivado da sessão Veyra validada server-side.
- Metadados mínimos do Telegram normalizados para bootstrap.
- `display_name`, `account_status`, `created_at`, `updated_at` e `last_seen_at`.

RLS fica habilitado sem policy pública. O frontend não deve ler a tabela diretamente; acesso real ocorre via Edge Function com service role no servidor. Inventário, economia, rewards e gameplay persistidos continuam planejados.
