# PIXEL ART ASSET GENERATION — Codex Instructions
> Sistema procedural de geração de assets visuais usando `pixel_kit.py` + Pillow.
> Leia este documento inteiro antes de gerar qualquer asset.

---

## 1. Filosofia do sistema

Todo asset segue este pipeline invariável:

```
Desenho nativo pequeno  →  Auto-outline  →  Scale NEAREST  →  Save
     (grade em pixels)       (contorno ink)    (ampliação sem blur)
```

**Por que assim?**
- Desenhar pequeno força consistência de proporções
- Auto-outline elimina trabalho manual e padroniza o "ink" de todos os sprites
- Scale com NEAREST mantém o visual pixelado sem artefatos de suavização

Nunca use `Image.LANCZOS`, `Image.BILINEAR` ou qualquer resize com suavização. O único método aceito é `Image.NEAREST` via `scale_nn()`.

---

## 2. Estrutura de `pixel_kit.py`

### 2.1 Funções primitivas

| Função | Uso |
|--------|-----|
| `canvas(w, h)` | Cria imagem RGBA transparente |
| `px(img, x, y, color)` | Plota 1 pixel com verificação de bounds |
| `rect(img, x0, y0, x1, y1, color)` | Retângulo sólido |
| `rect_outline(img, x0, y0, x1, y1, color, w)` | Retângulo vazio (borda) |
| `pixel_circle(img, cx, cy, r, color)` | Círculo pixelado sem anti-aliasing |
| `vgradient(img, y0, y1, top, bottom, x0, x1)` | Gradiente vertical |
| `lerp_color(c0, c1, t)` | Interpolação linear entre duas cores |
| `ordered_dither_band(img, ...)` | Dithering Bayer 2×2 para transições |
| `stars(img, count, area, rng)` | Estrelas aleatórias reprodutíveis |
| `auto_outline(img, color, thickness)` | **Passo obrigatório** — contorno automático |
| `scale_nn(img, factor)` | Ampliação NEAREST (sem blur) |
| `save(img, path, scale, fmt)` | Amplia + salva PNG ou WEBP |
| `new_seed(name)` | `random.Random` com seed determinística por nome |

### 2.2 Paleta global (PALETTE)

Sempre use as constantes da paleta. Nunca escreva tuples de cor literal no código de asset — importe da paleta.

```python
# Cores base
INK        # (10, 8, 20, 255)   — contorno universal
INK_SOFT   # (24, 18, 46, 255)  — contorno suave

# Tons de void (fundos escuros)
VOID_950 → VOID_600

# Cores temáticas
PURPLE_100 → PURPLE_900
CYAN_100   → CYAN_900
GOLD_100   → GOLD_900
RED_300    → RED_900
GREEN_300  → GREEN_700

# Elementos
FIRE_HI, FIRE_MID, FIRE_LOW
WATER_HI, WATER_MID, WATER_LOW
NATURE_HI, NATURE_MID, NATURE_LOW
LIGHT_HI,  LIGHT_MID, LIGHT_LOW
DARK_HI,   DARK_MID,  DARK_LOW
AETHER_HI, AETHER_MID, AETHER_LOW

# Raridade (dict → (hi, mid, low))
RARITY["common" | "uncommon" | "rare" | "epic" | "legendary" | "divine" | "mythic"]
```

---

## 3. Tamanhos de grade nativos

| Tipo de asset | Grade nativa | Scale | Output final |
|---------------|-------------|-------|-------------|
| Ícone de habilidade | 16×16 | ×4 | 64×64 |
| Card thumbnail | 24×32 | ×4 | 96×128 |
| Sprite de personagem | 32×48 | ×4 | 128×192 |
| Orbe / gema | 12×12 | ×6 | 72×72 |
| Background de cena | 64×48 | ×3 | 192×144 |
| Banner de UI | 48×16 | ×4 | 192×64 |

Adapte os valores conforme o asset, mas mantenha sempre a proporção small-then-scale.

---

## 4. Pipeline obrigatório — passo a passo

