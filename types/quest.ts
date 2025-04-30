export interface Quest {
  id: string
  title: string
  type: 'daily' | 'weekly'
  activity: 'steps' | 'sleep' | 'calories' | 'AZM'
  target: number
  rewardXP: number
  rewardCoins: number
  completed?: boolean
  difficulty?: 'normal' | 'hard' | 'legendary'
  icon: 'Footprints' | 'MoonStar' | 'HeartPulse' | 'Flame' | 'Zap'
}
