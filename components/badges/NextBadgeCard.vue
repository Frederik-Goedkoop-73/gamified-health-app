<script setup lang="ts">
import { Coins, Star } from 'lucide-vue-next'

defineProps<{
  badge: {
    type: string // change to array of possible strings
    tier: string
    requirement: string
    target?: number
    icon: string
    stars: number
    coins: number
    claimed: boolean
    xp?: number
  }
}>()
</script>

<template>
  <Card class="w-full rounded-2xl bg-zinc-900 p-4 text-white shadow-xl dark:bg-zinc-50 dark:text-black">
    <div class="flex flex-row items-center gap-6">
      <!-- Fixed-width image on the left -->
      <img :src="badge.icon" alt="Badge" class="h-auto w-30 object-contain">

      <!-- Centered text content -->
      <div class="flex flex-1 flex-col items-center justify-center gap-2 text-center">
        <h3 class="text-lg font-bold">
          {{ badge.tier }}
        </h3>
        <p class="text-sm text-muted">
          {{ badge.requirement }}
        </p>
        <p class="flex items-center gap-2 text-sm font-semibold">
          +{{ badge.stars }} <Star class="size-4 fill-blue-500 text-blue-500" />
        </p>
        <p class="flex items-center gap-2 text-sm font-semibold">
          +{{ badge.coins }} <Coins class="size-4 text-yellow-500" />
        </p>
        <p
          v-if="badge.xp"
          class="flex items-center gap-2 text-sm font-semibold"
        >
          +{{ badge.xp }} XP
        </p>
      </div>
    </div>
  </Card>
</template>
