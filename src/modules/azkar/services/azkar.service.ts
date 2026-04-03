import api from '@/services/axios'
import { ENDPOINTS } from '@/services/endpoints'
import type { Azkar } from '../types/azkar.types'

export class AzkarService {
  static async getAll() {
    const response = await api.get<Azkar[]>(ENDPOINTS.AZKAR)
    return response.data
  }

  static async getById(id: string) {
    const response = await api.get<Azkar>(ENDPOINTS.AZKAR_BY_ID(id))
    return response.data
  }
}
