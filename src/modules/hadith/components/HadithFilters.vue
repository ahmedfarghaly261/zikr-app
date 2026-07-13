<template>
  <div
    dir="rtl"
    class="flex flex-col sm:flex-row gap-4 bg-white dark:bg-slate-800 rounded-2xl
           border border-gray-100 dark:border-slate-700 p-5 shadow-sm"
    role="search"
    aria-label="تصفية الأحاديث"
  >
    <!-- Book selector -->
    <div class="flex-1 min-w-0">
      <label
        for="hadith-book-select"
        class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 font-cairo"
      >
        الكتاب
      </label>
      <select
        id="hadith-book-select"
        v-model="localBook"
        :disabled="isLoading"
        class="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600
               bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-cairo
               focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-sm
               disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option
          v-for="book in HADITH_BOOKS"
          :key="book.value"
          :value="book.value"
        >
          {{ book.label }}
        </option>
      </select>
    </div>

    <!-- Hadith number input -->
    <div class="flex-1 min-w-0">
      <label
        for="hadith-number-input"
        class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 font-cairo"
      >
        رقم الحديث
      </label>
      <input
        id="hadith-number-input"
        v-model.number="localHadithNumber"
        type="number"
        min="1"
        step="1"
        :disabled="isLoading"
        :placeholder="'أدخل رقم الحديث'"
        class="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600
               bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-cairo
               focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-sm
               disabled:opacity-50 disabled:cursor-not-allowed"
        @keydown.enter="handleSearch"
      />
      <!-- Inline validation message -->
      <p
        v-if="validationError"
        class="mt-1 text-xs text-red-500 dark:text-red-400 font-cairo"
        role="alert"
      >
        {{ validationError }}
      </p>
    </div>

    <!-- Buttons -->
    <div class="flex flex-col gap-2 justify-end">
      <!-- Search button -->
      <button
        id="hadith-search-btn"
        type="button"
        :disabled="isLoading"
        class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-cairo font-semibold
               bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm
               disabled:opacity-60 disabled:cursor-not-allowed transition-colors
               focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
        @click="handleSearch"
        aria-label="تحميل الحديث"
      >
        <Search :size="16" />
        <span>تحميل</span>
      </button>

      <!-- Random button -->
      <button
        id="hadith-random-btn"
        type="button"
        :disabled="isLoading"
        class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-cairo font-semibold
               border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300
               hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-sm
               disabled:opacity-60 disabled:cursor-not-allowed transition-colors
               focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
        @click="handleRandom"
        aria-label="حديث عشوائي"
      >
        <Shuffle :size="16" />
        <span>عشوائي</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Search, Shuffle } from 'lucide-vue-next'
import { HADITH_BOOKS } from '../constants/hadith-books'
import type { ArabicHadithBook } from '../types/hadith.types'

// ─── Props & emits ────────────────────────────────────────────────────────────

interface Props {
  modelBook: ArabicHadithBook
  modelHadithNumber: number
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
})

const emit = defineEmits<{
  search: [book: ArabicHadithBook, hadithNumber: number]
  random: [book: ArabicHadithBook]
}>()

// ─── Local state ──────────────────────────────────────────────────────────────

const localBook = ref<ArabicHadithBook>(props.modelBook)
const localHadithNumber = ref<number>(props.modelHadithNumber)
const validationError = ref<string | null>(null)

// Keep local state in sync when parent changes (e.g. from route navigation)
watch(() => props.modelBook, (v) => { localBook.value = v })
watch(() => props.modelHadithNumber, (v) => { localHadithNumber.value = v })

// ─── Validation ───────────────────────────────────────────────────────────────

function validateInput(): boolean {
  const n = localHadithNumber.value
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 1) {
    validationError.value = 'رقم الحديث غير صالح. يجب أن يكون عدداً صحيحاً موجباً.'
    return false
  }
  validationError.value = null
  return true
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

function handleSearch(): void {
  if (!validateInput()) return
  emit('search', localBook.value, localHadithNumber.value)
}

function handleRandom(): void {
  validationError.value = null
  emit('random', localBook.value)
}
</script>
