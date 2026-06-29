import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import AdmZip from 'adm-zip';
import sharp from 'sharp';

const repoRoot = process.cwd();
const requiredZips = ['v_ui_a.zip', 'v_ui_b.zip', 'v_ui_c.zip'];
const skipPattern = /(?:preview|review|contact|source_zips|stage10|stage_10|character|full[_-]?package|raw full sheets)/i;

const selections = [
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/home/backgrounds/bg_01.png', 'public/assets/game/backgrounds/background-home-arcane-ruins.webp'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/summon/portal/portal_01.png', 'public/assets/game/backgrounds/background-summon-portal.webp'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage05_campaign_missions_dungeons_ui/veyra_campaign_missions_dungeons_ui_cut_assets/campaign/background/background_01.png', 'public/assets/game/backgrounds/background-campaign-ruins.webp'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage07_battle_layout_final_ui/veyra_battle_arena_clean_ui_cut_assets/battle/arena_backgrounds/arena_background_01.png', 'public/assets/game/backgrounds/background-battle-aetherfield.webp'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage01_ui_base/veyra_ui_cut_assets/ui/panels/panel_01.png', 'public/assets/game/ui/ui-panel-dark-arcane.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage01_ui_base/veyra_ui_cut_assets/ui/buttons/button_01.png', 'public/assets/game/ui/ui-button-primary.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage01_ui_base/veyra_ui_cut_assets/ui/buttons/button_02.png', 'public/assets/game/ui/ui-button-gold.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage08_profile_wallet_settings_ui/veyra_profile_wallet_settings_ui_cut_assets/decorations/dividers/divider_01.png', 'public/assets/game/ui/ui-divider-arcane.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage01_ui_base/veyra_ui_cut_assets/icons/icon_01.png', 'public/assets/game/icons/icon-gold.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage01_ui_base/veyra_ui_cut_assets/icons/icon_02.png', 'public/assets/game/icons/icon-gems.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage01_ui_base/veyra_ui_cut_assets/icons/icon_03.png', 'public/assets/game/icons/icon-stamina.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/icons/icon_10.png', 'public/assets/game/icons/icon-standard-ticket.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/icons/icon_11.png', 'public/assets/game/icons/icon-astral-ticket.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage08_profile_wallet_settings_ui/veyra_profile_wallet_settings_ui_cut_assets/ui_common/icons/icon_01.png', 'public/assets/game/icons/icon-wallet.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage08_profile_wallet_settings_ui/veyra_profile_wallet_settings_ui_cut_assets/ui_common/icons/icon_02.png', 'public/assets/game/icons/icon-settings.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage08_profile_wallet_settings_ui/veyra_profile_wallet_settings_ui_cut_assets/account/security_icons/security_icon_01.png', 'public/assets/game/icons/icon-lock.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage03_heroes_collection_ui/veyra_heroes_ui_clean_cut_assets/heroes/rarity_frames/rarity_frame_01.png', 'public/assets/game/frames/frame-common.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage03_heroes_collection_ui/veyra_heroes_ui_clean_cut_assets/heroes/rarity_frames/rarity_frame_02.png', 'public/assets/game/frames/frame-rare.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage03_heroes_collection_ui/veyra_heroes_ui_clean_cut_assets/heroes/rarity_frames/rarity_frame_03.png', 'public/assets/game/frames/frame-epic.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage03_heroes_collection_ui/veyra_heroes_ui_clean_cut_assets/heroes/rarity_frames/rarity_frame_04.png', 'public/assets/game/frames/frame-legendary.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage03_heroes_collection_ui/veyra_heroes_ui_clean_cut_assets/heroes/rarity_frames/rarity_frame_05.png', 'public/assets/game/frames/frame-divine.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage03_heroes_collection_ui/veyra_heroes_ui_clean_cut_assets/heroes/rarity_frames/rarity_frame_06.png', 'public/assets/game/frames/frame-mythic.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/summon/cards/card_01.png', 'public/assets/game/banners/banner-standard.webp'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/summon/cards/card_02.png', 'public/assets/game/banners/banner-astral.webp'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/summon/cards/card_03.png', 'public/assets/game/banners/banner-divine.webp'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/summon/cards/card_04.png', 'public/assets/game/banners/banner-mythic.webp'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage06_shop_rewards_offers_ui/veyra_shop_rewards_offers_ui_cut_assets/shop/featured_banner/featured_banner_01.png', 'public/assets/game/banners/banner-beginner.webp'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/home/portal/portal_01.png', 'public/assets/game/fx/fx-portal.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/summon/fx/fx_01.png', 'public/assets/game/fx/fx-summon-glow.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage07_battle_layout_final_ui/veyra_battle_arena_clean_ui_cut_assets/battle/generic_fx/generic_fx_01.png', 'public/assets/game/fx/fx-hit.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage07_battle_layout_final_ui/veyra_battle_arena_clean_ui_cut_assets/battle/generic_fx/generic_fx_02.png', 'public/assets/game/fx/fx-heal.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/summon/fx/fx_02.png', 'public/assets/game/fx/fx-fire.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/summon/fx/fx_03.png', 'public/assets/game/fx/fx-arcane.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage07_battle_layout_final_ui/veyra_battle_arena_clean_ui_cut_assets/battle/active_slot_highlights/active_slot_highlight_01.png', 'public/assets/game/fx/fx-slot-active-glow.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage08_profile_wallet_settings_ui/veyra_profile_wallet_settings_ui_cut_assets/decorations/generic_fx/generic_fx_01.png', 'public/assets/game/fx/fx-ui-shimmer.png'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage03_heroes_collection_ui/veyra_heroes_ui_clean_cut_assets/heroes/portrait_slots/portrait_slot_01.png', 'public/assets/game/heroes/hero-placeholder.webp'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage07_battle_layout_final_ui/veyra_battle_arena_clean_ui_cut_assets/battle/enemy_slots/enemy_slot_01.png', 'public/assets/game/enemies/enemy-placeholder.webp'],
  ['v_ui_b.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage04_inventory_equipment_ui/veyra_inventory_equipment_ui_cut_assets/inventory/item_grid/item_grid_01.png', 'public/assets/game/items/item-placeholder.png'],
  ['v_ui_a.zip', 'veyra_stage1_to_stage8_implementation_package/assets/stage02_home_summon_battle_ui_expanded/veyra_assets_stage2_cut/summon/fx/fx_04.png', 'public/assets/game/spritesheets/spritesheet-placeholder-fx.png'],
];

