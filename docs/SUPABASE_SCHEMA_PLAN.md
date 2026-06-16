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
