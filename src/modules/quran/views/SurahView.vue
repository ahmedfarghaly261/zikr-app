<template>
  <main dir="rtl" class="max-w-4xl mx-auto px-4 py-8 font-cairo" style="padding-bottom: 6rem;">
    
    <!-- Back button -->
    <RouterLink
      to="/quran"
      class="inline-flex items-center gap-2 text-emerald-600 mb-6 hover:text-emerald-700 transition"
    >
      <ArrowRight class="w-5 h-5" />
      <span>{{ t('common.back') || 'عودة' }}</span>
    </RouterLink>

    <!-- Loading -->
    <div v-if="loading" class="space-y-6 animate-pulse">
      <div class="h-24 bg-gray-100 rounded-2xl w-full" />
      <div class="space-y-4">
        <div v-for="n in 5" :key="n" class="h-20 bg-gray-50 rounded-xl w-full" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-center py-16">
      <p class="text-red-500 mb-4">{{ error }}</p>
      <button
        @click="loadSurah"
        class="px-6 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600"
      >
        {{ t('quran.retry') || 'إعادة المحاولة' }}
      </button>
    </div>

    <div v-else-if="surah" class="space-y-8">
      
      <!-- Surah Header -->
      <div class="bg-linear-to-br from-emerald-600 to-teal-500 rounded-3xl p-8 text-white relative overflow-hidden text-center shadow-lg dark:bg-gray-800">
        <h1 class="text-4xl font-bold mb-2">{{ surah.name }}</h1>
        <p class="text-emerald-50 mb-6">{{ surah.englishName }}</p>
        
        <div class="flex items-center justify-center gap-4 text-sm font-medium bg-black/10 w-fit mx-auto px-6 py-2 rounded-full">
          <span>{{ surah.revelationType === 'Meccan' ? (t('quran.meccan') || 'مكية') : (t('quran.medinan') || 'مدنية') }}</span>
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-200" />
          <span>{{ surah.numberOfAyahs }} {{ t('quran.ayah') || 'آيات' }}</span>
        </div>
      </div>

      <!-- Bismillah (except for Surah At-Tawbah = 9) -->
      <div
        v-if="surah.number !== 9 && surah.number !== 1"
        class="text-center py-8"
      >
        <span class="text-3xl font-quran text-gray-800 dark:text-gray-200">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </span>
      </div>

      <!-- Ayahs -->
      <div class="space-y-6">
        <div
          v-for="ayah in surah.ayahs"
          :key="ayah.number"
          class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 relative group"
        >
          <!-- Ayah Header -->
          <div class="flex items-center justify-between mb-4">
            <span class="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-slate-700 rounded-full text-sm font-bold text-gray-500 dark:text-gray-300">
              {{ ayah.numberInSurah }}
            </span>
            
            <button
              @click="playAudio(ayah.audio)"
              class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors"
              title="Play Audio"
            >
              <Volume2 class="w-5 h-5" v-if="currentAudioUrl !== ayah.audio" />
              <VolumeX class="w-5 h-5 text-emerald-600" v-else />
            </button>
          </div>

          <!-- Ayah Text -->
          <p
            class="text-2xl md:text-3xl leading-[2.5] md:leading-[2.5] font-quran text-gray-900 dark:text-gray-100 text-right"
          >
            {{ stripBismillahPrefix(ayah) }}
          </p>
        </div>
      </div>

    </div>

    <!-- Hidden audio element -->
    <audio ref="audioEl" @ended="onAudioEnded" @error="onAudioEnded" />

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowRight, Volume2, VolumeX } from 'lucide-vue-next'
import { useSurahDetail } from '@/modules/quran/services/quran.service'

const route = useRoute()
const { t } = useI18n()
const { surah, loading, error, fetchSurah } = useSurahDetail()

const audioEl = ref<HTMLAudioElement | null>(null)
const currentAudioUrl = ref<string | null>(null)

const bismillah = 'بِسْمِ ٱللَّهِ الرَّحْمَٰنِ الرَّحِيمِ '

function stripBismillahPrefix(ayah: any) {
  if (surah.value?.number !== 1 && ayah.numberInSurah === 1 && ayah.text.startsWith(bismillah)) {
    return ayah.text.replace(bismillah, '')
  }
  return ayah.text
}

function loadSurah() {
  const number = Number(route.params.number)
  if (number) fetchSurah(number)
}

function playAudio(url: string) {
  if (!url) return
  if (currentAudioUrl.value === url) {
    audioEl.value?.pause()
    currentAudioUrl.value = null
  } else {
    if (audioEl.value) {
      currentAudioUrl.value = url
      audioEl.value.src = url
      audioEl.value.play()
    }
  }
}

function onAudioEnded() {
  currentAudioUrl.value = null
}

onMounted(() => {
  loadSurah()
})

onUnmounted(() => {
  if (audioEl.value) {
    audioEl.value.pause()
    audioEl.value.src = ''
  }
})
</script>