import { getHeroById } from '../../data/heroes';
import type { HeroSkill, PlayerState, Rarity } from './types';
import { rarityOrder } from './constants';

export const getSkillUpgradeCost = (skillLevel: number, rarity: Rarity) => {
  const gold = Math.round(700 * skillLevel ** 1.35 * rarityOrder[rarity]);
  if (skillLevel <= 3) return [{ id: 'gold', amount: gold }, { id: 'common_skill_tome', amount: skillLevel }];
  if (skillLevel <= 6) return [{ id: 'gold', amount: gold }, { id: 'rare_skill_tome', amount: skillLevel - 2 }, { id: 'elemental_crystal', amount: 2 }];
  if (skillLevel <= 9) return [{ id: 'gold', amount: gold }, { id: 'epic_skill_tome', amount: skillLevel - 5 }, { id: 'aether_crystal', amount: 1 }];
  return [{ id: 'gold', amount: gold }, { id: 'legendary_skill_tome', amount: 1 }, { id: 'gold_sigil', amount: 1 }];
};
export const getSkillEffectAtLevel = (skill: HeroSkill, level: number) => ({ ...skill, multiplier: (skill.multiplier ?? 1) * (1 + (level - 1) * 0.085) });
export const getMissingSkillResources = (state: PlayerState, heroId: string, skillId: string) => {
  const hero = getHeroById(heroId);
  const owned = state.heroes.find((entry) => entry.heroId === heroId);
  if (!hero || !owned) return [{ id: 'hero', amount: 1 }];
  const nextLevel = (owned.skillLevels[skillId] ?? 1) + 1;
  return getSkillUpgradeCost(nextLevel, hero.rarity).filter((cost) => (state.inventory[cost.id] ?? 0) < cost.amount).map((cost) => ({ ...cost, amount: cost.amount - (state.inventory[cost.id] ?? 0) }));
};
export const canUpgradeSkill = (state: PlayerState, heroId: string, skillId: string) => getMissingSkillResources(state, heroId, skillId).length === 0;
export const calculateSkillPowerGain = (_heroId: string, _skillId: string, nextLevel: number) => Math.round(85 * nextLevel ** 1.2);
