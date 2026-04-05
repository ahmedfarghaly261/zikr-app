export interface PrayerTime {
  name: string
  arabicName: string
  time: string
  isPassed: boolean
  isNext: boolean
}

export interface PrayerDay {
  timings: Record<string, string>
  date: {
    readable: string
    hijri: {
      date: string
      month: { ar: string }
      year: string
    }
  }
  meta: {
    city: string
    country: string
  }
}