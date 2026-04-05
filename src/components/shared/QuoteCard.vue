<template>
  <div
    class="bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 font-cairo"
  >
    <!-- header -->
    <div class="flex items-center  gap-2 mb-4 ">
      <span class="text-[15px] font-bold text-start">{{ title }}</span>
      <component
        :is="icon"
        class="w-5 h-5"
        :style="{ color: iconColor }"
        :stroke-width="1.8"
      />
    </div>

    <!-- quote block -->
    <div class="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 border-s-4" :style="{ borderColor: accentColor }">
      <p class="text-[14px] text-gray-800 dark:text-gray-200 text-start leading-loose font-semibold">
        "{{ text }}"
      </p>
      <p v-if="source" class="text-[12px] text-gray-400 dark:text-gray-500 text-start mt-2 font-normal">
        {{ source }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(defineProps<{
  title: string
  text: string
  source?: string
  icon?: Component
  iconColor?: string
  accentColor?: string
}>(), {
  iconColor: '#10b981',
  accentColor: '#10b981',
})
</script>