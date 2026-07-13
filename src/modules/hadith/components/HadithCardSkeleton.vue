<template>
  <div
    dir="rtl"
    class="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700
           shadow-sm overflow-hidden animate-pulse"
    aria-label="جاري تحميل الحديث..."
    aria-busy="true"
  >
    <!-- Header skeleton -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-slate-700 bg-emerald-50/60 dark:bg-emerald-900/20">
      <div class="h-4 w-32 rounded-full bg-gray-200 dark:bg-slate-600" />
      <div class="h-6 w-10 rounded-full bg-gray-200 dark:bg-slate-600" />
    </div>

    <!-- Text skeleton -->
    <div class="px-5 py-5">
      <div class="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-5 border-r-4 border-gray-200 dark:border-slate-600 space-y-3">
        <div class="h-4 rounded bg-gray-200 dark:bg-slate-600 w-full" />
        <div class="h-4 rounded bg-gray-200 dark:bg-slate-600 w-5/6" />
        <div class="h-4 rounded bg-gray-200 dark:bg-slate-600 w-full" />
        <div class="h-4 rounded bg-gray-200 dark:bg-slate-600 w-4/6" />
        <div class="h-4 rounded bg-gray-200 dark:bg-slate-600 w-full" />
        <div class="h-4 rounded bg-gray-200 dark:bg-slate-600 w-3/5" />
      </div>
    </div>

    <!-- Meta skeleton -->
    <div class="px-5 pb-4 space-y-2">
      <div class="h-3 w-40 rounded bg-gray-200 dark:bg-slate-600" />
      <div class="flex gap-2">
        <div class="h-5 w-20 rounded-full bg-gray-200 dark:bg-slate-600" />
      </div>
      <div class="h-3 w-52 rounded bg-gray-100 dark:bg-slate-700" />
    </div>

    <!-- Action bar skeleton -->
    <div class="flex items-center justify-between gap-2 px-5 py-3 border-t border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-900/20">
      <div class="flex gap-2">
        <div class="h-8 w-16 rounded-lg bg-gray-200 dark:bg-slate-600" />
        <div class="h-8 w-16 rounded-lg bg-gray-200 dark:bg-slate-600" />
      </div>
      <div class="flex gap-2">
        <div class="h-8 w-16 rounded-lg bg-gray-200 dark:bg-slate-600" />
        <div class="h-8 w-16 rounded-lg bg-gray-200 dark:bg-slate-600" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Purely presentational — no logic needed
</script>
