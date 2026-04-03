export interface Surah {
  number: number
  name: string
  ayahCount: number
}

export interface Ayah {
  surah: number
  number: number
  text: string
  translation?: string
}
