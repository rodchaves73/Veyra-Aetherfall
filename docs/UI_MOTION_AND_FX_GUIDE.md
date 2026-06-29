# UI Motion and FX Guide

## Classes e keyframes adicionados

- `.veyra-screen-backdrop`: fundo de tela com vignette e overlay seguro.
- `.veyra-fx-layer` e `.veyra-mote-layer`: camadas decorativas sem bloquear cliques.
- `.veyra-arcane-panel`: painel profundo com textura gerada e shimmer sutil.
- `.veyra-asset-button` e `.veyra-gold-button`: botões visuais com assets gerados.
- `.veyra-resource-pill`: pílulas de recurso com ícones gerados.
- `.veyra-asset-frame`: frame reutilizável para cards, slots e unidades.
- `.veyra-glow-*`: glows por raridade.
- `.veyra-portal-breathe`, `.veyra-shimmer`, `.veyra-float-slow`, `.veyra-pulse-selected`, `.veyra-target-pulse`, `.veyra-summon-ring`, `.veyra-reward-shine`.

Keyframes principais: `veyraPortalBreathe`, `veyraRuneDrift`, `veyraSoftShimmer`, `veyraFloatSlow`, `veyraSelectedPulse`, `veyraTargetPulse`, `veyraSummonRing` e `veyraRewardShine`.

## Como usar camadas FX

Use `VeyraScreen` para envolver telas que precisam de fundo/FX e `VeyraFxLayer` somente quando uma tela precisar de camada decorativa adicional. As camadas usam `pointer-events: none` e não devem conter elementos interativos.

## Regras de performance

- Preferir animações de `transform`, `opacity` e brilho leve.
- Evitar blur animado em tela cheia.
- Manter partículas em baixa opacidade e sem DOM excessivo.
- Não animar layout, tamanho ou posição que cause reflow constante.
- Preservar `overflow-x: hidden` e layout mobile-first 360–430px.

## Reduced motion

Todas as animações decorativas adicionadas são desligadas ou simplificadas dentro de `@media (prefers-reduced-motion: reduce)`.

## Onde não usar efeitos pesados

- Não usar efeitos infinitos fortes em listas longas.
- Não aplicar shimmer em todo card simultaneamente quando houver grande quantidade de cards.
- Não usar FX para comunicar informação crítica; todo dado importante precisa existir em texto/estado.

## Restrições específicas de Battle

- Não embutir HP/energia em imagens.
- Não adicionar skill icons, ultimate icons, sprites finais ou animações finais de personagens.
- FX de hit/heal/arcane são decorativos e não alteram cálculo, resultado ou rewards.
