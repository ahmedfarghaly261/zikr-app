// ─── Arabic Hadith Book Union ─────────────────────────────────────────────────

export type ArabicHadithBook =
  | 'ara-bukhari'
  | 'ara-muslim'
  | 'ara-abudawud'
  | 'ara-tirmidhi'
  | 'ara-nasai'
  | 'ara-ibnmajah'
  | 'ara-malik'
  | 'ara-nawawi'
  | 'ara-qudsi'

// ─── Hadith Grade types ───────────────────────────────────────────────────────

export type HadithGradeLevel = 'صحيح' | 'حسن' | 'ضعيف' | string

// ─── Shared hadith state for composables ─────────────────────────────────────

export interface HadithComposableState {
  isLoading: boolean
  error: string | null
}

// Legacy local-data type — kept for backward compatibility with existing view
export interface Hadith {
  hadith_number: number
  page: number
  text: string
}