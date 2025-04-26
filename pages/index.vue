<script setup lang="ts">
import type { FitbitHeart, FitbitProfile, FitbitSleep, FitbitSteps } from '~/types/fitbit'
import { useAuth } from '@/composables/UseAuth'
import { useFitbit } from '@/composables/useFitbit'
import { useCoinStore } from '@/stores/coinStore'
import { usePlayerStore } from '@/stores/playerStore'
import { useStreakStore } from '@/stores/streakStore'
import { useUserStore } from '@/stores/userStore'
import { useXPStore } from '@/stores/xpStore'
import NumberFlow from '@number-flow/vue'
import { Activity, Coins, User, Zap } from 'lucide-vue-next'
import FitbitAuth from '~/components/auth/ConnectAccounts.vue'
import { useToast } from '~/components/ui/toast/use-toast'
import { AVATAR_PATHS } from '~/types/player'

const dataCard = ref({
  totalRevenue: 0,
  totalRevenueDesc: 0,
  subscriptions: 0,
  subscriptionsDesc: 0,
  sales: 0,
  salesDesc: 0,
  activeNow: 0,
  activeNowDesc: 0,
})

const dataRecentSales = [
  {
    name: 'Daily 1',
    email: 'Walk 10k steps',
    amount: 100,
  },
  {
    name: 'Daily 2',
    email: 'Ride 10 km',
    amount: 200,
  },
  {
    name: 'Daily 3',
    email: 'Run 5 km',
    amount: 500,
  },
]

// Initialise the composables
const { user } = useAuth()
const { fetchFitbitData } = useFitbit()
const { toast } = useToast()

// Cookies
const fitbitToken = useCookie('fitbit_access_token')

// Fitbit reactive values
const profile = ref<FitbitProfile | null>(null)
const steps = ref<FitbitSteps['activities-steps']>([])
const sleep = ref<FitbitSleep['sleep']>([])
const heart = ref<FitbitHeart['activities-heart']>([])

// Loading and error states
const fitbit_loading = ref(true)
const fitbit_error = ref(false)

// Initialise the Pinia store
const xpStore = useXPStore()
const coinStore = useCoinStore()
const streakStore = useStreakStore()
const userStore = useUserStore()
const playerStore = usePlayerStore()

const { selectedAvatar } = storeToRefs(playerStore)

// Computed values for number-flow animation
const progressValue = computed(() => xpStore.xpProgress)
const xpProgressValue = computed(() => xpStore.xp)
const xpToNextLevelValue = computed(() => xpStore.totalXpNeededForNextLevel)
const streakValue = computed(() => streakStore.streak)
const coinValue = computed(() => coinStore.coins)

// Function for checking if values aren't 0 -> styling
const streakIsPositive = (streakValue: number) => streakValue > 0
const coinIsPositive = (coinValue: number) => coinValue > 0

// Auth: Fetch additional data when user is available
watch(() => user.value, async (newUser) => {
  if (newUser) {
    await userStore.fetchUser(newUser.uid)
    // Load other data here if needed
  }
  else {
    userStore.clearUser()
  }
}, { immediate: true })

// XP: watch for level up popups
watch(() => xpStore.showPopup, (show, prevShow) => {
  if (show && !prevShow) { // Only trigger when changing from false to true
    toast({
      title: 'Level Up!',
      description: `You have reached level ${xpStore.leveledUpTo}!`,
    })
    // Close the popup after showing the toast
    xpStore.closePopup()
  }
}, { immediate: true })

// Player: watch for avatar changes
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
}, { immediate: true })

// Fitbit: Fetch access token for loading Fitbit data
watchEffect(async () => {
  if (!fitbitToken.value) {
    fitbit_loading.value = false
    console.warn('No Fitbit token available:', fitbitToken.value)
    return
  }

  try {
    fitbit_loading.value = true

    const profileData = await fetchFitbitData<FitbitProfile>('profile')
    const stepsData = await fetchFitbitData<FitbitSteps>('activities/steps/date/today/7d')
    const heartData = await fetchFitbitData<FitbitHeart>('activities/heart/date/today/7d')
    const sleepData = await fetchFitbitData<FitbitSleep>('sleep/date/today')

    profile.value = profileData
    steps.value = stepsData['activities-steps']
    heart.value = heartData['activities-heart']
    sleep.value = sleepData.sleep

    fitbit_error.value = false
  }
  catch (err) {
    console.error('Failed to load Fitbit data:', err)
    fitbit_error.value = true
  }
  finally {
    fitbit_loading.value = false
  }
})

