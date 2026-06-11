import type { HeroDefinition, PlayerState } from './types';

export const ascensionTiers = [0, 1, 2, 3, 4, 5].map((tier) => ({ tier, levelRequirement: 20 + tier * 10, goldCost: tier * 12000, materials: tier === 0 ? [] : [{ id: tier > 3 ? 'gold_sigil' : tier > 1 ? 'silver_sigil' : 'bronze_sigil', amount: tier }], statBonus: tier * 0.07, futureUnlock: tier >= 3 ? 'Passive rune slot' : 'Stat node' }));
export const getAscensionCost = (_hero: HeroDefinition, nextTier: number) => ascensionTiers[nextTier] ?? ascensionTiers[5];
export const getAscensionStatBonus = (_hero: HeroDefinition, tier: number) => 1 + tier * 0.07;
export const getMissingAscensionResources = (state: PlayerState, heroId: string) => {
  const owned = state.heroes.find((hero) => hero.heroId === heroId);
  if (!owned || owned.ascension >= 5) return [{ id: 'ascension_cap', amount: 1 }];
  const cost = ascensionTiers[owned.ascension + 1];
  return [{ id: 'gold', amount: cost.goldCost }, ...cost.materials].filter((item) => (state.inventory[item.id] ?? 0) < item.amount).map((item) => ({ ...item, amount: item.amount - (state.inventory[item.id] ?? 0) }));
};
export const canAscendHero = (state: PlayerState, heroId: string) => getMissingAscensionResources(state, heroId).length === 0;
