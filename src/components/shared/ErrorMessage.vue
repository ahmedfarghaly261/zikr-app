<template>
  <div class="error-message">
    <p>{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string
}

defineProps<Props>()
</script>

<style scoped>
.error-message {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 0.25rem;
  padding: 0.75rem 1.25rem;
  color: #721c24;
  margin-bottom: 1rem;
}

p {
  margin: 0;
}
</style>
