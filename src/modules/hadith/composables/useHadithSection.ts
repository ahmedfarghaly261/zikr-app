import { ref, computed, onBeforeUnmount } from 'vue'
import type { HadithModel } from '../models/hadith.model'
import type { ArabicHadithBook } from '../types/hadith.types'
import { getSection } from '../services/hadith.service'
import { isCancelledError, isAppError } from '@/services/api-error'

export function useHadithSection() {
  const hadiths = ref<HadithModel[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  let currentBook: ArabicHadithBook | null = null
  let currentSection: number | null = null
  let currentController: AbortController | null = null
  let isMounted = true

  function abortCurrent() {
    if (currentController) {
      currentController.abort()
      currentController = null
    }
  }

  async function loadSection(book: ArabicHadithBook, sectionNumber: number): Promise<void> {
    abortCurrent()
    if (!isMounted) return

    currentBook = book
    currentSection = sectionNumber

    const controller = new AbortController()
    currentController = controller

    isLoading.value = true
    error.value = null

    try {
      const result = await getSection(book, sectionNumber, controller.signal)
      if (controller.signal.aborted || !isMounted) return
      hadiths.value = result
    } catch (err) {
      if (isCancelledError(err) || controller.signal.aborted || !isMounted) return
      error.value = isAppError(err)
        ? err.message
        : 'حدث خطأ غير متوقع عند تحميل القسم'
    } finally {
      if (!controller.signal.aborted && isMounted) {
        isLoading.value = false
      }
    }
  }

  async function refetch(): Promise<void> {
    if (currentBook !== null && currentSection !== null) {
      await loadSection(currentBook, currentSection)
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
    loadSection,
    refetch,
  }
}
