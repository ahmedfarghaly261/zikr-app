import api from '@/services/axios'
import { ENDPOINTS } from '@/services/endpoints'
import type { Hadith } from '../types/hadith.types'

export class HadithService {
  static async getAll() {
    const response = await api.get<Hadith[]>(ENDPOINTS.HADITH)
    return response.data
  }

  static async getById(id: string) {
    const response = await api.get<Hadith>(ENDPOINTS.HADITH_BY_ID(id))
    return response.data
  }
}
