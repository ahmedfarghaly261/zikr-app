import { ref, computed, onMounted, onUnmounted } from 'vue'

const BASE = 'https://api.aladhan.com/v1'

function cleanTime(raw: string): string {
  return raw.split(' ')[0]
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

const PRAYERS = [
  { key: 'fajr',    name: 'Fajr'    },
  { key: 'dhuhr',   name: 'Dhuhr'   },
  { key: 'asr',     name: 'Asr'     },
  { key: 'maghrib', name: 'Maghrib' },
  { key: 'isha',    name: 'Isha'    },
]

export function useNextPrayer() {
  const loading        = ref(false)
  const error          = ref<string | null>(null)
  const timings        = ref<Record<string, string>>({})
  const currentTime    = ref(new Date())

  // live clock — updates every 30s
  let timer: ReturnType<typeof setInterval>
  onMounted(() => {
    timer = setInterval(() => {
      currentTime.value = new Date()
    }, 30000)
  })
  onUnmounted(() => clearInterval(timer))

  // ── fetch ────────────────────────────────────────────────────────
  async function fetchByCoords(lat: number, lng: number) {
    loading.value = true
    error.value   = null
    try {
      const d   = new Date()
      const date = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`
      const res  = await fetch(
        `${BASE}/timings/${date}?latitude=${lat}&longitude=${lng}&method=5`
      )
      const json = await res.json()
      // clean all timings
      const raw  = json.data.timings as Record<string, string>
      timings.value = Object.fromEntries(
        Object.entries(raw).map(([k, v]) => [k, cleanTime(v)])
      )
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
      const json = await res.json()
      const raw  = json.data.timings as Record<string, string>
      timings.value = Object.fromEntries(
        Object.entries(raw).map(([k, v]) => [k, cleanTime(v)])
      )
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
    navigator.geolocation.getCurrentPosition(
      pos => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      ()  => { error.value = 'لم يتم السماح بالوصول إلى الموقع' }
    )
  }

  // ── next prayer computed ─────────────────────────────────────────
  const nextPrayer = computed(() => {
    if (!Object.keys(timings.value).length) return null

    const nowMins = currentTime.value.getHours() * 60 + currentTime.value.getMinutes()

    const found = PRAYERS.find(p => {
      const t = timings.value[p.name]
      return t && toMinutes(t) > nowMins
    })

    // if past Isha → next is Fajr tomorrow
    return found ?? PRAYERS[0]
  })

  const nextPrayerTime = computed(() => {
    if (!nextPrayer.value) return ''
    return timings.value[nextPrayer.value.name] ?? ''
  })

  // ── time remaining ───────────────────────────────────────────────
  const hoursLeft = computed(() => {
    if (!nextPrayerTime.value) return 0
    const nowMins    = currentTime.value.getHours() * 60 + currentTime.value.getMinutes()
    let   prayerMins = toMinutes(nextPrayerTime.value)
    if (prayerMins <= nowMins) prayerMins += 24 * 60  // next day
    const diff = prayerMins - nowMins
    return Math.floor(diff / 60)
  })

  const minutesLeft = computed(() => {
    if (!nextPrayerTime.value) return 0
    const nowMins    = currentTime.value.getHours() * 60 + currentTime.value.getMinutes()
    let   prayerMins = toMinutes(nextPrayerTime.value)
    if (prayerMins <= nowMins) prayerMins += 24 * 60
    const diff = prayerMins - nowMins
    return diff % 60
  })

  return {
    loading, error,
    nextPrayer, nextPrayerTime,
    hoursLeft, minutesLeft,
    detectLocation, fetchByCity,
  }
}