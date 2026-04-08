import { ref } from 'vue'
import type { Surah, SurahDetail } from '@/modules/quran/types/quran.types'

export function useSurahs() {
  const surahs = ref<Surah[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchSurahs() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('https://api.alquran.cloud/v1/surah')
      const json = await res.json()
      surahs.value = json.data
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
      // fetch arabic text + audio in one call using editions
      const res  = await fetch(
        `https://api.alquran.cloud/v1/surah/${number}/editions/quran-uthmani,ar.alafasy`
      )
      const json = await res.json()

      // data[0] = arabic text, data[1] = audio
      const textEdition  = json.data[0]
      const audioEdition = json.data[1]

      surah.value = {
        number:                 textEdition.number,
        name:                   textEdition.name,
        englishName:            textEdition.englishName,
        englishNameTranslation: textEdition.englishNameTranslation,
        numberOfAyahs:          textEdition.numberOfAyahs,
        revelationType:         textEdition.revelationType,
        ayahs: textEdition.ayahs.map((ayah: any, i: number) => ({
          number:         ayah.number,
          numberInSurah:  ayah.numberInSurah,
          text:           ayah.text,
          audio:          audioEdition.ayahs[i]?.audio ?? '',
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