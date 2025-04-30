<script setup lang="ts">
import type { IconName } from '@/components/health/HealthCarouselDots.vue'
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

const router = useRouter()
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
const sleepData = ref<{ date: string, sleepHours: number }[]>([])
const zoneData = ref<{ date: string, minutes: number }[]>([])
const caloriesData = ref<{ date: string, calories: number }[]>([])
const chartData = ref<{
  title: string
  icon: IconName
  chartComponent: any
  chartProps: Record<string, any>
  footerText: string
}[]>([])

// Week helper function
function getDatesThisWeek(): string[] {
  const today = new Date()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay() + 1) // Monday

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(startOfWeek)
    d.setDate(startOfWeek.getDate() + i)
    return format(d, 'yyyy-MM-dd')
  })
}

// Sleep hours min format helper function
function formatTotalSleep(data: { sleepHours: number }[]): string {
  const totalMinutes = Math.round(data.reduce((sum, d) => sum + d.sleepHours, 0) * 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${hours}h${minutes.toString().padStart(2, '0')}m`
}

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
      zoneRaw,
      caloriesRaw,
    ] = await Promise.all([
      fetchFitbitData<FitbitProfile>('profile'),
      fetchFitbitData<FitbitSteps>('activities/steps/date/today/7d'),
      fetchFitbitData<FitbitHeart>('activities/heart/date/today/7d'),
      fetchFitbitData<FitbitActiveZoneMinutes>('activities/active-zone-minutes/date/today/7d'),
      fetchFitbitData<FitbitCalories>('activities/calories/date/today/7d'),
    ])

    const weekDates = getDatesThisWeek()

    const sleepResponses = await Promise.all(
      weekDates.map(date =>
        fetchFitbitData<FitbitSleep>(`sleep/date/${date}`),
      ),
    )
    // Card data
    profile.value = profileRaw
    steps.value = stepsRaw['activities-steps']
    heart.value = heartRaw['activities-heart']
    sleep.value = sleepResponses.flatMap(resp => resp.sleep)

    // Map raw data for lookup
    const stepsMap = new Map(steps.value.map(e => [e.dateTime, e]))
    const sleepMap = new Map(sleep.value.map(n => [n.dateOfSleep, n]))
    const zoneMap = new Map(zoneRaw['activities-active-zone-minutes'].map(e => [e.dateTime, e]))
    const calorieMap = new Map(caloriesRaw['activities-calories'].map(e => [e.dateTime, e]))

    // Chart Data: Build weekly-ordered datasets
    stepsData.value = weekDates.map(date => ({
      date: format(parseISO(date), 'EEE'),
      steps: stepsMap.has(date) ? Number(stepsMap.get(date)!.value) : 0,
    }))

    sleepData.value = weekDates.map((date) => {
      const night = sleepMap.get(date)
      const durationMs = night?.duration ?? 0
      const hours = Math.floor(durationMs / 3600000)
      const minutes = Math.round((durationMs % 3600000) / 60000)
      return {
        date: format(parseISO(date), 'EEE'),
        sleepHours: Number((durationMs / 3600000).toFixed(2)), // For charting
        sleepLabel: `${hours}h${minutes.toString().padStart(2, '0')}m`, // For tooltip/legend/etc.
      }
    })

    zoneData.value = weekDates.map((date) => {
      const entry = zoneMap.get(date)
      return {
        date: format(parseISO(date), 'EEE'),
        minutes: entry
          ? (entry.value.fatBurnActiveZoneMinutes ?? 0)
          + (entry.value.cardioActiveZoneMinutes ?? 0)
          + (entry.value.peakActiveZoneMinutes ?? 0)
          : 0,
      }
    })

    caloriesData.value = weekDates.map((date) => {
      const entry = calorieMap.get(date)
      return {
        date: format(parseISO(date), 'EEE'),
        calories: entry ? Number(entry.value) : 0,
      }
    })

    heartData.value = heart.value.map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      restingHeartRate: day.value.restingHeartRate || 0,
    }))

    chartData.value = [
      {
        title: 'Steps this week',
        icon: 'Footprints',
        chartComponent: BarChart,
        chartProps: { data: stepsData.value, categories: ['steps'], index: 'date' },
        footerText: `Total Steps: ${stepsData.value.reduce((s, d) => s + d.steps, 0)}`,
      },
      {
        title: 'Sleep this week',
        icon: 'MoonStar',
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
        icon: 'Zap',
        chartComponent: BarChart,
        chartProps: { data: zoneData.value, categories: ['minutes'], index: 'date' },
        footerText: `Total Minutes: ${zoneData.value.reduce((s, d) => s + d.minutes, 0)}`,
      },
      {
        title: 'Calories Burned',
        icon: 'Flame',
        chartComponent: BarChart,
        chartProps: { data: caloriesData.value, categories: ['calories'], index: 'date' },
        footerText: `Total Calories: ${caloriesData.value.reduce((s, d) => s + d.calories, 0)} kcal`,
      },
      {
        title: 'Heart Rate',
        icon: 'HeartPulse',
        chartComponent: LineChart,
        chartProps: { data: heartData.value, categories: ['restingHeartRate'], index: 'date' },
        footerText: `Avg HR: ${(heartData.value.reduce((s, d) => s + d.restingHeartRate, 0) / heartData.value.length).toFixed(0)} bpm`,
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
  router.go(0)
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
          <span v-if="!isSyncing">Sync Latest Data</span>
          <span v-else>Syncing...</span>
        </Button>
      </div>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <HealthChartCarousel v-if="!fitbit_loading && !fitbit_error && profile" :charts="chartData" />
      <div v-else-if="fitbit_loading" class="h-48 flex items-center justify-center">
        <p class="text-sm text-muted-foreground">
          Loading charts...
        </p>
      </div>
      <AuthConnectAccounts v-else />

      <HealthProfile
        v-if="!fitbit_loading && !fitbit_error && profile" :profile="profile" :steps="steps" :sleep="sleep"
        :heart="heart"
      />

      <HealthLoader v-else-if="fitbit_loading || fitbit_error" :loading="fitbit_loading" :error="fitbit_error" />
    </main>
  </div>
</template>
