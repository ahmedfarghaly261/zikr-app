export interface PrayerTime {
  name: string
  time: string
}

export interface DailyPrayerTimes {
  date: string
  times: PrayerTime[]
}
