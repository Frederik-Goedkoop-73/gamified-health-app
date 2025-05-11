// ~/composables/useLogout.ts
import { useAuth } from '@/composables/UseAuth'
import { useFitbitCachedData } from '@/composables/useFitbitCachedData'
import { usePlayerStore } from '@/stores/playerStore'
import { useUserStore } from '@/stores/userStore'
import { useXPStore } from '@/stores/xpStore'
import { useRouter } from 'vue-router'

export function useLogout() {
  const router = useRouter()
  const userStore = useUserStore()
  const playerStore = usePlayerStore()
  const xpStore = useXPStore()
  const { handleSignOut } = useAuth()
  const { clearFitbitCache } = useFitbitCachedData()

  const logout = async () => {
    try {
      // Sign out from Firebase
      await handleSignOut()

      // Revoke Fitbit access token via server-side API call
      await $fetch('/api/auth/fitbit/fitbitLogout')

      // Clear fitbit cache and local/session storage
      clearFitbitCache?.()
      useCookie('fitbit_access_token').value = null
      useCookie('fitbit_refresh_token').value = null

      // Clear local/session storage
      localStorage.clear()
      sessionStorage.clear()

      // Reset Pinia stores
      userStore.$reset()
      playerStore.$reset()
      xpStore.$reset()

      // Navigate to home
      router.push('/')
    }
    catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return { logout }
}
