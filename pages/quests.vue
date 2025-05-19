<script setup lang="ts">
// import NumberFlow from '@number-flow/vue'
import { useFitbitAuth } from '@/composables/useFitbitAuth'
import { useQuestProgress } from '@/composables/useQuestProgress'
import { Trophy } from 'lucide-vue-next'
import QuestInfo from '~/components/info/QuestInfo.vue'
import QuestCard from '~/components/quests/QuestCard.vue'
import { useFitbitCachedData } from '~/composables/useFitbitCachedData'
import { useQuestStore } from '~/stores/questStore'
import { useHealthTotals } from '../composables/useHealthTotals'

// Check fitbit auth state
const fitbitConnected = useFitbitAuth().isFitbitConnected
const { updateThisWeeksTotals } = useHealthTotals()

// Stores
const questStore = useQuestStore()
const {
  fitbit_loading,
  fetchData,
  steps,
  distance,
  sleep,
  calories,
  azm,
} = useFitbitCachedData()

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

onMounted(async () => {
  await fetchData()
  await questStore.fetchQuests() // Possibly update lock + save to Firebase

  // Wait for the new lock to propagate
  await nextTick()

  updateThisWeeksTotals(fitbitData.value)
})

// Quest progress
const { dailyQuestProgress, weeklyQuestProgress } = useQuestProgress(fitbitData)

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
    <div class="flex flex-wrap items-start justify-between gap-2 sm:flex-col sm:items-start">
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center justify-between gap-2">
          <h2 class="text-2xl font-bold tracking-tight">
            Quests
          </h2>
          <QuestInfo />
        </div>
        <div class="ml-auto flex items-center space-x-2">
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

      <i
        v-if="fitbitConnected"
        class="text-muted-foreground sm:mt-2"
      >
        <b>Tip: </b>Get Distance through Running or Walking
      </i>
    </div>
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <AuthConnectAccounts />
      <!-- Daily quests -->
      <Card class="xl:col-span-2">
        <!-- v-if="fitbitConnected" -->
        <!-- Daily quests -->
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Daily Quests</CardTitle>
          <Trophy class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="flex flex-row flex-wrap items-center justify-center gap-x-10% gap-y-4 pt-2">
          <!-- Add daily quests here -->
          <QuestCard
            v-for="info in dailyQuestProgress"
            :id="info.quest.id"
            :key="info.quest.id"
            :title="info.quest.title"
            :progress-text="`${info.progress} / ${info.quest.target} ${info.quest.unit}`"
            :rewardxp="`+${info.quest.rewardXP} XP`"
            :rewardcoins="info.quest.rewardCoins"
            :completed="info.completed"
            :claimed="info.quest.claimed ?? false"
            :percentage="info.percentage"
            :tooltip="`${info.quest.title.toLowerCase()} before 24:00`"
            :difficulty="info.quest.difficulty ?? 'normal'"
            :icon="info.quest.icon"
          />
        </CardContent>
        <CardFooter class="text-s text-muted-foreground font-semibold">
          New daily quests in: &nbsp;<strong> {{ questStore.countdownToDailyReset }}</strong>
        </CardFooter>
        <hr>

        <!-- Weekly quests -->
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Weekly Quests</CardTitle>
          <Trophy class="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent class="flex flex-row flex-wrap items-center justify-center gap-x-10% gap-y-4 pt-2">
          <!-- Add weekly quests here -->
          <QuestCard
            v-for="info in weeklyQuestProgress"
            :id="info.quest.id"
            :key="info.quest.id"
            :title="info.quest.title"
            :progress-text="`${info.progress} / ${info.quest.target} ${info.quest.unit}`"
            :rewardxp="`+${info.quest.rewardXP} XP`"
            :rewardcoins="info.quest.rewardCoins"
            :completed="info.completed"
            :claimed="info.quest.claimed ?? false"
            :percentage="info.percentage"
            :tooltip="`${info.quest.title.toLowerCase()} before Sunday 24:00`"
            :difficulty="info.quest.difficulty ?? 'normal'"
            :icon="info.quest.icon"
          />
        </Cardcontent>
        <CardFooter class="text-s text-muted-foreground font-semibold">
          New weekly quests in: &nbsp;<strong>{{ questStore.countdownToWeeklyReset }}</strong>
        </CardFooter>
      </Card>

      <HealthLoader v-if="fitbit_loading || !fitbitConnected" :loading="fitbit_loading" :error="!fitbitConnected" />
    </main>
  </div>
</template>
