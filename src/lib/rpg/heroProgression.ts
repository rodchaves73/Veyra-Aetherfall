import { getHeroById } from '../../data/heroes';
import type { HeroDefinition, HeroStats, OwnedHero, PlayerState } from './types';
import { rarityOrder } from './constants';
import { calculatePowerFromStats } from './power';

export const getHeroMaxLevel = (stars: number, ascension: number) => stars * 10 + 10 + ascension * 2;
export const getXpForNextLevel = (level: number, rarity: HeroDefinition['rarity']) => Math.round(85 * level ** 1.28 * (1 + rarityOrder[rarity] * 0.08));
export const getGoldCostForLevelUp = (level: number, rarity: HeroDefinition['rarity'], stars: number) => Math.round(120 * level * (rarityOrder[rarity] + stars * 0.35));

export const calculateHeroStats = (hero: HeroDefinition, ownedHero: OwnedHero): HeroStats => {
  const levelBonus = Math.max(0, ownedHero.level - 1);
  const ascensionBonus = 1 + ownedHero.ascension * 0.07;
  const starBonus = 1 + (ownedHero.stars - 1) * 0.09;
  return {
    hp: Math.round((hero.baseStats.hp + hero.growthStats.hp * levelBonus) * ascensionBonus * starBonus),
    atk: Math.round((hero.baseStats.atk + hero.growthStats.atk * levelBonus) * ascensionBonus * starBonus),
    def: Math.round((hero.baseStats.def + hero.growthStats.def * levelBonus) * ascensionBonus * starBonus),
    spd: Math.round((hero.baseStats.spd + hero.growthStats.spd * levelBonus) * 10) / 10,
    critRate: Math.min(0.65, hero.baseStats.critRate + hero.growthStats.critRate * levelBonus),
    critDmg: hero.baseStats.critDmg + hero.growthStats.critDmg * levelBonus,
  };
};

export const calculateHeroPower = (hero: HeroDefinition, ownedHero: OwnedHero) => calculatePowerFromStats(calculateHeroStats(hero, ownedHero), ownedHero);
export const canLevelUpHero = (playerState: PlayerState, heroId: string) => getMissingLevelUpResources(playerState, heroId).length === 0;
export const getMissingLevelUpResources = (playerState: PlayerState, heroId: string) => {
  const owned = playerState.heroes.find((entry) => entry.heroId === heroId);
  const hero = getHeroById(heroId);
  if (!owned || !hero || owned.level >= getHeroMaxLevel(owned.stars, owned.ascension)) return [{ id: 'level_cap', amount: 1 }];
  const xp = getXpForNextLevel(owned.level, hero.rarity);
  const gold = getGoldCostForLevelUp(owned.level, hero.rarity, owned.stars);
  return [
    { id: 'hero_xp', amount: Math.max(0, xp - (playerState.inventory.hero_xp ?? 0)) },
    { id: 'gold', amount: Math.max(0, gold - (playerState.inventory.gold ?? 0)) },
  ].filter((item) => item.amount > 0);
};
