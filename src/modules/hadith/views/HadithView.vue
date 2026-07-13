<template>
  <main dir="rtl" class="max-w-3xl mx-auto px-4 py-8 font-cairo space-y-6">

    <!-- Page header -->
    <div class="text-center space-y-1">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 font-cairo">
        الأحاديث النبوية
      </h1>
      <p class="text-gray-400 dark:text-gray-500 text-sm font-cairo">
        استعرض الأحاديث النبوية الشريفة من المصادر الأصيلة
      </p>
    </div>

    <!-- Mode tabs -->
    <div
      dir="rtl"
      class="flex gap-1 p-1 rounded-2xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
      role="tablist"
      aria-label="وضع العرض"
    >
      <button
        id="tab-browse"
        role="tab"
        type="button"
        :aria-selected="mode === 'browse'"
        class="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold
               font-cairo transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        :class="mode === 'browse'
          ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
        @click="switchMode('browse')"
      >
        <Library :size="16" />
        <span>عرض الكل</span>
      </button>
      <button
        id="tab-search"
        role="tab"
        type="button"
        :aria-selected="mode === 'search'"
        class="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold
               font-cairo transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        :class="mode === 'search'
          ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-sm'
          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'"
        @click="switchMode('search')"
      >
        <Search :size="16" />
        <span>بحث برقم</span>
      </button>
    </div>

    <!-- ══════════════════════════════════════════
         BROWSE ALL MODE
    ══════════════════════════════════════════ -->
    <Transition name="fade" mode="out-in">
      <div v-if="mode === 'browse'" key="browse" class="space-y-4">

        <!-- Book selector + browse controls -->
        <div
          dir="rtl"
          class="flex flex-col sm:flex-row gap-3 bg-white dark:bg-slate-800 rounded-2xl
                 border border-gray-100 dark:border-slate-700 p-4 shadow-sm"
        >
          <!-- Book select -->
          <div class="flex-1 min-w-0">
            <label for="browse-book-select" class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 font-cairo">
              الكتاب
            </label>
            <select
              id="browse-book-select"
              v-model="browseBook"
              :disabled="collectionLoading"
              class="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600
                     bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-cairo
                     focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-sm
                     disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option v-for="b in HADITH_BOOKS" :key="b.value" :value="b.value">
                {{ b.label }}
              </option>
            </select>
          </div>

          <!-- Text filter -->
          <div class="flex-1 min-w-0">
            <label for="browse-text-filter" class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 font-cairo">
              بحث في النص
            </label>
            <div class="relative">
              <Search class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                id="browse-text-filter"
                v-model="browseFilter"
                type="text"
                placeholder="ابحث في نصوص الأحاديث..."
                :disabled="collectionLoading"
                class="w-full pr-9 pl-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600
                       bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-cairo
                       focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-sm
                       disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <!-- Load button -->
          <div class="flex flex-col justify-end">
            <label class="block text-xs font-semibold text-transparent mb-1 select-none">·</label>
            <button
              id="browse-load-btn"
              type="button"
              :disabled="collectionLoading"
              class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-cairo font-semibold
                     bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm
                     disabled:opacity-60 disabled:cursor-not-allowed transition-colors
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              @click="handleLoadCollection"
            >
              <Download :size="16" />
              <span>تحميل الكل</span>
            </button>
          </div>
        </div>

        <!-- Loading skeletons (3 cards) -->
        <template v-if="collectionLoading">
          <HadithCardSkeleton v-for="i in 3" :key="i" />
        </template>

        <!-- Error -->
        <HadithErrorState
          v-else-if="collectionError"
          :error-kind="collectionErrorKind"
          :custom-message="collectionError"
          :on-retry="handleLoadCollection"
        />

        <!-- Results info + list -->
        <template v-else-if="allHadiths.length > 0">
          <!-- Results count -->
          <div dir="rtl" class="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500 font-cairo px-1">
            <span>
              عرض
              <strong class="text-gray-700 dark:text-gray-300">{{ filteredHadiths.length }}</strong>
              من أصل
              <strong class="text-gray-700 dark:text-gray-300">{{ allHadiths.length }}</strong>
              حديث
            </span>
            <span v-if="browseFilter.trim()">نتائج البحث عن "{{ browseFilter.trim() }}"</span>
          </div>

          <!-- Empty search results -->
          <div
            v-if="filteredHadiths.length === 0"
            class="flex flex-col items-center gap-3 py-12 text-center"
          >
            <SearchX class="w-10 h-10 text-gray-300 dark:text-gray-600" />
            <p class="text-gray-400 dark:text-gray-500 font-cairo text-sm">
              لا توجد أحاديث تطابق البحث
            </p>
          </div>

          <!-- Virtualised-style list: render visible page -->
          <div v-else class="space-y-4">
            <HadithCard
              v-for="h in visibleHadiths"
              :key="h.id"
              :hadith="h"
              @previous="() => {}"
              @next="() => {}"
            />
          </div>

          <!-- Load more -->
          <div v-if="filteredHadiths.length > visibleCount" class="flex justify-center pt-2">
            <button
              type="button"
              class="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-700
                     text-emerald-700 dark:text-emerald-300 font-cairo font-semibold text-sm
                     hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              @click="loadMore"
            >
              <ChevronDown :size="16" />
              <span>عرض المزيد ({{ filteredHadiths.length - visibleCount }} متبقٍ)</span>
            </button>
          </div>
        </template>

        <!-- Initial empty state for browse mode -->
        <div v-else class="flex flex-col items-center gap-4 py-14 text-center">
          <div class="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20">
            <Library class="w-10 h-10 text-emerald-400 dark:text-emerald-500" />
          </div>
          <div class="space-y-1.5 max-w-xs">
            <h2 class="text-lg font-bold text-gray-700 dark:text-gray-200 font-cairo">استعرض كامل المجموعة</h2>
            <p class="text-sm text-gray-400 dark:text-gray-500 font-cairo leading-relaxed">
              اختر الكتاب واضغط "تحميل الكل" لعرض جميع الأحاديث مع إمكانية البحث في النصوص.
            </p>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════════════════
           SEARCH BY NUMBER MODE
      ══════════════════════════════════════════ -->
      <div v-else key="search" class="space-y-4">

        <!-- Filters bar -->
        <HadithFilters
          :model-book="selectedBook"
          :model-hadith-number="hadithNumber"
          :is-loading="searchLoading"
          @search="handleSearch"
          @random="handleRandom"
        />

        <!-- Content -->
        <Transition name="fade" mode="out-in">
          <div v-if="searchLoading" key="loading">
            <HadithCardSkeleton />
          </div>

          <div v-else-if="searchError" key="error">
            <HadithErrorState
              :error-kind="searchErrorKind"
              :custom-message="searchError"
              :on-retry="handleRefetch"
            />
          </div>

          <div v-else-if="currentHadith" key="card">
            <HadithCard
              :hadith="currentHadith"
              @previous="handlePrevious"
              @next="handleNext"
            />
          </div>

          <div v-else key="empty">
            <HadithEmptyState />
          </div>
        </Transition>
      </div>
    </Transition>

  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Search, Library, Download, ChevronDown, SearchX } from 'lucide-vue-next'

