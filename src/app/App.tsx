import { useState } from 'react';
import { AppShell } from './AppShell';
import type { ScreenId } from './navigation';
import { starterState } from '../data/starterState';
import { useTelegram } from '../lib/telegram/useTelegram';
import { HomeScreen } from '../screens/HomeScreen';
import { HeroesScreen } from '../screens/HeroesScreen';
import { BattleScreen } from '../screens/BattleScreen';
import { DungeonsScreen } from '../screens/DungeonsScreen';
import { SummonScreen } from '../screens/SummonScreen';
import { ShopScreen } from '../screens/ShopScreen';
import { WalletScreen } from '../screens/WalletScreen';
import { AetherFountainScreen } from '../screens/AetherFountainScreen';

export function App() {
  const [active, setActive] = useState<ScreenId>('home');
  useTelegram();
  const render = () => {
    if (active === 'heroes') return <HeroesScreen state={starterState} />;
    if (active === 'battle') return <BattleScreen />;
    if (active === 'dungeons') return <DungeonsScreen />;
    if (active === 'summon') return <SummonScreen />;
    if (active === 'shop') return <ShopScreen />;
    if (active === 'wallet') return <WalletScreen state={starterState} />;
    if (active === 'fountain') return <AetherFountainScreen state={starterState} />;
    return <HomeScreen state={starterState} onNavigate={setActive} />;
  };
  return <AppShell state={starterState} active={active} onNavigate={setActive}>{render()}</AppShell>;
}
