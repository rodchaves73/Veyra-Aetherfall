import type { ReactNode } from 'react';
import { GameBackground } from '../components/assets';
import { GlowOrb } from '../components/fx/GlowOrb';
import { BottomNav } from '../components/layout/BottomNav';
import { Topbar } from '../components/layout/Topbar';
import { gameAssets } from '../lib/assets';
import type { PlayerState } from '../lib/rpg/types';
import type { ScreenId } from './navigation';

export function AppShell({
  state,
  active,
  onNavigate,
  children,
}: {
  state: PlayerState;
  active: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  children: ReactNode;
}) {
  return (
    <GameBackground
      src={gameAssets.backgrounds.home.src}
      fallbackSrc={gameAssets.backgrounds.home.fallbackSrc}
      className="veyra-app-shell min-h-dvh"
    >
      <div className="relative min-h-dvh w-full overflow-x-hidden overflow-y-auto">
        <GlowOrb className="left-1/2 top-0 h-48 w-48 -translate-x-1/2" />
        <GlowOrb className="bottom-24 left-6 h-32 w-32 bg-violet-500/20" />
        <Topbar state={state} />
        <main className="va-scroll relative z-10 mx-auto min-h-[calc(100dvh-8rem)] w-full max-w-[430px] px-3 pb-[calc(env(safe-area-inset-bottom)+6.5rem)] pt-4 sm:px-4">
          {children}
        </main>
        <BottomNav active={active} onChange={onNavigate} />
      </div>
    </GameBackground>
  );
}
