import type { AvatarShopItem } from '~/types/shop'

export type AvatarID =
  | 'red' // Default avatars
  | 'blue' // Default avatars
  | 'green' // Default avatars
// Shop
  | 'alumn'
  | 'amblyoid'
  | 'august'
  | 'automaton'
  | 'bronco'
  | 'belon'
  | 'corsair'
  | 'cranium'
  | 'djinn'
  | 'exonaut'
  | 'feline'
  | 'hawker'
  | 'jedi'
  | 'kitty'
  | 'marauder'
  | 'mulk'
  | 'ninja'
  | 'occultist'
  | 'paragon'
  | 'specs'
  | 'sultan'
  | 'trooper'

// Premium
  | 'rambro'
  | 'lucifer'
  | 'broku'
  | 'hi_kitty'
  | 'hello_bunny'
  | 'palmolive'
  | 'robo_sunic'

// Story
  | 'packman'
  | 'orange_ghost'
  | 'cyan_ghost'
  | 'red_ghost'
  | 'vulnerable_ghost'

  | 'steven'
  | 'axel'
  | 'crieper'
  | 'skeleton'
  | 'urbanite'

  | 'lario'
  | 'muigi'
  | 'plum'
  | 'joshi'
  | 'tode'

  | 'sunic'
  | 'tail'
  | 'aimy'
  | 'nukkels'
  | 'super_sunic'

  | 'fill'
  | 'jack'
  | 'princess_chewingum'
  | 'GMO'
  | 'chunky_space_princess'

  | 'cow'
  | 'sheep'
  | 'pig'
  | 'zombee'
  | 'endman'
  | 'goonba'
  | 'boser'
  | 'smeggman'
  | 'silhouette'
  | 'snow_king'
  | 'xans'
  | 'private'
  | 'herobrime'

