<script setup lang="ts">
import type { FitbitActiveZoneMinutes, FitbitCalories, FitbitHeart, FitbitSleep, FitbitSteps } from '~/types/fitbit'
import { useFitbit } from '@/composables/useFitbit'
import { format, min, parseISO, subDays } from 'date-fns'

// import NumberFlow from '@number-flow/vue'
import { HeartPulse } from 'lucide-vue-next'

// Fetch health data
const { fetchFitbitData } = useFitbit()

// Reactive datasets for charts
const stepsData = ref<{ date: string, steps: number }[]>([]) // <> fixes TS error so that it doesn't think it's a string
const heartData = ref<{ date: string, restingHeartRate: number }[]>([])
const sleepData = ref<{
  date: string
  duration: number
  sleepHours: number
  efficiency: number
  sleepStages: {
    deep: number
    light: number
    rem: number
    awake: number
  }
}[]>([])
const zoneData = ref<{ date: string, minutes: number }[]>([])
const caloriesData = ref<{ date: string, calories: number }[]>([])

// Access Fitbit token cookie
const fitbitToken = useCookie('fitbit_access_token')

// Loading and error states
const loading = ref(true)
const error = ref(false)

// ✅ IMPORTANT: Watch for when the fitbit token becomes available
// and only then fetch data to avoid "No Fitbit token" errors
watchEffect(async () => {
  if (!fitbitToken.value) {
    loading.value = false
    console.warn('No Fitbit token available:', fitbitToken.value)
    return
  }

  try {
    loading.value = true

    // Fetch steps data (last 7 days)
    const steps = await fetchFitbitData<FitbitSteps>('activities/steps/date/today/7d')
    stepsData.value = steps['activities-steps'].map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'), // format to day of week (Mon, Tue, etc)
      steps: Number(day.value),
    }))

    // Fetch heart rate data (last 7 days)
    const heart = await fetchFitbitData<FitbitHeart>('activities/heart/date/today/7d')
    heartData.value = heart['activities-heart'].map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      restingHeartRate: day.value.restingHeartRate || 0,
    }))

    // Fetch sleep data (today only for now)
    // const yesterday = format(subDays(new Date(), 1), 'yyyy-MM-dd')
    const sleep = await fetchFitbitData<FitbitSleep>('sleep/date/today')
    sleepData.value = sleep.sleep.map((night) => {
      const summary = night.levels?.summary
      const minuteData = night.minuteData || []

      if (summary) {
        // ✅ Stages Sleep available
        const stages = {
          deep: (summary.deep?.minutes || 0) / 60,
          light: (summary.light?.minutes || 0) / 60,
          rem: (summary.rem?.minutes || 0) / 60,
          awake: (summary.wake?.minutes || 0) / 60,
        }

        const totalSleepMinutes = (summary.deep?.minutes || 0) + (summary.light?.minutes || 0) + (summary.rem?.minutes || 0)

        return {
          date: format(parseISO(night.dateOfSleep), 'EEE'),
          duration: Number((night.duration / 3600000).toFixed(2)),
          sleepHours: Number((totalSleepMinutes / 60).toFixed(2)),
          efficiency: night.efficiency,
          sleepStages: stages,
        }
      }
      else if (minuteData.length > 0) {
        // ✅ Classic Sleep fallback
        let asleepMinutes = 0
        let awakeMinutes = 0
        minuteData.forEach((m) => {
          if (m.value === 'asleep') {
            asleepMinutes++
          }
          else if (m.value === 'awake') {
            awakeMinutes++
          }
        })

        const stages = {
          deep: 0, // not available
          light: asleepMinutes / 60, // treat total asleep as light
          rem: 0, // not available
          awake: awakeMinutes / 60,
        }

        return {
          date: format(parseISO(night.dateOfSleep), 'EEE'),
          duration: Number((night.duration / 3600000).toFixed(2)),
          sleepHours: Number((asleepMinutes / 60).toFixed(2)),
          efficiency: night.efficiency,
          sleepStages: stages,
        }
      }
      else {
        console.warn('No usable sleep data for night:', night)
        return null
      }
    })
      .filter(night => night !== null) // remove skipped nights

    // Fetch active zone minutes data (last 7 days)
    const zone = await fetchFitbitData<FitbitActiveZoneMinutes>('activities/active-zone-minutes/date/today/7d')
    zoneData.value = zone['activities-active-zone-minutes'].map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      minutes: Number(day.value.activeZoneMinutes) || 0,

      // Subdivide into zones if available -> later -> you can add more impressive charts
    }))

    console.warn('Zone data:', zoneData.value)

    // Fetch calories burned data (last 7 days)
    const calories = await fetchFitbitData<FitbitCalories>('activities/calories/date/today/7d')
    caloriesData.value = calories['activities-calories'].map(day => ({
      date: format(parseISO(day.dateTime), 'EEE'),
      calories: Number(day.value) || 0,
    }))

    error.value = false
  }
  catch (err) {
    console.error('Failed to fetch Fitbit health data:', err)
    error.value = true
  }
  finally {
    loading.value = false
  }
})
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
      </div>
    </div>
    <!-- Main body under header -->
    <main class="flex flex-1 flex-col gap-4 md:gap-8">
      <!-- Test carousel of charts -->
      <Card class="xl:col-span-2">
        <CardHeader class="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle>Overview</CardTitle>
          <HeartPulse class="h-4 w-4 text-muted-foreground" />
        </CardHeader>

        <!-- Steps chart -->
        <CardContent class="flex flex-col items-center justify-between pt-2">
          <Carousel v-slot="{ canScrollNext }" class="relative w-95%">
            <CarouselContent>
              <CarouselItem>
                <div class="p-1">
                  <Card>
                    <CardContent class="flex flex-col items-center justify-center p-6">
                      <span class="text-4xl font-semibold">1</span><br>
                      <span class="text-center text-2xl font-semibold">Steps this week</span>
                      <BarChart :data="stepsData" :categories="['steps']" index="date" :rounded-corners="4" />
                      <div class="mt-4 text-sm text-muted-foreground">
                        Average daily steps: {{ (stepsData.reduce((sum, day) => sum + day.steps, 0) / stepsData.length).toFixed(0) }}<br>
                        Total weekly steps: {{ stepsData.reduce((sum, day) => sum + day.steps, 0) }}
                      </div>
                    </CardContent>
                  </Card>
                  Steps this week: {{ stepsData }}
                </div>
              </CarouselItem>

              <!-- Sleep Chart -->
              <CarouselItem>
                <div class="p-1">
                  <Card>
                    <CardContent class="flex flex-col items-center justify-center p-6">
                      <span class="text-4xl font-semibold">2</span><br>
                      <span class="text-center text-2xl font-semibold">Sleep this week</span>
                      <BarChart :data="sleepData" :categories="['sleepHours']" index="date" :rounded-corners="4" />
                      <div class="mt-4 text-sm text-muted-foreground">
                        <ul class="space-y-2">
                          <li v-for="night in sleepData" :key="night.date" class="text-left">
                            <strong>{{ night.date }}:</strong> Slept {{ night.duration }}h (Efficiency: {{ night.efficiency }}%)
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                  Sleep this week: {{ sleepData }}
                  <ul>
                    <li v-for="night in sleepData" :key="night.date">
                      <strong>{{ night.date }}:</strong><br>
                      In bed: {{ night.duration }}h<br>
                      Slept: {{ night.sleepHours }}h<br>
                      Sleep Efficiency: {{ night.efficiency }}%<br>
                      Deep: {{ night.sleepStages.deep.toFixed(1) }}h, Light: {{ night.sleepStages.light.toFixed(1) }}h, REM: {{ night.sleepStages.rem.toFixed(1) }}h, Awake: {{ night.sleepStages.awake.toFixed(1) }}h
                    </li>
                  </ul>
                </div>
              </CarouselItem>

              <!-- Heart Rate Chart -->
              <CarouselItem>
                <div class="p-1">
                  <Card>
                    <CardContent class="flex flex-col items-center justify-center p-6">
                      <span class="text-4xl font-semibold">3</span><br>
                      <span class="text-center text-2xl font-semibold">Heart rate this week</span>
                      <LineChart :data="heartData" :categories="['restingHeartRate']" index="date" :rounded-corners="4" />
                      <div class="mt-4 text-sm text-muted-foreground">
                        Avg RHR: {{ (heartData.reduce((sum, day) => sum + day.restingHeartRate, 0) / heartData.length).toFixed(0) }} bpm
                      </div>
                    </CardContent>
                  </Card>
                  Heart rate this week: {{ heartData }}
                </div>
              </CarouselItem>

              <!-- Active Zone Minutes Chart -->
              <CarouselItem>
                <div class="p-1">
                  <Card>
                    <CardContent class="flex flex-col items-center justify-center gap-4 p-6">
                      <span class="text-4xl font-semibold">4</span>
                      <span class="text-center text-2xl font-semibold">Active Zone Minutes</span>
                      <BarChart :data="zoneData" :categories="['minutes']" index="date" :rounded-corners="4" />
                      <div class="mt-4 text-sm text-muted-foreground">
                        Weekly total: {{ zoneData.reduce((sum, day) => sum + day.minutes, 0) }} mins
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>

              <!-- Calories Burned Chart -->
              <CarouselItem>
                <div class="p-1">
                  <Card>
                    <CardContent class="flex flex-col items-center justify-center gap-4 p-6">
                      <span class="text-4xl font-semibold">5</span>
                      <span class="text-center text-2xl font-semibold">Calories Burned</span>
                      <BarChart :data="caloriesData" :categories="['calories']" index="date" :rounded-corners="4" />
                      <div class="mt-4 text-sm text-muted-foreground">
                        Weekly calories: {{ caloriesData.reduce((sum, day) => sum + day.calories, 0) }} kcal
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext v-if="canScrollNext" />
          </Carousel>
        </CardContent>
      </Card>
    </main>
  </div>
</template>
