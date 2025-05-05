<script setup lang="ts">
import { Coins } from 'lucide-vue-next'

defineProps<{
  name: string
  image?: string
  type: 'avatar' | 'banner' | 'theme'
  price: number
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
  color?: string
  onBuy: () => void
  bought?: boolean
}>()
</script>

<template>
  <Card
    class="relative min-w-80 transition"
    :class="[
      bought
        ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
        : 'hover:shadow-md hover:scale-105 cursor-pointer',

      // Border colors for rarities
      rarity === 'rare' ? 'border-blue-500' : '',
      rarity === 'epic' ? 'border-purple-500 ring-1 ring-purple-400' : '',
      rarity === 'legendary' ? 'border-yellow-400 ring-2 ring-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.6)]' : '',
    ]"
    @click="!bought && onBuy()"
  >
    <CardHeader class="flex flex-col items-center justify-center pb-2">
      <CardTitle>{{ name }}</CardTitle>
      <!-- Rarity Badge Top-Right -->
      <div
        v-if="rarity && rarity !== 'common'"
        class="absolute right-2 top-2 rounded px-2 py-0.5 text-xs font-semibold uppercase"
        :class="{
          'bg-blue-500 text-white': rarity === 'rare',
          'bg-purple-500 text-white': rarity === 'epic',
          'bg-yellow-400 text-black': rarity === 'legendary',
        }"
      >
        {{ rarity }}
      </div>
    </CardHeader>
    <hr class="my-1 w-full">
    <CardContent class="flex flex-col items-center justify-between gap-2 pt-2">
      <!-- Banner Preview Skeleton -->
      <div
        v-if="type === 'banner'"
        class="h-40 w-full flex items-center gap-4 border-4 rounded-lg bg-secondary px-4 py-2"
        :style="{
          borderImage: color && ['bronze', 'silver', 'gold', 'platinum'].includes(color)
            ? `linear-gradient(135deg, ${
              color === 'bronze'
                ? '#cc9c6f, #edbc8f, #ce835a '
                : color === 'silver'
                  ? '#a5aab4, #e0e2e7, #a8adb6'
                  : color === 'gold'
                    ? '#faaf1e, #fdd950, #dc9821'
                    : '#57c1d0, #7fdbe4, #779cbf' // platinum
            }) 1`
            : '',
          borderStyle: color && ['bronze', 'silver', 'gold', 'platinum'].includes(color) ? 'solid' : '',
          borderColor: color,
          borderWidth: '4px',
        }"
        :class="{ 'border:animate-pulse': color === 'bronze' || 'silver' || 'gold' || 'platnium' }"
      >
        <div class="h-16 w-16 rounded-full bg-primary/30" />
        <div class="flex-1 space-y-2">
          <div class="h-4 w-3/4 rounded bg-primary/50" />
          <div class="h-4 w-2/3 rounded bg-primary/40" />
        </div>
      </div>

      <!-- Themes -->
      <div
        v-else-if="type === 'theme'"
        class="h-24 w-24 border rounded-xl"
        :style="{ backgroundColor: color }"
      />

      <!-- Avatars -->
      <div v-else>
        <div class="h-40 w-full flex items-center justify-center">
          <!-- Glow dot behind image -->
          <div
            class="absolute h-40 w-50 rounded-full blur-xl"
            :class="{
              'bg-blue-500 opacity-10': rarity === 'rare',
              'bg-purple-500 opacity-20': rarity === 'epic',
              'bg-yellow-300 opacity-30 animate-pulse': rarity === 'legendary',
            }"
          />

          <!-- Actual image -->
          <img
            :src="image"
            :alt="name"
            class="z-10 h-full w-auto object-contain"
          >
        </div>
      </div>
      <div class="flex flex-row items-center justify-between gap-2">
        <p class="text-muted-foreground">
          {{ price }}
        </p>
        <Coins class="h-4 w-4 text-yellow-500" />
      </div>

      <Badge v-if="bought" variant="outline" class="text-muted-foreground font-semibold">
        Owned
      </Badge>
    </CardContent>
  </Card>
</template>
