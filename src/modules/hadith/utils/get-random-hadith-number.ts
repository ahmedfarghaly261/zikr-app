import type { ArabicHadithBook } from '../types/hadith.types'
import { VALID_HADITH_BOOKS, findHadithBook } from '../constants/hadith-books'


function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomHadithNumber(bookCode: ArabicHadithBook): number {
  if (!VALID_HADITH_BOOKS.has(bookCode)) {
    throw new Error(`المجموعة غير مدعومة: ${bookCode}`)
  }
  const book = findHadithBook(bookCode)
  // findHadithBook is always defined here since we checked VALID_HADITH_BOOKS
  const max = book!.maxHadithNumber
  return randomInt(1, max)
}
