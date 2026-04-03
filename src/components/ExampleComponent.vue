<template>
  <div class="example-component">
    <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-center max-w-md mx-auto mt-10">
      <h2 class="text-3xl font-black font-cairo text-green-700 dark:text-green-400 mb-4">
        مرحباً بك في تطبيق ذكر
      </h2>
      <p class="text-gray-600 dark:text-gray-300 font-cairo">
        هذا المكون يوضح استخدام خط Cairo والاتجاة من اليمين لليسار وتطبيق utility class `font-cairo`.
      </p>
      
      <button class="mt-6 font-cairo font-bold bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
        زر للتجربة
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import the created composable
import { useArabicFont } from '@/composables/useArabicFont'

// Applying Cairo font and RTL settings simply by calling the composable
useArabicFont()
</script>

<style scoped>
.example-component {
  padding: 2rem;
}
</style>