export const AVATAR_PATHS: Record<AvatarID, string> = {
// Default  
  red: '/avatars/red.png',
  blue: '/avatars/blue.png',
  green: '/avatars/green.png',

  // Shop normal
  alumn: '/avatars/alumn.png',
  amblyoid: '/avatars/amblyoid.png',
  august: '/avatars/august.png',
  automaton: '/avatars/automaton.png',
  bronco: '/avatars/bronco.png',
  belon: '/avatars/belon.png',
  corsair: '/avatars/corsair.png',
  cranium: '/avatars/cranium.png',
  djinn: '/avatars/djinn.png',
  exonaut: '/avatars/exonaut.png',
  feline: '/avatars/feline.png',
  hawker: '/avatars/hawker.png',
  jedi: '/avatars/jedi.png',
  kitty: '/avatars/kitty.png',
  marauder: '/avatars/marauder.png',
  mulk: '/avatars/mulk.png',
  ninja: '/avatars/ninja.png',
  occultist: '/avatars/occultist.png',
  paragon: '/avatars/paragon.png',
  specs: '/avatars/specs.png',
  sultan: '/avatars/sultan.png',
  trooper: '/avatars/trooper.png',

  // Premium
  rambro: '/extra-avatars/rambro.png',
  lucifer: '/extra-avatars/lucifer.png',
  broku: '/extra-avatars/broku.png',
  hi_kitty: '/extra-avatars/hi kitty.png',
  hello_bunny: '/extra-avatars/hello bunny.png',
  palmolive: '/extra-avatars/palmolive.png',
  robo_sunic: '/extra-avatars/robo sunic.png',

  // Story
  packman: '/story-avatars/pacman/packman.png',
  orange_ghost: '/story-avatars/pacman/orange ghost.png',
  cyan_ghost: '/story-avatars/pacman/cyan ghost.png',
  red_ghost: '/story-avatars/pacman/red ghost.png',
  vulnerable_ghost: '/story-avatars/pacman/vulnerable ghost.png',

  steven: '/story-avatars/minecraft/steven.png',
  axel: '/story-avatars/minecraft/axel.png',
  crieper: '/story-avatars/minecraft/crieper.png',
  skeleton: '/story-avatars/minecraft/skeleton.png',
  urbanite: '/story-avatars/minecraft/urbanite.png',

  lario: '/story-avatars/mario/lario.png',
  muigi: '/story-avatars/mario/muigi.png',
  plum: '/story-avatars/mario/plum.png',
  joshi: '/story-avatars/mario/joshi.png',
  tode: '/story-avatars/mario/tode.png',

  sunic: '/story-avatars/sonic/sunic.png',
  tail: '/story-avatars/sonic/tail.png',
  aimy: '/story-avatars/sonic/aimy.png',
  nukkels: '/story-avatars/sonic/nukkels.png',
  super_sunic: '/story-avatars/sonic/super sunic.png',

  fill: '/story-avatars/adventure-time/fill.png',
  jack: '/story-avatars/adventure-time/jack.png',
  princess_chewingum: '/story-avatars/adventure-time/princess chewingum.png',
  GMO: '/story-avatars/adventure-time/GMO.png',
  chunky_space_princess: '/story-avatars/adventure-time/chunky space princess.png',

  cow: '/story-avatars/mobs/cow.png',
  sheep: '/story-avatars/mobs/sheep.png',
  pig: '/story-avatars/mobs/pig.png',
  zombee: '/story-avatars/mobs/zombee.png',
  endman: '/story-avatars/mobs/endman.png',
  goonba: '/story-avatars/mobs/goonba.png',
  boser: '/story-avatars/mobs/boser.png',
  smeggman: '/story-avatars/mobs/smeggman.png',
  silhouette: '/story-avatars/mobs/silhouette.png',
  snow_king: '/story-avatars/mobs/snow king.png',
  xans: '/story-avatars/mobs/xans.png',
  private: '/story-avatars/mobs/private.png',
  herobrime: '/story-avatars/mobs/herobrime.png',
}

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

  // Extra avatars
  { id: 'packman', title: 'Packman', type: 'avatar', price: 10, rarity: 'common', path: AVATAR_PATHS.packman, starsrequired: 5 },
  { id: 'orange_ghost', title: 'Orange Ghost', type: 'avatar', price: 10, rarity: 'common', path: AVATAR_PATHS.orange_ghost, starsrequired: 10 },
  { id: 'cyan_ghost', title: 'Cyan Ghost', type: 'avatar', price: 10, rarity: 'common', path: AVATAR_PATHS.cyan_ghost, starsrequired: 15 },
  { id: 'red_ghost', title: 'Red Ghost', type: 'avatar', price: 10, rarity: 'common', path: AVATAR_PATHS.red_ghost, starsrequired: 20 },
  { id: 'vulnerable_ghost', title: 'Vulnerable Ghost', type: 'avatar', price: 20, rarity: 'common', path: AVATAR_PATHS.vulnerable_ghost, starsrequired: 40 },

  { id: 'steven', title: 'Steven', type: 'avatar', price: 50, rarity: 'common', path: AVATAR_PATHS.steven, starsrequired: 45 },
  { id: 'axel', title: 'Axel', type: 'avatar', price: 50, rarity: 'common', path: AVATAR_PATHS.axel, starsrequired: 50 },
  { id: 'crieper', title: 'Crieper', type: 'avatar', price: 50, rarity: 'common', path: AVATAR_PATHS.crieper, starsrequired: 55 },
  { id: 'skeleton', title: 'Skeleton', type: 'avatar', price: 50, rarity: 'common', path: AVATAR_PATHS.skeleton, starsrequired: 60 },
  { id: 'urbanite', title: 'Urbanite', type: 'avatar', price: 100, rarity: 'rare', path: AVATAR_PATHS.urbanite, starsrequired: 80 },

  { id: 'lario', title: 'Lario', type: 'avatar', price: 100, rarity: 'common', path: AVATAR_PATHS.lario, starsrequired: 85 },
  { id: 'muigi', title: 'Muigi', type: 'avatar', price: 100, rarity: 'common', path: AVATAR_PATHS.muigi, starsrequired: 90 },
  { id: 'plum', title: 'Plum', type: 'avatar', price: 100, rarity: 'common', path: AVATAR_PATHS.plum, starsrequired: 95 },
  { id: 'joshi', title: 'Joshi', type: 'avatar', price: 100, rarity: 'common', path: AVATAR_PATHS.joshi, starsrequired: 100 },
  { id: 'tode', title: 'Tode', type: 'avatar', price: 200, rarity: 'rare', path: AVATAR_PATHS.tode, starsrequired: 120 },

  { id: 'sunic', title: 'Sunic', type: 'avatar', price: 200, rarity: 'rare', path: AVATAR_PATHS.sunic, starsrequired: 125 },
  { id: 'tail', title: 'Tail', type: 'avatar', price: 200, rarity: 'rare', path: AVATAR_PATHS.tail, starsrequired: 130 },
  { id: 'aimy', title: 'Aimy', type: 'avatar', price: 200, rarity: 'rare', path: AVATAR_PATHS.aimy, starsrequired: 135 },
  { id: 'nukkels', title: 'Nukkels', type: 'avatar', price: 200, rarity: 'rare', path: AVATAR_PATHS.nukkels, starsrequired: 140 },
  { id: 'super_sunic', title: 'Super Sunic', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.super_sunic, starsrequired: 160 },

  { id: 'fill', title: 'Fill', type: 'avatar', price: 300, rarity: 'rare', path: AVATAR_PATHS.fill, starsrequired: 165 },
  { id: 'jack', title: 'Jack', type: 'avatar', price: 300, rarity: 'rare', path: AVATAR_PATHS.jack, starsrequired: 170 },
  { id: 'princess_chewingum', title: 'Princess Chewingum', type: 'avatar', price: 300, rarity: 'rare', path: AVATAR_PATHS.princess_chewingum, starsrequired: 175 },
  { id: 'GMO', title: 'GMO', type: 'avatar', price: 300, rarity: 'rare', path: AVATAR_PATHS.GMO, starsrequired: 180 },
  { id: 'chunky_space_princess', title: 'Chunky Space Princess', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.chunky_space_princess, starsrequired: 200 },

  { id: 'cow', title: 'Cow', type: 'avatar', price: 400, rarity: 'rare', path: AVATAR_PATHS.cow, starsrequired: 205 },
  { id: 'sheep', title: 'Sheep', type: 'avatar', price: 400, rarity: 'rare', path: AVATAR_PATHS.sheep, starsrequired: 210 },
  { id: 'pig', title: 'Pig', type: 'avatar', price: 400, rarity: 'rare', path: AVATAR_PATHS.pig, starsrequired: 215 },
  { id: 'zombee', title: 'Zombee', type: 'avatar', price: 400, rarity: 'rare', path: AVATAR_PATHS.zombee, starsrequired: 220 },
  { id: 'endman', title: 'Endman', type: 'avatar', price: 1000, rarity: 'epic', path: AVATAR_PATHS.endman, starsrequired: 240 },

  { id: 'goonba', title: 'Goonba', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.goonba, starsrequired: 245 },
  { id: 'boser', title: 'Boser', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.boser, starsrequired: 250 },
  { id: 'smeggman', title: 'Smeggman', type: 'avatar', price: 500, rarity: 'rare', path: AVATAR_PATHS.smeggman, starsrequired: 255 },
  { id: 'silhouette', title: 'Silhouette', type: 'avatar', price: 1000, rarity: 'epic', path: AVATAR_PATHS.silhouette, starsrequired: 280 },
  { id: 'snow_king', title: 'Snow King', type: 'avatar', price: 1000, rarity: 'epic', path: AVATAR_PATHS.snow_king, starsrequired: 300 },

  { id: 'xans', title: 'Xans', type: 'avatar', price: 0, rarity: 'legendary', path: AVATAR_PATHS.xans, starsrequired: 315 },
  { id: 'private', title: 'Private', type: 'avatar', price: 0, rarity: 'legendary', path: AVATAR_PATHS.private, starsrequired: 315 },
  { id: 'herobrime', title: 'Herobrime', type: 'avatar', price: 0, rarity: 'legendary', path: AVATAR_PATHS.herobrime, starsrequired: 315 },
]

