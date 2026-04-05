import { useLocalStorage } from './useLocalStorage'
import { computed, watchEffect } from 'vue'

export function useDarkMode() {
  const isDark = useLocalStorage('darkMode', false)

  watchEffect(() => {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })

  const toggle = () => {
    isDark.value = !isDark.value
  }

  return {
    isDark: computed(() => isDark.value),
    toggle,
  }
}
