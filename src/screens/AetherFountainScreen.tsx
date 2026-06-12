import { aetherFountainRewards, aetherFountainSafeCopy } from '../lib/economy/aetherFountain';
import { getRemainingAdClaims } from '../lib/monetag/adRewards';
import type { AdType } from '../lib/monetag/monetag';
import type { PlayerState } from '../lib/rpg/types';
import { VAButton } from '../components/ui/VAButton';
import { VACard } from '../components/ui/VACard';
import { VAProgressBar } from '../components/ui/VAProgressBar';

export function AetherFountainScreen({ state }: { state: PlayerState }) { return <div className="space-y-4"><div className="rounded-[2.5rem] border border-cyan-200/20 bg-gradient-to-br from-cyan-500/20 to-violet-950/40 p-5"><p className="text-xs uppercase tracking-[.35em] text-cyan-100/70">Monetag Ads</p><h2 className="text-3xl font-black">Fonte do Aether</h2><p className="mt-2 text-sm text-violet-100/70">{aetherFountainSafeCopy}</p><VAProgressBar value={state.aetherFountain.progress} label={`Fonte Lv ${state.aetherFountain.level}`} /></div>{aetherFountainRewards.map((reward) => <VACard key={reward.id}><div className="flex items-center justify-between gap-3"><div><h3 className="font-black">{reward.name}</h3><p className="text-sm text-violet-100/60">{reward.safeReward}</p><p className="text-xs text-cyan-100/70">Restante hoje: {getRemainingAdClaims(state, reward.id as AdType)}/{reward.limit}</p></div><VAButton>Assistir</VAButton></div></VACard>)}<p className="text-xs text-rose-100/75">Não entrega TON, Stars, Aether Fragments sacáveis, pity ou recursos financeiros no MVP.</p></div>; }
