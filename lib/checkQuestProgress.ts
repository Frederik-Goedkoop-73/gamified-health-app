import type { FitbitActiveZoneMinutes, FitbitCalories, FitbitSimpleSleepLog, FitbitSteps } from '@/types/fitbit'
import type { Quest } from '@/types/quest'

interface PlayerFitbitData {
  steps: FitbitSteps['activities-steps']
  sleep: FitbitSimpleSleepLog[]
  caloriesToday: FitbitCalories['activities-calories'][0] // We only want data at index 0
  azmToday: FitbitActiveZoneMinutes['activities-active-zone-minutes'][0]
}

export function checkQuestProgress(quest: Quest, data: PlayerFitbitData) {
  let currentProgress = 0

  switch (quest.activity) {
    case 'steps':
      currentProgress = data.steps.length > 0 ? Number(data.steps[data.steps.length - 1].value) : 0
      break

      // case 'distance': --> we'll add this later when you have distance
    case 'sleep':
      if (data.sleep.length > 0) {
        const todaySleep = data.sleep[0]
        currentProgress = todaySleep.duration ? Math.round(todaySleep.duration / 3600000) : 0 // ms → hours
      }
      break

    case 'calories':
      currentProgress = data.caloriesToday?.value ? Number(data.caloriesToday.value) : 0
      break

    case 'AZM':
      currentProgress = data.azmToday?.value?.activeZoneMinutes ? Number(data.azmToday.value.activeZoneMinutes) : 0
      break

    default:
      currentProgress = 0
  }

  const isCompleted = currentProgress >= quest.target

  return {
    progress: Math.min(currentProgress, quest.target),
    completed: isCompleted,
    percentage: Math.min((currentProgress / quest.target) * 100, 100),
  }
}
