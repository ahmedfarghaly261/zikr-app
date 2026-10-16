<template>
  <div
    class="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center"
    role="alert"
    aria-live="polite"
  >
    <!-- Icon -->
    <div class="flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20">
      <AlertCircle class="w-8 h-8 text-red-400 dark:text-red-400" />
    </div>

    <!-- Message -->
    <div class="space-y-1">
      <p class="text-base font-semibold text-gray-700 dark:text-gray-200 font-cairo">
        {{ friendlyMessage }}
      </p>
      <p class="text-sm text-gray-400 dark:text-gray-500 font-cairo">
        {{ hint }}
      </p>
    </div>

    <!-- Retry button -->
    <button
      v-if="onRetry"
      type="button"
      class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700
             text-white font-cairo font-semibold text-sm transition-colors
             focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
      @click="onRetry"
    >
      <RotateCcw :size="16" />
      <span>{{ t('hadith.retry') }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { AlertCircle, RotateCcw } from 'lucide-vue-next'
import { type ApiErrorKind } from '@/services/api-error'

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  errorKind?: ApiErrorKind
  onRetry?: (() => void) | null
}

const props = withDefaults(defineProps<Props>(), {
  errorKind: 'unknown',
  onRetry: null,
})

const { t } = useI18n()

// ─── Friendly messages per error kind ────────────────────────────────────────

const friendlyMessage = computed(() => t(`hadith.errors.${props.errorKind}.message`))
const hint = computed(() => t(`hadith.errors.${props.errorKind}.hint`))
</script>
