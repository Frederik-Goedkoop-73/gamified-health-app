// This store manages !static! user data and interactions with Firebase
// Don't use this store for dynamic data (like XP, streak, etc.)

import type { UserData } from '~/types/auth'
import { doc, getDoc } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useFirebase } from '~/server/utils/firebase' // This composable allows you to access Firebase services

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
          const data = docSnap.data() as UserData

          // Only keep profile-related fields
          this.data = {
            uid: data.uid,
            email: data.email,
            username: data.username,
            photoURL: data.photoURL,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            lastLoginDate: data.lastLoginDate,
            profileComplete: data.profileComplete,
          }
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
    profileComplete: state => state.data?.profileComplete || '',
  },
})
