import type { Rarity } from './types';

export type Material = { id: string; name: string; rarity: Rarity; usage: string; mainSource: string; secondarySource: string; canAppearInAds: boolean; canAppearInShop: boolean; bottleneckPriority: number };

export const materials: Material[] = [
  ['minor_xp_book', 'Minor XP Book', 'Common', 'Hero XP', 'XP Dungeon', 'Campaign', true, true, 1],
  ['greater_xp_book', 'Greater XP Book', 'Rare', 'Hero XP', 'XP Dungeon', 'Shop', true, true, 2],
  ['ancient_xp_tome', 'Ancient XP Tome', 'Epic', 'Hero XP', 'XP Dungeon', 'Events', false, true, 3],
  ['fire_crystal', 'Fire Crystal', 'Rare', 'Fire ascension and skills', 'Elemental Dungeon', 'Shop', true, true, 3],
  ['water_crystal', 'Water Crystal', 'Rare', 'Water ascension and skills', 'Elemental Dungeon', 'Shop', true, true, 3],
  ['nature_crystal', 'Nature Crystal', 'Rare', 'Nature ascension and skills', 'Elemental Dungeon', 'Shop', true, true, 3],
  ['light_crystal', 'Light Crystal', 'Epic', 'Light ascension and skills', 'Elemental Dungeon', 'Events', false, true, 4],
  ['dark_crystal', 'Dark Crystal', 'Epic', 'Dark ascension and skills', 'Elemental Dungeon', 'Events', false, true, 4],
  ['aether_crystal', 'Aether Crystal', 'Legendary', 'Aether skills and late upgrades', 'Elemental Dungeon', 'Events', false, true, 5],
  ['common_skill_tome', 'Common Skill Tome', 'Common', 'Skill levels 1-3', 'Skill Dungeon', 'Campaign', true, true, 2],
  ['rare_skill_tome', 'Rare Skill Tome', 'Rare', 'Skill levels 4-6', 'Skill Dungeon', 'Shop', true, true, 3],
  ['epic_skill_tome', 'Epic Skill Tome', 'Epic', 'Skill levels 7-9', 'Skill Dungeon', 'Events', false, true, 4],
  ['legendary_skill_tome', 'Legendary Skill Tome', 'Legendary', 'Skill level 10', 'Skill Dungeon', 'Events', false, true, 5],
  ['bronze_sigil', 'Bronze Sigil', 'Rare', 'Awakening and ascension', 'Ascension Dungeon', 'Shop', true, true, 3],
  ['silver_sigil', 'Silver Sigil', 'Epic', 'Awakening and ascension', 'Ascension Dungeon', 'Shop', false, true, 4],
  ['gold_sigil', 'Gold Sigil', 'Legendary', 'Awakening and ascension', 'Ascension Dungeon', 'Events', false, true, 5],
  ['mythic_sigil', 'Mythic Sigil', 'Mythic', 'Final awakenings', 'Ascension Dungeon', 'Events', false, true, 6],
  ['iron_ore', 'Iron Ore', 'Common', 'Gear crafting', 'Gear Dungeon', 'Campaign', true, true, 1],
  ['enchanted_leather', 'Enchanted Leather', 'Rare', 'Gear crafting', 'Gear Dungeon', 'Shop', true, true, 2],
  ['mystic_dust', 'Mystic Dust', 'Epic', 'Gear upgrades', 'Gear Dungeon', 'Events', false, true, 3],
  ['rune_fragment', 'Rune Fragment', 'Epic', 'Gear set tuning', 'Gear Dungeon', 'Events', false, true, 4],
  ['ancient_core', 'Ancient Core', 'Legendary', 'High gear upgrades', 'Gear Dungeon', 'Events', false, true, 5],
].map(([id, name, rarity, usage, mainSource, secondarySource, canAppearInAds, canAppearInShop, bottleneckPriority]) => ({ id, name, rarity, usage, mainSource, secondarySource, canAppearInAds, canAppearInShop, bottleneckPriority }) as Material);
