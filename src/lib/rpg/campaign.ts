import { campaignChapters } from '../../data/campaign';
import type { PlayerState } from './types';

export const getCampaignChapters = () => campaignChapters;
export const getStageById = (stageId: string) => campaignChapters.flatMap((chapter) => chapter.stages).find((stage) => stage.id === stageId);
export const getNextStage = (stageId: string) => { const stages = campaignChapters.flatMap((chapter) => chapter.stages); return stages[stages.findIndex((stage) => stage.id === stageId) + 1]; };
export const canEnterStage = (state: PlayerState, stageId: string) => state.campaignProgress.unlockedStages.includes(stageId) && (state.inventory.stamina ?? 0) >= (getStageById(stageId)?.staminaCost ?? 999);
export const getStageRewards = (stageId: string, firstClear: boolean) => firstClear ? (getStageById(stageId)?.firstClearReward ?? []) : (getStageById(stageId)?.repeatReward ?? []);
