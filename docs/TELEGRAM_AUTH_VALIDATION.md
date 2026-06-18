# Telegram Auth Validation | Fase 2B

## Status geral

- **Estado:** validação operacional preparada.
- **Deploy real:** não executado.
- **Secrets reais:** não configurados.
- **Dados reais Telegram:** não incluídos neste documento.

## Resultado de Deno

Deno não estava disponível inicialmente no ambiente. Para validação temporária fora do repositório, foi instalado em `/tmp/veyra-deno` com:

```bash
mkdir -p /tmp/veyra-deno && curl -fsSL https://deno.land/install.sh | DENO_INSTALL=/tmp/veyra-deno sh
```

Resultados esperados após correções de formatação e tipagem detectadas pela Fase 2B:

```bash
/tmp/veyra-deno/bin/deno fmt --check supabase/functions
/tmp/veyra-deno/bin/deno lint supabase/functions
/tmp/veyra-deno/bin/deno test supabase/functions/_shared
/tmp/veyra-deno/bin/deno check supabase/functions/telegram-auth/index.ts
/tmp/veyra-deno/bin/deno check supabase/functions/telegram-session/index.ts
```

## Resultado de TypeScript isolado

Validar sempre sem depender do `tsconfig` do app:

```bash
npx tsc --noEmit --ignoreConfig --target ES2022 --lib DOM,ES2022 --module ESNext --moduleResolution Bundler --allowImportingTsExtensions supabase/functions/_shared/telegramInitData.ts supabase/functions/_shared/sessionToken.ts supabase/functions/_shared/telegramInitData.test.ts supabase/functions/_shared/sessionToken.test.ts supabase/functions/telegram-auth/index.ts supabase/functions/telegram-session/index.ts
```

## Resultado de lint/build/typecheck

A Fase 2B exige validações gerais do app, mesmo sem alterar `src/**`:

```bash
npm install
npm run lint
npm run build
npm run typecheck
git diff --check
test -f dist/index.html
```

## Status de Supabase CLI

O Supabase CLI não estava disponível inicialmente no ambiente. A validação destrutiva é proibida nesta fase automatizada. Quando disponível em ambiente humano autenticado, executar apenas validações não destrutivas antes do deploy manual:

```bash
supabase --version
supabase functions list --project-ref pjrfwalcattcukjrxnal || true
```

## Plano de teste com `initData` real

1. Abrir o Mini App dentro do Telegram.
2. Capturar `window.Telegram.WebApp.initData` apenas em memória durante a sessão de teste.
3. Enviar o valor bruto para `POST /functions/v1/telegram-auth`.
4. Confirmar resposta `200` com `ok: true`, `source: "telegram"`, usuário normalizado e `expiresAt` curto.
5. Não persistir nem copiar `initData`, `hash`, bot token ou sessão Veyra em documentação.

## Plano de teste de CORS

- Testar origem de produção permitida.
- Testar origem de preview permitida.
- Testar origem aleatória não permitida e esperar `403`.
- Testar preflight `OPTIONS` para `telegram-auth` e `telegram-session`.
- Confirmar ausência de wildcard em produção.

## Plano de teste de expiração

- Usar `initData` real recente e confirmar aceite dentro da janela configurada.
- Repetir com payload expirado em ambiente controlado e esperar `401`.
- Confirmar que a sessão Veyra expirada retorna erro em `telegram-session`.

## Plano de teste de assinatura inválida

- Alterar um caractere de um payload de teste controlado.
- Enviar para `telegram-auth`.
- Esperar `401` com mensagem genérica.
- Confirmar que logs não incluem payload completo, `hash` ou secrets.

## Plano de teste do endpoint de sessão

1. Obter sessão Veyra válida via `telegram-auth`.
2. Chamar `GET /functions/v1/telegram-session` com `Authorization: Bearer <token-em-memoria>`.
3. Confirmar `ok: true`, `source: "telegram"` e dados mínimos do usuário.
4. Chamar sem header, com token adulterado e com token expirado; esperar `401`.
5. Confirmar que o endpoint não renova token e não retorna novo `accessToken`.

## Pendências para Fase 2C

- Integrar frontend de forma controlada.
- Manter token Veyra somente em memória.
- Garantir fallback seguro quando Telegram não fornecer `initData`.
- Não ativar persistência real ainda.
- Documentar comportamento de preview e produção sem criar autenticação falsa.

## Validação pendente após GitHub Actions manual

Depois que a Action **Deploy Supabase Edge Functions** for executada manualmente, validar:

1. O workflow terminou com sucesso no GitHub Actions.
2. Os logs mostram a versão do Supabase CLI.
3. Os passos `Deploy telegram-auth` e `Deploy telegram-session` concluíram sem erro.
4. Não há execução de `supabase db push`, migrations ou configuração de secrets.
5. Não há `initData`, token Telegram, `Authorization`, sessão Veyra ou secrets nos logs.

## Teste dos endpoints após deploy

Com o Mini App aberto dentro do Telegram e usando dados apenas em memória:

1. Testar `POST /functions/v1/telegram-auth` com `window.Telegram.WebApp.initData` bruto.
2. Confirmar resposta de sucesso apenas para `initData` válido e recente.
3. Testar `GET /functions/v1/telegram-session` com `Authorization: Bearer <token-em-memoria>`.
4. Confirmar erro para token ausente, adulterado ou expirado.
5. Repetir testes de CORS para origem de produção e preview autorizadas.

Nunca registrar em documentação, logs permanentes, prints públicos ou issues:

- `initData`;
- token Telegram;
- header `Authorization`;
- sessão Veyra;
- secrets do Supabase ou GitHub Actions.

## Checklist manual | Fase 2C frontend auth

1. Abrir o Veyra pelo Telegram Mini App usando o domínio configurado no BotFather.
2. Confirmar que a UI mostra `Telegram Auth: Connected` ou estado autenticado equivalente.
3. Confirmar que o nome seguro do usuário aparece sem expor `initData`, hash, token ou payload bruto.
4. Confirmar que a expiração formatada da sessão aparece na UI.
5. Recarregar o app e confirmar que uma nova autenticação em memória ocorre sem persistência local.
6. Abrir o mesmo deploy fora do Telegram e confirmar `Preview mode` / `Open inside Telegram to authenticate`.
7. Confirmar que Home, Battle, Dungeons, Summon, Shop, Wallet e Fonte do Aether seguem navegáveis em mock/preview.
8. Inspecionar UI e console para confirmar que token Veyra, `Authorization` e `initData` não aparecem.
9. Confirmar que não há `localStorage`, `sessionStorage` ou cookie de autenticação criado pela integração Veyra.


## Checklist manual | Fase 2D player bootstrap

1. Aplicar a migration `202606180001_create_veyra_players.sql` no Supabase.
2. Rodar o workflow manual de deploy das functions, incluindo `player-bootstrap`.
3. Abrir o Mini App no Telegram.
4. Confirmar `Telegram Auth: Connected`.
5. Confirmar `Player synced` com nome básico do jogador.
6. Confirmar que inventário, economia, rewards, gacha e gameplay continuam mock e não foram ativados como estado real.
7. Confirmar que não há token, `Authorization`, `initData`, hash ou secrets na UI, console ou logs.
