# Veyra: Aetherfall

**Veyra: Aetherfall** é um RPG gacha dark fantasy para Telegram Mini App.

> Colete os caídos. Domine o Aether. Reconstrua um mundo partido.

## Stack

- React
- Vite SPA
- TypeScript
- Tailwind CSS
- Vercel
- Supabase preparado
- Telegram Mini App preparado
- Monetag rewarded ads mock/preparado
- TON Connect preparado
- Telegram Stars preparado

## Rodar local

```bash
npm install
npm run dev
```

## Variáveis de ambiente

Copie `.env.example` para `.env` e preencha apenas chaves públicas `VITE_*` quando existirem.

Nunca coloque secrets no frontend. Não use service role no browser.

## Deploy Vercel

- Framework Preset: Vite
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

## O que está implementado no MVP

- AppShell mobile-first com Topbar e BottomNav.
- Home premium de RPG gacha.
- Heroes grid com raridade, power, filtros e detail modal.
- Battle MVP 5v5 auto turn-based com action bar, HP, energia e logs.
- Dungeons com limites, stamina e rewards preview.
- Summon mock com custos, pity visual e reveal grid.
- Shop separada por Free, Ads, Gems, Stars e TON.
- Wallet preparada com copy segura TON.
- Fonte do Aether com anúncios Monetag limitados.
- RPG data layer: heróis, progressão, skills, ascension, awaken, gear, power, elementos, campanha, dungeons e rewards.
- Economy layer: monetização, Aether Fountain e Aether Fragments futuros.
- Supabase client preparado somente com publishable key.
- Telegram Mini App hook com fallback dev.

## O que precisa virar server-side antes de produção

- Validação Telegram `initData`.
- Rewarded ads Monetag.
- Gacha, pity e duplicate conversion.
- Battle rewards e inventory changes.
- Dungeons e upgrades.
- Telegram Stars purchases.
- TON payments.
- Aether Fragments, antifraude e withdrawals.

## Segurança econômica

Gold, Gems, Aether Shards, Stamina, materiais e Hero XP nunca podem virar TON. Aether Fragments são sistema futuro separado, variável, revisado e sem promessa de renda.
