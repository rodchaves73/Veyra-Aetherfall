import { PlayerBootstrapStatus } from './PlayerBootstrapStatus';
import { TelegramAuthStatus } from './TelegramAuthStatus';
import { VAResourcePill } from '../ui/VAResourcePill';
import type { PlayerState } from '../../lib/rpg/types';
import { useGameState } from '../../lib/game/useGameState';

export function Topbar({ state }: { state: PlayerState }) {
  const { gameState } = useGameState();
  const currencies = gameState?.currencies;
  return (
    <header className="sticky top-0 z-30 mx-auto flex min-h-16 w-full max-w-[430px] items-center justify-between gap-2 border-b border-white/10 bg-[#070713]/85 px-3 pt-[env(safe-area-inset-top)] backdrop-blur-xl sm:px-4">
      <div className="min-w-0 shrink">
        <p className="truncate text-[10px] uppercase tracking-[.35em] text-cyan-200/70">Veyra</p>
        <h1 className="truncate text-base font-black">Aetherfall</h1>
      </div>
      <div className="flex min-w-0 shrink-0 flex-col items-end gap-1">
        <TelegramAuthStatus />
        <PlayerBootstrapStatus />
        <div className="flex min-w-0 flex-wrap justify-end gap-1">
          <VAResourcePill icon="⚡" value={currencies?.stamina ?? state.inventory.stamina} label="" />
          <VAResourcePill icon="💎" value={currencies?.gems ?? state.inventory.aether_shards} label="" />
          <VAResourcePill icon="🎟️" value={currencies?.standard_ticket ?? 0} label="" />
          <VAResourcePill icon="🪙" value={Math.round((currencies?.gold ?? state.inventory.gold) / 1000) + 'k'} label="" />
        </div>
      </div>
    </header>
  );
}
