# Plano de Segurança

Veyra: Aetherfall é um Vite SPA mobile-first para Telegram Mini App. O MVP usa estado local/mockado para gameplay, economia, summon, battle rewards, Monetag, Stars e TON, mantendo integração real para uma etapa server-side futura.

## Princípios

- Nenhuma secret no frontend.
- Service role do Supabase nunca deve entrar no browser.
- Telegram `initDataUnsafe` é apenas conveniência visual.
- Gacha, pity, rewarded ads, pagamentos, saques, inventário e rewards reais devem ser validados server-side.
- Gold, Gems, Aether Shards, Stamina, materiais e Hero XP nunca viram TON.

## Obrigatório antes de produção

- Telegram initData deve ser validado server-side.
- Monetag rewards devem ser validados server-side.
- TON payments devem ser verificados on-chain antes de crédito.
- Telegram Stars precisam confirmação oficial antes de reward.
- Gacha precisa ser server-side.
- Pity precisa ser server-side.
- Battle rewards precisam ser server-side.
- Inventory changes precisam ser server-side.
- Aether Fragments precisam antifraude.
- Withdraw precisa revisão manual no início.
- `.env` real nunca no Git.

## Gram / TON

- Gram/GRAM pode ser usado como copy de UI.
- TON / The Open Network continua sendo a camada técnica.
- TON Connect continua sendo o conector técnico.
- Nenhum saldo, pagamento ou saque em Gram deve ser confiado ao cliente.
- Não existe conversão garantida entre recursos internos e Gram.
