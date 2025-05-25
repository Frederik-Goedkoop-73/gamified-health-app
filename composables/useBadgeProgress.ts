// This composable gathers all the necessary data in one spot for the Badge progress -> Badges
import { useBadgeStore } from '@/stores/badgeStore'
import { useStreakStore } from '@/stores/streakStore'
import { useXPStore } from '@/stores/xpStore'
import { useFitbitCachedData } from './useFitbitCachedData'
import { usePlayerInventory } from './usePlayerInventory'
import { useWeeklyTotals } from './useWeeklyTotals'

export function useBadgeProgress() {
  const { aggregatedTotals, fetchWeeklyTotals } = useWeeklyTotals()
  const { getPlayerInventoryTotal } = usePlayerInventory()
  const badgeStore = useBadgeStore()
  const fitbitCached = useFitbitCachedData()
  const xpStore = useXPStore()
  const streakStore = useStreakStore()

  onMounted(() => {
    fitbitCached.fetchData()
    fetchWeeklyTotals()
  })

  // Sum values inside fitbitCached array ~ aggregatedTotals
  const fitbitSteps = computed(() =>
    fitbitCached.steps.value.reduce((sum, e) => sum + Number(e.value), 0),
  )
  const fitbitCalories = computed(() =>
    fitbitCached.calories.value.reduce((sum, e) => sum + Number(e.value), 0),
  )
  const fitbitDistance = computed(() =>
    fitbitCached.distance.value.reduce((sum, e) => sum + Number(e.value), 0),
  )
  const fitbitAzm = computed(() =>
    fitbitCached.azm.value.reduce((sum, e) =>
      sum
      + (e.value.fatBurnActiveZoneMinutes ?? 0)
      + (e.value.cardioActiveZoneMinutes ?? 0)
      + (e.value.peakActiveZoneMinutes ?? 0), 0),
  )

  const progress = computed(() => ({
    steps: aggregatedTotals.value.steps + fitbitSteps.value,
    calories: aggregatedTotals.value.calories + fitbitCalories.value,
    distance: aggregatedTotals.value.distance + fitbitDistance.value,
    azm: aggregatedTotals.value.azm + fitbitAzm.value,
    coins: getPlayerInventoryTotal(),
    xp: xpStore.getTotalXP,
    streak: streakStore.maxStreak,
    badges: badgeStore.badgeCount,
  }))

  return { progress }
}
