import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { GameAssetImage } from '../assets/GameAssetImage';
import { GameBackground } from '../assets/GameBackground';
import { gameAssets } from '../../lib/assets';
import type { Rarity } from '../../lib/rpg/types';
import { cn } from './utils';

const rarityKey: Record<Rarity, keyof typeof gameAssets.frames> = {
  Common: 'common',
  Rare: 'rare',
  Epic: 'epic',
  Legendary: 'legendary',
  Mythic: 'mythic',
};

export function VeyraScreen({ background, children, className }: { background?: { src: string; fallbackSrc: string }; children: ReactNode; className?: string }) {
  return (
    <GameBackground src={background?.src} fallbackSrc={background?.fallbackSrc} className={cn('veyra-screen-backdrop rounded-[2rem]', className)}>
      <VeyraFxLayer />
      <div className="relative z-[2] min-w-0 space-y-4 p-1">{children}</div>
    </GameBackground>
  );
}

export function VeyraFxLayer({ portal = false, className }: { portal?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={cn('veyra-fx-layer', className)}>
      <div className="veyra-mote-layer" />
      {portal ? <GameAssetImage decorative src={gameAssets.fx.portal.src} fallbackSrc={gameAssets.fx.portal.fallbackSrc} className="veyra-portal-breathe absolute left-1/2 top-10 w-52 -translate-x-1/2 opacity-55" /> : null}
    </div>
  );
}

export function VeyraPanel({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('veyra-arcane-panel', className)} {...props}>{children}</div>;
}

export function VeyraButton({ className, variant = 'primary', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'gold' | 'secondary'; children: ReactNode }) {
  return <button className={cn('veyra-press-feedback min-h-11 rounded-2xl px-4 py-2 text-sm font-black', variant === 'gold' ? 'veyra-gold-button' : variant === 'primary' ? 'veyra-asset-button' : 'border border-white/15 bg-white/10 text-violet-100', className)} {...props}>{children}</button>;
}

export function VeyraResourcePill({ asset, label, value }: { asset: { src: string; fallbackSrc: string }; label: string; value: number | string }) {
  return <div className="veyra-resource-pill"><GameAssetImage src={asset.src} fallbackSrc={asset.fallbackSrc} alt={label} className="h-6 w-6 object-contain" /><span className="font-black">{value}</span><span className="text-violet-100/60">{label}</span></div>;
}

export function VeyraAssetFrame({ rarity = 'Common', active = false, children, className }: { rarity?: Rarity; active?: boolean; children: ReactNode; className?: string }) {
  const frame = gameAssets.frames[rarityKey[rarity]];
  return (
    <div className={cn('veyra-asset-frame veyra-card-hover', `veyra-glow-${rarity.toLowerCase()}`, active && 'veyra-pulse-selected', className)}>
      {active ? <GameAssetImage decorative src={gameAssets.fx.slotActiveGlow.src} fallbackSrc={gameAssets.fx.slotActiveGlow.fallbackSrc} className="absolute inset-0 h-full w-full object-cover opacity-70" /> : null}
      <div className="relative z-[1]">{children}</div>
      <GameAssetImage decorative src={frame.src} fallbackSrc={frame.fallbackSrc} className="pointer-events-none absolute inset-0 h-full w-full object-fill" />
    </div>
  );
}
