<script setup lang="ts">
import type { IconName } from './HealthCarouselTabs.vue'
import NumberFlow from '@number-flow/vue'
import { Flame, Footprints, HeartPulse, MoonStar, Ruler, Zap } from 'lucide-vue-next'

defineProps<{
  title: string
  value: number
  sleep?: string
  suffix?: string
  icon: IconName
}>()

const iconsMap = {
  Footprints,
  Ruler,
  MoonStar,
  HeartPulse,
  Flame,
  Zap,
} as const

function resolveIcon(name: IconName) {
  return iconsMap[name]
}
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between pb-2 pt-3 space-y-0">
      <CardTitle class="text-md font-medium">
        {{ title }}
      </CardTitle>
      <component :is="resolveIcon(icon)" class="size-5 text-primary" />
    </CardHeader>
    <hr>
    <CardContent>
      <div class="flex items-center justify-start pt-3 text-2xl font-bold">
        <NumberFlow v-if="title !== 'Sleep' && title !== 'Av Heart Rate'" :value="value" :suffix="suffix" />
        <span v-else>
          {{ sleep }} {{ suffix }}
        </span>
      </div>
    </CardContent>
  </Card>
</template>
