import { dungeons } from '../data/dungeons';
import { starterState } from '../data/starterState';
import { getRemainingDungeonAttempts } from '../lib/rpg/dungeons';
import { VAButton } from '../components/ui/VAButton';
import { VACard } from '../components/ui/VACard';
import { VABadge } from '../components/ui/VABadge';

export function DungeonsScreen() { return <div className="space-y-4"><h2 className="text-2xl font-black">Dungeons</h2>{dungeons.map((dungeon) => <VACard key={dungeon.id}><div className="flex items-start justify-between gap-3"><div><h3 className="font-black">{dungeon.name}</h3><p className="text-sm text-violet-100/60">{dungeon.description}</p><div className="mt-2 flex flex-wrap gap-1"><VABadge>{dungeon.materialFocus}</VABadge><VABadge>{`${dungeon.staminaCost} stamina`}</VABadge><VABadge>{`${getRemainingDungeonAttempts(starterState, String(dungeon.id))}/${dungeon.dailyAttemptLimit} today`}</VABadge></div></div><VAButton>Run</VAButton></div><p className="mt-3 text-xs text-cyan-100/70">Recommended {dungeon.recommendedPower} • Rewards: {(dungeon.rewardPreview as string[]).join(', ')} • Ad extra entry limited.</p></VACard>)}</div>; }
