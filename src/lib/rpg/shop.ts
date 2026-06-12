import { shopProducts } from '../../data/shopProducts';

export const summonCosts = { single: 300, ten: 2700 };
export const pityCaps = { rare: 10, epic: 30, legendary: 90, mythic: 180 };
export const getShopProducts = (category?: string) => category ? shopProducts.filter((product) => product.category === category) : shopProducts;
export const getSummonRates = () => ({ Common: 0.55, Rare: 0.28, Epic: 0.12, Legendary: 0.045, Mythic: 0.005 });
