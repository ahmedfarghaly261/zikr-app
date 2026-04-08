<template>
  <RouterLink
    :to="`/quran/${surah.number}`"
    dir="rtl"
    class="bg-white border border-gray-100 rounded-xl p-4
           hover:border-emerald-300 hover:shadow-md
           transition-all group font-cairo block dark:bg-gray dark:bg-gray-800 dark:border-slate-700 dark:hover:border-emerald-500 "
  >
    <div class="flex items-center gap-4">

      <!-- number badge -->
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center
               font-bold text-sm flex-shrink-0 transition-colors
               bg-emerald-50 text-emerald-700
               group-hover:bg-emerald-500 group-hover:text-white dark:bg-gray-700 dark:text-gray-300 dark:group-hover:bg-emerald-500 dark:group-hover:text-white " 
      >
        {{ surah.number }}
      </div>

      <!-- surah info -->
      <div class="flex-1 min-w-0">
        <h3 class="font-bold text-lg text-gray-900 mb-0.5 dark:text-white">
          {{ surah.name }}
        </h3>
        <p class="text-sm text-gray-400 truncate">
          {{ surah.englishName }}
        </p>
      </div>

      <!-- ayahs count + type -->
      <div class="flex flex-col items-start flex-shrink-0 gap-1">
        <div class="flex items-center gap-1 text-sm text-gray-400 dark:text-white">
          <span class="font-semibold text-gray-600 dark:text-white ">{{ surah.numberOfAyahs }}</span>
          <span>{{ t('quran.ayah') }}</span>
        </div>
        <span
          class="text-xs px-2 py-0.5 rounded-full font-semibold"
          :class="surah.revelationType === 'Meccan'
            ? 'bg-blue-50 text-blue-600'
            : 'bg-emerald-50 text-emerald-700'"
        >
          {{ surah.revelationType === 'Meccan' ? t('quran.meccan') : t('quran.medinan') }}
        </span>
      </div>

    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { Surah } from '@/modules/quran/types/quran.types'

defineProps<{ surah: Surah }>()

const { t } = useI18n()
</script>