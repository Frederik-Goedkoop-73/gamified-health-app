import type {
  FitbitActiveZoneMinutes,
  FitbitCalories,
  FitbitHeart,
  FitbitProfile,
  FitbitSleep,
  FitbitSteps,
} from '~/types/fitbit'
import { format, parseISO, startOfWeek } from 'date-fns'
import { ref } from 'vue'

import { useFitbit } from '~/composables/useFitbit'
import { getDatesThisWeek } from '~/lib/getDatesThisWeek'
import { useLocalCache } from '~/lib/useLocalCache'

const CACHE_KEY = 'fitbit-weekly'
const CACHE_TTL = 1000 * 60 * 60 * 12 // 12 hours

export function useFitbitCachedData() {
  if (import.meta.server) {
    // Return dummy refs so the component doesn't explode on SSR
    return {
      fitbit_loading: ref(false),
      fitbit_error: ref(false),
      fetchData: () => {},

      // Health
      profile: ref(null),
      stepsData: ref([]),
      sleepData: ref([]),
      zoneData: ref([]),
      caloriesData: ref([]),
      heartData: ref([]),
      rawSleep: ref([]),

      // Quests
      steps: ref([]),
      heart: ref([]),
      sleep: ref([]),
      calories: ref([]),
      azm: ref([]),
    }
  }

  const fitbit_loading = ref(true)
  const fitbit_error = ref(false)

  // For health
  const profile = ref<FitbitProfile | null>(null)
  const stepsData = ref<any[]>([])
  const sleepData = ref<any[]>([])
  const zoneData = ref<any[]>([])
  const caloriesData = ref<any[]>([])
  const heartData = ref<any[]>([])
  const rawSleep = ref<FitbitSleep['sleep']>([])

  // For quests
  const steps = ref<FitbitSteps['activities-steps']>([])
  const heart = ref<FitbitHeart['activities-heart']>([])
  const sleep = ref<FitbitSleep['sleep']>([])
  const calories = ref<FitbitCalories['activities-calories']>([])
  const azm = ref<FitbitActiveZoneMinutes['activities-active-zone-minutes']>([])

  const { get: getCache, set: setCache } = useLocalCache<any>(CACHE_KEY, CACHE_TTL)
  const { fetchFitbitData } = useFitbit()

  async function fetchData() {
    const cached = getCache()
    if (cached) {
      // health
      profile.value = cached.profile
      stepsData.value = cached.stepsData
      sleepData.value = cached.sleepData
      zoneData.value = cached.zoneData
      caloriesData.value = cached.caloriesData
      heartData.value = cached.heartData
      rawSleep.value = cached.rawSleep

      // quests
      steps.value = cached.steps
      heart.value = cached.heart
      sleep.value = cached.sleep
      calories.value = cached.calories
      azm.value = cached.azm

      fitbit_loading.value = false
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
      const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 }) // Monday
      const startKey = format(startOfThisWeek, 'yyyy-MM-dd')

      const sleepResponses = await Promise.all(
        weekDates.map(date => fetchFitbitData<FitbitSleep>(`sleep/date/${date}`)),
      )

      profile.value = profileRaw
      rawSleep.value = sleepResponses.flatMap(r => r.sleep)

      steps.value = stepsRaw['activities-steps'].filter(d => d.dateTime >= startKey)
      heart.value = heartRaw['activities-heart'].filter(d => d.dateTime >= startKey)
      sleep.value = sleepResponses.flatMap(resp => resp.sleep).filter(d => d.dateOfSleep >= startKey)
      calories.value = caloriesRaw['activities-calories'].filter(d => d.dateTime >= startKey)
      azm.value = zoneRaw['activities-active-zone-minutes'].filter(d => d.dateTime >= startKey)

      const stepsMap = new Map(steps.value.map(e => [e.dateTime, e]))
      const sleepMap = new Map(sleep.value.map(n => [n.dateOfSleep, n]))
      const zoneMap = new Map(azm.value.map(e => [e.dateTime, e]))
      const calorieMap = new Map(calories.value.map(e => [e.dateTime, e]))

      stepsData.value = weekDates.map(date => ({
        date: format(parseISO(date), 'EEE'),
        steps: stepsMap.has(date) ? Number(stepsMap.get(date)!.value) : 0,
      }))

      sleepData.value = weekDates.map((date) => {
        const night = sleepMap.get(date)
        const durationMs = night?.duration ?? 0
        return {
          date: format(parseISO(date), 'EEE'),
          sleepHours: Number((durationMs / 3600000).toFixed(2)),
          sleepLabel: `${Math.floor(durationMs / 3600000)}h${Math.round((durationMs % 3600000) / 60000).toString().padStart(2, '0')}m`,
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

      setCache({
        // Health
        profile: profile.value,
        stepsData: stepsData.value,
        sleepData: sleepData.value,
        zoneData: zoneData.value,
        caloriesData: caloriesData.value,
        heartData: heartData.value,
        rawSleep: rawSleep.value,

        // Quests
        steps: steps.value,
        heart: heart.value,
        sleep: sleep.value,
        calories: calories.value,
        azm: azm.value,
      })

      fitbit_error.value = false
      console.error('Steps:', stepsData.value)
      console.error('Sleep:', sleepData.value)
      console.error('Profile:', profile.value)
    }
    catch (e) {
      console.error('Fitbit data fetch error:', e)
      fitbit_error.value = true
    }
    finally {
      fitbit_loading.value = false
    }
  }

  return {
    fitbit_loading,
    fitbit_error,
    fetchData,
    profile,
    steps,
    heart,
    sleep,
    calories,
    azm,
    stepsData,
    sleepData,
    zoneData,
    caloriesData,
    heartData,
    rawSleep,
  }
}
