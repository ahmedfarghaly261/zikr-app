import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { PrayerTime, PrayerDay } from '@/modules/prayer-times/types/prayer-times.types'

const BASE = 'https://api.aladhan.com/v1'

function cleanTime(raw: string): string {
  return raw.split(' ')[0]
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function usePrayerTimes() {
  const loading    = ref(false)
  const error      = ref<string | null>(null)
  const prayerDay  = ref<PrayerDay | null>(null)
  const currentTime = ref(new Date())
  const locationLabel = ref('')

  // live clock
  let timer: ReturnType<typeof setInterval>
  onMounted(() => {
    timer = setInterval(() => currentTime.value = new Date(), 60000)
  })
  onUnmounted(() => clearInterval(timer))

  // ── helpers ──────────────────────────────────────────────────────
  async function handleResponse(res: Response, label: string) {
    if (!res.ok) throw new Error()
    const json = await res.json()
    prayerDay.value = json.data
    locationLabel.value = label
  }

  async function fetchByCoords(lat: number, lng: number) {
    loading.value = true
    error.value   = null
    try {
      const today = new Date()
      const date  = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`
      const res   = await fetch(
        `${BASE}/timings/${date}?latitude=${lat}&longitude=${lng}&method=5`
      )
      const json = await res.json()
      prayerDay.value   = json.data
      locationLabel.value = `${json.data.meta.city ?? ''}, ${json.data.meta.country ?? ''}`
    } catch {
      error.value = 'فشل تحميل مواقيت الصلاة'
    } finally {
      loading.value = false
    }
  }

  async function fetchByCity(city: string, country: string) {
    loading.value = true
    error.value   = null
    try {
      const res  = await fetch(
        `${BASE}/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=5`
      )
      await handleResponse(res, `${city}، ${country}`)
    } catch {
      error.value = 'تعذّر العثور على المدينة'
    } finally {
      loading.value = false
    }
  }

  function detectLocation() {
    if (!navigator.geolocation) {
      error.value = 'المتصفح لا يدعم تحديد الموقع'
      return
    }
    loading.value = true
    navigator.geolocation.getCurrentPosition(
      pos => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      ()  => {
        loading.value = false
        error.value   = 'لم يتم السماح بالوصول إلى الموقع'
      }
    )
  }

  // ── computed prayers list ─────────────────────────────────────────
  const prayers = computed<PrayerTime[]>(() => {
    if (!prayerDay.value) return []

    const nowMins = currentTime.value.getHours() * 60 + currentTime.value.getMinutes()
    const t       = prayerDay.value.timings

    const list = [
      { name: 'Fajr',    arabicName: 'الفجر',  time: cleanTime(t.Fajr)    },
      { name: 'Sunrise', arabicName: 'الشروق', time: cleanTime(t.Sunrise) },
      { name: 'Dhuhr',   arabicName: 'الظهر',  time: cleanTime(t.Dhuhr)   },
      { name: 'Asr',     arabicName: 'العصر',  time: cleanTime(t.Asr)     },
      { name: 'Maghrib', arabicName: 'المغرب', time: cleanTime(t.Maghrib) },
      { name: 'Isha',    arabicName: 'العشاء', time: cleanTime(t.Isha)    },
    ]

    // find next prayer index
    const nextIndex = list.findIndex(p => toMinutes(p.time) > nowMins)

    return list.map((p, i) => ({
      ...p,
      isPassed: toMinutes(p.time) <= nowMins,
      isNext:   i === nextIndex,
    }))
  })

  const nextPrayer = computed(() => prayers.value.find(p => p.isNext))

  const formattedTime = computed(() =>
    currentTime.value.toLocaleTimeString('ar-SA', {
      hour: '2-digit', minute: '2-digit',
    })
  )

  const formattedDate = computed(() =>
    currentTime.value.toLocaleDateString('ar-SA', {
      weekday: 'long', year: 'numeric',
      month: 'long',   day: 'numeric',
    })
  )

  return {
    loading, error, prayerDay, prayers,
    nextPrayer, locationLabel,
    formattedTime, formattedDate,
    fetchByCity, detectLocation,
  }
}