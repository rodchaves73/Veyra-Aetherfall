# Pipeline de assets | Veyra: Aetherfall

A Fase 4A.1 define a fundação oficial para receber assets 2D reais gratuitos. O modelo visual passa a ser **React + CSS 2D + assets reais**, sem Canvas e sem Phaser nesta fase.

## Onde colocar assets

Todos os assets de jogo devem ficar em `public/assets/game`:

- `backgrounds/`: fundos de tela.
- `ui/`: painéis, botões, divisores e peças de interface.
- `icons/`: moedas, tickets, stamina, recursos e ícones simples.
- `frames/`: molduras de raridade.
- `banners/`: banners de summon e eventos futuros.
- `fx/`: efeitos visuais leves.
- `heroes/`: retratos de heróis.
- `enemies/`: inimigos.
- `items/`: itens e materiais.
- `spritesheets/`: spritesheets simples para animações futuras.
- `placeholders/`: fallbacks locais pequenos e seguros.

## Padrões de nome

Use nomes minúsculos, descritivos, em kebab-case e com categoria no início:

- `background-home-arcane-ruins.webp`
- `background-summon-portal.webp`
- `ui-panel-dark-arcane.png`
- `icon-gold.png`
- `frame-legendary.png`
- `banner-standard.webp`
- `fx-summon-glow.png`
- `hero-mira-first-seal.webp`

## Formatos recomendados

- `webp` para backgrounds, banners e retratos sem necessidade de transparência perfeita.
- `png` para UI com transparência, frames e FX.
- `svg` para ícones simples e placeholders próprios.
- `png` ou `webp` para spritesheets leves.

## Tamanhos e limites recomendados

- Background mobile: até 300 KB.
- Banner: até 200 KB.
- Ícone: até 50 KB.
- Frame: até 100 KB.
- Hero portrait: até 250 KB.
- Spritesheet simples: até 500 KB.

## Compressão

Antes de subir assets reais:

1. Cortar dimensões para o uso mobile real.
2. Remover metadados desnecessários.
3. Preferir WebP comprimido para imagens grandes.
4. Validar visual em 360px, 390px e 430px portrait.
5. Evitar backgrounds gigantes que aumentem o tempo de carregamento no Telegram Mini App.

## Registro de licença

Todo asset externo precisa ser registrado em `docs/ASSET_LICENSES.md` antes de uso em tela:

- nome do pack;
- autor;
- site;
- link;
- licença;
- exigência de atribuição;
- permissão de uso comercial;
- arquivos usados;
- data de download;
- observações.

Assets com licença pendente devem ficar fora de telas reais até verificação.

## Como adicionar no manifesto

1. Copiar o arquivo otimizado para a pasta correta em `public/assets/game`.
2. Registrar ou atualizar o item em `src/lib/assets/gameAssets.ts`.
3. Manter `fallbackSrc` apontando para um placeholder local.
4. Atualizar tipos em `src/lib/assets/gameAssets.types.ts` se uma nova chave oficial for necessária.
5. Não carregar URL externa diretamente como asset crítico.

## Como usar nos componentes

- Use `GameAssetImage` para imagens com fallback seguro e `loading="lazy"` quando fizer sentido.
- Use `GameBackground` para fundos de tela sem bloquear scroll e sem overflow horizontal.
- Use `RarityFrame` para composição com classes `.veyra-rarity-*` e frame futuro opcional.
- Use `AssetSlot` para marcar slots visuais ainda sem arte final.

## O que não pode subir

- Assets pagos sem licença compatível.
- Assets com copyright de franquias.
- Arquivos gigantes.
- PSD, AI ou arquivos fonte pesados.
- ZIP de pack inteiro dentro do projeto.
- Assets com licença desconhecida.
- Secrets, URLs privadas, tokens ou chaves dentro de metadados ou nomes de arquivo.

## Performance

- Usar assets locais em `public/assets/game`.
- Preferir WebP para imagens grandes.
- Comprimir imagens antes do commit.
- Evitar animações pesadas.
- Usar `loading="lazy"` em imagens não críticas.
- Futuras animações devem priorizar `transform` e `opacity`.
- Não usar Canvas ou Phaser nesta fase.
