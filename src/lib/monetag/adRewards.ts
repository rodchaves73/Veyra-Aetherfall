import type { PlayerState } from '../rpg/types';
import type { AdType } from './monetag';

const limits: Record<AdType, number> = { doubleBattleReward: 5, staminaRefill: 3, dungeonExtraEntry: 1, dailyShards: 3, bonusChest: 3, aetherChest: 3, spark: 10 };
export const getAdRewardLimit = (adType: AdType) => limits[adType];
export const getRemainingAdClaims = (state: PlayerState, adType: AdType) => Math.max(0, getAdRewardLimit(adType) - (state.adClaims[adType]?.used ?? 0));
export const canClaimAdReward = (state: PlayerState, adType: AdType) => getRemainingAdClaims(state, adType) > 0;
export const applyAdRewardLocalMock = (state: PlayerState, adType: AdType): PlayerState => {
  const next = structuredClone(state);
  next.adClaims[adType] = { used: (next.adClaims[adType]?.used ?? 0) + 1, limit: getAdRewardLimit(adType) };
  if (adType === 'staminaRefill') next.inventory.stamina = (next.inventory.stamina ?? 0) + 30;
  if (adType === 'dailyShards') next.inventory.aether_shards = (next.inventory.aether_shards ?? 0) + 25;
  if (adType === 'bonusChest' || adType === 'spark') next.inventory.gold = (next.inventory.gold ?? 0) + 1500;
  return next;
};
