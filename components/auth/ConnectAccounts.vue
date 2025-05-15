<script setup lang="ts">
import { useAuth } from '@/composables/UseAuth'
import { useFitbitAuth } from '@/composables/useFitbitAuth'
import { useMediaQuery } from '@vueuse/core'

const { isLoading, isLoggedIn, signInWithGoogle } = useAuth()
const isMobile = useMediaQuery('(max-width: 540px)')

// Handle Fitbit login (redirect to Fitbit auth)
function initiateFitbitAuth() {
  // Just redirect the browser directly to the auth route
  window.location.href = '/api/auth/fitbitOAuth'
}

const fitbitConnected = useFitbitAuth().isFitbitConnected
</script>

<template>
  <div class="flex flex-row gap-4">
    <!-- Google Button -->
    <Button
      :disabled="isLoggedIn"
      class="flex items-center gap-2 p-2"
      @click="signInWithGoogle"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5">
        <path
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          fill="currentColor"
        />
      </svg>
      <!-- Mobile -->
      <span v-if="isMobile && !isLoading && !isLoggedIn">Connect</span>
      <span v-else-if="isMobile && isLoading">...</span>

      <!-- Desktop -->
      <span v-else-if="!isMobile">
        {{ isLoading ? 'Connecting' : (isLoggedIn ? 'Connected' : 'Connect with Google') }}
      </span>
    </Button>

    <!-- Fitbit Button -->
    <Button
      :disabled="fitbitConnected || !isLoggedIn"
      class="flex items-center gap-2 p-2"
      @click="initiateFitbitAuth"
    >
      <img src="/Fitbit_app_icon_square.png" alt="Fitbit logo" class="h-6 w-6 rounded-full">
      <!-- Mobile -->
      <span v-if="isMobile && !fitbitConnected">
        {{ isLoggedIn ? 'Connect' : 'Connect Google' }}
      </span>

      <!-- Desktop -->
      <span v-else-if="!isMobile">
        {{ isLoggedIn ? (fitbitConnected ? 'Connected' : 'Connect to Fitbit') : 'First connect with Google' }}
      </span>
    </Button>
  </div>
</template>
