# Plano de Validação Server-Side

Funções futuras recomendadas:

- `validateTelegramInitData`
- `bootstrapPlayer`
- `getPlayerState`
- `performSummon`
- `finishBattle`
- `claimBattleReward`
- `claimAdReward`
- `claimAetherFountainReward`
- `enterDungeon`
- `finishDungeon`
- `upgradeHero`
- `upgradeSkill`
- `ascendHero`
- `starUpHero`
- `equipGear`
- `validateStarsPurchase`
- `validateTonPayment`
- `grantAetherFragments`
- `calculateWeeklyRewardPool`
- `requestWithdrawal`
- `approveWithdrawal`
- `markWithdrawalPaid`
- `flagSuspiciousActivity`

No MVP SPA, tudo que altera inventário e economia permanece mock/local.

## Terminologia de pagamento

- Funções técnicas futuras podem manter nomes `validateTonPayment`, `ton_address` e `ton_payments`.
- A resposta de UI pode exibir Gram/GRAM.
- Qualquer crédito de Gram em conta do jogador exige validação server-side, idempotência e auditoria.


## Fase 2D | Player bootstrap

A Edge Function `player-bootstrap` implementa o primeiro bootstrap real mínimo:

- exige `Authorization: Bearer <veyra-session-token>`;
- valida a sessão Veyra com `verifySessionToken`;
- usa apenas o `telegram_user_id` vindo da sessão validada, nunca dados client-side;
- faz upsert/select de `public.veyra_players`;
- atualiza `last_seen_at`;
- retorna somente player seguro para o frontend.

Ela não valida nem persiste inventário, moedas, stamina, rewards, gacha, pity, batalha ou dungeon.


## Fase 2E/2F | Read model seguro do player

`player-bootstrap` passa a retornar somente um read model seguro do player após validar a sessão Veyra. O read model inclui identidade interna mínima, status de conta e `profile` com level, XP, power, capítulo, stage, onboarding e último bootstrap.

A função não aceita valores de profile enviados pelo cliente e não sobrescreve progresso existente no bootstrap; apenas atualiza metadados de Telegram, `last_seen_at` e `last_bootstrap_at`. Inventário, moedas, stamina, rewards, gacha, pity, batalha e dungeon continuam fora do escopo.

## Atualização Fase 3 | Core game systems foundation

- Preparada fundação real de game-state, starter pack, moedas, tickets, catálogo inicial de heróis, banners, pity, summon server-side, duplicatas, hero shards, soul dust, progressão de heróis, regras puras de combate, conteúdo base e contratos de ads.
- Novas operações críticas são server-side via Supabase Edge Functions e funções SQL transacionais; o frontend não sorteia gacha nem entrega recursos.
- RLS fica habilitado nas novas tabelas, sem policy pública e sem grants para `anon` ou `authenticated`.
- Ainda planejado: battle/dungeon result persistente, guilda, raid, eventos funcionais, Monetag real, pagamentos, Stars, TON/Gram, marketplace, NFT, Aether Fragments e saques.
