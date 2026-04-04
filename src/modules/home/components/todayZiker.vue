<script setup lang="ts">
import QuoteCard from '@/components/shared/QuoteCard.vue';
import { Heart } from 'lucide-vue-next';
defineProps<{
  title: string
  text: string
  source?: string
  iconColor?: string
  accentColor?: string
}>();
</script>

<template>
<div>
    <QuoteCard
        :title="title"
        :text="text"
        :source="source"
        :icon="Heart"
        :iconColor="iconColor"
        :accentColor="accentColor"/>
</div>
</template>