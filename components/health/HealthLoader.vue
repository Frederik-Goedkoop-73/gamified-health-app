<script setup lang="ts">
defineProps<{
  loading: boolean
  error: boolean
}>()
</script>

<template>
  <div class="h-48 flex items-center justify-center">
    <p v-if="loading" class="text-sm text-muted-foreground">
      Loading Fitbit data...
    </p>
    <p v-else-if="error" class="text-sm text-red-500">
      Failed to load Fitbit data. Please try reconnecting.
    </p>
  </div>
</template>
