<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Heart, BookOpen, BookMarked, Clock, BookText } from 'lucide-vue-next'
import PrayersTimesCard from '../components/prayersTimesCard.vue'
import HeroSection from '../components/heroSec.vue'
import ContentSec from '../components/contentSec.vue'
import TodayHadith from '../components/todayHadith.vue'
import TodayDua from '../components/todayDua.vue'
import { useNextPrayer } from '@/modules/home/composables/useNextPrayer'
import { useDailyContent } from '@/modules/home/composables/useDailyContent'

const { t } = useI18n()

const {
  loading,
  error,
  nextPrayer,
  nextPrayerTime,
  hoursLeft,
  minutesLeft,
  detectLocation,
} = useNextPrayer()

const {
  dailyDua,
  dailyHadith,
  hadithLoading,
  hadithError,
  loadHadith,
  showAnotherDua,
  showAnotherHadith,
} = useDailyContent()

onMounted(() => detectLocation())

const features = [
  { id: 'athkar', icon: BookMarked, gradient: 'linear-gradient(135deg,#34d399,#10b981)', route: '/azkar' },
  { id: 'hadith', icon: BookOpen, gradient: 'linear-gradient(135deg,#38bdf8,#60a5fa)', route: '/hadith' },
  { id: 'adeia', icon: Heart, gradient: 'linear-gradient(135deg,#c084fc,#818cf8)', route: '/dua' },
  { id: 'prayer', icon: Clock, gradient: 'linear-gradient(135deg,#f97316,#fb923c)', route: '/prayer-times' },
  { id: 'quran', icon: BookText, gradient: 'linear-gradient(135deg,#34d399,#059669)', route: '/quran' },
]

const hadithSource = computed(() => dailyHadith.value
  ? t('home.hadithSource', { number: dailyHadith.value.hadithNumber })
  : '')

const localizedHadithError = computed(() => hadithError.value ? t('home.hadithLoadError') : null)

const hadithRoute = computed(() => dailyHadith.value
  ? `/hadith/${dailyHadith.value.bookCode}/${dailyHadith.value.hadithNumber}`
  : '/hadith')
</script>

<template>
  <main class="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
    <HeroSection />

    <section aria-labelledby="prayer-heading">
      <h2 id="prayer-heading" class="sr-only">{{ t('prayer.nextPrayer') }}</h2>
      <div v-if="loading" class="h-40 animate-pulse rounded-3xl bg-emerald-100 dark:bg-slate-800" />
      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center gap-2 rounded-3xl border border-amber-200 bg-amber-50 px-5 py-8 text-center dark:border-amber-900/60 dark:bg-amber-950/30"
      >
        <Clock class="h-7 w-7 text-amber-600 dark:text-amber-400" />
        <p class="text-sm font-semibold text-amber-800 dark:text-amber-200">{{ t('home.prayerUnavailable') }}</p>
        <RouterLink to="/prayer-times" class="text-sm font-bold text-emerald-700 hover:underline dark:text-emerald-400">
          {{ t('home.setPrayerLocation') }}
        </RouterLink>
      </div>
      <PrayersTimesCard
        v-else-if="nextPrayer"
        :next-prayer="nextPrayer.key"
        :prayer-time="nextPrayerTime"
        :hours-left="hoursLeft"
        :minutes-left="minutesLeft"
      />
    </section>

    <section class="space-y-4 font-cairo" aria-labelledby="quick-access-heading">
      <div>
        <h2 id="quick-access-heading" class="text-xl font-bold text-gray-900 dark:text-white">{{ t('home.quickAccess') }}</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ t('home.quickAccessDescription') }}</p>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <ContentSec
          v-for="feature in features"
          :key="feature.id"
          :id="feature.id"
          :icon="feature.icon"
          :icon-gradient="feature.gradient"
          :route="feature.route"
        />
      </div>
    </section>

    <section class="space-y-4 pb-4" aria-labelledby="daily-content-heading">
      <div>
        <h2 id="daily-content-heading" class="text-xl font-bold text-gray-900 dark:text-white">{{ t('home.dailyInspiration') }}</h2>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ t('home.dailyInspirationDescription') }}</p>
      </div>

      <div class="grid items-stretch gap-4 lg:grid-cols-2">
        <TodayHadith
          :title="t('home.dailyHadith')"
          :text="dailyHadith?.text ?? ''"
          :source="hadithSource"
          :route="hadithRoute"
          :loading="hadithLoading"
          :error="localizedHadithError"
          @refresh="showAnotherHadith"
          @retry="loadHadith"
        />
        <TodayDua
          :title="t('home.dailyDua')"
          :text="t(dailyDua.textKey)"
          :source="`${t(dailyDua.titleKey)} · ${t(dailyDua.sourceKey)}`"
          route="/dua"
          @refresh="showAnotherDua"
        />
      </div>
    </section>
  </main>
</template>
