from pixel_kit import *
from generators.gen_shared import path, ornate_frame
def generate(out):
    for rarity,(hi,mid,low) in RARITY.items():
        img=canvas(48,64); ornate_frame(img,mid,hi)
        for i in range({'common':1,'uncommon':2,'rare':3,'epic':4,'legendary':5,'divine':6,'mythic':7}[rarity]): pixel_circle(img,24,10+i*7,1,hi)
        img=auto_outline(img,INK); save(img,path(out,'frames',f'frame-{rarity}.png'),3,'PNG')
