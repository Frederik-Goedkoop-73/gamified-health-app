<script setup lang="ts">
defineProps<{
  loading: boolean
  error: boolean
}>()
</script>

<template>
  <div class="h-48 flex flex-col items-center justify-center px-4 text-center space-y-2">
    <template v-if="loading">
      <svg class="h-6 w-6 animate-spin text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <p class="text-sm text-muted-foreground">
        Loading Fitbit data...
      </p>
    </template>

    <template v-else-if="error">
      <svg class="h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M4.93 4.93a10 10 0 0114.14 0 10 10 0 010 14.14 10 10 0 01-14.14 0 10 10 0 010-14.14z" />
      </svg>
      <p class="text-sm text-red-500">
        Failed to load Fitbit data.
      </p>
      <p class="text-xs text-muted-foreground">
        Please make sure you're connected to Fitbit.
      </p>
    </template>
  </div>
</template>
