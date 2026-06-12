import { VAResourcePill } from '../ui/VAResourcePill';
import type { PlayerState } from '../../lib/rpg/types';

export function Topbar({ state }: { state: PlayerState }) {
  return (
    <header className="sticky top-0 z-30 mx-auto flex min-h-16 w-full max-w-[430px] items-center justify-between gap-2 border-b border-white/10 bg-[#070713]/90 px-3 pt-[env(safe-area-inset-top)] backdrop-blur-xl min-[390px]:px-4">
      <div className="min-w-0">
        <p className="truncate text-[10px] uppercase tracking-[.28em] text-cyan-200/70 min-[390px]:tracking-[.35em]">Veyra</p>
        <h1 className="truncate text-base font-black">Aetherfall</h1>
      </div>
      <div className="flex min-w-0 shrink-0 flex-wrap justify-end gap-1">
        <VAResourcePill icon="⚡" value={state.inventory.stamina} label="" />
        <VAResourcePill icon="💠" value={state.inventory.aether_shards} label="" />
        <VAResourcePill icon="🪙" value={`${Math.round(state.inventory.gold / 1000)}k`} label="" />
      </div>
    </header>
  );
}
