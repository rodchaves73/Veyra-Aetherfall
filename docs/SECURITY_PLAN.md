# Plano de Segurança

Veyra: Aetherfall é um Vite SPA mobile-first para Telegram Mini App. Após a Fase 3, autenticação, bootstrap de jogador, profile core, game-state, starter pack e summon foundation usam autoridade server-side. Partes visuais do frontend ainda podem ser mock/shell.

## Princípios

- Nenhuma secret no frontend.
- Service role do Supabase nunca deve entrar no browser.
- Telegram `initDataUnsafe` é apenas conveniência visual.
- Autenticação real usa `initData` validado server-side.
- Gacha, pity, starter pack, inventário e resources reais são server-side.
- Rewarded ads, pagamentos, saques e sistemas financeiros reais devem ser validados server-side em fases específicas.
- Gold, Gems, Aether Shards, Stamina, materiais e Hero XP nunca viram TON/Gram.

## Confirmado pós-Fase 3

- Telegram Auth, Player Bootstrap e Player Core Profile estão DONE.
- `game-state` carregou no Mini App.
- Starter Pack funcionou uma única vez por jogador via servidor.
- Summon 1x e 10x funcionaram via servidor.
- Currencies, pity, duplicatas, hero shards e soul dust foram testados como foundation real.

## Garantias de segurança mantidas

- O frontend não sorteia gacha.
- O frontend não entrega resources, moedas, rewards, starter pack, shards ou soul dust.
- Starter pack e summon são server-side.
- RPCs críticas são `service_role` only.
- Tokens Veyra não ficam em `localStorage`, `sessionStorage` ou cookies.
- Supabase service role não é exposta.
- RLS permanece habilitada nas tabelas públicas relevantes.
- Respostas não devem expor token, `Authorization`, `initData`, hash, payload bruto do Telegram, service role ou segredo de sessão.

## Obrigatório antes de novas features críticas

- Battle rewards precisam validação e persistência server-side específicas.
- Dungeon rewards precisam validação e persistência server-side específicas.
- Hero upgrades reais precisam custos e execução atômica server-side.
- Monetag rewards devem ser validados server-side.
- TON/Gram payments devem ser verificados on-chain antes de crédito.
- Telegram Stars precisam confirmação oficial antes de reward.
- Aether Fragments precisam antifraude e revisão econômica/jurídica.
- Withdraw precisa revisão manual no início.
- `.env` real nunca no Git.

## Gram / TON

- Gram/GRAM pode ser usado como copy de UI.
- TON / The Open Network continua sendo a camada técnica.
- TON Connect continua sendo o conector técnico.
- Nenhum saldo, pagamento ou saque em Gram deve ser confiado ao cliente.
- Não existe conversão garantida entre recursos internos e Gram.

## Sistemas bloqueados/futuros

- TON real.
- Gram real.
- Telegram Stars reais.
- Aether Fragments reais.
- Withdrawals/saques.
- Marketplace.
- NFT.
