<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRTL } from '@/composables/useRTL'
import { useDarkMode } from '@/composables/useDarkMode'

const { direction } = useRTL()
useDarkMode() // Initialize dark mode side effect

watchEffect(() => {
  document.documentElement.dir = direction.value
  document.documentElement.lang = direction.value === 'rtl' ? 'ar' : 'en'
})
</script>

<template>
  <router-view />
</template>
