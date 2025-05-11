import type { BannerShopItem, ThemeShopItem } from '~/types/shop'

export const shopBanners: BannerShopItem[] = [
  // Steps - Normal, Hard, Legendary
  { id: 'orange', title: 'Orange', type: 'banner', price: 100, color: 'orange' },
  { id: 'green', title: 'Green', type: 'banner', price: 100, color: 'green' },
  { id: 'red', title: 'Red', type: 'banner', price: 100, color: 'red' },

  { id: 'blue', title: 'Blue', type: 'banner', price: 200, color: 'blue' },
  { id: 'rose', title: 'Rose', type: 'banner', price: 200, color: 'rose' },

  { id: 'violet', title: 'Violet', type: 'banner', price: 500, rarity: 'rare', color: 'violet' },
  { id: 'yellow', title: 'Yellow', type: 'banner', price: 1000, rarity: 'rare', color: 'yellow' },

  { id: 'bronze', title: 'Bronze', type: 'banner', price: 2500, rarity: 'epic', color: 'bronze' },
  { id: 'silver', title: 'Silver', type: 'banner', price: 5000, rarity: 'epic', color: 'silver' },
  { id: 'gold', title: 'Gold', type: 'banner', price: 7500, rarity: 'epic', color: 'gold' },
  { id: 'platinum', title: 'Platinum', type: 'banner', price: 10000, rarity: 'legendary', color: 'platinum' },

]

export const shopThemes: ThemeShopItem[] = [
  { id: 'orange', title: 'Orange', type: 'theme', price: 500, rarity: 'common', color: '#f97317' },
  { id: 'green', title: 'Green', type: 'theme', price: 500, rarity: 'common', color: '#15a34a' },
  { id: 'red', title: 'Red', type: 'theme', price: 500, rarity: 'common', color: '#dc2627' },

  { id: 'blue', title: 'Blue', type: 'theme', price: 1000, rarity: 'rare', color: '#2563eb', levelrequired: 20 },
  { id: 'rose', title: 'Rose', type: 'theme', price: 1000, rarity: 'rare', color: '#e11e48', levelrequired: 20 },

  { id: 'violet', title: 'Violet', type: 'theme', price: 2500, rarity: 'epic', color: '#7c3aed', levelrequired: 25 },

  { id: 'yellow', title: 'Yellow', type: 'theme', price: 5000, rarity: 'epic', color: '#facb14', levelrequired: 30 },
]
