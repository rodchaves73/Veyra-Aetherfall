# Contrato de autenticação Telegram | Veyra: Aetherfall

Este documento define a fundação server-side da Fase 2A. Ele descreve contratos e limites das Supabase Edge Functions `telegram-auth` e `telegram-session`.

## Arquitetura

```text
Telegram Mini App
  -> frontend envia initData bruto futuramente
  -> Supabase Edge Function telegram-auth valida initData no servidor
  -> telegram-auth emite sessão curta própria do Veyra
  -> cliente usa Bearer token futuramente, somente em memória
  -> Supabase Edge Function telegram-session verifica a sessão
```

A sessão emitida nesta fase é uma sessão própria da aplicação Veyra. Ela não é um JWT do Supabase Auth e não deve ser usada diretamente para acessar tabelas via RLS.

## Fronteira de segurança

- `initDataUnsafe` não autentica ninguém; ele é apenas uma conveniência visual entregue ao cliente.
- O frontend não pode ser autoridade para identidade, inventário, moedas, stamina, rewards, gacha, pity, compras ou saques.
- O bot token do Telegram e o segredo de sessão ficam somente em Supabase secrets.
- A sessão Veyra será usada futuramente por Edge Functions com autoridade server-side.
- Esta fase não cria usuário Supabase, não cria tabelas, não usa service role e não persiste sessão no banco.

## Por que `verify_jwt = false`

As funções usam `verify_jwt = false` porque:

- `telegram-auth` recebe o usuário antes de existir sessão.
- `telegram-session` valida uma sessão própria do Veyra, não um Supabase Auth JWT.
- A segurança é implementada internamente pelas funções, que rejeitam origem, método, corpo, assinatura e sessão inválidos.

`verify_jwt = false` não significa endpoint sem segurança.

## Variáveis server-side esperadas

Os nomes abaixo devem ser configurados futuramente como Supabase secrets ou configuração server-side. Não há valores reais neste repositório.

| Variável | Obrigatória | Padrão | Máximo no código | Regra |
|---|---:|---:|---:|---|
| `TELEGRAM_BOT_TOKEN` | Sim | Nenhum | Não aplicável | Somente Supabase secret; nunca frontend; nunca log. |
| `VEYRA_SESSION_SECRET` | Sim | Nenhum | Não aplicável | Somente Supabase secret; mínimo 32 caracteres; nunca frontend; nunca log. |
| `ALLOWED_ORIGINS` | Sim para navegador | Nenhum | Não aplicável | Lista separada por vírgula com origens exatas; não usar `*` em produção. |
| `TELEGRAM_AUTH_MAX_AGE_SECONDS` | Não | 300 | 600 | Tempo máximo aceito para `auth_date`. |
| `VEYRA_SESSION_TTL_SECONDS` | Não | 900 | 3600 | TTL da sessão própria do Veyra. |

## Endpoint `telegram-auth`

### Método

`POST`

### Request

```json
{
  "initData": "query string bruta do Telegram"
}
```

### Sucesso `200`

```json
{
  "ok": true,
  "session": {
    "accessToken": "veyra-session-token",
    "expiresAt": 1700000900,
    "source": "telegram",
    "user": {
      "id": 123,
      "first_name": "Ada",
      "last_name": "Lovelace",
      "username": "ada",
      "language_code": "en",
      "is_premium": true,
      "photo_url": "https://example.invalid/photo.png"
    }
  }
}
```

### Erros

Todos os erros seguem formato estável:

```json
{
  "ok": false,
  "error": {
    "code": "invalid_init_data",
    "message": "Telegram authentication data is invalid or expired."
  }
}
```

Códigos esperados:

| HTTP | Código | Uso |
|---:|---|---|
| 400 | `invalid_body` | Corpo ausente, JSON inválido ou formato inesperado. |
| 401 | `invalid_init_data` | `initData` inválido, expirado ou com assinatura incorreta. |
| 403 | `forbidden_origin` | Origem de navegador não autorizada. |
| 405 | `method_not_allowed` | Método diferente de POST. |
| 413 | `payload_too_large` | Corpo maior que o limite aceito. |
| 500 | `internal_error` | Erro genérico sem detalhes sensíveis. |
| 503 | `auth_not_configured` | Secrets/configuração server-side ausentes. |

## Endpoint `telegram-session`

### Método

`GET`

### Header

```text
Authorization: Bearer <veyra-session-token>
```

### Sucesso `200`

