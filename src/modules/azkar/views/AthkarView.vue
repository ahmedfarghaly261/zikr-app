<script setup lang="ts">
import { ref, computed } from 'vue'

import { useI18n } from 'vue-i18n'
import { allAzkar } from '@/modules/azkar/data/azkar'
import type { Azkar } from '@/modules/azkar/types/azkar.types'
import AzkarCard from '../components/AzkarCard.vue'

const { t } = useI18n()

// Initialize all azkar state
const azkarState = ref<Azkar[]>(allAzkar.map(a => ({ ...a })))

// Extract all unique categories
const categories = computed(() => {
  const cats = azkarState.value.map(a => a.category)
  return [...new Set(cats)]
})

// Set the active category conditionally, default to 'أذكار الصباح' or the first one
const activeCategory = ref(categories.value.includes('أذكار الصباح') ? 'أذكار الصباح' : categories.value[0])

const currentList = computed(() =>
  azkarState.value.filter(a => a.category === activeCategory.value)
)

function handleIncrement(id: number) {
  const azkar = azkarState.value.find(a => a.id === id)
  if (azkar && azkar.current < azkar.count) azkar.current++
}

function handleReset(id: number) {
  const azkar = azkarState.value.find(a => a.id === id)
  if (azkar) azkar.current = 0
}
</script>

<template>
  <main class="max-w-5xl mx-auto px-2 py-8 font-cairo space-y-6">

    <!-- header -->
    <div class="text-center space-y-1">
      <h1 class="text-3xl font-bold text-gray-900">{{ t('athkar.title') }}</h1>
      <p class="text-gray-400 text-sm">{{ t('athkar.subtitle') }}</p>
    </div>

    <!-- filter categories -->
    <div class="flex overflow-x-auto gap-2 pb-2 scrollbar-hide snap-x">
      <button
        v-for="category in categories"
        :key="category"
        class="whitespace-nowrap px-4 py-3 rounded-xl text-sm font-semibold transition-all snap-start"
        :class="activeCategory === category
          ? 'bg-primary text-white shadow-md shadow-primary/20'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        @click="activeCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <!-- list -->
    <div class="space-y-4">
      <AzkarCard
        v-for="azkar in currentList"
        :key="azkar.id"
        :azkar="azkar"
        @increment="handleIncrement"
        @reset="handleReset"
      />
    </div>

  </main>
</template>

