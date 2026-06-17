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
| Telegram authentication production | BLOCKED | Supabase Edge Functions | Não | Sim, não implantada | Fase 2C | Bloqueada até secrets, deploy manual, teste real e integração frontend. |
| Telegram auth deployment readiness | PREPARED | Documentação/validação/GitHub Actions | Não | Parcial, validada em ambiente local | Fase 2C | Checklists de deploy, secrets, CORS, rollback, teste real e workflow manual preparados. |
| Deno validation | PREPARED | Supabase Edge Functions | Não | Sim | Fase 2C | Deno instalado temporariamente fora do repo para fmt, lint, testes e checks. |
| Supabase Edge Functions deploy | PREPARED | GitHub Actions manual | Não | Sim, pendente em produção | Fase 2C | Workflow manual preparado para `telegram-auth` e `telegram-session`, mas não executado nesta tarefa. |
| Telegram real auth test | PLANNED | Telegram Mini App/Supabase | Não | Sim, pendente em produção | Fase 2C | Teste real exige `initData` do Telegram e secrets configurados fora do Git. |
| Frontend auth integration | PLANNED | Frontend futuro | Não | Depende de deploy/teste real | Fase 2C | Token Veyra deverá ficar apenas em memória. |
| Supabase Auth integration | DEFERRED | Não operacional | Não | Não | ADR futura | Sessão Veyra da Fase 2A não é Supabase Auth JWT. |
| Supabase client | PREPARED | Frontend client | Não aplicável | Parcial/não crítico | Fase 3 | Client preparado com publishable key; sem schema real. |
| Supabase schema | PLANNED | Documentação/plano | Não | Não | Fase 3 | Schema real ainda não aplicado. |
| RLS | PLANNED | Documentação/plano | Não | Não | Fase 3 | Obrigatório antes de dados públicos reais. |
| Player persistence | BLOCKED | Não implementada | Não | Não | Fase 3 | Bloqueada até auth segura e schema. |
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
