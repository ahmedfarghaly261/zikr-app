import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export type Theme = 'light' | 'dark' | 'system'
export type Language = 'ar' | 'en'
export type TextSize = 'small' | 'medium' | 'large'

const STORAGE_KEYS = {
  theme: 'zikr.theme',
  language: 'zikr.language',
  textSize: 'zikr.textSize',
} as const

function readPreference<T extends string>(key: string, allowedValues: readonly T[], fallback: T): T {
  const storedValue = localStorage.getItem(key)
  return storedValue && allowedValues.includes(storedValue as T) ? storedValue as T : fallback
}

function getInitialTheme(): Theme {
  const savedTheme = readPreference<Theme>(STORAGE_KEYS.theme, ['light', 'dark', 'system'], 'light')

  if (localStorage.getItem(STORAGE_KEYS.theme)) {
    return savedTheme
  }

  const legacyDarkMode = localStorage.getItem('darkMode')
  return legacyDarkMode === 'true' ? 'dark' : 'light'
}

export const useSettingsStore = defineStore('settings', () => {
  const theme = ref<Theme>(getInitialTheme())
  const language = ref<Language>(readPreference(STORAGE_KEYS.language, ['ar', 'en'], 'ar'))
  const textSize = ref<TextSize>(readPreference(STORAGE_KEYS.textSize, ['small', 'medium', 'large'], 'medium'))

  watch(theme, (value) => localStorage.setItem(STORAGE_KEYS.theme, value))
  watch(language, (value) => localStorage.setItem(STORAGE_KEYS.language, value))
  watch(textSize, (value) => localStorage.setItem(STORAGE_KEYS.textSize, value))

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
  }

  const setLanguage = (newLanguage: Language) => {
    language.value = newLanguage
  }

  const setTextSize = (newTextSize: TextSize) => {
    textSize.value = newTextSize
  }

  const resetPreferences = () => {
    theme.value = 'light'
    language.value = 'ar'
    textSize.value = 'medium'
  }

  return {
    theme,
    language,
    textSize,
    setTheme,
    setLanguage,
    setTextSize,
    resetPreferences,
  }
})
