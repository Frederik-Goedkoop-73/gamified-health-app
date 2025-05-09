<script setup lang="ts">
import type { IconName } from '~/components/health/HealthCarouselDots.vue'
import BarChart from '@/components/dashboard/BarChart.vue'
import LineChart from '@/components/dashboard/LineChart.vue'
// Charts
import HealthChartCarousel from '@/components/health/HealthChartCarousel.vue'
import HealthLoader from '@/components/health/HealthLoader.vue'

import HealthProfile from '@/components/health/HealthProfile.vue'
import { useFitbitCachedData } from '@/composables/useFitbitCachedData'

// import NumberFlow from '@number-flow/vue'
// import { HeartPulse } from 'lucide-vue-next'

/* 
const fitbitToken = useCookie('fitbit_access_token')
const { fetchFitbitData } = useFitbit() */

const {
  fitbit_loading,
  fitbit_error,
  fetchData,
  profile,
  stepsData,
  sleepData,
  zoneData,
  caloriesData,
  heartData,
  rawSleep,
  distanceData,
} = useFitbitCachedData()

onMounted(async () => {
  await fetchData()
})

// Sleep hours min format helper function
function formatTotalSleep(data: { sleepHours: number }[]): string {
  const totalMinutes = Math.round(data.reduce((sum, d) => sum + d.sleepHours, 0) * 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h${minutes.toString().padStart(2, '0')}m`
}
const chartData = computed(() => [
  {
    title: 'Steps this week',
    icon: 'Footprints' as IconName,
    chartComponent: BarChart,
    chartProps: { data: stepsData.value, categories: ['steps'], index: 'date' },
    footerText: `Total Steps: ${stepsData.value.reduce((s, d) => s + d.steps, 0)} steps`,
  },
  {
    title: 'Distance (km) this week',
    icon: 'Ruler' as IconName,
    chartComponent: BarChart,
    chartProps: { data: distanceData.value, categories: ['distance'], index: 'date' },
    footerText: `Total Distance: ${distanceData.value.reduce((s, d) => s + d.distance, 0)} km`,
  },
  {
    title: 'Sleep this week',
    icon: 'MoonStar' as IconName,
    chartComponent: BarChart,
    chartProps: {
      data: sleepData.value,
      categories: ['sleepHours'],
      index: 'date',
      tooltipFormatter: (_value: any, _name: string, info: any[]) => {
        const label = info?.[0]?.payload?.sleepLabel
        return [`Sleep hours: ${label}`]
      },
    },
    footerText: `Total Sleep: ${formatTotalSleep(sleepData.value)}`,
  },
  {
    title: 'Zone Minutes',
    icon: 'Zap' as IconName,
    chartComponent: BarChart,
    chartProps: { data: zoneData.value, categories: ['minutes'], index: 'date' },
    footerText: `Total Minutes: ${zoneData.value.reduce((s, d) => s + d.minutes, 0)} m`,
  },
  {
    title: 'Calories Burned',
    icon: 'Flame' as IconName,
    chartComponent: BarChart,
    chartProps: { data: caloriesData.value, categories: ['calories'], index: 'date' },
    footerText: `Total Calories: ${caloriesData.value.reduce((s, d) => s + d.calories, 0)} kcal`,
  },
  {
    title: 'Heart Rate',
    icon: 'HeartPulse' as IconName,
    chartComponent: LineChart,
    chartProps: { data: heartData.value, categories: ['restingHeartRate'], index: 'date' },
    footerText: `Avg HR: ${(
      heartData.value
        .filter(d => d.restingHeartRate >= 10)
        .reduce((s, d) => s + d.restingHeartRate, 0)
        / Math.max(1, heartData.value.filter(d => d.restingHeartRate >= 10).length)
    ).toFixed(0)} bpm`,

  },
])

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
        Health Stats
      </h2>
      <div class="flex items-center space-x-2">
        <!-- <BaseDateRangePicker /> --> <!-- Change to range calendar: RangeCalendar -->
        <!-- <Button>Download</Button> -->
        <Button class="flex items-center gap-2" @click="syncChartData">
          <span v-if="!fitbit_loading">Sync Latest Data</span>
          <span v-else>Syncing...</span>
        </Button>
      </div>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <!-- Everything below only renders client-side after hydration -->
      <client-only>
        <HealthChartCarousel v-if="!fitbit_loading && !fitbit_error && profile" :charts="chartData" />
        <div v-else-if="fitbit_loading" class="h-48 flex items-center justify-center">
          <p class="text-sm text-muted-foreground">
            Loading charts...
          </p>
        </div>
        <AuthConnectAccounts v-else />

        <HealthProfile
          v-if="!fitbit_loading && profile" :profile="profile" :steps="[]" :sleep="rawSleep"
          :heart="[]"
        />
      </client-only>
      <!-- Render loading/error state immediately -->
      <HealthLoader v-if="fitbit_loading || fitbit_error" :loading="fitbit_loading" :error="fitbit_error" />
    </main>
  </div>
</template>
