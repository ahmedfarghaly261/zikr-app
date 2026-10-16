<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Heart } from 'lucide-vue-next'
import QuoteCard from '@/components/shared/QuoteCard.vue'

defineProps<{
  title: string
  text: string
  source?: string
  route: string
}>()

defineEmits<{
  refresh: []
}>()

const { t } = useI18n()
</script>

<template>
  <QuoteCard
    :title="title"
    :text="text"
    :source="source"
    :icon="Heart"
    :route="route"
    icon-color="#a855f7"
    accent-color="#a855f7"
    :refresh-label="t('home.showAnotherDua')"
    :browse-label="t('home.browseDuas')"
    :retry-label="t('quran.retry')"
    @refresh="$emit('refresh')"
  />
</template>
