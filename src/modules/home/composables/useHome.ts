import { ref } from 'vue'
import { HomeService } from '../services/home.service'
import type { HomeData } from '../types/home.types'

export function useHome() {
  const homeData = ref<HomeData[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchHomeData = async () => {
    loading.value = true
    error.value = null
    try {
      homeData.value = await HomeService.getHomeData()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  return {
    homeData,
    loading,
    error,
    fetchHomeData,
  }
}
