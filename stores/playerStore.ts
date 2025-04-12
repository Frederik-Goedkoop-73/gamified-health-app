import type { AvatarID, PlayerProgress } from '~/types/player'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useFirebase } from '~/server/utils/firebase'
import { AVATAR_PATHS, DEFAULT_PLAYER_PROGRESS, isAvatarId } from '~/types/player'

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

          this.$patch({
            ...data,
            unlockedAvatars: processedAvatars,
            selectedAvatar,
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

    // Badges
    unlockBadge(badgeId: BadgeID): void {
      if (!this.unlockedBadges.includes(badgeId)) {
        this.unlockedBadges.push(badgeId)
        this.savePlayerData()
      }
    },

    // Quests
    completeQuest(questId: QuestID): void {
      if (!this.completedQuests.includes(questId)) {
        this.completedQuests.push(questId)
        this.savePlayerData()
      }
    },

    // Shop
    purchaseItem(itemId: ShopItemID): void {
      if (!this.purchasedItems.includes(itemId)) {
        this.purchasedItems.push(itemId)
        this.savePlayerData()
      }
    },

    setTheme(themeId: string): void {
      this.selectedTheme = themeId
      this.savePlayerData()
    },
  },

  getters: {
    hasBadge: state => (badgeId: BadgeID) =>
      state.unlockedBadges.includes(badgeId),

    hasCompletedQuest: state => (questId: QuestID) =>
      state.completedQuests.includes(questId),

    hasPurchasedItem: state => (itemId: ShopItemID) =>
      state.purchasedItems.includes(itemId),

    currentAvatarPath: state =>
      AVATAR_PATHS[state.selectedAvatar] || AVATAR_PATHS.red,

    unlockedAvatarPaths: state =>
      state.unlockedAvatars.map(id => AVATAR_PATHS[id]),

    hasAvatar: state => (avatarId: AvatarID) =>
      state.unlockedAvatars.includes(avatarId),
  },
})
