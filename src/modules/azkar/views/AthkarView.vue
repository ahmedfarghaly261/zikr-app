<script setup lang="ts">
import { ref, computed } from 'vue'

import { useI18n } from 'vue-i18n'
import { morningAzkar, eveningAzkar } from '@/modules/azkar/data/azkar'
import type { Azkar } from '@/modules/azkar/types/azkar.types'
import AzkarCard from '../components/AzkarCard.vue'

const { t } = useI18n()

const activeTab = ref<'morning' | 'evening'>('morning')

const morningState = ref<Azkar[]>(morningAzkar.map(a => ({ ...a })))
const eveningState = ref<Azkar[]>(eveningAzkar.map(a => ({ ...a })))

const currentList = computed(() =>
  activeTab.value === 'morning' ? morningState.value : eveningState.value
)

function handleIncrement(id: number) {
  const list = activeTab.value === 'morning' ? morningState : eveningState
  const azkar = list.value.find(a => a.id === id)
  if (azkar && azkar.current < azkar.count) azkar.current++
}

function handleReset(id: number) {
  const list = activeTab.value === 'morning' ? morningState : eveningState
  const azkar = list.value.find(a => a.id === id)
  if (azkar) azkar.current = 0
}
</script>

<template>
  <main dir="rtl" class="max-w-5xl mx-auto px-2 py-8 font-cairo space-y-6">

    <!-- header -->
    <div class="text-center space-y-1">
      <h1 class="text-3xl font-bold text-gray-900">{{ t('athkar.title') }}</h1>
      <p class="text-gray-400 text-sm">{{ t('athkar.subtitle') }}</p>
    </div>

    <!-- tabs -->
    <div class="bg-gray-100 rounded-xl p-1 flex gap-1">
      <button
        class="flex-1 py-3 rounded-lg text-sm font-semibold transition-all"
        :class="activeTab === 'morning'
          ? 'bg-white text-emerald-600 shadow-sm'
          : 'text-gray-500 hover:text-gray-700'"
        @click="activeTab = 'morning'"
      >
        {{ t('athkar.morning') }}
      </button>
      <button
        class="flex-1 py-3 rounded-lg text-sm font-semibold transition-all"
        :class="activeTab === 'evening'
          ? 'bg-white text-emerald-600 shadow-sm'
          : 'text-gray-500 hover:text-gray-700'"
        @click="activeTab = 'evening'"
      >
        {{ t('athkar.evening') }}
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

