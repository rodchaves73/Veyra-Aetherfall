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
