<script setup lang="ts">
import type { Component } from 'vue'
import { ChevronLeft } from 'lucide-vue-next'

defineProps<{
  id: string
  icon: Component
  iconGradient: string
  route: string
}>()
</script>
<template>
  <RouterLink
    :to="route"
    class="bg-card border border-gray-100 rounded-2xl p-6
           flex flex-col items-start gap-2.5 cursor-pointer
           hover:border-emerald-200 hover:shadow-sm
           transition-all font-cairo no-underline"
  >
    <div
      class="w-13 h-13 rounded-[14px] flex items-center justify-center"
      :style="{ background: iconGradient }"
    >
      <component :is="icon" class="w-6 h-6 text-white" :stroke-width="1.8" />
    </div>

    <h3 class="text-[17px] font-bold text-gray-900 text-start">
      {{ $t(`features.${id}.title`) }}
    </h3>

    <p class="text-[13px] text-gray-500 text-start leading-relaxed">
      {{ $t(`features.${id}.desc`) }}
    </p>

    <span class="flex items-center gap-1 text-[13px] font-semibold text-emerald-700 mt-1">
      {{ $t('common.browse') }}
      <ChevronLeft class="w-3.5 h-3.5" />
    </span>
  </RouterLink>
</template>

