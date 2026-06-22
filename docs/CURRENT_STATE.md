# Estado atual oficial | Veyra: Aetherfall

Este documento registra o estado real atual do projeto e deve ser tratado como fonte oficial para novas tarefas do Codex. Não presuma funcionalidades que não estejam descritas aqui ou nos documentos de plano aprovados.

## Produto

- **Nome:** Veyra: Aetherfall.
- **Gênero:** RPG gacha dark aether fantasy.
- **Plataforma principal:** Telegram Mini App.
- **Orientação:** mobile portrait.
- **Status:** MVP frontend publicado com autenticação Telegram, player bootstrap, fundação real de sistemas core via Supabase/Edge Functions e shell visual mobile-first em evolução.

## Stack

- React.
- Vite SPA.
- TypeScript.
- Tailwind CSS.
- Vercel.
- Supabase com migrations e Edge Functions para auth, player bootstrap e fundação da Fase 3.
- Telegram Mini App validado em fluxo real.
- Monetag preparado/mock.
- TON Connect preparado/mock.
- Telegram Stars preparado/mock.

## Produção e validação real

- GitHub conectado.
- Vercel conectada à `main`.
- Deploy automático ativo.
- Supabase integrado à Vercel.
- Variáveis públicas Vite configuradas.
- Telegram Auth, sessão Veyra e Player Bootstrap foram implementados, aplicados/deployados e testados no Mini App.
- A migration da Fase 3 foi aplicada manualmente no Supabase.
- O workflow de Edge Functions foi executado para disponibilizar as funções necessárias.
- O Mini App foi testado após a Fase 3.
- `game-state` carregou estado do jogador autenticado.
- Starter pack funcionou uma única vez por jogador.
- Summon 1x e 10x funcionaram via servidor.
- Currencies, pity, duplicatas, hero shards e soul dust foram testados como foundation real.

## Telas existentes

- Home.
- Heroes.
- Battle.
- Dungeons.
- Summon.
- Shop.
- Wallet.
- Fonte do Aether.

## DONE

- Telegram Auth server-side.
- Player Bootstrap.
- Player Core Profile.
- Fase 3 — Core Game Systems Foundation aplicada e testada.
- Game-state Edge Function.
- Starter Pack server-side, com claim único.
- Gacha-summon Edge Function para summon 1x e 10x.
- Currencies foundation.
- Hero catalog foundation.
- Banners foundation.
- Pity foundation.
- Duplicate conversion foundation com hero shards e soul dust.
- Fase 4A.0 — tokens CSS e fundação visual.
- Fase 4A.1 — pipeline de assets 2D com manifesto, placeholders e componentes utilitários.
- Fase 4A.2 — Game Shell + Topbar + Bottom Nav com fallback seguro de backgrounds e assets dinâmicos.

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

## MOCK / SHELL

- Home UI.
- Heroes UI.
- Battle UI.
- Campaign UI.
- Shop UI.
- Algumas partes visuais do frontend ainda usam mock/shell para apresentação.
- Assets reais finais ainda dependem de packs licenciados e registro em `docs/ASSET_LICENSES.md`.

## BLOCKED / FUTURE

- TON real.
- Gram real.
- Telegram Stars reais.
- Aether Fragments reais.
- Withdrawals/saques.
- Marketplace.
- NFT.

## Estado de segurança

- `initDataUnsafe` é somente para UI.
- `initData` é validado no servidor antes de sessão real.
- Tokens Veyra não ficam em `localStorage`, `sessionStorage` ou cookies.
- Publishable key do Supabase é permitida no frontend.
- Supabase service role é proibida no frontend e não é exposta.
- O frontend não sorteia gacha.
- O frontend não entrega resources, moedas, rewards, shards, soul dust ou starter pack.
- Starter pack e summon são server-side.
- RPCs críticas são `service_role` only.
- RLS permanece habilitada nas tabelas públicas de gameplay, sem policy pública para operações críticas.
- Rewards econômicos, pagamentos, TON/Gram, Stars, Aether Fragments, marketplace, NFT e saques seguem bloqueados até fases específicas.

## Últimas etapas concluídas

- Fase 2 concluída com Telegram Auth, Player Bootstrap e Player Core Profile.
- Fase 3 concluída como Core Game Systems Foundation.
- Migration da Fase 3 aplicada manualmente no Supabase.
- Workflow de Edge Functions executado.
- Teste real no Telegram Mini App concluído para game-state, starter pack, summon 1x, summon 10x, currencies, pity e conversão de duplicatas.
- Fase 4A.1 concluiu a fundação do pipeline de assets.
- Fase 4A.2 aplicou o pipeline no shell principal e corrigiu fallbacks de background/imagem apontados no review do PR #19.

## Próxima fase autorizada

- **Fase 4B — Home RPG Premium.**
- A próxima subfase deve evoluir a Home com experiência RPG premium usando tokens e asset pipeline já criados, mantendo placeholders locais até que packs externos sejam registrados e sem implementar novos sistemas de economia ou autoridade client-side.

## Terminologia Gram / TON

- A UI futura deve exibir o token como Gram (GRAM), usando "Gram (antiga Toncoin)" quando a transição precisar ficar clara.
- A rede/protocolo continua documentada como TON / The Open Network.
- TON Connect continua sendo o termo técnico da integração wallet.
- Identificadores técnicos futuros podem continuar usando `ton_*` até decisão arquitetural específica.
- Nenhum pagamento, saque ou saldo real foi implementado.

## Limites atuais

- O cliente pode apresentar previews, mocks, shells visuais e estados locais de MVP para partes ainda não migradas.
- O cliente não é autoridade para autenticação, moedas, rewards, compras, stamina, gacha, pity, batalha, dungeons ou saques.
- Qualquer evolução real de battle result, dungeon result, upgrades, ads, pagamentos, Stars, TON/Gram, Aether Fragments, marketplace, NFT ou saques depende de backend, RLS, validação server-side, idempotência e auditoria.
