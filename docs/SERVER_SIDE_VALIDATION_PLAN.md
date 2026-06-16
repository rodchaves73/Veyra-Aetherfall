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