export const DEFAULT_AVATARS = ['red', 'blue', 'green'] as const
export type DefaultAvatarID = typeof DEFAULT_AVATARS[number]

export const SHOP_AVATARS = [
  'alumn',
  'amblyoid',
  'august',
  'automaton',
  'bronco',
  'belon',
  'corsair',
  'cranium',
  'djinn',
  'exonaut',
  'feline',
  'hawker',
  'jedi',
  'kitty',
  'marauder',
  'mulk',
  'ninja',
  'occultist',
  'paragon',
  'specs',
  'sultan',
  'trooper',
] as AvatarID[]

export const PREMIUM_AVATARS = {
  broforce: ['rambro', 'lucifer', 'broku'] as AvatarID[],
  helloKitty: ['hi_kitty', 'hello_bunny', 'palmolive'] as AvatarID[],
  sega: ['robo_sunic'] as AvatarID[],
}

export const STORY_AVATARS = {
  packman: ['packman', 'orange_ghost', 'cyan_ghost', 'red_ghost', 'vulnerable_ghost'] as AvatarID[],
  minekraft: ['steven', 'axel', 'crieper', 'skeleton', 'urbanite'] as AvatarID[],
  lario: ['lario', 'muigi', 'plum', 'joshi', 'tode'] as AvatarID[],
  sunic: ['sunic', 'tail', 'aimy', 'nukkels', 'super_sunic'] as AvatarID[],
  quest_time: ['fill', 'jack', 'princess_chewingum', 'GMO', 'chunky_space_princess'] as AvatarID[],
  mobs: [
    'cow',
    'sheep',
    'pig',
    'zombee',
    'endman',
  ] as AvatarID[],
  more_mobs: [
    'goonba',
    'boser',
    'smeggman',
    'silhouette',
    'snow_king',
  ] as AvatarID[],
  completionist: [
    'xans',
    'private',
    'herobrime',
  ] as AvatarID[],
}

