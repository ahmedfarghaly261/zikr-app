import { hadithApiService, requestWithFallback } from '@/services/api.service'
import { NotFoundError, UnknownError } from '@/services/api-error'
import { validateHadithApiResponse } from '../schemas/hadith.schema'
import {
  transformHadithDtoToModel,
  transformHadithResponseToModels,
} from '../transformers/hadith.transformer'
import type { HadithModel } from '../models/hadith.model'
import type { ArabicHadithBook } from '../types/hadith.types'
import { VALID_HADITH_BOOKS } from '../constants/hadith-books'
import { getRandomHadithNumber } from '../utils/get-random-hadith-number'


function assertValidHadithNumber(value: number): void {
  if (!Number.isFinite(value) || !Number.isInteger(value) || value < 1) {
    throw new UnknownError('رقم الحديث غير صالح. يجب أن يكون عدداً صحيحاً موجباً.')
  }
}

function assertValidBook(book: ArabicHadithBook): void {
  if (!VALID_HADITH_BOOKS.has(book)) {
    throw new UnknownError(`المجموعة غير مدعومة: ${book}`)
  }
}

// ─── Service methods ──────────────────────────────────────────────────────────

export async function getHadith(
  book: ArabicHadithBook,
  hadithNumber: number,
  signal?: AbortSignal,
): Promise<HadithModel> {
  assertValidBook(book)
  assertValidHadithNumber(hadithNumber)

  const path = `/editions/${book}/${hadithNumber}`
  const raw = await requestWithFallback<unknown>(hadithApiService, path, signal)
  const validated = validateHadithApiResponse(raw)

  if (validated.hadiths.length === 0) {
    throw new NotFoundError(`لم يتم العثور على الحديث رقم ${hadithNumber} في المجموعة المحددة.`)
  }

  return transformHadithDtoToModel(validated.hadiths[0], book, validated.metadata)
}

export async function getSection(
  book: ArabicHadithBook,
  sectionNumber: number,
  signal?: AbortSignal,
): Promise<HadithModel[]> {
  assertValidBook(book)
  assertValidHadithNumber(sectionNumber)

  const path = `/editions/${book}/sections/${sectionNumber}`
  const raw = await requestWithFallback<unknown>(hadithApiService, path, signal)
  const validated = validateHadithApiResponse(raw)

  if (validated.hadiths.length === 0) {
    throw new NotFoundError(`لا توجد أحاديث في القسم رقم ${sectionNumber}.`)
  }

  return transformHadithResponseToModels(validated, book)
}

export async function getCollection(
  book: ArabicHadithBook,
  signal?: AbortSignal,
): Promise<HadithModel[]> {
  assertValidBook(book)

  const path = `/editions/${book}`
  const raw = await requestWithFallback<unknown>(hadithApiService, path, signal)
  const validated = validateHadithApiResponse(raw)

  return transformHadithResponseToModels(validated, book)
}

export async function getRandomHadith(
  book: ArabicHadithBook,
  signal?: AbortSignal,
): Promise<HadithModel> {
  assertValidBook(book)

  const randomNumber = getRandomHadithNumber(book)
  return getHadith(book, randomNumber, signal)
}
