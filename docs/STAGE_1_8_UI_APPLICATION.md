# Stage 1–8 UI Application

Esta entrega aplica os assets gerados em tempo de build/dev às telas existentes do MVP, sem reconstruir rotas, shell, navegação, dados mockados ou lógica de economia.

## Telas atualizadas visualmente

- **AppShell:** recebeu tratamento global de fundo arcano, poeira/motes e glow estrutural leve.
- **Home:** usa `background-home-arcane-ruins.webp`, `fx-portal.png`, painel arcano, botões gerados e ícones de gold/gems/stamina/tickets.
- **Summon:** usa `background-summon-portal.webp`, `fx-summon-glow.png`, `fx-portal.png`, ícones de tickets/moedas e botões premium.
- **Heroes/Collection:** usa `hero-placeholder.webp`, frames de raridade e glow de slot ativo.
- **Dungeons/Missions/Campaign shell:** usa `background-campaign-ruins.webp`, `banner-beginner.webp` e painéis arcane.
- **Shop/Rewards/Offers:** usa `banner-beginner.webp`, painel arcane e shimmer/reward shine leve.
- **Battle:** usa `background-battle-aetherfield.webp`, placeholders de herói/inimigo, `fx-arcane.png`, frames e glow de target/slot ativo.
- **Wallet/Profile shell:** usa `icon-wallet.png`, painel arcane e shimmer leve no CTA visual.
- **Fonte do Aether:** usa o tema de campanha/rewards com painel arcane e reward shine.

## Telas intencionalmente pouco alteradas

- Settings/account dedicados ainda não existem como tela separada; a área Wallet recebeu o tratamento estrutural correspondente.
- Inventory/Equipment dedicados não existem como rota atual; o status visual fica preparado pelos componentes `VeyraAssetFrame` e `item-placeholder.png` para uma futura tela.

## Não implementado

- Nenhuma imagem gerada foi adicionada ao Git.
- Nenhum sistema real de compra, TON, Stars, NFT, marketplace, saque ou Aether Fragment foi implementado.
- Nenhum cálculo de gacha, pity, batalha, recompensa, inventário ou economia foi alterado.
- Nenhum herói final, sprite, splash art, ícone de skill ou ultimate da Stage 10 foi integrado.

## Stage 10

Stage 10 permanece pausada. Os cards usam placeholders e molduras, sem assets finais de personagens.