```json
{
  "ok": true,
  "session": {
    "expiresAt": 1700000900,
    "source": "telegram",
    "user": {
      "id": 123,
      "first_name": "Ada"
    }
  }
}
```

A função não retorna novamente o access token e não renova a sessão automaticamente.

### Erros

| HTTP | Código | Uso |
|---:|---|---|
| 401 | `missing_session` | Header Bearer ausente. |
| 401 | `invalid_session` | Sessão inválida ou expirada. |
| 403 | `forbidden_origin` | Origem de navegador não autorizada. |
| 405 | `method_not_allowed` | Método diferente de GET. |
| 500 | `internal_error` | Erro genérico sem detalhes sensíveis. |
| 503 | `auth_not_configured` | Segredo de sessão ausente. |

## Validação do Telegram `initData`

A validação server-side:

1. Recebe `initData` bruto como string.
2. Limita tamanho do payload.
3. Extrai `hash` e `auth_date`.
4. Remove apenas `hash` do data-check-string.
5. Preserva os demais campos recebidos.
6. Ordena pares por chave.
7. Une linhas no formato `key=value` com `\n`.
8. Gera secret key com HMAC-SHA-256 usando chave `WebAppData` e mensagem bot token.
9. Gera HMAC-SHA-256 do data-check-string.
10. Compara a assinatura em constant-time.
11. Valida expiração e tolerância máxima de 30 segundos no futuro.
12. Desserializa e normaliza o usuário Telegram.

O retorno normalizado não inclui `hash` nem `initData` bruto.

## Claims da sessão Veyra

Header fixo:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

Claims mínimas:

```json
{
  "iss": "veyra-auth",
  "aud": "veyra-mini-app",
  "sub": "123",
  "iat": 1700000000,
  "exp": 1700000900,
  "jti": "uuid",
  "source": "telegram",
  "user": {
    "id": 123,
    "first_name": "Ada"
  }
}
```

Regras:

- Algoritmo aceito: HS256 fixo.
- Segredo mínimo: 32 caracteres.
- TTL máximo: 3600 segundos.
- Assinatura verificada em constant-time.
- `iss`, `aud`, `sub`, `iat`, `exp`, `source` e `user` são validados.
- O token não inclui bot token, segredo de sessão, `initData` ou `hash`.

## CORS

- Origens permitidas vêm de `ALLOWED_ORIGINS`.
- A comparação é exata.
- Wildcard não é aceito.
- Requests server-to-server sem `Origin` podem continuar.
- Quando nenhuma origem está configurada, chamadas de navegador não são liberadas por padrão.
- Headers permitidos: `authorization`, `apikey`, `content-type`, `x-client-info`.
- Respostas usam `Vary: Origin`.

## Logs

Nunca registrar:

- `initData`;
- `hash`;
- access token;
- bot token;
- segredo de sessão;
- header `Authorization`;
- payload completo do usuário.

Logs futuros podem registrar apenas `requestId`, `functionName`, `statusCode`, `errorCode` genérico e duração.

## Limitações pendentes

- Deploy das funções.
- Configuração dos Supabase secrets.
- Chamada pelo frontend.
- Armazenamento do token somente em memória.
- Renovação da sessão.
- Logout.
- Revogação.
- Rate limiting distribuído.
- Replay prevention persistente.
- Player bootstrap.
- Criação de perfil.
- Supabase Auth.
- Banco.
- RLS.
- Auditoria de sessão.

Replay prevention persistente não está resolvido nesta fase porque exige armazenamento server-side/idempotência.

## Fase 2B futura

A Fase 2B deve tratar:

- configurar Supabase secrets reais fora do Git;
- fazer deploy das Edge Functions;
- testar em Telegram Mini App real;
- integrar frontend sem persistir token em storage permanente;
- manter sessão somente em memória;
- definir logout e renovação;
- documentar operação e rollback.

## Checklist de deploy futuro

- Configurar `TELEGRAM_BOT_TOKEN` como secret server-side.
- Configurar `VEYRA_SESSION_SECRET` com pelo menos 32 caracteres.
- Configurar `ALLOWED_ORIGINS` com origens exatas de produção e preview.
- Revisar TTLs.
- Executar testes Deno.
- Fazer deploy das funções.
- Testar `telegram-auth` com `initData` real no Telegram.
- Testar `telegram-session` com Bearer token emitido.
- Confirmar ausência de logs sensíveis.
- Só então iniciar integração visual do frontend.
