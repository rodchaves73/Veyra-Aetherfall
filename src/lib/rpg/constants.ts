import type { Element, Rarity } from './types';

export const rarityOrder: Record<Rarity, number> = { Common: 1, Rare: 2, Epic: 3, Legendary: 4, Mythic: 5 };
export const rarityColors: Record<Rarity, string> = {
  Common: 'from-slate-400 to-slate-200',
  Rare: 'from-sky-400 to-blue-200',
  Epic: 'from-violet-500 to-fuchsia-300',
  Legendary: 'from-amber-400 to-orange-200',
  Mythic: 'from-rose-500 via-fuchsia-400 to-cyan-300',
};
export const elementIcons: Record<Element, string> = { Fire: '🔥', Water: '💧', Nature: '🌿', Light: '✨', Dark: '🌑', Aether: '🔮' };
export const maxTeamSize = 5;
