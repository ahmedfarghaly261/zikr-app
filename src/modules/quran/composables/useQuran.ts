import { ref } from 'vue'
import { QuranService } from '../services/quran.service'
import type { Surah } from '../types/quran.types'

export function useQuran() {
  const surahs = ref<Surah[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchSurahs = async () => {
    loading.value = true
    error.value = null
    try {
      surahs.value = await QuranService.getAllSurahs()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  return {
    surahs,
    loading,
    error,
    fetchSurahs,
  }
}
