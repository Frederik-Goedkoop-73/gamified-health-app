<script setup lang="ts">
import type { IconName } from '~/components/health/HealthCarouselTabs.vue'
import BarChart from '@/components/dashboard/BarChart.vue'
import LineChart from '@/components/dashboard/LineChart.vue'
// Charts
import HealthChartCarousel from '@/components/health/HealthChartCarousel.vue'
import HealthLoader from '@/components/health/HealthLoader.vue'

import { useFitbitAuth } from '@/composables/useFitbitAuth'
import { useFitbitCachedData } from '@/composables/useFitbitCachedData'

// Check fitbit auth state
const fitbitConnected = useFitbitAuth().isFitbitConnected

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
    footerText: `Total Distance: ${Math.floor(distanceData.value.reduce((s, d) => s + d.distance, 0))} km`,
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

// For data fetch on sync button click
const fitbit = useFitbitCachedData()
const clearCacheAndFetch = fitbit.clearCacheAndFetch!
const syncing = ref(false)

async function sync() {
  try {
    syncing.value = true
    clearCacheAndFetch()
    window.location.reload()
  }
  catch (error) {
    console.error('Error clearing cache:', error)
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
        Health Stats
      </h2>
      <i v-if="fitbitConnected" class="m-3 text-muted-foreground"><b>Tip: </b>Sync in the Fitbit app before syncing here!</i>
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
      <!-- Everything below only renders client-side after hydration -->
      <client-only>
        <AuthConnectAccounts />
        <HealthChartCarousel v-if="!fitbit_loading && !fitbit_error && profile" :charts="chartData" />
        <Card v-else-if="fitbit_loading" class="h-48 flex items-center justify-center">
          <p class="text-sm text-muted-foreground">
            Loading charts...
          </p>
        </Card>
      </client-only>
      <!-- Render loading/error state immediately -->
      <HealthLoader v-if="fitbit_loading || fitbit_error" :loading="fitbit_loading" :error="fitbit_error" />
    </main>
  </div>
</template>
