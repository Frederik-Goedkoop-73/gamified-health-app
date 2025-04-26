import type { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useFirebase } from '~/server/utils/firebase'

// Type definition
interface XPState {
  xp: number
  totalXP: number
  level: number
  showPopup: boolean
  leveledUpTo: number
  hasAwarded1000XP: boolean
}

export const useXPStore = defineStore('xp', {
  state: (): XPState => ({
    xp: 0, // Initial XP state
    totalXP: 0, // Total XP earned by the user
    level: 1, // Initial level
    showPopup: false, // Initial visibility of the level-up popup
    leveledUpTo: 0, // Initial level the user leveled up to in one go

    hasAwarded1000XP: false, // Track if 200 XP has been awarded for reaching 1000 XP
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
            this.xp = data.xp ?? 0// Update local state with Firestore data
            this.totalXP = data.totalXP ?? 0 // Update local state with Firestore data
            this.level = data.level ?? 1 // Update local state with Firestore data
            this.hasAwarded1000XP = data.hasAwarded1000XP ?? false // Update local state with Firestore data
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

      // Special 1000 XP bonus (only once)
      if (this.totalXP >= 1000 && !this.hasAwarded1000XP) {
        const bonus = 200
        this.xp += bonus // Add 200 XP
        this.totalXP += bonus // Add 200 XP to totalXP
        this.hasAwarded1000XP = true // Mark as awarded
      }

      this.updateLevel() // Update level based on new XP

      // Save to Firestore
      try {
        await setDoc(
          doc(db, 'users', currentUser.uid),
          {
            xp: this.xp, // Save the current XP
            totalXP: this.totalXP, // Save the total XP
            level: this.level, // Save the current level
            hasAwarded1000XP: this.hasAwarded1000XP, // Save the awarded status
          },
          { merge: true },
        )
      }
      catch (error: unknown) {
        console.error('Error saving XP and level to Firestore:', error)

        // Revert local changes if save fails
        this.xp -= xpAmount // Revert XP
        this.totalXP -= xpAmount // Revert total XP
        if (this.totalXP >= 1000 && this.hasAwarded1000XP) {
          const bonus = 200
          this.xp -= bonus // Revert 200 XP
          this.totalXP -= bonus // Revert 200 XP from totalXP
          this.hasAwarded1000XP = false // Mark as not awarded
        }
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
            hasAwarded1000XP: false, // Reset awarded status
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
      if (this.xp <= 0)
        return // Early exit if XP is 0, so that xp isn't set to 0 on login

      let levelsGained = 0
      let remainingXP = this.xp

      // Process all possible level-ups
      while (remainingXP >= this.totalXpNeededForNextLevel) {
        remainingXP -= this.totalXpNeededForNextLevel // Subtract XP needed for level-up
        levelsGained++ // Increase level count
        this.level++ // Increase level
      }

      // Update state onlt if we leveled up
      if (levelsGained > 0) {
        this.xp = remainingXP // Update XP after level-ups
        this.leveledUpTo = this.level // Track the current level-up
        this.showPopup = true // Show level-up popup
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
      return this.level * 10
    },
    xpProgress(): number {
      // Handle edge cases
      if (this.level < 1)
        return 0
      if (this.xp <= 0)
        return 0

      // Calculate progress to next level
      const progress = (this.xp / this.totalXpNeededForNextLevel) * 100

      // Clamp between 0-100%
      return Math.min(100, Math.max(0, progress))
    },
  },
})
