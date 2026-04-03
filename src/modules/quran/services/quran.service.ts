import api from '@/services/axios'
import { ENDPOINTS } from '@/services/endpoints'
import type { Surah, Ayah } from '../types/quran.types'

export class QuranService {
  static async getAllSurahs() {
    const response = await api.get<Surah[]>(ENDPOINTS.QURAN_SURAHS)
    return response.data
  }

  static async getSurah(surahNumber: number) {
    const response = await api.get<Ayah[]>(ENDPOINTS.QURAN_SURAH(surahNumber))
    return response.data
  }
}
