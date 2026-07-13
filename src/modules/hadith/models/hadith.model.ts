import type { ArabicHadithBook } from '../types/hadith.types'

export interface HadithGradeModel {
  name: string
  grade: string
}

export interface HadithReferenceModel {
  bookNumber?: number
  hadithNumber?: number
}

export interface HadithModel {
  /** Stable ID: "{bookCode}-{hadithNumber}" */
  id: string
  hadithNumber: number
  arabicNumber?: number
  text: string
  bookCode: ArabicHadithBook
  /** Arabic display name of the collection */
  bookName: string
  /** Section name from API metadata, when available */
  sectionName?: string
  reference?: HadithReferenceModel
  /** Always an array (never undefined) */
  grades: HadithGradeModel[]
}
