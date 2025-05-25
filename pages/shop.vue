<script setup lang="ts">
import { useCoinStore } from '@/stores/coinStore'
import { useStarStore } from '@/stores/starStore'
import NumberFlow from '@number-flow/vue'
import { Coins, Star } from 'lucide-vue-next'
import ShopInfo from '~/components/info/ShopInfo.vue'
import ShopCarousel from '~/components/shop/ShopCarousel.vue'

const coinStore = useCoinStore()
const starStore = useStarStore()

const coinValue = computed(() => coinStore.coins)
const starValue = computed(() => starStore.stars)

onMounted (() => {
  starStore.fetchStars()
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-2xl font-bold tracking-tight">
          Shop
        </h2>
        <ShopInfo />
      </div>
      <div>
        <div>
          <div class="flex flex-row items-center gap-4">
            <div class="flex flex-row items-center gap-2">
              <h3 class="flex flex-row items-center gap-2 text-muted-foreground">
                <NumberFlow
                  :value="coinValue"
                />
              </h3>
              <Coins
                class="size-4"
                :class="coinValue !== 0 ? 'text-yellow-500' : 'text-muted-foreground'"
              />
            </div>
            <div class="flex flex-row items-center gap-2">
              <h3 class="flex flex-row items-center gap-2 text-muted-foreground">
                {{ starValue }}
              </h3>
              <Star
                class="size-4"
                :class="starValue !== 0 ? 'text-blue-500 fill-blue-500' : 'text-muted-foreground'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <ShopCarousel />
    </main>
  </div>
</template>
