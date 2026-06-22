# Fase 4A.1 | Asset Pipeline Foundation

## Objetivo

Preparar o Veyra: Aetherfall para receber assets 2D reais gratuitos com estrutura pública, manifesto TypeScript, placeholders locais, componentes utilitários e documentação de pipeline/licenças.

## Entregáveis

- Estrutura `public/assets/game/**` criada para backgrounds, UI, ícones, frames, banners, FX, heróis, inimigos, itens, spritesheets e placeholders.
- Placeholders SVG leves criados localmente, sem assets externos e sem conteúdo protegido.
- Manifesto central `gameAssets` criado em `src/lib/assets/gameAssets.ts`.
- Tipos de assets e spritesheets criados em `src/lib/assets/gameAssets.types.ts`.
- Export central criado em `src/lib/assets/index.ts`.
- Componentes utilitários criados em `src/components/assets`.
- Documentação criada em `docs/ASSET_PIPELINE.md` e `docs/ASSET_LICENSES.md`.

## Fora do escopo preservado

Não foram baixados assets externos, adicionados binários grandes, redesenhadas telas, criadas animações complexas, alterados sistemas de game-state/gacha/auth/Supabase, nem adicionadas dependências.

## Segurança

A fase não introduz `localStorage`, `sessionStorage`, `document.cookie`, service role, bot token, segredo de sessão, gacha client-side, reward client-side, auth bypass, downloads automáticos ou URLs externas como assets críticos.

## Próxima fase

**Fase 4A.2 — Game Shell + Topbar + Bottom Nav**, usando tokens da Fase 4A.0, asset pipeline da Fase 4A.1, componentes de asset e placeholders locais.
