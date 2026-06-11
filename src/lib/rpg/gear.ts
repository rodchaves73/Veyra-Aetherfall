import type { Rarity } from './types';

export type GearSlot = 'Weapon' | 'Armor' | 'Helmet' | 'Boots' | 'Amulet' | 'Ring';
export type GearItem = { id: string; slot: GearSlot; set: string; level: number; rarity: Rarity; stats: Record<string, number> };
export const gearSlots: GearSlot[] = ['Weapon', 'Armor', 'Helmet', 'Boots', 'Amulet', 'Ring'];
export const gearSets = ['Warrior Set: ATK', 'Guardian Set: DEF', 'Swift Set: SPD', 'Aether Set: Energy', 'Blood Set: Crit', 'Divine Set: Healing/Shield'];
export const getGearUpgradeCost = (gearLevel: number, rarity: Rarity) => [{ id: 'gold', amount: gearLevel * 900 }, { id: rarity === 'Common' ? 'iron_ore' : 'mystic_dust', amount: Math.max(1, Math.floor(gearLevel / 3)) }];
export const calculateGearStats = (gear: GearItem) => Object.fromEntries(Object.entries(gear.stats).map(([key, value]) => [key, Math.round(value * (1 + gear.level * 0.08))]));
export const calculateTotalGearPower = (gearItems: GearItem[]) => gearItems.reduce((total, gear) => total + Object.values(calculateGearStats(gear)).reduce((a, b) => a + b, 0) * 4, 0);
export const canUpgradeGear = () => true;
