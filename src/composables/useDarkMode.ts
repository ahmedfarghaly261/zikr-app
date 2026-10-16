import { computed, ref, watchEffect } from 'vue'
import { useSettingsStore } from '@/stores/settings.store'

const systemPrefersDark = ref(false)
let isSystemPreferenceInitialized = false

function initializeSystemPreference() {
  if (isSystemPreferenceInitialized || typeof window === 'undefined') return

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  systemPrefersDark.value = mediaQuery.matches
  mediaQuery.addEventListener('change', (event) => {
    systemPrefersDark.value = event.matches
  })
  isSystemPreferenceInitialized = true
}

export function useDarkMode() {
  const settingsStore = useSettingsStore()
  initializeSystemPreference()

  const isDark = computed(() => (
    settingsStore.theme === 'dark'
    || (settingsStore.theme === 'system' && systemPrefersDark.value)
  ))

  watchEffect(() => {
    document.documentElement.classList.toggle('dark', isDark.value)
  })

  const toggle = () => {
    settingsStore.setTheme(isDark.value ? 'light' : 'dark')
  }

  return {
    isDark,
    toggle,
  }
}
