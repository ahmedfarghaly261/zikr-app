<template>
  <div dir="rtl" class="space-y-4">
    <HadithCard
      v-for="hadith in hadiths"
      :key="hadith.id"
      :hadith="hadith"
      @previous="emit('previous', hadith)"
      @next="emit('next', hadith)"
    />
  </div>
</template>

<script setup lang="ts">
import HadithCard from './HadithCard.vue'
import type { HadithModel } from '../models/hadith.model'

interface Props {
  hadiths: HadithModel[]
}

defineProps<Props>()

const emit = defineEmits<{
  previous: [hadith: HadithModel]
  next: [hadith: HadithModel]
}>()
</script>
