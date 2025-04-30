import type { Quest } from '~/types/quest'

export const dailyQuests: Quest[] = [
  // Steps - Normal
  { id: 'daily-steps-1', title: 'Walk 6,000 steps', type: 'daily', activity: 'steps', target: 5000, rewardXP: 100, rewardCoins: 10, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-2', title: 'Walk 7,000 steps', type: 'daily', activity: 'steps', target: 7000, rewardXP: 110, rewardCoins: 11, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-3', title: 'Walk 8,000 steps', type: 'daily', activity: 'steps', target: 8000, rewardXP: 120, rewardCoins: 12, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-4', title: 'Walk 9,000 steps', type: 'daily', activity: 'steps', target: 9000, rewardXP: 130, rewardCoins: 13, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-5', title: 'Walk 10,000 steps', type: 'daily', activity: 'steps', target: 10000, rewardXP: 140, rewardCoins: 14, difficulty: 'normal', icon: 'Footprints' },
  // Steps - Hard
  { id: 'daily-steps-hard-1', title: 'Walk 12,500 steps', type: 'daily', activity: 'steps', target: 12500, rewardXP: 170, rewardCoins: 20, difficulty: 'hard', icon: 'Footprints' },
  { id: 'daily-steps-hard-2', title: 'Walk 15,000 steps', type: 'daily', activity: 'steps', target: 15000, rewardXP: 200, rewardCoins: 25, difficulty: 'hard', icon: 'Footprints' },
  { id: 'daily-steps-hard-3', title: 'Walk 20,000 steps', type: 'daily', activity: 'steps', target: 20000, rewardXP: 220, rewardCoins: 30, difficulty: 'hard', icon: 'Footprints' },

  // Calories - Normal
  { id: 'daily-calories-1', title: 'Burn 1500 kcal', type: 'daily', activity: 'calories', target: 1500, rewardXP: 100, rewardCoins: 10, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-2', title: 'Burn 1750 kcal', type: 'daily', activity: 'calories', target: 1750, rewardXP: 110, rewardCoins: 11, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-3', title: 'Burn 2000 kcal', type: 'daily', activity: 'calories', target: 2000, rewardXP: 120, rewardCoins: 12, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-4', title: 'Burn 2250 kcal', type: 'daily', activity: 'calories', target: 2250, rewardXP: 130, rewardCoins: 13, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-5', title: 'Burn 2500 kcal', type: 'daily', activity: 'calories', target: 2500, rewardXP: 140, rewardCoins: 14, difficulty: 'normal', icon: 'Flame' },
  // Calories - Hard
  { id: 'daily-calories-hard-1', title: 'Burn 3000 kcal', type: 'daily', activity: 'calories', target: 3000, rewardXP: 170, rewardCoins: 20, difficulty: 'hard', icon: 'Flame' },
  { id: 'daily-calories-hard-2', title: 'Burn 3250 kcal', type: 'daily', activity: 'calories', target: 3250, rewardXP: 200, rewardCoins: 25, difficulty: 'hard', icon: 'Flame' },
  { id: 'daily-calories-hard-3', title: 'Burn 3500 kcal', type: 'daily', activity: 'calories', target: 3500, rewardXP: 220, rewardCoins: 30, difficulty: 'hard', icon: 'Flame' },

  // AZM - Normal
  { id: 'daily-AZM-1', title: 'Be active for 15 min', type: 'daily', activity: 'AZM', target: 15, rewardXP: 100, rewardCoins: 10, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-2', title: 'Be active for 20 min', type: 'daily', activity: 'AZM', target: 20, rewardXP: 110, rewardCoins: 11, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-3', title: 'Be active for 25 min', type: 'daily', activity: 'AZM', target: 25, rewardXP: 120, rewardCoins: 12, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-4', title: 'Be active for 30 min', type: 'daily', activity: 'AZM', target: 30, rewardXP: 130, rewardCoins: 13, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-5', title: 'Be active for 45 min', type: 'daily', activity: 'AZM', target: 45, rewardXP: 140, rewardCoins: 14, difficulty: 'normal', icon: 'Zap' },
  // AZM - Hard
  { id: 'daily-AZM-hard-1', title: 'Be active for 60 min', type: 'daily', activity: 'AZM', target: 60, rewardXP: 170, rewardCoins: 20, difficulty: 'hard', icon: 'Zap' },
  { id: 'daily-AZM-hard-2', title: 'Be active for 75 min', type: 'daily', activity: 'AZM', target: 90, rewardXP: 200, rewardCoins: 25, difficulty: 'hard', icon: 'Zap' },
  { id: 'daily-AZM-hard-3', title: 'Be active for 90 min', type: 'daily', activity: 'AZM', target: 120, rewardXP: 220, rewardCoins: 30, difficulty: 'hard', icon: 'Zap' },
]

