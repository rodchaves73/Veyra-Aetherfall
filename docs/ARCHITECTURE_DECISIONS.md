# Decisões arquiteturais oficiais | Veyra: Aetherfall

Este documento registra as decisões oficiais de arquitetura. Alterações nessas decisões exigem tarefa específica e justificativa clara.

## ADR-001 | Frontend

**Decisão:** usar React + Vite + TypeScript + Tailwind CSS.

**Motivo:** stack leve, compatível com SPA mobile-first, Vercel e Telegram Mini App.

**Não usar nesta fase:**

- TanStack Start;
- Nitro;
- Next.js;
- Lovable runtime;
- Three.js;
- Phaser;
- engine pesada.

## ADR-002 | Deploy

**Decisão:** usar Vercel com output `dist`, SPA rewrite, produção pela `main` e previews por PR.

**Regras:**

- A `main` é a base estável publicada.
- PRs devem gerar preview antes de merge manual.
- O agente não deve fazer merge automático.
- O agente não deve depender de remote local `origin`.

## ADR-003 | Backend

**Decisão:** usar Supabase, Postgres, RLS e Edge Functions ou backend server-side para operações críticas.

**Regras:**

- Service role somente no servidor.
- Publishable key pode existir no frontend.
- Tabelas públicas futuras precisam de RLS.
- Operações críticas não podem depender de valores enviados pelo cliente.

## ADR-004 | Telegram

**Decisão:** `initDataUnsafe` é somente para UI. `initData` precisa de validação server-side.

**Regras:**

- Nenhuma identidade real deve ser baseada apenas no cliente.
- A sessão real depende de validação criptográfica do payload Telegram no servidor.
- Modo dev deve ser separado e claramente marcado.

## ADR-005 | Game authority

Devem ser server-side antes de produção real:

- bootstrap;
- inventário;
- moedas;
- stamina;
- battle finish;
- dungeon finish;
- gacha;
- pity;
- duplicatas;
- upgrades;
- ad claims;
- purchases;
- Aether ledger;
- withdrawals.

O frontend pode exibir previews e estados mockados, mas não autorizar resultados reais.

## ADR-006 | Estado local

**Decisão:** mocks são permitidos somente durante desenvolvimento e devem ser claramente marcados.

**Regras:**

- Mock não é persistência real.
- Dados locais não devem ser tratados como fonte de verdade econômica.
- O cliente pode calcular previews visuais, mas não confirmar rewards, compras, batalhas, gacha ou saques.

## ADR-007 | Monetização

**Decisão:** Free, Ads, Gems, Stars e TON são canais separados.

**Regras:**

- Ads não equivalem a pagamentos.
- Stars compram itens digitais internos.
- TON não pode ser creditado apenas pelo cliente.
- Gold, Gems, Shards, Stamina e Materials nunca viram TON.
- Purchases exigem confirmação server-side, idempotência e auditoria.

## ADR-008 | Aether Fragments

**Decisão:** Aether Fragments são um sistema futuro separado, não parte do MVP real atual.

**Regras obrigatórias futuras:**

- pool variável;
- sem taxa fixa;
- sem promessa financeira;
- antifraude;
- revisão manual;
- ledger server-side;
- nenhum saque automático no MVP.

## ADR-009 | Mobile

**Decisão:** portrait first entre 360px e 430px, com foco em Telegram Mini App e Android fraco/intermediário.

**Regras:**

- Respeitar safe area.
- Preservar scroll vertical.
- Evitar overflow horizontal.
- Manter touch targets adequados.
- Usar animações leves.
- Respeitar reduced motion.

## ADR-010 | Processo de desenvolvimento

**Decisão:** uma fase ou subfase por tarefa, branch nova, PR pequeno, preview Vercel, validação antes do merge, merge manual e registro de conclusão antes da próxima fase.

**Regras:**

- Não reaplicar scaffold inicial.
- Não implementar várias fases juntas.
- Não alterar arquivos fora do escopo aprovado.
- Não presumir contexto ausente.
- Documentar riscos, mocks restantes e validações em cada entrega.


## ADR-011 | Terminologia Gram / TON

**Decisão:** tratar Gram/GRAM como nome de exibição do token para UI e copy, mantendo TON / The Open Network como rede/protocolo e TON Connect como integração técnica de wallet.

**Regras:**

- `Gram` é usado para textos visíveis ao usuário.
- `GRAM` é usado como ticker visual.
- `Toncoin` pode aparecer como nome legado em textos de transição.
- `TON` continua representando rede/protocolo.
- `TON Connect` não deve ser renomeado.
- Identificadores técnicos `ton_*` não devem ser renomeados para `gram_*` sem ADR futura.
- Nenhum pagamento, saque ou conversão financeira é autorizado por esta decisão.