import HadithFilters from '../components/HadithFilters.vue'
import HadithCard from '../components/HadithCard.vue'
import HadithCardSkeleton from '../components/HadithCardSkeleton.vue'
import HadithErrorState from '../components/HadithErrorState.vue'
import HadithEmptyState from '../components/HadithEmptyState.vue'

import { useHadith } from '../composables/useHadith'
import { useRandomHadith } from '../composables/useRandomHadith'
import { useHadithCollection } from '../composables/useHadithCollection'

import type { ArabicHadithBook } from '../types/hadith.types'
import { HADITH_BOOKS, VALID_HADITH_BOOKS } from '../constants/hadith-books'
import { isAppError } from '@/services/api-error'
import type { ApiErrorKind } from '@/services/api-error'

// ─── Mode ─────────────────────────────────────────────────────────────────────

type ViewMode = 'browse' | 'search'
const mode = ref<ViewMode>('search')

function switchMode(newMode: ViewMode): void {
  mode.value = newMode
}

// ─── Route helpers ────────────────────────────────────────────────────────────

const route = useRoute()
const router = useRouter()

function resolveBookFromRoute(): ArabicHadithBook {
  const param = route.query.book as string | undefined
  if (param && VALID_HADITH_BOOKS.has(param as ArabicHadithBook)) {
    return param as ArabicHadithBook
  }
  return 'ara-bukhari'
}

