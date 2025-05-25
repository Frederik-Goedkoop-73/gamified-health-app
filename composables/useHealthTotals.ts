// Calculates and saves health totals to cache which will later be saved to firebase when the weeklyquest are regenerated
import { formatISO, startOfISOWeek } from 'date-fns'
import { useLocalCache } from '~/lib/useLocalCache'
import { useAppState } from '~/stores/weeklyTotalsState'

const WEEKLY_TOTALS_CACHE_KEY = 'fitbit-weekly-totals'
const WEEKLY_TOTALS_TTL = 1000 * 60 * 60 * 24 * 7 // 1 week

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
  const appState = useAppState()

  function updateThisWeeksTotals(data: any) {
    const cached = getCache() || { ...defaultTotals }

    const now = new Date()
    const currentWeekStart = formatISO(startOfISOWeek(now), { representation: 'date' })

    // 🔒 Only update cache if we're still in the week currently being tracked
    if (currentWeekStart !== appState.lockedWeekStart) {
      console.warn('[HealthTotals] Skipping update — week mismatch:', {
        currentWeekStart,
        lockedWeekStart: appState.lockedWeekStart,
      })
      return
    }

    // 🧼 Reset if week start doesn't match cached object
    if (cached.weekStart !== currentWeekStart) {
      Object.assign(cached, { ...defaultTotals, weekStart: currentWeekStart })
    }

    // Steps
    cached.steps = data.steps.reduce((sum: number, s: any) => sum + Number(s.value), 0)

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
  }

  function getThisWeeksTotals(): ThisWeeksTotals {
    return getCache() ?? { ...defaultTotals }
  }

  return {
    updateThisWeeksTotals,
    getThisWeeksTotals,
  }
}
