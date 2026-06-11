import { dungeons } from '../../data/dungeons';
import type { PlayerState } from './types';

export const getDungeonDefinitions = () => dungeons;
export const getRemainingDungeonAttempts = (state: PlayerState, dungeonId: string) => { const attempt = state.dungeonAttempts[dungeonId]; return attempt ? Math.max(0, attempt.limit - attempt.used) : 0; };
export const canEnterDungeon = (state: PlayerState, dungeonId: string) => getRemainingDungeonAttempts(state, dungeonId) > 0 && (state.inventory.stamina ?? 0) >= Number(dungeons.find((dungeon) => dungeon.id === dungeonId)?.staminaCost ?? 999);
export const getDungeonRewards = (dungeonId: string, difficulty: 'Easy' | 'Normal' | 'Hard' | 'Expert' | 'Nightmare' = 'Normal') => ({ dungeonId, difficulty, rewards: dungeons.find((dungeon) => dungeon.id === dungeonId)?.rewardPreview ?? [] });