// New type to extend AvatarShopItem
export interface ProfileAvatarItem extends AvatarShopItem {
  category: 'default' | 'shop' | 'premium' | 'story'
  subcategory?: keyof typeof PREMIUM_AVATARS | keyof typeof STORY_AVATARS
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const PROFILE_AVATARS: ProfileAvatarItem[] = getAvatarIds().map((id) => {
  const path = AVATAR_PATHS[id]
  const shopItem = shopAvatars.find(a => a.id === id)

  if ((DEFAULT_AVATARS as readonly string[]).includes(id)) {
    return {
      id,
      title: capitalize(id),
      type: 'avatar',
      rarity: 'common',
      price: 0,
      levelrequired: 1,
      path,
      category: 'default',
    }
  }

  if ((SHOP_AVATARS as string[]).includes(id)) {
    return {
      ...shopItem!,
      category: 'shop',
    }
  }

  const premiumSub = Object.entries(PREMIUM_AVATARS).find(([_, ids]) => ids.includes(id as AvatarID))
  if (premiumSub) {
    return {
      ...shopItem!,
      category: 'premium',
      subcategory: premiumSub[0] as keyof typeof PREMIUM_AVATARS,
    }
  }

  const storySub = Object.entries(STORY_AVATARS).find(([_, ids]) => ids.includes(id as AvatarID))
  if (storySub) {
    return {
      id,
      title: capitalize(id),
      type: 'avatar',
      rarity: 'common',
      price: 0,
      levelrequired: 1,
      path,
      category: 'story',
      subcategory: storySub[0] as keyof typeof STORY_AVATARS,
    }
  }

  throw new Error(`Unknown avatar id "${id}" not found in any category`)
})

export function getAvatarIds(): AvatarID[] {
  return Object.keys(AVATAR_PATHS) as AvatarID[]
}

export function isAvatarId(id: string): id is AvatarID {
  return typeof id === 'string' && id in AVATAR_PATHS
}

export function isAvatarArray(arr: unknown): arr is AvatarID[] {
  return Array.isArray(arr) && arr.every(isAvatarId)
}
