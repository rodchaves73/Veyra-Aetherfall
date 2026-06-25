from pixel_kit import *
from generators.gen_shared import path
FX='aether-burst aether-orb aether-slash purple-impact summon-circle portal-spark fire-burst water-wave nature-spark light-blessing dark-curse heal-glow critical-hit shield-block level-up star-particles'.split()
def generate(out):
    for f in FX:
        img=canvas(32,32); rng=new_seed(f); col=FIRE_MID if 'fire' in f else WATER_MID if 'water' in f else NATURE_MID if 'nature' in f else LIGHT_MID if 'light' in f or 'heal' in f else DARK_MID if 'dark' in f else PURPLE_300
        pixel_circle(img,16,16,10,col); pixel_circle(img,16,16,6,TRANSPARENT)
        for _ in range(35): px(img,rng.randrange(3,29),rng.randrange(3,29),rng.choice([col,CYAN_300,GOLD_300,LIGHT_HI]))
        if 'slash' in f:
            for i in range(24): rect(img,4+i,22-i,6+i,23-i,col)
        img=auto_outline(img,INK); save(img,path(out,'fx',f'fx-{f}.png'),4,'PNG')
