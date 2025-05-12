<script setup lang="ts">
import type { AvatarShopItem, BannerShopItem, ThemeShopItem } from '~/types/shop'
import { usePlayerStore } from '@/stores/playerStore'
import { useXPStore } from '@/stores/xpStore'

import { ShoppingCart } from 'lucide-vue-next'
import { PREMIUM_AVATARS, SHOP_AVATARS, shopAvatars } from '~/components/tasks/data/avatarData'
import { shopBanners, shopThemes } from '~/components/tasks/data/shopData'
import { useShop } from '~/composables/useShop'
import ShopCarouselTabs from './ShopCarouselTabs.vue'
import ShopItemCard from './ShopItemCard.vue'

// State and Logic
const { buyItem } = useShop()
const playerStore = usePlayerStore()
const xpStore = useXPStore()
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
            <h3 class="text-lg text-muted-foreground font-semibold capitalize">
              The Universal Athletes
            </h3>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-2">
              <ShopItemCard
                v-for="item in shopAvatars.filter(a => SHOP_AVATARS.includes(a.id))"
                :key="item.id"
                :name="item.title"
                :type="item.type"
                :image="item.path"
                :price="item.price"
                :rarity="item.rarity"
                :levelrequired="item.levelrequired"
                :on-buy="() => handleBuyAvatar(item)"
                :bought="playerStore.unlockedAvatars.includes(item.id)"
              />
            </div>
            <div v-for="(ids, category) in PREMIUM_AVATARS" :key="category">
              <hr class="my-4">
              <h3 v-if="xpStore.level < 30" class="text-lg text-muted-foreground font-semibold capitalize">
                ? ? ?
              </h3>
              <h3 v-else class="text-lg text-muted-foreground font-semibold capitalize">
                {{ category === 'helloKitty' ? 'Hello Kitty' : category }}
              </h3>
              <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-2">
                <ShopItemCard
                  v-for="item in shopAvatars.filter(a => ids.includes(a.id))"
                  :key="item.id"
                  :name="item.title"
                  :type="item.type"
                  :image="item.path"
                  :price="item.price"
                  :rarity="item.rarity"
                  :levelrequired="item.levelrequired"
                  :on-buy="() => handleBuyAvatar(item)"
                  :bought="playerStore.unlockedAvatars.includes(item.id)"
                />
              </div>
            </div>
          </CarouselItem>

          <!-- Slide 2: Banners -->
          <CarouselItem>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 py-2 max-[400px]:px-1 sm:px-2">
              <ShopItemCard
                v-for="item in shopBanners"
                :key="item.id"
                :name="item.title"
                :type="item.type"
                :color="item.color"
                :price="item.price"
                :rarity="item.rarity"
                :levelrequired="item.levelrequired"
                :on-buy="() => handleBuyBanner(item)"
                :bought="playerStore.unlockedBanners.includes(item.id)"
              />
            </div>
          </CarouselItem>

          <!-- Slide 3: Themes -->
          <CarouselItem>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-2">
              <ShopItemCard
                v-for="item in shopThemes"
                :key="item.id"
                :name="item.title"
                :type="item.type"
                :color="item.color"
                :price="item.price"
                :rarity="item.rarity"
                :levelrequired="item.levelrequired"
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
