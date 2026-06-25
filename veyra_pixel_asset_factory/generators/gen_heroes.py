from pixel_kit import *
from generators.gen_shared import path
HEROES=[('common',['iron-squire','field-archer','apprentice-mage','stone-guard']),('uncommon',['forest-lancer','ember-rogue','rune-acolyte','frost-sentinel']),('rare',['aether-duelist','moon-priestess','void-ranger','crystal-knight','flame-oracle','shadow-monk']),('epic',['arcane-witch','golden-paladin','night-assassin','storm-sage','blood-vanguard','star-summoner']),('legendary',['solar-champion','void-emperor','aether-queen','dragon-herald','celestial-blade']),('divine',['seraph-of-aether','oracle-of-stars','radiant-warden']),('mythic',['eclipse-sovereign','abyssal-archmage'])]
def hero(rarity,name,out):
    hi,mid,low=RARITY[rarity]; img=canvas(32,48); rng=new_seed(name)
    if rarity in ['epic','legendary','divine','mythic']: pixel_circle(img,16,23,15,low)
    rect(img,13,8,18,14,hi); rect(img,10,15,21,31,mid); rect(img,11,31,14,42,low); rect(img,17,31,20,42,low)
    rect(img,7,17,10,30,mid); rect(img,22,17,25,30,mid); rect(img,9,12,22,17,low)
    if any(k in name for k in ['archer','ranger','bow']): rect(img,25,12,26,38,GOLD_300)
    elif any(k in name for k in ['mage','witch','oracle','archmage','sage','summoner','acolyte']): rect(img,24,8,25,39,CYAN_300); pixel_circle(img,24,7,2,hi)
    else: rect(img,23,10,24,35,LIGHT_HI); rect(img,21,13,26,14,GOLD_300)
    for _ in range({'common':2,'uncommon':4,'rare':7,'epic':10,'legendary':14,'divine':18,'mythic':22}[rarity]): px(img,rng.randrange(4,28),rng.randrange(4,42),rng.choice([hi,CYAN_300,GOLD_300]))
    img=auto_outline(img,INK); save(img,path(out,'heroes',f'hero-{rarity}-{name}.png'),4,'PNG')
def generate(out):
    for r,names in HEROES:
        for n in names: hero(r,n,out)
