# VEYRA: AETHERFALL - CRIAÇÃO COMPLETA DO PROJETO

Crie um novo projeto do zero chamado **Veyra: Aetherfall**.

O projeto deve ser um **RPG gacha dark fantasy para Telegram Mini App**, com visual premium mobile, economia controlada, sistemas de progressão, batalhas automáticas por turno, dungeons, summon, shop, anúncios Monetag limitados, estrutura futura para Telegram Stars, TON Connect e Aether Fragments.

O objetivo é criar uma base limpa, moderna, segura e fácil de deployar na Vercel.

---

## 1. IDENTIDADE DO JOGO

### Nome curto

```txt
Veyra
```

### Nome completo

```txt
Veyra: Aetherfall
```

### Gênero

```txt
Mobile RPG Gacha
Dark Aether Fantasy
Telegram Mini App
Auto turn-based battle
Hero collection
```

### Frase de marca

```txt
Colete os caídos. Domine o Aether. Reconstrua um mundo partido.
```

### Descrição curta

```txt
Veyra: Aetherfall é um RPG gacha dark fantasy para Telegram, onde heróis despertam após a queda do Aether e batalham para recuperar os fragmentos de um mundo partido.
```

### Lore base

O mundo de Veyra foi partido pelo Aetherfall, uma queda arcana que fragmentou reinos, despertou heróis antigos e espalhou energia instável pelo vazio.

O jogador invoca campeões, forma equipes, explora dungeons, luta em batalhas por turno e reconstrói seu poder enquanto descobre os segredos do Aether.

---

## 2. STACK OBRIGATÓRIA

Criar o projeto como uma aplicação limpa usando:

```txt
React
Vite
TypeScript
Tailwind CSS
Vercel
Supabase
Telegram Mini App
Monetag rewarded ads
TON Connect preparado
Telegram Stars preparado
```

O projeto deve ser um **Vite SPA**.

Não usar SSR obrigatório.

Não usar servidor próprio no frontend.

Não usar arquitetura complexa desnecessária.

Não usar engine pesada.

Não usar:

```txt
TanStack Start
Nitro
Next.js
Three.js
Phaser
Canvas engine complexa
Cloudflare adapter
Lovable runtime
```

A aplicação deve funcionar bem em mobile, principalmente dentro do Telegram Mini App.

---

## 3. CONFIGURAÇÃO VERCEL

O projeto deve ser deployável na Vercel com:

```txt
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

Criar `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

O build deve gerar:

```txt
dist/index.html
```

---

## 4. PACKAGE.JSON

Criar `package.json` com scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint .",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit --pretty false"
  }
}
```

Dependências recomendadas:

```txt
react
react-dom
vite
typescript
@vitejs/plugin-react
tailwindcss
@tailwindcss/vite
lucide-react
clsx
tailwind-merge
@supabase/supabase-js
@tonconnect/ui-react
sonner
zod
```

Evitar bibliotecas pesadas sem necessidade.

---

## 5. VARIÁVEIS DE AMBIENTE

Criar `.env.example` sem valores reais:

```txt
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=
VITE_TELEGRAM_BOT_USERNAME=
VITE_TON_MANIFEST_URL=
VITE_MONETAG_ZONE_ID=
VITE_DEV_TELEGRAM_ID=
```

Criar `.gitignore`:

```txt
node_modules
dist
.vercel
.env
.env.*
!.env.example
```

Nunca colocar secrets no frontend.

Nunca usar service role no browser.

Não expor:

```txt
SUPABASE_SERVICE_ROLE_KEY
TELEGRAM_BOT_TOKEN
TON private key
admin secret
payment secret
```

Qualquer validação crítica deve ser planejada para backend seguro ou Supabase Edge Functions.

---

## 6. ESTRUTURA DE PASTAS

Criar esta estrutura:

```txt
src/
  app/
    App.tsx
    AppShell.tsx
    navigation.ts
  components/
    ui/
      VAButton.tsx
      VACard.tsx
      VAPanel.tsx
      VAModal.tsx
      VAProgressBar.tsx
      VAResourcePill.tsx
      VARarityFrame.tsx
      VABadge.tsx
      VALoading.tsx
      VAEmptyState.tsx
    layout/
      Topbar.tsx
      BottomNav.tsx
    fx/
      FloatingNumber.tsx
      GlowOrb.tsx
      RarityBurst.tsx
      ImpactFlash.tsx
  screens/
    HomeScreen.tsx
    HeroesScreen.tsx
    HeroDetailScreen.tsx
    BattleScreen.tsx
    DungeonsScreen.tsx
    SummonScreen.tsx
    ShopScreen.tsx
    WalletScreen.tsx
    AetherFountainScreen.tsx
  lib/
    supabase/
      client.ts
    telegram/
      useTelegram.ts
      telegramTypes.ts
    monetag/
      monetag.ts
      adRewards.ts
    ton/
      tonConnect.ts
    rpg/
      types.ts
      constants.ts
      currencies.ts
      reagents.ts
      heroProgression.ts
      skillProgression.ts
      ascension.ts
      awaken.ts
      gear.ts
      power.ts
      battleStats.ts
      battleEngine.ts
      elements.ts
      campaign.ts
      dungeons.ts
      rewards.ts
      shop.ts
      balance.ts
    economy/
      aetherFountain.ts
      aetherFragments.ts
      monetization.ts
    security/
      clientWarnings.ts
  data/
    heroes.ts
    campaign.ts
    dungeons.ts
    rewards.ts
    shopProducts.ts
    starterState.ts
  styles/
    globals.css
