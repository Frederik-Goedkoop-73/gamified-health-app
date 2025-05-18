import type { User } from 'firebase/auth'
import type { Timestamp } from 'firebase/firestore'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useFirebase } from '~/server/utils/firebase'

// Type definition
interface StreakState {
  streak: number
  maxStreak: number
  lastLoginDate: Date | null
}

export const useStreakStore = defineStore('streak', {
  state: (): StreakState => ({
    streak: 0, // Local streak balance
    maxStreak: 0, // Local max streak balance
    lastLoginDate: null,
  }),

  actions: {
    // Fetch streak from Firestore for the current user
    async fetchStreak(): Promise<void> {
      const { auth, db } = useFirebase()
      const user: User | null = auth.currentUser
      if (!user)
        return // No user logged in -> no function run

      if (user) {
        const userDocRef = doc(db, 'users', user.uid)

        try {
          const docSnap = await getDoc(userDocRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            this.streak = data.streak ?? 0 // Update local state with Firestore data, ?? instead of || because only want to return 0 for undefined or null
            this.maxStreak = data.maxStreak ?? 0 // Update local state with Firestore data
            this.lastLoginDate = (data.lastLoginDate as Timestamp)?.toDate() ?? null
          }
        }
        catch (error: unknown) {
          console.error('Error fetching streak:', error)
        }
      }
    },

    // Update streak
    async checkAndUpdateStreak(): Promise<void> {
      const { auth } = useFirebase()
      const currentUser = auth.currentUser

      if (!currentUser) {
        return
      }
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      // Use nullish coalescing for safer defaults
      const lastLogin = this.lastLoginDate ?? new Date(0)

      // Convert to dates at midnight for accurate comparison
      const lastMidnight = new Date(lastLogin)
      lastMidnight.setHours(0, 0, 0, 0)

      const yesterday = new Date(today)
      yesterday.setDate(yesterday.getDate() - 1)

      if (!this.lastLoginDate) {
        await this.addStreak(1)
      }
      else if (lastMidnight.getTime() === yesterday.getTime()) {
        await this.addStreak(1)
      }
      else if (lastMidnight.getTime() < yesterday.getTime()) {
        await this.resetStreak()
      }
      // Else: already logged in today
    },

    // Add streak and update Firestore
    async addStreak(streakAmount: number): Promise<void> {
      this.streak += streakAmount // Update local state

      if (this.streak > this.maxStreak) {
        this.maxStreak = this.streak // Update maxStreak if current streak is greater
      }

      await this.saveStreakToFirestore() // Save to Firestore
    },

    // Reset s treak and update Firestore
    async resetStreak(): Promise<void> {
      this.streak = 0 // Reset local state
      await this.saveStreakToFirestore() // Save to Firestore
    },

    // Save the current Streak balance to Firestore
    async saveStreakToFirestore(): Promise<void> {
      try {
        const { auth, db } = useFirebase()
        const currentUser = auth.currentUser

        // Proper null check
        if (!currentUser) {
          console.warn('No authenticated user found - skipping streak save')
          return // No user logged in -> no function run
        }

        await setDoc(
          doc(db, 'users', currentUser.uid),
          {
            streak: this.streak, // Save the current streak balance
            maxStreak: this.maxStreak, // Save the current max streak balance
            lastLoginDate: new Date(), // Always update lastLoginDate to now
          },
          { merge: true },
        )
      } // Merge with existing document data
      catch (error: unknown) {
        console.error('Error saving Streak to Firestore:', error)
      }
    },
  },
})
