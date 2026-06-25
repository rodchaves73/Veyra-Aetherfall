from pathlib import Path
import json, zipfile, hashlib, shutil, sys
from PIL import Image, ImageDraw
ROOT=Path(__file__).parent; OUT=ROOT/'output'; GAME=OUT/'public/assets/game'
sys.path.insert(0,str(ROOT))
from generators import gen_backgrounds, gen_ui, gen_icons, gen_frames, gen_banners, gen_fx, gen_heroes, gen_enemies
CATS=['backgrounds','ui','icons','frames','banners','fx','heroes','enemies','bosses']
REQUIRED={
'backgrounds':['background-home-arcane-ruins.webp','background-summon-aether-portal.webp','background-battle-void-temple.webp','background-campaign-ruined-map.webp','background-heroes-hall.webp','background-shop-arcane-market.webp'],
'ui':['ui-panel-dark-arcane.png','ui-panel-card-mission.png','ui-panel-card-feature.png','ui-panel-card-hero.png','ui-panel-modal.png','ui-panel-topbar.png','ui-panel-bottom-nav.png','ui-panel-resource-pill.png','ui-panel-progress-track.png','ui-panel-progress-fill.png','ui-divider-arcane.png','ui-button-primary-purple.png','ui-button-secondary-dark.png','ui-button-gold.png','ui-button-danger.png','ui-button-small-square.png','ui-button-small-horizontal.png','ui-slot-empty.png','ui-slot-active.png','ui-avatar-frame.png'],
'icons':['icon-gold.png','icon-gems.png','icon-stamina.png','icon-standard-ticket.png','icon-astral-ticket.png','icon-aether.png','icon-shard.png','icon-star.png','icon-summon.png','icon-heroes.png','icon-battle.png','icon-campaign.png','icon-shop.png','icon-quests.png','icon-inventory.png','icon-settings.png','icon-mail.png','icon-rank.png','icon-chest.png','icon-scroll.png','icon-sword.png','icon-shield.png','icon-staff.png','icon-dagger.png','icon-bow.png','icon-fire.png','icon-water.png','icon-nature.png','icon-light.png','icon-dark.png','icon-aether-magic.png','icon-heal.png','icon-critical.png','icon-defense.png','icon-speed.png','icon-boss.png'],
'frames':[f'frame-{r}.png' for r in ['common','uncommon','rare','epic','legendary','divine','mythic']],
'banners':[f'banner-{b}.png' for b in ['standard-summon','astral-summon','legendary-rateup','divine-awakening','mythic-eclipse','battle-event','starter-pack']],
'fx':[f'fx-{f}.png' for f in ['aether-burst','aether-orb','aether-slash','purple-impact','summon-circle','portal-spark','fire-burst','water-wave','nature-spark','light-blessing','dark-curse','heal-glow','critical-hit','shield-block','level-up','star-particles']],
'heroes':[], 'enemies':[], 'bosses':[]}
REQUIRED['heroes']=[p.name for p in []]

def clean():
    if OUT.exists(): shutil.rmtree(OUT)
    for c in CATS: (GAME/c).mkdir(parents=True,exist_ok=True)
    (OUT/'manifest').mkdir(parents=True); (OUT/'preview').mkdir(parents=True)
def manifest():
    data={'version':'veyra-procedural-assets-v1','generated_by':'pixel_kit.py + Pillow procedural generator','license':'original procedural assets generated for Veyra: Aetherfall','categories':{c:{} for c in CATS}}
    for c in CATS:
        for p in sorted((GAME/c).glob('*')):
            if p.suffix.lower() not in ['.png','.webp']: continue
            im=Image.open(p); rel=f'/assets/game/{c}/{p.name}'; key=p.stem
            data['categories'][c][key]={'key':key,'path':rel,'category':c,'format':p.suffix[1:].lower(),'width':im.width,'height':im.height,'transparent':('A' in im.getbands() and c!='backgrounds'),'procedural':True}
    (OUT/'manifest/asset_manifest.json').write_text(json.dumps(data,indent=2,ensure_ascii=False))
    lines=['# Catálogo de assets procedurais Veyra\n']
    for c,items in data['categories'].items():
        lines += [f'\n## {c}\n']+[f'- `{v["path"]}` ({v["width"]}×{v["height"]})\n' for v in items.values()]
    (OUT/'manifest/asset_catalog.md').write_text(''.join(lines))
    (OUT/'manifest/asset_license.md').write_text('Todos os assets deste pacote foram gerados proceduralmente por código usando pixel_kit.py + Pillow.\nNenhum asset externo foi usado.\nNenhum asset de terceiros foi incluído.\nNenhuma licença externa é necessária.\n')
    return data
def sheet(files,dest,thumb=96,cols=6):
    rows=(len(files)+cols-1)//cols; cell=thumb+12; img=Image.new('RGBA',(cols*cell,rows*cell),(18,16,32,255)); d=ImageDraw.Draw(img)
    for i,p in enumerate(files):
        x=(i%cols)*cell+6; y=(i//cols)*cell+6
        for yy in range(y,y+thumb,8):
            for xx in range(x,x+thumb,8): d.rectangle([xx,yy,xx+7,yy+7],fill=(42,38,58,255) if (xx+yy)//8%2 else (24,22,36,255))
        im=Image.open(p).convert('RGBA'); im.thumbnail((thumb,thumb),Image.NEAREST); img.alpha_composite(im,(x+(thumb-im.width)//2,y+(thumb-im.height)//2))
    img.save(dest)
def previews():
    all_files=[p for c in CATS for p in sorted((GAME/c).glob('*')) if p.suffix.lower() in ['.png','.webp']]
    sheet(all_files,OUT/'preview/contact_sheet.png',80,8); sheet(sorted((GAME/'heroes').glob('*.png')),OUT/'preview/contact_sheet_heroes.png',96,6); sheet(sorted((GAME/'ui').glob('*.png')),OUT/'preview/contact_sheet_ui.png',96,5); sheet(sorted((GAME/'icons').glob('*.png')),OUT/'preview/contact_sheet_icons.png',64,8)
def validate(data):
    files=[]
    for c in CATS:
        for p in sorted((GAME/c).glob('*')):
            if p.suffix.lower() in ['.png','.webp']:
                files.append(p); im=Image.open(p); assert im.width>0 and im.height>0
                if c!='backgrounds': assert 'A' in im.getbands() and im.getbbox() is not None
                assert p.stem in data['categories'][c]
    assert len(files)==sum(len(v) for v in data['categories'].values())
    return len(files)
def make_zip():
    zp=ROOT/'veyra-procedural-assets-v1.zip'
    if zp.exists(): zp.unlink()
    with zipfile.ZipFile(zp,'w',zipfile.ZIP_DEFLATED) as z:
        for base in [OUT/'public',OUT/'manifest',OUT/'preview']:
            for p in base.rglob('*'):
                if p.is_file() and '__pycache__' not in str(p): z.write(p,p.relative_to(OUT))
    return zp
def main():
    clean(); out=str(GAME); [g.generate(out) for g in [gen_backgrounds,gen_ui,gen_icons,gen_frames,gen_banners,gen_fx,gen_heroes,gen_enemies]]; data=manifest(); previews(); count=validate(data); zp=make_zip(); print(json.dumps({'assets':count,'zip':str(zp),'categories':{c:len(data['categories'][c]) for c in CATS}},indent=2))
if __name__=='__main__': main()
