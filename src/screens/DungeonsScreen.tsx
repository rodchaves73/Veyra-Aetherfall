import { dungeons } from '../data/dungeons';
import { starterState } from '../data/starterState';
import { getRemainingDungeonAttempts } from '../lib/rpg/dungeons';
import { VAButton } from '../components/ui/VAButton';
import { VACard } from '../components/ui/VACard';
import { VABadge } from '../components/ui/VABadge';

export function DungeonsScreen() {
  return (
    <div className="min-w-0 space-y-4 overflow-x-hidden">
      <h2 className="text-2xl font-black">Dungeons</h2>
      {dungeons.map((dungeon) => (
        <VACard key={dungeon.id}>
          <div className="flex min-w-0 flex-col gap-3 min-[390px]:flex-row min-[390px]:items-start min-[390px]:justify-between">
            <div className="min-w-0">
              <h3 className="break-words font-black">{dungeon.name}</h3>
              <p className="text-sm text-violet-100/60">{dungeon.description}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                <VABadge>{dungeon.materialFocus}</VABadge>
                <VABadge>{`${dungeon.staminaCost} stamina`}</VABadge>
                <VABadge>{`${getRemainingDungeonAttempts(starterState, String(dungeon.id))}/${dungeon.dailyAttemptLimit} today`}</VABadge>
              </div>
            </div>
            <VAButton>Run</VAButton>
          </div>
          <p className="mt-3 break-words text-xs text-cyan-100/70">
            Recommended {dungeon.recommendedPower} • Rewards: {(dungeon.rewardPreview as string[]).join(', ')} • Ad extra entry limited.
          </p>
        </VACard>
      ))}
    </div>
  );
}
