export type GameAssetCategory =
  | 'backgrounds'
  | 'ui'
  | 'icons'
  | 'frames'
  | 'banners'
  | 'fx'
  | 'heroes'
  | 'enemies'
  | 'items'
  | 'spritesheets'
  | 'placeholders';

export type AssetRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'divine' | 'mythic';

export type GameAssetPath = `/assets/game/${string}`;

export type GameImageAsset = {
  id: string;
  src: GameAssetPath;
  fallbackSrc: GameAssetPath;
  category: GameAssetCategory;
  description: string;
};

export type GameSpritesheetAsset = GameImageAsset & {
  frameWidth: number;
  frameHeight: number;
  frames: number;
  durationMs: number;
  loop: boolean;
};

export type GameAssetsManifest = {
  backgrounds: Record<'home' | 'summon' | 'campaign' | 'battle', GameImageAsset>;
  ui: Record<'panel' | 'buttonPrimary' | 'buttonGold' | 'divider', GameImageAsset>;
  icons: Record<'gold' | 'gems' | 'stamina' | 'standardTicket' | 'astralTicket' | 'wallet' | 'settings' | 'lock', GameImageAsset>;
  frames: Record<AssetRarity, GameImageAsset>;
  banners: Record<'standard' | 'astral' | 'divine' | 'mythic' | 'beginner', GameImageAsset>;
  fx: Record<'portal' | 'summonGlow' | 'hit' | 'heal' | 'fire' | 'arcane' | 'slotActiveGlow' | 'uiShimmer', GameImageAsset>;
  heroes: Record<'placeholder', GameImageAsset>;
  enemies: Record<'placeholder', GameImageAsset>;
  items: Record<'placeholder', GameImageAsset>;
  spritesheets: Record<'placeholderFx', GameSpritesheetAsset>;
  placeholders: Record<'background' | 'hero' | 'icon' | 'frame' | 'banner' | 'panel' | 'button' | 'fx', GameImageAsset>;
};
