<template>
  <div
    dir="rtl"
    class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700
           shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
    role="article"
    :aria-label="`حديث رقم ${hadith.hadithNumber} من ${hadith.bookName}`"
  >
    <!-- Card Header -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700 bg-emerald-50/60 dark:bg-emerald-900/20">
      <div class="flex items-center gap-2 flex-wrap">
        <!-- Book name badge -->
        <span class="text-sm font-semibold text-emerald-700 dark:text-emerald-300 font-cairo">
          {{ hadith.bookName }}
        </span>
        <!-- Section name -->
        <span
          v-if="hadith.sectionName"
          class="text-xs text-gray-500 dark:text-gray-400 font-cairo"
        >
          · {{ hadith.sectionName }}
        </span>
      </div>
      <!-- Hadith number badge -->
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold
                   bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300">
        # {{ hadith.hadithNumber }}
      </span>
    </div>

    <!-- Arabic Hadith Text -->
    <div class="px-5 py-5">
      <div class="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-5 border-r-4 border-emerald-500">
        <p
          dir="rtl"
          lang="ar"
          class="text-gray-800 dark:text-gray-100 text-lg leading-[2.2] font-cairo whitespace-pre-wrap"
        >
          {{ hadith.text }}
        </p>
      </div>
    </div>

    <!-- Meta: reference + grades -->
    <div class="px-5 pb-4 space-y-2">
      <!-- Reference -->
      <div
        v-if="hadith.reference && (hadith.reference.bookNumber || hadith.reference.hadithNumber)"
        class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-cairo"
      >
        <BookOpen :size="14" class="shrink-0" />
        <span>
          <span v-if="hadith.reference.bookNumber">كتاب {{ hadith.reference.bookNumber }}</span>
          <span v-if="hadith.reference.bookNumber && hadith.reference.hadithNumber"> · </span>
          <span v-if="hadith.reference.hadithNumber">حديث {{ hadith.reference.hadithNumber }}</span>
        </span>
      </div>

      <!-- Grades -->
      <div v-if="hadith.grades.length > 0" class="flex flex-wrap gap-2">
        <span
          v-for="(grade, i) in hadith.grades"
          :key="i"
          class="inline-block px-2 py-0.5 rounded-full text-xs font-cairo
                 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50"
        >
          {{ grade.name }}: {{ grade.grade }}
        </span>
      </div>
      <p
        v-else
        class="text-xs text-gray-400 dark:text-gray-500 font-cairo"
      >
        درجة الحديث غير متوفرة في المصدر
      </p>

      <!-- Attribution -->
      <p class="text-xs text-gray-400 dark:text-gray-500 font-cairo">
        المصدر: Fawaz Ahmed Hadith API
      </p>
    </div>

    <!-- Action bar: copy / share / nav -->
    <div class="flex items-center justify-between gap-2 px-5 py-3 border-t border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/20">
      <!-- Navigation buttons -->
      <div class="flex items-center gap-2">
        <button
          @click="emit('next')"
          class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-cairo font-medium
                 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30
                 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-emerald-400"
          type="button"
          aria-label="الحديث التالي"
        >
          <ChevronRight :size="16" />
          <span>التالي</span>
        </button>
        <button
          @click="emit('previous')"
          class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-cairo font-medium
                 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30
                 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-emerald-400"
          type="button"
          aria-label="الحديث السابق"
        >
          <span>السابق</span>
          <ChevronLeft :size="16" />
        </button>
      </div>

      <!-- Copy / Share -->
      <div class="flex items-center gap-2">
        <!-- Copy feedback -->
        <Transition name="fade-slide">
          <span
            v-if="copyStatus !== 'idle'"
            class="text-xs font-cairo"
            :class="copyStatus === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'"
          >
            {{ copyStatus === 'success' ? 'تم النسخ ✓' : 'تعذر النسخ' }}
          </span>
        </Transition>

        <button
          @click="handleCopy"
          class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-cairo font-medium
                 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30
                 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-emerald-400"
          type="button"
          aria-label="نسخ الحديث"
        >
          <Copy :size="15" />
          <span>نسخ</span>
        </button>

        <button
          @click="handleShare"
          class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-cairo font-medium
                 text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/30
                 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-emerald-400"
          type="button"
          aria-label="مشاركة الحديث"
        >
          <Share2 :size="15" />
          <span>مشاركة</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BookOpen, ChevronLeft, ChevronRight, Copy, Share2 } from 'lucide-vue-next'
import type { HadithModel } from '../models/hadith.model'

// ─── Props & emits ────────────────────────────────────────────────────────────

interface Props {
  hadith: HadithModel
}

const props = defineProps<Props>()

const emit = defineEmits<{
  previous: []
  next: []
}>()

// ─── Copy text builder ────────────────────────────────────────────────────────

function buildShareText(): string {
  return `${props.hadith.text}\n\nالمصدر: ${props.hadith.bookName}\nرقم الحديث: ${props.hadith.hadithNumber}`
}

// ─── Copy functionality ───────────────────────────────────────────────────────

type CopyStatus = 'idle' | 'success' | 'error'
const copyStatus = ref<CopyStatus>('idle')
let copyTimer: ReturnType<typeof setTimeout> | null = null

async function handleCopy(): Promise<void> {
  if (copyTimer) clearTimeout(copyTimer)

  try {
    if (!navigator.clipboard) {
      fallbackCopy(buildShareText())
      return
    }
    await navigator.clipboard.writeText(buildShareText())
    copyStatus.value = 'success'
  } catch {
    copyStatus.value = 'error'
  } finally {
    copyTimer = setTimeout(() => {
      copyStatus.value = 'idle'
    }, 2500)
  }
}

function fallbackCopy(text: string): void {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  try {
    document.execCommand('copy')
    copyStatus.value = 'success'
  } catch {
    copyStatus.value = 'error'
  } finally {
    document.body.removeChild(textarea)
    copyTimer = setTimeout(() => {
      copyStatus.value = 'idle'
    }, 2500)
  }
}

// ─── Share functionality ──────────────────────────────────────────────────────

async function handleShare(): Promise<void> {
  const text = buildShareText()

  if (typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title: `حديث من ${props.hadith.bookName}`,
        text,
      })
      return
    } catch {
      // Share was cancelled or failed — fall through to copy
    }
  }

  // Fallback: copy to clipboard
  await handleCopy()
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>