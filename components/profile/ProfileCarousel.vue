<script setup lang="ts">
import type { AvatarShopItem, BannerShopItem, ThemeShopItem } from '~/types/shop'
import { usePlayerStore } from '@/stores/playerStore'

import { ShoppingCart } from 'lucide-vue-next'
import { PREMIUM_AVATARS, PROFILE_AVATARS, STORY_AVATARS } from '~/components/tasks/data/avatarData'
import { shopBanners, shopThemes } from '~/components/tasks/data/shopData'
import { useCustomize } from '~/composables/useCustomize'
import ProfileCarouselTabs from './ProfileCarouselTabs.vue'
import ProfileItemCard from './ProfileItemCard.vue'

// State and Logic
const playerStore = usePlayerStore()
const xpStore = useXPStore()
const currentSlide = ref(0)
const carouselRef = ref<any>(null)
const { setTheme } = useCustomize()

function selectAvatar(item: AvatarShopItem) {
  playerStore.setAvatar(item.id)
}

function selectBanner(item: BannerShopItem) {
  playerStore.setBanner(item.id)
}

function selectTheme(item: ThemeShopItem) {
  setTheme(item.id)
}

function goToSlide(index: number) {
  currentSlide.value = index
  carouselRef.value?.scrollTo?.(index)
}

function onSlideChanged(index: number) {
  currentSlide.value = index
}

const colorMode = useColorMode()

const slideTitles = ['Avatars', 'Banners', 'Themes']
const currentTitle = computed(() => slideTitles[currentSlide.value])
</script>

