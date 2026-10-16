import { ref } from 'vue'
import type { Surah, SurahDetail } from '@/modules/quran/types/quran.types'

const QURAN_API_BASE_URL = 'https://quranapi.pages.dev/api'
const ALAFASY_AUDIO_BASE_URL = 'https://the-quran-project.github.io/Quran-Audio/Data/1'

interface QuranApiSurah {
  surahName: string
  surahNameArabicLong: string
  surahNameTranslation: string
  revelationPlace: 'Mecca' | 'Madina'
  totalAyah: number
}

interface QuranApiSurahDetail extends QuranApiSurah {
  surahNo: number
  arabic1: string[]
}

async function fetchQuranApi<T>(path: string): Promise<T> {
  const response = await fetch(`${QURAN_API_BASE_URL}${path}`)

  if (!response.ok) {
    throw new Error(`Quran API request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

function toRevelationType(place: QuranApiSurah['revelationPlace']) {
  return place === 'Mecca' ? 'Meccan' : 'Medinan'
}

export function useSurahs() {
  const surahs = ref<Surah[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSurahs() {
    loading.value = true
    error.value = null
    try {
      const data = await fetchQuranApi<QuranApiSurah[]>('/surah.json')
      surahs.value = data.map((item, index) => ({
        number: index + 1,
        name: item.surahNameArabicLong,
        englishName: item.surahName,
        englishNameTranslation: item.surahNameTranslation,
        numberOfAyahs: item.totalAyah,
        revelationType: toRevelationType(item.revelationPlace),
      }))
    } catch {
      error.value = 'فشل تحميل السور'
    } finally {
      loading.value = false
    }
  }

  return { surahs, loading, error, fetchSurahs }
}

export function useSurahDetail() {
  const surah   = ref<SurahDetail | null>(null)
  const loading = ref(false)
  const error   = ref<string | null>(null)

  async function fetchSurah(number: number) {
    loading.value = true
    error.value   = null
    surah.value   = null
    try {
      const data = await fetchQuranApi<QuranApiSurahDetail>(`/${number}.json`)

      surah.value = {
        number: data.surahNo,
        name: data.surahNameArabicLong,
        englishName: data.surahName,
        englishNameTranslation: data.surahNameTranslation,
        numberOfAyahs: data.totalAyah,
        revelationType: toRevelationType(data.revelationPlace),
        ayahs: data.arabic1.map((text, index) => ({
          number: index + 1,
          numberInSurah: index + 1,
          text,
          audio: `${ALAFASY_AUDIO_BASE_URL}/${number}_${index + 1}.mp3`,
        })),
      }
    } catch {
      error.value = 'فشل تحميل السورة'
    } finally {
      loading.value = false
    }
  }

  return { surah, loading, error, fetchSurah }
}
