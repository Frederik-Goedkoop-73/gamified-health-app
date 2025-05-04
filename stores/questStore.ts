import type { Quest } from '@/types/quest'
import { format } from 'date-fns'
import { doc, getDoc, setDoc } from 'firebase/firestore'
// stores/questStore.ts
import { defineStore } from 'pinia'
import { dailyQuests as dailyQuestsArray, weeklyQuests as weeklyQuestsArray } from '~/components/tasks/data/questData'
import { getRandomQuests } from '~/lib/getRandomQuests'
import { useFirebase } from '~/server/utils/firebase'

// Use setup API like in UseAuth while others use options API 
// Better for larger projects, more control (refs), cleaner code and better ts support
export const useQuestStore = defineStore('quest', () => {
  const dailyQuests = ref<Quest[]>([])
  const weeklyQuests = ref<Quest[]>([])
  const dailyQuestsGeneratedAt = ref('')
  const weeklyQuestsGeneratedAt = ref('')
  const countdownToDailyReset = ref('')
  const countdownToWeeklyReset = ref('')

  async function fetchQuests() {
    const { auth, db } = useFirebase()
    const user = auth.currentUser
    if (!user)
      return

    const playerDoc = doc(db, 'players', user.uid)
    const snapshot = await getDoc(playerDoc)

    const today = format(new Date(), 'yyyy-MM-dd')
    const startOfWeek = format(new Date(), 'yyyy-ww')

    if (snapshot.exists()) {
      const data = snapshot.data()
      dailyQuests.value = data.dailyQuests ?? []
      weeklyQuests.value = data.weeklyQuests ?? []
      dailyQuestsGeneratedAt.value = data.dailyQuestsGeneratedAt ?? ''
      weeklyQuestsGeneratedAt.value = data.weeklyQuestsGeneratedAt ?? ''

      if (dailyQuestsGeneratedAt.value !== today)
        await generateNewDailyQuests(today)

      if (weeklyQuestsGeneratedAt.value !== startOfWeek)
        await generateNewWeeklyQuests(startOfWeek)
    }
    else {
      await generateNewDailyQuests(today)
      await generateNewWeeklyQuests(startOfWeek)
    }

    startCountdown()
  }

  async function generateNewDailyQuests(today: string) {
    const { auth, db } = useFirebase()
    const user = auth.currentUser
    if (!user)
      return

    dailyQuests.value = getRandomQuests(dailyQuestsArray, 3).map(q => ({ ...q, completed: false }))
    dailyQuestsGeneratedAt.value = today

    const playerDoc = doc(db, 'players', user.uid)
    await setDoc(playerDoc, {
      dailyQuests: dailyQuests.value,
      dailyQuestsGeneratedAt: today,
    }, { merge: true })
  }

  async function generateNewWeeklyQuests(startOfWeek: string) {
    const { auth, db } = useFirebase()
    const user = auth.currentUser
    if (!user)
      return

    weeklyQuests.value = getRandomQuests(weeklyQuestsArray, 5).map(q => ({ ...q, completed: false }))
    weeklyQuestsGeneratedAt.value = startOfWeek

    const playerDoc = doc(db, 'players', user.uid)
    await setDoc(playerDoc, {
      weeklyQuests: weeklyQuests.value,
      weeklyQuestsGeneratedAt: startOfWeek,
    }, { merge: true })
  }

  async function completeQuest(questId: string, type: 'daily' | 'weekly') {
    const questList = type === 'daily' ? dailyQuests.value : weeklyQuests.value
    const quest = questList.find(q => q.id === questId)
    if (quest)
      quest.completed = true

    await saveQuests()
  }

  async function saveQuests() {
    const { auth, db } = useFirebase()
    const user = auth.currentUser
    if (!user)
      return

    const playerDoc = doc(db, 'players', user.uid)
    await setDoc(playerDoc, {
      dailyQuests: dailyQuests.value,
      weeklyQuests: weeklyQuests.value,
      dailyQuestsGeneratedAt: dailyQuestsGeneratedAt.value,
      weeklyQuestsGeneratedAt: weeklyQuestsGeneratedAt.value,
    }, { merge: true })
  }

  function startDailyCountdown() {
    const updateCountdown = () => {
      const now = new Date()
      const nextMidnight = new Date()
      nextMidnight.setHours(24, 0, 0, 0)

      const diffMs = nextMidnight.getTime() - now.getTime()
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMinutes / 60)

      if (diffMs <= 0) {
        fetchQuests()
        return
      }

      if (diffHours >= 1) {
        countdownToDailyReset.value = `${diffHours}h`
      }
      else {
        countdownToDailyReset.value = `${diffMinutes}m`
      }
    }

    updateCountdown()
    setInterval(updateCountdown, 60000)
  }

  function startWeeklyCountdown() {
    const updateCountdown = () => {
      const now = new Date()
      const nextSunday = new Date()
      nextSunday.setDate(now.getDate() + (7 - now.getDay()))
      nextSunday.setHours(23, 59, 0, 0)

      const diffMs = nextSunday.getTime() - now.getTime()
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMinutes / 60)
      const diffDays = Math.floor(diffHours / 24)

      if (diffMs <= 0) {
        fetchQuests()
        return
      }

      if (diffDays >= 1) {
        countdownToWeeklyReset.value = `${diffDays}d`
      }
      else if (diffHours >= 1) {
        countdownToWeeklyReset.value = `${diffHours}h`
      }
      else {
        countdownToWeeklyReset.value = `${diffMinutes}m`
      }
    }

    updateCountdown()
    setInterval(updateCountdown, 60000)
  }

  function startCountdown() {
    startDailyCountdown()
    startWeeklyCountdown()
  }

  function getQuestById(id: string): Quest | undefined {
    return [...dailyQuests.value, ...weeklyQuests.value].find(q => q.id === id)
  }

  async function markQuestAsClaimed(id: string) {
    const quest = getQuestById(id)
    if (!quest || quest.claimed)
      return

    quest.claimed = true
    await saveQuests() // persist to Firestore
  }

  const unclaimedCount = computed(() => {
    return [...dailyQuests.value, ...weeklyQuests.value]
      .filter(q => q.completed && !q.claimed)
      .length
  })

  return {
    dailyQuests,
    weeklyQuests,
    dailyQuestsGeneratedAt,
    weeklyQuestsGeneratedAt,
    countdownToDailyReset,
    countdownToWeeklyReset,
    fetchQuests,
    completeQuest,
    startCountdown,
    getQuestById,
    markQuestAsClaimed,
    unclaimedCount, // Optional since it will only load after we visit quest page
  }
})
