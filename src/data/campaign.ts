export const campaignChapters = [{
  id: 'chapter-1', name: 'Chapter 1: Ruins of the First Seal', description: 'As primeiras ruínas ainda vibram com o eco do Aetherfall.',
  stages: Array.from({ length: 10 }, (_, index) => ({ id: `1-${index + 1}`, chapterId: 'chapter-1', name: `Ruína ${index + 1}`, staminaCost: 6 + Math.floor(index / 3), recommendedPower: 4200 + index * 1250, waves: 2 + Math.floor(index / 4), firstClearReward: [{ id: 'gems', amount: 20 }, { id: 'gold', amount: 2500 + index * 400 }], repeatReward: [{ id: 'gold', amount: 900 + index * 140 }, { id: 'hero_xp', amount: 450 + index * 60 }], unlockRequirement: index === 0 ? undefined : `1-${index}` })),
}];
