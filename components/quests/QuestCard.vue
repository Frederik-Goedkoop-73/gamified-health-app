<script setup lang="ts">
defineProps<{
  title: string
  progress: string
  reward: string
  completed: boolean
}>()
</script>

<template>
  <Card
    class="relative min-h-48 w-48 flex flex-col items-center justify-between p-4 text-center transition hover:scale-105"
    :class="completed ? 'bg-muted text-muted-foreground' : 'bg-background'"
  >
    <CardHeader class="space-y-1">
      <CardTitle class="text-lg font-bold">
        {{ title }}
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col items-center gap-1">
      <p class="text-sm">
        {{ progress }}
      </p>
      <p class="text-primary font-semibold">
        {{ reward }}
      </p>
    </CardContent>

    <div v-if="completed" class="absolute right-2 top-2 text-green-500">
      ✅
    </div>
  </Card>
</template>
