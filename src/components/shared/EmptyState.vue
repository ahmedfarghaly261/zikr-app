<template>
  <div class="empty-state">
    <p>{{ message || t('common.noData') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  message?: string
}

defineProps<Props>()
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #999;
}
</style>
