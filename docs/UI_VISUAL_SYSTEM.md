# Sistema visual | Veyra: Aetherfall

Este documento define a fundação visual da Fase 4A.0 para uso nas próximas subfases. A direção é **Dark Arcane Fantasy Mobile RPG**, com UI gacha AAA mobile, anime semi-realista premium, roxo/azul/preto/dourado, cristais, runas, portais e ruínas antigas.

## Escopo da Fase 4A.0

- Apenas tokens CSS, classes utilitárias visuais e documentação.
- Nenhuma tela final foi refeita.
- Nenhum sistema econômico, gacha, reward, pagamento, TON, Gram, Stars, Aether, NFT ou marketplace foi implementado.

## Arquivos CSS

- `src/styles/veyra-theme.css`: tokens globais, paleta, raridades, sombras, scrollbars e base global segura.
- `src/styles/veyra-components.css`: classes reutilizáveis para fundo, telas, painéis, cards, botões, chips, estados e raridades.
- `src/styles/globals.css`: importa os novos arquivos para manter a menor alteração possível no carregamento global já existente.

## Tokens principais

A base usa `:root` com variáveis `--veyra-*` para fundos, painéis, bordas, cores premium, radius e shadows. As raridades usam `--rarity-*` e seus glows correspondentes.

## Raridades oficiais

| Rarity | Border | Glow |
|---|---:|---:|
| common | `#64748b` | `rgba(100,116,139,0.35)` |
| uncommon | `#22c55e` | `rgba(34,197,94,0.35)` |
| rare | `#38bdf8` | `rgba(56,189,248,0.4)` |
| epic | `#a855f7` | `rgba(168,85,247,0.45)` |
| legendary | `#facc15` | `rgba(250,204,21,0.45)` |
| divine | `#fff7cc` | `rgba(255,247,204,0.55)` |
| mythic | `#f472b6` | `rgba(244,114,182,0.55)` |

## Classes reutilizáveis obrigatórias

- Layout: `.veyra-app-bg`, `.veyra-screen`, `.veyra-safe-bottom`.
- Containers: `.veyra-panel`, `.veyra-panel-header`, `.veyra-card`, `.veyra-card-hover`.
- Botões: `.veyra-button`, `.veyra-button-primary`, `.veyra-button-secondary`, `.veyra-button-gold`, `.veyra-button-danger`, `.veyra-button-disabled`.
- HUD/chips: `.veyra-currency-chip`, `.veyra-reward-chip`.
- Tipografia/divisores: `.veyra-section-title`, `.veyra-divider`.
- Raridades: `.veyra-rarity-common`, `.veyra-rarity-uncommon`, `.veyra-rarity-rare`, `.veyra-rarity-epic`, `.veyra-rarity-legendary`, `.veyra-rarity-divine`, `.veyra-rarity-mythic`.
- Efeitos/estados: `.veyra-glow-arcane`, `.veyra-glow-gold`, `.veyra-loading`, `.veyra-empty-state`, `.veyra-error-state`.

## Regras mobile-first

- Usar `.veyra-screen` como wrapper de telas futuras para limitar largura em até 430px e preservar scroll vertical.
- Manter touch targets de botões com altura mínima de 44px.
- Evitar overflow horizontal em telas portrait de 360px, 390px e 430px.
- Respeitar `env(safe-area-inset-bottom)` com `.veyra-safe-bottom`.
- Manter animações leves e respeitar `prefers-reduced-motion`.

## Próxima aplicação

A Fase 4A.1 adicionou a fundação de pipeline de assets 2D em `public/assets/game`, manifesto `gameAssets` e componentes utilitários. A Fase 4A.2 deve aplicar tokens e placeholders locais no Game Shell, Topbar e Bottom Nav sem criar autoridade client-side para economia, rewards ou gacha.
