// PrayerCard.vue
<template>
  <div
    class="flex items-center justify-between
           rounded-2xl px-8 py-6 w-full
           font-cairo shadow-sm transition-all"
    style="background: linear-gradient(to right, #509774, #bbd6c6);"
  >
    <!-- prayer info -->
    <div
      class="flex flex-col gap-1 items-start text-start"
    >
      <span class="text-sm font-semibold text-white/90 mb-1">
        {{ t('prayer.nextPrayer') }}
      </span>
      <h2 class="text-[40px] font-black text-white leading-none drop-shadow-sm mb-2">
        {{ t(`prayer.${nextPrayer}`) }}
      </h2>
      <div 
        class="flex flex-row items-center gap-1.5 text-base font-medium text-white/90"
      >
        <time class="font-bold tracking-wider" dir="ltr">{{ prayerTime }}</time>
        <Clock class="w-4 h-4" />
      </div>
    </div>

    <!-- time remaining badge -->
    <div class="flex flex-col items-center justify-center gap-1.5
                rounded-xl px-6 py-4 min-w-45
                bg-white/20 backdrop-blur-sm border border-white/10">
      <span class="text-sm font-semibold text-white/90">
        {{ t('prayer.timeRemaining') }}
      </span>
      <span class="text-xl font-bold text-white whitespace-nowrap">
        {{ remainingFormatted }}
      </span>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useArabicFont } from '@/composables/useArabicFont'
import { Clock } from 'lucide-vue-next'

const props = defineProps<{
  nextPrayer: string
  prayerTime: string
  hoursLeft: number
  minutesLeft: number
}>()

const { t } = useI18n()
useArabicFont()

const remainingFormatted = computed(() =>
  t('prayer.remaining', {
    h: props.hoursLeft,
    m: props.minutesLeft
  })
)
</script>

<style scoped>
</style>