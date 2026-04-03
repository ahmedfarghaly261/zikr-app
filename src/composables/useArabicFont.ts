import { onMounted, onUnmounted } from 'vue'

export function useArabicFont() {
  const applyArabicSettings = () => {
    // Set RTL direction and Arabic language on the HTML tag
    document.documentElement.dir = 'rtl'
    document.documentElement.lang = 'ar'
    
    // Add the custom Cairo font utility class created in Tailwind config
    document.body.classList.add('font-cairo')
  }

  const removeArabicSettings = () => {
    // Revert back when unmounted (if needed for LTR pages)
    document.documentElement.dir = 'ltr'
    document.documentElement.lang = 'en'
    document.body.classList.remove('font-cairo')
  }

  onMounted(() => {
    applyArabicSettings()
  })

  onUnmounted(() => {
    removeArabicSettings()
  })

  return {
    applyArabicSettings,
    removeArabicSettings
  }
}
