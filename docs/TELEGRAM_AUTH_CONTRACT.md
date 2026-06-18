# Contrato técnico | Telegram Auth Server Foundation

## Status

- **Fase:** 2A — contratos e Edge Functions.
- **Estado:** preparada em código, ainda não implantada.
- **Produção:** bloqueada até Fase 2B configurar secrets, deploy, teste real e integração frontend.

## Arquitetura

A autenticação segura do Telegram será feita por Supabase Edge Functions. O cliente envia o `initData` bruto recebido do Telegram Mini App para a função `telegram-auth`. A função valida criptograficamente o payload com o `TELEGRAM_BOT_TOKEN`, normaliza dados seguros do usuário e emite uma sessão curta própria do Veyra assinada com HMAC-SHA-256.

A sessão Veyra não é um JWT do Supabase Auth. Ela é um token de aplicação para autorizar futuras Edge Functions do jogo até que exista uma decisão arquitetural específica para integração com Supabase Auth.

## Fluxo

1. Telegram Mini App fornece `initData` ao frontend.
2. Frontend envia `initData` bruto para `POST /functions/v1/telegram-auth`.
3. Edge Function valida assinatura, `auth_date`, expiração e usuário.
4. Edge Function emite token curto Veyra.
5. Frontend mantém o token apenas em memória em fase futura.
6. Futuras chamadas server-side podem verificar o token com `GET /functions/v1/telegram-session` ou helpers compartilhados.

`initDataUnsafe` continua permitido somente para UI e nunca deve ser usado como autenticação ou autorização.

## Endpoints

### POST `/functions/v1/telegram-auth`

Headers:

- `Content-Type: application/json`
- `Origin` opcional em chamadas server-to-server; obrigatório e validado por lista exata em navegador.

Body:

```json
{
  "initData": "query string bruta do Telegram"
}
```

Sucesso `200`:

```json
{
  "ok": true,
  "session": {
    "accessToken": "veyra-session-token",
    "expiresAt": 1700000900,
    "source": "telegram",
    "user": {
      "id": 12345,
      "firstName": "Veyra",
      "lastName": "Tester",
      "username": "veyra_test",
      "languageCode": "pt-BR",
      "isPremium": false,
      "photoUrl": "https://example.invalid/photo.png"
    }
  }
}
```

Erros:

```json
{
  "ok": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Mensagem segura e genérica."
  }
}
```

Status possíveis:

- `400` body inválido.
- `401` autenticação Telegram inválida ou expirada.
- `403` origem proibida.
- `405` método não permitido.
- `413` payload excessivo.
- `500` erro interno genérico.
- `503` configuração server-side ausente.

### GET `/functions/v1/telegram-session`

Headers:

- `Authorization: Bearer <veyra-session-token>`
- `Origin` opcional em chamadas server-to-server; validado por lista exata em navegador.

Sucesso `200`:

```json
{
  "ok": true,
  "session": {
    "expiresAt": 1700000900,
    "source": "telegram",
    "user": {
      "id": 12345,
      "firstName": "Veyra"
    }
  }
}
```

Este endpoint não renova token e não retorna novo `accessToken`.

## Claims da sessão Veyra

Header fixo:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Payload:

```json
{
  "iss": "veyra-auth",
  "aud": "veyra-mini-app",
  "sub": "12345",
  "iat": 1700000000,
  "exp": 1700000900,
  "jti": "uuid",
  "source": "telegram",
  "user": {
    "id": 12345,
    "firstName": "Veyra"
  }
}
```

## Variáveis server-side

Somente nomes são documentados. Valores reais devem existir apenas como Supabase secrets.

| Variável | Regra |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Somente Supabase secret. |
| `VEYRA_SESSION_SECRET` | Somente Supabase secret, mínimo 32 caracteres. |
| `ALLOWED_ORIGINS` | Lista exata separada por vírgula, sem wildcard. |
| `TELEGRAM_AUTH_MAX_AGE_SECONDS` | Padrão 300, máximo 600. |
| `VEYRA_SESSION_TTL_SECONDS` | Padrão 900, máximo 3600. |

## Fronteira de segurança

- O servidor valida `initData`; o cliente não é autoridade.
- `initData`, `hash`, token Telegram e segredo de sessão não são retornados.
- Banco, migrations, RLS, perfil de jogador e inventário real não são criados nesta fase.
- Rewards, gacha, moedas, Gram, TON, wallet e saques reais continuam bloqueados.
- Logs não devem conter payload completo, `initData`, `hash`, `accessToken`, `Authorization` ou secrets.

## Motivo de `verify_jwt = false`

As funções `telegram-auth` e `telegram-session` não dependem de Supabase Auth JWT nesta fundação. Elas implementam autenticação própria: primeiro validam o payload Telegram, depois emitem/verificam sessão curta Veyra. Ativar `verify_jwt` exigiria uma sessão Supabase Auth que ainda não existe e bloquearia o bootstrap inicial.

## Limitações e riscos

- Funções ainda não foram implantadas.
- Secrets ainda não foram configurados.
- Não existe persistência de sessão ou revogação server-side.
- Token curto reduz janela de abuso, mas revogação por `jti` exigirá fase futura.
- Integração frontend real e armazenamento em memória ficam para Fase 2B.

## Fase 2B operational validation

A Fase 2B preparou a validação operacional e os checklists de deploy sem ativar autenticação real no frontend e sem configurar secrets reais no repositório. Consulte:

- [Telegram Auth Deployment](./TELEGRAM_AUTH_DEPLOYMENT.md)
- [Telegram Auth Validation](./TELEGRAM_AUTH_VALIDATION.md)

## Checklist da Fase 2B

- Configurar secrets no Supabase.
- Implantar Edge Functions.
- Testar com `initData` real do Telegram Mini App.
- Integrar frontend sem usar `initDataUnsafe` para autenticação.
- Armazenar token Veyra apenas em memória.
- Confirmar CORS com domínios reais de preview e produção.
- Registrar riscos, logs operacionais e plano de revogação futura.

## Frontend integration rules

- O frontend deve enviar somente o `window.Telegram.WebApp.initData` bruto para `telegram-auth`.
- O token curto Veyra recebido deve permanecer somente em memória durante a vida da página.
- É proibido persistir o token em `localStorage`, `sessionStorage` ou cookies.
- É proibido exibir ou registrar em logs `initData`, token Veyra, cabeçalho `Authorization`, hash ou payload bruto.
- `initDataUnsafe` pode ser usado apenas para UI/preview e nunca como autoridade de autenticação ou autorização.
- Fora do Telegram Mini App, o app deve continuar em modo preview/mock, sem bloquear navegação e sem fingir autenticação real.


## Relação com Fase 2D | Veyra session → player-bootstrap

Após `telegram-auth` emitir a sessão Veyra e `telegram-session` validá-la, o frontend pode chamar `GET /functions/v1/player-bootstrap` com `Authorization: Bearer <veyra-session-token>`. A função valida a sessão com o helper compartilhado, usa o usuário normalizado do token e retorna somente um player seguro.

`player-bootstrap` não retorna `accessToken`, `Authorization`, `initData`, hash, service role, payload bruto da sessão ou dados brutos completos do Telegram.
