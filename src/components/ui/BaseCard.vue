<template>
  <div class="base-card">
    <slot />
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.base-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}
</style>