docs/
  ARCHITECTURE.md
  DEPLOYMENT.md
  SECURITY_PLAN.md
  SERVER_SIDE_VALIDATION_PLAN.md
  SUPABASE_SCHEMA_PLAN.md
  AETHER_FRAGMENTS_PLAN.md
```

---

## 7. DESIGN SYSTEM

Criar uma interface **dark aether fantasy**, premium, mobile-first.

### Estilo visual

```txt
fundo escuro profundo
roxo arcano
azul aether
dourado raro
vermelho danger
verde cura
vidro escuro
borda mística
glow por raridade
cards com profundidade
texturas sutis
partículas leves
```

### Mobile-first

Obrigatório:

```txt
max-width: 430px
suporte mínimo para 360px
portrait first
touch target mínimo de 44px
safe-area bottom
reduced motion support
scroll suave
botões confortáveis
texto legível
```

### Componentes obrigatórios

Criar:

```txt
VAButton
VACard
VAPanel
VAModal
VAProgressBar
VAResourcePill
VARarityFrame
VABadge
VALoading
VAEmptyState
Topbar
BottomNav
FloatingNumber
RarityBurst
```

---

## 8. APP SHELL

Criar um AppShell mobile com:

```txt
Topbar fixa
BottomNav fixa
conteúdo central max-width 430px
safe area
fundo dark fantasy
transições leves entre telas
```

Abas principais:

```txt
Home
Heroes
Battle
Dungeons
Summon
Shop
Wallet
```

A navegação pode ser por estado interno no MVP.

Não precisa adicionar router complexo.

---

## 9. TELEGRAM MINI APP

Criar hook:

```txt
useTelegram()
```

Ele deve:

- detectar `window.Telegram.WebApp`;
- chamar `ready()`;
- chamar `expand()`;
- ler tema do Telegram se disponível;
- capturar `initData`;
- capturar usuário apenas para UI;
- funcionar fora do Telegram em modo dev;
- ter fallback dev controlado por `VITE_DEV_TELEGRAM_ID`.

Regra de segurança:

```txt
initDataUnsafe não deve ser tratado como fonte confiável para ações críticas.
Telegram initData deve ser validado server-side antes de criar sessão real em produção.
```

---

## 10. SUPABASE

Criar:

```txt
src/lib/supabase/client.ts
```

Usar apenas:

```txt
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Não usar service role no frontend.

No MVP, o estado pode ser local/mockado, mas a estrutura deve estar pronta para conectar Supabase depois.

Criar documento:

```txt
docs/SUPABASE_SCHEMA_PLAN.md
```

Tabelas futuras planejadas:

```txt
players
player_profiles
player_inventory
player_heroes
player_gacha_state
player_campaign_progress
player_dungeon_runs
player_ad_claims
player_aether_fountain
player_wallets
purchase_history
stars_orders
ton_payments
aether_balances
aether_ledger
reward_pools
withdrawals
fraud_flags
```

Não implementar migrations grandes agora.

---

## 11. ESTADO INICIAL DO JOGADOR

Criar estado local/mockado em:

