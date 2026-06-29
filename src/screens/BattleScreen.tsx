import { useEffect, useMemo, useState } from 'react';
import { heroes } from '../data/heroes';
import { starterState } from '../data/starterState';
import { buildCombatUnit } from '../lib/rpg/battleStats';
import { createBattleState, tickBattle, type BattleState } from '../lib/rpg/battleEngine';
import { VAButton } from '../components/ui/VAButton';
import { VACard } from '../components/ui/VACard';
import { VAProgressBar } from '../components/ui/VAProgressBar';
import { FloatingNumber } from '../components/fx/FloatingNumber';
import { ImpactFlash } from '../components/fx/ImpactFlash';

export function BattleScreen() {
  const initial = useMemo(() => createBattleState(heroes.slice(0, 5).map((hero) => buildCombatUnit(hero, starterState.heroes.find((h) => h.heroId === hero.id)!, 'ally')), heroes.slice(9, 14).map((hero) => buildCombatUnit(hero, { ...starterState.heroes.find((h) => h.heroId === hero.id)!, level: 12, stars: 2, owned: true }, 'enemy'))), []);
  const [battle, setBattle] = useState<BattleState>(initial);
  useEffect(() => { if (!battle.auto || battle.result) return; const id = window.setInterval(() => setBattle((current) => tickBattle(current)), 750 / battle.speed); return () => window.clearInterval(id); }, [battle.auto, battle.result, battle.speed]);
  return <div className="space-y-4"><div className="flex items-center justify-between"><div><h2 className="text-2xl font-black">Battle 1-4</h2><p className="text-sm text-violet-100/60">Wave {battle.wave}/2 • Auto turn-based</p></div><VAButton variant="secondary" onClick={() => setBattle((b) => ({ ...b, speed: b.speed === 3 ? 1 : ((b.speed + 1) as 1 | 2 | 3) }))}>x{battle.speed}</VAButton></div><Arena title="Enemies" units={battle.enemies} /><div className="relative grid min-h-28 place-items-center rounded-[2rem] border border-cyan-300/10 bg-gradient-to-br from-violet-950/40 to-cyan-950/20"><ImpactFlash /><FloatingNumber value="CRIT 2840" kind="crit" /><p className="text-xs uppercase tracking-[.35em] text-cyan-100/60">Aether Rift</p></div><Arena title="Allies" units={battle.allies} /><VACard><div className="mb-2 flex gap-2"><VAButton onClick={() => setBattle((b) => tickBattle(b))}>Tick</VAButton><VAButton variant="secondary" onClick={() => setBattle((b) => ({ ...b, auto: !b.auto }))}>{battle.auto ? 'Pause' : 'Auto'}</VAButton></div><div className="space-y-1 text-xs text-violet-100/70">{battle.logs.map((log) => <p key={log.id}>• {log.text}</p>)}</div>{battle.result && <div className="mt-4 rounded-3xl bg-black/30 p-4"><h3 className="text-xl font-black">{battle.result === 'victory' ? 'Victory' : 'Defeat'}</h3><p className="text-sm text-violet-100/70">{battle.result === 'defeat' ? 'Suba níveis, skills, elementos favoráveis, gear, dungeons e summons.' : 'Rewards locais mockados; crédito real deve ser server-side.'}</p></div>}</VACard></div>;
}
function Arena({ title, units }: { title: string; units: BattleState['allies'] }) { return <VACard><p className="mb-3 text-xs uppercase tracking-widest text-violet-100/50">{title}</p><div className="grid grid-cols-5 gap-2">{units.map((unit) => <div key={unit.id} className={`rounded-2xl border p-2 text-center ${unit.currentHp <= 0 ? 'border-red-400/30 opacity-40' : 'border-white/10 bg-white/5'}`}><div className="mx-auto grid h-10 w-10 place-items-center rounded-xl bg-violet-700/40 text-xs font-black">{unit.name.slice(0, 2)}</div><p className="mt-1 truncate text-[10px]">{unit.name.split(' ')[0]}</p><VAProgressBar value={unit.currentHp} max={unit.stats.hp} /><VAProgressBar value={unit.energy} /></div>)}</div></VACard>; }
