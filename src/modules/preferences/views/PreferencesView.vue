<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { Check, Languages, Monitor, Moon, RotateCcw, Settings, Sun, Type } from 'lucide-vue-next'
import { useSettingsStore } from '@/stores/settings.store'
import type { Language, TextSize, Theme } from '@/stores/settings.store'

const { t } = useI18n()
const settingsStore = useSettingsStore()
const { language, textSize, theme } = storeToRefs(settingsStore)

const languageOptions: Array<{ value: Language; labelKey: string; nativeLabel: string }> = [
  { value: 'ar', labelKey: 'preferences.arabic', nativeLabel: 'العربية' },
  { value: 'en', labelKey: 'preferences.english', nativeLabel: 'English' },
]

const themeOptions: Array<{ value: Theme; labelKey: string; icon: typeof Sun }> = [
  { value: 'light', labelKey: 'preferences.light', icon: Sun },
  { value: 'dark', labelKey: 'preferences.dark', icon: Moon },
  { value: 'system', labelKey: 'preferences.system', icon: Monitor },
]

const textSizeOptions: Array<{ value: TextSize; labelKey: string; previewClass: string }> = [
  { value: 'small', labelKey: 'preferences.small', previewClass: 'text-sm' },
  { value: 'medium', labelKey: 'preferences.medium', previewClass: 'text-base' },
  { value: 'large', labelKey: 'preferences.large', previewClass: 'text-xl' },
]
</script>

<template>
  <main class="mx-auto w-full max-w-4xl space-y-6 px-4 py-8 sm:px-6">
    <header class="space-y-2">
      <div class="flex items-center gap-3">
        <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          <Settings class="h-6 w-6" />
        </span>
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ t('preferences.title') }}</h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('preferences.subtitle') }}</p>
        </div>
      </div>
    </header>

    <section class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-6">
      <div class="mb-5 flex items-start gap-3">
        <Languages class="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <div>
          <h2 class="font-bold text-gray-900 dark:text-white">{{ t('preferences.language') }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('preferences.languageDescription') }}</p>
        </div>
      </div>

      <div class="grid gap-3 sm:grid-cols-2">
        <button
          v-for="option in languageOptions"
          :key="option.value"
          type="button"
          class="flex items-center justify-between rounded-xl border p-4 text-start transition-colors"
          :class="language === option.value
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
            : 'border-gray-200 text-gray-700 hover:border-emerald-300 dark:border-slate-600 dark:text-gray-200 dark:hover:border-emerald-600'"
          :aria-pressed="language === option.value"
          @click="settingsStore.setLanguage(option.value)"
        >
          <span>
            <span class="block font-semibold">{{ t(option.labelKey) }}</span>
            <span class="text-sm opacity-70">{{ option.nativeLabel }}</span>
          </span>
          <Check v-if="language === option.value" class="h-5 w-5" />
        </button>
      </div>
    </section>

    <section class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-6">
      <div class="mb-5 flex items-start gap-3">
        <Sun class="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <div>
          <h2 class="font-bold text-gray-900 dark:text-white">{{ t('preferences.appearance') }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('preferences.appearanceDescription') }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          v-for="option in themeOptions"
          :key="option.value"
          type="button"
          class="flex items-center gap-3 rounded-xl border p-4 transition-colors"
          :class="theme === option.value
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
            : 'border-gray-200 text-gray-700 hover:border-emerald-300 dark:border-slate-600 dark:text-gray-200 dark:hover:border-emerald-600'"
          :aria-pressed="theme === option.value"
          @click="settingsStore.setTheme(option.value)"
        >
          <component :is="option.icon" class="h-5 w-5" />
          <span class="font-semibold">{{ t(option.labelKey) }}</span>
          <Check v-if="theme === option.value" class="ms-auto h-5 w-5" />
        </button>
      </div>
    </section>

    <section class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-6">
      <div class="mb-5 flex items-start gap-3">
        <Type class="mt-0.5 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <div>
          <h2 class="font-bold text-gray-900 dark:text-white">{{ t('preferences.textSize') }}</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ t('preferences.textSizeDescription') }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <button
          v-for="option in textSizeOptions"
          :key="option.value"
          type="button"
          class="flex min-h-20 items-center justify-between rounded-xl border p-4 transition-colors"
          :class="textSize === option.value
            ? 'border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200'
            : 'border-gray-200 text-gray-700 hover:border-emerald-300 dark:border-slate-600 dark:text-gray-200 dark:hover:border-emerald-600'"
          :aria-pressed="textSize === option.value"
          @click="settingsStore.setTextSize(option.value)"
        >
          <span class="font-semibold">{{ t(option.labelKey) }}</span>
          <span :class="['font-bold', option.previewClass]">Aa</span>
        </button>
      </div>
    </section>

    <div class="flex justify-end">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-slate-700 dark:text-gray-300 dark:hover:border-red-800 dark:hover:bg-red-950/30 dark:hover:text-red-300"
        @click="settingsStore.resetPreferences"
      >
        <RotateCcw class="h-4 w-4" />
        {{ t('preferences.reset') }}
      </button>
    </div>
  </main>
</template>
