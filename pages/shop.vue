<script setup lang="ts">
// import NumberFlow from '@number-flow/vue'
import type { AvatarShopItem, BannerShopItem, ShopItem, ThemeShopItem } from '~/types/shop'

import { usePlayerStore } from '@/stores/playerStore'
import { ShoppingCart } from 'lucide-vue-next'
import { shopAvatars, shopBanners, shopThemes } from '~/components/tasks/data/shopData'
import { useShop } from '~/composables/useShop'

const { buyItem } = useShop()
const playerStore = usePlayerStore()

function handleBuyItem(item: AvatarShopItem) {
  buyItem(item)
}

function handleBuyBanner(item: BannerShopItem) {
  buyItem(item)
}

function handleBuyTheme(item: ThemeShopItem) {
  buyItem(item)
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Shop
      </h2>
    </div>

    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <Card class="xl:col-span-2">
        <!-- 🧍‍♂️ Avatars -->
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Avatars</CardTitle>
          <ShoppingCart class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="flex flex-row flex-wrap items-center justify-center gap-x-10% gap-y-4 pt-2">
          <div class="flex flex-wrap gap-4">
            <ShopItemCard
              v-for="item in shopAvatars"
              :key="item.id"
              :name="item.title"
              :image="item.path"
              :price="item.price"
              :rarity="item.rarity"
              :on-buy="() => handleBuyItem(item)"
              :bought="playerStore.unlockedAvatars.includes(item.id)"
            />
          </div>
        </CardContent>

        <hr>

        <!-- 🏳️ Banners -->
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Banners</CardTitle>
          <ShoppingCart class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="flex flex-row flex-wrap items-center justify-center gap-x-10% gap-y-4 pt-2">
          <div class="flex flex-wrap gap-4">
            <ShopItemCard
              v-for="item in shopBanners"
              :key="item.id"
              :name="item.title"
              :image="`/banners/${item.color}.png`"
              :price="item.price"
              :on-buy="() => handleBuyBanner(item)"
              :bought="playerStore.purchasedItems.some((i:ShopItem) => i.id === item.id)"
            />
          </div>
        </CardContent>

        <hr>

        <!-- 🎨 Themes -->
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Themes</CardTitle>
          <ShoppingCart class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="flex flex-row flex-wrap items-center justify-center gap-x-10% gap-y-4 pt-2">
          <div class="flex flex-wrap gap-4">
            <ShopItemCard
              v-for="item in shopThemes"
              :key="item.id"
              :name="item.title"
              :image="`/themes/${item.color}.png`"
              :price="item.price"
              :on-buy="() => handleBuyTheme(item)"
              :bought="playerStore.purchasedItems.some((i:ShopItem) => i.id === item.id)"
            />
          </div>
        </CardContent>
      </card>
    </main>
  </div>
</template>
