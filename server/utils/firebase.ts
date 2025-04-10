import { type FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'
import { type Firestore, getFirestore } from 'firebase/firestore'

// Internal variables (underscore prefix means "private" to this file)
let _app: FirebaseApp | null = null // Holds firebase app instance
let _auth: Auth | null = null // Holds firebase auth instance
let _db: Firestore | null = null // Holds firebase firestore instance

// Initialize Firebase (call this once at the start of your app)
// This function checks if Firebase has already been initialized
export function initFirebase() {
  // Skip if already initialized
  if (getApps().length && _app)
    return { app: _app, auth: _auth as Auth, db: _db as Firestore }// Already initialized

  // Get config from Nuxt runtime config (set in nuxt.config.ts)
  const config = useRuntimeConfig().public.firebase

  // Safety check - throw an error if config is missing
  if (!config.apiKey) {
    throw new Error('Firebase configuration is missing')
  }

  // 1. Initialize Firebase app
  _app = initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId,
  })

  // 2. Initialize Firebase services
  _auth = getAuth(_app)
  _db = getFirestore(_app)

  // 3. Return for initFirebase use 
  return { app: _app, auth: _auth, db: _db }
  // We return these so we can use them in the plugin
}

// Composable to access Firebase services
export function useFirebase() {
  // Initialize Firebase if not already done
  if (!_app) {
    const initialized = initFirebase() // Capture return value
    return initialized // Return the initialized value
  }

  // Return non-null versions of auth/db (we know they exist now)
  return {
    auth: _auth as Auth, // Type assertion to ensure _auth is not null
    db: _db as Firestore, // Type assertion to ensure _db is not null
    app: _app as FirebaseApp, // Optional: include app for if needed elsewhere
  }
}
