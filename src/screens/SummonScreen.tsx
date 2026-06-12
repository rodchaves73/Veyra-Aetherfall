import { useState } from 'react';
import { heroes } from '../data/heroes';
import { starterState } from '../data/starterState';
import { pityCaps, summonCosts } from '../lib/rpg/shop';
import { VAButton } from '../components/ui/VAButton';
import { VACard } from '../components/ui/VACard';
import { VARarityFrame } from '../components/ui/VARarityFrame';
import { VAProgressBar } from '../components/ui/VAProgressBar';
import { RarityBurst } from '../components/fx/RarityBurst';

export function SummonScreen() {
  const [results, setResults] = useState<typeof heroes>([]);
  const pull = (count: number) => setResults(Array.from({ length: count }, (_, index) => heroes[(index * 7 + Math.floor(Math.random() * heroes.length)) % heroes.length]));
  return <div className="space-y-4"><div className="relative grid min-h-64 place-items-center overflow-hidden rounded-[2.5rem] border border-violet-300/20 bg-radial-[circle_at_center] from-cyan-400/25 via-violet-800/20 to-black"><RarityBurst /><div className="relative text-center"><p className="text-xs uppercase tracking-[.35em] text-cyan-100/70">Aether Portal</p><h2 className="text-4xl font-black">Summon</h2><p className="text-sm text-violet-100/65">Banner: Fallen of the First Seal</p></div></div><VACard><VAProgressBar value={starterState.gacha.legendaryPity} max={pityCaps.legendary} label="Legendary pity" /><VAProgressBar value={starterState.gacha.mythicPity} max={pityCaps.mythic} label="Mythic pity" /><div className="mt-4 grid grid-cols-2 gap-2"><VAButton onClick={() => pull(1)}>1x • {summonCosts.single}</VAButton><VAButton onClick={() => pull(10)}>10x • {summonCosts.ten}</VAButton></div><p className="mt-3 text-xs text-amber-100/70">MVP local/mock. Gacha, pity e duplicate conversion devem ser server-side antes de produção.</p></VACard>{results.length > 0 && <div className="grid grid-cols-2 gap-3">{results.map((hero, index) => <VARarityFrame key={`${hero.id}-${index}`} rarity={hero.rarity}><div className="p-3 text-center"><div className="text-3xl font-black">{hero.portrait}</div><b className="text-sm">{hero.name}</b><p className="text-[11px] text-violet-100/60">{hero.rarity} • duplicate +shards</p></div></VARarityFrame>)}</div>}</div>;
}
