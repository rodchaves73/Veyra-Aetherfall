import { dungeons } from '../data/dungeons';
import { starterState } from '../data/starterState';
import { getRemainingDungeonAttempts } from '../lib/rpg/dungeons';
import { VAButton } from '../components/ui/VAButton';
import { GameAssetImage } from '../components/assets/GameAssetImage';
import { VeyraPanel, VeyraScreen } from '../components/ui/VeyraVisual';
import { VABadge } from '../components/ui/VABadge';
import { gameAssets } from '../lib/assets';

export function DungeonsScreen() {
  return (
    <VeyraScreen background={gameAssets.backgrounds.campaign}>
      <h2 className="text-2xl font-black">Dungeons</h2>
      {dungeons.map((dungeon) => (
        <VeyraPanel key={dungeon.id}>
          <div className="flex min-w-0 flex-col gap-3 min-[390px]:flex-row min-[390px]:items-start min-[390px]:justify-between">
            <div className="min-w-0">
              <GameAssetImage decorative src={gameAssets.banners.beginner.src} fallbackSrc={gameAssets.banners.beginner.fallbackSrc} className="mb-3 h-20 w-full rounded-2xl object-cover opacity-80" /><h3 className="break-words font-black">{dungeon.name}</h3>
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
        </VeyraPanel>
      ))}
    </VeyraScreen>
  );
}
