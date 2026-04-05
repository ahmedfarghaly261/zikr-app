
<template>
  <div
    dir="rtl"
    class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-gray-100 dark:border-slate-700
           hover:shadow-md transition-all font-cairo"
  >
    <!-- header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <h3 class="font-bold text-lg text-gray-900 dark:text-gray-100 mb-1">
          {{ t(dua.titleKey) }}
        </h3>
        <span class="inline-block px-2 py-1 bg-purple-50 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 rounded text-xs font-medium">
          {{ t(dua.categoryKey) }}
        </span>
      </div>
      <button
        class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
        @click="$emit('toggleFavorite', dua.id)"
      >
        <Heart
          class="w-5 h-5 transition-colors"
          :class="dua.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400 dark:text-gray-500'"
        />
      </button>
    </div>

    <!-- text -->
    <div class="mb-4 bg-gray-50 dark:bg-slate-900/50 rounded-lg p-4 border-r-4 border-purple-400 dark:border-purple-600">
      <p class="text-gray-800 dark:text-gray-200 leading-loose text-[15px]">
        {{ t(dua.textKey) }}
      </p>
    </div>

    <!-- source -->
    <div class="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
      <span>{{ t('duas.source') }}:</span>
      <span class="font-semibold text-gray-600 dark:text-gray-300">{{ t(dua.sourceKey) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Heart } from 'lucide-vue-next'
import type { Dua } from '@/modules/duas/types/duas.types'

defineProps<{ dua: Dua }>()

defineEmits<{
  toggleFavorite: [id: number]
}>()

const { t } = useI18n()
</script>