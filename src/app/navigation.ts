import { Castle, Gem, Home, Swords, Users, Wallet, ShoppingBag } from 'lucide-react';
export type ScreenId = 'home' | 'heroes' | 'battle' | 'dungeons' | 'summon' | 'shop' | 'wallet' | 'fountain';
export const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'heroes', label: 'Heroes', icon: Users },
  { id: 'battle', label: 'Battle', icon: Swords },
  { id: 'dungeons', label: 'Dungeons', icon: Castle },
  { id: 'summon', label: 'Summon', icon: Gem },
  { id: 'shop', label: 'Shop', icon: ShoppingBag },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
] as const;
