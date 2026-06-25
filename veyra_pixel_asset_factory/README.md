# Veyra Pixel Asset Factory

Gerador procedural de assets pixel art para Veyra: Aetherfall.

Todos os assets são gerados por código usando Python + Pillow, sem assets externos.

## Rodar localmente

```bash
python -m pip install -r veyra_pixel_asset_factory/requirements.txt
PYTHONDONTWRITEBYTECODE=1 python veyra_pixel_asset_factory/generate_all_assets.py
```

## Saída gerada

```txt
veyra_pixel_asset_factory/output/public/assets/game/
veyra_pixel_asset_factory/output/preview/
veyra_pixel_asset_factory/veyra-procedural-assets-v1.zip
```

Os arquivos binários gerados não são versionados no Git.
