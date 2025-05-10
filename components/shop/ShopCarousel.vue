<script setup lang="ts">
import type { AvatarShopItem, BannerShopItem, ThemeShopItem } from '~/types/shop'
import { usePlayerStore } from '@/stores/playerStore'

import { ShoppingCart } from 'lucide-vue-next'
import { shopAvatars, shopBanners, shopThemes } from '~/components/tasks/data/shopData'
import { useShop } from '~/composables/useShop'
import ShopCarouselTabs from './ShopCarouselTabs.vue'
import ShopItemCard from './ShopItemCard.vue'

// State and Logic
const { buyItem } = useShop()
const playerStore = usePlayerStore()
const currentSlide = ref(0)
const carouselRef = ref<any>(null)

function handleBuyAvatar(item: AvatarShopItem) {
  buyItem(item)
}

function handleBuyBanner(item: BannerShopItem) {
  buyItem(item)
}

function handleBuyTheme(item: ThemeShopItem) {
  buyItem(item)
}

function goToSlide(index: number) {
  currentSlide.value = index
  carouselRef.value?.scrollTo?.(index)
}

function onSlideChanged(index: number) {
  currentSlide.value = index
}

const slideTitles = ['Avatars', 'Banners', 'Themes']
const currentTitle = computed(() => slideTitles[currentSlide.value])
</script>

<template>
  <Card>
    <CardHeader class="grid grid-cols-3 items-center justify-between pb-2 space-y-0">
      <CardTitle class="justify-self-start">
        {{ currentTitle }}
      </CardTitle>
      <ShopCarouselTabs
        :icons="['SquareUserRound', 'AppWindowMac', 'Palette']"
        :current="currentSlide"
        class="justify-self-center"
        @update:current="goToSlide"
      />
      <ShoppingCart class="h-4 w-4 justify-self-end text-muted-foreground" />
    </CardHeader>
    <CardContent class="flex flex-col items-center justify-center p-6">
      <!-- Carousel -->
      <Carousel ref="carouselRef" class="w-full" @slide-changed="onSlideChanged">
        <CarouselContent>
          <!-- Slide 1: Avatars -->
          <CarouselItem>
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
              <ShopItemCard
                v-for="item in shopAvatars"
                :key="item.id"
                :name="item.title"
                :type="item.type"
                :image="item.path"
                :price="item.price"
                :rarity="item.rarity"
                :on-buy="() => handleBuyAvatar(item)"
                :bought="playerStore.unlockedAvatars.includes(item.id)"
              />
            </div>
          </CarouselItem>

          <!-- Slide 2: Banners -->
          <CarouselItem>
            <div class="grid grid-flow-col gap-4 overflow-hidden">
              <ShopItemCard
                v-for="item in shopBanners"
                :key="item.id"
                :name="item.title"
                :type="item.type"
                :color="item.color"
                :price="item.price"
                :on-buy="() => handleBuyBanner(item)"
                :bought="playerStore.unlockedBanners.includes(item.id)"
              />
            </div>
          </CarouselItem>

          <!-- Slide 3: Themes -->
          <CarouselItem>
            <div class="grid grid-cols-1 gap-4 overflow-hidden lg:grid-cols-3 sm:grid-cols-2">
              <ShopItemCard
                v-for="item in shopThemes"
                :key="item.id"
                :name="item.title"
                :type="item.type"
                :color="item.color"
                :price="item.price"
                :on-buy="() => handleBuyTheme(item)"
                :bought="playerStore.unlockedThemes.includes(item.id)"
              />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </CardContent>
  </Card>
</template>
