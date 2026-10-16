<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { BookOpen } from 'lucide-vue-next'
import QuoteCard from '@/components/shared/QuoteCard.vue'

defineProps<{
  title: string
  text: string
  source?: string
  route: string
  loading?: boolean
  error?: string | null
}>()

defineEmits<{
  refresh: []
  retry: []
}>()

const { t } = useI18n()
</script>

<template>
  <QuoteCard
    :title="title"
    :text="text"
    :source="source"
    :icon="BookOpen"
    :route="route"
    :loading="loading"
    :error="error"
    :refresh-label="t('home.showAnotherHadith')"
    :browse-label="t('home.browseHadith')"
    :retry-label="t('quran.retry')"
    @refresh="$emit('refresh')"
    @retry="$emit('retry')"
  />
</template>
