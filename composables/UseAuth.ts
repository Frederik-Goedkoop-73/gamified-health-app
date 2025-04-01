import type { Ref } from 'vue'
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
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { ref } from 'vue'
import { useCoinStore } from '~/stores/coinStore'
import { useStreakStore } from '~/stores/streakStore'
import { useUserStore } from '~/stores/userStore'
import { useXPStore } from '~/stores/xpStore'

export function useAuth() {
  const { $router } = useNuxtApp()
  const auth = getAuth()
  const db = getFirestore()

  // Typed reactive state
  const email: Ref<string> = ref('')
  const password: Ref<string> = ref('')
  const username: Ref<string> = ref('')
  const errMsg: Ref<string | null> = ref(null)
  const isLoggedIn: Ref<boolean> = ref(false)
  const isLoading: Ref<boolean> = ref(false)

  // Store references
  const userStore = useUserStore()
  const xpStore = useXPStore()
  const streakStore = useStreakStore()
  const coinStore = useCoinStore()

  // Firestore user document reference
  const getUserDocRef = (uid: string) => doc(db, 'users', uid)

  // Error handling
  const handleAuthError = (error: unknown): void => {
    const authError = error as AuthError
    console.error('Auth error:', authError)
    switch (authError.code) {
      case 'auth/invalid-email':
        errMsg.value = 'Invalid email'
        break
      case 'auth/user-not-found':
        errMsg.value = 'User not found'
        break
      case 'auth/wrong-password':
        errMsg.value = 'Incorrect password'
        break
      case 'auth/weak-password':
        errMsg.value = 'Password should be at least 6 characters'
        break
      case 'auth/email-already-in-use':
        errMsg.value = 'Email already in use'
        break
      default:
        errMsg.value = authError.message || 'Authentication failed'
    }
  }

  // Fetch user data from Firestore
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

  // Helper to fetch all user data
  const fetchAllUserData = async (user: User) => {
    await Promise.all([
      fetchUserData(user),
      xpStore.fetchXP(),
      streakStore.fetchStreak(),
      coinStore.fetchCoins(),
    ])
  }

  // Save user data to Firestore
  const saveUserData = async (user: User, data: Partial<UserData>) => {
    try {
      await setDoc(getUserDocRef(user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...data,
      }, { merge: true })
    }
    catch (err) {
      console.error('Error saving user data:', err)
      throw err
    }
  }

  // Handle username setup (dual-mode function)
  const setupUsername = async (user: User | null, username: string | null = null): Promise<boolean> => {
  // Mode 1: Check if username exists (when both params are null)
    if (user === null && username === null) {
      const auth = getAuth()
      if (!auth.currentUser)
        return false

      try {
        const docSnap = await getDoc(doc(getFirestore(), 'users', auth.currentUser.uid))
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

  // Registration
  const register = async () => {
    isLoading.value = true
    errMsg.value = null

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value,
      )

      // Create user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email.value,
        username: username.value.trim(),
        createdAt: new Date(),
        updatedAt: new Date(),
        // Add any additional default fields
        xp: 0,
        streak: 0,
        coins: 0,
        profileComplete: false, // I don't think I'll be needing this
      })

      // Update stores with new user data
      userStore.setUsername(username.value.trim())

      if (!username.value.trim()) {
        $router.push('/setup-username')
        return
      }

      await fetchAllUserData(userCredential.user)
      $router.push('/')
    }
    catch (error) {
      handleAuthError(error)
    }
    finally {
      isLoading.value = false
    }
  }

  // Google Sign-In
  const signInWithGoogle = async (): Promise<UserCredential> => {
    isLoading.value = true
    errMsg.value = null

    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      const { user } = userCredential

      // Check/create user document in a single transaction
      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          username: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: new Date(),
          updatedAt: new Date(),
          xp: 0,
          streak: 0,
          coins: 0,
          profileComplete: !!user.displayName, // true if displayName exists
        })
      }

      // Check username and redirect if needed
      const existingUserData = userDoc.exists() ? userDoc.data() : null
      if (!existingUserData?.username) {
        $router.push('/setup-username')
        return userCredential
      }

      await fetchAllUserData(user)
      $router.push('/')
      return userCredential
    }
    catch (error) {
      handleAuthError(error)
      throw error // Re-throw for component-level handling
    }
    finally {
      isLoading.value = false
    }
  }

  // Login with email/password
  const login = async (): Promise<void> => {
    isLoading.value = true
    errMsg.value = null

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.value,
        password.value,
      )

      await fetchAllUserData(userCredential.user)
      $router.push('/')
    }
    catch (error) {
      handleAuthError(error)
      throw error // Re-throw for component-level handling
    }
    finally {
      isLoading.value = false
    }
  }

  // Sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth)
      userStore.$reset()
      xpStore.$reset()
      streakStore.$reset()
      coinStore.$reset()
      $router.push('/')
    }
    catch (err) {
      console.error('Sign out error:', err)
      errMsg.value = 'Failed to sign out'
    }
  }

  // Auth state listener
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await fetchAllUserData(user)
      isLoggedIn.value = true
    }
    else {
      isLoggedIn.value = false
    }
  })

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
  }
}
