from pixel_kit import *
from generators.gen_shared import path
EN='shadow-wolf void-bat crystal-spider ruin-skeleton dark-slime ember-imp cursed-armor aether-wraith gloom-serpent fallen-acolyte stone-gargoyle void-hound corrupted-mage ruin-guardian night-stalker abyss-crawler'.split()
BO='void-titan ancient-dragon crystal-lich eclipse-reaper'.split()
def creature(name,out,boss=False):
    W,H=(48,48) if boss else (32,32); img=canvas(W,H); rng=new_seed(name); c=RED_700 if 'ember' in name or 'dragon' in name else CYAN_700 if 'crystal' in name else PURPLE_700
    pixel_circle(img,W//2,H//2,14 if boss else 9,c); rect(img,W//2-9,H//2,W//2+9,H-6,DARK_LOW); rect(img,W//2-11,H//2-8,W//2-7,H//2-4,GOLD_300); rect(img,W//2+7,H//2-8,W//2+11,H//2-4,GOLD_300)
    if boss:
        rect(img,7,8,14,36,c); rect(img,34,8,41,36,c); pixel_circle(img,W//2,10,8,PURPLE_300)
    for _ in range(18 if boss else 8): px(img,rng.randrange(3,W-3),rng.randrange(3,H-3),rng.choice([c,PURPLE_300,CYAN_300]))
    img=auto_outline(img,INK); save(img,path(out,'bosses' if boss else 'enemies',('boss-' if boss else 'enemy-')+name+'.png'),4 if not boss else 3,'PNG')
def generate(out):
    for n in EN: creature(n,out)
    for n in BO: creature(n,out,True)
