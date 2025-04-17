// This file handles the Fitbit OAuth2 callback process
import type { FitbitTokenResponse } from '~/types/fitbit'
import { Buffer } from 'node:buffer'

export default defineEventHandler(async (event) => {
  const { code } = getQuery(event)
  const config = useRuntimeConfig()

  if (!code) {
    throw createError({ statusCode: 400, message: 'Missing authorization code' })
  }

  // Exchange the authorization code for an access token
  const tokenResponse = await $fetch<FitbitTokenResponse>('https://api.fitbit.com/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${config.fitbit.clientId}:${config.fitbit.clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      code: code.toString(),
      grant_type: 'authorization_code',
      redirect_uri: config.fitbit.redirectUri,
    }),
  })

  // Store tokens securely (use encrypted cookies or your auth system)
  setCookie(event, 'fitbit_access_token', tokenResponse.access_token, {
    httpOnly: true,
    secure: true, // Use secure cookies in production -> could change to secure: import.meta.env.PROD
    sameSite: 'lax', // Basic CSRF protection
    path: '/', // Available for all routes
    maxAge: tokenResponse.expires_in,
  })

  // Store refresh token -> so we have access to this token for later
  setCookie(event, 'fitbit_refresh_token', tokenResponse.refresh_token, {
    httpOnly: true,
    secure: true, // Use secure cookies in production
    sameSite: 'lax', // Basic CSRF protection
    path: '/', // Available for all routes
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  await sendRedirect(event, '/') // Redirect after auth
})