```python
from pixel_kit import *

def make_meu_asset(path: str):
    # 1. Definir tamanho nativo
    W, H = 32, 32
    SCALE = 4  # → output 128×128

    # 2. Criar canvas transparente
    img = canvas(W, H)

    # 3. Desenhar na grade nativa usando primitivos
    #    (exemplos nas seções 5 e 6)

    # 4. AUTO-OUTLINE — sempre o penúltimo passo antes de salvar
    img = auto_outline(img, color=INK, thickness=1)
    #    Use thickness=2 apenas para assets grandes (≥64px nativos)

    # 5. Salvar com scale NEAREST
    save(img, path, scale=SCALE, fmt="PNG")
    print(f"Saved: {path}")

if __name__ == "__main__":
    make_meu_asset("assets/meu_asset.png")
```

---

## 5. Técnicas de desenho

### 5.1 Gradiente vertical (fundos, corpos de personagem)

```python
# Corpo com gradiente do centro luminoso para bordas escuras
vgradient(img, 0, H//2, PURPLE_300, PURPLE_700)
vgradient(img, H//2, H, PURPLE_700, PURPLE_900)
```

### 5.2 Dithering (transição de atmosfera)

```python
# Linha de transição entre céu e glow, 4px de altura
ordered_dither_band(img, 0, 20, W, 24, VOID_800, PURPLE_900, ratio=0.5)
```

### 5.3 Círculo pixelado (gemas, orbes, moedas)

```python
cx, cy, r = W//2, H//2, W//2 - 2
pixel_circle(img, cx, cy, r, CYAN_300)          # base
pixel_circle(img, cx - 2, cy - 2, r//3, CYAN_100)  # highlight
```

### 5.4 Highlight especular (brilho de topo esquerdo)

```python
# Pequeno retângulo claro no canto superior esquerdo de esferas/itens
rect(img, cx - r//2, cy - r//2, cx - r//4, cy - r//3, CYAN_100)
```

### 5.5 Rampa de sombra manual (shading em 3 tons)

```python
hi, mid, low = RARITY["epic"]  # desempacota 3 tons da raridade

rect(img, 4, 4, 12, 20, mid)   # corpo base
rect(img, 4, 4, 6,  20, hi)    # borda iluminada (esquerda)
rect(img, 10, 4, 12, 20, low)  # borda sombra (direita)
```

### 5.6 Estrelas de fundo (reprodutíveis)

```python
rng = new_seed("background_v1")  # seed determinística
stars(img, count=20, area=(0, 0, W-1, H//2), rng=rng)
```

### 5.7 Pixel único de detalhe

```python
# Olho, glyph, ou detalhe fino — use px() diretamente
px(img, 14, 12, GOLD_300)
px(img, 17, 12, GOLD_300)
```

---

## 6. Exemplos completos

### 6.1 Gema épica (12×12 → ×6 → 72×72)

```python
def make_gem_epic(path: str):
    img = canvas(12, 12)
    cx, cy, r = 6, 6, 5
    hi, mid, low = RARITY["epic"]

    pixel_circle(img, cx, cy, r, mid)
    pixel_circle(img, cx - 1, cy - 1, r - 2, hi)
    pixel_circle(img, cx + 1, cy + 1, r - 2, low)
    rect(img, cx - 2, cy - 3, cx - 1, cy - 2, (255, 255, 255, 200))  # specular

    img = auto_outline(img, INK)
    save(img, path, scale=6)
```

### 6.2 Ícone de habilidade — Fire Strike (16×16 → ×4 → 64×64)

```python
def make_skill_fire(path: str):
    img = canvas(16, 16)

    # Base da chama (triângulo pixelado bottom-up)
    for y in range(8, 14):
        w = 14 - y
        x0 = 8 - w // 2
        rect(img, x0, y, x0 + w, y, FIRE_MID)

    # Núcleo quente
    rect(img, 6, 6, 10, 10, FIRE_HI)
    rect(img, 7, 4, 9, 7, (255, 240, 200, 255))

    # Brasa baixa
    rect(img, 5, 13, 11, 14, FIRE_LOW)

    img = auto_outline(img, INK)
    save(img, path, scale=4)
```

### 6.3 Background de cena (64×48 → ×3 → 192×144)

