import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  const setError = (message: string | null) => {
    error.value = message
  }

  return {
    isLoading,
    error,
    setLoading,
    setError,
  }
})
