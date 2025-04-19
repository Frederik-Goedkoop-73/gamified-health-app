// server/api/fitbit/profile.get.ts
export default defineEventHandler(async (_event) => {
  const accessToken = getCookie(_event, 'fitbit_access_token') // ⚡ Replace with real token from session, cookie, etc.

  const profile = await $fetch('https://api.fitbit.com/1/user/-/profile.json', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return profile
})
