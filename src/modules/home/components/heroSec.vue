<template>
  <section class="hero-section text-gray-900 dark:text-gray-100">
    <div class="max-w-4xl mx-auto text-center">
      <p class="text-3xl font-bold opacity-90">{{ t('hero.subtitle') }}</p>
      <button class="mt-6 px-8 py-3 bg-primary text-white hover:bg-emerald-700 dark:hover:bg-emerald-600 rounded-lg shadow-sm">
        {{ t('hero.cta') }}
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style scoped>
.hero-section {
  margin-bottom: 2rem;
}
</style>
