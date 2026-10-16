<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRTL } from '@/composables/useRTL'
import { useDarkMode } from '@/composables/useDarkMode'
import { useSettingsStore } from '@/stores/settings.store'

const settingsStore = useSettingsStore()
const { direction } = useRTL()
const { locale } = useI18n()
useDarkMode() // Initialize dark mode side effect

watchEffect(() => {
  locale.value = settingsStore.language
  document.documentElement.dir = direction.value
  document.documentElement.lang = settingsStore.language
  document.documentElement.dataset.textSize = settingsStore.textSize
})
</script>

<template>
  <router-view />
</template>
