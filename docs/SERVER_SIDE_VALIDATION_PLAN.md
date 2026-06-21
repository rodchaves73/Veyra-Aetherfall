# Plano de Validação Server-Side

Este documento registra a autoridade server-side oficial após a Fase 3. No estado atual, Telegram Auth, Player Bootstrap, Player Core Profile e Core Game Systems Foundation estão concluídos/testados.

## DONE

- Validação server-side de `initData` para Telegram Auth.
- Sessão Veyra curta validada no servidor.
- Player Bootstrap server-side.
- Player Core Profile seguro.
- `game-state` foundation carregando no Mini App.
- Starter Pack server-side com claim único.
- `gacha-summon` server-side foundation para summon 1x e 10x.
- Currencies foundation.
- Hero catalog foundation.
- Banners foundation.
- Pity foundation.
- Duplicate conversion foundation com shards e soul dust.

## PREPARED

- `finishBattle` e persistência de resultado de batalha.
- `finishDungeon` e persistência de resultado de dungeon.
- Campaign progression real.
- Execução real de hero upgrades.
- Gear.
- `claimAdReward` com validação antiabuso.
- Guild.
- Raid.
- Events.

## Funções futuras recomendadas

- `claimBattleReward`.
- `claimAdReward`.
- `claimAetherFountainReward`.
- `enterDungeon`.
- `finishDungeon`.
- `upgradeHero`.
- `upgradeSkill`.
- `ascendHero`.
- `starUpHero`.
- `equipGear`.
- `validateStarsPurchase`.
- `validateTonPayment`.
- `grantAetherFragments`.
- `calculateWeeklyRewardPool`.
- `requestWithdrawal`.
- `approveWithdrawal`.
- `markWithdrawalPaid`.
- `flagSuspiciousActivity`.

## Regras obrigatórias mantidas

- O frontend não sorteia gacha.
- O frontend não entrega resources, moedas, starter pack, shards, soul dust ou rewards.
- Starter pack e summon são server-side.
- Operações críticas usam service role apenas em Edge Functions/RPCs seguras.
- Tokens não devem ser salvos em `localStorage`, `sessionStorage` ou cookies.
- Supabase service role não é exposta ao frontend.

## Terminologia de pagamento

- Funções técnicas futuras podem manter nomes `validateTonPayment`, `ton_address` e `ton_payments`.
- A resposta de UI pode exibir Gram/GRAM.
- Qualquer crédito de Gram em conta do jogador exige validação server-side, idempotência e auditoria.