```txt
src/data/starterState.ts
```

Deve conter:

```txt
player
inventory
hero collection
hero catalog
campaign progress
gacha pity
dungeon attempts
ad reward limits
aether fountain state
wallet placeholder
shop placeholder
```

Inventory inicial:

```txt
Gold
Aether Shards
Gems
Stamina
Hero XP
XP Books
Skill Tomes
Elemental Crystals
Sigils
Gear Materials
```

Importante:

```txt
Aether Fragments não fazem parte do inventário comum.
Aether Fragments são um sistema futuro separado.
```

---

## 12. CURRENCIES

Criar em:

```txt
src/lib/rpg/currencies.ts
```

Moedas principais:

```txt
Gold
Aether Shards
Gems
Stamina
Hero XP
Battle Pass XP
```

Cada currency deve ter:

```txt
id
name
description
use
sources
isPremium
canComeFromAds
futureProvider
```

Regras:

```txt
Gold nunca pode virar TON.
Gems nunca podem virar TON.
Aether Shards nunca podem virar TON.
Stamina nunca pode virar TON.
Materials nunca podem virar TON.
Hero XP nunca pode virar TON.
```

---

## 13. REAGENTES E MATERIAIS

Criar em:

```txt
src/lib/rpg/reagents.ts
```

XP Books:

```txt
Minor XP Book
Greater XP Book
Ancient XP Tome
```

Elemental Crystals:

```txt
Fire Crystal
Water Crystal
Nature Crystal
Light Crystal
Dark Crystal
Aether Crystal
```

Skill Tomes:

```txt
Common Skill Tome
Rare Skill Tome
Epic Skill Tome
Legendary Skill Tome
```

Awakening Sigils:

```txt
Bronze Sigil
Silver Sigil
Gold Sigil
Mythic Sigil
```

Gear Materials:

```txt
Iron Ore
Enchanted Leather
Mystic Dust
Rune Fragment
Ancient Core
```

Cada material deve ter:

```txt
id
name
rarity
usage
mainSource
secondarySource
canAppearInAds
canAppearInShop
bottleneckPriority
```

---

## 14. HERÓIS

Criar catálogo inicial em:

```txt
src/data/heroes.ts
```

Criar pelo menos 18 heróis.

### Raridades

```txt
Common
Rare
Epic
Legendary
Mythic
```

### Elementos

```txt
Fire
Water
Nature
Light
Dark
Aether
```

### Funções

```txt
Tank
DPS
Healer
Support
Controller
Debuffer
```

Cada herói deve ter:

```txt
id
name
title
rarity
element
faction
role
portrait
shortLore
baseStats
growthStats
skills
ultimate
passive
tags
```

Os nomes devem parecer parte do universo de Veyra.

Evitar nomes genéricos demais.

---

## 15. FACÇÕES

Criar facções iniciais:

```txt
Order of the First Seal
Aetherbound
Void Court
Sunspire Remnants
Moonveil Covenant
Ashen Wilds
```

Cada herói deve pertencer a uma facção.

---

## 16. HERO PROGRESSION

Criar em:

```txt
src/lib/rpg/heroProgression.ts
```

Funções puras:

```txt
getHeroMaxLevel(stars, ascension)
getXpForNextLevel(level, rarity)
getGoldCostForLevelUp(level, rarity, stars)
calculateHeroStats(hero, ownedHero, gear)
calculateHeroPower(hero, ownedHero, gear)
canLevelUpHero(playerState, heroId)
getMissingLevelUpResources(playerState, heroId)
```

Level cap:

```txt
1 star: level 20
2 stars: level 30
3 stars: level 40
4 stars: level 50
5 stars: level 60
6 stars: level 70
```

Ascension pode aumentar cap futuramente.

---

## 17. SKILL PROGRESSION

Cada herói deve ter:

```txt
Basic Attack
Skill
Ultimate
Passive
```

Criar em:

```txt
src/lib/rpg/skillProgression.ts
```

Funções:

```txt
getSkillUpgradeCost(skillLevel, rarity)
getSkillEffectAtLevel(skill, level)
canUpgradeSkill(playerState, heroId, skillId)
getMissingSkillResources(playerState, heroId, skillId)
calculateSkillPowerGain(hero, skillId, nextLevel)
```

Progressão:

