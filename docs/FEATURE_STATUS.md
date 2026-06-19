# Status oficial de funcionalidades | Veyra: Aetherfall

Status padronizados:

- **DONE:** concluído para o escopo atual e validado.
- **PREPARED:** estrutura preparada, mas não operacional em produção real.
- **MOCK:** funciona com dados locais/mockados, sem autoridade real.
- **BLOCKED:** bloqueado por segurança, backend, revisão jurídica/econômica ou dependência crítica.
- **PLANNED:** planejado para fase futura.
- **DEFERRED:** deliberadamente adiado.

Não marque como `DONE` algo que ainda seja mock ou apenas preparado.

| Funcionalidade | Status | Camada atual | Persistência | Validação server-side | Próxima fase | Observação |
|---|---|---|---|---|---|---|
| AppShell | DONE | Frontend | Não aplicável | Não aplicável | Fase 0 concluída | Shell mobile MVP existe e passou por auditoria pós-deploy. |
| Mobile safe area | DONE | Frontend/CSS | Não aplicável | Não aplicável | Fase 0 concluída | Ajustado para portrait, safe area, scroll e overflow. |
| Home | MOCK | Frontend | Local/mock | Não | Fase 4 | Tela MVP existe, mas não reflete perfil persistido real. |
| Heroes | MOCK | Frontend | Local/mock | Não | Fase 5 | Catálogo e coleção visual existem; ownership real ainda não existe. |
| Battle | MOCK | Frontend | Local/mock | Não | Fase 6 | Auto battle MVP local; resultado não é autoridade do servidor. |
| Dungeons | MOCK | Frontend | Local/mock | Não | Fase 7 | Dungeons e limites visuais existem; tentativas/rewards não são reais. |
| Summon | MOCK | Frontend | Local/mock | Não | Fase 8 | Gacha visual existe; rolls/pity não são server-side. |
| Shop | PREPARED | Frontend | Local/mock | Não | Fase 11 | Catálogo visual preparado; compras reais bloqueadas. |
| Wallet | PREPARED | Frontend | Local/mock | Não | Fase 11 | Wallet/TON Connect preparados, sem pagamentos reais. |
| Fonte do Aether | MOCK | Frontend | Local/mock | Não | Fase 12 | Experiência visual/mock; sem fragments reais ou saques. |
| Hero catalog | MOCK | Frontend/data local | Arquivos locais | Não | Fase 5 | Catálogo local serve ao MVP e previews. |
| Player inventory | MOCK | Frontend/data local | Local/mock | Não | Fase 3 | Inventário real depende de schema, RLS e bootstrap seguro. |
| Collection | MOCK | Frontend/data local | Local/mock | Não | Fase 3 | Coleção real depende de owned heroes persistidos. |
| Campaign | MOCK | Frontend/data local | Local/mock | Não | Fase 7 | Progresso real depende de persistência e validação server-side. |
| Stamina | MOCK | Frontend/data local | Local/mock | Não | Fase 3 | Consumo real deve ser server-side e transacional. |
| Hero progression | MOCK | Frontend/helpers | Local/mock | Não | Fase 5 | Helpers existem; upgrades reais exigem custos server-side. |
| Gear | PLANNED | Data/UI parcial | Não | Não | Fase 5 | Sistema completo ainda não implementado. |
| Battle engine | MOCK | Frontend | Local/mock | Não | Fase 6 | MVP local sem autoridade server-side. |
| Battle rewards | BLOCKED | Mock visual | Não | Não | Fase 4 | Bloqueado até validação server-side e persistência. |
| Dungeon rewards | BLOCKED | Mock visual | Não | Não | Fase 7 | Bloqueado até dungeons server-side e idempotência. |
| Gacha | MOCK | Frontend | Local/mock | Não | Fase 8 | Não usar para resultados reais. |
| Pity | MOCK | Frontend visual | Local/mock | Não | Fase 8 | Pity real deve ser transacional e auditável. |
| Duplicate conversion | PLANNED | Não operacional | Não | Não | Fase 8 | Depende de gacha server-side e hero shards. |
| Telegram UI | PREPARED | Frontend hook | Não aplicável | Não | Fase 2 | WebApp preparado; `initDataUnsafe` apenas UI. |
| Telegram authentication | BLOCKED | Edge Functions preparadas, sem deploy | Não | Preparada, não operacional | Fase 2B | Requer secrets, deploy, teste real e integração frontend. |
| Telegram initData validator | PREPARED | Supabase Edge Function helper | Não | Sim | Fase 2B | Validação criptográfica preparada em código, ainda sem deploy e sem secrets reais. |
| Veyra session signer | PREPARED | Supabase Edge Function helper | Não | Sim | Fase 2B | Emissão HMAC de sessão curta preparada; não é Supabase Auth JWT. |
| Veyra session verifier | PREPARED | Supabase Edge Function helper | Não | Sim | Fase 2B | Verificação server-side preparada para futuras Edge Functions. |
| Telegram authentication production | PREPARED | Supabase Edge Functions + frontend | Não | Sim | Teste real/observação | Secrets e deploy foram feitos manualmente; frontend agora consome endpoints reais quando há `initData`. |
| Telegram auth deployment readiness | PREPARED | Documentação/validação/GitHub Actions | Não | Parcial, validada em ambiente local | Fase 2C | Checklists de deploy, secrets, CORS, rollback, teste real e workflow manual preparados. |
| Deno validation | PREPARED | Supabase Edge Functions | Não | Sim | Fase 2C | Deno instalado temporariamente fora do repo para fmt, lint, testes e checks. |
| Supabase Edge Functions deploy | PREPARED | GitHub Actions manual | Não | Sim, pendente em produção | Fase 2C | Workflow manual preparado para `telegram-auth` e `telegram-session`, mas não executado nesta tarefa. |
| Telegram real auth test | READY FOR MANUAL TEST | Telegram Mini App/Supabase | Não | Sim, pendente de observação manual | Teste real/observação | Abrir o Mini App no Telegram e confirmar sessão conectada, refresh e fallback fora do Telegram. |
| Frontend auth integration | ACTIVE | Frontend | Memória apenas | Sim, via Edge Functions | Teste real/observação | Usa `initData` bruto em `telegram-auth`, confirma em `telegram-session` e mantém token Veyra somente em memória. |
| Supabase Auth integration | DEFERRED | Não operacional | Não | Não | ADR futura | Fase 2C segue usando sessão curta Veyra; não usa Supabase Auth JWT. |
| Supabase client | PREPARED | Frontend client | Não aplicável | Parcial/não crítico | Fase 3 | Client preparado com publishable key; sem schema real. |
| Supabase schema | PREPARED | Migration | `veyra_players` mínima | Parcial | Aplicação manual | Migration 2D preparada; inventário/economia ainda planejados. |
| RLS | PREPARED | Migration | `veyra_players` | Parcial | Aplicação manual | RLS habilitado na tabela mínima, sem policy pública. |
| Player bootstrap server-side | PREPARED | Edge Function + frontend | Parcial | Sim | Deploy/teste manual | `player-bootstrap` valida sessão Veyra e sincroniza player mínimo. |
| Player persistence | PARTIAL | Supabase schema mínimo | `veyra_players` preparada | Sim | Fase 3 | Perfil mínimo preparado; estado completo do jogador ainda não existe. |
| Inventory persistence | PLANNED | Não operacional | Não | Não | Fase 3 | Inventário real continua fora da Fase 2D. |
| Economy persistence | PLANNED | Não operacional | Não | Não | Fase futura | Moedas, rewards, compras e saldos reais seguem bloqueados. |
| Rewards persistence | PLANNED | Não operacional | Não | Não | Fases 4+ | Rewards reais exigem validação server-side específica. |
| Monetag | PREPARED | Frontend/mock | Local/mock | Não | Fase 10 | Ads recompensados reais exigem validação server-side. |
| Telegram Stars | PREPARED | Frontend/mock | Não | Não | Fase 11 | Bens digitais internos somente após confirmação server-side. |
| TON Connect | PREPARED | Frontend/mock | Não | Não | Fase 11 | Conexão preparada; pagamento real não validado. |
| TON payments | BLOCKED | Não implementado | Não | Não | Fase 11 | Bloqueado até backend, confirmação e ledger. |
| Gram / TON terminology | PREPARED | Documentação | Não aplicável | Não aplicável | Fase 1.1 | Guardrails oficiais definidos para separar display Gram/GRAM de TON técnico. |
| Gram UI copy | PLANNED | Documentação | Não aplicável | Não aplicável | Fase 11 | UI futura pode exibir Gram/GRAM sem alterar nomes técnicos. |
| TON Connect technical naming | PREPARED | Documentação/técnico | Não aplicável | Não aplicável | Fase 11 | TON Connect permanece como nome técnico da integração de wallet. |
| Gram payments | BLOCKED | Não implementado | Não | Não | Fase 11 | Pagamentos reais em Gram na rede TON exigem backend, confirmação, idempotência e auditoria. |
| Gram withdrawals | BLOCKED | Não implementado | Não | Não | Fase 12 | Saques em Gram estão bloqueados até revisão econômica/jurídica, antifraude e processo manual. |
| Aether Fragments | BLOCKED | Mock/conceito | Não | Não | Fase 12 | Depende de revisão econômica/jurídica e antifraude. |
| Withdrawals | BLOCKED | Não implementado | Não | Não | Fase 12 | Saques reais bloqueados; futuro processo manual. |
| Antifraude | PLANNED | Documentação/plano | Não | Não | Fases 10-13 | Necessário antes de ads, pagamentos e fragments reais. |
| Assets finais | PLANNED | Placeholder/UI MVP | Não aplicável | Não aplicável | Fase 9 | Retratos, ícones e FX finais ainda não existem. |
| Analytics | PLANNED | Não implementado | Não | Não | Fase 13 | Adiar até beta/produção observável. |
| Automated tests | PLANNED | Não implementado | Não aplicável | Não aplicável | Fases futuras | Ainda não há suíte automatizada dedicada além de lint/build/typecheck. |


## Atualização Fase 2E/2F

| Funcionalidade | Status | Camada atual | Persistência | Validação server-side | Próxima fase | Observação |
|---|---|---|---|---|---|---|
| Player core profile | PREPARED | Supabase + Edge Function + frontend | `veyra_players` | Sim | Validação manual | Level, XP, power, stage e onboarding preparados como read model seguro. |
| Player profile persistence | PARTIAL | Supabase schema mínimo | `veyra_players` | Sim | Fase 3 | Persistência mínima existe; inventário/economia/progressão transacional ainda não existem. |
| Phase 2 foundation | READY FOR VALIDATION | Auth + player bootstrap | Parcial | Sim | Fechamento manual | Depende de migration, deploy e teste no Telegram Mini App. |
| Gameplay state persistence | PLANNED | Não operacional | Não | Não | Fase 3 | Deve iniciar com contratos server-aware. |
| Economy persistence | PLANNED | Não operacional | Não | Não | Fase futura | Moedas/rewards/compras continuam bloqueados. |
| Inventory persistence | PLANNED | Não operacional | Não | Não | Fase 3 | Inventário real permanece fora da Fase 2. |