```python
def make_bg_void(path: str):
    rng = new_seed("void_bg")
    img = canvas(64, 48)

    vgradient(img, 0, 20, VOID_950, VOID_800)
    vgradient(img, 20, 48, VOID_800, VOID_700)
    ordered_dither_band(img, 18, 0, 64, 22, VOID_950, VOID_800)
    stars(img, 40, (0, 0, 63, 30), rng)

    # Não aplica auto_outline em backgrounds — causaria border indesejado
    save(img, path, scale=3)
```

> **Nota:** `auto_outline` é omitido em backgrounds que preenchem o canvas inteiro.

---

## 7. Regras de estilo

1. **Paleta exclusiva** — só use cores de `pixel_kit.py`. Nenhuma cor hardcoded fora do kit.
2. **Outline sempre** — todo sprite que não é background recebe `auto_outline(img, INK)`.
3. **Seed por nome** — todo asset com aleatoriedade usa `new_seed("nome_único_do_asset")`.
4. **Um arquivo por asset** — cada função `make_*` salva exatamente 1 arquivo. Sem side effects.
5. **Nomes de arquivo** — `kebab-case.png`. Ex: `gem-epic.png`, `skill-fire-strike.png`.
6. **Sem pillow direto** — não use `ImageDraw` diretamente fora do `pixel_kit.py`. Use os primitivos.
7. **Sem anti-aliasing** — `ellipse()` do Pillow usa AA. Use `pixel_circle()` do kit.

---

## 8. Variações de estilo (além do pixel clássico)

### 8.1 Pixel art HD moderno (padrão do kit)
- Grade nativa: 32–64px
- Muitas cores, gradientes, dithering
- Scale ×2 a ×4
- Output 64–256px

### 8.2 Pixel art 8-bit clássico
- Grade nativa: 8–16px
- Paleta reduzida: máximo 8 cores por sprite
- Sem gradientes — só cores chapadas
- Scale ×8 a ×16

Para implementar: escolha apenas 1 tom por região (ex: só `PURPLE_500`, não rampa).

### 8.3 2D painted / semi-HD
- Desenhar diretamente no tamanho final (sem scale)
- Usar `vgradient` e `lerp_color` para transições suaves
- Adicionar blur pós-processo com `img.filter(ImageFilter.GaussianBlur(1))`
- **Não** aplica `auto_outline` (não é pixel art)
- Output 256–512px com visual "sprite de RPG clássico japonês"

```python
from PIL import ImageFilter

def make_painted_orb(path: str):
    img = canvas(128, 128)
    cx, cy, r = 64, 64, 58

    # Preenche diretamente no tamanho final
    for y in range(128):
        for x in range(128):
            dx, dy = x - cx, y - cy
            if dx*dx + dy*dy <= r*r:
                t = (dy + r) / (2 * r)
                c = lerp_color(AETHER_HI, AETHER_LOW, t)
                px(img, x, y, c)

    img = img.filter(ImageFilter.GaussianBlur(2))
    img.save(path, "PNG")
```

---

## 9. Estrutura de diretório esperada

```
projeto/
├── pixel_kit.py          # biblioteca base — nunca edite
├── assets/
│   ├── gen_gems.py       # scripts geradores por categoria
│   ├── gen_skills.py
│   ├── gen_backgrounds.py
│   └── gen_characters.py
└── output/
    ├── gems/
    ├── skills/
    ├── backgrounds/
    └── characters/
```

Cada script `gen_*.py` importa `pixel_kit` e define + executa todas as funções `make_*` da categoria.

---

## 10. Checklist antes de commitar

- [ ] Asset gerado a partir de grade nativa pequena?
- [ ] `auto_outline` aplicado (exceto backgrounds)?
- [ ] Scale feito com `scale_nn()` / `Image.NEAREST`?
- [ ] Nenhuma cor hardcoded fora do `pixel_kit.py`?
- [ ] Seed nomeada se há aleatoriedade?
- [ ] Output salvo em `output/<categoria>/nome-do-asset.png`?
- [ ] Função `make_*` é idempotente (roda N vezes, mesmo resultado)?
