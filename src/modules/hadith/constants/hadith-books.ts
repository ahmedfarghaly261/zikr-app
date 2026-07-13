import type { ArabicHadithBook } from '../types/hadith.types'

// ─── Book option descriptor ───────────────────────────────────────────────────

export interface HadithBookOption {
  value: ArabicHadithBook
  label: string
  displayName: string
  /** Approximate upper bound for random number generation (verified against API metadata) */
  maxHadithNumber: number
}

// ─── Supported Arabic collections ────────────────────────────────────────────

export const HADITH_BOOKS: HadithBookOption[] = [
  {
    value: 'ara-bukhari',
    label: 'صحيح البخاري',
    displayName: 'صحيح البخاري',
    maxHadithNumber: 7563,
  },
  {
    value: 'ara-muslim',
    label: 'صحيح مسلم',
    displayName: 'صحيح مسلم',
    maxHadithNumber: 5362,
  },
  {
    value: 'ara-abudawud',
    label: 'سنن أبي داود',
    displayName: 'سنن أبي داود',
    maxHadithNumber: 5274,
  },
  {
    value: 'ara-tirmidhi',
    label: 'سنن الترمذي',
    displayName: 'سنن الترمذي',
    maxHadithNumber: 3956,
  },
  {
    value: 'ara-nasai',
    label: 'سنن النسائي',
    displayName: 'سنن النسائي',
    maxHadithNumber: 5758,
  },
  {
    value: 'ara-ibnmajah',
    label: 'سنن ابن ماجه',
    displayName: 'سنن ابن ماجه',
    maxHadithNumber: 4341,
  },
  {
    value: 'ara-malik',
    label: 'موطأ مالك',
    displayName: 'موطأ مالك',
    maxHadithNumber: 1852,
  },
  {
    value: 'ara-nawawi',
    label: 'الأربعون النووية',
    displayName: 'الأربعون النووية',
    maxHadithNumber: 42,
  },
  {
    value: 'ara-qudsi',
    label: 'الأحاديث القدسية',
    displayName: 'الأحاديث القدسية',
    maxHadithNumber: 40,
  },
]

/** Look up a book option by its collection code. Returns undefined if not found. */
export function findHadithBook(value: ArabicHadithBook): HadithBookOption | undefined {
  return HADITH_BOOKS.find((b) => b.value === value)
}

/** Set of valid book codes for fast membership checking */
export const VALID_HADITH_BOOKS = new Set<ArabicHadithBook>(HADITH_BOOKS.map((b) => b.value))
