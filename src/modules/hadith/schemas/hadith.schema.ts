import { z } from 'zod'
import { InvalidResponseError } from '@/services/api-error'

// ─── Zod schemas for API validation ──────────────────────────────────────────
//
// The Fawaz Ahmed Hadith API is inconsistent across collections:
// some return numeric fields as JSON numbers, others return them as strings
// (e.g. ara-muslim returns hadithnumber as "1" instead of 1).
//
// z.coerce.number() handles both transparently: it runs Number() on the value
// before validation, so "1" → 1, 1 → 1, and invalid strings still fail.

export const hadithGradeSchema = z.object({
  name: z.string(),
  grade: z.string(),
})

export const hadithReferenceSchema = z.object({
  book: z.coerce.number(),
  hadith: z.coerce.number(),
})

export const hadithSchema = z.object({
  hadithnumber: z.coerce.number(),
  arabicnumber: z.coerce.number().optional(),
  text: z.string(),
  grades: z.array(hadithGradeSchema).optional().default([]),
  reference: hadithReferenceSchema.optional(),
})

export const hadithSectionDetailSchema = z.object({
  hadithnumber_first: z.coerce.number().optional(),
  hadithnumber_last: z.coerce.number().optional(),
  arabicnumber_first: z.coerce.number().optional(),
  arabicnumber_last: z.coerce.number().optional(),
})

export const hadithMetadataSchema = z.object({
  name: z.string().optional(),
  section: z.record(z.string(), z.string()).optional(),
  section_detail: z.record(z.string(), hadithSectionDetailSchema).optional(),
})

export const hadithApiResponseSchema = z.object({
  metadata: hadithMetadataSchema.optional(),
  hadiths: z.array(hadithSchema),
})

// ─── Inferred types ───────────────────────────────────────────────────────────

export type ValidatedHadithGrade = z.infer<typeof hadithGradeSchema>
export type ValidatedHadithReference = z.infer<typeof hadithReferenceSchema>
export type ValidatedHadith = z.infer<typeof hadithSchema>
export type ValidatedHadithApiResponse = z.infer<typeof hadithApiResponseSchema>

// ─── Validation helper ────────────────────────────────────────────────────────

/**
 * Validates a raw API response with Zod.
 * Throws InvalidResponseError with a readable message on failure.
 */
export function validateHadithApiResponse(raw: unknown): ValidatedHadithApiResponse {
  const result = hadithApiResponseSchema.safeParse(raw)
  if (!result.success) {
    const issues = result.error.issues.map((i) => i.message).join('; ')
    throw new InvalidResponseError(`استجابة غير صالحة من واجهة الأحاديث: ${issues}`)
  }
  return result.data
}
