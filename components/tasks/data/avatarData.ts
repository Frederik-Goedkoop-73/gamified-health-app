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

export function getAvatarIds(): AvatarID[] {
  return Object.keys(AVATAR_PATHS) as AvatarID[]
}

export function isAvatarId(id: string): id is AvatarID {
  return typeof id === 'string' && id in AVATAR_PATHS
}

export function isAvatarArray(arr: unknown): arr is AvatarID[] {
  return Array.isArray(arr) && arr.every(isAvatarId)
}
