<script setup lang="ts">
import { useIconColorClass } from '@/composables/useIconColorClass'
import { AppWindowMac, Palette, Settings, SquareUserRound } from 'lucide-vue-next'

// Define icon names properly
export type IconName = 'SquareUserRound' | 'AppWindowMac' | 'Palette' | 'Settings'

const _props = defineProps<{
  icons: IconName[]
  current: number
}>()

const emits = defineEmits<{
  (e: 'update:current', value: number): void
}>()

const iconsMap = {
  SquareUserRound,
  AppWindowMac,
  Palette,
  Settings,
} as const

const { iconColorClass } = useIconColorClass()

function resolveIcon(name: IconName) {
  return iconsMap[name]
}
</script>

<template>
  <div class="mb-4 flex justify-center overflow-visible space-x-3">
    <Button
      v-for="(iconName, index) in icons"
      :key="index"
      class="h-10 w-10 flex items-center justify-center p-0 transition-colors transition-transform duration-300 ease-in-out"
      :class="[
        current === index ? ['bg-primary', iconColorClass] : 'bg-muted text-muted-foreground hover:!bg-primary/20',
      ]"
      @click="emits('update:current', index)"
    >
      <component :is="resolveIcon(iconName)" class="size-7" />
    </Button>
  </div>
</template>
