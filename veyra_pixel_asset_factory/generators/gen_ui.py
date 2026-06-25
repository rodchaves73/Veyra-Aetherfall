from pixel_kit import *
from generators.gen_shared import path, ornate_frame, rune_sparkles
SPECS={'ui-panel-dark-arcane.png':(96,64),'ui-panel-card-mission.png':(72,56),'ui-panel-card-feature.png':(80,64),'ui-panel-card-hero.png':(64,88),'ui-panel-modal.png':(112,88),'ui-panel-topbar.png':(120,24),'ui-panel-bottom-nav.png':(120,28),'ui-panel-resource-pill.png':(48,16),'ui-panel-progress-track.png':(72,10),'ui-panel-progress-fill.png':(72,10),'ui-divider-arcane.png':(96,8),'ui-button-primary-purple.png':(72,20),'ui-button-secondary-dark.png':(72,20),'ui-button-gold.png':(72,20),'ui-button-danger.png':(72,20),'ui-button-small-square.png':(20,20),'ui-button-small-horizontal.png':(40,18),'ui-slot-empty.png':(32,32),'ui-slot-active.png':(32,32),'ui-avatar-frame.png':(40,40)}
def make(n,out):
    w,h=SPECS[n]; img=canvas(w,h); rng=new_seed(n); fill=VOID_900; edge=PURPLE_500
    if 'gold' in n: fill=GOLD_900; edge=GOLD_300
    if 'danger' in n: fill=RED_900; edge=RED_300
    if 'progress-fill' in n: fill=PURPLE_500; edge=CYAN_300
    rect(img,3,3,w-4,h-4,fill); ornate_frame(img,edge,GOLD_300); rune_sparkles(img,rng,max(2,w*h//900)); img=auto_outline(img,INK); save(img,path(out,'ui',n),2,'PNG')
def generate(out):
    for n in SPECS: make(n,out)
