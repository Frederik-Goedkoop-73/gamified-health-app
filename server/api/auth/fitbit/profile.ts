// server/api/fitbit/profile.get.ts
export default defineEventHandler(async (_event) => {
  const accessToken = 'your-access-token-here' // ⚡ Replace with real token from session, cookie, etc.

  const profile = await $fetch('https://api.fitbit.com/1/user/-/profile.json', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return profile
})
