import { formatISO, getISOWeek, startOfISOWeek } from 'date-fns'
import { ref } from 'vue'
import { useLocalCache } from '~/lib/useLocalCache'

const WEEKLY_TOTALS_CACHE_KEY = 'fitbit-weekly-totals'
const WEEKLY_TOTALS_TTL = 1000 * 60 * 60 * 24 * 7 // 1 week
const LOCKED_WEEK_START = '2025-05-12' // YYYY-MM-DD

interface ThisWeeksTotals {
  steps: number
  distance: number
  sleep: number
  calories: number
  azm: number
  weekStart: string // ISO date string
}

const defaultTotals: ThisWeeksTotals = {
  steps: 0,
  distance: 0,
  sleep: 0,
  calories: 0,
  azm: 0,
  weekStart: '',
}

export function useHealthTotals() {
  const { get: getCache, set: setCache } = useLocalCache<ThisWeeksTotals>(WEEKLY_TOTALS_CACHE_KEY, WEEKLY_TOTALS_TTL)

  function updateThisWeeksTotals(data: any) {
    const cached = getCache() || { ...defaultTotals }
    console.warn('[BEFORE UPDATE] Cached totals:', cached)

    const now = new Date()
    const currentWeekStart = formatISO(startOfISOWeek(now), { representation: 'date' })
    console.warn('Updating this week\'s totals:', currentWeekStart)

    // If the week start date is not set, initialize it
    if (currentWeekStart !== LOCKED_WEEK_START) {
      console.warn('Cache guard activated:', currentWeekStart)
      return
    }

    // If we switched to a new week, reset the totals
    if (cached.weekStart !== currentWeekStart) {
      cached.steps = 0
      cached.distance = 0
      cached.sleep = 0
      cached.calories = 0
      cached.azm = 0
      cached.weekStart = currentWeekStart
    }

    // Steps
    cached.steps = data.steps.reduce((sum: number, s: any) => sum + Number(s.value), 0)
    console.warn('Steps:', cached.steps)

    // Distance
    cached.distance = data.distance.reduce((sum: number, d: any) => sum + Number(d.value), 0)

    // Sleep (duration in ms converted to hours)
    cached.sleep = Math.round(data.sleep.reduce((sum: number, s: any) => sum + s.duration, 0) / 3600000)

    // Calories
    cached.calories = data.calories.reduce((sum: number, c: any) => sum + Number(c.value), 0)

    // AZM
    const azmEntries = data.AZM ?? []
    const first = azmEntries[0]
    if (first?.dateTime === currentWeekStart) {
      cached.azm = azmEntries.reduce((sum: number, z: any) => {
        const v = z.value
        return sum
          + (v.fatBurnActiveZoneMinutes ?? 0)
          + (v.cardioActiveZoneMinutes ?? 0)
          + (v.peakActiveZoneMinutes ?? 0)
      }, 0)
    }
    else {
      cached.azm = 0
    }

    setCache(cached)
    console.warn('[AFTER UPDATE] Cached totals:', cached)
  }

  async function updateRealTotalsIfNeeded() {
    // Placeholder for logic to move this week's totals to permanent Firestore storage
  }

  return {
    updateThisWeeksTotals,
    updateRealTotalsIfNeeded,
  }
}
