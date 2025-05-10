import { useCustomize } from '@/composables/useCustomize'
import { computed } from 'vue'

export function useIconColorClass() {
  const { theme } = useCustomize()

  const iconColorClass = computed(() => {
    if (theme.value === 'yellow') {
      return 'text-black'
    }
    if (theme.value === 'zinc') {
      return 'text-white dark:text-black'
    }
    return 'text-white'
  })

  return {
    iconColorClass,
  }
}
