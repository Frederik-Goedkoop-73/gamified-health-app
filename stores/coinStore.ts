import type { User } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'

// Type definition
interface CoinState {
  coins: number
}

export const useCoinStore = defineStore('coins', {
  state: (): CoinState => ({
    coins: 0, // Local coin balance
  }),

  actions: {
    // Fetch coins from Firestore for the current user
    async fetchCoins() {
      const auth = getAuth()
      const user: User | null = auth.currentUser

      if (user) {
        const db = getFirestore()
        const userDocRef = doc(db, 'users', user.uid)

        try {
          const docSnap = await getDoc(userDocRef)
          if (docSnap.exists()) {
            this.coins = docSnap.data().coins ?? 0 // Again using nullish coalescing
          }
          else {
            this.coins = 0 // Default to 0 if no document exists
          }
        }
        catch (error: unknown) {
          console.error('Error fetching coins:', error)
        }
      }
    },

    // Add coins and update Firestore
    async addCoins(coinAmount: number): Promise<void> {
      this.coins += coinAmount // Update local state
      await this.saveCoinsToFirestore() // Save to Firestore
    },

    // Reset coins and update Firestore
    async resetCoins(): Promise<void> {
      this.coins = 0 // Reset local state
      await this.saveCoinsToFirestore() // Save to Firestore
    },

    // Save the current coin balance to Firestore
    async saveCoinsToFirestore(): Promise<void> {
      const auth = getAuth()
      const user: User | null = auth.currentUser

      if (user) {
        const db = getFirestore()
        const userDocRef = doc(db, 'users', user.uid)

        try {
          await setDoc(userDocRef, {
            coins: this.coins, // Save the current coin balance
          }, { merge: true })
          // Merge with existing document data
        }
        catch (error) {
          console.error('Error saving coins to Firestore:', error)
        }
      }
    },
  },
})
