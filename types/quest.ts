export interface Quest {
  id: string
  title: string
  type: 'daily' | 'weekly'
  activity: 'steps' | 'distance' | 'sleep' | 'calories' | 'AZM'
  unit: 'steps' | 'km' | 'h' | 'kcal' | 'm'
  target: number
  rewardXP: number
  rewardCoins: number
  difficulty: 'normal' | 'hard' | 'legendary'
  icon: 'Footprints' | 'Ruler' | 'MoonStar' | 'HeartPulse' | 'Flame' | 'Zap'

  completed?: boolean
  claimed?: boolean
}
