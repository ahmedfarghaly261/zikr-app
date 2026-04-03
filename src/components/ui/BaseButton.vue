<template>
  <button class="base-button" :class="variant">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
})
</script>

<style scoped>
.base-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.2s;
}

.base-button.primary {
  background-color: #007bff;
  color: white;
}

.base-button.primary:hover {
  background-color: #0056b3;
}

.base-button.secondary {
  background-color: #6c757d;
  color: white;
}

.base-button.secondary:hover {
  background-color: #545b62;
}

.base-button.danger {
  background-color: #dc3545;
  color: white;
}

.base-button.danger:hover {
  background-color: #bb2d3b;
}
</style>
