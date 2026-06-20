# GAME SYSTEMS FOUNDATION

Fase 3 prepara a fundação reutilizável do RPG gacha com autoridade server-side. O frontend exibe e solicita ações, mas não concede recursos, não sorteia gacha e não altera pity.

## Entregues nesta fase

- Schema Supabase com RLS habilitado e sem policies públicas para tabelas de heróis, moedas, heróis possuídos, shards, starter grant, banners, pity, histórico, conteúdo e ads.
- Edge Functions `game-state` e `gacha-summon` usando sessão Veyra e service role somente no servidor.
- Starter pack idempotente em `veyra_claim_starter_pack`.
- Summon transacional em `veyra_perform_gacha_summon` com custos, pity, duplicatas, shards e soul dust.
- Elementos: fire, water, nature, light, dark e arcane.
- Classes, raças, facções jogáveis/inimigas, raridades, banners e rates base.

## Planejado

Batalha persistente, dungeon rewards, guilda, raid, eventos, Monetag real, pagamentos, Stars, TON/Gram, marketplace, NFT, Aether Fragments e saques continuam fora do escopo.

## Segurança

Nenhum secret deve ser exposto no cliente. Claims de ads, compras, rewards, battle finish e dungeon finish exigem validação server-side futura.

## Patch pré-merge PR #16

A fundação de gacha foi corrigida para usar rates reais dos banners no servidor, adicionar `event_banner_weekly`, aplicar limite/garantias do Beginner Banner e implementar featured guarantee 70/30 para banners com featured. O frontend permanece apenas como consumidor de estado e executor de chamadas server-side.
