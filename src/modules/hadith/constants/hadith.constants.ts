export { HADITH_BOOKS, findHadithBook, VALID_HADITH_BOOKS } from './hadith-books'

/**
 * @deprecated Use HADITH_BOOKS from hadith-books.ts instead.
 */
export const HADITH_SOURCES = {
  SAHIH_BUKHARI: 'ara-bukhari',
  SAHIH_MUSLIM: 'ara-muslim',
  TIRMIDHI: 'ara-tirmidhi',
} as const
