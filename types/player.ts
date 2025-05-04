// ~/types/player
import type { Timestamp } from 'firebase/firestore'
import type { AvatarID } from '~/components/tasks/data/avatarData'
import type { Quest } from '~/types/quest'
import type { shopItem } from '~/types/shop'

// Default player progress configuration object
export const DEFAULT_PLAYER_PROGRESS: PlayerProgress = {
  unlockedBadges: [],
  completedQuests: [],
  purchasedItems: [],
  unlockedAvatars: ['red', 'blue', 'green'],
  selectedAvatar: 'red',
  selectedTheme: 'light',
}

export interface PlayerProgress {
  unlockedBadges: BadgeID[]
  completedQuests: Quest[]
  purchasedItems: shopItem[]
  selectedTheme: string
  lastUpdated?: Timestamp // Moved to userStore to track logins

  unlockedAvatars: AvatarID[]
  selectedAvatar: AvatarID
}
