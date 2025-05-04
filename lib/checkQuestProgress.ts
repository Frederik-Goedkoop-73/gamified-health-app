import type { FitbitActiveZoneMinutes, FitbitCalories, FitbitSimpleSleepLog, FitbitSteps } from '@/types/fitbit'
import type { Quest } from '@/types/quest'
import { useQuestStore } from '~/stores/questStore'

interface PlayerFitbitData {
  steps: FitbitSteps['activities-steps']
  sleep: FitbitSimpleSleepLog[]
  calories: FitbitCalories['activities-calories'] // We only want data at index 0
  AZM: FitbitActiveZoneMinutes['activities-active-zone-minutes']
}

export function checkQuestProgress(quest: Quest, data: PlayerFitbitData) {
  const questStore = useQuestStore()
  let currentProgress = 0

  const isWeekly = quest.type === 'weekly'

  switch (quest.activity) {
    case 'steps':
      if (isWeekly)
        currentProgress = data.steps.reduce((sum, s) => sum + Number(s.value), 0)
      else
        currentProgress = data.steps.length > 0 ? Number(data.steps[data.steps.length - 1].value) : 0
      break

    case 'sleep':
      if (isWeekly)
        currentProgress = Math.round(data.sleep.reduce((sum, s) => sum + s.duration, 0) / 3600000)
      else if (data.sleep.length > 0)
        currentProgress = Math.round(data.sleep[data.sleep.length - 1].duration / 3600000)
      break

    case 'calories':
      if (isWeekly)
        currentProgress = data.calories.reduce((sum, c) => sum + Number(c.value), 0)
      else
        currentProgress = data.calories.length > 0 ? Number(data.calories[data.calories.length - 1].value) : 0
      break

    case 'AZM':
      if (isWeekly) {
        currentProgress = data.AZM.reduce((sum, z) => {
          const v = z.value
          return sum
            + (v.fatBurnActiveZoneMinutes ?? 0)
            + (v.cardioActiveZoneMinutes ?? 0)
            + (v.peakActiveZoneMinutes ?? 0)
        }, 0)
      }
      else if (data.AZM.length > 0) {
        const v = data.AZM.at(-1)!.value
        currentProgress
            = (v.fatBurnActiveZoneMinutes ?? 0)
              + (v.cardioActiveZoneMinutes ?? 0)
              + (v.peakActiveZoneMinutes ?? 0)
      }
      break

    default:
      currentProgress = 0
  }

  const isCompleted = currentProgress >= quest.target

  // ✅ Only complete quest once
  if (isCompleted && !quest.completed) {
    questStore.completeQuest(quest.id, isWeekly ? 'weekly' : 'daily')
  }

  const percentage = quest.target > 0
    ? Math.min((currentProgress / quest.target) * 100, 100)
    : 0

  return {
    progress: Number.isNaN(currentProgress) ? 0 : Math.min(currentProgress, quest.target),
    completed: isCompleted,
    percentage: Number.isNaN(percentage) ? 0 : percentage,
  }
}
