// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@unocss/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
  ],

  runtimeConfig: {
    // These are private and should not be exposed to the client
    // They are stored in .env file and on netlify (environment variables)
    fitbit: {
      clientId: process.env.NODE_ENV === 'development'
        ? process.env.NUXT_FITBIT_CLIENT_ID_DEV
        : process.env.NUXT_FITBIT_CLIENT_ID,
      clientSecret: process.env.NODE_ENV === 'development'
        ? process.env.NUXT_FITBIT_CLIENT_SECRET_DEV
        : process.env.NUXT_FITBIT_CLIENT_SECRET,
      redirectUri: process.env.NODE_ENV === 'development'
        ? process.env.NUXT_FITBIT_REDIRECT_URI_DEV
        : process.env.NUXT_FITBIT_REDIRECT_URI,
    },

    // These are public and can be exposed to the client
    public: {
      firebase: { // These are stored in .env file and on netlify (environment variables)
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
      },
    },
  },

  plugins: [
    '~/plugins/firebase.client.ts',
  ],

  css: [
    '@unocss/reset/tailwind.css',
  ],

  nitro: {
    firebase: {
      gen: 2,
    },
  },

  colorMode: {
    classSuffix: '',
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  routeRules: {
    '/components': { redirect: '/components/accordion' },
    '/settings': { redirect: '/settings/profile' },
  },

  imports: {
    dirs: [
      './lib',
    ],
  },

  compatibilityDate: '2024-12-14',
})
