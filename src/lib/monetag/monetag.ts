export type AdType = 'doubleBattleReward' | 'staminaRefill' | 'dungeonExtraEntry' | 'dailyShards' | 'bonusChest' | 'aetherChest' | 'spark';
export const isMonetagAvailable = () => typeof window !== 'undefined' && typeof window.show_9031076 === 'function';
export const showRewardedAd = async (adType: AdType) => {
  void adType;
  // TODO: validar rewarded ads server-side antes de produção.
  if (isMonetagAvailable() && window.show_9031076) await window.show_9031076();
  return { completed: true, mocked: !isMonetagAvailable() };
};
