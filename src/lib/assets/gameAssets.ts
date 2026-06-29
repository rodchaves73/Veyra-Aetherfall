import type { GameAssetCategory, GameAssetPath, GameAssetsManifest, GameImageAsset } from './gameAssets.types';

const asset = (
  category: GameAssetCategory,
  id: string,
  src: GameAssetPath,
  fallbackSrc: GameAssetPath,
  description: string,
): GameImageAsset => ({ category, id, src, fallbackSrc, description });

const placeholders = {
  background: asset('placeholders', 'placeholder-background', '/assets/game/placeholders/background.svg', '/assets/game/placeholders/background.svg', 'Fallback local para backgrounds.'),
  hero: asset('placeholders', 'placeholder-hero', '/assets/game/placeholders/hero.svg', '/assets/game/placeholders/hero.svg', 'Fallback local para retratos de heróis.'),
  icon: asset('placeholders', 'placeholder-icon', '/assets/game/placeholders/icon.svg', '/assets/game/placeholders/icon.svg', 'Fallback local para ícones.'),
  frame: asset('placeholders', 'placeholder-frame', '/assets/game/placeholders/frame.svg', '/assets/game/placeholders/frame.svg', 'Fallback local para molduras.'),
  banner: asset('placeholders', 'placeholder-banner', '/assets/game/placeholders/banner.svg', '/assets/game/placeholders/banner.svg', 'Fallback local para banners.'),
  panel: asset('placeholders', 'placeholder-panel', '/assets/game/placeholders/panel.svg', '/assets/game/placeholders/panel.svg', 'Fallback local para painéis.'),
  button: asset('placeholders', 'placeholder-button', '/assets/game/placeholders/button.svg', '/assets/game/placeholders/button.svg', 'Fallback local para botões.'),
  fx: asset('placeholders', 'placeholder-fx', '/assets/game/placeholders/fx.svg', '/assets/game/placeholders/fx.svg', 'Fallback local para efeitos visuais.'),
} satisfies GameAssetsManifest['placeholders'];