for (const zipName of requiredZips) {
  if (!fs.existsSync(path.join(repoRoot, zipName))) {
    console.error(`Missing required asset source ZIP: ${zipName}`);
    process.exit(1);
  }
}

const zips = new Map(requiredZips.map((zipName) => [zipName, new AdmZip(path.join(repoRoot, zipName))]));
let extracted = 0;
const generated = [];

for (const [zipName, sourcePath, destinationPath] of selections) {
  if (skipPattern.test(sourcePath)) {
    throw new Error(`Refusing to extract skipped source path: ${sourcePath}`);
  }

  const zip = zips.get(zipName);
  const entry = zip.getEntry(sourcePath);
  if (!entry || entry.isDirectory) {
    throw new Error(`Missing selected asset in ${zipName}: ${sourcePath}`);
  }

  const destination = path.join(repoRoot, destinationPath);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const input = entry.getData();

  if (destination.endsWith('.webp')) {
    await sharp(input).webp({ quality: 86 }).toFile(destination);
  } else {
    fs.writeFileSync(destination, input);
  }

  extracted += 1;
  generated.push(destinationPath);
}

console.log(`Veyra Stage 1-8 runtime asset extraction complete.`);
console.log(`Source ZIPs: ${requiredZips.join(', ')}`);
console.log(`Generated runtime assets: ${extracted}`);
for (const file of generated) console.log(` - ${file}`);
