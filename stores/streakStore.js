import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

export const useStreakStore = defineStore('streak', {
  state: () => ({
    streak: 0, // Local streak balance
  }),
  actions: {
    // Fetch streak from Firestore for the current user
    async fetchStreak() {
      const auth = getAuth()
      const user = auth.currentUser

      if (user) {
        const db = getFirestore()
        const userDocRef = doc(db, 'users', user.uid)

        try {
          const docSnap = await getDoc(userDocRef)
          if (docSnap.exists()) {
            this.streak = docSnap.data().streak || 0 // Update local state with Firestore data
          }
          else {
            this.streak = 0 // Default to 0 if no document exists
          }
        }
        catch (error) {
          console.error('Error fetching streak:', error)
        }
      }
    },

    // Add streak and update Firestore
    async addStreak(streakAmount) {
      this.streak += streakAmount // Update local state
      await this.saveStreakToFirestore() // Save to Firestore
    },

    // Reset s treak and update Firestore
    async resetStreak() {
      this.streak = 0 // Reset local state
      await this.saveStreakToFirestore() // Save to Firestore
    },

    // Save the current Streak balance to Firestore
    async saveStreakToFirestore() {
      const auth = getAuth()
      const user = auth.currentUser

      if (user) {
        const db = getFirestore()
        const userDocRef = doc(db, 'users', user.uid)

        try {
          await setDoc(userDocRef, {
            streak: this.streak, // Save the current streak balance
          }, { merge: true }) // Merge with existing document data
        }
        catch (error) {
          console.error('Error saving Streak to Firestore:', error)
        }
      }
    },
  },
})
