import type { HeroDefinition } from '../lib/rpg/types';

const skillSet = (slug: string, theme: string) => [
  { id: `${slug}_basic`, name: `${theme} Strike`, kind: 'basic' as const, description: 'Ataque básico que gera energia.', multiplier: 1, effectTags: ['damage', 'energy'] },
  { id: `${slug}_skill`, name: `${theme} Rite`, kind: 'skill' as const, description: 'Habilidade tática com efeito de classe.', multiplier: 1.55, cooldown: 2, effectTags: ['damage', 'role'] },
];

export const heroes: HeroDefinition[] = [
  ['kael_vorr', 'Kael Vorr', 'O Lacre Quebrado', 'Legendary', 'Fire', 'Order of the First Seal', 'Tank', 'KV', 'Um guardião que selou o primeiro rasgo do Aether com a própria armadura.', 980, 74, 72, 88],
  ['seris_moonveil', 'Seris Moonveil', 'Oráculo da Lua Pálida', 'Epic', 'Water', 'Moonveil Covenant', 'Healer', 'SM', 'Suas preces recolhem ecos de rios que já não existem.', 760, 58, 51, 101],
  ['nyxara', 'Nyxara', 'Dama do Vazio Cortês', 'Mythic', 'Dark', 'Void Court', 'Controller', 'NX', 'Sorri antes de dobrar sombras ao redor da vontade inimiga.', 870, 82, 48, 112],
  ['aurelian_sunscar', 'Aurelian Sunscar', 'Última Chama de Sunspire', 'Legendary', 'Light', 'Sunspire Remnants', 'DPS', 'AS', 'Carrega um sol ferido no peito e uma lâmina feita de amanhecer.', 820, 96, 44, 105],
  ['brynn_ashroot', 'Brynn Ashroot', 'Filha da Floresta Cinzenta', 'Rare', 'Nature', 'Ashen Wilds', 'Support', 'BA', 'Cultiva vida em cinzas onde a queda arcana tocou primeiro.', 790, 54, 58, 96],
  ['velm_aetherion', 'Velm Aetherion', 'Cartógrafo do Abismo Azul', 'Epic', 'Aether', 'Aetherbound', 'Debuffer', 'VA', 'Mapeia correntes invisíveis e corta o poder de quem as toca.', 740, 78, 43, 116],
  ['orik_stonechant', 'Orik Stonechant', 'Muralha Rúnica', 'Common', 'Nature', 'Order of the First Seal', 'Tank', 'OS', 'Um recruta teimoso cuja fé pesa mais que o escudo.', 910, 48, 70, 74],
  ['lyra_cindervow', 'Lyra Cindervow', 'Juramento em Brasa', 'Rare', 'Fire', 'Ashen Wilds', 'DPS', 'LC', 'Dança entre brasas e transforma juramentos em cortes.', 690, 82, 39, 108],
  ['mirelle_tideglass', 'Mirelle Tideglass', 'Alquimista das Marés', 'Common', 'Water', 'Aetherbound', 'Healer', 'MT', 'Mistura gotas suspensas no tempo para fechar feridas.', 720, 47, 46, 92],
  ['thane_noct', 'Thane Noct', 'Carrasco sem Sino', 'Epic', 'Dark', 'Void Court', 'Debuffer', 'TN', 'Cada golpe rouba um som do mundo e deixa medo no lugar.', 810, 86, 45, 98],
  ['elowen_dawnbriar', 'Elowen Dawnbriar', 'Espinho da Aurora', 'Rare', 'Light', 'Sunspire Remnants', 'Support', 'ED', 'Seu estandarte reacende tropas cansadas com luz tranquila.', 765, 61, 55, 103],
  ['corvin_riftmark', 'Corvin Riftmark', 'Caçador de Fendas', 'Legendary', 'Aether', 'Aetherbound', 'DPS', 'CR', 'Persegue monstros por fendas que só ele consegue ouvir.', 840, 101, 42, 118],
  ['sable_verdant', 'Sable Verdant', 'Sombra do Bosque Morto', 'Epic', 'Nature', 'Moonveil Covenant', 'Controller', 'SV', 'Raízes negras obedecem seus sussurros e prendem reis.', 800, 70, 52, 99],
  ['rhosk_ironwake', 'Rhosk Ironwake', 'Naufrágio Vivo', 'Rare', 'Water', 'Order of the First Seal', 'Tank', 'RI', 'Sobreviveu afogado no Aether; agora a maré o protege.', 950, 55, 68, 70],
  ['isolde_starfall', 'Isolde Starfall', 'Arquera da Queda Estelar', 'Mythic', 'Light', 'Moonveil Covenant', 'DPS', 'IS', 'Dispara fragmentos de uma estrela que ainda cai.', 850, 108, 41, 122],
  ['mordain_emberhex', 'Mordain Emberhex', 'Bruxo das Cinzas Rubras', 'Epic', 'Fire', 'Void Court', 'Debuffer', 'ME', 'Marca inimigos com runas que queimam até a memória.', 730, 90, 36, 110],
  ['talia_gloomreed', 'Talia Gloomreed', 'Canção do Pântano', 'Common', 'Dark', 'Ashen Wilds', 'Controller', 'TG', 'Sua flauta chama venenos lentos e sonhos ruins.', 700, 52, 42, 104],
  ['evran_sealborne', 'Evran Sealborne', 'Herdeiro do Primeiro Selo', 'Legendary', 'Aether', 'Order of the First Seal', 'Support', 'ES', 'Canaliza pactos antigos para manter equipes vivas no impossível.', 880, 76, 63, 107],
].map(([id, name, title, rarity, element, faction, role, portrait, shortLore, hp, atk, def, spd]) => {
  const skills = skillSet(id as string, (element as string));
  return {
    id,
    name,
    title,
    rarity,
    element,
    faction,
    role,
    portrait,
    shortLore,
    baseStats: { hp, atk, def, spd, critRate: 0.08, critDmg: 1.5 },
    growthStats: { hp: Math.round(Number(hp) * 0.09), atk: Math.round(Number(atk) * 0.08), def: Math.round(Number(def) * 0.07), spd: 0.35, critRate: 0.001, critDmg: 0.004 },
    skills,
    ultimate: { id: `${id}_ultimate`, name: 'Aetherfall Requiem', kind: 'ultimate', description: 'Ultimate cinematográfica com impacto elemental.', multiplier: 2.8, energyCost: 100, effectTags: ['ultimate', 'burst'] },
    passive: { id: `${id}_passive`, name: 'Echo of the Fallen', kind: 'passive', description: 'Passiva única que reforça sua função em combate.', effectTags: ['passive', String(role).toLowerCase()] },
    tags: [String(rarity), String(element), String(role), String(faction)],
  } as HeroDefinition;
});

export const getHeroById = (id: string) => heroes.find((hero) => hero.id === id);
