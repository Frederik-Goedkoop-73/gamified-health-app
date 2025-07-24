import { browserLocalPersistence, setPersistence } from 'firebase/auth'
import { initFirebase } from '~/server/utils/firebase'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Only initialize on client side
  if (import.meta.client) {
    // 1. Initialize Firebase services
    const { auth } = initFirebase()

    // 2. Enable session persistence (critical for refresh)
    await setPersistence(auth, browserLocalPersistence)

    // 3. Make auth/db available app-wide
    nuxtApp.provide('auth', auth)
    nuxtApp.provide('db', initFirebase().db)
  }
})
