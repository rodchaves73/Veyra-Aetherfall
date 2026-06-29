# Asset Extraction Script

## Why it exists

Codex Cloud cannot reliably open PRs that add new binary image files. The repository therefore keeps the approved compressed sources (`v_ui_a.zip`, `v_ui_b.zip`, `v_ui_c.zip`) and generates a small runtime set during development and build.

## How to run

```bash
npm run extract:assets
```

The command runs `node scripts/extract-stage-assets.mjs`.

## Expected ZIPs

The script expects these files at the repository root:

- `v_ui_a.zip`
- `v_ui_b.zip`
- `v_ui_c.zip`

If any ZIP is missing, the script exits with an error before writing assets.

## Generated destination

Generated images are written to the official runtime asset tree:

```text
public/assets/game/**
```

The script creates missing folders, overwrites generated copies safely and is idempotent.

## Git behavior

Generated PNG/WebP files under selected `public/assets/game/**` category folders are ignored by `.gitignore` so they are not accidentally committed. Placeholder SVGs remain tracked.

## Vercel and Lovable builds

`package.json` runs extraction automatically through:

- `predev` before `npm run dev`.
- `prebuild` before `npm run build`.

This lets Vercel/Lovable build environments recreate runtime images from the committed ZIP sources without committing extracted image binaries.

## Troubleshooting

- Missing ZIP: confirm the three ZIP files exist at the repo root.
- Missing generated asset: run `npm run extract:assets` and inspect the printed summary.
- Build cannot find an asset: confirm `prebuild` is present in `package.json` and that the generated path matches `src/lib/assets/gameAssets.ts`.
- Git shows generated images: confirm the `.gitignore` generated asset section is present and do not force-add PNG/WebP/JPG/GIF files.
