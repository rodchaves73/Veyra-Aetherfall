# Estado atual oficial | Veyra: Aetherfall

Este documento registra o estado real atual do projeto e deve ser tratado como fonte oficial para novas tarefas do Codex. Não presuma funcionalidades que não estejam descritas aqui ou nos documentos de plano aprovados.

## Produto

- **Nome:** Veyra: Aetherfall.
- **Gênero:** RPG gacha dark aether fantasy.
- **Plataforma principal:** Telegram Mini App.
- **Orientação:** mobile portrait.
- **Status:** MVP frontend publicado.

## Stack

- React.
- Vite SPA.
- TypeScript.
- Tailwind CSS.
- Vercel.
- Supabase preparado.
- Supabase Edge Functions de autenticação Telegram preparadas em código, ainda sem deploy.
- Telegram Mini App preparado.
- Monetag preparado/mock.
- TON Connect preparado/mock.
- Telegram Stars preparado/mock.

## Produção

- GitHub conectado.
- Vercel conectada à `main`.
- Deploy automático ativo.
- Supabase integrado à Vercel.
- Variáveis públicas Vite configuradas.
- Nenhuma persistência real do jogador ainda.

## Telas existentes

- Home.
- Heroes.
- Battle.
- Dungeons.
- Summon.
- Shop.
- Wallet.
- Fonte do Aether.

## Implementado localmente

- Catálogo de heróis.
- Coleção mock.
- Inventário mock.
- Campanha mock.
- Dungeons mock.
- Gacha mock.
- Pity visual.
- Battle auto turn-based MVP.
- Elementos.
- Power score.
- Progression helpers.
- Ad reward limits mock.
- Fonte do Aether mock.
- Wallet e shop preparadas.

## Ainda não implementado de forma real

- Sessão Telegram validada em produção.
- Autenticação server-side implantada e integrada ao frontend.
- Perfil persistido.
- Inventário persistido.
- Heróis persistidos.
- Stamina persistida.
- Campaign progress persistido.
- Battle finish server-side.
- Dungeon finish server-side.
- Gacha server-side.
- Pity server-side.
- Monetag validada.
- Stars reais.
- TON real.
- Aether Fragments reais.
- Saques.
- Antifraude.

## Estado de segurança

- `initDataUnsafe` é somente para UI.
- `initData` precisa ser validado no servidor antes de sessão real.
- Publishable key do Supabase é permitida no frontend.
- Service role é proibida no frontend.
- Rewards e moedas reais estão bloqueados até backend com autoridade server-side.
- RLS é obrigatória nas futuras tabelas públicas.

## Etapas concluídas

A Fase 1 de governança foi concluída e mergeada, incluindo a fonte oficial de contexto, roadmap, decisões arquiteturais e status de features.

A auditoria pós-deploy mobile foi concluída, incluindo:

- safe area;
- scroll;
- overflow;
- BottomNav;
- Topbar;
- modal;
- chamadas `ready()` e `expand()` do Telegram WebApp dentro de `useEffect`.

## Estado da Fase 2A

- **Fase 2A:** fundação server-side de autenticação Telegram implementada em código após esta tarefa.
- Foram preparados validador de `initData`, assinatura/verificação de sessão Veyra, Edge Functions e testes Deno.
- A autenticação ainda não está implantada.
- Não existe sessão real em produção.
- Nenhum player foi persistido.

## Próxima etapa autorizada

- **Fase 2B:** configurar secrets, fazer deploy das Edge Functions, testar em ambiente real e integrar o frontend.
- A Fase 2B não deve ser implementada nesta tarefa.

## Limites atuais

- O cliente pode apresentar previews, mocks e estados locais de MVP.
- O cliente não é autoridade para autenticação, moedas, rewards, compras, stamina, gacha, pity, batalha, dungeons ou saques.
- Qualquer evolução real de economia, persistência ou pagamentos depende de backend, RLS, validação server-side, idempotência e auditoria.
