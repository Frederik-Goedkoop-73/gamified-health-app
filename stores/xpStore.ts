import type { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useFirebase } from '~/server/utils/firebase'

// XP calculation functions
function getXPForLevel(level: number): number {
  return Math.ceil(0.50025 * level ** 2 - 1.94125 * level + 7.7007)
}

function getXPProgress(currentXP: number): {
  level: number
  currentLevelXP: number
  xpNeeded: number
  progressPercent: number
} {
  let level = 1
  let totalXP = 0

  while (currentXP >= totalXP + getXPForLevel(level)) {
    totalXP += getXPForLevel(level)
    level++
  }

  const currentLevelXP = currentXP - totalXP
  const xpNeeded = getXPForLevel(level)
  const progressPercent = Math.min(100, (currentLevelXP / xpNeeded) * 100)

  return { level, currentLevelXP, xpNeeded, progressPercent }
}

// Type definition
interface XPState {
  xp: number
  totalXP: number
  level: number
  showPopup: boolean
  leveledUpTo: number
}

export const useXPStore = defineStore('xp', {
  state: (): XPState => ({
    xp: 0, // Initial XP state
    totalXP: 0, // Total XP earned by the user
    level: 1, // Initial level
    showPopup: false, // Initial visibility of the level-up popup
    leveledUpTo: 0, // Initial level the user leveled up to in one go
  }),

  actions: {
    // Fetch XP and level from Firestore for the current user
    async fetchXP(): Promise<void> {
      const { auth, db } = useFirebase()
      const currentUser: User | null = auth.currentUser

      if (!currentUser) {
        console.warn('No user logged in, cannot fetch XP.')
        return // No user logged in -> no function run
      }

      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid)

        try {
          const docSnap = await getDoc(userDocRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            this.totalXP = data.totalXP ?? 0
            const progress = getXPProgress(this.totalXP)
            this.level = progress.level
            this.xp = progress.currentLevelXP
          }
          else {
            this.resetXP()
          }
        }
        catch (error: unknown) {
          console.error('Error fetching XP:', error)
        }
      }
    },

    // Add XP and update Firestore
    async addXP(xpAmount: number): Promise<void> {
      const { auth, db } = useFirebase()
      const currentUser: User | null = auth.currentUser

      if (!currentUser) {
        console.warn('No user logged in, cannot add XP.')
        return // No user logged in -> no function run
      }

      // Update local state
      this.xp += xpAmount
      this.totalXP += xpAmount

      this.updateLevel() // Update level based on new XP

      // Save to Firestore
      try {
        await setDoc(
          doc(db, 'users', currentUser.uid),
          {
            xp: this.xp, // Save the current XP
            totalXP: this.totalXP, // Save the total XP
            level: this.level, // Save the current level
          },
          { merge: true },
        )
      }
      catch (error: unknown) {
        console.error('Error saving XP and level to Firestore:', error)

        // Revert local changes if save fails
        this.xp -= xpAmount // Revert XP
        this.totalXP -= xpAmount // Revert total XP
        throw error
      }
    },

    // Reset XP and update Firestore
    async resetXP(): Promise<void> {
      const { auth, db } = useFirebase()
      const currentUser: User | null = auth.currentUser

      if (!currentUser) {
        console.warn('No user logged in, cannot reset XP.')
        return // No user logged in -> no function run
      }

      try {
        await setDoc(
          doc(db, 'users', currentUser.uid),
          {
            xp: 0, // Reset XP
            totalXP: 0, // Reset total XP
            level: 1, // Reset level
          },
          { merge: true },
        )
        this.$reset() // Reset local state after succesful save
      }
      catch (error: unknown) {
        console.error('Error resetting XP:', error)
        throw error
      }
    },

    // Update the player's level based on XP
    updateLevel(): void {
      if (this.totalXP <= 0)
        return

      const progress = getXPProgress(this.totalXP)
      const leveledUp = progress.level > this.level

      this.level = progress.level
      this.xp = progress.currentLevelXP

      if (leveledUp) {
        this.leveledUpTo = this.level
        this.showPopup = true
      }
    },

    // Close the level-up popup
    closePopup(): void {
      this.showPopup = false
      this.leveledUpTo = 0 // Reset this to ensure next level up triggers properly
    },
  },

  getters: {
    getTotalXP(): number {
      return this.totalXP
    },
    totalXpNeededForNextLevel(): number {
      return getXPForLevel(this.level)
    },
    xpProgress(): number {
      // Handle edge cases
      if (this.level < 1)
        return 0
      if (this.xp <= 0)
        return 0

      // Calculate progress to next level
      const xpNeeded = getXPForLevel(this.level)
      const progress = (this.xp / xpNeeded) * 100

      // Clamp between 0-100%
      return Math.min(100, Math.max(0, progress))
    },
  },
})