export const weeklyQuests: Quest[] = [
  // Steps - Normal, Hard, Legendary
  { id: 'weekly-steps-1', title: 'Walk 35,000 steps', type: 'weekly', activity: 'steps', target: 35000, rewardXP: 500, rewardCoins: 70, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-2', title: 'Walk 40,000 steps', type: 'weekly', activity: 'steps', target: 40000, rewardXP: 520, rewardCoins: 80, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-3', title: 'Walk 45,000 steps', type: 'weekly', activity: 'steps', target: 45000, rewardXP: 540, rewardCoins: 90, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-4', title: 'Walk 50,000 steps', type: 'weekly', activity: 'steps', target: 50000, rewardXP: 560, rewardCoins: 100, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-5', title: 'Walk 55,000 steps', type: 'weekly', activity: 'steps', target: 55000, rewardXP: 580, rewardCoins: 110, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-hard-1', title: 'Walk 60,000 steps', type: 'weekly', activity: 'steps', target: 60000, rewardXP: 700, rewardCoins: 150, difficulty: 'hard', icon: 'Footprints' },
  { id: 'weekly-steps-hard-2', title: 'Walk 65,000 steps', type: 'weekly', activity: 'steps', target: 65000, rewardXP: 750, rewardCoins: 200, difficulty: 'hard', icon: 'Footprints' },
  { id: 'weekly-steps-hard-3', title: 'Walk 75,000 steps', type: 'weekly', activity: 'steps', target: 75000, rewardXP: 800, rewardCoins: 250, difficulty: 'hard', icon: 'Footprints' },
  { id: 'weekly-steps-legendary', title: 'Walk 100,000 steps', type: 'weekly', activity: 'steps', target: 100000, rewardXP: 2000, rewardCoins: 1000, difficulty: 'legendary', icon: 'Footprints' },

  // Calories - Normal, Hard, Legendary
  { id: 'weekly-calories-1', title: 'Burn 8000 kcal', type: 'weekly', activity: 'calories', target: 8000, rewardXP: 500, rewardCoins: 80, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-2', title: 'Burn 9000 kcal', type: 'weekly', activity: 'calories', target: 9000, rewardXP: 520, rewardCoins: 90, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-3', title: 'Burn 10000 kcal', type: 'weekly', activity: 'calories', target: 10000, rewardXP: 540, rewardCoins: 100, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-4', title: 'Burn 11000 kcal', type: 'weekly', activity: 'calories', target: 11000, rewardXP: 560, rewardCoins: 110, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-5', title: 'Burn 12000 kcal', type: 'weekly', activity: 'calories', target: 12000, rewardXP: 580, rewardCoins: 120, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-hard-1', title: 'Burn 15000 kcal', type: 'weekly', activity: 'calories', target: 15000, rewardXP: 700, rewardCoins: 150, difficulty: 'hard', icon: 'Flame' },
  { id: 'weekly-calories-hard-2', title: 'Burn 17500 kcal', type: 'weekly', activity: 'calories', target: 17500, rewardXP: 750, rewardCoins: 200, difficulty: 'hard', icon: 'Flame' },
  { id: 'weekly-calories-hard-3', title: 'Burn 20000 kcal', type: 'weekly', activity: 'calories', target: 20000, rewardXP: 800, rewardCoins: 250, difficulty: 'hard', icon: 'Flame' },
  { id: 'weekly-calories-legendary', title: 'Burn 30000 kcal', type: 'weekly', activity: 'calories', target: 30000, rewardXP: 2000, rewardCoins: 1000, difficulty: 'legendary', icon: 'Flame' },

  // Sleep - Normal, Hard
  { id: 'weekly-sleep-1', title: 'Sleep 42 h', type: 'weekly', activity: 'sleep', target: 42, rewardXP: 500, rewardCoins: 80, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-2', title: 'Sleep 44 h', type: 'weekly', activity: 'sleep', target: 44, rewardXP: 520, rewardCoins: 90, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-3', title: 'Sleep 46 h', type: 'weekly', activity: 'sleep', target: 46, rewardXP: 540, rewardCoins: 100, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-4', title: 'Sleep 48 h', type: 'weekly', activity: 'sleep', target: 48, rewardXP: 560, rewardCoins: 110, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-5', title: 'Sleep 50 h', type: 'weekly', activity: 'sleep', target: 50, rewardXP: 580, rewardCoins: 120, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-hard-1', title: 'Sleep 54 h', type: 'weekly', activity: 'sleep', target: 54, rewardXP: 700, rewardCoins: 150, difficulty: 'hard', icon: 'MoonStar' },
  { id: 'weekly-sleep-hard-2', title: 'Sleep 56 h', type: 'weekly', activity: 'sleep', target: 56, rewardXP: 750, rewardCoins: 200, difficulty: 'hard', icon: 'MoonStar' },
  { id: 'weekly-sleep-hard-3', title: 'Sleep 60 h', type: 'weekly', activity: 'sleep', target: 60, rewardXP: 800, rewardCoins: 250, difficulty: 'hard', icon: 'MoonStar' },

  // AZM - Normal, Hard, Legendary
  { id: 'weekly-AZM-1', title: 'Be active for 90 min', type: 'weekly', activity: 'AZM', target: 90, rewardXP: 500, rewardCoins: 80, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-2', title: 'Be active for 120 min', type: 'weekly', activity: 'AZM', target: 120, rewardXP: 520, rewardCoins: 90, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-3', title: 'Be active for 150 min', type: 'weekly', activity: 'AZM', target: 150, rewardXP: 540, rewardCoins: 100, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-4', title: 'Be active for 180 min', type: 'weekly', activity: 'AZM', target: 180, rewardXP: 560, rewardCoins: 110, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-5', title: 'Be active for 200 min', type: 'weekly', activity: 'AZM', target: 200, rewardXP: 580, rewardCoins: 120, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-hard-1', title: 'Be active for 250 min', type: 'weekly', activity: 'AZM', target: 250, rewardXP: 700, rewardCoins: 250, difficulty: 'hard', icon: 'Zap' },
  { id: 'weekly-AZM-hard-2', title: 'Be active for 300 min', type: 'weekly', activity: 'AZM', target: 300, rewardXP: 750, rewardCoins: 300, difficulty: 'hard', icon: 'Zap' },
  { id: 'weekly-AZM-hard-3', title: 'Be active for 400 min', type: 'weekly', activity: 'AZM', target: 400, rewardXP: 800, rewardCoins: 400, difficulty: 'hard', icon: 'Zap' },
  { id: 'weekly-AZM-legendary', title: 'Be active for 650 min', type: 'weekly', activity: 'AZM', target: 650, rewardXP: 2000, rewardCoins: 1000, difficulty: 'legendary', icon: 'Zap' },
]
