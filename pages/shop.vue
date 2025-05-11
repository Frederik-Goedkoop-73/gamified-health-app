<script setup lang="ts">
import { useCoinStore } from '@/stores/coinStore'
import NumberFlow from '@number-flow/vue'
import { Coins } from 'lucide-vue-next'
import ShopCarousel from '~/components/shop/ShopCarousel.vue'

const coinStore = useCoinStore()

const coinValue = computed(() => coinStore.coins)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Shop
      </h2>
      <div>
        <div class="flex flex-row items-center gap-2">
          <h3 class="flex flex-row items-center gap-2 text-muted-foreground">
            <strong>Balance: </strong>
            <NumberFlow
              :value="coinValue"
            />
          </h3>
          <Coins
            class="size-4 text-yellow-500"
          />
        </div>
      </div>
    </div>

    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <ShopCarousel />
    </main>
  </div>
</template>
