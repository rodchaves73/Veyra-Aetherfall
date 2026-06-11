import type { HeroStats, OwnedHero } from './types';

export const calculatePowerFromStats = (stats: HeroStats, owned?: OwnedHero) => {
  const base = stats.hp * 0.12 + stats.atk * 6 + stats.def * 4 + stats.spd * 10 + stats.critRate * 900 + stats.critDmg * 250;
  const progression = owned ? owned.stars * 220 + owned.ascension * 350 + Object.values(owned.skillLevels).reduce((a, b) => a + b, 0) * 35 : 0;
  return Math.round(base + progression);
};

export const getRecommendedPowerLabel = (power: number) => `${Math.round(power / 100) / 10}K Power`;
