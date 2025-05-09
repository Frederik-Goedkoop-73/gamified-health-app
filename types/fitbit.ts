export interface FitbitTokenResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  user_id: string
  token_type: string
}

export interface AuthUrlResponse {
  authUrl: string
}

export interface FitbitProfile {
  user: {
    displayName: string
    email?: string // ? because email is not always returned
    memberSince: string
    fullName: string
    avatar: string
    encodedId: string
    age?: number // ? because age is not always returned
    height?: number // ? because height is not always returned
    weight?: number // ? because weight is not always returned
  }
}

export interface FitbitHeart {
  'activities-heart': { dateTime: string, value: any }[]
}

export interface FitbitSimpleSleepLog {
  dateOfSleep: string
  duration: number
}

export interface FitbitSleep {
  sleep: SleepLog[]
}

export interface SleepLog {
  // General fields
  dateOfSleep: string
  duration: number
  efficiency: number
  endTime: string
  infoCode: number
  isMainSleep: boolean
  logId: number
  minutesAfterWakeup: number
  minutesAsleep: number
  minutesAwake: number
  minutesToFallAsleep: number
  logType: string
  startTime: string
  timeInBed: number
  type: string

  // Stages sleep fields (if available)
  levels?: {
    data: {
      dateTime: string
      level: 'wake' | 'light' | 'deep' | 'rem'
      seconds: number
    }[]
    shortData: {
      dateTime: string
      level: 'wake' | 'light' | 'deep' | 'rem'
      seconds: number
    }[]
    summary: {
      deep: {
        count: number
        minutes: number
        thirtyDayAvgMinutes: number
      }
      light: {
        count: number
        minutes: number
        thirtyDayAvgMinutes: number
      }
      rem: {
        count: number
        minutes: number
        thirtyDayAvgMinutes: number
      }
      wake: {
        count: number
        minutes: number
        thirtyDayAvgMinutes: number
      }
    }
  }

  // Classic sleep fallback fields
  awakeCount?: number
  awakeDuration?: number
  awakeningsCount?: number
  minuteData?: {
    dateTime: string
    value: 'asleep' | 'awake' | 'restless'
  }[]
}

export interface FitbitSteps {
  'activities-steps': { dateTime: string, value: number }[]
}

export interface FitbitActiveZoneMinutes {
  'activities-active-zone-minutes': {
    dateTime: string
    value: {
      fatBurnActiveZoneMinutes?: number
      cardioActiveZoneMinutes?: number
      peakActiveZoneMinutes?: number
    }
  }[]
}

export interface FitbitCalories {
  'activities-calories': {
    dateTime: string
    value: string
  }[]
}

export interface FitbitDistance {
  'activities-distance': Array<{
    dateTime: string
    value: string // it’s a string number like "3.41"
  }>
}
