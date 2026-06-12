# Auditoria Pós-Deploy

Data da auditoria: 2026-06-12.

## Confirmações

- O projeto continua sendo uma SPA `React + Vite + TypeScript + Tailwind CSS`.
- O deploy Vercel usa build Vite e rewrite para `index.html`.
- A integração Supabase no frontend usa somente `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Nenhuma tabela definitiva foi criada no Supabase nesta etapa.
- Nenhuma autenticação falsa foi adicionada.
- Gacha, rewards, inventory, Monetag, TON, Stars e Aether Fragments continuam mockados/local-only.

## Problemas encontrados

- `useTelegram()` chamava `ready()` e `expand()` durante renderização, o que poderia repetir efeitos a cada render.
- O AppShell usava `overflow-hidden` no eixo vertical, com risco de cortar telas longas em mobile portrait.
- BottomNav com sete abas podia ficar apertada em 360px sem truncamento explícito.
- Topbar e cards de Shop/Dungeons podiam comprimir conteúdo em 360px.
- Modal de detalhe de herói não limitava altura nem garantia scroll interno com safe area.
- Filtros horizontais de Heroes/Shop precisavam de margem negativa controlada para manter scroll confortável em 360px, 390px e 430px.

## Problemas corrigidos

- `useTelegram()` agora executa `ready()` e `expand()` dentro de `useEffect`, mantendo `initDataUnsafe` apenas para UI.
- AppShell agora usa `min-h-dvh`, `overflow-x-hidden` e padding inferior baseado em safe area para evitar que o BottomNav cubra conteúdo.
- BottomNav recebeu largura total até `430px`, truncamento de labels, estado `aria-current`, `min-w-0` e tamanhos ajustados para 360px.
- Topbar recebeu `min-w-0`, gaps responsivos e padding menor em telas estreitas.
- Modal recebeu `max-height` em `dvh`, scroll interno e padding com safe area.
- Heroes, Dungeons e Shop receberam ajustes de overflow, wrapping e botões responsivos sem alterar os sistemas de jogo.

## Pontos ainda mockados

- Estado do jogador, inventário, coleção de heróis, campanha, dungeons e limites de ads.
- Gacha, pity, duplicate conversion e summon results.
- Battle rewards, dungeon rewards, upgrades, ascension, awaken e gear.
- Monetag rewarded ads e claims.
- TON Connect real, pagamentos TON, Telegram Stars e Aether Fragments.
- Persistência Supabase e sessão autenticada.

## Riscos de segurança

- Qualquer crédito real de reward no cliente seria fraudável; deve migrar para backend/Edge Functions antes de produção.
- Telegram `initDataUnsafe` não é fonte confiável para login, pagamentos ou concessão de recursos.
- Monetag precisa validação server-side e idempotência para evitar claims duplicados.
- Gacha/pity/inventory precisam ser transacionais e server-side.
- TON payments exigem verificação on-chain antes de crédito.
- Telegram Stars exige confirmação oficial antes de grant.
- Aether Fragments exigem antifraude, cálculo semanal variável e revisão manual de saque.

## Próximos passos recomendados antes da persistência real

1. Definir contratos server-side para bootstrap player, get state, summon, battle finish, dungeon finish e claim ad.
2. Criar schema Supabase mínimo com RLS e Edge Functions, sem expor service role ao browser.
3. Implementar validação de Telegram initData no servidor.
4. Migrar claims de ads para fluxo idempotente server-side.
5. Migrar gacha/pity para operação server-side auditável.
6. Adicionar testes automatizados de funções puras do RPG antes de conectar persistência.
7. Realizar QA manual em Telegram Mini App real nos breakpoints 360px, 390px e 430px.
