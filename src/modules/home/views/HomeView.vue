<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PrayersTimesCard from '../components/prayersTimesCard.vue';
import HeroSection from '../components/heroSec.vue'
import { computed } from 'vue';
import { Heart, BookOpen, BookMarked, Clock, BookText } from 'lucide-vue-next'
import ContentSec from '../components/contentSec.vue';

const { t } = useI18n()


const features = [
  {
    id: 'athkar',
    icon: BookMarked,
    gradient: 'linear-gradient(135deg,#34d399,#10b981)',
    route: '/athkar',
  },
  {
    id: 'hadith',
    icon: BookOpen,
    gradient: 'linear-gradient(135deg,#38bdf8,#60a5fa)',
    route: '/hadith',
  },
  {
    id: 'adeia',
    icon: Heart,
    gradient: 'linear-gradient(135deg,#c084fc,#818cf8)',
    route: '/adeia',
  },
  {
    id: 'prayer',
    icon: Clock,
    gradient: 'linear-gradient(135deg,#f97316,#fb923c)',
    route: '/prayer',
  },
  {
    id: 'quran',
    icon: BookText,
    gradient: 'linear-gradient(135deg,#34d399,#059669)',
    route: '/quran',
  },
]

const topRow = computed(() => features.slice(0, 3))
const bottomRow = computed(() => features.slice(3))

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

          <section dir="rtl" class="p-6 font-cairo">
    <div class="grid grid-cols-3 gap-4 mb-4">
      <ContentSec
        v-for="f in topRow"
        :key="f.id"
        :id="f.id"
        :icon="f.icon"
        :icon-gradient="f.gradient"
        :route="f.route"
      />
    </div>
    <div class="grid grid-cols-2 gap-4">
      <ContentSec
        v-for="f in bottomRow"
        :key="f.id"
        :id="f.id"
        :icon="f.icon"
        :icon-gradient="f.gradient"
        :route="f.route"
      />
    </div>
  </section>

    </section>


</template>
<style scoped>
.home-view {
    padding: 2rem;
}
</style>
