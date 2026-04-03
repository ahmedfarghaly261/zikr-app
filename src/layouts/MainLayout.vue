<template>
  <div class="main-layout">
    <AppNavbar />
    <div class="layout-content">
      <main class="main-view">
        <router-view />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout-content {
  display: flex;
  flex: 1;
}

.main-view {
  flex: 1;
  overflow-y: auto;
}
</style>
