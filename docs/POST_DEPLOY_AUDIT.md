# Post-deploy mobile audit

## Estado revisado

- Base local validada a partir do commit `37d1ddf9b293941db960f6d7e86fce747ae5fa48` (`Merge pull request #1 fase 1.`).
- A auditoria foi limitada ao shell mobile portrait e às telas autorizadas.
- O working tree inicial estava limpo e os arquivos essenciais do projeto existiam antes das alterações.

## Problemas encontrados

- O hook Telegram executava `ready()` e `expand()` durante o render, causando efeitos colaterais fora de `useEffect`.
- O shell usava `min-h-screen`/`100vh` e `overflow-hidden`, o que podia cortar telas longas e não aproveitava `dvh` em navegadores mobile.
- A BottomNav tinha sete abas em grade sem `min-w-0` e sem truncamento de labels, arriscando overflow em 360px.
- A Topbar não definia limites mínimos flexíveis para truncar textos em telas estreitas.
- O modal não limitava altura com `dvh` nem tinha área interna rolável, afetando o detalhe de herói em portrait.
- Filtros horizontais, cards e textos longos nas telas revisadas podiam gerar overflow ou compressão excessiva em 360px, 390px e 430px.

## Correções feitas

- Movidos `ready()` e `expand()` do Telegram WebApp para `useEffect`, mantendo fallback de desenvolvimento e aviso de que `initDataUnsafe` é somente para UI.
- Ajustado o AppShell para `min-h-dvh`, bloquear overflow horizontal, preservar rolagem vertical e reservar espaço para a BottomNav com safe area.
- Ajustada a BottomNav para usar `min-w-0`, labels truncados, touch targets preservados e `aria-current` no item ativo.
- Ajustada a Topbar para usar `min-w-0`, truncamento e espaçamento seguro sem alterar recursos exibidos.
- Ajustado o VAModal para limitar altura com `100dvh`, respeitar safe area e rolar o conteúdo interno.
- Ajustadas Dungeons, Heroes e Shop apenas para wrapping, overflow horizontal, largura de filtros, cards e botões em portrait.
- Adicionados estilos globais mínimos para `dvh`, safe scroll e bloqueio de overflow horizontal.

## Arquivos alterados

- `docs/POST_DEPLOY_AUDIT.md`
- `src/app/AppShell.tsx`
- `src/components/layout/BottomNav.tsx`
- `src/components/layout/Topbar.tsx`
- `src/components/ui/VAModal.tsx`
- `src/lib/telegram/useTelegram.ts`
- `src/screens/DungeonsScreen.tsx`
- `src/screens/HeroesScreen.tsx`
- `src/screens/ShopScreen.tsx`
- `src/styles/globals.css`

## Sistemas ainda mockados

- Persistência real de progressão e inventário.
- Autenticação/autorização Telegram validada em servidor.
- Monetag real.
- TON real.
- Telegram Stars e pagamentos reais.
- Gacha, pity, battle rewards, Aether Fragments e inventário real.

## Riscos de segurança

- `initDataUnsafe` continua disponível apenas para apresentação de UI; não deve ser usado para autenticação ou autorização.
- Pagamentos, Stars, TON e rewards precisam de validação server-side antes de qualquer crédito real.
- Não foram adicionadas chaves, tokens ou secrets ao código.

## Limitações do ambiente

- A validação foi feita por lint, build, typecheck, diff e busca de padrões sensíveis.
- Screenshots não foram validados no container; nenhum navegador foi instalado para esta auditoria.
- `git remote -v` não retornou remotes locais, o que era esperado e não bloqueou a tarefa.

## Próximos passos

- Validar manualmente no Telegram WebView e em navegadores mobile reais nas larguras 360px, 390px e 430px.
- Implementar autenticação Telegram server-side antes de qualquer sessão real.
- Implementar provedores reais de pagamento somente com validação backend e webhooks.

## Resultados das validações

- `npm install`: aprovado; dependências já estavam atualizadas.
- `npm run lint`: aprovado.
- `npm run build`: aprovado.
- `npm run typecheck`: aprovado.
- `git diff --check`: aprovado.
- `test -f dist/index.html`: aprovado.
- Busca por padrões de secrets em `src`, `.env.example`, `README.md`, `docs`, `package.json` e `vercel.json`: sem ocorrências.
