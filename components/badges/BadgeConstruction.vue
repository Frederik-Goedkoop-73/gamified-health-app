<script setup lang="ts">
import { AlertTriangle, Hammer } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 text-center text-muted-foreground space-y-4">
    <Hammer class="size-12 animate-bounce text-yellow-500" />
    <h2 class="text-2xl text-primary font-semibold">
      This Page is Under Construction
    </h2>
    <p class="max-w-md text-sm">
      We're still building this feature! Soon you'll be able to track all your lifetime achievements and unlockable badges here.
    </p>
    <div class="mt-2 flex items-center gap-2 text-xs text-yellow-600">
      <AlertTriangle class="size-4" />
      Work in progress — check back soon!
    </div>
  </div>
</template>
