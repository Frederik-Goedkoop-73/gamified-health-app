<script setup lang="ts">
// import NumberFlow from '@number-flow/vue'
import { Trophy } from 'lucide-vue-next'
import QuestCard from '~/components/quests/QuestCard.vue'
import { useFitbitCachedData } from '~/composables/useFitbitCachedData'
import { useQuestStore } from '~/stores/questStore'
import { useQuestProgress } from '../composables/useQuestProgress'

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

onMounted(async () => {
  await fetchData()
  await questStore.fetchQuests()
})

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

// Quest progress
const { dailyQuestProgress, weeklyQuestProgress } = useQuestProgress(fitbitData)

async function syncChartData() {
  const { clear } = useLocalCache('fitbit-weekly', 0)
  clear() // Clear the existing cache

  await fetchData() // Refetch and repopulate cache
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Quests
      </h2>
      <i class="m-3 text-muted-foreground"><b>Tip: </b>Hover over a quest to see more info</i>
      <div class="flex items-center space-x-2">
        <Button class="flex items-center gap-2" @click="syncChartData">
          <span v-if="!fitbit_loading">Sync Latest Data</span>
          <span v-else>Syncing...</span>
        </Button>
      </div>
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
        </cardcontent>
        <CardFooter class="text-s text-muted-foreground font-semibold">
          New weekly quests in: &nbsp;<strong>{{ questStore.countdownToWeeklyReset }}</strong>
        </CardFooter>
      </Card>
    </main>
  </div>
</template>
