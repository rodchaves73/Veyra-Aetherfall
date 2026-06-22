import { GameAssetImage } from '../assets';
import { PlayerBootstrapStatus } from './PlayerBootstrapStatus';
import { TelegramAuthStatus } from './TelegramAuthStatus';
import { gameAssets } from '../../lib/assets';
import { useGameState } from '../../lib/game/useGameState';
import type { GameImageAsset } from '../../lib/assets/gameAssets.types';
import type { PlayerState } from '../../lib/rpg/types';

type ResourceBadge = {
  id: string;
  asset: GameImageAsset;
  value: number | string;
  shortLabel: string;
};

const formatCompactAmount = (value: number | string) => {
  if (typeof value === 'string') return value;
  if (value >= 1000) return `${Math.round(value / 1000)}k`;
  return value;
};

export function Topbar({ state }: { state: PlayerState }) {
  const { gameState } = useGameState();
  const currencies = gameState?.currencies;

  const resources: ResourceBadge[] = [
    {
      id: 'stamina',
      asset: gameAssets.icons.stamina,
      value: currencies?.stamina ?? state.inventory.stamina,
      shortLabel: 'STA',
    },
    {
      id: 'gems',
      asset: gameAssets.icons.gems,
      value: currencies?.gems ?? state.inventory.aether_shards,
      shortLabel: 'GEM',
    },
    {
      id: 'ticket',
      asset: gameAssets.icons.standardTicket,
      value: currencies?.standard_ticket ?? 0,
      shortLabel: 'TKT',
    },
    {
      id: 'gold',
      asset: gameAssets.icons.gold,
      value: currencies?.gold ?? state.inventory.gold,
      shortLabel: 'GLD',
    },
  ];

  return (
    <header className="veyra-topbar sticky top-0 z-30 mx-auto flex min-h-16 w-full max-w-[430px] items-center justify-between gap-2 px-3 pt-[env(safe-area-inset-top)] sm:px-4">
      <div className="flex min-w-0 items-center gap-2">
        <div className="veyra-shell-icon grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl">
          <GameAssetImage
            src={gameAssets.placeholders.icon.src}
            fallbackSrc={gameAssets.placeholders.icon.fallbackSrc}
            decorative
            loading="eager"
            className="h-7 w-7 object-contain"
          />
        </div>
        <div className="min-w-0 shrink">
          <p className="truncate text-[10px] uppercase tracking-[.35em] text-cyan-200/70">Veyra</p>
          <h1 className="truncate text-base font-black leading-tight">Aetherfall</h1>
        </div>
      </div>

      <div className="flex min-w-0 shrink-0 flex-col items-end gap-1">
        <div className="flex max-w-[218px] flex-wrap justify-end gap-1">
          {resources.map((resource) => (
            <div key={resource.id} className="veyra-resource-mini" aria-label={`${resource.shortLabel}: ${resource.value}`}>
              <GameAssetImage
                src={resource.asset.src}
                fallbackSrc={resource.asset.fallbackSrc}
                decorative
                className="h-3.5 w-3.5 shrink-0 object-contain"
              />
              <span>{formatCompactAmount(resource.value)}</span>
            </div>
          ))}
        </div>
        <div className="flex max-w-[218px] flex-wrap justify-end gap-1">
          <TelegramAuthStatus />
          <PlayerBootstrapStatus />
        </div>
      </div>
    </header>
  );
}
