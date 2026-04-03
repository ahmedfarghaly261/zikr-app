import { defineStore } from 'pinia'
import { ref } from 'vue'

type Theme = 'light' | 'dark'
type Language = 'ar' | 'en'

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<Theme>('light')
  const language = ref<Language>('ar')

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
  }

  const setLanguage = (newLanguage: Language) => {
    language.value = newLanguage
  }

  return {
    theme,
    language,
    setTheme,
    setLanguage,
  }
})
