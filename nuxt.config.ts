// https://nuxt.com/docs/api/configuration/nuxt-config
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
    public: {
      firebase: { // These are stored in .env file and on netlify (environment variables)
        apiKey: import.meta.env.NUXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: import.meta.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.NUXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: import.meta.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
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
