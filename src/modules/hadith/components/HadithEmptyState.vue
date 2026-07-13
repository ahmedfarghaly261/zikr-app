<template>
  <div
    dir="rtl"
    class="flex flex-col items-center justify-center gap-4 py-16 px-6 text-center"
    aria-label="لا يوجد حديث محدد"
  >
    <!-- Decorative icon -->
    <div class="flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20">
      <BookOpen class="w-10 h-10 text-emerald-400 dark:text-emerald-500" />
    </div>

    <!-- Heading -->
    <div class="space-y-1.5 max-w-xs">
      <h2 class="text-lg font-bold text-gray-700 dark:text-gray-200 font-cairo">
        استعرض أحاديث نبوية
      </h2>
      <p class="text-sm text-gray-400 dark:text-gray-500 font-cairo leading-relaxed">
        اختر كتابًا وأدخل رقم الحديث لعرضه، أو اضغط على "عشوائي" لاكتشاف حديث جديد.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BookOpen } from 'lucide-vue-next'
</script>
