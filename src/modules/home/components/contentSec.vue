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
    class="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-6
           flex flex-col items-start gap-2.5 cursor-pointer
           hover:border-emerald-200 dark:hover:border-emerald-500/50 hover:shadow-sm
           transition-all font-cairo no-underline"
  >
    <div
      class="w-13 h-13 rounded-[14px] flex items-center justify-center"
      :style="{ background: iconGradient }"
    >
      <component :is="icon" class="w-6 h-6 text-white" :stroke-width="1.8" />
    </div>

    <h3 class="text-[17px] font-bold text-gray-900 dark:text-gray-100 text-start">
      {{ $t(`features.${id}.title`) }}
    </h3>

    <p class="text-[13px] text-gray-500 dark:text-gray-400 text-start leading-relaxed">
      {{ $t(`features.${id}.desc`) }}
    </p>
    <p>
      {{ $t(`features.${id}.desc`) }}
    </p>

    <span class="flex items-center gap-1 text-[13px] font-semibold text-emerald-700 mt-1">
      {{ $t('common.browse') }}
      <ChevronLeft class="w-3.5 h-3.5" />
    </span>
  </RouterLink>
</template>

