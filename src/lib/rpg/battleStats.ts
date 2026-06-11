import { calculateHeroStats } from './heroProgression';
import type { Element, HeroDefinition, OwnedHero } from './types';

export type CombatStats = { hp: number; atk: number; def: number; spd: number; critRate: number; critDmg: number; accuracy: number; resistance: number; dodge: number; energyGain: number };
export type CombatUnit = { id: string; heroId: string; name: string; side: 'ally' | 'enemy'; element: Element; role: string; stats: CombatStats; currentHp: number; energy: number; actionBar: number; toughness: number; maxToughness: number; broken: boolean; brokenTurns: number; statuses: string[] };

export const buildCombatUnit = (heroDefinition: HeroDefinition, ownedHero: OwnedHero, side: 'ally' | 'enemy'): CombatUnit => {
  const stats = calculateHeroStats(heroDefinition, ownedHero);
  return { id: `${side}-${heroDefinition.id}`, heroId: heroDefinition.id, name: heroDefinition.name, side, element: heroDefinition.element, role: heroDefinition.role, stats: { ...stats, accuracy: 0.95, resistance: 0.08, dodge: 0.04, energyGain: 18 }, currentHp: stats.hp, energy: 35, actionBar: 0, toughness: 100, maxToughness: 100, broken: false, brokenTurns: 0, statuses: [] };
};
