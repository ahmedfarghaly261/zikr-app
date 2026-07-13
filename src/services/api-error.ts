/**
 * Typed application error hierarchy.
 * Never expose raw Axios or CDN error details in the UI — use these classes instead.
 */

export type ApiErrorKind =
  | 'network'
  | 'timeout'
  | 'cancelled'
  | 'invalid_response'
  | 'not_found'
  | 'server'
  | 'unknown'

export class AppError extends Error {
  readonly kind: ApiErrorKind

  constructor(message: string, kind: ApiErrorKind) {
    super(message)
    this.name = 'AppError'
    this.kind = kind
    // Preserve prototype chain in TypeScript
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export class NetworkError extends AppError {
  constructor(message = 'لا يوجد اتصال بالإنترنت') {
    super(message, 'network')
    this.name = 'NetworkError'
  }
}

export class TimeoutError extends AppError {
  constructor(message = 'انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى.') {
    super(message, 'timeout')
    this.name = 'TimeoutError'
  }
}

export class CancelledError extends AppError {
  constructor(message = 'تم إلغاء الطلب') {
    super(message, 'cancelled')
    this.name = 'CancelledError'
  }
}

export class InvalidResponseError extends AppError {
  constructor(message = 'استجابة غير صالحة من الخادم') {
    super(message, 'invalid_response')
    this.name = 'InvalidResponseError'
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'المورد المطلوب غير موجود') {
    super(message, 'not_found')
    this.name = 'NotFoundError'
  }
}

export class ServerError extends AppError {
  constructor(message = 'خطأ في الخادم. يرجى المحاولة لاحقاً.') {
    super(message, 'server')
    this.name = 'ServerError'
  }
}

export class UnknownError extends AppError {
  constructor(message = 'حدث خطأ غير متوقع') {
    super(message, 'unknown')
    this.name = 'UnknownError'
  }
}

/**
 * Returns true when the error represents a cancelled request.
 * Safe to call with any value.
 */
export function isCancelledError(error: unknown): error is CancelledError {
  return error instanceof CancelledError
}

/**
 * Returns true when the error is a typed AppError.
 */
export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}
