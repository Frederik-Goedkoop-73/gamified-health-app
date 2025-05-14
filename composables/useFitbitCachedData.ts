import type {
  FitbitActiveZoneMinutes,
  FitbitCalories,
  FitbitDistance,
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
      distanceData: ref([]),

      // Quests
      steps: ref([]),
      heart: ref([]),
      sleep: ref([]),
      calories: ref([]),
      azm: ref([]),
      distance: ref([]),
      lastFitbitDataDate: ref<string | null>(null),
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
  const distanceData = ref<any[]>([])

  // For quests
  const steps = ref<FitbitSteps['activities-steps']>([])
  const heart = ref<FitbitHeart['activities-heart']>([])
  const sleep = ref<FitbitSleep['sleep']>([])
  const calories = ref<FitbitCalories['activities-calories']>([])
  const azm = ref<FitbitActiveZoneMinutes['activities-active-zone-minutes']>([])
  const distance = ref<FitbitDistance['activities-distance']>([])

  const lastFitbitDataDate = ref<string | null>(null)

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
      distanceData.value = cached.distanceData

      // quests
      steps.value = cached.steps
      heart.value = cached.heart
      sleep.value = cached.sleep
      calories.value = cached.calories
      azm.value = cached.azm
      distance.value = cached.distance
      lastFitbitDataDate.value = cached.lastFitbitDataDate

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
        distanceRaw,
      ] = await Promise.all([
        fetchFitbitData<FitbitProfile>('profile'),
        fetchFitbitData<FitbitSteps>('activities/steps/date/today/7d'),
        fetchFitbitData<FitbitHeart>('activities/heart/date/today/7d'),
        fetchFitbitData<FitbitActiveZoneMinutes>('activities/active-zone-minutes/date/today/7d'),
        fetchFitbitData<FitbitCalories>('activities/calories/date/today/7d'),
        fetchFitbitData<FitbitDistance>('activities/distance/date/today/7d'),
      ])

      const today = format(new Date(), 'yyyy-MM-dd')
      const weekDates = getDatesThisWeek()
      const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 }) // Monday
      const startKey = format(startOfThisWeek, 'yyyy-MM-dd')

      const sleepResponses = await Promise.all(
        weekDates.map(date => fetchFitbitData<FitbitSleep>(`sleep/date/${date}`)),
      )

      profile.value = profileRaw
      rawSleep.value = sleepResponses.flatMap(r => r.sleep)

      const filteredSteps = stepsRaw['activities-steps'].filter(d => d.dateTime >= startKey)
      const azmRaw = zoneRaw['activities-active-zone-minutes'].filter(d => d.dateTime >= startKey)
      const azmLatest = azmRaw.at(-1) ?? null
      steps.value = filteredSteps
      heart.value = heartRaw['activities-heart'].filter(d => d.dateTime >= startKey)
      sleep.value = sleepResponses.flatMap(resp => resp.sleep).filter(d => d.dateOfSleep >= startKey)
      calories.value = caloriesRaw['activities-calories'].filter(d => d.dateTime >= startKey)
      /* azm.value = zoneRaw['activities-active-zone-minutes'].filter(d => d.dateTime >= startKey) */
      azm.value = azmLatest && azmLatest.dateTime === today ? azmRaw : []
      distance.value = distanceRaw['activities-distance'].filter(d => d.dateTime >= startKey)

      const stepsMap = new Map(steps.value.map(e => [e.dateTime, e]))
      const sleepMap = new Map(sleep.value.map(n => [n.dateOfSleep, n]))
      const zoneMap = new Map(azm.value.map(e => [e.dateTime, e]))
      const calorieMap = new Map(calories.value.map(e => [e.dateTime, e]))
      const distanceMap = new Map(distance.value.map(e => [e.dateTime, e]))

      const latestDate = filteredSteps.length > 0 ? filteredSteps.at(-1)?.dateTime ?? null : null
      const latestDateStr = latestDate ? format(new Date(latestDate), 'yyyy-MM-dd') : null
      lastFitbitDataDate.value = latestDateStr

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

      distanceData.value = weekDates.map((date) => {
        const entry = distanceMap.get(date)
        const rawValue = entry ? Number(entry.value) : 0
        const rounded = Number(rawValue.toFixed(2))
        return {
          date: format(parseISO(date), 'EEE'),
          distance: rounded,
        }
      })

      setCache({
        // Health
        profile: profile.value,
        stepsData: stepsData.value,
        sleepData: sleepData.value,
        zoneData: zoneData.value,
        caloriesData: caloriesData.value,
        heartData: heartData.value,
        rawSleep: rawSleep.value,
        distanceData: distanceData.value,

        // Quests
        steps: steps.value,
        heart: heart.value,
        sleep: sleep.value,
        calories: calories.value,
        azm: azm.value,
        distance: distance.value,
        lastFitbitDataDate: lastFitbitDataDate.value,
      })

      fitbit_error.value = false
    }
    catch (e) {
      console.error('Fitbit data fetch error:', e)
      fitbit_error.value = true
    }
    finally {
      fitbit_loading.value = false
    }
  }

  async function clearCacheAndFetch() {
    const { clear } = useLocalCache(CACHE_KEY, 0)
    clear()
    await fetchData()
  }

  async function clearFitbitCache() {
    const { clear } = useLocalCache(CACHE_KEY, 0)
    clear()
  }

  return {
    fitbit_loading,
    fitbit_error,
    fetchData,
    clearCacheAndFetch,
    clearFitbitCache,
    profile,
    steps,
    heart,
    sleep,
    calories,
    azm,
    distance,
    stepsData,
    sleepData,
    zoneData,
    caloriesData,
    heartData,
    rawSleep,
    distanceData,
    lastFitbitDataDate,
  }
}