```txt
Lv 1-3: Gold + Common Skill Tome
Lv 4-6: Gold + Rare Skill Tome + Elemental Crystal
Lv 7-9: Gold + Epic Skill Tome + Aether Crystal
Lv 10: Gold + Legendary Skill Tome + Sigil
```

---

## 18. ASCENSION

Criar em:

```txt
src/lib/rpg/ascension.ts
```

Ascension de 0 a 5.

Cada tier deve ter:

```txt
tier
levelRequirement
goldCost
materials
statBonus
futureUnlock
```

Funções:

```txt
getAscensionCost(hero, nextTier)
canAscendHero(playerState, heroId)
getMissingAscensionResources(playerState, heroId)
getAscensionStatBonus(hero, tier)
```

---

## 19. AWAKEN / STAR UP

Criar em:

```txt
src/lib/rpg/awaken.ts
```

Duplicatas viram hero shards.

Valores sugeridos:

```txt
Common duplicate: 10 shards
Rare duplicate: 20 shards
Epic duplicate: 40 shards
Legendary duplicate: 80 shards
Mythic duplicate: 120 shards
```

Star up:

```txt
1 star to 2 stars: 20 shards + gold
2 stars to 3 stars: 40 shards + gold
3 stars to 4 stars: 80 shards + gold + sigil
4 stars to 5 stars: 160 shards + gold + sigil
5 stars to 6 stars: 300 shards + gold + mythic sigil
```

Funções:

```txt
getDuplicateShardValue(rarity)
getStarUpCost(currentStars, rarity)
canStarUpHero(playerState, heroId)
getMissingStarUpResources(playerState, heroId)
```

---

## 20. GEAR FOUNDATION

Criar em:

```txt
src/lib/rpg/gear.ts
```

Slots:

```txt
Weapon
Armor
Helmet
Boots
Amulet
Ring
```

Sets:

```txt
Warrior Set: ATK
Guardian Set: DEF
Swift Set: SPD
Aether Set: Energy
Blood Set: Crit
Divine Set: Healing/Shield
```

Funções:

```txt
getGearUpgradeCost(gearLevel, rarity)
calculateGearStats(gear)
calculateTotalGearPower(gearItems)
canUpgradeGear(playerState, gearId)
```

No MVP, gear pode ser placeholder, mas a UI e os tipos devem existir.

---

## 21. POWER SCORE

Criar em:

```txt
src/lib/rpg/power.ts
```

Power deve considerar:

```txt
HP
ATK
DEF
SPD
Crit Rate
Crit Damage
skill levels
ascension
stars
gear
future synergy
```

Usar power em:

```txt
Heroes
Battle
Campaign
Dungeons
Recommended Power
```

---

## 22. BATTLE STATS

Criar em:

```txt
src/lib/rpg/battleStats.ts
```

CombatStats:

```txt
hp
atk
def
spd
critRate
critDmg
accuracy
resistance
dodge
energyGain
```

Criar função:

```txt
buildCombatUnit(heroDefinition, ownedHero, side)
```

A unidade de combate deve vir dos dados reais de progressão, não de números soltos.

---

## 23. ELEMENTOS

Criar em:

```txt
src/lib/rpg/elements.ts
```

Regras:

```txt
Fire > Nature
Nature > Water
Water > Fire
Light <-> Dark
Aether = especial/neutro
```

Vantagem:

```txt
+20% dano
```

Desvantagem:

```txt
-20% dano
```

Light/Dark:

```txt
+15% entre si
```

Funções:

```txt
getElementDamageModifier(attackerElement, defenderElement)
getWeaknessDamage(attackerElement, defenderWeaknesses)
applyBreakDamage(unit, amount)
```

Preparar weakness/break:

```txt
weaknessElements
toughness
maxToughness
broken
brokenTurns
```

---

## 24. BATTLE ENGINE

Criar em:

```txt
src/lib/rpg/battleEngine.ts
```

Battle MVP:

```txt
5v5
auto turn-based
action bar por SPD
HP bars
energy bars
basic attack
skill
ultimate
cooldown
autoplay
speed x1/x2/x3
floating damage
crit
dodge
shield
burn
poison
stun
elements
weakness/break simples
waves
victory
defeat
rewards
```

Action bar:

```txt
Cada unidade tem actionBar.
A cada tick, actionBar aumenta com base em SPD.
Quando actionBar >= 100, unidade age.
Depois de agir, actionBar reseta.
```

