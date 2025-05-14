<script setup lang="ts">
import { useAuth } from '@/composables/UseAuth'
import { useFitbitAuth } from '@/composables/useFitbitAuth'
import { useCoinStore } from '@/stores/coinStore'
import { usePlayerStore } from '@/stores/playerStore'
import { useStreakStore } from '@/stores/streakStore'
import { useUserStore } from '@/stores/userStore'
import { useXPStore } from '@/stores/xpStore'
import NumberFlow from '@number-flow/vue'
import { format } from 'date-fns'
import { Coins, FileText, Trophy, User, Zap } from 'lucide-vue-next'
import ConnectAccounts from '~/components/auth/ConnectAccounts.vue'
import HealthSummaryCard from '~/components/health/HealthSummaryCard.vue'
import QuestCard from '~/components/quests/QuestCard.vue'
import { AVATAR_PATHS } from '~/components/tasks/data/avatarData'
import { isBannerId } from '~/components/tasks/data/bannerData'
import { useToast } from '~/components/ui/toast/use-toast'
import { useFitbitCachedData } from '~/composables/useFitbitCachedData'
import { useQuestProgress } from '~/composables/useQuestProgress'
import { useQuestStore } from '~/stores/questStore'

// Check fitbit auth state
const fitbitConnected = useFitbitAuth().isFitbitConnected

// For sumamry cards
const {
  /* stepsData,
  distanceData,
  sleepData, */
  heartData,
  /*   zoneData,
  caloriesData, */
  steps,
  distance,
  sleep,
  calories,
  azm,
  fetchData,
} = useFitbitCachedData()

/* const totalSteps = computed(() =>
  fitbitConnected.value
    ? stepsData.value.reduce((s, d) => s + d.steps, 0)
    : 0,
)
const totalDistance = computed(() =>
  fitbitConnected.value
    ? Math.floor(distanceData.value.reduce((sum, d) => sum + d.distance, 0))
    : 0,
)
const totalCalories = computed(() =>
  fitbitConnected.value
    ? caloriesData.value.reduce((sum, d) => sum + d.calories, 0)
    : 0,
)
const totalAZM = computed(() =>
  fitbitConnected.value
    ? zoneData.value.reduce((sum, d) => sum + d.minutes, 0)
    : 0,
)
const avgSleep = computed(() => {
  if (!fitbitConnected.value || sleepData.value.length === 0)
    return '0h00m'

  const totalHours = sleepData.value.reduce((sum, d) => sum + d.sleepHours, 0)
  const avgMinutes = Math.round((totalHours / sleepData.value.length) * 60)
  const hours = Math.floor(avgMinutes / 60)
  const minutes = avgMinutes % 60

  return `${hours}h${minutes.toString().padStart(2, '0')}m`
})
const avgHeartRate = computed(() => {
  if (!fitbitConnected.value)
    return '0'
  const filtered = heartData.value.filter(d => d.restingHeartRate >= 10)
  if (filtered.length === 0)
    return '0'
  const sum = filtered.reduce((s, d) => s + d.restingHeartRate, 0)
  return (sum / filtered.length).toFixed(0)
}) */

// For quest progress
const fitbitData = computed(() => ({
  steps: steps.value ?? [],
  distance: (distance.value ?? []).map(({ dateTime, value }) => ({
    dateTime,
    value: Number(Number(value).toFixed(2)),
  })),
  sleep: (sleep.value ?? []).map(({ dateOfSleep, duration }) => ({ dateOfSleep, duration })),
  calories: calories.value ?? [],
  AZM: azm.value ?? [],
  caloriesToday: calories.value.at(-1) ?? { dateTime: '', value: '0' },
  azmToday: azm.value.at(-1) ?? {
    dateTime: '',
    value: { fatBurnActiveZoneMinutes: 0, cardioActiveZoneMinutes: 0, peakActiveZoneMinutes: 0 },
  },
}))

// For summary today
const today = format(new Date(), 'yyyy-MM-dd')

// Steps today
const stepsToday = computed(() => {
  return Number(fitbitData.value.steps.find(d => d.dateTime === today)?.value ?? 0)
})

// Distance today (in km)
const distanceToday = computed(() => {
  return Number(fitbitData.value.distance.find(d => d.dateTime === today)?.value ?? 0).toFixed(2)
})

