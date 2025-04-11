import type { AvatarID, PlayerProgress } from '~/types/player'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useFirebase } from '~/server/utils/firebase'
import { AVATAR_SPRITES } from '~/types/player'

export const usePlayerStore = defineStore('player', {
  state: (): PlayerProgress => ({
    unlockedBadges: [],
    completedQuests: [],
    purchasedItems: [],
    unlockedAvatars: ['default'],
    selectedAvatar: 'default',
    selectedTheme: 'light',
  }),

  actions: {
    async fetchPlayerData(): Promise<void> {
      const { auth, db } = useFirebase()
      const currentUser = auth.currentUser
      if (!currentUser)
        return

      try {
        const docRef = doc(db, 'players', currentUser.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data() as PlayerProgress

          // Ensure default avatar is always unlocked
          this.$patch({
            ...data,
            unlockedAvatars: [...new Set([...data.unlockedAvatars ?? [], 'default'])],
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

    currentAvatarSprite(state): SpritePosition {
      return AVATAR_SPRITES[state.selectedAvatar] || AVATAR_SPRITES.default
    },

    hasAvatar: state => (avatarId: AvatarID) =>
      state.unlockedAvatars.includes(avatarId),
  },
})
