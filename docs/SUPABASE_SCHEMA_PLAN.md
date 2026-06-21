# Plano de Schema Supabase

Este documento registra o estado oficial de schema após a Fase 3. A Fase 3 — Core Game Systems Foundation foi concluída, aplicada manualmente no Supabase e testada no Telegram Mini App.

## Implementado/aplicado até a Fase 3

- Player bootstrap e core profile em `public.veyra_players`.
- Game-state foundation.
- Starter Pack server-side com claim único.
- Currencies foundation.
- Hero catalog foundation.
- Banners foundation.
- Pity foundation.
- Duplicate conversion foundation com hero shards e soul dust.
- Gacha-summon server-side foundation para summon 1x e 10x.

## Segurança de schema atual

- RLS permanece habilitada nas tabelas públicas relevantes.
- O frontend não deve ler/escrever diretamente tabelas críticas para conceder recursos.
- RPCs críticas permanecem restritas a `service_role` no servidor.
- Não há grants públicos para operações econômicas críticas.
- Supabase service role não é exposta ao frontend.

## PREPARED

- Battle loop.
- Campaign progression real.
- Dungeon result real.
- Hero upgrade execution.
- Gear.
- Ads claim validation.
- Guild.
- Raid.
- Events.

## BLOCKED / FUTURE

- TON real.
- Gram real.
- Telegram Stars reais.
- Aether Fragments reais.
- Withdrawals/saques.
- Marketplace.
- NFT.

## Tabelas/sistemas futuros ainda planejados

Nomes finais podem mudar em migrations futuras. Nenhum item abaixo deve ser tratado como disponível apenas por constar no plano.

- `player_dungeon_runs`.
- `player_ad_claims`.
- `player_aether_fountain`.
- `player_wallets`.
- `purchase_history`.
- `stars_orders`.
- `ton_payments`.
- `aether_balances`.
- `aether_ledger`.
- `reward_pools`.
- `withdrawals`.
- `fraud_flags`.

## Terminologia de schema

- Tabelas e colunas planejadas com prefixo `ton_*` representam a rede/protocolo TON.
- A UI pode exibir o ativo como Gram/GRAM.
- Renomear schema para `gram_*` exige ADR futura e migração específica.
