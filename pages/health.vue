<script setup lang="ts">
import type { FitbitActiveZoneMinutes, FitbitCalories, FitbitHeart, FitbitProfile, FitbitSleep, FitbitSteps } from '~/types/fitbit'
import BarChart from '@/components/dashboard/BarChart.vue'
import LineChart from '@/components/dashboard/LineChart.vue'
// Charts
import HealthChartCarousel from '@/components/health/HealthChartCarousel.vue'
import HealthLoader from '@/components/health/HealthLoader.vue'

import HealthProfile from '@/components/health/HealthProfile.vue'
import { useFitbit } from '@/composables/useFitbit'
import { format, parseISO } from 'date-fns'

// import NumberFlow from '@number-flow/vue'
// import { HeartPulse } from 'lucide-vue-next'

// Access Fitbit token cookie
const fitbitToken = useCookie('fitbit_access_token')
const { fetchFitbitData } = useFitbit()

// State
const fitbit_loading = ref(true)
const fitbit_error = ref(false)
const isSyncing = ref(false)
const profile = ref<FitbitProfile | null>(null)
const steps = ref<FitbitSteps['activities-steps']>([])
const heart = ref<FitbitHeart['activities-heart']>([])
const sleep = ref<FitbitSleep['sleep']>([])

const stepsData = ref<{ date: string, steps: number }[]>([])
const heartData = ref<{ date: string, restingHeartRate: number }[]>([])
const sleepData = ref<{ date: string, duration: number, sleepHours: number, efficiency: number, sleepStages: any }[]>([])
const zoneData = ref<{ date: string, minutes: number }[]>([])
const caloriesData = ref<{ date: string, calories: number }[]>([])
const chartData = ref<{
  title: string
  chartComponent: any
  chartProps: Record<string, any>
  footerText: string
}[]>([])

onMounted(async () => {
  if (!fitbitToken.value) {
    fitbit_loading.value = false
    console.warn('No Fitbit token available.')
    return
  }

  try {
    fitbit_loading.value = true

    const [
      profileRaw,
      stepsRaw,
      heartRaw,
      sleepRaw,
      zoneRaw,
      caloriesRaw,
    ] = await Promise.all([
      fetchFitbitData<FitbitProfile>('profile'),
      fetchFitbitData<FitbitSteps>('activities/steps/date/today/7d'),
      fetchFitbitData<FitbitHeart>('activities/heart/date/today/7d'),
      fetchFitbitData<FitbitSleep>('sleep/date/today'),
      fetchFitbitData<FitbitActiveZoneMinutes>('activities/active-zone-minutes/date/today/7d'),
      fetchFitbitData<FitbitCalories>('activities/calories/date/today/7d'),
    ])

    profile.value = profileRaw
    steps.value = stepsRaw['activities-steps']
    heart.value = heartRaw['activities-heart']
    sleep.value = sleepRaw.sleep

    // Chart Data
    stepsData.value = steps.value.map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      steps: Number(day.value),
    }))
    heartData.value = heart.value.map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      restingHeartRate: day.value.restingHeartRate || 0,
    }))
    sleepData.value = sleep.value.map(night => ({
      date: format(parseISO(night.dateOfSleep), 'EEE'),
      duration: Number((night.duration / 3600000).toFixed(2)),
      sleepHours: night.levels?.summary
        ? Number(((night.levels.summary.deep?.minutes || 0) + (night.levels.summary.light?.minutes || 0) + (night.levels.summary.rem?.minutes || 0)) / 60)
        : 0,
      efficiency: night.efficiency,
      sleepStages: night.levels?.summary || {},
    }))
    zoneData.value = zoneRaw['activities-active-zone-minutes'].map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      minutes: Number(day.value.activeZoneMinutes) || 0,
    }))
    caloriesData.value = caloriesRaw['activities-calories'].map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      calories: Number(day.value) || 0,
    }))

    chartData.value = [
      {
        title: 'Steps this week',
        chartComponent: BarChart,
        chartProps: { data: stepsData.value, categories: ['steps'], index: 'date' },
        footerText: `Avg Steps: ${(stepsData.value.reduce((s, d) => s + d.steps, 0) / stepsData.value.length).toFixed(0)}`,
      },
      {
        title: 'Sleep this week',
        chartComponent: BarChart,
        chartProps: { data: sleepData.value, categories: ['sleepHours'], index: 'date' },
        footerText: `Avg Sleep: ${(sleepData.value.reduce((s, d) => s + d.sleepHours, 0) / sleepData.value.length).toFixed(1)}h`,
      },
      {
        title: 'Heart Rate',
        chartComponent: LineChart,
        chartProps: { data: heartData.value, categories: ['restingHeartRate'], index: 'date' },
        footerText: `Avg HR: ${(heartData.value.reduce((s, d) => s + d.restingHeartRate, 0) / heartData.value.length).toFixed(0)} bpm`,
      },
      {
        title: 'Zone Minutes',
        chartComponent: BarChart,
        chartProps: { data: zoneData.value, categories: ['minutes'], index: 'date' },
        footerText: `Total Minutes: ${zoneData.value.reduce((s, d) => s + d.minutes, 0)}`,
      },
      {
        title: 'Calories Burned',
        chartComponent: BarChart,
        chartProps: { data: caloriesData.value, categories: ['calories'], index: 'date' },
        footerText: `Calories: ${caloriesData.value.reduce((s, d) => s + d.calories, 0)} kcal`,
      },
    ]

    fitbit_error.value = false
  }
  catch (error) {
    console.error('Failed to fetch Fitbit health data:', error)
    fitbit_error.value = true
  }
  finally {
    fitbit_loading.value = false
  }
})

