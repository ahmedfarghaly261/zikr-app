<template>
  <main
    dir="rtl"
    class="max-w-3xl mx-auto px-4 py-8 font-cairo space-y-6"
  >
    <!-- Back navigation -->
    <div>
      <RouterLink
        :to="{ name: 'Hadith' }"
        class="inline-flex items-center gap-1.5 text-sm font-cairo text-emerald-600 dark:text-emerald-400
               hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors
               focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
        aria-label="العودة إلى الأحاديث"
      >
        <ChevronLeft :size="16" />
        <span>العودة</span>
      </RouterLink>
    </div>

    <!-- Content -->
    <Transition name="fade" mode="out-in">
      <div v-if="isLoading" key="loading">
        <HadithCardSkeleton />
      </div>

      <div v-else-if="error" key="error">
        <HadithErrorState
          :error-kind="currentErrorKind"
          :custom-message="error"
          :on-retry="() => fetchHadith()"
        />
      </div>

      <HadithCard
        v-else-if="hadith"
        key="card"
        :hadith="hadith"
        @previous="handlePrevious"
        @next="handleNext"
      />

      <HadithEmptyState v-else key="empty" />
    </Transition>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeft } from 'lucide-vue-next'
import HadithCard from '../components/HadithCard.vue'
import HadithCardSkeleton from '../components/HadithCardSkeleton.vue'
import HadithErrorState from '../components/HadithErrorState.vue'
import HadithEmptyState from '../components/HadithEmptyState.vue'
import { useHadith } from '../composables/useHadith'
import type { ArabicHadithBook } from '../types/hadith.types'
import { VALID_HADITH_BOOKS } from '../constants/hadith-books'
import { isAppError } from '@/services/api-error'
import type { ApiErrorKind } from '@/services/api-error'

// ─── Props (from route) ───────────────────────────────────────────────────────

interface Props {
  book: string
  hadithNumber: string
}

const props = defineProps<Props>()

// ─── Validate route props ─────────────────────────────────────────────────────

function resolveBook(): ArabicHadithBook | null {
  if (VALID_HADITH_BOOKS.has(props.book as ArabicHadithBook)) {
    return props.book as ArabicHadithBook
  }
  return null
}

function resolveNumber(): number | null {
  const n = Number(props.hadithNumber)
  return Number.isInteger(n) && n >= 1 ? n : null
}

// ─── State ────────────────────────────────────────────────────────────────────

const router = useRouter()
const currentErrorKind = ref<ApiErrorKind>('unknown')
const localHadithNumber = ref(resolveNumber() ?? 1)
const localBook = ref<ArabicHadithBook>(resolveBook() ?? 'ara-bukhari')

const { hadith, isLoading, error, loadHadith } = useHadith()

// ─── Fetch ────────────────────────────────────────────────────────────────────

async function fetchHadith(): Promise<void> {
  const book = resolveBook()
  const number = resolveNumber()

  if (!book || !number) {
    currentErrorKind.value = 'not_found'
    return
  }

  localBook.value = book
  localHadithNumber.value = number
  currentErrorKind.value = 'unknown'

  try {
    await loadHadith(book, number)
  } catch (err) {
    if (isAppError(err)) {
      currentErrorKind.value = err.kind
    }
  }
}

onMounted(() => {
  fetchHadith()
})

// ─── Navigation ───────────────────────────────────────────────────────────────

function navigateTo(newNumber: number): void {
  router.push({
    name: 'HadithDetails',
    params: { book: localBook.value, hadithNumber: String(newNumber) },
  })
}

function handlePrevious(): void {
  navigateTo(Math.max(1, localHadithNumber.value - 1))
}

function handleNext(): void {
  navigateTo(localHadithNumber.value + 1)
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
