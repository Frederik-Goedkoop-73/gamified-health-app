import type { AvatarShopItem, BannerShopItem, ThemeShopItem } from '~/types/shop'
import { AVATAR_PATHS } from '~/components/tasks/data/avatarData'

export const shopAvatars: AvatarShopItem[] = [
  // common
  { id: 'alumn', title: 'Alumn', type: 'avatar', price: 50, rarity: 'common', path: AVATAR_PATHS.alumn },
  { id: 'august', title: 'August', type: 'avatar', price: 50, rarity: 'common', path: AVATAR_PATHS.august },
  { id: 'belon', title: 'Belon', type: 'avatar', price: 50, rarity: 'common', path: AVATAR_PATHS.belon },
  { id: 'specs', title: 'Specs', type: 'avatar', price: 50, rarity: 'common', path: AVATAR_PATHS.specs },
  { id: 'trooper', title: 'Trooper', type: 'avatar', price: 50, rarity: 'common', path: AVATAR_PATHS.trooper },

  { id: 'bronco', title: 'Bronco', type: 'avatar', price: 100, rarity: 'common', path: AVATAR_PATHS.bronco },
  { id: 'corsair', title: 'Corsair', type: 'avatar', price: 100, rarity: 'common', path: AVATAR_PATHS.corsair },
  { id: 'hawker', title: 'Hawker', type: 'avatar', price: 100, rarity: 'common', path: AVATAR_PATHS.hawker },
  { id: 'marauder', title: 'Marauder', type: 'avatar', price: 100, rarity: 'common', path: AVATAR_PATHS.marauder },

  // rare
  { id: 'kitty', title: 'Kitty', type: 'avatar', price: 200, rarity: 'rare', path: AVATAR_PATHS.kitty },

  { id: 'amblyoid', title: 'Amblyoid', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.amblyoid, levelrequired: 10 },
  { id: 'automaton', title: 'Automaton', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.automaton, levelrequired: 10 },
  { id: 'djinn', title: 'Djinn', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.djinn, levelrequired: 10 },
  { id: 'exonaut', title: 'Exonaut', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.exonaut, levelrequired: 10 },
  { id: 'feline', title: 'Feline', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.feline, levelrequired: 10 },
  { id: 'ninja', title: 'Ninja', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.ninja, levelrequired: 10 },
  { id: 'paragon', title: 'Paragon', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.paragon, levelrequired: 10 },

  // epic
  { id: 'jedi', title: 'Jedi', type: 'avatar', price: 1000, rarity: 'epic', path: AVATAR_PATHS.jedi, levelrequired: 20 },
  { id: 'occultist', title: 'Occultist', type: 'avatar', price: 1000, rarity: 'epic', path: AVATAR_PATHS.occultist, levelrequired: 20 },
  { id: 'mulk', title: 'Mulk', type: 'avatar', price: 1000, rarity: 'epic', path: AVATAR_PATHS.mulk, levelrequired: 20 },

  { id: 'cranium', title: 'Cranium', type: 'avatar', price: 2000, rarity: 'epic', path: AVATAR_PATHS.cranium, levelrequired: 25 },

  { id: 'rambro', title: 'Rambro', type: 'avatar', price: 2500, rarity: 'epic', path: AVATAR_PATHS.rambro, levelrequired: 30 },
  { id: 'hi_kitty', title: 'Hi Kitty', type: 'avatar', price: 2500, rarity: 'epic', path: AVATAR_PATHS.hi_kitty, levelrequired: 30 },

  { id: 'lucifer', title: 'Lucifer', type: 'avatar', price: 5000, rarity: 'epic', path: AVATAR_PATHS.lucifer, levelrequired: 35 },
  { id: 'hello_bunny', title: 'Hello Bunny', type: 'avatar', price: 5000, rarity: 'epic', path: AVATAR_PATHS.hello_bunny, levelrequired: 35 },

  // legendary 
  { id: 'robo_sunic', title: 'Robo Sunic', type: 'avatar', price: 10000, rarity: 'legendary', path: AVATAR_PATHS.robo_sunic, levelrequired: 40 },
  { id: 'broku', title: 'Broku', type: 'avatar', price: 10000, rarity: 'legendary', path: AVATAR_PATHS.broku, levelrequired: 50 },
  { id: 'palmolive', title: 'Palmolive', type: 'avatar', price: 10000, rarity: 'legendary', path: AVATAR_PATHS.palmolive, levelrequired: 50 },

]

export const shopBanners: BannerShopItem[] = [
  // Steps - Normal, Hard, Legendary
  { id: 'orange', title: 'Orange', type: 'banner', price: 100, color: '#f97317' },
  { id: 'green', title: 'Green', type: 'banner', price: 100, color: '#15a34a' },
  { id: 'red', title: 'Red', type: 'banner', price: 100, color: '#dc2627' },

  { id: 'blue', title: 'Blue', type: 'banner', price: 200, color: '#2563eb' },
  { id: 'rose', title: 'Rose', type: 'banner', price: 200, color: '#e11e48' },

  { id: 'violet', title: 'Violet', type: 'banner', price: 500, color: '#7c3aed' },
  { id: 'yellow', title: 'Yellow', type: 'banner', price: 1000, color: '#facb14' },

  { id: 'bronze', title: 'Bronze', type: 'banner', price: 2500, color: 'bronze' },
  { id: 'silver', title: 'Silver', type: 'banner', price: 5000, color: 'silver' },
  { id: 'gold', title: 'Gold', type: 'banner', price: 7500, color: 'gold' },
  { id: 'platinum', title: 'Platinum', type: 'banner', price: 10000, color: 'platinum' },

]

export const shopThemes: ThemeShopItem[] = [
  { id: 'orange', title: 'Orange', type: 'theme', price: 500, color: '#f97317' },
  { id: 'green', title: 'Green', type: 'theme', price: 500, color: '#15a34a' },
  { id: 'red', title: 'Red', type: 'theme', price: 500, color: '#dc2627' },

  { id: 'blue', title: 'Blue', type: 'theme', price: 1000, color: '#2563eb' },
  { id: 'rose', title: 'Rose', type: 'theme', price: 1000, color: '#e11e48' },

  { id: 'violet', title: 'Violet', type: 'theme', price: 2500, color: '#7c3aed' },

  { id: 'yellow', title: 'Yellow', type: 'theme', price: 5000, color: '#facb14' },
]
