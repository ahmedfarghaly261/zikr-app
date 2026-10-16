import { createI18n } from 'vue-i18n'
import ar from './ar.json'
import en from './en.json'
import adkar from '@/global/adkar.json'
import { enAthkarCategories } from './athkar-categories'

const arAthkarCategories = [...new Set(adkar.map(item => item.category))]

const messages = {
  ar: {
    ...ar,
    athkar: { ...ar.athkar, categories: arAthkarCategories },
  },
  en: {
    ...en,
    athkar: { ...en.athkar, categories: enAthkarCategories },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'en',
  messages,
})

export default i18n
