import { ref, computed, watch, onBeforeUnmount, type Ref } from 'vue'
import type { HadithModel } from '../models/hadith.model'
import type { ArabicHadithBook } from '../types/hadith.types'
import { getHadith } from '../services/hadith.service'
import { isCancelledError, isAppError } from '@/services/api-error'

// ─── Options for auto-fetching variant ───────────────────────────────────────

interface UseHadithOptions {
  book: Ref<ArabicHadithBook>
  hadithNumber: Ref<number>
  /** If true, automatically fetches on mount and when options change */
  immediate?: boolean
}

// ─── Core composable ──────────────────────────────────────────────────────────

export function useHadith(options?: UseHadithOptions) {
  const hadith = ref<HadithModel | null>(null)
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

  async function loadHadith(book: ArabicHadithBook, hadithNumber: number): Promise<void> {
    abortCurrent()

    if (!isMounted) return

    const controller = new AbortController()
    currentController = controller

    isLoading.value = true
    error.value = null

    try {
      const result = await getHadith(book, hadithNumber, controller.signal)

      // Guard: only apply if this is still the active request and component is mounted
      if (controller.signal.aborted || !isMounted) return

      hadith.value = result
    } catch (err) {
      if (isCancelledError(err) || controller.signal.aborted || !isMounted) return

      error.value = isAppError(err)
        ? err.message
        : 'حدث خطأ غير متوقع عند تحميل الحديث'
    } finally {
      if (!controller.signal.aborted && isMounted) {
        isLoading.value = false
      }
    }
  }

  async function refetch(): Promise<void> {
    if (!options) return
    await loadHadith(options.book.value, options.hadithNumber.value)
  }

  function reset(): void {
    abortCurrent()
    hadith.value = null
    error.value = null
    isLoading.value = false
  }

  // Auto-fetch when options change (reactive variant)
  if (options) {
    watch(
      [options.book, options.hadithNumber],
      ([newBook, newNumber]) => {
        if (newNumber > 0) {
          loadHadith(newBook, newNumber)
        }
      },
      { immediate: options.immediate ?? false },
    )
  }

  onBeforeUnmount(() => {
    isMounted = false
    abortCurrent()
  })

  return {
    hadith: computed(() => hadith.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    loadHadith,
    refetch,
    reset,
  }
}
