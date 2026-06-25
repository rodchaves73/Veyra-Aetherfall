from PIL import Image, ImageDraw
import random, hashlib

TRANSPARENT=(0,0,0,0)
INK=(10,8,20,255); INK_SOFT=(24,18,46,255)
VOID_950=(4,6,18,255); VOID_900=(8,10,28,255); VOID_800=(14,16,42,255); VOID_700=(25,24,58,255); VOID_600=(38,35,78,255)
PURPLE_100=(238,218,255,255); PURPLE_300=(188,114,255,255); PURPLE_500=(128,58,214,255); PURPLE_700=(78,33,139,255); PURPLE_900=(35,18,74,255)
CYAN_100=(216,255,255,255); CYAN_300=(95,231,255,255); CYAN_500=(34,164,220,255); CYAN_700=(23,91,145,255); CYAN_900=(11,42,77,255)
GOLD_100=(255,243,184,255); GOLD_300=(230,183,86,255); GOLD_500=(177,127,45,255); GOLD_700=(111,76,30,255); GOLD_900=(63,43,20,255)
RED_300=(238,89,107,255); RED_500=(178,47,70,255); RED_700=(105,28,50,255); RED_900=(52,18,34,255)
GREEN_300=(117,225,134,255); GREEN_500=(56,155,88,255); GREEN_700=(31,86,59,255)
FIRE_HI=GOLD_100; FIRE_MID=(226,86,42,255); FIRE_LOW=RED_700
WATER_HI=CYAN_100; WATER_MID=CYAN_500; WATER_LOW=CYAN_900
NATURE_HI=GREEN_300; NATURE_MID=GREEN_500; NATURE_LOW=GREEN_700
LIGHT_HI=(255,255,238,255); LIGHT_MID=GOLD_100; LIGHT_LOW=GOLD_500
DARK_HI=PURPLE_300; DARK_MID=PURPLE_700; DARK_LOW=VOID_950
AETHER_HI=CYAN_100; AETHER_MID=PURPLE_300; AETHER_LOW=PURPLE_900
RARITY={
 'common':((150,151,166,255),(87,91,111,255),(44,47,65,255)),
 'uncommon':(GREEN_300,GREEN_500,GREEN_700), 'rare':(CYAN_100,CYAN_500,CYAN_900),
 'epic':(PURPLE_100,PURPLE_500,PURPLE_900), 'legendary':(GOLD_100,GOLD_300,GOLD_700),
 'divine':(LIGHT_HI,LIGHT_MID,CYAN_300), 'mythic':((255,174,237,255),PURPLE_300,RED_900)}

def canvas(w,h): return Image.new('RGBA',(w,h),TRANSPARENT)
def px(img,x,y,color):
    if 0<=x<img.width and 0<=y<img.height: img.putpixel((x,y),color)
def rect(img,x0,y0,x1,y1,color): ImageDraw.Draw(img).rectangle([x0,y0,x1,y1],fill=color)
def rect_outline(img,x0,y0,x1,y1,color,w=1):
    d=ImageDraw.Draw(img)
    for i in range(w): d.rectangle([x0+i,y0+i,x1-i,y1-i],outline=color)
def pixel_circle(img,cx,cy,r,color):
    for y in range(cy-r,cy+r+1):
        for x in range(cx-r,cx+r+1):
            if (x-cx)*(x-cx)+(y-cy)*(y-cy)<=r*r: px(img,x,y,color)
def lerp_color(c0,c1,t): return tuple(int(c0[i]+(c1[i]-c0[i])*t) for i in range(4))
def vgradient(img,y0,y1,top,bottom,x0=0,x1=None):
    if x1 is None: x1=img.width-1
    for y in range(y0,y1): rect(img,x0,y,x1,y,lerp_color(top,bottom,(y-y0)/max(1,y1-y0-1)))
def ordered_dither_band(img,x0,y0,x1,y1,c0,c1,ratio=.5):
    b=((0,2),(3,1))
    for y in range(y0,y1):
        for x in range(x0,x1): px(img,x,y,c1 if b[y%2][x%2]/4<ratio else c0)
def stars(img,count,area,rng):
    x0,y0,x1,y1=area
    cols=[CYAN_100,CYAN_300,PURPLE_100,GOLD_100]
    for _ in range(count): px(img,rng.randint(x0,x1),rng.randint(y0,y1),rng.choice(cols))
def auto_outline(img,color=INK,thickness=1):
    out=img.copy(); pix=img.load()
    for y in range(img.height):
        for x in range(img.width):
            if pix[x,y][3]:
                for dy in range(-thickness,thickness+1):
                    for dx in range(-thickness,thickness+1):
                        nx,ny=x+dx,y+dy
                        if 0<=nx<img.width and 0<=ny<img.height and out.getpixel((nx,ny))[3]==0: out.putpixel((nx,ny),color)
    return out
def scale_nn(img,factor): return img.resize((img.width*factor,img.height*factor),Image.NEAREST)
def save(img,path,scale=1,fmt='PNG'):
    from pathlib import Path
    Path(path).parent.mkdir(parents=True,exist_ok=True)
    im=scale_nn(img,scale) if scale!=1 else img
    if fmt.upper()=='WEBP': im.convert('RGB').save(path,'WEBP',quality=90,method=6)
    else: im.save(path,'PNG',optimize=True)
def new_seed(name): return random.Random(int(hashlib.sha256(name.encode()).hexdigest()[:16],16))
