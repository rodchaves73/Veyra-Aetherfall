from pixel_kit import *
from generators.gen_shared import path
ICONS='gold gems stamina standard-ticket astral-ticket aether shard star summon heroes battle campaign shop quests inventory settings mail rank chest scroll sword shield staff dagger bow fire water nature light dark aether-magic heal critical defense speed boss'.split()
def draw_symbol(img,name):
    c={'fire':FIRE_MID,'water':WATER_MID,'nature':NATURE_MID,'light':LIGHT_MID,'dark':DARK_MID}.get(name,PURPLE_300)
    if name in ['gold','gems','aether','shard','star']:
        pixel_circle(img,8,8,5, GOLD_300 if name=='gold' else c); rect(img,6,4,8,5,LIGHT_HI)
    elif name in ['sword','dagger','staff','bow','shield']:
        rect(img,7,2,8,12,CYAN_300); rect(img,5,11,10,12,GOLD_300); rect(img,6,13,9,14,GOLD_700)
        if name=='shield': rect(img,4,4,11,11,CYAN_700); rect(img,6,3,9,13,CYAN_300)
    elif name in ['fire','water','nature','light','dark','heal','critical','defense','speed','aether-magic']:
        pixel_circle(img,8,8,5,c); rect(img,7,3,8,13,LIGHT_HI); rect(img,3,7,13,8,LIGHT_HI)
    else:
        rect(img,4,4,11,11,VOID_700); rect_outline(img,3,3,12,12,GOLD_300,1); pixel_circle(img,8,8,3,c)
def generate(out):
    for name in ICONS:
        img=canvas(16,16); draw_symbol(img,name); img=auto_outline(img,INK); save(img,path(out,'icons',f'icon-{name}.png'),4,'PNG')
