import type { FitbitActiveZoneMinutes, FitbitCalories, FitbitSimpleSleepLog, FitbitSteps } from '@/types/fitbit'
import type { Quest } from '@/types/quest'
import { format, startOfWeek } from 'date-fns'
import { useQuestStore } from '~/stores/questStore'

interface PlayerFitbitData {
  steps: FitbitSteps['activities-steps']
  sleep: FitbitSimpleSleepLog[]
  calories: FitbitCalories['activities-calories'] // We only want data at index 0
  AZM: FitbitActiveZoneMinutes['activities-active-zone-minutes']
  distance: { dateTime: string, value: number }[]
}

export function checkQuestProgress(quest: Quest, data: PlayerFitbitData) {
  const questStore = useQuestStore()
  let currentProgress = 0

  const isWeekly = quest.type === 'weekly'

  // AZM helper variables
  const today = format(new Date(), 'yyyy-MM-dd')
  const weekStart = format(startOfWeek(new Date(), { weekStartsOn: 1 }), 'yyyy-MM-dd')
  const azmEntries = data.AZM ?? []

  switch (quest.activity) {
    case 'steps':
      if (isWeekly)
        currentProgress = data.steps.reduce((sum, s) => sum + Number(s.value), 0)
      else
        currentProgress = data.steps.length > 0 ? Number(data.steps[data.steps.length - 1].value) : 0
      break

    case 'distance':
      if (isWeekly)
        currentProgress = data.distance.reduce((sum, d) => sum + Number(d.value), 0)
      else
        currentProgress = data.distance.length > 0 ? Number(data.distance[data.distance.length - 1].value) : 0
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
        const first = azmEntries[0]
        if (!first || first.dateTime !== weekStart) {
          currentProgress = 0
          break
        }

        currentProgress = azmEntries.reduce((sum, z) => {
          const v = z.value
          return sum
            + (v.fatBurnActiveZoneMinutes ?? 0)
            + (v.cardioActiveZoneMinutes ?? 0)
            + (v.peakActiveZoneMinutes ?? 0)
        }, 0)
      }
      else {
        const latest = azmEntries.at(-1)
        if (!latest || latest.dateTime !== today) {
          currentProgress = 0
          break
        }

        const v = latest.value
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
