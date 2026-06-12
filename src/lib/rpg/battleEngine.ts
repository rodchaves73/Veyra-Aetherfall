import { getElementDamageModifier } from './elements';
import type { CombatUnit } from './battleStats';

export type BattleLogEntry = { id: string; text: string; kind: 'damage' | 'heal' | 'system' | 'status' };
export type BattleState = { allies: CombatUnit[]; enemies: CombatUnit[]; wave: number; speed: 1 | 2 | 3; auto: boolean; logs: BattleLogEntry[]; result?: 'victory' | 'defeat' };

const living = (units: CombatUnit[]) => units.filter((unit) => unit.currentHp > 0);
const chooseTarget = (units: CombatUnit[]) => living(units).sort((a, b) => a.currentHp - b.currentHp)[0];

export const createBattleState = (allies: CombatUnit[], enemies: CombatUnit[]): BattleState => ({ allies, enemies, wave: 1, speed: 1, auto: true, logs: [{ id: 'start', text: 'A fenda se abre. Auto battle iniciado.', kind: 'system' }] });

export const tickBattle = (state: BattleState): BattleState => {
  if (state.result) return state;
  const allUnits = [...state.allies, ...state.enemies].map((unit) => ({ ...unit, actionBar: unit.currentHp > 0 ? unit.actionBar + unit.stats.spd / 18 : unit.actionBar }));
  const actor = allUnits.filter((unit) => unit.currentHp > 0).sort((a, b) => b.actionBar - a.actionBar)[0];
  let allies = allUnits.filter((unit) => unit.side === 'ally');
  let enemies = allUnits.filter((unit) => unit.side === 'enemy');
  const logs = [...state.logs].slice(-7);
  if (actor && actor.actionBar >= 100) {
    const targets = actor.side === 'ally' ? enemies : allies;
    const target = chooseTarget(targets);
    actor.actionBar = 0;
    actor.energy = Math.min(100, actor.energy + actor.stats.energyGain);
    if (target) {
      const crit = Math.random() < actor.stats.critRate;
      const miss = Math.random() < target.stats.dodge;
      const modifier = getElementDamageModifier(actor.element, target.element);
      const raw = miss ? 0 : Math.max(1, actor.stats.atk * (actor.energy >= 100 ? 2.1 : 1.05) * modifier - target.stats.def * 0.45);
      const damage = Math.round(raw * (crit ? actor.stats.critDmg : 1));
      const updatedTarget = { ...target, currentHp: Math.max(0, target.currentHp - damage), energy: Math.min(100, target.energy + 8) };
      if (actor.energy >= 100) actor.energy = 0;
      logs.push({ id: crypto.randomUUID(), text: miss ? `${actor.name} errou ${target.name}` : `${actor.name} causou ${damage}${crit ? ' CRIT' : ''} em ${target.name}`, kind: 'damage' });
      allies = allies.map((unit) => (unit.id === actor.id ? actor : unit.id === updatedTarget.id ? updatedTarget : unit));
      enemies = enemies.map((unit) => (unit.id === actor.id ? actor : unit.id === updatedTarget.id ? updatedTarget : unit));
    }
  }
  const result = living(enemies).length === 0 ? 'victory' : living(allies).length === 0 ? 'defeat' : undefined;
  return { ...state, allies, enemies, logs, result };
};
