# GACHA SYSTEM DESIGN

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

## Banners e pity

Banners base: standard_banner, astral_covenant, divine_focus_weekly, mythic_focus_weekly, event_banner_weekly planejado e beginner_banner. Standard usa rates 45/28/16/7/2/1.2/0.8. Astral não permite Common e usa 35/34/20/7/2.5/1.5.

Pity por grupos: standard, astral, divine_focus, mythic_focus, event e beginner. Carry-over ocorre por grupo. Featured guarantee em divine/mythic focus está modelado para evolução e mantido server-side.

## Duplicatas

Duplicatas viram hero shards e soul dust; Divine/Mythic também concedem sigils internos não sacáveis. Novo herói cria uma linha única em `veyra_player_heroes`.
