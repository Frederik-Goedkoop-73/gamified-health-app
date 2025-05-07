// ~/types/player
import type { Timestamp } from 'firebase/firestore'
import type { AvatarID } from '~/components/tasks/data/avatarData'
import type { BannerID } from '~/components/tasks/data/bannerData'
import type { ThemeID } from '~/components/tasks/data/themeData'
import type { Quest } from '~/types/quest'
import type { ShopItem } from '~/types/shop'

// Default player progress configuration object
export const DEFAULT_PLAYER_PROGRESS: PlayerProgress = {
  unlockedBadges: [],
  completedQuests: [],
  purchasedItems: [],

  unlockedAvatars: ['red', 'blue', 'green'],
  unlockedBanners: ['none'],
  unlockedThemes: ['zinc'],

  selectedAvatar: 'red',
  selectedBanner: 'none',
  selectedTheme: 'zinc',
}

export interface PlayerProgress {
  unlockedBadges: BadgeID[]
  completedQuests: Quest[]
  purchasedItems: ShopItem[]
  lastUpdated?: Timestamp // Moved to userStore to track logins

  unlockedAvatars: AvatarID[]
  unlockedBanners: BannerID[]
  unlockedThemes: ThemeID[]

  selectedAvatar: AvatarID
  selectedBanner: BannerID
  selectedTheme: ThemeID
}
