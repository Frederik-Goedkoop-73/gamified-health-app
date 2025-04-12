// import type { Ref } from 'vue'
import type { AuthError, UserData } from '~/types/auth'
import { useNuxtApp } from '#imports'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { useFirebase } from '~/server/utils/firebase'
import { useCoinStore } from '~/stores/coinStore'
import { useStreakStore } from '~/stores/streakStore'
import { useUserStore } from '~/stores/userStore'
import { useXPStore } from '~/stores/xpStore'

// Default user data template
const DEFAULT_USER_DATA: Partial<UserData> = {
  xp: 0,
  streak: 0,
  coins: 0,
  profileComplete: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLoginDate: new Date(),
}

export function useAuth() {
  const { $router } = useNuxtApp()
  // Firebase services
  const { auth, db } = useFirebase()

  // State
  const user = ref<User | null>(auth.currentUser)
  const email = ref('')
  const password = ref('')
  const username = ref('')
  const errMsg = ref<string | null>(null)
  const isLoggedIn = ref(false)
  const isLoading = ref(false)

  // Stores
  const userStore = useUserStore()
  const xpStore = useXPStore()
  const streakStore = useStreakStore()
  const coinStore = useCoinStore()

  // Cache document references
  const userDocRefs = new Map<string, ReturnType<typeof doc>>()

  const getUserDocRef = (uid: string) => {
    if (!userDocRefs.has(uid)) {
      userDocRefs.set(uid, doc(db, 'users', uid))
    }
    return userDocRefs.get(uid)!
  }

  // Helper functions
  const safeNavigate = (path: string) => {
    if ($router.currentRoute.value.path !== path) {
      $router.push(path)
    }
  }

  // Loading wrapper
  // This function wraps any async function and sets isLoading to true while the function is executing
  const withLoading = async <T>(fn: () => Promise<T>): Promise<T> => {
    isLoading.value = true
    try {
      return await fn()
    }
    finally {
      isLoading.value = false
    }
  }

  const updateLastLogin = async (uid: string) => {
    await setDoc(getUserDocRef(uid), { lastLoginDate: new Date() }, { merge: true })
  }

  // Error handling
  const handleAuthError = (error: unknown): void => {
    const authError = error as AuthError
    console.error('Auth error:', authError)

    const errorMap: Record<string, string> = {
      'auth/invalid-email': 'Invalid email',
      'auth/user-not-found': 'User not found',
      'auth/wrong-password': 'Incorrect password',
      'auth/weak-password': 'Password should be at least 6 characters',
      'auth/email-already-in-use': 'Email already in use',
      'auth/operation-not-allowed': 'Operation not allowed',
      'auth/too-many-requests': 'Too many requests. Try again later',
    }

    errMsg.value = errorMap[authError.code] || authError.message || 'Authentication failed'
  }

  // User data operations
  // This function fetches user data from Firestore
  const fetchUserData = async (user: User): Promise<UserData | null> => {
    try {
      const docSnap = await getDoc(getUserDocRef(user.uid))
      if (docSnap.exists()) {
        const data = docSnap.data() as UserData
        // ONLY update username if it exists in Firestore
        if (data.username) {
          userStore.setUsername(data.username)
        }
        return data
      }
      return null
    }
    catch (err) {
      console.error('Fetch error:', err)
      return null
    }
  }

  // This function fetches all user data, including XP, streak, and coins
  const fetchAllUserData = async (user: User) => {
    try {
      const [userData] = await Promise.all([
        fetchUserData(user),
        xpStore.fetchXP(),
        streakStore.fetchStreak(),
        coinStore.fetchCoins(),
      ])
      return userData
    }
    catch (error) {
      console.error('Failed to fetch all user data:', error)
      throw error
    }
  }

  const saveUserData = async (user: User, data: Partial<UserData>) => {
    try {
      await setDoc(getUserDocRef(user.uid), {
        ...DEFAULT_USER_DATA,
        uid: user.uid,
        email: user.email,
        updatedAt: new Date(),
        ...data,
      }, { merge: true })
    }
    catch (err) {
      console.error('Error saving user data:', err)
      throw err
    }
  }

  const createUserDocument = async (user: User, additionalData: Partial<UserData> = {}) => {
    await setDoc(getUserDocRef(user.uid), {
      ...DEFAULT_USER_DATA,
      uid: user.uid,
      email: user.email,
      ...additionalData,
    })
  }

  // Auth operations
  const register = async () => {
    return withLoading(async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value,
        )

        await createUserDocument(userCredential.user, {
          username: username.value.trim(),
        })

        userStore.setUsername(username.value.trim())
        await fetchAllUserData(userCredential.user)

        // Wait for auth persistence to complete
        await new Promise<void>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) { // Only resolve when we have a user
              unsubscribe()
              resolve()
            }
          })
        })

        if (!username.value.trim()) {
          safeNavigate('/setup-username')
        }
        else {
          safeNavigate('/')
        }
      }
      catch (error) {
        handleAuthError(error)
      }
    })
  }

  const signInWithGoogle = async (): Promise<UserCredential> => {
    return withLoading(async () => {
      try {
        const provider = new GoogleAuthProvider()
        const userCredential = await signInWithPopup(auth, provider)
        const { user } = userCredential

        // 1. Wait for auth persistence to complete
        // This is a workaround to ensure that the user data loads after refresh
        await new Promise<void>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) { // Only resolve when we have a user
              unsubscribe()
              resolve()
            }
          })
        })

        // 2. Ensure document exists
        const docRef = doc(db, 'users', user.uid)
        await setDoc(docRef, {
          ...DEFAULT_USER_DATA,
          uid: user.uid,
          email: user.email || '', // Google email
          username: user.displayName || 'Anonymous', // Google display name
          photoURL: user.photoURL || '', // Google profile picture
          profileComplete: !!user.displayName, // True if name exists
          lastLoginDate: new Date(), // Update last login date
        }, { merge: true })
        // ✅ Creates a new document if it doesn't exist

        // 3. Get fresh snapshot (optional - only needed if you need immediate read-after-write)
        // const updatedDoc = await getDoc(docRef)

        // 4. Route based on profile completion
        if (!user.displayName) { // More reliable than checking document
          safeNavigate('/setup-username')
        }
        else {
          await fetchAllUserData(user)
          safeNavigate('/')
        }

        return userCredential
      }
      catch (error) {
        handleAuthError(error)
        throw error
      }
    })
  }

  const login = async (): Promise<void> => {
    return withLoading(async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value,
        )

        await new Promise<void>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) { // Only resolve when we have a user
              unsubscribe()
              resolve()
            }
          })
        })

        await fetchAllUserData(userCredential.user)
        await updateLastLogin(userCredential.user.uid)
        safeNavigate('/')
      }
      catch (error) {
        handleAuthError(error)
        throw error
      }
    })
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      // Reset all stores
      userStore.$reset()
      xpStore.$reset()
      streakStore.$reset()
      coinStore.$reset()
      safeNavigate('/')
    }
    catch (err) {
      console.error('Sign out error:', err)
      errMsg.value = 'Failed to sign out'
    }
  }

  // Username operations
  const setupUsername = async (user: User | null, username: string | null = null): Promise<boolean> => {
    // Mode 1: Check if username exists
    if (user === null && username === null) {
      if (!auth.currentUser)
        return false

      try {
        const docSnap = await getDoc(getUserDocRef(auth.currentUser.uid))
        return !!docSnap.data()?.username
      }
      catch (error) {
        console.error('Error checking username:', error)
        return false
      }
    }

    // Mode 2: Set new username
    if (!user) {
      errMsg.value = 'User not authenticated'
      return false
    }

    if (!username?.trim()) {
      errMsg.value = 'Username is required'
      return false
    }

    try {
      await saveUserData(user, { username: username.trim() })
      userStore.setUsername(username.trim())
      return true
    }
    catch (error) {
      console.error('Error saving username:', error)
      errMsg.value = 'Failed to save username'
      return false
    }
  }

  // Auth state listener
  // This listener is triggered when the user's authentication state changes
  // It updates the user state and fetches user data from Firestore
  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    return withLoading(async () => {
      user.value = firebaseUser

      if (firebaseUser) {
        try {
        // 1. FIRST load user data before updating stores
          const userData = await fetchUserData(firebaseUser)

          // 2. Only set defaults if NO data exists
          if (!userData) {
            await createUserDocument(firebaseUser, {
              username: firebaseUser.displayName || 'Anonymous',
            // Preserve existing data with merge: true
            })
          }

          // 3. THEN load all other data
          await Promise.all([
            xpStore.fetchXP(),
            streakStore.fetchStreak(),
            coinStore.fetchCoins(),
          ])

          // 4. Update last login AFTER data is loaded
          await updateLastLogin(firebaseUser.uid)
          isLoggedIn.value = true
        }
        catch (error) {
          console.error('Data load error:', error)
        // Don't reset stores - preserve existing data
        }
      }
      else {
      // Clear stores ONLY after confirming logout
        userStore.$reset()
        xpStore.$reset()
        streakStore.$reset()
        coinStore.$reset()
        isLoggedIn.value = false
      }
    })
  })

  // Cleanup: Unsubscribe from auth state listener on component unmount
  // This is a workaround for the issue with onAuthStateChanged not being removed
  // when the component is destroyed. It ensures that the listener is removed
  tryOnUnmounted(() => unsubscribe())

  return {
    user,
    email,
    password,
    username,
    errMsg,
    isLoggedIn,
    isLoading,
    login,
    register,
    signInWithGoogle,
    handleSignOut,
    setupUsername,
    getUserDocRef,
  }
}
