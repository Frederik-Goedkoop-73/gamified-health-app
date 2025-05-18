<script setup lang="ts">
import { useAuth } from '@/composables/UseAuth'
import { useCoinStore } from '@/stores/coinStore'
import { usePlayerStore } from '@/stores/playerStore'
import { useStreakStore } from '@/stores/streakStore'
import { useUserStore } from '@/stores/userStore'
import { useXPStore } from '@/stores/xpStore'
import NumberFlow from '@number-flow/vue'
import { Coins, User, Zap } from 'lucide-vue-next'
import ProfileInfo from '~/components/info/ProfileInfo.vue'
import { AVATAR_PATHS } from '~/components/tasks/data/avatarData'
import { isBannerId } from '~/components/tasks/data/bannerData'
import { getBannerInlineStyle } from '~/composables/useBannerStyle'

const { user } = useAuth() // Use composable to manage authentication state
const userStore = useUserStore() // Use Pinia store to manage user data
const playerStore = usePlayerStore() // Use Pinia store to manage player data
const xpStore = useXPStore()
const coinStore = useCoinStore()
const streakStore = useStreakStore()
const { selectedAvatar } = storeToRefs(playerStore) // Use storeToRefs to get reactive references to store properties

// Computed values for number-flow animation
const progressValue = computed(() => xpStore.xpProgress)
const xpProgressValue = computed(() => xpStore.xp)
const xpToNextLevelValue = computed(() => xpStore.totalXpNeededForNextLevel)
const streakValue = computed(() => streakStore.streak)
const coinValue = computed(() => coinStore.coins)

// Computed values for profile banner
const bannerId = computed(() =>
  typeof playerStore.selectedBanner === 'string' && isBannerId(playerStore.selectedBanner)
    ? playerStore.selectedBanner
    : undefined,
)
const bannerStyle = computed(() =>
  bannerId.value ? getBannerInlineStyle(bannerId.value) : undefined,
)

// Function for checking if values aren't 0 -> styling
const streakIsPositive = (streakValue: number) => streakValue > 0
const coinIsPositive = (coinValue: number) => coinValue > 0

// Auth: Fetch additional data when user is available
watch(() => user.value, async (newUser) => {
  if (newUser) {
    await Promise.all([
      userStore.fetchUser(newUser.uid),
      playerStore.fetchPlayerData(), // No arguments needed, fetches data from Firestore already
    ])
  }
  else {
    userStore.clearUser()
    playerStore.clearPlayerData()
  }
}, { immediate: true }) // Fetch user and player data when user changes)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-2xl font-bold tracking-tight">
          Profile
        </h2>
        <ProfileInfo />
      </div>
    </div>

    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <!-- Profile card -->
      <Card :style="bannerStyle">
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-md font-medium">
            <NuxtLink to="/profile" class="text-md cursor-pointer font-medium">
              <p class="whitespace-nowrap">
                {{ userStore.username || 'Guest' }}
              </p>
            </NuxtLink><!-- add username {{ username }} -->
          </CardTitle>
          <div class="text-s w-85% flex flex-row items-center justify-end gap-5% text-muted-foreground">
            <!-- Streak value -->
            <div class="flex flex-row items-center gap-2">
              <Zap
                class="h-4 w-4" :class="{
                  'text-rose-500': streakIsPositive(streakValue),
                  'text-muted-foreground': streakValue === 0,
                }"
              />
              <NumberFlow :value="streakValue" />
            </div>
            <!-- Coin value -->
            <div class="flex flex-row items-center gap-2">
              <Coins
                class="h-4 w-4" :class="{
                  'text-yellow-500': coinIsPositive(coinValue),
                  'text-muted-foreground': coinValue === 0,
                }"
              />
              <NumberFlow :value="coinValue" />
            </div>
          </div>
          <User class="ml-2 h-4 min-w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2m font-bold">
            <div class="flex items-center gap-4 max-[400px]:gap-3">
              <!-- Avatar image -->
              <div class="relative h-16 min-w-12 w-16 overflow-hidden rounded-md">
                <img
                  :src="AVATAR_PATHS[selectedAvatar] || AVATAR_PATHS.red" :alt="`Selected avatar: ${selectedAvatar}`"
                  width="64" height="64" class="h-16 w-16 object-contain" loading="eager"
                >
                <!-- https://tailwindcss.com/docs/object-fit class="h-full w-full object-contain" -->
              </div>
              <p class="text-auto max-[400px]:text-sm">
                Lvl.{{ xpStore.level }}
              </p>
              <!-- Shadcn Progress Bar -->
              <div class="mt-6 w-full flex flex-col gap-2">
                <Progress v-model="progressValue" />
                <p class="flex justify-center text-xs text-muted-foreground font-normal">
                  <NumberFlow :value="xpProgressValue" suffix=" XP" />
                  &nbsp;/&nbsp;
                  <NumberFlow :value="xpToNextLevelValue" suffix=" XP" />
                </p>
              </div>

              <p class="text-auto max-[400px]:text-sm">
                Lvl.{{ xpStore.level + 1 }}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <ProfileCarousel />
    </main>
  </div>
</template>
