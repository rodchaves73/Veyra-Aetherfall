export type GameCurrency = Record<string, number>;
export type GameBanner = { id: string; name: string; bannerType: string; tokenType: string; pityGroup: string; rates: Record<string, number>; featuredHeroIds: string[]; startsAt: string | null; endsAt: string | null; isActive: boolean };
export type OwnedHero = { id: string; heroId: string; name: string; rarity: string; element: string; class: string; race: string; faction: string; level: number; stars: number; powerScore: number };
export type HeroShard = { heroId: string; quantity: number };
export type PitySummary = { pityGroup: string; pullsSinceRare: number; pullsSinceEpic: number; pullsSinceLegendary: number; pullsSinceDivine: number; pullsSinceMythic: number; featuredGuarantee: boolean; beginnerPulls: number };
export type GameState = { player: unknown; currencies: GameCurrency; heroes: OwnedHero[]; heroShards: HeroShard[]; banners: GameBanner[]; pity: PitySummary[]; starter: { granted: boolean; grantedAt: string | null }; featureFlags: Record<string, boolean> };
export type SummonResult = { ok: boolean; results?: Array<{ heroId: string; name: string; rarity: string; isDuplicate: boolean; shardsGained: number; soulDustGained: number }>; currencies?: GameCurrency; pity?: PitySummary[]; error?: { code: string; message: string } };