Autoplay inteligente:

Healer:

```txt
cura aliado abaixo de 40% HP
usa ultimate se o time estiver muito ferido
senão basic attack
```

DPS:

```txt
usa ultimate se pronto
usa AoE se houver 3+ inimigos
finaliza inimigo com pouco HP
senão basic attack
```

Tank:

```txt
usa shield/provoke quando disponível
protege aliado fraco
senão basic attack
```

Support:

```txt
usa buff no começo
gera energia se possível
protege DPS principal
senão basic attack
```

---

## 25. STATUS EFFECTS

Implementar ou preparar:

Buffs:

```txt
ATK Up
DEF Up
Shield
Regen
```

Debuffs:

```txt
DEF Down
Burn
Poison
Stun
Break
```

Regras:

```txt
Burn: dano no início do turno baseado em ATK
Poison: dano baseado em max HP, com limite contra boss
Stun: perde próximo turno
Shield: absorve dano antes do HP
DEF Down: aumenta dano recebido
Break: aumenta dano recebido e atrasa actionBar
```

---

## 26. CAMPAIGN

Criar em:

```txt
src/lib/rpg/campaign.ts
src/data/campaign.ts
```

Chapter inicial:

```txt
Chapter 1: Ruins of the First Seal
Stages 1-1 até 1-10
```

Cada stage:

```txt
id
chapterId
name
staminaCost
recommendedPower
waves
firstClearReward
repeatReward
unlockRequirement
```

Funções:

```txt
getCampaignChapters()
getStageById(stageId)
getNextStage(stageId)
canEnterStage(playerState, stageId)
getStageRewards(stageId, firstClear)
```

---

## 27. DUNGEONS

Criar em:

```txt
src/lib/rpg/dungeons.ts
src/data/dungeons.ts
```

Dungeons:

```txt
Gold Dungeon
XP Dungeon
Elemental Dungeon
Skill Dungeon
Gear Dungeon
Ascension Dungeon
```

Dificuldades:

```txt
Easy
Normal
Hard
Expert futuro
Nightmare futuro
```

Cada dungeon deve ter:

```txt
id
name
description
materialFocus
staminaCost
dailyAttemptLimit
attemptsRemaining
recommendedPower
enemyPreview
rewardPreview
adExtraEntryAllowed
locked
```

Tentativas iniciais:

```txt
Gold Dungeon: 3/dia
XP Dungeon: 3/dia
Elemental Dungeon: 2/dia
Skill Dungeon: 2/dia
Gear Dungeon: 3/dia
Ascension Dungeon: 1/dia
```

Funções:

```txt
getDungeonDefinitions()
canEnterDungeon(playerState, dungeonId)
getDungeonRewards(dungeonId, difficulty)
getRemainingDungeonAttempts(playerState, dungeonId)
```

---

## 28. REWARDS

Criar em:

```txt
src/lib/rpg/rewards.ts
src/data/rewards.ts
```

Separar:

First Clear:

```txt
gems pequenas
hero shards
gold maior
material raro controlado
summon ticket futuro
```

Repeat Reward:

```txt
gold
hero XP
XP books
materiais comuns
drop chance
```

Ad Double Reward:

Pode dobrar:

```txt
gold
XP
materiais comuns
```

Não pode dobrar:

```txt
first clear premium
gems raras
summon ticket especial
pity
drops ultra raros
Aether Fragments
TON
Stars
```

---

## 29. FONTE DO AETHER

Criar:

```txt
src/screens/AetherFountainScreen.tsx
src/lib/economy/aetherFountain.ts
```

A **Fonte do Aether** é o sistema permanente de anúncios Monetag.

Ela deve ter:

```txt
Stamina Ad
Double Reward Ad
Bonus Chest
Daily Shards
Dungeon Extra Entry
Aether Chest
Centelha do Aether
```

Limites diários:

```txt
doubleBattleReward: 5/dia
staminaRefill: 3/dia
dungeonExtraEntry: 1 por dungeon/dia
dailyShards: 3/dia
bonusChest: 3/dia
aetherChest: 3/dia
```

Centelha do Aether:

Recompensa recorrente fraca.

Pode dar:

```txt
pequeno gold
pequena XP
material comum
5 stamina
5 Aether Shards
progresso visual da Fonte
```

