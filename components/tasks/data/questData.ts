import type { Quest } from '~/types/quest'

export const dailyQuests: Quest[] = [
  // Steps - Normal
  { id: 'daily-steps-1', title: 'Walk 6,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 6000, rewardXP: 100, rewardCoins: 10, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-2', title: 'Walk 7,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 7000, rewardXP: 110, rewardCoins: 11, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-3', title: 'Walk 8,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 8000, rewardXP: 120, rewardCoins: 12, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-4', title: 'Walk 9,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 9000, rewardXP: 130, rewardCoins: 13, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-5', title: 'Walk 10,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 10000, rewardXP: 140, rewardCoins: 14, difficulty: 'normal', icon: 'Footprints' },
  // Steps - Hard
  { id: 'daily-steps-hard-1', title: 'Walk 12,500 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 12500, rewardXP: 170, rewardCoins: 20, difficulty: 'hard', icon: 'Footprints' },
  { id: 'daily-steps-hard-2', title: 'Walk 15,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 15000, rewardXP: 200, rewardCoins: 25, difficulty: 'hard', icon: 'Footprints' },
  { id: 'daily-steps-hard-3', title: 'Walk 20,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 20000, rewardXP: 220, rewardCoins: 30, difficulty: 'hard', icon: 'Footprints' },

  // Distance - Normal
  { id: 'daily-distance-1', title: 'Travel 4 km', type: 'daily', activity: 'distance', unit: 'km', target: 4, rewardXP: 100, rewardCoins: 10, difficulty: 'normal', icon: 'Ruler' },
  { id: 'daily-distance-2', title: 'Travel 5 km', type: 'daily', activity: 'distance', unit: 'km', target: 5, rewardXP: 110, rewardCoins: 11, difficulty: 'normal', icon: 'Ruler' },
  { id: 'daily-distance-3', title: 'Travel 6 km', type: 'daily', activity: 'distance', unit: 'km', target: 6, rewardXP: 120, rewardCoins: 12, difficulty: 'normal', icon: 'Ruler' },
  { id: 'daily-distance-4', title: 'Travel 7 km', type: 'daily', activity: 'distance', unit: 'km', target: 7, rewardXP: 130, rewardCoins: 13, difficulty: 'normal', icon: 'Ruler' },
  { id: 'daily-distance-5', title: 'Travel 8 km', type: 'daily', activity: 'distance', unit: 'km', target: 8, rewardXP: 140, rewardCoins: 14, difficulty: 'normal', icon: 'Ruler' },
  // Distance - Hard
  { id: 'daily-distance-hard-1', title: 'Travel 10 km', type: 'daily', activity: 'distance', unit: 'km', target: 10, rewardXP: 170, rewardCoins: 20, difficulty: 'hard', icon: 'Ruler' },
  { id: 'daily-distance-hard-2', title: 'Travel 12,5 km', type: 'daily', activity: 'distance', unit: 'km', target: 12.5, rewardXP: 200, rewardCoins: 25, difficulty: 'hard', icon: 'Ruler' },
  { id: 'daily-distance-hard-3', title: 'Travel 15 km', type: 'daily', activity: 'distance', unit: 'km', target: 15, rewardXP: 220, rewardCoins: 30, difficulty: 'hard', icon: 'Ruler' },

  // Calories - Normal
  { id: 'daily-calories-1', title: 'Burn 1500 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 1500, rewardXP: 100, rewardCoins: 10, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-2', title: 'Burn 1750 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 1750, rewardXP: 110, rewardCoins: 11, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-3', title: 'Burn 2000 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 2000, rewardXP: 120, rewardCoins: 12, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-4', title: 'Burn 2250 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 2250, rewardXP: 130, rewardCoins: 13, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-5', title: 'Burn 2500 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 2500, rewardXP: 140, rewardCoins: 14, difficulty: 'normal', icon: 'Flame' },
  // Calories - Hard
  { id: 'daily-calories-hard-1', title: 'Burn 3000 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 3000, rewardXP: 170, rewardCoins: 20, difficulty: 'hard', icon: 'Flame' },
  { id: 'daily-calories-hard-2', title: 'Burn 3250 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 3250, rewardXP: 200, rewardCoins: 25, difficulty: 'hard', icon: 'Flame' },
  { id: 'daily-calories-hard-3', title: 'Burn 3500 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 3500, rewardXP: 220, rewardCoins: 30, difficulty: 'hard', icon: 'Flame' },

  // AZM - Normal
  { id: 'daily-AZM-1', title: 'Be active for 15 min', type: 'daily', activity: 'AZM', unit: 'm', target: 15, rewardXP: 100, rewardCoins: 10, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-2', title: 'Be active for 20 min', type: 'daily', activity: 'AZM', unit: 'm', target: 20, rewardXP: 110, rewardCoins: 11, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-3', title: 'Be active for 25 min', type: 'daily', activity: 'AZM', unit: 'm', target: 25, rewardXP: 120, rewardCoins: 12, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-4', title: 'Be active for 30 min', type: 'daily', activity: 'AZM', unit: 'm', target: 30, rewardXP: 130, rewardCoins: 13, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-5', title: 'Be active for 45 min', type: 'daily', activity: 'AZM', unit: 'm', target: 45, rewardXP: 140, rewardCoins: 14, difficulty: 'normal', icon: 'Zap' },
  // AZM - Hard
  { id: 'daily-AZM-hard-1', title: 'Be active for 60 min', type: 'daily', activity: 'AZM', unit: 'm', target: 60, rewardXP: 170, rewardCoins: 20, difficulty: 'hard', icon: 'Zap' },
  { id: 'daily-AZM-hard-2', title: 'Be active for 90 min', type: 'daily', activity: 'AZM', unit: 'm', target: 90, rewardXP: 220, rewardCoins: 25, difficulty: 'hard', icon: 'Zap' },
  { id: 'daily-AZM-hard-3', title: 'Be active for 120 min', type: 'daily', activity: 'AZM', unit: 'm', target: 120, rewardXP: 250, rewardCoins: 30, difficulty: 'hard', icon: 'Zap' },
]

export const weeklyQuests: Quest[] = [
  // Steps - Normal, Hard, Legendary
  { id: 'weekly-steps-1', title: 'Walk 35,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 35000, rewardXP: 500, rewardCoins: 70, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-2', title: 'Walk 40,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 40000, rewardXP: 520, rewardCoins: 80, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-3', title: 'Walk 45,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 45000, rewardXP: 540, rewardCoins: 90, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-4', title: 'Walk 50,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 50000, rewardXP: 560, rewardCoins: 100, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-5', title: 'Walk 55,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 55000, rewardXP: 580, rewardCoins: 110, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-hard-1', title: 'Walk 60,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 60000, rewardXP: 700, rewardCoins: 150, difficulty: 'hard', icon: 'Footprints' },
  { id: 'weekly-steps-hard-2', title: 'Walk 65,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 65000, rewardXP: 750, rewardCoins: 200, difficulty: 'hard', icon: 'Footprints' },
  { id: 'weekly-steps-hard-3', title: 'Walk 75,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 75000, rewardXP: 800, rewardCoins: 250, difficulty: 'hard', icon: 'Footprints' },
  { id: 'weekly-steps-legendary', title: 'Walk 100,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 100000, rewardXP: 2000, rewardCoins: 1000, difficulty: 'legendary', icon: 'Footprints' },

  // Distance - Normal, Hard, Legendary
  { id: 'weekly-distance-1', title: 'Travel 20 km', type: 'weekly', activity: 'distance', unit: 'km', target: 20, rewardXP: 500, rewardCoins: 70, difficulty: 'normal', icon: 'Ruler' },
  { id: 'weekly-distance-2', title: 'Travel 25 km', type: 'weekly', activity: 'distance', unit: 'km', target: 25, rewardXP: 520, rewardCoins: 80, difficulty: 'normal', icon: 'Ruler' },
  { id: 'weekly-distance-3', title: 'Travel 30 km', type: 'weekly', activity: 'distance', unit: 'km', target: 30, rewardXP: 540, rewardCoins: 90, difficulty: 'normal', icon: 'Ruler' },
  { id: 'weekly-distance-4', title: 'Travel 35 km', type: 'weekly', activity: 'distance', unit: 'km', target: 35, rewardXP: 560, rewardCoins: 100, difficulty: 'normal', icon: 'Ruler' },
  { id: 'weekly-distance-5', title: 'Travel 40 km', type: 'weekly', activity: 'distance', unit: 'km', target: 40, rewardXP: 580, rewardCoins: 110, difficulty: 'normal', icon: 'Ruler' },
  { id: 'weekly-distance-hard-1', title: 'Travel 50 km', type: 'weekly', activity: 'distance', unit: 'km', target: 50, rewardXP: 700, rewardCoins: 150, difficulty: 'hard', icon: 'Ruler' },
  { id: 'weekly-distance-hard-2', title: 'Travel 55 km', type: 'weekly', activity: 'distance', unit: 'km', target: 55, rewardXP: 750, rewardCoins: 200, difficulty: 'hard', icon: 'Ruler' },
  { id: 'weekly-distance-hard-3', title: 'Travel 60 km', type: 'weekly', activity: 'distance', unit: 'km', target: 60, rewardXP: 800, rewardCoins: 250, difficulty: 'hard', icon: 'Ruler' },
  { id: 'weekly-distance-legendary', title: 'Travel 80 km', type: 'weekly', activity: 'distance', unit: 'km', target: 80, rewardXP: 2000, rewardCoins: 1000, difficulty: 'legendary', icon: 'Ruler' },

  // Calories - Normal, Hard, Legendary
  { id: 'weekly-calories-1', title: 'Burn 8000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 8000, rewardXP: 500, rewardCoins: 80, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-2', title: 'Burn 9000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 9000, rewardXP: 520, rewardCoins: 90, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-3', title: 'Burn 10000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 10000, rewardXP: 540, rewardCoins: 100, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-4', title: 'Burn 11000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 11000, rewardXP: 560, rewardCoins: 110, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-5', title: 'Burn 12000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 12000, rewardXP: 580, rewardCoins: 120, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-hard-1', title: 'Burn 15000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 15000, rewardXP: 700, rewardCoins: 150, difficulty: 'hard', icon: 'Flame' },
  { id: 'weekly-calories-hard-2', title: 'Burn 17500 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 17500, rewardXP: 750, rewardCoins: 200, difficulty: 'hard', icon: 'Flame' },
  { id: 'weekly-calories-hard-3', title: 'Burn 20000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 20000, rewardXP: 800, rewardCoins: 250, difficulty: 'hard', icon: 'Flame' },
  { id: 'weekly-calories-legendary', title: 'Burn 30000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 30000, rewardXP: 2000, rewardCoins: 1000, difficulty: 'legendary', icon: 'Flame' },

  // Sleep - Normal, Hard
  { id: 'weekly-sleep-1', title: 'Sleep 42 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 42, rewardXP: 500, rewardCoins: 80, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-2', title: 'Sleep 44 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 44, rewardXP: 520, rewardCoins: 90, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-3', title: 'Sleep 46 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 46, rewardXP: 540, rewardCoins: 100, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-4', title: 'Sleep 48 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 48, rewardXP: 560, rewardCoins: 110, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-5', title: 'Sleep 50 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 50, rewardXP: 580, rewardCoins: 120, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-hard-1', title: 'Sleep 54 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 54, rewardXP: 700, rewardCoins: 150, difficulty: 'hard', icon: 'MoonStar' },
  { id: 'weekly-sleep-hard-2', title: 'Sleep 56 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 56, rewardXP: 750, rewardCoins: 200, difficulty: 'hard', icon: 'MoonStar' },
  { id: 'weekly-sleep-hard-3', title: 'Sleep 60 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 60, rewardXP: 800, rewardCoins: 250, difficulty: 'hard', icon: 'MoonStar' },

  // AZM - Normal, Hard, Legendary
  { id: 'weekly-AZM-1', title: 'Be active for 90 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 90, rewardXP: 500, rewardCoins: 80, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-2', title: 'Be active for 120 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 120, rewardXP: 520, rewardCoins: 90, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-3', title: 'Be active for 150 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 150, rewardXP: 540, rewardCoins: 100, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-4', title: 'Be active for 180 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 180, rewardXP: 560, rewardCoins: 110, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-5', title: 'Be active for 200 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 200, rewardXP: 580, rewardCoins: 120, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-hard-1', title: 'Be active for 250 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 250, rewardXP: 700, rewardCoins: 250, difficulty: 'hard', icon: 'Zap' },
  { id: 'weekly-AZM-hard-2', title: 'Be active for 300 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 300, rewardXP: 750, rewardCoins: 300, difficulty: 'hard', icon: 'Zap' },
  { id: 'weekly-AZM-hard-3', title: 'Be active for 400 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 400, rewardXP: 800, rewardCoins: 400, difficulty: 'hard', icon: 'Zap' },
  { id: 'weekly-AZM-legendary', title: 'Be active for 650 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 650, rewardXP: 2000, rewardCoins: 1000, difficulty: 'legendary', icon: 'Zap' },
]

// Updates for Monday

/* export const dailyQuests: Quest[] = [
  // Steps - Normal
  { id: 'daily-steps-1', title: 'Walk 6,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 6000, rewardXP: 100, rewardCoins: 40, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-2', title: 'Walk 7,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 7000, rewardXP: 110, rewardCoins: 44, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-3', title: 'Walk 8,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 8000, rewardXP: 120, rewardCoins: 48, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-4', title: 'Walk 9,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 9000, rewardXP: 130, rewardCoins: 52, difficulty: 'normal', icon: 'Footprints' },
  { id: 'daily-steps-5', title: 'Walk 10,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 10000, rewardXP: 140, rewardCoins: 56, difficulty: 'normal', icon: 'Footprints' },
  // Steps - Hard
  { id: 'daily-steps-hard-1', title: 'Walk 12,500 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 12500, rewardXP: 170, rewardCoins: 80, difficulty: 'hard', icon: 'Footprints' },
  { id: 'daily-steps-hard-2', title: 'Walk 15,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 15000, rewardXP: 200, rewardCoins: 100, difficulty: 'hard', icon: 'Footprints' },
  { id: 'daily-steps-hard-3', title: 'Walk 20,000 steps', type: 'daily', activity: 'steps', unit: 'steps', target: 20000, rewardXP: 220, rewardCoins: 120, difficulty: 'hard', icon: 'Footprints' },

  // Distance - Normal
  { id: 'daily-distance-1', title: 'Travel 4 km', type: 'daily', activity: 'distance', unit: 'km', target: 4, rewardXP: 100, rewardCoins: 40, difficulty: 'normal', icon: 'Ruler' },
  { id: 'daily-distance-2', title: 'Travel 5 km', type: 'daily', activity: 'distance', unit: 'km', target: 5, rewardXP: 110, rewardCoins: 44, difficulty: 'normal', icon: 'Ruler' },
  { id: 'daily-distance-3', title: 'Travel 6 km', type: 'daily', activity: 'distance', unit: 'km', target: 6, rewardXP: 120, rewardCoins: 48, difficulty: 'normal', icon: 'Ruler' },
  { id: 'daily-distance-4', title: 'Travel 7 km', type: 'daily', activity: 'distance', unit: 'km', target: 7, rewardXP: 130, rewardCoins: 52, difficulty: 'normal', icon: 'Ruler' },
  { id: 'daily-distance-5', title: 'Travel 8 km', type: 'daily', activity: 'distance', unit: 'km', target: 8, rewardXP: 140, rewardCoins: 56, difficulty: 'normal', icon: 'Ruler' },
  // Distance - Hard
  { id: 'daily-distance-hard-1', title: 'Travel 10 km', type: 'daily', activity: 'distance', unit: 'km', target: 10, rewardXP: 170, rewardCoins: 80, difficulty: 'hard', icon: 'Ruler' },
  { id: 'daily-distance-hard-2', title: 'Travel 12,5 km', type: 'daily', activity: 'distance', unit: 'km', target: 12.5, rewardXP: 200, rewardCoins: 100, difficulty: 'hard', icon: 'Ruler' },
  { id: 'daily-distance-hard-3', title: 'Travel 15 km', type: 'daily', activity: 'distance', unit: 'km', target: 15, rewardXP: 220, rewardCoins: 120, difficulty: 'hard', icon: 'Ruler' },

  // Calories - Normal
  { id: 'daily-calories-1', title: 'Burn 1500 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 1500, rewardXP: 100, rewardCoins: 40, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-2', title: 'Burn 1750 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 1750, rewardXP: 110, rewardCoins: 44, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-3', title: 'Burn 2000 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 2000, rewardXP: 120, rewardCoins: 48, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-4', title: 'Burn 2250 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 2250, rewardXP: 130, rewardCoins: 52, difficulty: 'normal', icon: 'Flame' },
  { id: 'daily-calories-5', title: 'Burn 2500 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 2500, rewardXP: 140, rewardCoins: 56, difficulty: 'normal', icon: 'Flame' },
  // Calories - Hard
  { id: 'daily-calories-hard-1', title: 'Burn 3000 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 3000, rewardXP: 170, rewardCoins: 80, difficulty: 'hard', icon: 'Flame' },
  { id: 'daily-calories-hard-2', title: 'Burn 3250 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 3250, rewardXP: 200, rewardCoins: 100, difficulty: 'hard', icon: 'Flame' },
  { id: 'daily-calories-hard-3', title: 'Burn 3500 kcal', type: 'daily', activity: 'calories', unit: 'kcal', target: 3500, rewardXP: 220, rewardCoins: 120, difficulty: 'hard', icon: 'Flame' },

  // AZM - Normal
  { id: 'daily-AZM-1', title: 'Be active for 15 min', type: 'daily', activity: 'AZM', unit: 'm', target: 15, rewardXP: 100, rewardCoins: 40, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-2', title: 'Be active for 20 min', type: 'daily', activity: 'AZM', unit: 'm', target: 20, rewardXP: 110, rewardCoins: 44, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-3', title: 'Be active for 25 min', type: 'daily', activity: 'AZM', unit: 'm', target: 25, rewardXP: 120, rewardCoins: 48, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-4', title: 'Be active for 30 min', type: 'daily', activity: 'AZM', unit: 'm', target: 30, rewardXP: 130, rewardCoins: 52, difficulty: 'normal', icon: 'Zap' },
  { id: 'daily-AZM-5', title: 'Be active for 45 min', type: 'daily', activity: 'AZM', unit: 'm', target: 45, rewardXP: 140, rewardCoins: 56, difficulty: 'normal', icon: 'Zap' },
  // AZM - Hard
  { id: 'daily-AZM-hard-1', title: 'Be active for 60 min', type: 'daily', activity: 'AZM', unit: 'm', target: 60, rewardXP: 170, rewardCoins: 80, difficulty: 'hard', icon: 'Zap' },
  { id: 'daily-AZM-hard-2', title: 'Be active for 90 min', type: 'daily', activity: 'AZM', unit: 'm', target: 90, rewardXP: 220, rewardCoins: 100, difficulty: 'hard', icon: 'Zap' },
  { id: 'daily-AZM-hard-3', title: 'Be active for 120 min', type: 'daily', activity: 'AZM', unit: 'm', target: 120, rewardXP: 250, rewardCoins: 120, difficulty: 'hard', icon: 'Zap' },
]

export const weeklyQuests: Quest[] = [
  // Steps - Normal, Hard, Legendary
  { id: 'weekly-steps-1', title: 'Walk 35,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 35000, rewardXP: 500, rewardCoins: 140, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-2', title: 'Walk 40,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 40000, rewardXP: 520, rewardCoins: 160, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-3', title: 'Walk 45,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 45000, rewardXP: 540, rewardCoins: 180, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-4', title: 'Walk 50,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 50000, rewardXP: 560, rewardCoins: 200, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-5', title: 'Walk 55,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 55000, rewardXP: 580, rewardCoins: 220, difficulty: 'normal', icon: 'Footprints' },
  { id: 'weekly-steps-hard-1', title: 'Walk 60,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 60000, rewardXP: 700, rewardCoins: 300, difficulty: 'hard', icon: 'Footprints' },
  { id: 'weekly-steps-hard-2', title: 'Walk 80,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 65000, rewardXP: 750, rewardCoins: 400, difficulty: 'hard', icon: 'Footprints' },
  { id: 'weekly-steps-hard-3', title: 'Walk 100,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 75000, rewardXP: 800, rewardCoins: 500, difficulty: 'hard', icon: 'Footprints' },
  { id: 'weekly-steps-legendary', title: 'Walk 150,000 steps', type: 'weekly', activity: 'steps', unit: 'steps', target: 150000, rewardXP: 2000, rewardCoins: 2000, difficulty: 'legendary', icon: 'Footprints' },

  // Distance - Normal, Hard, Legendary
  { id: 'weekly-distance-1', title: 'Travel 20 km', type: 'weekly', activity: 'distance', unit: 'km', target: 20, rewardXP: 500, rewardCoins: 140, difficulty: 'normal', icon: 'Ruler' },
  { id: 'weekly-distance-2', title: 'Travel 25 km', type: 'weekly', activity: 'distance', unit: 'km', target: 25, rewardXP: 520, rewardCoins: 160, difficulty: 'normal', icon: 'Ruler' },
  { id: 'weekly-distance-3', title: 'Travel 30 km', type: 'weekly', activity: 'distance', unit: 'km', target: 30, rewardXP: 540, rewardCoins: 180, difficulty: 'normal', icon: 'Ruler' },
  { id: 'weekly-distance-4', title: 'Travel 35 km', type: 'weekly', activity: 'distance', unit: 'km', target: 35, rewardXP: 560, rewardCoins: 200, difficulty: 'normal', icon: 'Ruler' },
  { id: 'weekly-distance-5', title: 'Travel 40 km', type: 'weekly', activity: 'distance', unit: 'km', target: 40, rewardXP: 580, rewardCoins: 220, difficulty: 'normal', icon: 'Ruler' },
  { id: 'weekly-distance-hard-1', title: 'Travel 50 km', type: 'weekly', activity: 'distance', unit: 'km', target: 50, rewardXP: 700, rewardCoins: 300, difficulty: 'hard', icon: 'Ruler' },
  { id: 'weekly-distance-hard-2', title: 'Travel 55 km', type: 'weekly', activity: 'distance', unit: 'km', target: 55, rewardXP: 750, rewardCoins: 400, difficulty: 'hard', icon: 'Ruler' },
  { id: 'weekly-distance-hard-3', title: 'Travel 60 km', type: 'weekly', activity: 'distance', unit: 'km', target: 60, rewardXP: 800, rewardCoins: 500, difficulty: 'hard', icon: 'Ruler' },
  { id: 'weekly-distance-legendary', title: 'Travel 80 km', type: 'weekly', activity: 'distance', unit: 'km', target: 80, rewardXP: 2000, rewardCoins: 2000, difficulty: 'legendary', icon: 'Ruler' },

  // Calories - Normal, Hard, Legendary
  { id: 'weekly-calories-1', title: 'Burn 8000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 8000, rewardXP: 500, rewardCoins: 160, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-2', title: 'Burn 9000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 9000, rewardXP: 520, rewardCoins: 180, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-3', title: 'Burn 10000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 10000, rewardXP: 540, rewardCoins: 200, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-4', title: 'Burn 11000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 11000, rewardXP: 560, rewardCoins: 220, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-5', title: 'Burn 12000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 12000, rewardXP: 580, rewardCoins: 240, difficulty: 'normal', icon: 'Flame' },
  { id: 'weekly-calories-hard-1', title: 'Burn 15000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 15000, rewardXP: 700, rewardCoins: 300, difficulty: 'hard', icon: 'Flame' },
  { id: 'weekly-calories-hard-2', title: 'Burn 17500 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 17500, rewardXP: 750, rewardCoins: 400, difficulty: 'hard', icon: 'Flame' },
  { id: 'weekly-calories-hard-3', title: 'Burn 20000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 20000, rewardXP: 800, rewardCoins: 500, difficulty: 'hard', icon: 'Flame' },
  { id: 'weekly-calories-legendary', title: 'Burn 23000 kcal', type: 'weekly', activity: 'calories', unit: 'kcal', target: 23000, rewardXP: 2000, rewardCoins: 2000, difficulty: 'legendary', icon: 'Flame' },

  // Sleep - Normal, Hard
  { id: 'weekly-sleep-1', title: 'Sleep 42 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 42, rewardXP: 500, rewardCoins: 160, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-2', title: 'Sleep 44 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 44, rewardXP: 520, rewardCoins: 180, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-3', title: 'Sleep 46 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 46, rewardXP: 540, rewardCoins: 200, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-4', title: 'Sleep 48 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 48, rewardXP: 560, rewardCoins: 220, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-5', title: 'Sleep 50 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 50, rewardXP: 580, rewardCoins: 240, difficulty: 'normal', icon: 'MoonStar' },
  { id: 'weekly-sleep-hard-1', title: 'Sleep 54 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 54, rewardXP: 700, rewardCoins: 300, difficulty: 'hard', icon: 'MoonStar' },
  { id: 'weekly-sleep-hard-2', title: 'Sleep 56 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 56, rewardXP: 750, rewardCoins: 400, difficulty: 'hard', icon: 'MoonStar' },
  { id: 'weekly-sleep-hard-3', title: 'Sleep 58 h', type: 'weekly', activity: 'sleep', unit: 'h', target: 58, rewardXP: 800, rewardCoins: 500, difficulty: 'hard', icon: 'MoonStar' },

  // AZM - Normal, Hard, Legendary
  { id: 'weekly-AZM-1', title: 'Be active for 90 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 90, rewardXP: 500, rewardCoins: 160, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-2', title: 'Be active for 120 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 120, rewardXP: 520, rewardCoins: 180, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-3', title: 'Be active for 150 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 150, rewardXP: 540, rewardCoins: 200, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-4', title: 'Be active for 180 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 180, rewardXP: 560, rewardCoins: 220, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-5', title: 'Be active for 200 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 200, rewardXP: 580, rewardCoins: 240, difficulty: 'normal', icon: 'Zap' },
  { id: 'weekly-AZM-hard-1', title: 'Be active for 250 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 250, rewardXP: 700, rewardCoins: 500, difficulty: 'hard', icon: 'Zap' },
  { id: 'weekly-AZM-hard-2', title: 'Be active for 300 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 300, rewardXP: 750, rewardCoins: 600, difficulty: 'hard', icon: 'Zap' },
  { id: 'weekly-AZM-hard-3', title: 'Be active for 400 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 400, rewardXP: 800, rewardCoins: 800, difficulty: 'hard', icon: 'Zap' },
  { id: 'weekly-AZM-legendary', title: 'Be active for 600 min', type: 'weekly', activity: 'AZM', unit: 'm', target: 600, rewardXP: 2000, rewardCoins: 2000, difficulty: 'legendary', icon: 'Zap' },
]
 */
