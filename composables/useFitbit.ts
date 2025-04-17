// This file handles the OAuth2 authentication process 
// and provides a composable function to fetch data from the Fitbit API.

export function useFitbit() {
  const accessToken = useCookie('fitbit_access_token')
  const refreshToken = useCookie('fitbit_refresh_token')

  const fetchFitbitData = async <T = any>(endpoint: string): Promise<T> => {
    if (!accessToken.value) {
      throw new Error('No Fitbit access token')
    }

    try {
      const { data, error } = await useFetch<T>(`https://api.fitbit.com/1/user/-/${endpoint}.json`, {
        headers: {
          Authorization: `Bearer ${accessToken.value}`,
        },
      })

      if (error.value)
        throw error.value
      return data.value as T
    }
    catch (error: any) {
      if (error?.response?.status === 401 && refreshToken.value) {
        console.warn('Access token expired. Refreshing...')

        const { data: refreshed } = await useFetch('/api/auth/fitbit/refresh', { method: 'POST' })

        if (!refreshed.value) {
          throw new Error('Failed to refresh Fitbit tokens')
        }
        accessToken.value = refreshed.value.access_token
        refreshToken.value = refreshed.value.refresh_token

        const { data: retryData } = await useFetch<T>(`https://api.fitbit.com/1/user/-/${endpoint}.json`, {
          headers: {
            Authorization: `Bearer ${accessToken.value}`,
          },
        })

        return retryData.value as T
      }

      throw error
    }
  }

  return {
    fetchFitbitData,
  }
}