export const gameAssets = {
  backgrounds: {
    home: asset('backgrounds', 'background-home', '/assets/game/backgrounds/background-home-arcane-ruins.webp', placeholders.background.src, 'Background futuro da Home.'),
    summon: asset('backgrounds', 'background-summon', '/assets/game/backgrounds/background-summon-portal.webp', placeholders.background.src, 'Background futuro da tela de summon.'),
    campaign: asset('backgrounds', 'background-campaign', '/assets/game/backgrounds/background-campaign-ruins.webp', placeholders.background.src, 'Background futuro da campanha.'),
    battle: asset('backgrounds', 'background-battle', '/assets/game/backgrounds/background-battle-aetherfield.webp', placeholders.background.src, 'Background futuro da batalha.'),
  },
  ui: {
    panel: asset('ui', 'ui-panel', '/assets/game/ui/ui-panel-dark-arcane.png', placeholders.panel.src, 'Painel UI futuro.'),
    buttonPrimary: asset('ui', 'ui-button-primary', '/assets/game/ui/ui-button-primary.png', placeholders.button.src, 'Botão primário futuro.'),
    buttonGold: asset('ui', 'ui-button-gold', '/assets/game/ui/ui-button-gold.png', placeholders.button.src, 'Botão dourado futuro.'),
    divider: asset('ui', 'ui-divider', '/assets/game/ui/ui-divider-arcane.png', placeholders.panel.src, 'Divisor visual futuro.'),
  },
  icons: {
    gold: asset('icons', 'icon-gold', '/assets/game/icons/icon-gold.png', placeholders.icon.src, 'Ícone de Gold futuro.'),
    gems: asset('icons', 'icon-gems', '/assets/game/icons/icon-gems.png', placeholders.icon.src, 'Ícone de Gems futuro.'),
    stamina: asset('icons', 'icon-stamina', '/assets/game/icons/icon-stamina.png', placeholders.icon.src, 'Ícone de stamina futuro.'),
    standardTicket: asset('icons', 'icon-standard-ticket', '/assets/game/icons/icon-standard-ticket.png', placeholders.icon.src, 'Ícone de ticket padrão futuro.'),
    astralTicket: asset('icons', 'icon-astral-ticket', '/assets/game/icons/icon-astral-ticket.png', placeholders.icon.src, 'Ícone de ticket astral futuro.'),
    wallet: asset('icons', 'icon-wallet', '/assets/game/icons/icon-wallet.png', placeholders.icon.src, 'Ícone de wallet futuro.'),
    settings: asset('icons', 'icon-settings', '/assets/game/icons/icon-settings.png', placeholders.icon.src, 'Ícone de configurações futuro.'),
    lock: asset('icons', 'icon-lock', '/assets/game/icons/icon-lock.png', placeholders.icon.src, 'Ícone de bloqueio futuro.'),
  },
  frames: Object.fromEntries(['common', 'uncommon', 'rare', 'epic', 'legendary', 'divine', 'mythic'].map((rarity) => [rarity, asset('frames', `frame-${rarity}`, `/assets/game/frames/frame-${rarity}.png` as GameAssetPath, placeholders.frame.src, `Moldura futura de raridade ${rarity}.`)])) as GameAssetsManifest['frames'],
  banners: {
    standard: asset('banners', 'banner-standard', '/assets/game/banners/banner-standard.webp', placeholders.banner.src, 'Banner padrão futuro.'),
    astral: asset('banners', 'banner-astral', '/assets/game/banners/banner-astral.webp', placeholders.banner.src, 'Banner astral futuro.'),
    divine: asset('banners', 'banner-divine', '/assets/game/banners/banner-divine.webp', placeholders.banner.src, 'Banner divine futuro.'),
    mythic: asset('banners', 'banner-mythic', '/assets/game/banners/banner-mythic.webp', placeholders.banner.src, 'Banner mythic futuro.'),
    beginner: asset('banners', 'banner-beginner', '/assets/game/banners/banner-beginner.webp', placeholders.banner.src, 'Banner beginner futuro.'),
  },
  fx: {
    portal: asset('fx', 'fx-portal', '/assets/game/fx/fx-portal.png', placeholders.fx.src, 'Portal FX futuro.'),
    summonGlow: asset('fx', 'fx-summon-glow', '/assets/game/fx/fx-summon-glow.png', placeholders.fx.src, 'Glow de summon futuro.'),
    hit: asset('fx', 'fx-hit', '/assets/game/fx/fx-hit.png', placeholders.fx.src, 'Impacto de golpe futuro.'),
    heal: asset('fx', 'fx-heal', '/assets/game/fx/fx-heal.png', placeholders.fx.src, 'Efeito de cura futuro.'),
    fire: asset('fx', 'fx-fire', '/assets/game/fx/fx-fire.png', placeholders.fx.src, 'Efeito de fogo futuro.'),
    arcane: asset('fx', 'fx-arcane', '/assets/game/fx/fx-arcane.png', placeholders.fx.src, 'Efeito arcano futuro.'),
    slotActiveGlow: asset('fx', 'fx-slot-active-glow', '/assets/game/fx/fx-slot-active-glow.png', placeholders.fx.src, 'Glow futuro de slot ativo.'),
    uiShimmer: asset('fx', 'fx-ui-shimmer', '/assets/game/fx/fx-ui-shimmer.png', placeholders.fx.src, 'Shimmer futuro de UI.'),
  },
  heroes: { placeholder: asset('heroes', 'hero-placeholder', '/assets/game/heroes/hero-placeholder.webp', placeholders.hero.src, 'Slot para retrato de herói futuro.') },
  enemies: { placeholder: asset('enemies', 'enemy-placeholder', '/assets/game/enemies/enemy-placeholder.webp', placeholders.hero.src, 'Slot para inimigo futuro.') },
  items: { placeholder: asset('items', 'item-placeholder', '/assets/game/items/item-placeholder.png', placeholders.icon.src, 'Slot para item futuro.') },
  spritesheets: {
    placeholderFx: { ...asset('spritesheets', 'spritesheet-placeholder-fx', '/assets/game/spritesheets/spritesheet-placeholder-fx.png', placeholders.fx.src, 'Contrato placeholder para spritesheet leve.'), frameWidth: 128, frameHeight: 128, frames: 1, durationMs: 800, loop: true },
  },
  placeholders,
} satisfies GameAssetsManifest;
