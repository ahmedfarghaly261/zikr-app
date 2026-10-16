<template>
  <section class="relative isolate overflow-hidden rounded-4xl bg-linear-to-br from-emerald-700 via-emerald-600 to-teal-500 px-6 py-10 text-white shadow-xl shadow-emerald-900/10 sm:px-10 sm:py-12 lg:px-14">
    <div class="absolute -end-16 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
    <div class="absolute -bottom-24 -start-10 h-56 w-56 rounded-full bg-teal-300/20 blur-2xl" />
    <MoonStar class="absolute end-8 top-8 h-24 w-24 text-white/10 sm:h-32 sm:w-32" :stroke-width="1" />

    <div class="relative max-w-3xl">
      <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur-sm">
        <CalendarDays class="h-4 w-4" />
        <span>{{ islamicDate }}</span>
      </div>
      <h1 class="max-w-2xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
        {{ t('hero.title') }}
      </h1>
      <p class="mt-4 max-w-2xl text-base leading-8 text-emerald-50 sm:text-lg">
        {{ t('hero.subtitle') }}
      </p>
      <RouterLink
        to="/quran"
        class="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-emerald-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-50"
      >
        <BookOpen class="h-5 w-5" />
        {{ t('hero.cta') }}
        <ArrowLeft class="h-4 w-4" />
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, BookOpen, CalendarDays, MoonStar } from 'lucide-vue-next'

const { t, locale } = useI18n()

const islamicDate = computed(() => {
  const dateLocale = locale.value === 'ar' ? 'ar-EG-u-ca-islamic' : 'en-US-u-ca-islamic'
  return new Intl.DateTimeFormat(dateLocale, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
})
</script>
