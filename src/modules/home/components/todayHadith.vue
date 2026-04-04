<script setup lang="ts">
import QuoteCard from '@/components/shared/QuoteCard.vue';
import { BookOpen } from 'lucide-vue-next';

defineProps<{
  title: string
  text: string
  source?: string
}>();
</script>
<template>
    <QuoteCard
  :title="title"
  :text="text"
  :source="source"
  :icon="BookOpen"/>
</template>