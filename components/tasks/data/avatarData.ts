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
  pacman: ['packman', 'orange_ghost', 'cyan_ghost', 'red_ghost', 'vulnerable_ghost'] as AvatarID[],
  minecraft: ['steven', 'axel', 'crieper', 'skeleton', 'urbanite'] as AvatarID[],
  mario: ['lario', 'muigi', 'plum', 'joshi', 'tode'] as AvatarID[],
  sonic: ['sunic', 'tail', 'aimy', 'nukkels', 'super_sunic'] as AvatarID[],
  adventureTime: ['fill', 'jack', 'princess_chewingum', 'GMO', 'chunky_space_princess'] as AvatarID[],
  mobs: [
    'cow',
    'sheep',
    'pig',
    'zombee',
    'endman',
    'goonba',
    'boser',
    'smeggman',
    'silhouette',
    'snow_king',
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

export const PROFILE_AVATARS: ProfileAvatarItem[] = [
  // Default
  ...DEFAULT_AVATARS.map(id => ({
    id,
    title: id.charAt(0).toUpperCase() + id.slice(1),
    type: 'avatar',
    rarity: 'common',
    price: 0,
    levelrequired: 1,
    path: AVATAR_PATHS[id],
    category: 'default',
  } as const)),

  // Shop
  ...shopAvatars.map(avatar => ({
    ...avatar,
    category: 'shop' as const,
  })),

  // Premium
  ...Object.entries(PREMIUM_AVATARS).flatMap(([subcategory, ids]) =>
    ids.map((id) => {
      const item = shopAvatars.find(a => a.id === id)
      if (!item)
        throw new Error(`Missing premium avatar in shopAvatars: ${id}`)
      return {
        ...item,
        category: 'premium' as const,
        subcategory: subcategory as keyof typeof PREMIUM_AVATARS,
      }
    }),
  ),

  // Story
  ...Object.entries(STORY_AVATARS).flatMap(([subcategory, ids]) =>
    ids.map(id => ({
      id,
      title: id.charAt(0).toUpperCase() + id.slice(1),
      type: 'avatar',
      rarity: 'common',
      price: 0,
      levelrequired: 1,
      path: AVATAR_PATHS[id],
      category: 'story',
      subcategory: subcategory as keyof typeof STORY_AVATARS,
    } as const)),
  ),
]

/* export const ALL_PREMIUM_AVATARS = Object.values(PREMIUM_AVATARS).flat()

export const ALL_STORY_AVATARS = Object.values(STORY_AVATARS).flat()

export const AVATAR_CATEGORIES = {
  default: DEFAULT_AVATARS,
  shop: SHOP_AVATARS,
  premium: PREMIUM_AVATARS,
  story: STORY_AVATARS,
} */

export function getAvatarIds(): AvatarID[] {
  return Object.keys(AVATAR_PATHS) as AvatarID[]
}

export function isAvatarId(id: string): id is AvatarID {
  return typeof id === 'string' && id in AVATAR_PATHS
}

export function isAvatarArray(arr: unknown): arr is AvatarID[] {
  return Array.isArray(arr) && arr.every(isAvatarId)
}
