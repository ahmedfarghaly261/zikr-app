<template>
  <main dir="rtl" class="max-w-5xl mx-auto px-4 py-8 font-cairo space-y-6">

    <!-- header -->
    <div class="text-center space-y-1">
      <h1 class="text-3xl font-bold text-gray-900 py-2 dark:text-white">{{ t('quran.title') }}</h1>
      <p class="text-gray-400 text-sm">{{ t('quran.subtitle') }}</p>
    </div>

    <!-- info banner -->
    <div
      class="rounded-xl p-6 text-white"
      style="background: linear-gradient(135deg, #3d8c6e, #5ab389)"
    >
      <div class="flex items-center gap-3 mb-1">
        <BookMarked class="w-7 h-7" />
        <h2 class="text-xl font-bold">{{ t('quran.surahList') }}</h2>
      </div>
      <p class="text-white/80 text-sm">{{ t('quran.surahListDesc') }}</p>
    </div>

    <!-- loading -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div
        v-for="n in 10"
        :key="n"
        class="bg-white border border-gray-100 rounded-xl p-4 animate-pulse"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-gray-100 rounded-xl flex-shrink-0" />
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-100 rounded-full w-24" />
            <div class="h-3 bg-gray-100 rounded-full w-16" />
          </div>
          <div class="space-y-2">
            <div class="h-3 bg-gray-100 rounded-full w-12" />
            <div class="h-5 bg-gray-100 rounded-full w-10" />
          </div>
        </div>
      </div>
    </div>

    <!-- error -->
    <div
      v-else-if="error"
      class="text-center py-16 space-y-3"
    >
      <BookMarked class="w-12 h-12 text-gray-200 mx-auto" />
      <p class="text-gray-400 text-sm">{{ error }}</p>
      <button
        class="px-6 py-2.5 bg-emerald-500 text-white rounded-xl
               text-sm font-semibold hover:bg-emerald-600
               transition-colors mx-auto block"
        @click="fetchSurahs"
      >
        {{ t('quran.retry') }}
      </button>
    </div>

    <!-- surahs grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 gap-3"
    >
      <SurahCard
        v-for="surah in surahs"
        :key="surah.number"
        :surah="surah"
      />
    </div>

  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { BookMarked } from 'lucide-vue-next'
import SurahCard    from '@/modules/quran/components/surahCard.vue'
import { useSurahs } from '@/modules/quran/services/quran.service'

const { t } = useI18n()

const { surahs, loading, error, fetchSurahs } = useSurahs()

onMounted(() => {
  fetchSurahs()
})
</script>