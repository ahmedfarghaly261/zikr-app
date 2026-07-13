// ─── Hadith module public exports ─────────────────────────────────────────────

// Types (includes legacy Hadith interface for backward compat)
export * from './types/hadith.types'

// Models
export * from './models/hadith.model'

// Constants
export * from './constants/hadith-books'

// Composables
export { useHadith } from './composables/useHadith'
export { useRandomHadith } from './composables/useRandomHadith'
export { useHadithSection } from './composables/useHadithSection'
export { useHadithCollection } from './composables/useHadithCollection'

// Service (for use outside components only)
export {
  getHadith,
  getSection,
  getCollection,
  getRandomHadith,
} from './services/hadith.service'
