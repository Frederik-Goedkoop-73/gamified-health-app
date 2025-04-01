// ~/types/player.d.ts
import type { Timestamp } from 'firebase/firestore'

export type BadgeID = string
export type QuestID = string
export type ShopItemID = string

export interface PlayerProgress {
  unlockedBadges: BadgeID[]
  completedQuests: QuestID[]
  purchasedItems: ShopItemID[]
  selectedAvatar: string
  selectedTheme: string
  lastUpdated?: Timestamp
}
