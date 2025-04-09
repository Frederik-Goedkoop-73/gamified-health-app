// ~/types/auth.d.ts
export interface AuthError {
  code: string
  message: string
}

export interface UserData {
  username?: string
  email: string
  uid: string
  photoURL?: string // avatar -> maybe change to a path (avatarPath or smthn)
  createdAt?: Timestamp
  updatedAt?: Timestamp
  lastLoginDate?: Date
  xp?: number
  streak?: number
  coins?: number
  profileComplete?: boolean
  // Add other user fields as needed
  // Make sure to update in userStore and UseAuth
}

export interface AuthState {
  email: Ref<string>
  password: Ref<string>
  username: Ref<string>
  errMsg: Ref<string | null>
  isLoggedIn: Ref<boolean>
  isLoading: Ref<boolean>
}

// Extend Firebase user type if needed
declare module 'firebase/auth' {
  interface User {
    customField?: string
  }
}

// Add explicit type for setupUsername
export interface SetupUsername {
  (user: User | null, username: string | null): Promise<boolean>
}
