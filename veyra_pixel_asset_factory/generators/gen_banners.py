from pixel_kit import *
from generators.gen_shared import path, ornate_frame, rune_sparkles
B=['standard-summon','astral-summon','legendary-rateup','divine-awakening','mythic-eclipse','battle-event','starter-pack']
def generate(out):
    for b in B:
        img=canvas(96,32); rng=new_seed(b); vgradient(img,2,30,VOID_800,VOID_950,2,93); pixel_circle(img,72,16,10,PURPLE_700); ornate_frame(img,GOLD_300 if 'legendary' in b or 'starter' in b else PURPLE_500,CYAN_300); rune_sparkles(img,rng,15); img=auto_outline(img,INK); save(img,path(out,'banners',f'banner-{b}.png'),3,'PNG')
