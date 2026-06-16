# Token terminology | Gram / TON

## 1. Decisão atual

A UI do Veyra deve tratar o token nativo exibido ao jogador como Gram (GRAM), com copy de transição "Gram (antiga Toncoin)" quando necessário.

A rede, protocolo e integrações técnicas continuam sendo TON / The Open Network.

TON Connect continua sendo o nome técnico da integração de wallet.

## 2. Separação de termos

| Conceito | Termo oficial no projeto | Uso |
|---|---|---|
| Rede | TON / The Open Network | arquitetura, docs técnicos, blockchain |
| Conector | TON Connect | integração wallet |
| Provider interno | ton | enum, schema futuro, backend futuro |
| Token exibido | Gram | UI e copy |
| Ticker exibido | GRAM | UI e saldos |
| Nome legado | Toncoin | textos explicativos e transição |

## 3. Regras para UI

- Preferir Gram.
- Usar GRAM como ticker.
- Em telas explicativas, usar Gram (antiga Toncoin).
- Evitar prometer valor financeiro.
- Evitar “ganhe dinheiro”.
- Evitar “saque garantido”.
- Não mencionar conversão fixa.

## 4. Regras para código e backend futuro

Manter tecnicamente:

- `ton`
- `ton_address`
- `ton_wallet`
- `ton_payments`
- `validateTonPayment`
- `TON Connect`
- `PaymentProvider: "ton"`

Não renomear para `gram_*` sem ADR futura.

## 5. Regras para banco futuro

Em planos de schema, manter nomes técnicos `ton_*` por compatibilidade com a rede/protocolo.

Gram deve ser display/copy, não nome de coluna obrigatório.

## 6. Regras para documentação futura

Quando falar de pagamento, wallet ou saque:

- "Gram na rede TON"
- "wallet TON Connect"
- "endereço TON"
- "saldo exibido em GRAM"

## 7. Status de incerteza

- A Wallet do Telegram pode exibir Gram/GRAM.
- A documentação técnica pública do ecossistema ainda pode usar TON/Toncoin.
- O projeto deve usar uma camada de terminologia configurável.
- Caso o ecossistema confirme uma mudança técnica oficial, uma ADR futura deve decidir renomeações de código/schema.

## 8. Proibições

Não implementar:

- Gram real.
- Pagamentos reais.
- Saques.
- Conversão de Gold/Gems/Shards para Gram.
- Conversão fixa.
- Mudança de banco.
- Mudança de provider técnico.
