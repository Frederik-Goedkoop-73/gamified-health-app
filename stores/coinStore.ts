import type { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useFirebase } from '~/server/utils/firebase'

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
    async fetchCoins(): Promise<void> {
      const { auth, db } = useFirebase()
      const currentUser: User | null = auth.currentUser

      if (!currentUser) {
        console.warn('No user logged in, cannot fetch coins.')
        return // No user logged in -> no function run
      }

      try {
        const userDocRef = doc(db, 'users', currentUser.uid)
        const docSnap = await getDoc(userDocRef)
        this.coins = docSnap.exists() ? docSnap.data().coins ?? 0 : 0 // Using nullish coalescing to set default value
      }
      catch (error: unknown) {
        console.error('Error fetching coins:', error)
        throw error
      }
    },

    // Add coins and update Firestore
    async addCoins(coinAmount: number): Promise<void> {
      const { auth, db } = useFirebase()
      const currentUser: User | null = auth.currentUser

      if (!currentUser) {
        console.warn('No user logged in, cannot add coins.')
        return // No user logged in -> no function run
      }

      const newBalance = this.coins + coinAmount // Calculate new balance

      try {
        await setDoc(
          doc(db, 'users', currentUser.uid),
          {
            coins: newBalance, // Update Firestore with new balance
          },
          { merge: true },
        )
        this.coins = newBalance // Update local state
      }
      catch (error: unknown) {
        console.error('Error adding coins:', error)
        throw error
      }
    },

    // Deduct coins and update Firestore
    async deductCoins(coinAmount: number): Promise<boolean> {
      if (this.coins < coinAmount)
        return false // Not enough coins

      try {
        await this.addCoins(-coinAmount) // Deduct coins using addCoins method
        return true // Deduction successful
      }
      catch (error: unknown) {
        console.error('Error deducting coins:', error)
        return false // Deduction failed
      }
    },

    // Reset coins and update Firestore
    async resetCoins(): Promise<void> {
      const { auth, db } = useFirebase()
      const currentUser: User | null = auth.currentUser

      if (!currentUser) {
        console.warn('No user logged in, cannot reset coins.')
        return // No user logged in -> no function run
      }

      try {
        await setDoc(
          doc(db, 'users', currentUser.uid),
          {
            coins: 0, // Reset coins in Firestore
          },
          { merge: true },
        )
        this.coins = 0 // Reset local state
      }
      catch (error: unknown) {
        console.error('Error resetting coins:', error)
        throw error
      }
    },
  },

  getters: {
    canAfford: (state) => {
      return (amount: number) => state.coins >= amount // Check if user can afford the item
    },
  },
})
