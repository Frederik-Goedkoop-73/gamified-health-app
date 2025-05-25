// Helper function to calculate the totals of the previous week from what's in firebase
import { collection, getDocs } from 'firebase/firestore'
import { useFirebase } from '~/server/utils/firebase'

interface WeeklyTotal {
  steps: number
  calories: number
  distance: number
  azm: number
  sleep: number
  weekStart: string
}

export function useWeeklyTotals() {
  const totals = ref<WeeklyTotal[]>([])

  async function fetchWeeklyTotals(): Promise<void> {
    const { auth, db } = useFirebase()
    const user = auth.currentUser
    if (!user)
      return

    const weeklyTotalsRef = collection(db, 'users', user.uid, 'weeklyTotals')
    const snapshot = await getDocs(weeklyTotalsRef)

    totals.value = snapshot.docs.map(doc => doc.data() as WeeklyTotal)
  }

  const aggregatedTotals = computed(() => {
    return totals.value.reduce(
      (acc, week) => {
        acc.steps += week.steps
        acc.calories += week.calories
        acc.distance += week.distance
        acc.azm += week.azm
        return acc
      },
      { steps: 0, calories: 0, distance: 0, azm: 0 },
    )
  })

  return {
    fetchWeeklyTotals,
    aggregatedTotals,
  }
}
