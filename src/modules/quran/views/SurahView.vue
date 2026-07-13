<template>
  <main dir="rtl" class="max-w-4xl mx-auto px-4 py-8 font-cairo" style="padding-bottom: 6rem;">
    <RouterLink
      to="/quran"
      class="inline-flex items-center gap-2 text-emerald-600 mb-6 hover:text-emerald-700 transition"
    >
      <ArrowRight class="w-5 h-5" />
      <span>{{ uiText.back }}</span>
    </RouterLink>

    <div v-if="loading" class="space-y-6 animate-pulse">
      <div class="h-24 bg-gray-100 rounded-2xl w-full" />
      <div class="space-y-4">
        <div v-for="n in 5" :key="n" class="h-20 bg-gray-50 rounded-xl w-full" />
      </div>
    </div>

    <div v-else-if="error" class="text-center py-16">
      <p class="text-red-500 mb-4">{{ error }}</p>
      <button
        @click="loadSurah"
        class="px-6 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600"
      >
        {{ t('quran.retry') || uiText.retry }}
      </button>
    </div>

    <div v-else-if="surah" class="space-y-8">
      <div class="bg-linear-to-br from-emerald-600 to-teal-500 rounded-3xl p-8 text-white relative overflow-hidden text-center shadow-lg dark:bg-gray-800">
        <h1 class="text-4xl font-bold mb-2">{{ surah.name }}</h1>
        <p class="text-emerald-50 mb-6">{{ surah.englishName }}</p>

        <div class="flex items-center justify-center gap-4 text-sm font-medium bg-black/10 w-fit mx-auto px-6 py-2 rounded-full">
          <span>{{ surah.revelationType === 'Meccan' ? (t('quran.meccan') || uiText.meccan) : (t('quran.medinan') || uiText.medinan) }}</span>
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-200" />
          <span>{{ surah.numberOfAyahs }} {{ t('quran.ayah') || uiText.ayah }}</span>
        </div>
      </div>

      <div class="flex justify-center">
        <div class="inline-flex items-center rounded-2xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-slate-800 dark:border-slate-700">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition"
            :class="viewMode === 'blocks'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-700'"
            :aria-pressed="viewMode === 'blocks'"
            :title="uiText.switchToBlockView"
            @click="viewMode = 'blocks'"
          >
            <List class="w-4 h-4" />
            <span>{{ uiText.blockView }}</span>
          </button>
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition"
            :class="viewMode === 'continuous'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-slate-700'"
            :aria-pressed="viewMode === 'continuous'"
            :title="uiText.switchToWholeSurahView"
            @click="viewMode = 'continuous'"
          >
            <BookOpen class="w-4 h-4" />
            <span>{{ uiText.wholeSurahView }}</span>
          </button>
        </div>
      </div>

      <div
        v-if="shouldShowBismillah"
        class="text-center py-8"
      >
        <span class="text-3xl font-quran text-gray-800 dark:text-gray-200">
          {{ bismillah }}
        </span>
      </div>

      <div v-if="viewMode === 'blocks'" class="space-y-6">
        <div
          v-for="ayah in displayAyahs"
          :key="ayah.number"
          class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-700 relative group"
        >
          <div class="flex items-center justify-between mb-4">
            <span class="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-slate-700 rounded-full text-sm font-bold text-gray-500 dark:text-gray-300">
              {{ ayah.numberInSurah }}
            </span>

            <button
              @click="playAudio(ayah.audio)"
              class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors"
              :title="uiText.playAyah"
            >
              <Volume2 class="w-5 h-5" v-if="currentAudioUrl !== ayah.audio" />
              <VolumeX class="w-5 h-5 text-emerald-600" v-else />
            </button>
          </div>

          <p class="text-2xl md:text-3xl leading-[2.5] md:leading-[2.5] font-quran text-gray-900 dark:text-gray-100 text-right">
            {{ ayah.text }}
          </p>
        </div>
      </div>

      <div
        v-else
        class="bg-white dark:bg-slate-800 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-slate-700"
      >
        <p class="text-2xl md:text-3xl leading-[2.8] md:leading-[2.9] font-quran text-gray-900 dark:text-gray-100 text-right">
          <template
            v-for="ayah in displayAyahs"
            :key="ayah.number"
          >
            <span>{{ ayah.text }}</span>
            <button
              type="button"
              class="inline-flex align-middle mx-1 h-8 min-w-8 items-center justify-center rounded-full border px-2 text-sm font-cairo font-bold transition-colors"
              :class="currentAudioUrl === ayah.audio
                ? 'border-emerald-500 bg-emerald-500 text-white'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'"
              :title="uiText.playAyah"
              @click="playAudio(ayah.audio)"
            >
              {{ ayah.numberInSurah }}
            </button>
          </template>
        </p>
      </div>
    </div>

    <audio ref="audioEl" @ended="onAudioEnded" @error="onAudioEnded" />
  </main>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowRight, BookOpen, List, Volume2, VolumeX } from 'lucide-vue-next'
import { useSurahDetail } from '@/modules/quran/services/quran.service'
import type { Ayah } from '@/modules/quran/types/quran.types'

type QuranViewMode = 'blocks' | 'continuous'
type DisplayAyah = Ayah & { text: string }

const route = useRoute()
const { t, locale } = useI18n()
const { surah, loading, error, fetchSurah } = useSurahDetail()

const audioEl = ref<HTMLAudioElement | null>(null)
const currentAudioUrl = ref<string | null>(null)
const viewMode = ref<QuranViewMode>('blocks')

const bismillah = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ'
const bismillahPrefixes = [
  bismillah,
  'بِسْمِ ٱللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
]

const uiText = computed(() => {
  const isArabic = locale.value === 'ar'

  return {
    back: isArabic ? 'عودة' : t('common.back'),
    retry: isArabic ? 'إعادة المحاولة' : t('quran.retry'),
    ayah: isArabic ? 'آية' : t('quran.ayah'),
    meccan: isArabic ? 'مكية' : t('quran.meccan'),
    medinan: isArabic ? 'مدنية' : t('quran.medinan'),
    blockView: isArabic ? 'بطاقات' : t('quran.blockView'),
    wholeSurahView: isArabic ? 'السورة كاملة' : t('quran.wholeSurahView'),
    switchToBlockView: isArabic ? 'عرض كل آية في بطاقة منفصلة' : t('quran.switchToBlockView'),
    switchToWholeSurahView: isArabic ? 'عرض السورة كاملة في مساحة واحدة' : t('quran.switchToWholeSurahView'),
    playAyah: isArabic ? 'تشغيل الآية' : t('quran.playAyah'),
  }
})

const shouldShowBismillah = computed(() => surah.value?.number !== 9)

const displayAyahs = computed<DisplayAyah[]>(() => {
  return surah.value?.ayahs
    .map((ayah) => ({
      ...ayah,
      text: stripBismillahPrefix(ayah).trim(),
    }))
    .filter((ayah) => ayah.text.length > 0) ?? []
})

function stripBismillahPrefix(ayah: Ayah) {
  if (!shouldShowBismillah.value || ayah.numberInSurah !== 1) {
    return ayah.text
  }

  const matchingPrefix = bismillahPrefixes.find((prefix) => ayah.text.startsWith(prefix))
  if (!matchingPrefix) {
    return ayah.text
  }

  return ayah.text.slice(matchingPrefix.length)
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
  } else if (audioEl.value) {
    currentAudioUrl.value = url
    audioEl.value.src = url
    audioEl.value.play()
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
