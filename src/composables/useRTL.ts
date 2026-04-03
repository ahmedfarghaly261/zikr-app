import { computed } from 'vue'
import { useSettingsStore } from '@/stores/settings.store'

export function useRTL() {
  const settingsStore = useSettingsStore()

  const isRTL = computed(() => settingsStore.language === 'ar')
  const direction = computed(() => (isRTL.value ? 'rtl' : 'ltr'))

  return {
    isRTL,
    direction,
  }
}
