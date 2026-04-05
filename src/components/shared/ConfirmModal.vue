<template>
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content dark:bg-slate-800 dark:text-gray-100" @click.stop>
      <h2 class="dark:text-gray-100">{{ title }}</h2>
      <p class="dark:text-gray-300">{{ message }}</p>
      <div class="modal-actions">
        <button class="btn-cancel dark:bg-slate-600 dark:hover:bg-slate-500" @click="close">{{ t('common.cancel') }}</button>
        <button class="btn-confirm dark:bg-primary dark:hover:bg-emerald-600" @click="confirm">{{ t('common.confirm') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
interface Props {
  isOpen: boolean
  title: string
  message: string
}

defineProps<Props>()

const emit = defineEmits<{
  confirm: []
  close: []
}>()

const confirm = () => {
  emit('confirm')
}

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-top: 0;
  margin-bottom: 1rem;
}

p {
  margin-bottom: 1.5rem;
  color: #666;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background-color: #545b62;
}

.btn-confirm {
  background-color: #007bff;
  color: white;
}

.btn-confirm:hover {
  background-color: #0056b3;
}
</style>
