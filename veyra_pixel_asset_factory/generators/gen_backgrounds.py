from pixel_kit import *
from generators.gen_shared import path

def bg(name,out,accent):
    rng=new_seed(name); img=canvas(128,192); vgradient(img,0,80,VOID_950,VOID_800); vgradient(img,80,192,VOID_800,VOID_900); ordered_dither_band(img,0,70,128,95,VOID_800,accent,.3); stars(img,120,(0,0,127,100),rng)
    for i in range(5):
        x=8+i*25+rng.randint(-5,5); rect(img,x,82+rng.randint(-8,8),x+10,160,VOID_700); rect_outline(img,x-1,80,x+11,160,INK_SOFT,1)
    pixel_circle(img,64,86,26,accent); pixel_circle(img,64,86,18,VOID_900); rect(img,0,160,127,191,VOID_950); rune_spark(img,rng,accent)
    save(img,path(out,'backgrounds',name),1,'WEBP')
def rune_spark(img,rng,c):
    for _ in range(60): px(img,rng.randrange(128),rng.randrange(192),rng.choice([c,CYAN_300,PURPLE_300,GOLD_300]))
def generate(out):
    for n,c in [('background-home-arcane-ruins.webp',PURPLE_700),('background-summon-aether-portal.webp',PURPLE_300),('background-battle-void-temple.webp',RED_700),('background-campaign-ruined-map.webp',GOLD_700),('background-heroes-hall.webp',CYAN_700),('background-shop-arcane-market.webp',GOLD_500)]: bg(n,out,c)
