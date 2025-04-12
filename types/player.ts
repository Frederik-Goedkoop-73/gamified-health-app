// ~/types/player
import type { Timestamp } from 'firebase/firestore'

export type BadgeID = string
export type QuestID = string
export type ShopItemID = string

// Complete list of all available avatars
export type AvatarID =
  | 'red' // Default avatars
  | 'blue' // Default avatars
  | 'green' // Default avatars
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

// Default player progress configuration object
export const DEFAULT_PLAYER_PROGRESS: PlayerProgress = {
  unlockedBadges: [],
  completedQuests: [],
  purchasedItems: [],
  unlockedAvatars: ['red', 'blue', 'green'],
  selectedAvatar: 'red',
  selectedTheme: 'light',
}

// Mapping of all avatar IDs to their image paths
export const AVATAR_PATHS: Record<AvatarID, string> = {
  // Default avatars
  red: '/avatars/red.png',
  blue: '/avatars/blue.png',
  green: '/avatars/green.png',

  // Special avatars
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
} as const

// This function returns an array of AvatarID strings based on the keys of the AVATAR_SPRITES object.
export function getAvatarIds(): AvatarID[] {
  return Object.keys(AVATAR_PATHS) as AvatarID[]
}

// This function checks if a given string is a valid AvatarID by checking if it exists in the AVATAR_SPRITES object.
export function isAvatarId(id: string): id is AvatarID {
  return typeof id === 'string' && id in AVATAR_PATHS
}

// This function checks if a given value is an array of AvatarID strings.
export function isAvatarArray(arr: unknown): arr is AvatarID[] {
  return Array.isArray(arr) && arr.every(isAvatarId)
}

export interface PlayerProgress {
  unlockedBadges: BadgeID[]
  completedQuests: QuestID[]
  purchasedItems: ShopItemID[]
  selectedTheme: string
  lastUpdated?: Timestamp // Moved to userStore to track logins

  unlockedAvatars: AvatarID[]
  selectedAvatar: AvatarID
}