<template>
  <Card>
    <CardHeader class="grid grid-cols-3 items-center justify-between pb-2 space-y-0">
      <CardTitle class="justify-self-start">
        {{ currentTitle }}
      </CardTitle>
      <ProfileCarouselTabs
        :icons="['SquareUserRound', 'AppWindowMac', 'Palette', 'Settings']"
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
            <!-- Default Avatars -->
            <h3 class="text-lg text-muted-foreground font-semibold capitalize">
              The KUL Guests
            </h3>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 p-2">
              <ProfileItemCard
                v-for="item in PROFILE_AVATARS.filter(a => a.category === 'default')"
                :key="item.id"
                :name="item.title"
                :type="item.type"
                :image="item.path"
                :rarity="item.rarity"
                :on-select="() => selectAvatar(item)"
                :selected="playerStore.selectedAvatar === item.id"
              />
            </div>

            <!-- Shop Avatars -->
            <hr class="my-4">
            <h3 class="text-lg text-muted-foreground font-semibold capitalize">
              The Universal Athletes
            </h3>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-2">
              <ProfileItemCard
                v-for="item in PROFILE_AVATARS.filter(a => a.category === 'shop' && playerStore.unlockedAvatars.includes(a.id))"
                :key="item.id"
                :name="item.title"
                :type="item.type"
                :image="item.path"
                :rarity="item.rarity"
                :on-select="() => selectAvatar(item)"
                :selected="playerStore.selectedAvatar === item.id"
              />
            </div>

            <!-- Premium Avatars -->
            <div v-if="xpStore.level >= 30">
              <div
                v-for="subcategory in Object.keys(PREMIUM_AVATARS)"
                :key="subcategory"
              >
                <hr class="my-4">
                <h3 class="text-lg text-muted-foreground font-semibold capitalize">
                  {{ subcategory === 'helloKitty' ? 'Hello Kitty' : subcategory }}
                </h3>
                <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-2">
                  <ProfileItemCard
                    v-for="item in PROFILE_AVATARS.filter(a => a.category === 'premium' && a.subcategory === subcategory && playerStore.unlockedAvatars.includes(a.id))"
                    :key="item.id"
                    :name="item.title"
                    :type="item.type"
                    :image="item.path"
                    :rarity="item.rarity"
                    :on-select="() => selectAvatar(item)"
                    :selected="playerStore.selectedAvatar === item.id"
                  />
                </div>
              </div>
            </div>

            <!-- Story Avatars -->
            <div>
              <div
                v-for="subcategory in Object.keys(STORY_AVATARS)"
                :key="subcategory"
              >
                <hr class="my-4">
                <h3 class="text-lg text-muted-foreground font-semibold capitalize">
                  {{ subcategory === 'adventureTime' ? 'Adventure Time' : subcategory }}
                </h3>
                <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-2">
                  <ProfileItemCard
                    v-for="item in PROFILE_AVATARS.filter(a => a.category === 'story' && a.subcategory === subcategory && playerStore.unlockedAvatars.includes(a.id))"
                    :key="item.id"
                    :name="item.title"
                    :type="item.type"
                    :image="item.path"
                    :rarity="item.rarity"
                    :on-select="() => selectAvatar(item)"
                    :selected="playerStore.selectedAvatar === item.id"
                  />
                </div>
              </div>
            </div>
          </CarouselItem>

          <!-- Slide 2: Banners -->
          <CarouselItem>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 p-2">
              <!-- Default Banner -->
              <ProfileItemCard
                key="none"
                name="None"
                type="banner"
                color="transparent"
                :on-select="() => selectBanner({ id: 'none', type: 'banner', title: 'None', color: 'none', price: 0 })"
                :selected="playerStore.selectedBanner === 'none'"
              />

              <!-- Unlocked Banner -->
              <ProfileItemCard
                v-for="item in shopBanners.filter(b => playerStore.unlockedBanners.includes(b.id))"
                :key="item.id"
                :name="item.title"
                :type="item.type"
                :color="item.color"
                :on-select="() => selectBanner(item)"
                :selected="playerStore.selectedBanner === item.id"
              />
            </div>
          </CarouselItem>

          <!-- Slide 3: Themes -->
          <CarouselItem>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-2">
              <!-- Default Theme -->
              <ProfileItemCard
                key="zinc"
                name="Zinc"
                type="theme"
                color=""
                :on-select="() => selectTheme({ id: 'zinc', type: 'theme', title: 'Zinc', color: 'zinc', price: 0 })"
                :selected="playerStore.selectedTheme === 'zinc'"
              />

              <!-- Unlocked themes -->
              <ProfileItemCard
                v-for="item in shopThemes.filter(t => playerStore.unlockedThemes.includes(t.id))"
                :key="item.id"
                :name="item.title"
                :type="item.type"
                :color="item.color"
                :on-select="() => selectTheme(item)"
                :selected="playerStore.selectedTheme === item.id"
              />
            </div>
          </CarouselItem>

          <!-- Slide 4: Settings -->
          <CarouselItem>
            <div class="mx-auto max-w-sm flex flex-col items-center gap-6 py-4 text-center text-muted-foreground">
              <!-- Change Username -->
              <div class="w-full space-y-2">
                <label for="username" class="block text-sm font-medium">Change Username</label>
                <input
                  id="username"
                  v-model="usernameInput"
                  type="text"
                  placeholder="Enter new username"
                  class="w-full border border-input rounded-md bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
                >
                <button
                  class="mt-1 w-full rounded-md bg-primary px-3 py-2 text-white transition hover:bg-primary/90"
                  @click="updateUsername"
                >
                  Save
                </button>
              </div>

              <!-- Theme toggle -->
              <div class="space-y-1.5">
                <Label>Theme</Label>
                <div class="grid grid-cols-3 gap-2">
                  <Button
                    class="justify-center gap-2"
                    variant="outline"
                    :class="{ 'border-primary border-2': colorMode.preference === 'light' }"
                    @click="colorMode.preference = 'light'"
                  >
                    <Icon name="i-ph-sun-dim-duotone" size="16" />
                    <span class="text-xs capitalize">Light</span>
                  </Button>
                  <Button
                    class="justify-center gap-2"
                    variant="outline"
                    :class="{ 'border-primary border-2': colorMode.preference === 'dark' }"
                    @click="colorMode.preference = 'dark'"
                  >
                    <Icon name="i-ph-moon-stars-duotone" size="16" />
                    <span class="text-xs capitalize">Dark</span>
                  </Button>
                  <Button
                    class="justify-center gap-2"
                    variant="outline"
                    :class="{ 'border-primary border-2': colorMode.preference === 'system' }"
                    @click="colorMode.preference = 'system'"
                  >
                    <Icon name="i-lucide-monitor" size="16" />
                    <span class="text-xs capitalize">System</span>
                  </Button>
                </div>
              </div>

              <!-- Log out button -->
              <div class="w-full">
                <button
                  class="w-full rounded-md bg-destructive px-3 py-2 text-white transition hover:bg-destructive/90"
                  @click="logout"
                >
                  Log out
                </button>
              </div>

              <!-- Joke ad button -->
              <div>
                <a
                  href="https://youtu.be/0fv1qATRl1c?si=SQv3rN83k_36R1Nm"
                  target="_blank"
                  rel="noopener"
                  class="text-sm underline hover:text-primary"
                >
                  Watch ad for coins
                </a>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </CardContent>
  </Card>
</template>
