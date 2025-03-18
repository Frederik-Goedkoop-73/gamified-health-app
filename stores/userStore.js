import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: null,
  }),
  actions: {
    setUsername(name) {
      this.username = name
    },
  },
})
