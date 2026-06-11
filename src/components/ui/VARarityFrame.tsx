import type { ReactNode } from 'react';
import type { Rarity } from '../../lib/rpg/types';
import { rarityColors } from '../../lib/rpg/constants';
export function VARarityFrame({ rarity, children }: { rarity: Rarity; children: ReactNode }) { return <div className={`rounded-3xl bg-gradient-to-br ${rarityColors[rarity]} p-[2px] shadow-lg`}><div className="rounded-[1.35rem] bg-slate-950/90">{children}</div></div>; }