Não pode dar:

```txt
Aether Fragments sacáveis
TON
Stars
Gems em excesso
material lendário frequente
pity
summon raro garantido
```

Copy segura:

```txt
A Fonte do Aether permite assistir anúncios para acelerar pequenos recursos de progresso. As recompensas são limitadas e não substituem compras, eventos ou progressão normal.
```

---

## 30. MONETAG

Criar:

```txt
src/lib/monetag/monetag.ts
src/lib/monetag/adRewards.ts
```

Funções:

```txt
isMonetagAvailable()
showRewardedAd(adType)
getAdRewardLimit(adType)
canClaimAdReward(playerState, adType)
getRemainingAdClaims(playerState, adType)
applyAdRewardLocalMock(playerState, adType)
```

No MVP, pode funcionar com mock/dev.

Adicionar TODO:

```txt
TODO: validar rewarded ads server-side antes de produção.
```

Regras:

```txt
não confiar no cliente para rewards reais
não permitir claims duplicados
não permitir farm infinito
não entregar recurso financeiro via ads no MVP
```

---

## 31. SUMMON

Criar:

```txt
src/screens/SummonScreen.tsx
src/lib/rpg/shop.ts
```

Summon deve ter:

```txt
portal visual
fundo aether fantasy
1x summon
10x summon
custo claro
pity bar
rates visíveis
banner ativo
featured heroes placeholder
animação de reveal
resultado em grid
reveal all
duplicate conversion visual
NEW badge
rarity glow
```

Custos:

```txt
1x summon: 300 Aether Shards
10x summon: 2700 Aether Shards
```

Pity visual:

```txt
Rare: até 10 pulls
Epic: até 30 pulls
Legendary: até 90 pulls
Mythic: até 180 pulls
```

No MVP pode ser mock/local.

Antes de produção:

```txt
gacha deve ser server-side
pity deve ser server-side
duplicate conversion deve ser server-side
inventory changes devem ser server-side
```

---

## 32. SHOP

Criar:

```txt
src/screens/ShopScreen.tsx
src/data/shopProducts.ts
src/lib/rpg/shop.ts
```

Categorias:

```txt
Free
Ads
Gems
Stars
TON
Battle Pass
Bundles
Stamina
Materials
Summons
```

Free:

```txt
daily free chest
login reward placeholder
```

Ads:

```txt
stamina via ad
daily shards via ad
bonus chest
extra dungeon entry
double reward reminder
```

Gems:

```txt
stamina refill
summon packs
material packs
gold packs
```

Telegram Stars:

```txt
starter pack
summon pack
battle pass
stamina pack
material bundle
```

TON:

```txt
wallet connect
future larger packs
future manual-reviewed payments
future withdrawal channel for eligible Aether Fragments
```

Não implementar pagamento real no MVP.

Não confirmar compra real no cliente.

Não creditar reward pago sem validação server-side.

---

## 33. WALLET

Criar:

```txt
src/screens/WalletScreen.tsx
src/lib/ton/tonConnect.ts
```

Mostrar:

```txt
wallet connected/disconnected
botão conectar
endereço resumido
status de pagamentos futuros
status de saques futuros
aviso seguro
```

Copy segura:

```txt
A wallet TON será usada para conexão, pagamentos futuros revisados e saques futuros de Aether Fragments elegíveis. Compras, saques e recompensas financeiras exigem validação server-side antes de produção.
```

Não implementar:

```txt
pagamento automático
saque automático
NFT
marketplace
staking
```

---

## 34. TELEGRAM STARS

Stars são para compras digitais internas.

Podem comprar futuramente:

```txt
Gems
Battle Pass
Stamina packs
Summon packs
Material packs
Bundles
```

Não permitir:

```txt
Stars compradas virarem Aether Fragments sacáveis
Stars virarem TON
Stars virarem saque
Stars virarem renda
```

Criar tipos em:

```txt
src/lib/economy/monetization.ts
```

Providers:

```txt
free
ads
gems
telegram_stars
ton
```

---

## 35. AETHER FRAGMENTS

Criar:

```txt
src/lib/economy/aetherFragments.ts
docs/AETHER_FRAGMENTS_PLAN.md
```

Aether Fragments são sistema futuro separado.

Eles são pontos de participação em um pool semanal.

Eles não são:

```txt
Gold
Gems
Aether Shards
Stamina
XP
Material
moeda comum de upgrade
```

Modelo futuro:

```txt
weekly_reward_pool_ton = TON disponível para recompensas da semana
total_eligible_aether_fragments = soma dos fragments elegíveis da semana
ton_per_fragment = weekly_reward_pool_ton / total_eligible_aether_fragments
user_ton = user_fragments * ton_per_fragment
```

Não usar:

```txt
1 Aether Fragment = X USD
1 Aether Fragment = X TON
renda garantida
lucro garantido
ganhe X por dia
```

Status futuros de saque:

```txt
draft
pending
approved
rejected
paid
cancelled
flagged
```

Fluxo futuro:

```txt
Jogador conecta wallet TON.
Jogador acumula Aether Fragments elegíveis.
Semana fecha.
Pool semanal define valor variável.
Jogador solicita saque.
Admin revisa.
Admin paga manualmente.
Admin registra tx_hash.
Status muda para paid.
```

Copy segura:

```txt
Aether Fragments participam do pool semanal de recompensas em TON. O valor final é variável e depende do pool disponível, atividade elegível e revisão antifraude.
```

```txt
Os saques são revisados antes do pagamento. Não há valor diário garantido.
```

Não implementar pagamento automático on-chain.

Não implementar saque real no MVP.

---

## 36. HOME SCREEN

Criar Home premium com:

```txt
player profile
resource HUD
hero spotlight
campaign progress
daily quest preview
Fonte do Aether card
summon banner
dungeon shortcut
battle shortcut
shop shortcut
wallet shortcut
```

A Home deve parecer tela principal de RPG gacha mobile.

Não deve parecer dashboard genérico.

---

## 37. HEROES SCREEN

Criar Heroes com:

```txt
grid premium
portrait
nome
raridade
estrelas
elemento
role
level
power
owned/unowned
shards
upgrade available
filtros
sorting
detail modal
```

Filtros:

```txt
All
Owned
Unowned
Rarity
Element
Role
Faction
```

Sorting:

```txt
Power
Level
Rarity
Name
Element
Upgrade Available
```

Hero detail:

```txt
portrait grande
lore
stats
skills
gear
level up
skill upgrade
ascension
awaken
missing resources
where to farm
```

---

## 38. BATTLE SCREEN

Criar BattleScreen visualmente convincente.

Layout:

```txt
topo: stage, wave, speed, auto
área inimiga
action bar
arena/fx layer
área aliada
skill/ultimate compact bar
battle log mínimo opcional
modal victory/defeat
```

Feedback visual:

```txt
floating damage
crit
heal
shield
miss
burn
poison
break
ultimate flash
turn highlight
```

Defeat UX:

Mostrar sugestões:

```txt
Suba o nível dos heróis.
Melhore skills.
Use elemento favorável.
Equipe gear.
Faça dungeons para farmar materiais.
Invoque novos heróis.
```

CTAs:

```txt
Heroes
Dungeons
Summon
```

---

## 39. DUNGEONS SCREEN

Criar DungeonsScreen com cards:

```txt
nome
descrição
material focus
stamina cost
attempts remaining
recommended power
reward preview
run button
ad extra entry
locked/unlocked
```

Visual:

```txt
dark fantasy
cards com ícones de materiais
rarity preview
stamina clear
daily limit clear
```

---

## 40. SUMMON SCREEN

Criar SummonScreen com alta dopamina visual:

```txt
portal do Aether
glow por raridade
flash leve
shake leve
reveal card
legendary/mythic special reveal
result grid
duplicate conversion
NEW badge
```

Animações leves usando CSS transform/opacity.

Respeitar reduced motion.

---

## 41. SHOP SCREEN

Criar ShopScreen com:

```txt
tabs de categoria
cards premium
provider claro
preço claro
reward preview
daily/weekly limits
badge free
badge ad
badge stars
badge ton
badge coming soon
badge best value
```

Separar bem:

```txt
free
ads
gems
stars
ton
```

Não misturar Stars com saque.

Não misturar Gold com TON.

---

## 42. PERFORMANCE

Obrigatório:

```txt
limpar intervals/timeouts
pausar battle ao sair da tela
evitar re-render excessivo
usar CSS transform/opacity
lazy load se fizer sentido
respeitar reduced motion
evitar imagens enormes
evitar dependências pesadas
funcionar bem em Android fraco/intermediário
```

