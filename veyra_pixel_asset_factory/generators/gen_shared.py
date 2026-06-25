from pixel_kit import *
from pathlib import Path

def ornate_frame(img, color, hi=None):
    hi=hi or GOLD_300; w,h=img.size
    rect_outline(img,1,1,w-2,h-2,INK_SOFT,1); rect_outline(img,2,2,w-3,h-3,color,1)
    for x,y in [(2,2),(w-5,2),(2,h-5),(w-5,h-5)]: rect(img,x,y,x+2,y+2,hi)

def rune_sparkles(img,rng,n=12):
    for _ in range(n):
        x=rng.randrange(2,img.width-2); y=rng.randrange(2,img.height-2); c=rng.choice([CYAN_300,PURPLE_300,GOLD_300])
        px(img,x,y,c); px(img,x+1,y,c)

def path(base,*p): return str(Path(base).joinpath(*p))