async function syncChartData() {
  if (!fitbitToken.value) {
    console.warn('No Fitbit token available')
    return
  }

  try {
    isSyncing.value = true

    const [stepsRaw, heartRaw, sleepRaw, zoneRaw, caloriesRaw] = await Promise.all([
      fetchFitbitData<FitbitSteps>('activities/steps/date/today/7d'),
      fetchFitbitData<FitbitHeart>('activities/heart/date/today/7d'),
      fetchFitbitData<FitbitSleep>('sleep/date/today'),
      fetchFitbitData<FitbitActiveZoneMinutes>('activities/active-zone-minutes/date/today/7d'),
      fetchFitbitData<FitbitCalories>('activities/calories/date/today/7d'),
    ])

    // Update chart datasets
    stepsData.value = stepsRaw['activities-steps'].map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      steps: Number(day.value),
    }))

    heartData.value = heartRaw['activities-heart'].map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      restingHeartRate: day.value.restingHeartRate || 0,
    }))

    sleepData.value = sleepRaw.sleep.map(night => ({
      date: format(parseISO(night.dateOfSleep), 'EEE'),
      duration: Number((night.duration / 3600000).toFixed(2)),
      sleepHours: night.levels?.summary
        ? Number(((night.levels.summary.deep?.minutes || 0) + (night.levels.summary.light?.minutes || 0) + (night.levels.summary.rem?.minutes || 0)) / 60)
        : 0,
      efficiency: night.efficiency,
      sleepStages: night.levels?.summary || {},
    }))

    zoneData.value = zoneRaw['activities-active-zone-minutes'].map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      minutes: Number(day.value.activeZoneMinutes) || 0,
    }))

    caloriesData.value = caloriesRaw['activities-calories'].map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      calories: Number(day.value) || 0,
    }))

    // Update the chart configurations
    chartData.value = [
      {
        title: 'Steps this week',
        chartComponent: BarChart,
        chartProps: { data: stepsData.value, categories: ['steps'], index: 'date' },
        footerText: `Avg Steps: ${(stepsData.value.reduce((s, d) => s + d.steps, 0) / stepsData.value.length).toFixed(0)}`,
      },
      {
        title: 'Sleep this week',
        chartComponent: BarChart,
        chartProps: { data: sleepData.value, categories: ['sleepHours'], index: 'date' },
        footerText: `Avg Sleep: ${(sleepData.value.reduce((s, d) => s + d.sleepHours, 0) / sleepData.value.length).toFixed(1)}h`,
      },
      {
        title: 'Heart Rate',
        chartComponent: LineChart,
        chartProps: { data: heartData.value, categories: ['restingHeartRate'], index: 'date' },
        footerText: `Avg HR: ${(heartData.value.reduce((s, d) => s + d.restingHeartRate, 0) / heartData.value.length).toFixed(0)} bpm`,
      },
      {
        title: 'Zone Minutes',
        chartComponent: BarChart,
        chartProps: { data: zoneData.value, categories: ['minutes'], index: 'date' },
        footerText: `Total Minutes: ${zoneData.value.reduce((s, d) => s + d.minutes, 0)}`,
      },
      {
        title: 'Calories Burned',
        chartComponent: BarChart,
        chartProps: { data: caloriesData.value, categories: ['calories'], index: 'date' },
        footerText: `Calories: ${caloriesData.value.reduce((s, d) => s + d.calories, 0)} kcal`,
      },
    ]
  }
  catch (err) {
    console.error('Failed to sync chart data:', err)
  }
  finally {
    isSyncing.value = false
  }
}
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <h2 class="text-2xl font-bold tracking-tight">
        Health Stats
      </h2>
      <div class="flex items-center space-x-2">
        <BaseDateRangePicker /> <!-- Change to range calendar: RangeCalendar -->
        <!-- <Button>Download</Button> -->
        <Button :disabled="isSyncing" class="flex items-center gap-2" @click="syncChartData">
          <span v-if="!isSyncing">Sync Latest Data</span>
          <span v-else>Syncing...</span>
        </Button>
      </div>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <HealthChartCarousel :charts="chartData" />

      <HealthProfile
        v-if="!fitbit_loading && !fitbit_error && profile" :profile="profile" :steps="steps" :sleep="sleep"
        :heart="heart"
      />

      <HealthLoader v-else-if="fitbit_loading || fitbit_error" :loading="fitbit_loading" :error="fitbit_error" />
    </main>
  </div>
</template>
