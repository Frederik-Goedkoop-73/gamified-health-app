// This file handles the OAuth2 authentication process 
// and provides a composable function to fetch data from the Fitbit API.

// composables/useFitbit.ts
export function useFitbit() {
  const fetchFitbitData = async <T = any>(endpoint: string): Promise<T> => {
    try {
      // Now fetch from our own Nuxt backend (proxy to Fitbit)

      const result = await $fetch<T>(`/api/auth/fitbit/${endpoint}`, { // don't encode with encodeURIComponent
        // because this causes a 400 error (bad request -> because fitbit can't decode string)

        method: 'GET',
      })

      return result as T
    }
    catch (error: any) {
      console.error('Error fetching Fitbit data:', error)
      throw error
    }
  }

  return {
    fetchFitbitData,
  }
}
