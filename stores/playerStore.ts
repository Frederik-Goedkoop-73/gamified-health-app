import type { PlayerProgress } from '~/types/player'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const usePlayerStore = defineStore('player', {
  state: (): PlayerProgress => ({
    unlockedBadges: [],
    completedQuests: [],
    purchasedItems: [],
    selectedAvatar: 'default',
    selectedTheme: 'light',
  }),

  actions: {
    async fetchPlayerData(): Promise<void> {
      const db = getFirestore()
      const user = getAuth().currentUser
      if (!user)
        return

      try {
        const docRef = doc(db, 'players', user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data() as PlayerProgress
          this.$patch(data)
        }
      }
      catch (error) {
        console.error('Error fetching player data:', error)
      }
    },

    async savePlayerData(): Promise<void> {
      const db = getFirestore()
      const user = getAuth().currentUser
      if (!user)
        return

      try {
        await setDoc(
          doc(db, 'players', user.uid),
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

    // Customization
    setAvatar(avatarId: string): void {
      this.selectedAvatar = avatarId
      this.savePlayerData()
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
  },
})
