import { useMemo, useState } from 'react';
import { GameAssetImage } from '../components/assets/GameAssetImage';
import { VeyraAssetFrame, VeyraButton, VeyraPanel, VeyraResourcePill, VeyraScreen } from '../components/ui/VeyraVisual';
import { VAProgressBar } from '../components/ui/VAProgressBar';

import { useVeyraAuth } from '../lib/auth/useVeyraAuth';
import { performGachaSummon } from '../lib/game/gameClient';
import { useGameState } from '../lib/game/useGameState';
import type { SummonResult } from '../lib/game/gameTypes';
import type { Rarity } from '../lib/rpg/types';
import { gameAssets } from '../lib/assets';

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
  return <VeyraScreen background={gameAssets.backgrounds.summon} className="min-h-[calc(100dvh-10rem)]"><div className="relative grid min-h-72 place-items-center overflow-hidden rounded-[2.5rem] border border-violet-300/20 bg-black/25"><GameAssetImage decorative src={gameAssets.fx.summonGlow.src} fallbackSrc={gameAssets.fx.summonGlow.fallbackSrc} className="veyra-summon-ring absolute h-64 w-64 opacity-60" /><GameAssetImage decorative src={gameAssets.fx.portal.src} fallbackSrc={gameAssets.fx.portal.fallbackSrc} className="veyra-portal-breathe absolute left-1/2 top-8 w-60 -translate-x-1/2 opacity-70" /><div className="relative text-center"><p className="text-xs uppercase tracking-[.35em] text-cyan-100/70">Aether Portal</p><h2 className="text-4xl font-black">Summon</h2><p className="text-sm text-violet-100/65">Server-side gacha foundation</p></div></div>
    <VeyraPanel><div className="flex flex-wrap gap-2">{gameState?.banners.map((banner) => <button key={banner.id} onClick={() => setSelectedBannerId(banner.id)} className={`rounded-full border px-3 py-2 text-xs ${selectedBanner?.id === banner.id ? 'border-cyan-200 bg-cyan-300/15' : 'border-white/10 bg-white/5'}`}>{banner.name}</button>)}</div>{isLoading && <p className="mt-3 text-xs text-cyan-100/70">Carregando game-state real...</p>}{error && <p className="mt-3 text-xs text-amber-100/70">Game-state indisponível: {error}. O app permanece seguro sem sortear no frontend.</p>}</VeyraPanel>
    {selectedBanner && <VeyraPanel><h3 className="font-black">{selectedBanner.name}</h3><p className="text-xs text-violet-100/65">Token: {selectedBanner.tokenType} • Grupo pity: {selectedBanner.pityGroup}</p><div className="mt-3 grid grid-cols-2 gap-2"><VeyraResourcePill asset={gameAssets.icons.gold} label="Gold" value={gameState?.currencies.gold ?? 0} /><VeyraResourcePill asset={gameAssets.icons.gems} label="Gems" value={gameState?.currencies.gems ?? 0} /><VeyraResourcePill asset={gameAssets.icons.standardTicket} label="Standard" value={gameState?.currencies.standard_ticket ?? 0} /><VeyraResourcePill asset={gameAssets.icons.astralTicket} label="Astral" value={gameState?.currencies.astral_ticket ?? 0} /></div><div className="mt-4 space-y-2"><VAProgressBar value={pity?.pullsSinceLegendary ?? 0} max={selectedBanner.pityGroup === 'standard' ? 100 : 90} label="Legendary pity" /><VAProgressBar value={pity?.pullsSinceDivine ?? 0} max={selectedBanner.pityGroup === 'standard' ? 250 : 180} label="Divine pity" /><VAProgressBar value={pity?.pullsSinceMythic ?? 0} max={selectedBanner.pityGroup === 'standard' ? 400 : 300} label="Mythic pity" /></div><details className="mt-4 rounded-2xl border border-white/10 p-3 text-xs"><summary className="cursor-pointer font-bold">Rates / odds</summary><pre className="mt-2 whitespace-pre-wrap text-violet-100/70">{JSON.stringify(selectedBanner.rates, null, 2)}</pre></details><div className="mt-4 grid grid-cols-2 gap-2"><VeyraButton variant="gold" disabled={isSummoning || !gameState} onClick={() => summon(1)}>Summon 1x</VeyraButton><VeyraButton className="veyra-shimmer" disabled={isSummoning || !gameState} onClick={() => summon(10)}>Summon 10x</VeyraButton></div><p className="mt-3 text-xs text-emerald-100/70">O sorteio, custo, pity e duplicatas são processados pela Edge Function gacha-summon.</p></VeyraPanel>}
    {result?.error && <VeyraPanel><p className="text-sm text-amber-100">Erro seguro: {result.error.code}</p></VeyraPanel>}
    {result?.results && <div className="grid grid-cols-2 gap-3">{result.results.map((hero, index) => <VeyraAssetFrame key={`${hero.heroId}-${index}`} rarity={toFrameRarity(hero.rarity)} active={index === 0}><div className="p-3 text-center"><GameAssetImage src={gameAssets.heroes.placeholder.src} fallbackSrc={gameAssets.heroes.placeholder.fallbackSrc} alt="Hero placeholder" className="mx-auto mb-2 h-20 w-20 rounded-2xl object-cover" /><b className="text-sm">{hero.name}</b><p className="text-[11px] text-violet-100/60">{hero.rarity}</p>{hero.isDuplicate && <p className="text-[11px] text-amber-100">Duplicata: +{hero.shardsGained} shards, +{hero.soulDustGained} dust</p>}</div></VeyraAssetFrame>)}</div>}
  </VeyraScreen>;
}
