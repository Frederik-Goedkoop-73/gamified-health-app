import type { UserData } from '~/types/auth'
import { doc, getDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useFirebase } from '~/composables/useFirebase'

export const useUserStore = defineStore('user', {
  state: () => ({
    data: null as UserData | null,
    loading: false,
  }),

  actions: {
    async fetchUser(uid: string): Promise<void> {
      const { db } = useFirebase()
      this.loading = true
      try {
        const docRef = doc(db, 'users', uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          this.data = docSnap.data() as UserData
        }
        else {
          this.data = null
        }
      }
      finally {
        this.loading = false
      }
    },

    setUsername(username: string): void {
      if (this.data) {
        this.data.username = username
      }
    },

    clearUser(): void {
      this.data = null
    },
  },

  getters: {
    username: state => state.data?.username || '',
    email: state => state.data?.email || '',
    uid: state => state.data?.uid || '',
    photoURL: state => state.data?.photoURL || '',
    createdAt: state => state.data?.createdAt || '',
    updatedAt: state => state.data?.updatedAt || '',
    lastLoginDate: state => state.data?.lastLoginDate || '',
    xp: state => state.data?.xp || '',
    streak: state => state.data?.streak || '',
    coins: state => state.data?.coins || '',
    profileComplete: state => state.data?.profileComplete || '',
    // Add other getters as needed
  },
})
