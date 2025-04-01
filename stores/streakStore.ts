import type { User } from 'firebase/auth'
import type { Timestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

// Type definition
interface StreakState {
  streak: number
  lastLoginDate: Date | null
}

export const useStreakStore = defineStore('streak', {
  state: (): StreakState => ({
    streak: 0, // Local streak balance
    lastLoginDate: null,
  }),
  actions: {
    // Fetch streak from Firestore for the current user
    async fetchStreak(): Promise<void> {
      const auth = getAuth()
      const user: User | null = auth.currentUser

      if (user) {
        const db = getFirestore()
        const userDocRef = doc(db, 'users', user.uid)

        try {
          const docSnap = await getDoc(userDocRef)
          if (docSnap.exists()) {
            const data = docSnap.data()
            this.streak = data.streak ?? 0 // Update local state with Firestore data, ?? instead of || because only want to return 0 for undefined or null
            this.lastLoginDate = (data.lastLoginDate as Timestamp)?.toDate() ?? null
          }
          else {
            await this.resetStreak()
          }
        }
        catch (error: unknown) {
          console.error('Error fetching streak:', error)
        }
      }
    },

    // Update streak
    async checkAndUpdateStreak(): Promise<void> {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      if (!this.lastLoginDate) {
        // First time login
        await this.addStreak(1)
      }
      else {
        const lastLogin = new Date(this.lastLoginDate)
        lastLogin.setHours(0, 0, 0, 0)

        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        if (lastLogin.getTime() === yesterday.getTime()) {
          // Logged in consecutive days
          await this.addStreak(1)
        }
        else if (lastLogin.getTime() < yesterday.getTime()) {
          // Missed a day - reset streak
          await this.resetStreak()
        }
        // Else: already logged in today - no change
      }
    },

    // Add streak and update Firestore
    async addStreak(streakAmount: number): Promise<void> {
      this.streak += streakAmount // Update local state
      await this.saveStreakToFirestore() // Save to Firestore
    },

    // Reset s treak and update Firestore
    async resetStreak(): Promise<void> {
      this.streak = 0 // Reset local state
      await this.saveStreakToFirestore() // Save to Firestore
    },

    // Save the current Streak balance to Firestore
    async saveStreakToFirestore(): Promise<void> {
      const auth = getAuth()
      const user: User | null = auth.currentUser

      if (user) {
        const db = getFirestore()
        const userDocRef = doc(db, 'users', user.uid)

        try {
          await setDoc(
            userDocRef,
            {
              streak: this.streak, // Save the current streak balance
              lastLoginDate: this.lastLoginDate,
            },
            { merge: true },
          ) // Merge with existing document data
        }
        catch (error: unknown) {
          console.error('Error saving Streak to Firestore:', error)
        }
      }
    },
  },
})
