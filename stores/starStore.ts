import type { User } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useFirebase } from '~/server/utils/firebase'

// Type definition
interface StarState {
  stars: number
}

export const useStarStore = defineStore('stars', {
  state: (): StarState => ({
    stars: 0,
  }),

  actions: {
    async fetchStars(): Promise<void> {
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
            this.stars = data.stars ?? 0
          }
        }
        catch (error: unknown) {
          console.error('Error fetching stars:', error)
        }
      }
    },

    async addStars(badgeStars: number): Promise<void> {
      this.stars += badgeStars // Update local state

      await this.saveStarsToFirestore() // Save to Firestore
    },

    async resetStars(): Promise<void> {
      this.stars = 0 // Reset local state
      await this.saveStarsToFirestore() // Save to Firestore
    },

    async saveStarsToFirestore(): Promise<void> {
      try {
        const { auth, db } = useFirebase()
        const currentUser = auth.currentUser

        // Proper null check
        if (!currentUser) {
          console.warn('No authenticated user found - skipping stars save')
          return // No user logged in -> no function run
        }

        await setDoc(
          doc(db, 'users', currentUser.uid),
          {
            stars: this.stars,
          },
          { merge: true },
        )
      } // Merge with existing document data
      catch (error: unknown) {
        console.error('Error saving stars to Firestore:', error)
      }
    },
  },
})
