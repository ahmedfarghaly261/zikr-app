<template>
  <main dir="rtl" class="max-w-5xl mx-auto px-4 py-8 font-cairo space-y-6">

    <!-- header -->
    <div class="text-center space-y-1">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ t('duas.title') }}</h1>
      <p class="text-gray-400 text-sm">{{ t('duas.subtitle') }}</p>
    </div>

    <!-- search -->
    <div class="relative">
      <Search class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="t('duas.searchPlaceholder')"
        class="w-full pr-10 pl-4 py-3 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700
               rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-500
               transition-all font-cairo text-right text-gray-800 dark:text-gray-100"
      />
    </div>

    <!-- category tabs -->
    <div class="flex items-center gap-2 flex-wrap">
      <button
        v-for="cat in categories"
        :key="cat.key"
        class="px-4 py-2 rounded-lg transition-all text-sm font-semibold"
        :class="selectedCategory === cat.key
          ? 'bg-purple-500 text-white shadow-sm'
          : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-600 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-500'"
        @click="selectedCategory = cat.key"
      >
        {{ t(cat.labelKey) }}
      </button>
    </div>

    <!-- grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DuaCard
        v-for="dua in filteredDuas"
        :key="dua.id"
        :dua="dua"
        @toggle-favorite="handleToggleFavorite"
      />
    </div>

    <!-- empty state -->
    <div v-if="filteredDuas.length === 0" class="text-center py-12">
      <p class="text-gray-400">{{ t('duas.noResults') }}</p>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search } from 'lucide-vue-next'
import DuaCard from '@/modules/duas/components/DuaCard.vue'
import { duas as initialDuas } from '@/modules/duas/data/dua.data'
import type { Dua } from '@/modules/duas/types/duas.types'

const { t } = useI18n()

const searchQuery = ref('')
const selectedCategory = ref('all')

const duas = ref<Dua[]>(initialDuas.map(d => ({ ...d })))

const categories = [
  { key: 'all',      labelKey: 'duas.categories.all'      },
  { key: 'daily',    labelKey: 'duas.categories.daily'    },
  { key: 'prophets', labelKey: 'duas.categories.prophets' },
  { key: 'quran',    labelKey: 'duas.categories.quran'    },
  { key: 'prophet',  labelKey: 'duas.categories.prophet'  },
]

const filteredDuas = computed(() =>
  duas.value.filter(dua => {
    const title  = t(dua.titleKey).toLowerCase()
    const text   = t(dua.textKey).toLowerCase()
    const query  = searchQuery.value.toLowerCase()

    const matchesSearch   = !query || title.includes(query) || text.includes(query)
    const matchesCategory = selectedCategory.value === 'all'
      || dua.categoryKey === `duas.categories.${selectedCategory.value}`

    return matchesSearch && matchesCategory
  })
)

function handleToggleFavorite(id: number) {
  const dua = duas.value.find(d => d.id === id)
  if (dua) dua.isFavorite = !dua.isFavorite
}
</script>