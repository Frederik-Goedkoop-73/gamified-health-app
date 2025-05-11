import { Buffer } from 'node:buffer'
import { defineEventHandler, deleteCookie, getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const accessToken = getCookie(event, 'fitbit_access_token')
  if (!accessToken) {
    return { success: false, message: 'No access token found' }
  }

  const clientId = config.fitbit.clientId
  const clientSecret = config.fitbit.clientSecret

  try {
    await $fetch('https://api.fitbit.com/oauth2/revoke', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ token: accessToken }).toString(),
    })

    deleteCookie(event, 'fitbit_access_token')
    deleteCookie(event, 'fitbit_refresh_token')

    return { success: true }
  }
  catch (error) {
    console.error('Fitbit revoke failed:', error)
    return { success: false, message: 'Failed to revoke token' }
  }
})
