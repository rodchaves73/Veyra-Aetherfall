# Telegram Auth Deployment Readiness | Fase 2B

## Status da Fase 2B

- **Estado:** preparado para revisão humana e deploy controlado.
- **Escopo:** documentação operacional, validação Deno/TypeScript e registro de riscos.
- **Deploy real:** não executado nesta tarefa.
- **Secrets reais:** não configurados e não registrados no Git.
- **Frontend auth real:** ainda não ativado.
- **Banco, Supabase Auth, RLS e migrations:** fora do escopo desta fase.

## Pré-requisitos

1. Branch revisada e mergeada manualmente após validações.
2. Acesso humano autenticado ao projeto Supabase correto.
3. Domínios reais de produção e preview definidos.
4. Bot do Telegram criado e token disponível apenas para configuração server-side.
5. Revisão humana dos comandos antes de qualquer deploy.

## Secrets necessários

Documente e configure apenas os nomes abaixo. Valores reais nunca devem entrar no Git, issues, logs, screenshots ou mensagens de PR.

| Secret | Uso | Observação |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Validar assinatura do `initData` Telegram | Server-side somente. |
| `VEYRA_SESSION_SECRET` | Assinar sessão curta Veyra | Mínimo 32 caracteres, alto entropy. |
| `ALLOWED_ORIGINS` | Permitir origens exatas no CORS | Separado por vírgula, sem wildcard. |
| `TELEGRAM_AUTH_MAX_AGE_SECONDS` | Janela máxima do `auth_date` | Recomendado `300`; máximo esperado `600`. |
| `VEYRA_SESSION_TTL_SECONDS` | TTL da sessão Veyra | Recomendado `900`; máximo esperado `3600`. |

## Onde configurar os secrets

Configure manualmente pelo painel Supabase ou pelo terminal autenticado localmente. Não salve os valores em arquivos `.env`, documentação ou histórico do shell compartilhado.

Exemplos de comando com placeholders seguros:

```bash
supabase secrets set TELEGRAM_BOT_TOKEN="<set-in-terminal-only>"
supabase secrets set VEYRA_SESSION_SECRET="<set-in-terminal-only>"
supabase secrets set ALLOWED_ORIGINS="https://<production-domain>,https://<preview-domain>"
supabase secrets set TELEGRAM_AUTH_MAX_AGE_SECONDS="300"
supabase secrets set VEYRA_SESSION_TTL_SECONDS="900"
```

## Comandos de deploy planejados

Executar somente depois de revisão humana, autenticação segura do Supabase CLI e confirmação do projeto correto:

```bash
supabase functions deploy telegram-auth
supabase functions deploy telegram-session
```

Não executar nesta fase automatizada:

- `supabase db push`;
- `supabase migration up`;
- deploy sem revisão humana;
- configuração de secrets com valores reais por agente.

## Comandos de validação recomendados

Antes do deploy:

```bash
deno fmt --check supabase/functions
deno lint supabase/functions
deno test supabase/functions/_shared
deno check supabase/functions/telegram-auth/index.ts
deno check supabase/functions/telegram-session/index.ts
npx tsc --noEmit --ignoreConfig --target ES2022 --lib DOM,ES2022 --module ESNext --moduleResolution Bundler --allowImportingTsExtensions supabase/functions/_shared/telegramInitData.ts supabase/functions/_shared/sessionToken.ts supabase/functions/_shared/telegramInitData.test.ts supabase/functions/_shared/sessionToken.test.ts supabase/functions/telegram-auth/index.ts supabase/functions/telegram-session/index.ts
```

Depois do deploy, testar endpoints com `initData` real obtido apenas dentro do Telegram Mini App. Não registrar esse payload em logs permanentes.

## Checklist de CORS

- `ALLOWED_ORIGINS` usa origens completas e exatas.
- Não há `*` em produção.
- Domínio Vercel de produção está incluído.
- Domínio de preview usado no teste real está incluído.
- Requisições sem `Origin` continuam limitadas a cenários server-to-server ou ferramentas controladas.
- Preflight `OPTIONS` retorna somente os headers esperados.

## Checklist de Telegram Mini App

- App aberto dentro do Telegram, não apenas navegador externo.
- `initData` bruto enviado para `telegram-auth` sem parse no cliente.
- `initDataUnsafe` usado apenas para UI, nunca para identidade real.
- Sessão Veyra mantida apenas em memória na futura integração frontend.
- Nenhum token Telegram, `initData`, `hash`, `Authorization` ou sessão Veyra aparece em logs.

## Checklist de rollback

1. Interromper chamadas do frontend para as funções, caso a Fase 2C já esteja ativa.
2. Remover ou rotacionar secrets comprometidos pelo painel/CLI Supabase.
3. Reimplantar a versão anterior das funções ou desabilitar o fluxo de auth real.
4. Confirmar que previews e produção voltaram para modo mock/preparado.
5. Registrar incidente, causa raiz e ação corretiva antes de novo deploy.

## Riscos

- Secrets incorretos bloqueiam autenticação real.
- Domínios CORS incompletos bloqueiam previews ou produção.
- Logs indevidos podem expor `initData` ou sessão curta.
- Sessão Veyra ainda não tem revogação persistida por `jti`.
- Ainda não há Supabase Auth, banco, RLS ou perfil persistido.

## O que ainda não está ativado

- Autenticação real no frontend.
- Supabase Auth.
- Persistência de jogador.
- Inventário, stamina, campanha, gacha, rewards ou economia reais.
- Pagamentos, Gram/TON, Stars, saques ou Aether Fragments reais.

## Próximos passos

1. Revisão humana deste checklist.
2. Configuração manual dos secrets no Supabase.
3. Deploy manual das Edge Functions.
4. Teste real com Telegram Mini App.
5. Fase 2C: integração frontend auth controlada, mantendo token Veyra apenas em memória.
