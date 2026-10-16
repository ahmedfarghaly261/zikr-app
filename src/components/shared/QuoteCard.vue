<template>
  <article class="flex h-full min-h-80 flex-col rounded-3xl border border-gray-100 bg-white p-5 font-cairo text-gray-800 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-gray-100 sm:p-6">
    <div class="mb-5 flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl" :style="{ backgroundColor: `${accentColor}18` }">
          <component :is="icon" class="h-5 w-5" :style="{ color: iconColor }" :stroke-width="1.8" />
        </span>
        <span class="text-start text-base font-bold">{{ title }}</span>
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-100 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-400 dark:hover:bg-slate-700 dark:hover:text-emerald-300"
        :disabled="loading"
        :aria-label="refreshLabel"
        @click="$emit('refresh')"
      >
        <RefreshCw class="h-4 w-4" :class="{ 'animate-spin': loading }" />
        <span class="hidden sm:inline">{{ refreshLabel }}</span>
      </button>
    </div>

    <div v-if="loading" class="flex-1 animate-pulse space-y-3 rounded-2xl bg-gray-50 p-5 dark:bg-slate-900/50">
      <div class="h-3 rounded-full bg-gray-200 dark:bg-slate-700" />
      <div class="h-3 rounded-full bg-gray-200 dark:bg-slate-700" />
      <div class="h-3 w-4/5 rounded-full bg-gray-200 dark:bg-slate-700" />
      <div class="h-3 w-1/2 rounded-full bg-gray-200 dark:bg-slate-700" />
    </div>

    <div v-else-if="error" class="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl bg-red-50 p-5 text-center dark:bg-red-950/20">
      <p class="text-sm font-semibold text-red-600 dark:text-red-300">{{ error }}</p>
      <button type="button" class="text-sm font-bold text-emerald-700 hover:underline dark:text-emerald-400" @click="$emit('retry')">
        {{ retryLabel }}
      </button>
    </div>

    <blockquote v-else class="flex-1 rounded-2xl border-s-4 bg-gray-50 p-5 dark:bg-slate-900/50" :style="{ borderColor: accentColor }">
      <p class="text-start text-[15px] font-semibold leading-8 text-gray-800 dark:text-gray-200">{{ text }}</p>
      <footer v-if="source" class="mt-4 text-start text-xs font-medium text-gray-400 dark:text-gray-500">{{ source }}</footer>
    </blockquote>

    <div class="mt-4 flex justify-end">
      <RouterLink :to="route" class="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:underline dark:text-emerald-400">
        {{ browseLabel }}
        <ArrowUpLeft class="h-4 w-4" />
      </RouterLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { ArrowUpLeft, RefreshCw } from 'lucide-vue-next'

withDefaults(defineProps<{
  title: string
  text: string
  source?: string
  icon?: Component
  iconColor?: string
  accentColor?: string
  route: string
  refreshLabel: string
  browseLabel: string
  retryLabel: string
  loading?: boolean
  error?: string | null
}>(), {
  iconColor: '#10b981',
  accentColor: '#10b981',
  loading: false,
  error: null,
})

defineEmits<{
  refresh: []
  retry: []
}>()
</script>
