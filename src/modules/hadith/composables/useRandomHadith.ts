import { ref, computed, onBeforeUnmount } from 'vue'
import type { HadithModel } from '../models/hadith.model'
import type { ArabicHadithBook } from '../types/hadith.types'
import { getRandomHadith } from '../services/hadith.service'
import { isCancelledError, isAppError } from '@/services/api-error'

export function useRandomHadith() {
  const randomHadith = ref<HadithModel | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  let currentController: AbortController | null = null
  let isMounted = true

  function abortCurrent() {
    if (currentController) {
      currentController.abort()
      currentController = null
    }
  }

  async function loadRandomHadith(book: ArabicHadithBook): Promise<void> {
    abortCurrent()
    if (!isMounted) return

    const controller = new AbortController()
    currentController = controller

    isLoading.value = true
    error.value = null

    try {
      const result = await getRandomHadith(book, controller.signal)
      if (controller.signal.aborted || !isMounted) return
      randomHadith.value = result
    } catch (err) {
      if (isCancelledError(err) || controller.signal.aborted || !isMounted) return
      error.value = isAppError(err)
        ? err.message
        : 'حدث خطأ غير متوقع عند تحميل الحديث العشوائي'
    } finally {
      if (!controller.signal.aborted && isMounted) {
        isLoading.value = false
      }
    }
  }

  onBeforeUnmount(() => {
    isMounted = false
    abortCurrent()
  })

  return {
    randomHadith: computed(() => randomHadith.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    loadRandomHadith,
  }
}
