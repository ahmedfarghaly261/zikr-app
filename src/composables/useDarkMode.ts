import { useLocalStorage } from './useLocalStorage'
import { computed } from 'vue'

export function useDarkMode() {
  const isDark = useLocalStorage('darkMode', false)

  const toggle = () => {
    isDark.value = !isDark.value
  }

  return {
    isDark: computed(() => isDark.value),
    toggle,
  }
}
