import api from '@/services/axios'
import { ENDPOINTS } from '@/services/endpoints'
import type { DailyPrayerTimes } from '../types/prayer-times.types'

export class PrayerTimesService {
  static async getPrayerTimes() {
    const response = await api.get<DailyPrayerTimes>(ENDPOINTS.PRAYER_TIMES)
    return response.data
  }
}
