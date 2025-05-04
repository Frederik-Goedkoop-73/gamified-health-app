<script setup lang="ts">
import type { FitbitActiveZoneMinutes, FitbitCalories, FitbitSimpleSleepLog, FitbitSleep, FitbitSteps } from '~/types/fitbit'
import { useFitbit } from '@/composables/useFitbit'
import { format, subDays } from 'date-fns'
// import NumberFlow from '@number-flow/vue'
import { Trophy } from 'lucide-vue-next'
import QuestCard from '~/components/quests/QuestCard.vue'
import { useQuestStore } from '~/stores/questStore'
import { useQuestProgress } from '../composables/useQuestProgress'

// Stores
const questStore = useQuestStore()
const { fetchFitbitData } = useFitbit()

// State
const fitbit_loading = ref(false)
const fitbit_error = ref(false)

// Creates a reactive variable where type is the expected data structure and initialValue by default
const steps = ref<FitbitSteps['activities-steps']>([])
const sleep = ref<FitbitSimpleSleepLog[]>([])
const calories = ref<FitbitCalories['activities-calories']>([])
const azm = ref<FitbitActiveZoneMinutes['activities-active-zone-minutes']>([])

// Helper for getting dates -> for sleep data and azm
function getDatesThisWeek(): string[] {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay() + 1) // Monday

  const days: string[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + i)
    days.push(format(date, 'yyyy-MM-dd'))
  }
  return days
}

// Computed data structure for quest checking
const fitbitData = computed(() => ({
  steps: steps.value,
  sleep: sleep.value,
  calories: calories.value,
  AZM: azm.value,
  caloriesToday: calories.value.at(-1) ?? { dateTime: '', value: '0' },
  azmToday: azm.value.at(-1) ?? {
    dateTime: '',
    value: { activeZoneMinutes: { fatBurn: 0, cardio: 0, peak: 0 } },
  },
}))

// Fetch data
onMounted(async () => {
  await questStore.fetchQuests()
  try {
    fitbit_loading.value = true

    // 1. Fetch weekly-range data
    const [stepsRaw, caloriesRaw, azmRaw] = await Promise.all([
      fetchFitbitData('activities/steps/date/today/7d') as Promise<FitbitSteps>,
      fetchFitbitData('activities/calories/date/today/7d') as Promise<FitbitCalories>,
      fetchFitbitData('activities/active-zone-minutes/date/today/7d') as Promise<FitbitActiveZoneMinutes>,
    ])

    steps.value = stepsRaw['activities-steps']
    calories.value = caloriesRaw['activities-calories']

    // Normalize AZM to ensure 7-day coverage
    const rawAZM = azmRaw['activities-active-zone-minutes']
    const azmMap = new Map(rawAZM.map(entry => [entry.dateTime, entry]))

    const today = new Date()
    const daysThisWeek = Array.from({ length: 7 }, (_, i) =>
      format(subDays(today, 6 - i), 'yyyy-MM-dd'))

    azm.value = daysThisWeek.map((date) => {
      const raw = azmMap.get(date)

      return {
        dateTime: date,
        value: {
          fatBurnActiveZoneMinutes: raw?.value.fatBurnActiveZoneMinutes ?? 0,
          cardioActiveZoneMinutes: raw?.value.cardioActiveZoneMinutes ?? 0,
          peakActiveZoneMinutes: raw?.value.peakActiveZoneMinutes ?? 0,
        },
      }
    })

    // 2. Fetch daily sleep data for current week
    const datesThisWeek = getDatesThisWeek()
    const sleepResponses = await Promise.all(
      datesThisWeek.map(date =>
        fetchFitbitData<FitbitSleep>(`sleep/date/${date}`),
      ),
    )

    const allSleep: FitbitSimpleSleepLog[] = sleepResponses.flatMap(resp =>
      resp.sleep.map(({ dateOfSleep, duration }) => ({ dateOfSleep, duration })),
    )

    sleep.value = allSleep

    fitbit_loading.value = false
  }
  catch (err) {
    console.error('Error fetching Fitbit data:', err)
    fitbit_error.value = true
    fitbit_loading.value = false
  }
})

// Quest progress
const { dailyQuestProgress, weeklyQuestProgress } = useQuestProgress(fitbitData)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Quests
      </h2>
      <i class="m-3 text-muted-foreground"><b>Tip: </b>Hover over a quest to see more info</i>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <!-- Daily quests -->

      <Card class="xl:col-span-2">
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
            :progress-text="`${info.progress} / ${info.quest.target} ${info.quest.activity}`"
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
            :progress-text="`${info.progress} / ${info.quest.target} ${info.quest.activity}`"
            :rewardxp="`+${info.quest.rewardXP} XP`"
            :rewardcoins="info.quest.rewardCoins"
            :completed="info.completed"
            :claimed="info.quest.claimed ?? false"
            :percentage="info.percentage"
            :tooltip="`${info.quest.title.toLowerCase()} before Sunday 24:00`"
            :difficulty="info.quest.difficulty ?? 'normal'"
            :icon="info.quest.icon"
          />
        </cardcontent>
        <CardFooter class="text-s text-muted-foreground font-semibold">
          New weekly quests in: &nbsp;<strong>{{ questStore.countdownToWeeklyReset }}</strong>
        </CardFooter>
      </Card>
    </main>
  </div>
</template>
