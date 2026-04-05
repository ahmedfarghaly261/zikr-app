<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { House, BookOpen, BookMarked, Heart, Clock, Scroll, Menu, X, Sun, Moon } from 'lucide-vue-next'
import { useDarkMode } from '@/composables/useDarkMode'

const route = useRoute()
const { isDark, toggle: toggleDarkMode } = useDarkMode()
const { t } = useI18n()

const isMobileMenuOpen = ref(false)

const navigation = computed(() => [
  { name: t('nav.home'), href: '/', icon: House },
  { name: t('nav.azkar'), href: '/azkar', icon: BookOpen },
  { name: t('nav.hadith'), href: '/hadith', icon: Scroll },
  { name: t('nav.duas'), href: '/dua', icon: Heart },
  { name: t('nav.prayerTimes'), href: '/prayer-times', icon: Clock },
  { name: t('nav.quran'), href: '/quran', icon: BookMarked },
])

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav class="bg-card sticky shadow-lg top-0 z-50 transition-colors bg-white dark:bg-slate-900 dark:border-b dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Right side - Logo -->
        <div class="flex items-center gap-4">
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors"
          >
            <X v-if="isMobileMenuOpen" class="w-5 h-5" />
            <Menu v-else class="w-5 h-5" />
          </button>
          
          <router-link to="/" class="flex items-center gap-3">
            <div class="w-12 h-12 bg-linear-to-br from-[#68A282] to-[#E6F0E9] rounded-2xl flex items-center justify-center shadow-sm">
              <span class="text-2xl font-medium text-white pb-1">{{ t('app.logoLetter') }}</span>
            </div>
            <span class="font-extrabold text-[#2C384A] dark:text-white text-2xl hidden sm:block tracking-wide">{{ t('app.title') }}</span>
          </router-link>
        </div>

        <!-- Center - Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1">
          <router-link
            v-for="item in navigation"
            :key="item.href"
            :to="item.href"
            :class="[
              'px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium',
              route.path === item.href
                ? 'bg-primary text-white shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:bg-primary dark:hover:bg-emerald-600 hover:text-white'
            ]"
          >
            <component :is="item.icon" class="w-4 h-4" />
            <span>{{ item.name }}</span>
          </router-link>
        </div>

        <!-- Left side - Dark mode toggle -->
        <div class="flex items-center gap-2">
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors"
            :aria-label="t('nav.toggleDarkMode')"
          >
            <Sun v-if="isDark" class="w-5 h-5" />
            <Moon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="isMobileMenuOpen" class="lg:hidden border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.href"
          :to="item.href"
          @click="isMobileMenuOpen = false"
          :class="[
            'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors font-medium',
            route.path === item.href
                ? 'bg-primary text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-primary dark:hover:bg-emerald-600 hover:text-white'
            ]"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span>{{ item.name }}</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.app-navbar {
  background-color: #f5f5f5;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.navbar-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}
</style>
