<template>
  <div
    class="bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-xl p-6 border transition-all font-cairo"
    :class="isComplete
      ? 'border-primary bg-primary/10 dark:bg-primary/20'
      : 'border-gray-100 dark:border-slate-700 hover:border-primary/50'"
  >
    <!-- text from json -->
    <p class="text-xl leading-loose text-center mb-2 whitespace-pre-wrap">
      {{ azkar.text }}
    </p>

    <div v-if="azkar.description" class="text-sm text-gray-500 dark:text-gray-400 text-center mb-5">
      {{ azkar.description }}
    </div>

    <div v-if="azkar.reference" class="text-xs text-primary/70 dark:text-primary text-start mb-5">
      {{ azkar.reference }}
    </div>

    <!-- progress bar -->
    <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-5 dark:bg-slate-700">
      <div
        class="h-full rounded-full transition-all duration-300 bg-primary"
        :style="{ width: `${progress}%` }"
      />
    </div>

    <!-- actions -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <button
          :disabled="isComplete"
          class="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all active:scale-95 bg-primary text-white d"
          :class="isComplete ? 'cursor-not-allowed opacity-80' : 'opacity-90 hover:opacity-100'"
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
        <div class="text-2xl font-bold text-primary">
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