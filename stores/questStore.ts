import type { Quest } from '@/types/quest'
import { format } from 'date-fns'
import { doc, getDoc, setDoc } from 'firebase/firestore'
// stores/questStore.ts
import { defineStore } from 'pinia'
import { dailyQuests as dailyQuestsArray, weeklyQuests as weeklyQuestsArray } from '~/components/tasks/data/questData'
import { useFitbitCachedData } from '~/composables/useFitbitCachedData'
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
  // For data fetch on new quest generation
  const fitbit = useFitbitCachedData()
  const clearCacheAndFetch = fitbit.clearCacheAndFetch!

  async function fetchQuests() {
    const { auth, db } = useFirebase()
    const user = auth.currentUser
    let questsRefreshed = false

    if (!user)
      return

    const playerDoc = doc(db, 'players', user.uid)
    const snapshot = await getDoc(playerDoc)

    const now = new Date()
    const today = format(now, 'yyyy-MM-dd')

    const lastMonday = new Date(now)
    lastMonday.setDate(now.getDate() - ((now.getDay() + 6) % 7)) // Get last Monday
    lastMonday.setHours(0, 0, 0, 0)
    const mondayKey = lastMonday.toISOString()

    if (snapshot.exists()) {
      const data = snapshot.data()
      dailyQuests.value = data.dailyQuests ?? []
      weeklyQuests.value = data.weeklyQuests ?? []
      dailyQuestsGeneratedAt.value = data.dailyQuestsGeneratedAt ?? ''
      weeklyQuestsGeneratedAt.value = data.weeklyQuestsGeneratedAt ?? ''

      if (dailyQuestsGeneratedAt.value !== today) {
        await generateNewDailyQuests(today)
        questsRefreshed = true
      }

      if (weeklyQuestsGeneratedAt.value !== mondayKey) {
        await generateNewWeeklyQuests(mondayKey)
        questsRefreshed = true
      }
    }
    else {
      await generateNewDailyQuests(today)
      await generateNewWeeklyQuests(mondayKey)
      questsRefreshed = true
    }
    // Fetch new fitbit data
    if (questsRefreshed) {
      await clearCacheAndFetch()
      questsRefreshed = false
    }

    startCountdown()
  }

  async function generateNewDailyQuests(today: string) {
    const { auth, db } = useFirebase()
    const user = auth.currentUser
    if (!user)
      return

    dailyQuests.value = getRandomQuests(dailyQuestsArray, 'daily', dailyQuests.value).map(q => ({ ...q, completed: false }))
    dailyQuestsGeneratedAt.value = today
    console.warn('Daily quests generated at:', today, dailyQuests.value)

    const playerDoc = doc(db, 'players', user.uid)
    await setDoc(playerDoc, {
      dailyQuests: dailyQuests.value,
      dailyQuestsGeneratedAt: today,
    }, { merge: true })
    console.warn('Set doc to', dailyQuestsGeneratedAt.value)
  }

  async function generateNewWeeklyQuests(mondayKey: string) {
    const { auth, db } = useFirebase()
    const user = auth.currentUser
    if (!user)
      return

    weeklyQuests.value = getRandomQuests(weeklyQuestsArray, 'weekly', weeklyQuests.value).map(q => ({ ...q, completed: false }))
    weeklyQuestsGeneratedAt.value = mondayKey

    const playerDoc = doc(db, 'players', user.uid)
    await setDoc(playerDoc, {
      weeklyQuests: weeklyQuests.value,
      weeklyQuestsGeneratedAt: mondayKey,
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

      countdownToDailyReset.value = diffHours >= 1 ? `${diffHours}h` : `${diffMinutes}m`
    }

    updateCountdown()
    setInterval(updateCountdown, 60000)
  }

  let hasResetThisWeek = false

  function startWeeklyCountdown() {
    const updateCountdown = () => {
      const now = new Date()
      const nextMonday = new Date(now)
      const day = now.getDay()
      const daysUntilMonday = (8 - day) % 7 || 7
      nextMonday.setDate(now.getDate() + daysUntilMonday)
      nextMonday.setHours(0, 0, 0, 0)

      const diffMs = nextMonday.getTime() - now.getTime()

      if (diffMs <= 60000 && !hasResetThisWeek) {
        hasResetThisWeek = true
        fetchQuests()
      }

      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      const diffHours = Math.floor(diffMinutes / 60)
      const diffDays = Math.floor(diffHours / 24)

      if (diffDays >= 1)
        countdownToWeeklyReset.value = `${diffDays}d`
      else if (diffHours >= 1)
        countdownToWeeklyReset.value = `${diffHours}h`
      else countdownToWeeklyReset.value = `${diffMinutes}m`
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
    await saveQuests()
  }

  const unclaimedCount = computed(() => {
    return [...dailyQuests.value, ...weeklyQuests.value].filter(q => q.completed && !q.claimed).length
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
    unclaimedCount,
  }
})
