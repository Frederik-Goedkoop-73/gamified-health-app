import type { Quest } from '~/types/quest'

export const dailyQuests: Quest[] = [
  { id: 'daily-1', title: 'Walk 3,000 steps', type: 'daily', target: 3000, activity: 'steps', rewardXP: 100, rewardCoins: 10, completed: false },
  { id: 'daily-2', title: 'Burn 500 calories', type: 'daily', target: 500, activity: 'calories', rewardXP: 100, rewardCoins: 10, completed: false },
  /* { id: 'daily-3', title: 'Sleep 7 hours', type: 'daily', target: 7, activity: 'sleep', rewardXP: 100, rewardCoins: 10, completed: false }, */
  { id: 'daily-4', title: 'Walk 5,000 steps', type: 'daily', target: 5000, activity: 'steps', rewardXP: 120, rewardCoins: 12, completed: false },
  { id: 'daily-5', title: 'Burn 700 calories', type: 'daily', target: 700, activity: 'calories', rewardXP: 120, rewardCoins: 12, completed: false },
  { id: 'daily-6', title: 'Active for 30 min', type: 'daily', target: 30, activity: 'AZM', rewardXP: 130, rewardCoins: 13, completed: false },
  /* { id: 'daily-7', title: 'Sleep 8 hours', type: 'daily', target: 8, activity: 'sleep', rewardXP: 130, rewardCoins: 13, completed: false }, */
  { id: 'daily-8', title: 'Walk 6,000 steps', type: 'daily', target: 6000, activity: 'steps', rewardXP: 140, rewardCoins: 14, completed: false },
  { id: 'daily-9', title: 'Burn 800 calories', type: 'daily', target: 800, activity: 'calories', rewardXP: 140, rewardCoins: 14, completed: false },
  { id: 'daily-10', title: 'Active for 45 min', type: 'daily', target: 45, activity: 'AZM', rewardXP: 150, rewardCoins: 15, completed: false },
  { id: 'daily-11', title: 'Walk 7,000 steps', type: 'daily', target: 7000, activity: 'steps', rewardXP: 150, rewardCoins: 15, completed: false },
  /* { id: 'daily-12', title: 'Sleep 6 hours', type: 'daily', target: 6, activity: 'sleep', rewardXP: 90, rewardCoins: 9, completed: false }, */
]

export const weeklyQuests: Quest[] = [
  { id: 'weekly-1', title: 'Walk 30,000 steps', type: 'weekly', target: 30000, activity: 'steps', rewardXP: 500, rewardCoins: 50, completed: false },
  { id: 'weekly-2', title: 'Burn 3,500 calories', type: 'weekly', target: 3500, activity: 'calories', rewardXP: 500, rewardCoins: 50, completed: false },
  { id: 'weekly-3', title: 'Sleep 49 hours', type: 'weekly', target: 49, activity: 'sleep', rewardXP: 500, rewardCoins: 50, completed: false },
  { id: 'weekly-4', title: 'Walk 40,000 steps', type: 'weekly', target: 40000, activity: 'steps', rewardXP: 600, rewardCoins: 60, completed: false },
  { id: 'weekly-5', title: 'Burn 4,000 calories', type: 'weekly', target: 4000, activity: 'calories', rewardXP: 600, rewardCoins: 60, completed: false },
  { id: 'weekly-6', title: 'Active for 180 min', type: 'weekly', target: 180, activity: 'AZM', rewardXP: 600, rewardCoins: 60, completed: false },
  { id: 'weekly-7', title: 'Sleep 52 hours', type: 'weekly', target: 52, activity: 'sleep', rewardXP: 600, rewardCoins: 60, completed: false },
  { id: 'weekly-8', title: 'Walk 50,000 steps', type: 'weekly', target: 50000, activity: 'steps', rewardXP: 700, rewardCoins: 70, completed: false },
  { id: 'weekly-9', title: 'Burn 5,000 calories', type: 'weekly', target: 5000, activity: 'calories', rewardXP: 700, rewardCoins: 70, completed: false },
  { id: 'weekly-10', title: 'Active for 240 min', type: 'weekly', target: 240, activity: 'AZM', rewardXP: 800, rewardCoins: 80, completed: false },
  { id: 'weekly-11', title: 'Walk 60,000 steps', type: 'weekly', target: 60000, activity: 'steps', rewardXP: 800, rewardCoins: 80, completed: false },
  { id: 'weekly-12', title: 'Sleep 56 hours', type: 'weekly', target: 56, activity: 'sleep', rewardXP: 800, rewardCoins: 80, completed: false },
]
