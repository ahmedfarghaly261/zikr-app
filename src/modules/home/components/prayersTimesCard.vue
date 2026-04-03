// PrayerCard.vue
<template>
  <div
    class="flex items-center justify-between
           rounded-2xl px-8 py-6 w-full
           font-cairo shadow-sm transition-all"
    :dir="locale === 'ar' ? 'rtl' : 'ltr'"
    style="background: linear-gradient(to right, #509774, #bbd6c6);"
  >
    <!-- prayer info (Right side in RTL) -->
    <div
      class="flex flex-col gap-1"
      :class="locale === 'ar' ? 'items-start text-right' : 'items-start text-left'"
    >
      <span class="text-sm font-semibold text-white/90 mb-1">
        {{ t('prayer.nextPrayer') }}
      </span>
      <h2 class="text-[40px] font-black text-white leading-none drop-shadow-sm mb-2">
        {{ t(`prayer.${nextPrayer}`) }}
      </h2>
      <div 
        class="flex items-center gap-1.5 text-base font-medium text-white/90"
        :class="locale === 'ar' ? 'flex-row' : 'flex-row'"
      >
        <time class="font-bold tracking-wider" dir="ltr">{{ prayerTime }}</time>
        <Clock class="w-4 h-4" />
      </div>
    </div>

    <!-- time remaining badge (Left side in RTL) -->
    <div class="flex flex-col items-center justify-center gap-1.5
                rounded-xl px-6 py-4 min-w-[180px]
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

const { t, locale } = useI18n()
useArabicFont()

const remainingFormatted = computed(() =>
  t('prayer.remaining', {
    h: props.hoursLeft,
    m: props.minutesLeft
  })
)
</script>

<style scoped>
div[dir="rtl"] {
  direction: rtl;
}

</style>