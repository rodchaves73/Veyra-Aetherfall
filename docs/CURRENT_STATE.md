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
- Autenticação server-side implantada.
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

## Última etapa concluída

A auditoria pós-deploy mobile foi concluída, incluindo:

- safe area;
- scroll;
- overflow;
- BottomNav;
- Topbar;
- modal;
- chamadas `ready()` e `expand()` do Telegram WebApp dentro de `useEffect`.

## Próxima fase autorizada

- **Fase 2C:** integração frontend auth controlada após deploy manual, configuração de secrets e teste real do Telegram Mini App.
- A Fase 2B preparou validação e documentação operacional.
- A Fase 2B.1 preparou um workflow manual de GitHub Actions para deploy controlado das Edge Functions `telegram-auth` e `telegram-session`, mas o workflow não foi executado nesta tarefa e nenhuma sessão real existe em produção.

## Fase 2A | Telegram Auth Server Foundation

- Fase 2A mergeada na `main` pelo PR #7.
- Validador server-side de `initData` preparado em código.
- Sessão curta própria do Veyra preparada em código.
- Edge Functions Supabase `telegram-auth` e `telegram-session` preparadas, ainda não implantadas.
- Contrato técnico documentado em `docs/TELEGRAM_AUTH_CONTRACT.md`.
- Nenhuma persistência, Supabase Auth, banco, RLS, frontend auth real ou sessão real em produção foi implementada.

## Fase 2B | Telegram Auth Deploy Readiness

- Documentação operacional de deploy criada em `docs/TELEGRAM_AUTH_DEPLOYMENT.md`.
- Plano de validação real criado em `docs/TELEGRAM_AUTH_VALIDATION.md`.
- Deno não existia no ambiente inicial e foi instalado temporariamente fora do repositório em `/tmp/veyra-deno` para validações.
- Supabase CLI não existia no ambiente inicial; deploy e listagem remota ficaram para ambiente humano autenticado.
- Edge Functions ainda não foram implantadas nesta tarefa.
- Secrets reais ainda não foram configurados nesta tarefa.
- Auth real permanece bloqueada até deploy manual revisado, secrets server-side, execução humana do workflow de deploy e teste real com Telegram Mini App.

## Fase 2B.1 | GitHub Actions manual deploy

- Workflow manual `Deploy Supabase Edge Functions` preparado em `.github/workflows/deploy-supabase-functions.yml`.
- O workflow usa somente `workflow_dispatch` e não roda em `push`.
- O workflow implanta individualmente `telegram-auth` e `telegram-session`.
- O workflow não executa deploy de banco, migrations ou configuração de secrets.
- O workflow não foi executado nesta tarefa; nenhum deploy real foi feito.

## Terminologia Gram / TON

- A UI futura deve exibir o token como Gram (GRAM), usando "Gram (antiga Toncoin)" quando a transição precisar ficar clara.
- A rede/protocolo continua documentada como TON / The Open Network.
- TON Connect continua sendo o termo técnico da integração wallet.
- Identificadores técnicos futuros podem continuar usando `ton_*` até decisão arquitetural específica.
- Nenhum pagamento, saque ou saldo real foi implementado.

## Limites atuais

- O cliente pode apresentar previews, mocks e estados locais de MVP.
- O cliente não é autoridade para autenticação, moedas, rewards, compras, stamina, gacha, pity, batalha, dungeons ou saques.
- Qualquer evolução real de economia, persistência ou pagamentos depende de backend, RLS, validação server-side, idempotência e auditoria.
