import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { onMounted, ref } from 'vue'

import { useRouter } from 'vue-router'
import { useCoinStore } from '../stores/coinStore'

import { useStreakStore } from '../stores/streakStore'
import { useUserStore } from '../stores/userStore'
import { useXPStore } from '../stores/xpStore'

export function useAuth() {
  const email = ref('')
  const password = ref('')
  const username = ref('') // Main username state

  const errMsg = ref(null)
  const isLoggedIn = ref(false)

  const router = useRouter()
  const auth = getAuth()

  const userStore = useUserStore()

  // Store username in Pinia
  const fetchUsernameFromFirestore = async (user) => {
    try {
      const db = getFirestore()
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        return docSnap.data().username
      }
      else {
        return null // No username found
      }
    }
    catch (error) {
      console.error('Failed to fetch username:', error)
      return null
    }
  }

  // Save or update username in Firestore and Pinia
  const saveUsernameToFirestore = async (user, username) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const db = getFirestore()
      const docRef = doc(db, 'users', user.uid)
      await setDoc((docRef), {
        email: user.email,
        username, // Save the new username
      }, { merge: true })
      // Update the Pinia store
      userStore.setUsername(username)
    }
    catch (error) {
      throw error // Re-throw the error to handle it in the calling function
    }
  }

  // Register method
  const register = async () => {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user

    try {
      // Check if username exists, if not, prompt user for it
      if (username.value.trim() === '') {
        // Prompt user for username
        const usernameFromPrompt = prompt('Please input a username:')

        // Handle prompt cancellation or empty input
        if (usernameFromPrompt === null || usernameFromPrompt.trim() === '') {
          errMsg.value = 'Username is required.'
          return // Exit the function if the prompt is canceled or empty
        }

        // Update the username ref with the new input
        username.value = usernameFromPrompt.trim()
      }

      // Save the username to Firestore
      try {
        await saveUsernameToFirestore(user, username.value)
        router.push('/dashboard')
      }
      catch (error) {
        console.error('Failed to save username:', error)
        errMsg.value = 'Failed to save username. Please try again.'
      }
    }
    catch (error) {
      console.error('Failed to register:', error)
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/weak-password':
          errMsg.value = 'Weak password: Password should contain at least 6 characters'
          break
        case 'auth/missing-password':
          errMsg.value = 'Missing password'
          break
        default:
          errMsg.value = 'Please fill in all fields'
      }
    }
  }

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      // Check if username exists, if not, prompt user for it
      const fetchedUsername = await fetchUsernameFromFirestore(user)

      if (!fetchedUsername) {
        // Prompt user for username
        const usernameFromPrompt = prompt('Please input a username:')

        // Handle prompt cancellation or emptu input
        if (usernameFromPrompt === null || usernameFromPrompt.trim() === '') {
          errMsg.value = 'Username is required.'
          return // Exit the function if the prompt is canceled or empty
        }

        // Save the username to Firestore
        await saveUsernameToFirestore(user, usernameFromPrompt.trim())
      }

      // Redirect to dashboard
      router.push('/dashboard')
    }
    catch (error) {
      console.error('Failed to sign in with Google:', error)
      errMsg.value = error.message
    }
  }

  // Login method
  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value)
      router.push('/dashboard')
    }
    catch (error) {
      console.error('Failed to login:', error)
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'User not found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break
        default:
          errMsg.value = 'Email or password was incorrect'
      }
    }
  }

  // Sign out method
  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push('/')
    }
    catch (error) {
      console.error('Failed to sign out:', error)
      errMsg.value = 'Failed to sign out'
    }
  }

  // Listen for authentication state changes
  onMounted(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const fetchedUsername = await fetchUsernameFromFirestore(user)
        if (fetchedUsername) {
          userStore.setUsername(fetchedUsername)
        }
        else {
          userStore.setUsername('Anonymous')
        }

        // Fetch xp for the authenticated user
        const xpStore = useXPStore()
        await xpStore.fetchXP()

        // Fetch streak for the authenticated user
        const streakStore = useStreakStore()
        await streakStore.fetchStreak()

        // Fetch coins for the authenticated user
        const coinStore = useCoinStore()
        await coinStore.fetchCoins()

        isLoggedIn.value = true
      }
      else {
        isLoggedIn.value = false
      }
    })
  })

  return {
    email,
    password,
    username,
    errMsg,
    isLoggedIn,
    login,
    register,
    signInWithGoogle,
    handleSignOut,
    saveUsernameToFirestore,
  }
}
