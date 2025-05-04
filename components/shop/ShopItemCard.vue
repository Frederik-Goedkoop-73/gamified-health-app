<script setup lang="ts">
import { Coins } from 'lucide-vue-next'

defineProps<{
  name: string
  image: string
  price: number
  rarity?: 'common' | 'rare' | 'epic' | 'legendary'
  onBuy: () => void
  bought?: boolean
}>()
</script>

<template>
  <Card
    class="min-w-80 transition"
    :class="[
      bought
        ? 'bg-muted text-muted-foreground opacity-50 cursor-not-allowed'
        : 'hover:shadow-md hover:scale-105 cursor-pointer',
    ]"
    @click="!bought && onBuy()"
  >
    <CardHeader class="flex flex-col items-center justify-center pb-2">
      <CardTitle>{{ name }}</CardTitle>

      <!-- <Badge v-show="rarity && rarity !== 'common' ">
        {{ rarity }}
      </Badge> -->

    </CardHeader>
    <hr class="my-1 w-full">
    <CardContent class="flex flex-col items-center justify-between gap-2 pt-2">
      <div class="h-40 w-full flex items-center justify-center">
        <img :src="image" :alt="name" class="h-full w-auto object-contain">
      </div>
      <div class="flex flex-row items-center justify-between gap-2">
        <p class="text-muted-foreground">
          {{ price }}
        </p>
        <Coins class="h-4 w-4 text-yellow-500" />
      </div>
      <Badge v-if="bought" class="text-muted-foreground font-semibold">
        Owned
      </Badge>
    </CardContent>
  </Card>
</template>
