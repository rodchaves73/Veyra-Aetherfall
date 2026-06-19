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


## Fase 2D | Bootstrap seguro de player

- `SUPABASE_SERVICE_ROLE_KEY` é usada somente na Edge Function `player-bootstrap`, nunca no frontend.
- `public.veyra_players` tem RLS habilitado e nenhuma policy pública nesta fase.
- O frontend não acessa a tabela diretamente; ele chama a Edge Function com sessão Veyra em memória.
- O token Veyra é passado por callback de auth e não é renderizado, persistido, logado, salvo em `localStorage`, `sessionStorage` ou cookie.
- A resposta do bootstrap omite payload bruto do Telegram, `initData`, hash, `Authorization`, token e dados server-side sensíveis.


## Fase 2E/2F | Segurança do profile read model

- O profile read model é retornado somente após sessão Veyra válida.
- O frontend continua sem acesso direto à tabela `public.veyra_players`.
- RLS permanece ativo e nenhuma policy pública foi adicionada.
- `service_role` continua restrita às Edge Functions.
- A resposta não expõe token, `Authorization`, `initData`, hash, payload bruto do Telegram, service role ou segredo de sessão.
