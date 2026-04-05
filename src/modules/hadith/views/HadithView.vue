<template>
  <main dir="rtl" class="max-w-5xl mx-auto px-4 py-8 font-cairo space-y-6">

    <!-- header -->
    <div class="text-center space-y-1">
      <h1 class="text-3xl font-bold text-gray-900">{{ t('hadith.title') }}</h1>
      <p class="text-gray-400 text-sm">{{ t('hadith.subtitle') }}</p>
    </div>

    <!-- search + filter box -->
    <div class="bg-white rounded-xl border border-gray-100 p-4 space-y-4">

      <!-- search -->
      <div class="relative">
        <Search class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('hadith.searchPlaceholder')"
          class="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-100
                 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-300
                 transition-all font-cairo text-right text-gray-800"
        />
      </div>

    </div>

    <!-- list -->
    <div class="space-y-4">
      <HadithCard
        v-for="hadith in filteredHadiths.slice(0, 100)"
        :key="hadith.hadith_number"
        :hadith="hadith"
      />
    </div>

    <!-- empty state -->
    <div v-if="filteredHadiths.length === 0" class="text-center py-12">
      <p class="text-gray-400">{{ t('hadith.noResults') }}</p>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, } from 'lucide-vue-next'
import { hadiths } from '@/modules/hadith/data/hadith.data'
import HadithCard from '../components/HadithCard.vue'

const { t } = useI18n()

const searchQuery     = ref('')
const selectedCategory = ref('all')

// map category keys to Arabic labels for filtering against raw JSON data


const filteredHadiths = computed(() =>
  hadiths.filter(h => {
    const query          = searchQuery.value.trim().toLowerCase()
    const matchesSearch  = !query
      || h.text.includes(query)
      || h.page.toString().includes(query)
    const matchesCategory = selectedCategory.value === 'all'
    return matchesSearch && matchesCategory
  })
)
</script>