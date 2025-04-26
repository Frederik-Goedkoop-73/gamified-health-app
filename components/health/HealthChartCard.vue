<script setup lang="ts">
defineProps<{
  title: string
  chartComponent: any
  chartProps: Record<string, any>
  footerText?: string
}>()
</script>

<template>
  <Card>
    <CardContent class="flex flex-col items-center justify-center p-6">
      <span class="text-center text-2xl font-semibold">{{ title }}</span>
      <component :is="chartComponent" v-bind="chartProps" :rounded-corners="4" />
      <div v-if="footerText" class="mt-4 text-sm text-muted-foreground">
        {{ footerText }}
      </div>
    </CardContent>
  </Card>
</template>