onMounted(() => {
  dataCard.value = {
    totalRevenue: 45231.89,
    totalRevenueDesc: 20.1 / 100,
    subscriptions: 2350,
    subscriptionsDesc: 180.5 / 100,
    sales: 12234,
    salesDesc: 45 / 100,
    activeNow: 573,
    activeNowDesc: 201,
  }
})
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Dashboard
      </h2>
      <div class="flex items-center space-x-2">
        <BaseDateRangePicker />
        <!-- <Button>Download</Button> -->
      </div>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <FitbitAuth />

      <!-- Fitbit Authenticated content -->
      <Card v-if="!fitbit_loading && !fitbit_error && profile">
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-lg font-semibold">
            Fitbit Profile
          </CardTitle>
          <User class="h-5 w-5 text-muted-foreground" />
        </CardHeader>

        <CardContent class="flex flex-col gap-4">
          <!-- Profile Info -->
          <div class="flex flex-row items-center gap-4">
            <img
              :src="profile.user.avatar || 'https://via.placeholder.com/150'"
              :alt="`Avatar of ${profile.user.displayName}`"
              class="h-12 w-12 rounded-full object-cover"
            >
            <div>
              <p class="text-lg font-semibold">
                {{ profile.user.displayName }}
              </p>
              <p class="text-sm text-muted-foreground">
                {{ profile.user.email || 'N/A' }}
              </p>
            </div>
          </div>

          <div class="text-sm text-muted-foreground">
            <p><strong>Full Name:</strong> {{ profile.user.fullName || 'N/A' }}</p>
            <p><strong>Member Since:</strong> {{ profile.user.memberSince || 'N/A' }}</p>
            <p><strong>Height:</strong> {{ profile.user.height || 'N/A' }} cm</p>
            <p><strong>Weight:</strong> {{ profile.user.weight || 'N/A' }} kg</p>
            <p><strong>Age:</strong> {{ profile.user.age || 'N/A' }} years</p>
            <p><strong>EncodedId:</strong> {{ profile.user.encodedId || 'N/A' }}</p>
          </div>

          <!-- Steps Section -->
          <div>
            <h3 class="text-md mb-2 font-semibold">
              Steps (Last 7 Days)
            </h3>
            <ul class="list-disc list-inside text-sm space-y-1">
              <li v-for="day in steps" :key="day.dateTime">
                {{ day.dateTime }}: {{ day.value }} steps
              </li>
            </ul>
          </div>

          <!-- Sleep Section -->
          <div>
            <h3 class="text-md mb-2 font-semibold">
              Sleep (Today)
            </h3>
            <ul class="list-disc list-inside text-sm space-y-1">
              <li v-for="night in sleep" :key="night.dateOfSleep">
                {{ night.dateOfSleep }}: {{ (night.duration / 3600000).toFixed(1) || 'N/A' }} hours
              </li>
            </ul>
          </div>

          <!-- Heart Rate Section -->
          <div>
            <h3 class="text-md mb-2 font-semibold">
              Heart Rate (Last 7 Days)
            </h3>
            <ul class="list-disc list-inside text-sm space-y-1">
              <li v-for="day in heart" :key="day.dateTime">
                {{ day.dateTime }}: {{ day.value.restingHeartRate || 'N/A' }} bpm
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <!-- Loading and Error states -->
      <div v-else-if="fitbit_loading" class="h-48 flex items-center justify-center">
        <p class="text-sm text-muted-foreground">
          Loading Fitbit data...
        </p>
      </div>

      <div v-else-if="fitbit_error" class="h-48 flex items-center justify-center">
        <p class="text-sm text-red-500">
          Failed to load Fitbit data. Please try reconnecting.
        </p>
      </div>

      <!-- Profile card -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-md font-medium">
            <NuxtLink to="/profile" class="text-md cursor-pointer font-medium">
              <p>{{ userStore.username || 'Guest' }}</p>
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
              <NumberFlow
                :value="streakValue"
              />
            </div>
            <!-- Coin value -->
            <div class="flex flex-row items-center gap-2">
              <Coins
                class="h-4 w-4" :class="{
                  'text-yellow-500': coinIsPositive(coinValue),
                  'text-muted-foreground': coinValue === 0,
                }"
              />
              <NumberFlow
                :value="coinValue"
              />
            </div>
          </div>
          <User class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="text-2m font-bold">
            <div class="flex items-center gap-4">
              <!-- Avatar image -->
              <div class="relative h-16 w-16 overflow-hidden rounded-md">
                <img
                  :src="AVATAR_PATHS[selectedAvatar] || AVATAR_PATHS.red"
                  :alt="`Selected avatar: ${selectedAvatar}`"
                  class="h-full w-full object-contain"
                > <!-- https://tailwindcss.com/docs/object-fit -->
              </div>
              <p>Lvl.{{ xpStore.level }}</p>
              <!-- Shadcn Progress Bar -->
              <div class="mt-6 w-full flex flex-col gap-2">
                <Progress v-model="progressValue" />
                <p class="flex justify-center text-xs text-muted-foreground font-normal">
                  <NumberFlow
                    :value="xpProgressValue" suffix=" XP"
                  />
                  &nbsp;/&nbsp;
                  <NumberFlow
                    :value="xpToNextLevelValue" suffix=" XP"
                  />
                </p>
              </div>

              <p>Lvl.{{ xpStore.level + 1 }}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Devtools -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle class="text-md font-medium">
            <NuxtLink to="/profile" class="text-md cursor-pointer font-medium">
              Devtools
            </NuxtLink>
          </CardTitle>
          <User class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div class="flex-container justify">
            <div class="mt-4 flex flex-row flex-wrap justify-center gap-4">
              <Button class="min-w-60 w-32%" @click="xpStore.addXP(10)">
                Gain 10 XP
              </Button>
              <Button class="min-w-60 w-32%" @click="xpStore.addXP(100)">
                Gain 100 XP
              </Button>
              <Button class="min-w-60 w-32%" @click="xpStore.addXP(1000)">
                Gain 1000 XP
              </Button>
            </div>
            <div class="mt-4 flex flex-row flex-wrap justify-center gap-4">
              <Button class="min-w-60 w-32%" @click="streakStore.addStreak(1)">
                Gain 1 streak
              </Button>
              <Button class="min-w-60 w-32%" @click="streakStore.addStreak(10)">
                Gain 10
                streak
              </Button>
              <Button class="min-w-60 w-32%" @click="streakStore.addStreak(100)">
                Gain 100
                streak
              </Button>
            </div>
            <div class="mt-4 flex flex-row flex-wrap justify-center gap-4">
              <Button class="min-w-60 w-32%" @click="coinStore.addCoins(10)">
                Gain 10 coins
              </Button>
              <Button class="min-w-60 w-32%" @click="coinStore.addCoins(100)">
                Gain 100 coins
              </Button>
              <Button class="min-w-60 w-32%" @click="coinStore.addCoins(1000)">
                Gain 1000 coins
              </Button>
            </div>
            <div class="mt-4 flex flex-row items-center justify-center">
              <Button
                class="w-100% bg-rose-600 lg:w-32% md:w-70% hover:bg-rose-500"
                @click="xpStore.resetXP(); streakStore.resetStreak(); coinStore.resetCoins()"
              >
                Reset all
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Grid 2 card underneath -->
      <div class="grid gap-4 overflow-clip lg:grid-cols-2 xl:grid-cols-3 md:gap-8">
        <!-- Graph card -->
        <Card class="xl:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent class="flex justify-center pl-2">
            <DashboardBarChart class="max-w-97%" />
          </CardContent>
        </Card>

        <!-- Daily quests card -->
        <Card>
          <CardHeader>
            <CardTitle>Daily Quests</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-8">
            <Card v-for="recentSales in dataRecentSales" :key="recentSales.name" class="flex items-center gap-4 p-4">
              <div class="hidden h-9 w-9 sm:flex">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0" /><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M18.5 6C19.8807 6 21 4.88071 21 3.5C21 2.11929 19.8807 1 18.5 1C17.1193 1 16 2.11929 16 3.5C16 4.88071 17.1193 6 18.5 6Z" fill="hsl(var(--primary))" /> <path d="M9.49967 3.9377L7.47 5.20625C7.11268 5.42957 7 5.79894 7 6.19575C7 6.98119 7.86395 7.46003 8.53 7.04375L10.4185 5.86341C10.7689 5.64441 11.218 5.66348 11.5485 5.91141L13 7L9.29261 10.7074C9.09787 10.9021 8.91955 11.1126 8.75947 11.3367L6.94614 13.8754C6.683 14.2438 6.20519 14.3894 5.78129 14.2305L3.21008 13.2663C2.7942 13.1103 2.3257 13.2614 2.07933 13.631C1.76802 14.098 1.92419 14.7314 2.41688 15.0001L4.88909 16.3486C6.12269 17.0215 7.65806 16.7479 8.58338 15.6904L10.5 13.5L12.3001 16.0201C12.7307 16.623 12.7928 17.4144 12.4615 18.077L10.7236 21.5528C10.3912 22.2177 10.8746 23 11.618 23C12.0887 23 12.5417 22.9167 12.7764 22.4472L14.7476 18.5049C15.2149 17.5701 15.1622 16.4595 14.6083 15.5732L13 13L16 10L17.3722 10.9148C18.6066 11.7378 19.9731 11.6756 21.3162 11.2279C21.7813 11.0729 22 10.6447 22 10.1805C22 9.56252 21.4451 9.09248 20.8356 9.19407C20.1453 9.30911 19.1462 9.69488 18.6352 9.01366C16.9655 6.78731 14.9948 5.21933 12.5466 3.85922C11.5923 3.32907 10.4254 3.35913 9.49967 3.9377Z" fill="hsl(var(--primary))" /> </g></svg>
              </div>
              <div class="grid gap-1">
                <p class="text-md font-medium leading-none">
                  {{ recentSales.name }}
                </p>
                <p class="text-sm text-muted-foreground">
                  {{ recentSales.email }}
                </p>
              </div>
              <div class="ml-auto font-medium">
                <NumberFlow
                  :value="recentSales.amount"
                  prefix="+ " suffix="xp"
                />
              </div>
            </Card>
          </CardContent>
        </Card>
      </div>

      <hr>

      <!-- Other dashboard cards -> may be deleted -->
      <div class="grid gap-4 lg:grid-cols-4 md:grid-cols-2 md:gap-8">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Heart beat increase
            </CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow
                :value="20"
                prefix="+" suffix=" bpm"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              <NumberFlow
                :value="dataCard.totalRevenueDesc" prefix="+"
                :format="{ style: 'percent', minimumFractionDigits: 1 }"
              />
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Heart beat increase
            </CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow
                :value="15"
                prefix="+" suffix=" bpm"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              <NumberFlow
                :value="dataCard.subscriptionsDesc" prefix="+"
                :format="{ style: 'percent', minimumFractionDigits: 1 }"
              /> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Heart beat increase
            </CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow
                :value="30"
                prefix="+" suffix=" bpm"
              />
            </div>
            <p class="text-xs text-muted-foreground">
              <NumberFlow
                :value="dataCard.salesDesc" prefix="+"
                :format="{ style: 'percent', minimumFractionDigits: 1 }"
              /> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle class="text-sm font-medium">
              Heart beat increase
            </CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              <NumberFlow :value="30" prefix="-" suffix=" bpm" />
            </div>
            <p class="text-xs text-muted-foreground">
              <NumberFlow :value="12" prefix="-" /> since last hour
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  </div>
</template>
