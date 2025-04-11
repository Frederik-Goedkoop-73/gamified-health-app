// ~/types/player.d.ts
import type { Timestamp } from 'firebase/firestore'

export type BadgeID = string
export type QuestID = string
export type ShopItemID = string

export type AvatarID = 'default' | 'avatar1' | 'avatar2' | 'avatar3' // etc.
export interface SpritePosition {
  x: number
  y: number
}

export const AVATAR_SPRITES: Record<AvatarID, SpritePosition> = {
  default: { x: 0, y: 0 },
  avatar1: { x: 1, y: 0 },
  avatar2: { x: 2, y: 0 },
  avatar3: { x: 3, y: 0 },
  // Add more avatars as needed
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
