import type { AvatarID } from '~/components/tasks/data/avatarData'
import type { BannerID } from '~/components/tasks/data/bannerData'
import type { ThemeID } from '~/components/tasks/data/themeData'
import type { PlayerProgress } from '~/types/player'
import type { Quest } from '~/types/quest'
import type { ShopItem } from '~/types/shop'

import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { AVATAR_PATHS, isAvatarId } from '~/components/tasks/data/avatarData'
import { isBannerId } from '~/components/tasks/data/bannerData'
import { isThemeId } from '~/components/tasks/data/themeData'
import { useFirebase } from '~/server/utils/firebase'
import { DEFAULT_PLAYER_PROGRESS } from '~/types/player'

export const usePlayerStore = defineStore('player', {
  state: (): PlayerProgress => ({
    ...DEFAULT_PLAYER_PROGRESS,
  }),

  actions: {
    async fetchPlayerData(): Promise<void> {
      const { auth, db } = useFirebase()
      const currentUser = auth.currentUser
      if (!currentUser)
        return

      // Fetch player data from Firestore
      try {
        const docRef = doc(db, 'players', currentUser.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()

          // Avatars
          // Process unlocked avatars with type safety
          const incomingAvatars = (data?.unlockedAvatars || [])
            .filter((avatar: string): avatar is AvatarID => isAvatarId(avatar))

          // Ensure default avatars are always included
          const processedAvatars = Array.from(
            new Set([...incomingAvatars, 'red', 'blue', 'green']),
          )

          // Validate selected avatar
          const selectedAvatar = isAvatarId(data?.selectedAvatar)
            ? data.selectedAvatar
            : 'red'

          // Banners
          const incomingBanners = (data?.unlockedBanners || [])
            .filter((banner: string): banner is BannerID => isBannerId(banner))

          const processedBanners = Array.from(
            new Set([...incomingBanners, 'none']),
          )

          const selectedBanner = isBannerId(data?.selectedBanner)
            ? data.selectedBanner
            : 'none'

          // Themes
          const incomingThemes = (data?.unlockedThemes || [])
            .filter((theme: string): theme is ThemeID => isThemeId(theme))

          const processedThemes = Array.from(
            new Set([...incomingThemes, 'zinc']),
          )

          const selectedTheme = isThemeId(data?.selectedTheme)
            ? data.selectedTheme
            : 'zinc'

          this.$patch({
            ...data,
            unlockedAvatars: processedAvatars,
            unlockedBanners: processedBanners,
            unlockedThemes: processedThemes,
            selectedAvatar,
            selectedBanner,
            selectedTheme,
          })
        }
      }
      catch (error) {
        console.error('Error fetching player data:', error)
      }
    },

    async savePlayerData(): Promise<void> {
      const { auth, db } = useFirebase()
      const currentUser = auth.currentUser
      if (!currentUser)
        return

      try {
        await setDoc(
          doc(db, 'players', currentUser.uid),
          {
            ...this.$state,
            lastUpdated: new Date(),
          },
          { merge: true },
        )
      }
      catch (error) {
        console.error('Error saving player data:', error)
      }
    },

    // Clear player data
    async clearPlayerData(): Promise<void> {
      const { auth, db } = useFirebase()
      const currentUser = auth.currentUser
      if (!currentUser)
        return
      try {
        await setDoc(
          doc(db, 'players', currentUser.uid),
          {
            ...DEFAULT_PLAYER_PROGRESS,
          },
          { merge: true },
        )
        this.$patch({
          ...DEFAULT_PLAYER_PROGRESS,
        })
      }
      catch (error) {
        console.error('Error clearing player store data:', error)
      }
    },

    // Avatars
    unlockAvatar(avatarId: AvatarID): void {
      // Check if the avatarId is valid
      if (!this.unlockedAvatars.includes(avatarId)) {
        this.unlockedAvatars.push(avatarId)
        this.savePlayerData()
      }
    },

    setAvatar(avatarId: AvatarID): void {
      if (this.unlockedAvatars.includes(avatarId)) {
        this.selectedAvatar = avatarId
        this.savePlayerData()
      }
    },

    // Banners
    unlockBanner(bannerId: BannerID): void {
      if (!this.unlockedBanners.includes(bannerId)) {
        this.unlockedBanners.push(bannerId)
        this.savePlayerData()
      }
    },

    setBanner(bannerId: BannerID): void {
      if (this.unlockedBanners.includes(bannerId)) {
        this.selectedBanner = bannerId
        this.savePlayerData()
      }
    },

    // Themes
    unlockTheme(themeId: ThemeID): void {
      if (!this.unlockedThemes.includes(themeId)) {
        this.unlockedThemes.push(themeId)
        this.savePlayerData()
      }
    },

    setTheme(themeId: ThemeID): void {
      if (this.unlockedThemes.includes(themeId)) {
        this.selectedTheme = themeId
        this.savePlayerData()
      }
    },

    // Quests
    completeQuest(questId: Quest): void {
      if (!this.completedQuests.includes(questId)) {
        this.completedQuests.push(questId)
        this.savePlayerData()
      }
    },

    // Shop
    purchaseItem(itemId: ShopItem): void {
      if (!this.purchasedItems.includes(itemId)) {
        this.purchasedItems.push(itemId)
        this.savePlayerData()
      }
    },
  },
  getters: {
    hasCompletedQuest: state => (questId: Quest) =>
      state.completedQuests.includes(questId),

    hasPurchasedItem: state => (itemId: ShopItem) =>
      state.purchasedItems.includes(itemId),

    currentAvatarPath: state =>
      AVATAR_PATHS[state.selectedAvatar] || AVATAR_PATHS.red,

    unlockedAvatarPaths: state =>
      state.unlockedAvatars.map(id => AVATAR_PATHS[id]),

    hasAvatar: state => (avatarId: AvatarID) =>
      state.unlockedAvatars.includes(avatarId),
  },
})
