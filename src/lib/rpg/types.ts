export type Rarity = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
export type Element = 'Fire' | 'Water' | 'Nature' | 'Light' | 'Dark' | 'Aether';
export type Role = 'Tank' | 'DPS' | 'Healer' | 'Support' | 'Controller' | 'Debuffer';
export type Faction =
  | 'Order of the First Seal'
  | 'Aetherbound'
  | 'Void Court'
  | 'Sunspire Remnants'
  | 'Moonveil Covenant'
  | 'Ashen Wilds';

export type ResourceAmount = { id: string; amount: number };

export type HeroStats = {
  hp: number;
  atk: number;
  def: number;
  spd: number;
  critRate: number;
  critDmg: number;
};

export type HeroSkill = {
  id: string;
  name: string;
  kind: 'basic' | 'skill' | 'ultimate' | 'passive';
  description: string;
  multiplier?: number;
  cooldown?: number;
  energyCost?: number;
  effectTags: string[];
};

export type HeroDefinition = {
  id: string;
  name: string;
  title: string;
  rarity: Rarity;
  element: Element;
  faction: Faction;
  role: Role;
  portrait: string;
  shortLore: string;
  baseStats: HeroStats;
  growthStats: HeroStats;
  skills: HeroSkill[];
  ultimate: HeroSkill;
  passive: HeroSkill;
  tags: string[];
};

export type OwnedHero = {
  heroId: string;
  level: number;
  xp: number;
  stars: number;
  ascension: number;
  shards: number;
  skillLevels: Record<string, number>;
  gearIds: string[];
  owned: boolean;
};

export type Inventory = Record<string, number>;

export type PlayerState = {
  player: { id: string; name: string; level: number; avatar: string; power: number };
  inventory: Inventory;
  heroes: OwnedHero[];
  campaignProgress: { unlockedStages: string[]; clearedStages: string[]; currentStageId: string };
  gacha: { totalPulls: number; rarePity: number; epicPity: number; legendaryPity: number; mythicPity: number };
  dungeonAttempts: Record<string, { used: number; limit: number }>;
  adClaims: Record<string, { used: number; limit: number }>;
  aetherFountain: { level: number; progress: number; lastClaimDay: string };
  wallet: { connected: boolean; address?: string };
};
