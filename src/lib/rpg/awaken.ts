import type { PlayerState, Rarity } from './types';

const duplicateValues: Record<Rarity, number> = { Common: 10, Rare: 20, Epic: 40, Legendary: 80, Mythic: 120 };
export const getDuplicateShardValue = (rarity: Rarity) => duplicateValues[rarity];
export const getStarUpCost = (currentStars: number, rarity: Rarity) => {
  void rarity;
  const shardCost = [0, 20, 40, 80, 160, 300][currentStars] ?? 999;
  const sigil = currentStars >= 5 ? 'mythic_sigil' : currentStars >= 3 ? 'gold_sigil' : undefined;
  return [{ id: 'hero_shards', amount: shardCost }, { id: 'gold', amount: currentStars * 15000 }, ...(sigil ? [{ id: sigil, amount: 1 }] : [])];
};
export const getMissingStarUpResources = (state: PlayerState, heroId: string) => {
  const owned = state.heroes.find((hero) => hero.heroId === heroId);
  if (!owned || owned.stars >= 6) return [{ id: 'star_cap', amount: 1 }];
  return getStarUpCost(owned.stars, 'Common').filter((cost) => (cost.id === 'hero_shards' ? owned.shards : (state.inventory[cost.id] ?? 0)) < cost.amount);
};
export const canStarUpHero = (state: PlayerState, heroId: string) => getMissingStarUpResources(state, heroId).length === 0;
