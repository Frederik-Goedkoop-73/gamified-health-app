import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppState = defineStore('appState', () => {
  const lockedWeekStart = ref('2025-05-19') // initialize with current week start

  function updateLockedWeekStart(newWeekStart: string) {
    lockedWeekStart.value = newWeekStart
  }

  return {
    lockedWeekStart,
    updateLockedWeekStart,
  }
})
