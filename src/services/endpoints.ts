// API endpoints
export const ENDPOINTS = {
  // Azkar
  AZKAR: '/azkar',
  AZKAR_BY_ID: (id: string) => `/azkar/${id}`,

  // Hadith
  HADITH: '/hadith',
  HADITH_BY_ID: (id: string) => `/hadith/${id}`,

  // Duas
  DUAS: '/duas',
  DUAS_BY_ID: (id: string) => `/duas/${id}`,

  // Prayer Times
  PRAYER_TIMES: '/prayer-times',

  // Quran
  QURAN: '/quran',
  QURAN_SURAHS: '/quran/surahs',
  QURAN_SURAH: (surah: number) => `/quran/surahs/${surah}`,
}
