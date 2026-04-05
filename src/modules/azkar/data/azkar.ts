import type { Azkar } from '@/modules/azkar/types/azkar.types'
import adkarJson from '@/global/adkar.json'

export const allAzkar: Azkar[] = adkarJson.map(item => ({
  ...item,
  current: 0
})) as Azkar[]
