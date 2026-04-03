import { createI18n } from 'vue-i18n'
import ar from './ar.json'
import en from './en.json'

const messages = {
  ar,
  en,
}

const i18n = createI18n({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'en',
  messages,
})

export default i18n
