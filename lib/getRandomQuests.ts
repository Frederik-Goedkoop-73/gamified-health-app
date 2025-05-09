import type { Quest } from '@/types/quest'

/**
 * Randomly selects daily or weekly quests from a list with constraints
 * @param quests - The list of available quests
 * @param type - 'daily' or 'weekly'
 * @param previous - Previously selected quests to avoid duplicates
 * @returns An array of selected quests
 */
export function getRandomQuests(
  quests: Quest[],
  type: 'daily' | 'weekly',
  previous: Quest[] = [],
): Quest[] {
  const sortByDifficulty = (a: Quest, b: Quest) => {
    const order = { normal: 1, hard: 2, legendary: 3 }
    return order[a.difficulty] - order[b.difficulty]
  }

  if (type === 'daily') {
    const categories = ['steps', 'distance', 'calories', 'AZM']
    const selected: Quest[] = []

    const usedCategories = new Set<string>()
    const previousIds = new Set(previous.map(q => q.id))
    const shuffled = [...quests].filter(q => !previousIds.has(q.id)).sort(() => Math.random() - 0.5)

    // First, ensure one hard quest
    const hardQuest = shuffled.find(q => q.difficulty === 'hard' && !usedCategories.has(q.activity))
    if (hardQuest) {
      selected.push(hardQuest)
      usedCategories.add(hardQuest.activity)
    }

    // Then, fill in with two normal quests of different categories
    for (const quest of shuffled) {
      if (
        selected.length < 3
        && quest.difficulty === 'normal'
        && !usedCategories.has(quest.activity)
        && categories.includes(quest.activity)
      ) {
        selected.push(quest)
        usedCategories.add(quest.activity)
      }
    }

    return selected.slice(0, 3).sort(sortByDifficulty)
  }

  if (type === 'weekly') {
    const selected: Quest[] = []
    const usedActivities = new Set<string>()
    const previousIds = new Set(previous.map(q => q.id))
    const hadLegendaryLastWeek = previous.some(q => q.difficulty === 'legendary')
    const availableQuests = quests.filter(q => !previousIds.has(q.id))

    // Group quests by activity first
    const questsByActivity: Record<string, Quest[]> = {}
    availableQuests.forEach((quest) => {
      if (!questsByActivity[quest.activity]) {
        questsByActivity[quest.activity] = []
      }
      questsByActivity[quest.activity].push(quest)
    })

    // Get all available activities
    const availableActivities = Object.keys(questsByActivity)

    // Shuffle activities to randomize selection
    const shuffledActivities = [...availableActivities].sort(() => Math.random() - 0.5)

    // First, select 3 normal quests with unique activities
    for (const activity of shuffledActivities) {
      if (selected.length >= 3)
        break

      const normalQuest = questsByActivity[activity].find(q => q.difficulty === 'normal')
      if (normalQuest) {
        selected.push(normalQuest)
        usedActivities.add(activity)
      }
    }

    // If we don't have enough normals, fill with any unique quests
    if (selected.length < 3) {
      for (const activity of shuffledActivities) {
        if (selected.length >= 3)
          break
        if (!usedActivities.has(activity)) {
          const anyQuest = questsByActivity[activity][0] // Take first available
          selected.push(anyQuest)
          usedActivities.add(activity)
        }
      }
    }

    // Now select either:
    // - 2 hard quests with unique activities OR
    // - 1 hard + 1 legendary with unique activities (if no legendary last week)
    const remainingActivities = shuffledActivities.filter(a => !usedActivities.has(a))

    if (!hadLegendaryLastWeek) {
      // Try to find 1 hard and 1 legendary from remaining activities
      for (const activity of remainingActivities) {
        if (selected.length >= 5)
          break

        const legendaryQuest = questsByActivity[activity].find(q => q.difficulty === 'legendary')
        if (legendaryQuest) {
          selected.push(legendaryQuest)
          usedActivities.add(activity)
          break // Only want one legendary
        }
      }

      // Now find a hard quest
      for (const activity of remainingActivities) {
        if (selected.length >= 5)
          break
        if (!usedActivities.has(activity)) {
          const hardQuest = questsByActivity[activity].find(q => q.difficulty === 'hard')
          if (hardQuest) {
            selected.push(hardQuest)
            usedActivities.add(activity)
          }
        }
      }
    }
    else {
      // Find 2 hard quests from remaining activities
      let hardQuestsAdded = 0
      for (const activity of remainingActivities) {
        if (selected.length >= 5 || hardQuestsAdded >= 2)
          break

        const hardQuest = questsByActivity[activity].find(q => q.difficulty === 'hard')
        if (hardQuest) {
          selected.push(hardQuest)
          usedActivities.add(activity)
          hardQuestsAdded++
        }
      }
    }

    // If we still don't have enough quests, fill with any remaining unique ones
    if (selected.length < 5) {
      for (const activity of shuffledActivities) {
        if (selected.length >= 5)
          break
        if (!usedActivities.has(activity)) {
          const anyQuest = questsByActivity[activity][0] // Take first available
          selected.push(anyQuest)
          usedActivities.add(activity)
        }
      }
    }

    return selected.sort(sortByDifficulty).slice(0, 5)
  }

  return []
}
