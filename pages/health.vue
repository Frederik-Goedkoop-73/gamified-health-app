<script setup lang="ts">
import type { FitbitHeart, FitbitSleep, FitbitSteps } from '~/types/fitbit'
import { useFitbit } from '@/composables/useFitbit'
import { format, parseISO } from 'date-fns'

// import NumberFlow from '@number-flow/vue'
import { HeartPulse } from 'lucide-vue-next'

// Fetch health data
const { fetchFitbitData } = useFitbit()

// Reactive datasets for charts
const stepsData = ref<{ date: string, steps: number }[]>([]) // <> fixes TS error so that it doesn't think it's a string
const heartData = ref<{ date: string, restingHeartRate: number }[]>([])
const sleepData = ref<{ date: string, sleepHours: number }[]>([])

onMounted(async () => {
  // Get steps (last 7 days)
  const steps = await fetchFitbitData<FitbitSteps>('activities/steps/date/today/7d')
  stepsData.value = steps['activities-steps'].map(day => ({
    date: format(parseISO(day.dateTime), 'EEE'), // format to day of week
    steps: Number(day.value),
  }))

  // Get heart rate (last 7 days)
  const heart = await fetchFitbitData<FitbitHeart>('activities/heart/date/today/7d')
  heartData.value = heart['activities-heart'].map(day => ({
    date: day.dateTime,
    restingHeartRate: day.value.restingHeartRate || 0, // fallback if missing
  }))

  // Get sleep (today only for now)
  const sleep = await fetchFitbitData<FitbitSleep>('sleep/date/today')
  sleepData.value = sleep.sleep.map(night => ({
    date: night.dateOfSleep,
    sleepHours: Number((night.duration / 3600000).toFixed(1)), // ms to hours
  }))
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
                    </CardContent>
                  </Card>
                  Steps this week: {{ stepsData }}
                </div>
              </CarouselItem>
              <CarouselItem>
                <div class="p-1">
                  <Card>
                    <CardContent class="flex flex-col items-center justify-center p-6">
                      <span class="text-4xl font-semibold">2</span><br>
                      <span class="text-center text-2xl font-semibold">Sleep this week</span>
                      <BarChart :data="sleepData" :categories="['sleepHours']" index="date" :rounded-corners="4" />
                    </CardContent>
                  </Card>
                  Sleep this week: {{ sleepData }}
                </div>
              </CarouselItem>
              <CarouselItem>
                <div class="p-1">
                  <Card>
                    <CardContent class="flex flex-col items-center justify-center p-6">
                      <span class="text-4xl font-semibold">3</span><br>
                      <span class="text-center text-2xl font-semibold">Heart rate this week</span>
                      <LineChart :data="heartData" :categories="['restingHeartRate']" index="date" :rounded-corners="4" />
                    </CardContent>
                  </Card>
                  Heart rate this week: {{ heartData }}
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