function resolveHadithNumberFromRoute(): number {
  const raw = Number(route.query.hadith)
  return Number.isInteger(raw) && raw >= 1 ? raw : 1
}

// ─── ══ SEARCH MODE state ══ ──────────────────────────────────────────────────

const selectedBook = ref<ArabicHadithBook>(resolveBookFromRoute())
const hadithNumber = ref<number>(resolveHadithNumberFromRoute())
const searchErrorKind = ref<ApiErrorKind>('unknown')

const { hadith, isLoading: hadithLoading, error: hadithError, loadHadith, refetch } = useHadith()
const { randomHadith, isLoading: randomLoading, error: randomError, loadRandomHadith } = useRandomHadith()

const searchLoading = computed(() => hadithLoading.value || randomLoading.value)
const searchError = computed(() => hadithError.value ?? randomError.value)
const currentHadith = computed(() => hadith.value ?? randomHadith.value)

function syncRoute(book: ArabicHadithBook, number: number): void {
  router.replace({ query: { book, hadith: String(number) } })
}

async function handleSearch(book: ArabicHadithBook, number: number): Promise<void> {
  selectedBook.value = book
  hadithNumber.value = number
  searchErrorKind.value = 'unknown'
  syncRoute(book, number)
  try {
    await loadHadith(book, number)
    if (hadith.value) hadithNumber.value = hadith.value.hadithNumber
  } catch (err) {
    if (isAppError(err)) searchErrorKind.value = err.kind
  }
}

async function handleRandom(book: ArabicHadithBook): Promise<void> {
  selectedBook.value = book
  searchErrorKind.value = 'unknown'
  try {
    await loadRandomHadith(book)
    if (randomHadith.value) {
      hadithNumber.value = randomHadith.value.hadithNumber
      syncRoute(book, randomHadith.value.hadithNumber)
    }
  } catch (err) {
    if (isAppError(err)) searchErrorKind.value = err.kind
  }
}

function handleRefetch(): void { refetch() }

function handlePrevious(): void {
  handleSearch(selectedBook.value, Math.max(1, hadithNumber.value - 1))
}

function handleNext(): void {
  handleSearch(selectedBook.value, hadithNumber.value + 1)
}

// ─── ══ BROWSE MODE state ══ ──────────────────────────────────────────────────

const browseBook = ref<ArabicHadithBook>('ara-bukhari')
const browseFilter = ref('')
const collectionErrorKind = ref<ApiErrorKind>('unknown')

/** How many hadiths to show before the "load more" button */
const PAGE_SIZE = 20
const visibleCount = ref(PAGE_SIZE)

const {
  hadiths: allHadiths,
  isLoading: collectionLoading,
  error: collectionError,
  loadCollection,
} = useHadithCollection()

// Reset pagination when book or filter changes
watch([browseBook, browseFilter], () => {
  visibleCount.value = PAGE_SIZE
})

// Case-insensitive Arabic text search
const filteredHadiths = computed(() => {
  const q = browseFilter.value.trim()
  if (!q) return allHadiths.value
  return allHadiths.value.filter((h) =>
    h.text.includes(q) || String(h.hadithNumber).includes(q),
  )
})

const visibleHadiths = computed(() =>
  filteredHadiths.value.slice(0, visibleCount.value),
)

function loadMore(): void {
  visibleCount.value += PAGE_SIZE
}

async function handleLoadCollection(): Promise<void> {
  collectionErrorKind.value = 'unknown'
  visibleCount.value = PAGE_SIZE
  browseFilter.value = ''
  try {
    await loadCollection(browseBook.value)
  } catch (err) {
    if (isAppError(err)) collectionErrorKind.value = err.kind
  }
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