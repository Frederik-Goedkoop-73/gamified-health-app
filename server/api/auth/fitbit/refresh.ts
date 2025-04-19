import type { FitbitTokenResponse } from '~/types/fitbit'
import { Buffer } from 'node:buffer'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const refreshToken = getCookie(event, 'fitbit_refresh_token')

  if (!refreshToken) {
    throw new Error('Missing refresh token')
  }

  const tokenResponse = await $fetch<FitbitTokenResponse>('https://api.fitbit.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${config.fitbit.clientId}:${config.fitbit.clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }).toString(),
  })

  // Update the cookies
  setCookie(event, 'fitbit_access_token', tokenResponse.access_token, {
    httpOnly: false, // Otherwise can't be read by client side js
    secure: true, // Use secure cookies in production
    sameSite: 'lax',
    path: '/',
    maxAge: tokenResponse.expires_in,
  })

  setCookie(event, 'fitbit_refresh_token', tokenResponse.refresh_token, {
    httpOnly: false,
    secure: true, // Use secure cookies in production
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })

  return tokenResponse
})
