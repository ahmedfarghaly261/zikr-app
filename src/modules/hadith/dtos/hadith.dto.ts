// ─── Raw API DTO types ────────────────────────────────────────────────────────
// These types mirror the actual JSON response from the Fawaz Ahmed Hadith API.
// Do NOT import or use these in Vue components; use HadithModel instead.

export interface HadithGradeDto {
  name: string
  grade: string
}

export interface HadithReferenceDto {
  book: number
  hadith: number
}

export interface HadithDto {
  hadithnumber: number
  arabicnumber?: number
  text: string
  grades?: HadithGradeDto[]
  reference?: HadithReferenceDto
}

export interface HadithSectionDetailDto {
  hadithnumber_first?: number
  hadithnumber_last?: number
  arabicnumber_first?: number
  arabicnumber_last?: number
}

export interface HadithMetadataDto {
  name?: string
  section?: Record<string, string>
  section_detail?: Record<string, HadithSectionDetailDto>
}

export interface HadithApiResponseDto {
  metadata?: HadithMetadataDto
  hadiths: HadithDto[]
}
