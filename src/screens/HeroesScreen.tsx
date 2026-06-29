import { useMemo, useState } from 'react';
import { heroes } from '../data/heroes';
import { elementIcons, rarityOrder } from '../lib/rpg/constants';
import { calculateHeroPower } from '../lib/rpg/heroProgression';
import type { HeroDefinition, PlayerState } from '../lib/rpg/types';
import { GameAssetImage } from '../components/assets/GameAssetImage';
import { VeyraAssetFrame, VeyraPanel, VeyraScreen } from '../components/ui/VeyraVisual';
import { VABadge } from '../components/ui/VABadge';
import { VAModal } from '../components/ui/VAModal';
import { VAProgressBar } from '../components/ui/VAProgressBar';
import { gameAssets } from '../lib/assets';

export function HeroesScreen({ state }: { state: PlayerState }) {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<HeroDefinition | undefined>();
  const list = useMemo(
    () =>
      heroes
        .filter((hero) =>
          filter === 'All' || (filter === 'Owned' ? state.heroes.find((h) => h.heroId === hero.id)?.owned : hero.rarity === filter || hero.element === filter || hero.role === filter),
        )
        .sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]),
    [filter, state.heroes],
  );

  return (
    <VeyraScreen>
      <div className="min-w-0">
        <h2 className="text-2xl font-black">Heroes</h2>
        <p className="text-sm text-violet-100/60">Coleção, upgrades e detalhes de progressão.</p>
      </div>
      <div className="va-scroll -mx-3 flex gap-2 overflow-x-auto px-3 pb-1 sm:-mx-4 sm:px-4">
        {['All', 'Owned', 'Mythic', 'Legendary', 'Epic', 'Fire', 'Water', 'Aether', 'DPS', 'Tank'].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`min-h-11 shrink-0 rounded-full px-4 text-xs font-bold ${filter === item ? 'bg-violet-500 text-white' : 'bg-white/10 text-violet-100'}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid min-w-0 grid-cols-2 gap-2 min-[390px]:gap-3">
        {list.map((hero) => {
          const owned = state.heroes.find((h) => h.heroId === hero.id)!;
          const power = calculateHeroPower(hero, owned);
          return (
            <button key={hero.id} onClick={() => setSelected(hero)} className="min-w-0 text-left">
              <VeyraAssetFrame rarity={hero.rarity} active={selected?.id === hero.id}>
                <div className="min-w-0 p-2 min-[390px]:p-3">
                  <GameAssetImage src={gameAssets.heroes.placeholder.src} fallbackSrc={gameAssets.heroes.placeholder.fallbackSrc} alt={`${hero.name} placeholder`} className="mb-2 h-24 w-full rounded-2xl object-cover" />
                  <div className="flex min-w-0 items-center justify-between gap-1">
                    <b className="min-w-0 truncate text-sm">{hero.name}</b>
                    <span className="shrink-0">{elementIcons[hero.element]}</span>
                  </div>
                  <p className="truncate text-[11px] text-violet-100/55">
                    Lv {owned.level} • {'★'.repeat(owned.stars)}
                  </p>
                  <p className="truncate text-[11px] text-cyan-100">{power} Power</p>
                  {!owned.owned && <VABadge>Unowned</VABadge>}
                </div>
              </VeyraAssetFrame>
            </button>
          );
        })}
      </div>
      <VAModal open={Boolean(selected)} title={selected?.name ?? ''} onClose={() => setSelected(undefined)}>
        {selected && <HeroDetail hero={selected} state={state} />}
      </VAModal>
    </VeyraScreen>
  );
}

function HeroDetail({ hero, state }: { hero: HeroDefinition; state: PlayerState }) {
  const owned = state.heroes.find((h) => h.heroId === hero.id)!;
  return (
    <div className="min-w-0 space-y-3">
      <VeyraPanel className="text-center"><GameAssetImage src={gameAssets.heroes.placeholder.src} fallbackSrc={gameAssets.heroes.placeholder.fallbackSrc} alt="Hero placeholder" className="mx-auto h-32 w-32 rounded-3xl object-cover" /></VeyraPanel>
      <p className="break-words text-sm text-violet-100/70">{hero.shortLore}</p>
      <div className="grid grid-cols-1 gap-2 text-center text-xs min-[360px]:grid-cols-3">
        <div className="min-w-0 rounded-2xl bg-white/5 p-2">
          <b className="block truncate">{hero.rarity}</b>
          <p>Rarity</p>
        </div>
        <div className="min-w-0 rounded-2xl bg-white/5 p-2">
          <b className="block truncate">{hero.element}</b>
          <p>Element</p>
        </div>
        <div className="min-w-0 rounded-2xl bg-white/5 p-2">
          <b className="block truncate">{hero.role}</b>
          <p>Role</p>
        </div>
      </div>
      <VAProgressBar value={owned.level} max={owned.stars * 10 + 10} label="Level" />
      <div className="space-y-2">
        {[...hero.skills, hero.ultimate, hero.passive].map((skill) => (
          <div key={skill.id} className="min-w-0 rounded-2xl bg-white/5 p-3">
            <b className="break-words">{skill.name}</b>
            <p className="break-words text-xs text-violet-100/60">{skill.description}</p>
          </div>
        ))}
      </div>
      <p className="break-words text-xs text-amber-100/80">Gear, ascension, awaken e missing resources estão preparados no data layer do MVP.</p>
    </div>
  );
}
