import type { Hadith } from '@/modules/hadith/types/hadith.types'
import rawData from '@/global/hadith/muslim.json'

export const hadiths: Hadith[] = (rawData as any).hadiths.map((item: any) => ({
  ...item
})) as Hadith[]