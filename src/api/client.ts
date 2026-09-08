const API_URL = import.meta.env.VITE_API_URL

const AUTH_TOKEN_KEY = 'accessToken'

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function setStoredToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function clearStoredToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export interface FieldError {
  field: string
  message: string
}

// Thrown when the server responded, but with an error status (4xx/5xx).
export class ApiError extends Error {
  status: number
  fieldErrors?: FieldError[]

  constructor(status: number, message: string, fieldErrors?: FieldError[]) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

// Thrown when the request never reached the server (offline, DNS failure,
// backend not running, CORS rejection) — distinct from an HTTP error response.
export class NetworkError extends Error {
  constructor(cause: unknown) {
    super('Unable to reach the server. Check your connection and try again.')
    this.name = 'NetworkError'
    this.cause = cause
  }
}

// FastAPI's validation errors (422) shape `detail` as an array of
// { loc, msg, type } objects rather than a string.
interface ValidationIssue {
  loc: (string | number)[]
  msg: string
  type: string
}

function isValidationIssue(value: unknown): value is ValidationIssue {
  return (
    typeof value === 'object' &&
    value !== null &&
    'msg' in value &&
    typeof (value as { msg: unknown }).msg === 'string' &&
    'loc' in value &&
    Array.isArray((value as { loc: unknown }).loc)
  )
}

function fieldNameFromLoc(loc: (string | number)[]): string {
  // loc is typically ["body", "field_name"] — drop the "body"/"query"/"path" prefix.
  const [, ...rest] = loc
  return (rest.length > 0 ? rest : loc).join('.')
}

async function parseErrorResponse(response: Response): Promise<ApiError> {
  let body: unknown
  try {
    body = await response.json()
  } catch {
    return new ApiError(response.status, response.statusText || 'Request failed')
  }

  const detail = body && typeof body === 'object' && 'detail' in body ? (body as { detail: unknown }).detail : undefined

  if (typeof detail === 'string') {
    return new ApiError(response.status, detail)
  }

  if (Array.isArray(detail) && detail.every(isValidationIssue)) {
    const fieldErrors = detail.map((issue) => ({ field: fieldNameFromLoc(issue.loc), message: issue.msg }))
    const message = fieldErrors.map((e) => `${e.field}: ${e.message}`).join('; ')
    return new ApiError(response.status, message || 'Validation failed', fieldErrors)
  }

  return new ApiError(response.status, response.statusText || 'Request failed')
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    window.dispatchEvent(new Event('auth:unauthorized'))
  }

  if (!response.ok) {
    throw await parseErrorResponse(response)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

function authHeaders(): HeadersInit {
  const token = getStoredToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function safeFetch(input: string, init: RequestInit): Promise<Response> {
  try {
    return await fetch(input, init)
  } catch (cause) {
    throw new NetworkError(cause)
  }
}

interface RequestOptions {
  method?: string
  body?: unknown
  auth?: boolean
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = true } = options

  const response = await safeFetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth ? authHeaders() : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  return handleResponse<T>(response)
}

// The backend's /auth/login uses OAuth2PasswordRequestForm, which requires a
// form-encoded body rather than JSON.
export async function requestForm<T>(path: string, form: Record<string, string>): Promise<T> {
  const response = await safeFetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(form),
  })

  return handleResponse<T>(response)
}
