export interface Surah {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: 'Meccan' | 'Medinan'
}

export interface Ayah {
  number: number
  numberInSurah: number
  text: string
  audio: string
}

export interface SurahDetail {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
  ayahs: Ayah[]
}