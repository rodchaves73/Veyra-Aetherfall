# Arquitetura

Veyra: Aetherfall é um Vite SPA mobile-first para Telegram Mini App. O MVP usa estado local/mockado para gameplay, economia, summon, battle rewards, Monetag, Stars e TON, mantendo integração real para uma etapa server-side futura.

## Princípios

- Nenhuma secret no frontend.
- Service role do Supabase nunca deve entrar no browser.
- Telegram `initDataUnsafe` é apenas conveniência visual.
- Gacha, pity, rewarded ads, pagamentos, saques, inventário e rewards reais devem ser validados server-side.
- Gold, Gems, Aether Shards, Stamina, materiais e Hero XP nunca viram TON.

## Camadas

- `src/app`: shell mobile e navegação por estado.
- `src/components`: design system dark aether fantasy.
- `src/screens`: Home, Heroes, Battle, Dungeons, Summon, Shop, Wallet e Fonte do Aether.
- `src/lib/rpg`: progressão, combate, campanha, dungeons, rewards e shop.
- `src/lib/economy`: monetização, Fonte do Aether e Aether Fragments futuros.
- `src/lib/telegram`, `src/lib/monetag`, `src/lib/ton`, `src/lib/supabase`: adapters preparados.
