# Stage 1–8 Asset Integration

Este fluxo usa `v_ui_a.zip`, `v_ui_b.zip` e `v_ui_c.zip`, já presentes na `main`, como fontes compactadas oficiais do pacote visual aprovado para Stage 1–8.

Nenhum binário extraído de imagem é versionado. Os PNG/WebP/JPG usados em runtime são gerados localmente por `npm run extract:assets` antes de `npm run dev` e antes de `npm run build`.

## Categorias cobertas

- `backgrounds`: Home, Summon, Campaign e Battle.
- `ui`: painel, botões e divisor arcano.
- `icons`: moedas, stamina, tickets, wallet, settings e lock.
- `frames`: molduras de raridade selecionadas.
- `banners`: banners Standard, Astral, Divine, Mythic e Beginner.
- `fx`: portal, summon glow, hit, heal, fire, arcane, slot active glow e UI shimmer.
- `heroes`, `enemies`, `items` e `spritesheets`: placeholders runtime gerados, sem personagens finais.

## Itens intencionalmente pulados

- Previews, review sheets e contact sheets.
- `source_zips` e duplicatas de pacote completo.
- Sheets brutas completas.
- Personagens, sprites e FX de Stage 10.
- Ícones de skill, ultimate icons, battle FX finais de heróis e sprites finais.

## Preservação da aplicação

As telas existentes, `AppShell`, `Topbar`, `BottomNav`, React, Vite, TypeScript, Tailwind, manifesto existente e fallback local foram preservados. O manifesto oficial continua sendo `src/lib/assets/gameAssets.ts`.

## Stage 10

Stage 10 permanece pausado. Esta integração prepara apenas assets runtime selecionados de Stage 1–8 e não integra personagens finais.
