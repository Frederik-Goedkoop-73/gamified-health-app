import { type FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'
import { type Firestore, getFirestore } from 'firebase/firestore'

let _app: FirebaseApp | null = null // Fix mutable let binding error
let _auth: Auth | null = null
let _db: Firestore | null = null

export function initFirebase() {
  if (getApps().length && _app)
    return // Already initialized

  const config = useRuntimeConfig().public.firebase

  if (!config.apiKey) {
    throw new Error('Firebase configuration is missing')
  }

  _app = initializeApp({
    apiKey: config.apiKey,
    authDomain: config.authDomain,
    projectId: config.projectId,
    storageBucket: config.storageBucket,
    messagingSenderId: config.messagingSenderId,
    appId: config.appId,
    measurementId: config.measurementId,
  })

  _auth = getAuth(_app)
  _db = getFirestore(_app)
}

// Export initialized services
export function useFirebase() {
  if (!_app)
    initFirebase()
  return {
    auth: _auth as Auth,
    db: _db as Firestore,
  }
}