// Total sleep today
const sleepToday = computed(() => {
  const duration = fitbitData.value.sleep.find(d => d.dateOfSleep === today)?.duration ?? 0
  const totalMinutes = Math.round(duration / 60000)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h${minutes.toString().padStart(2, '0')}m`
})

// Calories burned today
const caloriesToday = computed(() => {
  return Number(fitbitData.value.caloriesToday?.value ?? 0)
})

// Active Zone Minutes today
const azmToday = computed(() => {
  const today = format(new Date(), 'yyyy-MM-dd')
  const todayEntry = fitbitData.value.AZM.find(entry => entry.dateTime === today)

  if (!todayEntry)
    return 0

  const { fatBurnActiveZoneMinutes = 0, cardioActiveZoneMinutes = 0, peakActiveZoneMinutes = 0 } = todayEntry.value

  return fatBurnActiveZoneMinutes + cardioActiveZoneMinutes + peakActiveZoneMinutes
})

// Average heart rate
const avgHeartRate = computed(() => {
  if (!fitbitConnected.value)
    return '0'
  const filtered = heartData.value.filter(d => d.restingHeartRate >= 10)
  if (filtered.length === 0)
    return '0'
  const sum = filtered.reduce((s, d) => s + d.restingHeartRate, 0)
  return (sum / filtered.length).toFixed(0)
})

// Initialise the composables
const { user } = useAuth()
const { toast } = useToast()

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
const questStore = useQuestStore()
const { dailyQuestProgress } = useQuestProgress(fitbitData)

// Function for checking if values aren't 0 -> styling
const streakIsPositive = (streakValue: number) => streakValue > 0
const coinIsPositive = (coinValue: number) => coinValue > 0

// Computed values for profile banner
const bannerId = computed(() =>
  typeof playerStore.selectedBanner === 'string' && isBannerId(playerStore.selectedBanner)
    ? playerStore.selectedBanner
    : undefined,
)
const bannerStyle = computed(() =>
  bannerId.value ? getBannerInlineStyle(bannerId.value) : undefined,
)

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

onMounted(async () => {
  await fetchData()
  await questStore.fetchQuests()
})

// For data fetch on sync button click
const fitbit = useFitbitCachedData()
const clearCacheAndFetch = fitbit.clearCacheAndFetch!
const syncing = ref(false)

async function sync() {
  try {
    syncing.value = true
    await clearCacheAndFetch()

    // Delay reload to allow button state to update in DOM
    setTimeout(() => {
      window.location.reload()
    }, 100)
  }
  catch (error) {
    console.error('Error syncing data:', error)
  }
  finally {
    syncing.value = false
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Dashboard
      </h2>
      <div class="flex items-center space-x-2">
        <Button
          v-if="fitbitConnected"
          :disabled="syncing"
          class="flex items-center gap-2"
          @click="() => sync()"
        >
          <span v-if="!syncing">Sync Latest Data</span>
          <span v-else>Syncing...</span>
        </Button>
      </div>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <ConnectAccounts />
      <!-- Profile card -->
      <Card :style="bannerStyle">
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
            <div class="flex items-center gap-4">
              <!-- Avatar image -->
              <div class="relative h-16 w-16 overflow-hidden rounded-md">
                <img
                  :src="AVATAR_PATHS[selectedAvatar] || AVATAR_PATHS.red" :alt="`Selected avatar: ${selectedAvatar}`"
                  width="64" height="64" class="h-16 w-16 object-contain" loading="eager"
                >
                <!-- https://tailwindcss.com/docs/object-fit class="h-full w-full object-contain" -->
              </div>
              <p>Lvl.{{ xpStore.level }}</p>
              <!-- Shadcn Progress Bar -->
              <div class="mt-6 w-full flex flex-col gap-2">
                <Progress v-model="progressValue" />
                <p class="flex justify-center text-xs text-muted-foreground font-normal">
                  <NumberFlow :value="xpProgressValue" suffix=" XP" />
                  &nbsp;/&nbsp;
                  <NumberFlow :value="xpToNextLevelValue" suffix=" XP" />
                </p>
              </div>

              <p>Lvl.{{ xpStore.level + 1 }}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Grid 2 card underneath -->
      <div class="grid gap-4 overflow-clip lg:grid-cols-2 xl:grid-cols-3 md:gap-8">
        <!-- Health card -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between pb-6 space-y-0">
            <CardTitle>Today's Health Summary</CardTitle>
            <FileText class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent class="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 text-center text-black dark:text-white">
            <HealthSummaryCard
              title="Steps"
              :value="stepsToday"
              suffix=" steps"
              icon="Footprints"
            />
            <HealthSummaryCard
              title="Distance"
              :value="Number(distanceToday) || 0"
              suffix=" km"
              icon="Ruler"
            />
            <HealthSummaryCard
              title="Sleep"
              :value="0"
              suffix=""
              :sleep="sleepToday"
              icon="MoonStar"
            />
            <HealthSummaryCard
              title="Calories Burned"
              :value="caloriesToday"
              suffix=" kcal"
              icon="Flame"
            />
            <HealthSummaryCard
              title="Active Zone Minutes"
              :value="azmToday"
              suffix=" min"
              icon="Zap"
            />
            <HealthSummaryCard
              title="Avg Heart Rate"
              :value="Number(avgHeartRate) || 0"
              suffix=" bpm"
              icon="HeartPulse"
            />
          </CardContent>
        </Card>

        <!-- Daily quests card -->
        <Card class="flex flex-col justify-between xl:col-span-2">
          <CardHeader class="flex flex-row items-center justify-between pb-4 space-y-0">
            <CardTitle>Daily Quests</CardTitle>
            <Trophy class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent v-if="fitbitConnected" class="flex grow-2 flex-col justify-between gap-4 pt-2">
            <QuestCard
              v-for="info in dailyQuestProgress" :id="info.quest.id" :key="info.quest.id"
              :title="info.quest.title" :progress-text="`${info.progress} / ${info.quest.target} ${info.quest.unit}`"
              :rewardxp="`+${info.quest.rewardXP} XP`" :rewardcoins="info.quest.rewardCoins" :completed="info.completed"
              :claimed="info.quest.claimed ?? false" :percentage="info.percentage"
              :tooltip="`${info.quest.title.toLowerCase()} before 24:00`"
              :difficulty="info.quest.difficulty ?? 'normal'" :icon="info.quest.icon"
              :dashboard="true"
            />
          </CardContent>
          <CardContent
            v-else
            class="h-full flex flex-col items-center justify-center px-4 py-8 text-center text-muted-foreground space-y-2"
          >
            <span class="text-lg font-medium">Please connect to Google and Fitbit</span>
            <span class="text-sm">This content can only be rendered once a user has been found.</span>
          </CardContent>
          <CardFooter v-if="fitbitConnected" class="text-s text-muted-foreground font-semibold">
            New daily quests in: <strong>&nbsp;{{ questStore.countdownToDailyReset }}</strong>
          </CardFooter>
        </Card>
      </div>
    </main>
  </div>
</template>
