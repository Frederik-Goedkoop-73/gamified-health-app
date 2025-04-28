export interface Quest {
  id: string
  /* icon: string */
  title: string
  /* description: string */
  type: 'daily' | 'weekly'
  target: number
  activity: 'steps' | 'distance' | 'calories' | 'sleep' | 'AZM'
  rewardXP: number
  rewardCoins: number
  completed: boolean
}