---

## 43. SEGURANÇA

Criar:

```txt
docs/SECURITY_PLAN.md
```

Incluir:

```txt
Telegram initData deve ser validado server-side.
Monetag rewards devem ser validados server-side.
TON payments devem ser verificados on-chain antes de crédito.
Telegram Stars precisam confirmação oficial antes de reward.
Gacha precisa ser server-side.
Pity precisa ser server-side.
Battle rewards precisam ser server-side.
Inventory changes precisam ser server-side.
Aether Fragments precisam antifraude.
Withdraw precisa revisão manual no início.
Service role nunca no frontend.
.env real nunca no Git.
```

---

## 44. SERVER-SIDE FUTURO

Criar:

```txt
docs/SERVER_SIDE_VALIDATION_PLAN.md
```

Funções futuras:

```txt
validateTelegramInitData
bootstrapPlayer
getPlayerState
performSummon
finishBattle
claimBattleReward
claimAdReward
claimAetherFountainReward
enterDungeon
finishDungeon
upgradeHero
upgradeSkill
ascendHero
starUpHero
equipGear
validateStarsPurchase
validateTonPayment
grantAetherFragments
calculateWeeklyRewardPool
requestWithdrawal
approveWithdrawal
markWithdrawalPaid
flagSuspiciousActivity
```

No MVP SPA, deixar claro o que está mock/local.

---

## 45. DOCUMENTAÇÃO

Criar docs:

```txt
docs/ARCHITECTURE.md
docs/DEPLOYMENT.md
docs/SECURITY_PLAN.md
docs/SERVER_SIDE_VALIDATION_PLAN.md
docs/SUPABASE_SCHEMA_PLAN.md
docs/AETHER_FRAGMENTS_PLAN.md
```

README deve explicar:

```txt
nome do projeto
stack
como rodar local
como configurar env
como deployar na Vercel
o que está mockado
o que precisa virar server-side
```

---

## 46. VALIDAÇÃO OBRIGATÓRIA

Rodar:

```bash
npm install
npm run lint
npm run build
npm run typecheck
git diff --check
```

Se algum comando falhar, corrigir antes de entregar.

O projeto só estará aceitável quando:

```txt
lint passar
build passar
typecheck passar
dist/index.html existir
```

---

## 47. ENTREGÁVEIS

Ao final, entregar:

```txt
1. resumo do que foi criado
2. arquitetura final
3. arquivos criados
4. telas implementadas
5. sistemas RPG implementados
6. economia implementada
7. Fonte do Aether implementada
8. Summon implementado
9. Battle MVP implementado
10. Shop implementada
11. Wallet preparada
12. Supabase preparado
13. Telegram Mini App preparado
14. Monetag preparado
15. TON/Stars foundation preparado
16. Aether Fragments documentado
17. mocks restantes
18. TODOs server-side
19. riscos técnicos
20. riscos econômicos
21. riscos de segurança
22. resultado do lint
23. resultado do build
24. resultado do typecheck
25. instruções para deploy na Vercel
```

---

## 48. DEFINIÇÃO DE PRONTO

O projeto estará pronto quando:

```txt
o app se chamar Veyra: Aetherfall
Vite build passar
Vercel config estiver simples
dist/index.html for gerado
Home existir
Heroes existir
Battle MVP existir
Dungeons existir
Summon existir
Shop existir
Wallet existir
Fonte do Aether existir
RPG data layer existir
economy layer existir
security docs existirem
env example existir
.env real não estiver no Git
mobile UX estiver confortável
não houver pagamento real inseguro
não houver saque real
não houver NFT
não houver marketplace
não houver promessa de renda
```

---

## 49. REGRA FINAL

Crie o projeto como se fosse a primeira versão oficial de **Veyra: Aetherfall**.

Priorize:

```txt
base limpa
deploy simples
mobile-first
visual premium
segurança
economia controlada
sistemas RPG claros
fácil manutenção com Codex
```

Não inventar integração real de pagamento, saque ou recompensa financeira sem validação server-side.

Se algo precisar ficar mockado para o MVP, implemente visualmente e documente claramente.

O objetivo é entregar uma primeira versão sólida, bonita e funcional de Veyra: Aetherfall, pronta para evoluir com Supabase, Telegram, Monetag, TON e Stars.
