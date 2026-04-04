<template>
  <div
    class="bg-card text-card-text border border-gray-100 rounded-2xl p-5 font-cairo"
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
    <div class="bg-gray-50 rounded-xl p-4 border-s-4" :style="{ borderColor: accentColor }">
      <p class="text-[14px] text-gray-800 text-start leading-loose font-semibold">
        "{{ text }}"
      </p>
      <p v-if="source" class="text-[12px] text-gray-400 text-start mt-2 font-normal">
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