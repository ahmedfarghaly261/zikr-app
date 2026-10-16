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
    class="group flex min-h-52 flex-col items-start rounded-2xl border border-gray-100 bg-white p-5 font-cairo no-underline shadow-sm transition-all hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-900/5 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-emerald-500/50"
  >
    <div
      class="flex h-13 w-13 items-center justify-center rounded-[14px] shadow-sm transition-transform group-hover:scale-105"
      :style="{ background: iconGradient }"
    >
      <component :is="icon" class="h-6 w-6 text-white" :stroke-width="1.8" />
    </div>

    <h3 class="mt-4 text-start text-[17px] font-bold text-gray-900 dark:text-gray-100">
      {{ $t(`features.${id}.title`) }}
    </h3>
    <p class="mt-1 text-start text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">
      {{ $t(`features.${id}.desc`) }}
    </p>
    <span class="mt-auto flex items-center gap-1 pt-5 text-[13px] font-semibold text-emerald-700 dark:text-emerald-400">
      {{ $t('common.browse') }}
      <ChevronLeft class="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
    </span>
  </RouterLink>
</template>
