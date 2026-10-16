<template>
  <div
    class="flex w-full flex-col gap-6 overflow-hidden rounded-3xl px-6 py-7 font-cairo shadow-lg shadow-emerald-900/10 transition-all sm:flex-row sm:items-center sm:justify-between sm:px-8"
    style="background: linear-gradient(120deg, #39785e, #5ca884 60%, #9bc8ae);"
  >
    <div class="flex flex-col items-start gap-1 text-start">
      <span class="mb-1 text-sm font-semibold text-white/90">{{ t('prayer.nextPrayer') }}</span>
      <h2 class="mb-2 text-4xl font-black leading-none text-white drop-shadow-sm sm:text-[40px]">
        {{ t(`prayer.${nextPrayer}`) }}
      </h2>
      <div class="flex items-center gap-1.5 text-base font-medium text-white/90">
        <time class="font-bold tracking-wider" dir="ltr">{{ prayerTime }}</time>
        <Clock class="h-4 w-4" />
      </div>
    </div>

    <div class="flex w-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/20 px-6 py-4 backdrop-blur-sm dark:bg-slate-900/40 sm:w-auto sm:min-w-48">
      <span class="text-sm font-semibold text-white/90">{{ t('prayer.timeRemaining') }}</span>
      <span class="whitespace-nowrap text-xl font-bold text-white">{{ remainingFormatted }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Clock } from 'lucide-vue-next'

const props = defineProps<{
  nextPrayer: string
  prayerTime: string
  hoursLeft: number
  minutesLeft: number
}>()

const { t } = useI18n()
const remainingFormatted = computed(() => t('prayer.remaining', {
  h: props.hoursLeft,
  m: props.minutesLeft,
}))
</script>
