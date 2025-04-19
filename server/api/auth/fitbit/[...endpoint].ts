// server/api/fitbit/[...endpoint].ts
// This file handles proxying requests to the Fitbit API
// and requires an access token to be set in the cookies.
export default defineEventHandler(async (event) => {
  const accessToken = getCookie(event, 'fitbit_access_token')

  if (!accessToken) {
    throw new Error('No Fitbit access token found')
  }

  const endpointParts = event.context.params?.endpoint
  const endpointPath = Array.isArray(endpointParts) ? endpointParts.join('/') : endpointParts

  if (!endpointPath) {
    throw new Error('Missing Fitbit API endpoint')
  }

  const url = `https://api.fitbit.com/1/user/-/${endpointPath}.json`

  console.warn('Proxying request to Fitbit URL:', url)

  // Proxy the request server-side with authorization
  const response = await proxyRequest(event, url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response
})
