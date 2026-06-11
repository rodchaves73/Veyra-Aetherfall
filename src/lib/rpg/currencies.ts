export type Currency = {
  id: string;
  name: string;
  description: string;
  use: string;
  sources: string[];
  isPremium: boolean;
  canComeFromAds: boolean;
  futureProvider: 'gameplay' | 'ads' | 'gems' | 'telegram_stars' | 'ton' | 'none';
  canConvertToTon: false;
};

export const currencies: Currency[] = [
  { id: 'gold', name: 'Gold', description: 'Moeda básica para upgrades.', use: 'Level up, gear e custos gerais.', sources: ['batalhas', 'dungeons', 'quests', 'ads limitados'], isPremium: false, canComeFromAds: true, futureProvider: 'gameplay', canConvertToTon: false },
  { id: 'aether_shards', name: 'Aether Shards', description: 'Recurso de summon controlado.', use: 'Invocações 1x e 10x.', sources: ['campanha', 'eventos', 'shop', 'ads limitados'], isPremium: false, canComeFromAds: true, futureProvider: 'gameplay', canConvertToTon: false },
  { id: 'gems', name: 'Gems', description: 'Moeda premium interna não sacável.', use: 'Packs, stamina e conveniências.', sources: ['compras futuras', 'first clear limitado'], isPremium: true, canComeFromAds: false, futureProvider: 'telegram_stars', canConvertToTon: false },
  { id: 'stamina', name: 'Stamina', description: 'Energia para campanha e dungeons.', use: 'Entrar em stages.', sources: ['regen', 'ads limitados', 'packs'], isPremium: false, canComeFromAds: true, futureProvider: 'gameplay', canConvertToTon: false },
  { id: 'hero_xp', name: 'Hero XP', description: 'Experiência aplicada aos heróis.', use: 'Level up de heróis.', sources: ['batalhas', 'XP books', 'dungeons'], isPremium: false, canComeFromAds: true, futureProvider: 'gameplay', canConvertToTon: false },
  { id: 'battle_pass_xp', name: 'Battle Pass XP', description: 'Progresso de passe futuro.', use: 'Trilhas grátis e premium futuras.', sources: ['missões', 'eventos'], isPremium: false, canComeFromAds: false, futureProvider: 'none', canConvertToTon: false },
];

export const forbiddenTonConversion = ['gold', 'gems', 'aether_shards', 'stamina', 'materials', 'hero_xp'];
