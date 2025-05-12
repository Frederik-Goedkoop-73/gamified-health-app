import type { FitbitActiveZoneMinutes, FitbitCalories, FitbitSimpleSleepLog, FitbitSteps } from '~/types/fitbit'
import { computed } from 'vue'
import { checkQuestProgress } from '../lib/checkQuestProgress'
import { useQuestStore } from '../stores/questStore'

interface PlayerFitbitData {
  steps: FitbitSteps['activities-steps']
  sleep: FitbitSimpleSleepLog[]
  calories: FitbitCalories['activities-calories'] // We only want data at index 0
  AZM: FitbitActiveZoneMinutes['activities-active-zone-minutes']
  distance: { dateTime: string, value: number }[]
}

export function useQuestProgress(fitbitData: Ref<PlayerFitbitData>) {
  const questStore = useQuestStore()

  const dailyQuestProgress = computed(() => {
    return questStore.dailyQuests.map(quest => ({
      quest,
      ...checkQuestProgress(quest, fitbitData.value),
    }))
  })

  const weeklyQuestProgress = computed(() => {
    return questStore.weeklyQuests.map(quest => ({
      quest,
      ...checkQuestProgress(quest, fitbitData.value),
    }))
  })

  return { dailyQuestProgress, weeklyQuestProgress }
}
