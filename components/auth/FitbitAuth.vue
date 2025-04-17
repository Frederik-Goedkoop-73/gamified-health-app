<script setup lang="ts">
/* import type { AuthUrlResponse } from '~/types/fitbit'

const { data: authUrl } = await useFetch<AuthUrlResponse>('/api/auth/fitbitOAuth')

function initiateFitbitAuth() {
  if (authUrl.value?.authUrl) {
    window.location.href = authUrl.value.authUrl
  }
  else {
    console.error('Authorization URL is not available.')
  } */

function initiateFitbitAuth() {
  // Just redirect the browser directly to the auth route
  window.location.href = '/api/auth/fitbitOAuth'
}
</script>

<template>
  <Button @click="initiateFitbitAuth">
    <svg class="mr-2 h-4 w-4" viewBox="0 0 24 24">
      <!-- Fitbit logo SVG -->
    </svg>
    Connect with Fitbit
  </Button>
</template>
