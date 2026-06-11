import type { Element } from './types';

export const getElementDamageModifier = (attacker: Element, defender: Element) => {
  if ((attacker === 'Fire' && defender === 'Nature') || (attacker === 'Nature' && defender === 'Water') || (attacker === 'Water' && defender === 'Fire')) return 1.2;
  if ((defender === 'Fire' && attacker === 'Nature') || (defender === 'Nature' && attacker === 'Water') || (defender === 'Water' && attacker === 'Fire')) return 0.8;
  if ((attacker === 'Light' && defender === 'Dark') || (attacker === 'Dark' && defender === 'Light')) return 1.15;
  return 1;
};
export const getWeaknessDamage = (attackerElement: Element, defenderWeaknesses: Element[]) => (defenderWeaknesses.includes(attackerElement) ? 25 : 0);
export const applyBreakDamage = <T extends { toughness: number; maxToughness: number; broken?: boolean; brokenTurns?: number }>(unit: T, amount: number): T => {
  const toughness = Math.max(0, unit.toughness - amount);
  return { ...unit, toughness, broken: toughness === 0, brokenTurns: toughness === 0 ? 1 : unit.brokenTurns };
};
