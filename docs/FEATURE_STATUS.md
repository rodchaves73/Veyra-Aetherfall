# Status oficial de funcionalidades | Veyra: Aetherfall

Este documento diferencia funcionalidades reais, foundations server-side, sistemas preparados e telas mock/shell. Não trate UI mock como sistema final completo.

## Legenda

- **DONE:** implementado, aplicado/deployado quando necessário e validado no fluxo real descrito.
- **PARTIAL:** integração ou experiência existe, mas ainda não cobre a versão final completa.
- **PREPARED:** contratos, base técnica ou schema preparados para fase futura; não é funcionalidade final completa.
- **MOCK/SHELL:** tela, preview ou comportamento visual/local sem autoridade real.
- **PLANNED:** planejado para fase futura.
- **BLOCKED/FUTURE:** bloqueado até revisão, fase específica ou infraestrutura adicional.

## Status atual

| Funcionalidade | Status | Camada atual | Persistência | Validação server-side | Próxima fase | Observação |
|---|---|---|---|---|---|---|
| AppShell | DONE | Frontend | Não aplicável | Não aplicável | Fase 4A | Shell mobile MVP existe; Fase 4A deve elevar base visual e game shell. |
| Mobile safe area | DONE | Frontend/CSS | Não aplicável | Não aplicável | Fase 4A | Portrait, safe area, scroll e overflow continuam obrigatórios. |
| Telegram Auth | DONE | Edge Functions + frontend | Sessão Veyra curta | Sim | Observabilidade futura | `initData` validado server-side; `initDataUnsafe` fica só para UI. |
| Player Bootstrap | DONE | Edge Function + Supabase | `veyra_players` | Sim | Evoluções futuras | Player real mínimo sincronizado via sessão Veyra. |
| Player Core Profile | DONE | Edge Function + Supabase | `veyra_players` | Sim | Evoluções futuras | Read model seguro com level, XP, power e stage básico. |
| Game-state | DONE | Edge Function + Supabase | Foundation real | Sim | Fase 4A/4B | Carregou no Mini App após Fase 3. |
| Starter Pack | DONE | Edge Function/RPC | Foundation real | Sim | Fase 4B | Claim server-side funcionou uma única vez. |
| Currencies foundation | DONE | Supabase/RPC | Foundation real | Sim | Fases futuras | Moedas/tickets base testados; não implica pagamentos reais. |
| Hero catalog foundation | DONE | Supabase/data seed | Foundation real | Sim | Fase 4D | Catálogo base disponível para UI. |
| Banners foundation | DONE | Supabase/data seed | Foundation real | Sim | Fase 4C | Banners base disponíveis para summon. |
| Gacha-summon server-side foundation | DONE | Edge Function/RPC | Foundation real | Sim | Fase 4C | Summon 1x e 10x testados; frontend não sorteia. |
| Pity foundation | DONE | Supabase/RPC | Foundation real | Sim | Fase 4C | Pity server-side testado como foundation. |
| Duplicate conversion foundation | DONE | Supabase/RPC | Foundation real | Sim | Fase 4C/4D | Duplicatas geram shards/soul dust via servidor. |
| Summon frontend integration | PARTIAL | Frontend + Edge Function | Via servidor | Sim | Fase 4C | Integração existe, mas UI premium/reveal/histórico final ainda não. |
| Home UI | MOCK/SHELL | Frontend | Visual/local parcial | Não para UI | Fase 4B | Deve ser elevada para Home RPG Premium. |
| Heroes UI | MOCK/SHELL | Frontend | Visual/local parcial | Não para UI | Fase 4D | Coleção visual não deve fingir upgrade final completo. |
| Campaign UI | MOCK/SHELL | Frontend | Visual/local parcial | Não | Fase 4E | Progressão real está preparada, mas UI ainda shell. |
| Battle UI | MOCK/SHELL | Frontend | Visual/local parcial | Não | Fase 4E | Battle visual/local não é autoridade de resultado persistente. |
| Shop UI | MOCK/SHELL | Frontend | Visual/local parcial | Não | Fase futura | Compras reais seguem bloqueadas. |
| Battle loop | PREPARED | Regras/base | Não final | Parcial/contratos | Fase futura | Foundation existe; persistência de resultado ainda não. |
| Campaign progression real | PREPARED | Supabase/contratos | Preparada | Sim em fase futura | Fase futura | Não tratar como fluxo final completo. |
| Battle result persistence | PREPARED | Contratos/foundation | Não final | Exigida | Fase futura | Resultado real requer validação/idempotência server-side específica. |
| Dungeon result persistence | PREPARED | Contratos/foundation | Não final | Exigida | Fase futura | Rewards reais de dungeon ainda não estão ativos. |
| Hero upgrade execution | PREPARED | Foundation | Não final | Exigida | Fase futura | Custos e execução reais precisam fase própria. |
| Gear | PREPARED | Data/contratos | Não final | Exigida | Fase futura | Sistema completo ainda não implementado. |
| Ads reward claims | PLANNED | Não operacional | Não | Exigida | Fase futura | Monetag real e claims precisam validação antiabuso. |
| Guild | PLANNED | Não operacional | Não | Exigida | Fase futura | Fora da Fase 4A. |
| Raid | PLANNED | Não operacional | Não | Exigida | Fase futura | Fora da Fase 4A. |
| Events | PLANNED | Não operacional | Não | Exigida | Fase futura | Fora da Fase 4A. |
| Monetag | PREPARED | Frontend/mock | Local/mock | Não | Fase futura | Ads recompensados reais exigem validação server-side. |
| Telegram Stars | BLOCKED/FUTURE | Frontend/mock | Não | Exigida | Fase específica | Sem Stars reais nesta fase. |
| TON Connect | PREPARED | Frontend/mock | Não | Não final | Fase específica | Conexão preparada; pagamento real bloqueado. |
| TON real | BLOCKED/FUTURE | Não implementado | Não | Exigida | Fase específica | Nenhum crédito real de TON/Gram. |
| Gram real | BLOCKED/FUTURE | Não implementado | Não | Exigida | Fase específica | Gram é terminologia de UI futura; sem saldo real. |
| Aether Fragments | BLOCKED/FUTURE | Conceito/mock | Não | Exigida | Revisão econômica/jurídica | Bloqueado até fase aprovada. |
| Withdrawals | BLOCKED/FUTURE | Não implementado | Não | Exigida | Revisão específica | Saques reais bloqueados. |
| Marketplace | BLOCKED/FUTURE | Não implementado | Não | Exigida | Fase específica | Fora do MVP atual. |
| NFT | BLOCKED/FUTURE | Não implementado | Não | Exigida | Fase específica | Fora do MVP atual. |
| Antifraude | PLANNED | Plano/contratos | Não final | Exigida | Fases futuras | Necessário antes de ads/pagamentos/fragments. |
| Asset pipeline | DONE | Frontend/public assets | Não aplicável | Não aplicável | Fase 4A.2 | Manifesto, placeholders e componentes utilitários criados sem assets externos reais. |
| Assets finais | PLANNED | Placeholder/UI MVP | Não aplicável | Não aplicável | Fase 4+ | Arte final real ainda depende de packs licenciados e registro em `docs/ASSET_LICENSES.md`. |
| Analytics | PLANNED | Não implementado | Não | Não | Beta/produção | Adiar até observabilidade de beta. |

## Segurança confirmada

- O frontend não sorteia gacha.
- O frontend não entrega resources, starter pack, moedas, shards, soul dust ou rewards reais.
- Starter pack e summon são server-side.
- RPCs críticas são `service_role` only.
- Tokens Veyra não ficam em `localStorage`, `sessionStorage` ou cookies.
- Supabase service role não é exposta ao frontend.

## Próxima fase autorizada

- **Fase 4A.2 — Game Shell + Topbar + Bottom Nav.**
