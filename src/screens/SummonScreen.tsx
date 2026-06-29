import { useMemo, useState } from 'react';
import { VAButton } from '../components/ui/VAButton';
import { VACard } from '../components/ui/VACard';
import { VAProgressBar } from '../components/ui/VAProgressBar';
import { VARarityFrame } from '../components/ui/VARarityFrame';
import { RarityBurst } from '../components/fx/RarityBurst';
import { useVeyraAuth } from '../lib/auth/useVeyraAuth';
import { performGachaSummon } from '../lib/game/gameClient';
import { useGameState } from '../lib/game/useGameState';
import type { SummonResult } from '../lib/game/gameTypes';
import type { Rarity } from '../lib/rpg/types';

const toFrameRarity = (rarity: string): Rarity => rarity === 'mythic' ? 'Mythic' : rarity === 'legendary' || rarity === 'divine' ? 'Legendary' : rarity === 'epic' ? 'Epic' : rarity === 'rare' ? 'Rare' : 'Common';

export function SummonScreen() {
  const { withAccessToken } = useVeyraAuth();
  const { gameState, error, isLoading, refresh } = useGameState();
  const [selectedBannerId, setSelectedBannerId] = useState('standard_banner');
  const [result, setResult] = useState<SummonResult | null>(null);
  const [isSummoning, setSummoning] = useState(false);
  const selectedBanner = useMemo(() => gameState?.banners.find((banner) => banner.id === selectedBannerId) ?? gameState?.banners[0], [gameState?.banners, selectedBannerId]);
  const pity = gameState?.pity.find((item) => item.pityGroup === selectedBanner?.pityGroup);
  const summon = async (pullCount: 1 | 10) => {
    if (!selectedBanner) return;
    setSummoning(true);
    const data = await withAccessToken((token) => performGachaSummon(token, selectedBanner.id, pullCount));
    setResult(data ?? { ok: false, error: { code: 'invalid_session', message: 'Sessão indisponível.' } });
    await refresh();
    setSummoning(false);
  };
  return <div className="space-y-4">
    <div className="relative grid min-h-64 place-items-center overflow-hidden rounded-[2.5rem] border border-violet-300/20 bg-radial-[circle_at_center] from-cyan-400/25 via-violet-800/20 to-black"><RarityBurst /><div className="relative text-center"><p className="text-xs uppercase tracking-[.35em] text-cyan-100/70">Aether Portal</p><h2 className="text-4xl font-black">Summon</h2><p className="text-sm text-violet-100/65">Server-side gacha foundation</p></div></div>
    <VACard><div className="flex flex-wrap gap-2">{gameState?.banners.map((banner) => <button key={banner.id} onClick={() => setSelectedBannerId(banner.id)} className={`rounded-full border px-3 py-2 text-xs ${selectedBanner?.id === banner.id ? 'border-cyan-200 bg-cyan-300/15' : 'border-white/10 bg-white/5'}`}>{banner.name}</button>)}</div>{isLoading && <p className="mt-3 text-xs text-cyan-100/70">Carregando game-state real...</p>}{error && <p className="mt-3 text-xs text-amber-100/70">Game-state indisponível: {error}. O app permanece seguro sem sortear no frontend.</p>}</VACard>
    {selectedBanner && <VACard><h3 className="font-black">{selectedBanner.name}</h3><p className="text-xs text-violet-100/65">Token: {selectedBanner.tokenType} • Grupo pity: {selectedBanner.pityGroup}</p><div className="mt-3 grid grid-cols-2 gap-2 text-xs"><span>Gold: {gameState?.currencies.gold ?? 0}</span><span>Gems: {gameState?.currencies.gems ?? 0}</span><span>Standard: {gameState?.currencies.standard_ticket ?? 0}</span><span>Astral: {gameState?.currencies.astral_ticket ?? 0}</span></div><div className="mt-4 space-y-2"><VAProgressBar value={pity?.pullsSinceLegendary ?? 0} max={selectedBanner.pityGroup === 'standard' ? 100 : 90} label="Legendary pity" /><VAProgressBar value={pity?.pullsSinceDivine ?? 0} max={selectedBanner.pityGroup === 'standard' ? 250 : 180} label="Divine pity" /><VAProgressBar value={pity?.pullsSinceMythic ?? 0} max={selectedBanner.pityGroup === 'standard' ? 400 : 300} label="Mythic pity" /></div><details className="mt-4 rounded-2xl border border-white/10 p-3 text-xs"><summary className="cursor-pointer font-bold">Rates / odds</summary><pre className="mt-2 whitespace-pre-wrap text-violet-100/70">{JSON.stringify(selectedBanner.rates, null, 2)}</pre></details><div className="mt-4 grid grid-cols-2 gap-2"><VAButton disabled={isSummoning || !gameState} onClick={() => summon(1)}>Summon 1x</VAButton><VAButton disabled={isSummoning || !gameState} onClick={() => summon(10)}>Summon 10x</VAButton></div><p className="mt-3 text-xs text-emerald-100/70">O sorteio, custo, pity e duplicatas são processados pela Edge Function gacha-summon.</p></VACard>}
    {result?.error && <VACard><p className="text-sm text-amber-100">Erro seguro: {result.error.code}</p></VACard>}
    {result?.results && <div className="grid grid-cols-2 gap-3">{result.results.map((hero, index) => <VARarityFrame key={`${hero.heroId}-${index}`} rarity={toFrameRarity(hero.rarity)}><div className="p-3 text-center"><div className="text-3xl font-black">✦</div><b className="text-sm">{hero.name}</b><p className="text-[11px] text-violet-100/60">{hero.rarity}</p>{hero.isDuplicate && <p className="text-[11px] text-amber-100">Duplicata: +{hero.shardsGained} shards, +{hero.soulDustGained} dust</p>}</div></VARarityFrame>)}</div>}
  </div>;
}
