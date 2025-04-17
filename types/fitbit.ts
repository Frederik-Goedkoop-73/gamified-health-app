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

export interface FitbitSleep {
  sleep: { dateOfSleep: string, duration: number, efficiency: number }[]
}

export interface FitbitSteps {
  'activities-steps': { dateTime: string, value: number }[]
}
