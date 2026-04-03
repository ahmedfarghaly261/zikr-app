import { ref, computed } from 'vue'
import api from '@/services/axios'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetch = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await api.get<T>(url)
      data.value = response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  return {
    data: computed(() => data.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    fetch,
  }
}
