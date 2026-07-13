import axios, { type AxiosInstance, type AxiosRequestConfig, isAxiosError, isCancel } from 'axios'
import {
  CancelledError,
  InvalidResponseError,
  NetworkError,
  NotFoundError,
  ServerError,
  TimeoutError,
  UnknownError,
} from './api-error'

// ─── Hadith CDN instance ────────────────────────────────────────────────────

export const hadithApiService: AxiosInstance = axios.create({
  baseURL: 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1',
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
})

// Response interceptor: convert Axios errors → typed AppError
hadithApiService.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (isCancel(error)) {
      return Promise.reject(new CancelledError())
    }

    if (isAxiosError(error)) {
      if (error.code === 'ECONNABORTED' || error.code === 'ERR_CANCELED') {
        return Promise.reject(new CancelledError())
      }
      if (error.code === 'ETIMEDOUT' || error.message?.includes('timeout')) {
        return Promise.reject(new TimeoutError())
      }
      if (!error.response) {
        return Promise.reject(new NetworkError())
      }
      if (error.response.status === 404) {
        return Promise.reject(new NotFoundError())
      }
      if (error.response.status >= 500) {
        return Promise.reject(new ServerError())
      }
      if (error.response.status >= 400) {
        return Promise.reject(new InvalidResponseError())
      }
    }

    return Promise.reject(new UnknownError())
  },
)

// ─── Typed request helper ────────────────────────────────────────────────────

export async function apiGet<T>(
  instance: AxiosInstance,
  path: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await instance.get<T>(path, config)
  return response.data
}

// ─── Fallback helper ─────────────────────────────────────────────────────────

/**
 * Try the `.min.json` version of a path first, then fall back to `.json`.
 * Never retries cancelled requests.
 */
export async function requestWithFallback<T>(
  instance: AxiosInstance,
  path: string,
  signal?: AbortSignal,
): Promise<T> {
  const config: AxiosRequestConfig = signal ? { signal } : {}

  try {
    return await apiGet<T>(instance, `${path}.min.json`, config)
  } catch (primaryError) {
    // Do not retry cancelled or aborted requests
    if (primaryError instanceof CancelledError) {
      throw primaryError
    }
    if (signal?.aborted) {
      throw new CancelledError()
    }
    // Retry with the full JSON file
    return await apiGet<T>(instance, `${path}.json`, config)
  }
}
