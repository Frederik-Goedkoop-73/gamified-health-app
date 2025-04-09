// import type { Ref } from 'vue'
import type { AuthError, UserData } from '~/types/auth'
import { useNuxtApp } from '#imports'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc, writeBatch } from 'firebase/firestore'
import { ref } from 'vue'
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
  const auth = getAuth()
  const db = getFirestore()

  // State
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
  const fetchUserData = async (user: User): Promise<UserData | null> => {
    try {
      const docSnap = await getDoc(getUserDocRef(user.uid))
      if (docSnap.exists()) {
        const data = docSnap.data() as UserData
        userStore.setUsername(data.username || 'Anonymous')
        return { ...data, uid: user.uid, email: user.email || '' }
      }
      return null
    }
    catch (err) {
      console.error('Error fetching user data:', err)
      return null
    }
  }

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

        const userDoc = await getDoc(getUserDocRef(user.uid))
        if (!userDoc.exists()) {
          await createUserDocument(user, {
            username: user.displayName || '',
            photoURL: user.photoURL || '',
            profileComplete: !!user.displayName,
          })
        }

        if (!userDoc.exists() || !userDoc.data()?.username) {
          safeNavigate('/setup-username')
        }
        else {
          await fetchAllUserData(user)
          await updateLastLogin(user.uid)
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
      // Reset all stores in a batch
      const batch = writeBatch(db)
      userStore.$reset()
      xpStore.$reset()
      streakStore.$reset()
      coinStore.$reset()
      await batch.commit()

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
      const auth = getAuth()
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
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      await fetchAllUserData(user)
      await updateLastLogin(user.uid)
      isLoggedIn.value = true
    }
    else {
      isLoggedIn.value = false
    }
  })

  // Cleanup
  tryOnUnmounted(() => unsubscribe())

  return {
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
