import { ref, computed, onBeforeUnmount } from 'vue'
import type { HadithModel } from '../models/hadith.model'
import type { ArabicHadithBook } from '../types/hadith.types'
import { getCollection } from '../services/hadith.service'
import { isCancelledError, isAppError } from '@/services/api-error'

export function useHadithCollection() {
  const hadiths = ref<HadithModel[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  let currentBook: ArabicHadithBook | null = null
  let currentController: AbortController | null = null
  let isMounted = true

  function abortCurrent() {
    if (currentController) {
      currentController.abort()
      currentController = null
    }
  }

  async function loadCollection(book: ArabicHadithBook): Promise<void> {
    abortCurrent()
    if (!isMounted) return

    currentBook = book
    const controller = new AbortController()
    currentController = controller

    isLoading.value = true
    error.value = null

    try {
      const result = await getCollection(book, controller.signal)
      if (controller.signal.aborted || !isMounted) return
      hadiths.value = result
    } catch (err) {
      if (isCancelledError(err) || controller.signal.aborted || !isMounted) return
      error.value = isAppError(err)
        ? err.message
        : 'حدث خطأ غير متوقع عند تحميل المجموعة'
    } finally {
      if (!controller.signal.aborted && isMounted) {
        isLoading.value = false
      }
    }
  }

  async function refetch(): Promise<void> {
    if (currentBook !== null) {
      await loadCollection(currentBook)
    }
  }

  onBeforeUnmount(() => {
    isMounted = false
    abortCurrent()
  })

  return {
    hadiths: computed(() => hadiths.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    loadCollection,
    refetch,
  }
}
