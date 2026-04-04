<template>
  <div
    class="bg-white rounded-xl p-6 border transition-all font-cairo"
    :class="isComplete
      ? 'border-emerald-400 bg-emerald-50'
      : 'border-gray-100 hover:border-emerald-200'"
  >
    <!-- text from i18n key -->
    <p class="text-gray-800 text-xl leading-loose text-center mb-5">
      {{ t(azkar.textKey) }}
    </p>

    <!-- progress bar -->
    <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-5">
      <div
        class="h-full rounded-full transition-all duration-300"
        :class="isComplete ? 'bg-emerald-500' : 'bg-emerald-400'"
        :style="{ width: `${progress}%` }"
      />
    </div>

    <!-- actions -->
    <div class="flex items-center justify-between" dir="rtl">
      <div class="flex items-center gap-2">
        <button
          :disabled="isComplete"
          class="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all active:scale-95 bg-emerald-500 text-white"
          :class="isComplete ? 'cursor-not-allowed opacity-80' : 'hover:bg-emerald-600'"
          @click="$emit('increment', azkar.id)"
        >
          {{ isComplete ? t('athkar.complete') : t('athkar.tasbih') }}
        </button>

        <button
          class="p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
          @click="$emit('reset', azkar.id)"
        >
          <RotateCw class="w-4 h-4 text-gray-400" />
        </button>

        <button class="p-2.5 rounded-lg hover:bg-gray-100 transition-colors">
          <Play class="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div class="text-center">
        <div class="text-2xl font-bold text-emerald-600">
          {{ azkar.current }} / {{ azkar.count }}
        </div>
        <div class="text-xs text-gray-400">{{ t('athkar.count') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RotateCw, Play } from 'lucide-vue-next'
import type { Azkar } from '@/modules/azkar/types/azkar.types'

const props = defineProps<{ azkar: Azkar }>()

defineEmits<{
  increment: [id: number]
  reset: [id: number]
}>()

const { t } = useI18n()

const progress = computed(() => (props.azkar.current / props.azkar.count) * 100)
const isComplete = computed(() => props.azkar.current === props.azkar.count)
</script>