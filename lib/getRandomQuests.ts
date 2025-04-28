import type { Quest } from '@/types/quest'

/**
 * Randomly selects a number of quests from a list
 * @param quests - The list of available quests
 * @param count - How many quests you want to pick
 * @returns An array of randomly selected quests
 */
export function getRandomQuests(quests: Quest[], count: number): Quest[] {
  // Defensive copy to avoid modifying the original array
  const shuffled = [...quests].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
