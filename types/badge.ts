export interface Badge {
  category: string
  badges: {
    id: string
    type: 'steps' | 'calories' | 'distance' | 'azm' | 'coins' | 'xp' | 'streak' | 'badges'
    tier: string
    requirement: string
    target?: number
    icon: string
    stars: number
    xp?: number
    coins: number
    claimed: boolean
    completed: boolean
  }[]
}
