export function useFitbitAuth() {
  const fitbitToken = useCookie('fitbit_access_token')

  const isFitbitConnected = computed(() => !!fitbitToken.value)

  function requireFitbitAuth(redirectPath = '/api/auth/fitbitOAuth') {
    if (!isFitbitConnected.value) {
      window.location.href = redirectPath
    }
  }

  return {
    fitbitToken,
    isFitbitConnected,
    requireFitbitAuth,
  }
}
