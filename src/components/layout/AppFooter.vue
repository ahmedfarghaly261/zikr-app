<template>
  <footer class="app-footerbg-card text-center h-5  shadow-lg bg-white  dark:bg-slate-900 dark:border-b dark:border-slate-800">
    <div class="footer-content">
      <p class="dark:text-gray-400">{{ t('footer.copyright', { year: currentYear }) }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

p {
  margin: 0;
  color: #666;
  font-size: 0.875rem;
}
</style>
