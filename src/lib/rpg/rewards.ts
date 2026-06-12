import { rewardRules } from '../../data/rewards';
import type { ResourceAmount } from './types';

export const canDoubleRewardByAd = (reward: ResourceAmount) => ['gold', 'hero_xp', 'minor_xp_book', 'iron_ore'].includes(reward.id);
export const getAdDoubledRewards = (rewards: ResourceAmount[]) => rewards.map((reward) => canDoubleRewardByAd(reward) ? { ...reward, amount: reward.amount * 2 } : reward);
export const getRewardPolicy = () => rewardRules;
