import api from '@/services/axios'
import { ENDPOINTS } from '@/services/endpoints'
import type { Dua } from '../types/duas.types'

export class DuasService {
  static async getAll() {
    const response = await api.get<Dua[]>(ENDPOINTS.DUAS)
    return response.data
  }

  static async getById(id: string) {
    const response = await api.get<Dua>(ENDPOINTS.DUAS_BY_ID(id))
    return response.data
  }
}
