<template>
  <main dir="rtl" class="max-w-2xl mx-auto px-4 py-8 font-cairo space-y-5">

    <!-- header -->
    <div class="text-center space-y-1">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ t('prayer.title') }}</h1>
      <p class="text-gray-400 dark:text-gray-500 text-sm">{{ t('prayer.subtitle') }}</p>
    </div>

    <!-- location + time card -->
    <div class="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 space-y-3">
      <div class="flex items-center justify-between flex-wrap gap-3">

        <!-- location -->
        <button
          class="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400
                 transition-colors group"
          @click="showLocationInput = !showLocationInput"
        >
          <MapPin class="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span class="font-semibold text-sm">
            {{ locationLabel || t('prayer.noLocation') }}
          </span>
        </button>

        <!-- current time -->
        <div class="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Clock class="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span class="font-semibold text-sm">{{ formattedTime }}</span>
        </div>

      </div>

      <!-- date -->
      <div class="text-center">
        <p class="text-xs text-gray-400 dark:text-gray-500">{{ formattedDate }}</p>
      </div>

      <!-- location input panel -->
      <div v-if="showLocationInput" class="pt-2 space-y-3 border-t border-gray-50 dark:border-slate-700">
        <div class="flex gap-2">
          <input
            v-model="cityInput"
            type="text"
            :placeholder="t('prayer.cityPlaceholder')"
            class="flex-1 px-3 py-2.5 border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 rounded-xl text-right font-cairo text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-500"
          />
          <input
            v-model="countryInput"
            type="text"
            :placeholder="t('prayer.countryPlaceholder')"
            class="flex-1 px-3 py-2.5 border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 rounded-xl text-right font-cairo text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-300 dark:focus:ring-emerald-500"
          />
          <button
            class="px-4 py-2.5 bg-emerald-500 dark:bg-emerald-600 text-white rounded-xl text-sm
                   font-semibold hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors
                   active:scale-95"
            @click="handleManualSearch"
          >
            <Search class="w-4 h-4" />
          </button>
        </div>

        <button
          class="w-full py-2.5 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400
                 rounded-xl text-sm font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-500/10
                 transition-colors flex items-center justify-center gap-2"
          @click="detectLocation"
        >
          <LocateFixed class="w-4 h-4" />
          {{ t('prayer.detect') }}
        </button>
      </div>
    </div>

    <!-- error -->
    <div v-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 rounded-xl p-4 text-center">
      <p class="text-red-500 dark:text-red-400 text-sm">{{ error }}</p>
    </div>

    <!-- loading -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block w-8 h-8 border-2 border-emerald-500 dark:border-emerald-400
                  border-t-transparent rounded-full animate-spin mb-3" />
      <p class="text-gray-400 dark:text-gray-500 text-sm">{{ t('prayer.loading') }}</p>
    </div>

    <template v-if="!loading && prayerDay">

      <!-- next prayer banner -->
      <div
        class="rounded-2xl p-6 text-white text-center space-y-2"
        style="background: linear-gradient(135deg, #3d8c6e, #5ab389)"
      >
        <div class="flex items-center justify-center gap-2 text-white/80">
          <Bell class="w-5 h-5" />
          <span class="text-sm font-semibold">{{ t('prayer.nextPrayer') }}</span>
        </div>
        <p class="text-4xl font-black">{{ nextPrayer?.arabicName }}</p>
        <p class="text-2xl font-bold opacity-90">{{ nextPrayer?.time }}</p>
      </div>

      <!-- prayers list -->
      <div class="space-y-3">
        <div
          v-for="(prayer, index) in prayers"
          :key="prayer.name"
          class="rounded-xl p-5 border transition-all"
          :class="[
            prayer.isNext
              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 border-2'
              : prayer.isPassed
                ? 'bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700 opacity-60'
                : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-500/50'
          ]"
        >
          <div class="flex items-center justify-between">

            <!-- left: number badge + name -->
            <div class="flex items-center gap-4">

              <!-- number badge -->
              <div
                class="w-11 h-11 rounded-xl flex items-center justify-center
                       font-bold text-sm"
                :class="[
                  prayer.isNext
                    ? 'bg-emerald-500 text-white'
                    : prayer.isPassed
                      ? 'bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-gray-500'
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-400'
                ]"
              >
                {{ index + 1 }}
              </div>

              <!-- time + status -->
              <div>
                <p
                  class="text-xl font-bold"
                  :class="prayer.isNext
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : prayer.isPassed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'"
                >
                  {{ prayer.time }}
                </p>
                <p
                  v-if="prayer.name !== 'Sunrise'"
                  class="text-xs text-gray-400 dark:text-gray-500"
                >
                  {{ prayer.isPassed ? t('prayer.passed') : t('prayer.notYet') }}
                </p>
              </div>
            </div>

            <!-- right: arabic + english name -->
            <div class="text-right">
              <p
                class="text-xl font-bold"
                :class="prayer.isNext
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : prayer.isPassed ? 'text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'"
              >
                {{ prayer.arabicName }}
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-500">{{ prayer.name }}</p>
            </div>

          </div>
        </div>
      </div>

      <!-- note -->
      <div class="bg-gray-50 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-700 rounded-xl p-4">
        <p class="text-xs text-gray-400 dark:text-gray-500 text-center">
          {{ t('prayer.note') }}
        </p>
      </div>

    </template>

    <!-- empty state -->
    <div v-if="!loading && !prayerDay && !error"
      class="text-center py-16 space-y-3">
      <MapPin class="w-12 h-12 text-gray-200 dark:text-slate-700 mx-auto" />
      <p class="text-gray-400 dark:text-gray-500 text-sm">{{ t('prayer.noLocation') }}</p>
      <button
        class="px-6 py-2.5 bg-emerald-500 dark:bg-emerald-600 text-white rounded-xl text-sm
               font-semibold hover:bg-emerald-600 dark:hover:bg-emerald-500 transition-colors mx-auto block"
        @click="detectLocation"
      >
        {{ t('prayer.detect') }}
      </button>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { MapPin, Clock, Bell, Search, LocateFixed } from 'lucide-vue-next'
import { usePrayerTimes } from '@/modules/prayer-times/services/prayer-times.service'

const { t } = useI18n()

const {
  loading, error, prayerDay,
  prayers, nextPrayer,
  locationLabel, formattedTime, formattedDate,
  fetchByCity, detectLocation,
} = usePrayerTimes()

const showLocationInput = ref(false)
const cityInput         = ref('')
const countryInput      = ref('')

function handleManualSearch() {
  if (cityInput.value && countryInput.value) {
    fetchByCity(cityInput.value, countryInput.value)
    showLocationInput.value = false
  }
}

onMounted(() => detectLocation())
</script>