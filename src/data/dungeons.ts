export type DungeonDefinition = {
  id: string;
  name: string;
  description: string;
  materialFocus: string;
  staminaCost: number;
  dailyAttemptLimit: number;
  attemptsRemaining: number;
  recommendedPower: number;
  enemyPreview: string[];
  rewardPreview: string[];
  adExtraEntryAllowed: boolean;
  locked: boolean;
};

const dungeonRows: Array<[string, string, string, string, number, number, number, string[]]> = [
  ['gold', 'Gold Dungeon', 'Tesouros soterrados sob moedas amaldiçoadas.', 'Gold', 8, 3, 6200, ['gold', 'minor_xp_book']],
  ['xp', 'XP Dungeon', 'Memórias cristalizadas de heróis caídos.', 'Hero XP', 8, 3, 6900, ['hero_xp', 'greater_xp_book']],
  ['elemental', 'Elemental Dungeon', 'Câmaras alternadas por elementos instáveis.', 'Elemental Crystals', 10, 2, 8800, ['fire_crystal', 'aether_crystal']],
  ['skill', 'Skill Dungeon', 'Biblioteca viva de tomos proibidos.', 'Skill Tomes', 10, 2, 9600, ['common_skill_tome', 'rare_skill_tome']],
  ['gear', 'Gear Dungeon', 'Forjas quebradas pelo Aetherfall.', 'Gear Materials', 9, 3, 7900, ['iron_ore', 'mystic_dust']],
  ['ascension', 'Ascension Dungeon', 'Altares onde sigilos escolhem campeões.', 'Sigils', 12, 1, 12400, ['bronze_sigil', 'silver_sigil']],
];

export const dungeons: DungeonDefinition[] = dungeonRows.map(([id, name, description, materialFocus, staminaCost, dailyAttemptLimit, recommendedPower, rewardPreview]) => ({ id, name, description, materialFocus, staminaCost, dailyAttemptLimit, attemptsRemaining: dailyAttemptLimit, recommendedPower, enemyPreview: ['Wraith', 'Aether Hound', 'Fallen Knight'], rewardPreview, adExtraEntryAllowed: true, locked: false }));
