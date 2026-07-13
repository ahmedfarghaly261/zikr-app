import type { ArabicHadithBook } from '../types/hadith.types'
import type { ValidatedHadith, ValidatedHadithApiResponse } from '../schemas/hadith.schema'
import type { HadithGradeModel, HadithModel, HadithReferenceModel } from '../models/hadith.model'
import { findHadithBook } from '../constants/hadith-books'

// ─── Private helpers ──────────────────────────────────────────────────────────

function resolveBookName(bookCode: ArabicHadithBook): string {
  return findHadithBook(bookCode)?.displayName ?? bookCode
}

function resolveSectionName(
  hadithNumber: number,
  metadata: ValidatedHadithApiResponse['metadata'],
): string | undefined {
  if (!metadata?.section_detail || !metadata?.section) return undefined

  for (const [sectionKey, detail] of Object.entries(metadata.section_detail)) {
    const first = detail.hadithnumber_first
    const last = detail.hadithnumber_last
    if (first !== undefined && last !== undefined) {
      if (hadithNumber >= first && hadithNumber <= last) {
        return metadata.section[sectionKey]
      }
    }
  }
  return undefined
}

function transformGrades(grades: ValidatedHadith['grades']): HadithGradeModel[] {
  if (!grades || grades.length === 0) return []
  return grades.map((g) => ({ name: g.name, grade: g.grade }))
}

function transformReference(
  ref: ValidatedHadith['reference'],
): HadithReferenceModel | undefined {
  if (!ref) return undefined
  return {
    bookNumber: ref.book,
    hadithNumber: ref.hadith,
  }
}

// ─── Public transformers ──────────────────────────────────────────────────────

export function transformHadithDtoToModel(
  dto: ValidatedHadith,
  bookCode: ArabicHadithBook,
  metadata?: ValidatedHadithApiResponse['metadata'],
): HadithModel {
  return {
    id: `${bookCode}-${dto.hadithnumber}`,
    hadithNumber: dto.hadithnumber,
    arabicNumber: dto.arabicnumber,
    text: dto.text,
    bookCode,
    bookName: resolveBookName(bookCode),
    sectionName: resolveSectionName(dto.hadithnumber, metadata),
    reference: transformReference(dto.reference),
    grades: transformGrades(dto.grades),
  }
}

/**
 * Transforms a full validated API response into an array of HadithModel.
 */
export function transformHadithResponseToModels(
  response: ValidatedHadithApiResponse,
  bookCode: ArabicHadithBook,
): HadithModel[] {
  return response.hadiths.map((dto) =>
    transformHadithDtoToModel(dto, bookCode, response.metadata),
  )
}
