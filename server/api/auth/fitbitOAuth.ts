// This file handles the Fitbit OAuth2 authorization process
import type { FitbitTokenResponse } from '~/types/fitbit'
import { Buffer } from 'node:buffer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const authUrl = new URL('https://www.fitbit.com/oauth2/authorize')
  authUrl.searchParams.append('response_type', 'code')
  authUrl.searchParams.append('client_id', config.fitbit.clientId)
  authUrl.searchParams.append('redirect_uri', config.fitbit.redirectUri)
  authUrl.searchParams.append('scope', 'activity heartrate sleep profile')
  authUrl.searchParams.append('expires_in', '604800') // 7 days

  await sendRedirect(event, authUrl.toString())
})

// This function is used to refresh the Fitbit token using the refresh token
export async function refreshFitbitToken(refreshToken: string) {
  const config = useRuntimeConfig()

  const response = await $fetch<FitbitTokenResponse>('https://api.fitbit.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${config.fitbit.clientId}:${config.fitbit.clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  return {
    access_token: response.access_token,
    refresh_token: response.refresh_token,
    expires_in: response.expires_in,
  }
}
