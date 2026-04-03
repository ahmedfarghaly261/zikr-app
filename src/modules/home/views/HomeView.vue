<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PrayersTimesCard from '../components/prayersTimesCard.vue';
import HeroSection from '../components/heroSec.vue'

const { t } = useI18n()

// fetchHomeData()
</script>
<template class="px-4">
    <section class="lg:px-20">
        <div class="home-view">
            <h1 class="text-3xl font-bold mb-4">{{ t('nav.home') }}</h1>
            <p class="text-gray-600">{{ t('common.loading') }}</p>

        </div>
        <HeroSection />
        <br>
        <PrayersTimesCard next-prayer="dhuhr" prayer-time="12:30" :hours-left="1" :minutes-left="1" />
    </section>

</template>
<style scoped>
.home-view {
    padding: 2rem;
}
</style>
