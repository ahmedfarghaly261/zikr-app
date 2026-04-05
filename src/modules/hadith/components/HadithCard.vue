<template>
  <div
    dir="rtl"
    class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700
           hover:border-emerald-300 dark:hover:border-emerald-500 hover:shadow-md
           transition-all font-cairo"
  >
    <!-- hadith number badge -->
    <div class="mb-3">
      <span class="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-900/50
                   text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold">
        {{ t('hadith.number', { number: hadith.hadith_number }) }}
      </span>
    </div>

    <!-- hadith text -->
    <div class="mb-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-5 border-r-4 border-emerald-500">
      <p class="text-gray-800 dark:text-gray-100 text-lg leading-loose whitespace-pre-wrap">
        {{ hadith.text }}
      </p>
    </div>

    <!-- source / page -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
      <div class="flex items-center gap-1">
        <span class="text-gray-400 dark:text-gray-500">{{ t('hadith.page') }}:</span>
        <span class="text-gray-700 dark:text-gray-300 font-semibold">{{ hadith.page }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Hadith } from '@/modules/hadith/types/hadith.types'

defineProps<{ hadith: Hadith }>()

const { t } = useI18n()
</script>