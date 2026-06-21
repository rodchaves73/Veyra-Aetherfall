import type { HeroRarity } from './gameBalance';
export const levelCapsByStars = { 1: 20, 2: 30, 3: 40, 4: 50, 5: 60, 6: 70 } as const;
const groups: Record<HeroRarity, number[]> = { common: [20, 40, 80, 120, 200], uncommon: [20, 40, 80, 120, 200], rare: [30, 60, 120, 200, 300], epic: [30, 60, 120, 200, 300], legendary: [40, 80, 160, 240, 400], divine: [60, 120, 240, 360, 600], mythic: [80, 160, 320, 480, 800] };
export const calculateLevelCap = (stars: number) => levelCapsByStars[Math.max(1, Math.min(6, stars)) as keyof typeof levelCapsByStars];
export const getStarUpCost = (rarity: HeroRarity, fromStars: number) => ({ shards: groups[rarity][fromStars - 1] ?? 0, gold: (groups[rarity][fromStars - 1] ?? 0) * 100, material: fromStars >= 3 ? `${rarity}_${fromStars === 5 ? 'core' : 'sigil'}` : null });
