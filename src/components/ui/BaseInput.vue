<template>
  <input
    class="base-input"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  type?: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<style scoped>
.base-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.base-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}
</style>
