<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRTL } from '@/composables/useRTL'

const { direction } = useRTL()

watchEffect(() => {
  document.documentElement.dir = direction.value
  document.documentElement.lang = direction.value === 'rtl' ? 'ar' : 'en'
})
</script>

<template>
  <router-view />
</template>
