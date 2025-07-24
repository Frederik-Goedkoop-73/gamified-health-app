import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: 'AIzaSyCkiBNRxfZHv9cEbl5rrvstkv-hdN_O060',
    authDomain: 'gamified-wearables-app.firebaseapp.com',
    projectId: 'gamified-wearables-app',
    storageBucket: 'gamified-wearables-app.firebasestorage.app',
    messagingSenderId: '465963456148',
    appId: '1:465963456148:web:56a5156af2b7a4aae24681',
    measurementId: 'G-VKEYCQHFPJ',
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth(app)

  return {
    provide: {
      firebaseApp: app,
      db,
      auth,
    },
  }
})

// const { $db } = useNuxtApp()
