const API_URL = import.meta.env.VITE_API_URL

const AUTH_TOKEN_KEY = 'block.auth.token'

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function setStoredToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function clearStoredToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export class ApiError extends Error {
  status: number

  constructor(status: number, detail: string) {
    super(detail)
    this.name = 'ApiError'
    this.status = status
  }
}

async function parseErrorDetail(response: Response): Promise<string> {
  try {
    const body: unknown = await response.json()
    if (body && typeof body === 'object' && 'detail' in body && typeof body.detail === 'string') {
      return body.detail
    }
  } catch {
    // response body wasn't JSON — fall through to the status text below
  }
  return response.statusText || 'Request failed'
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    window.dispatchEvent(new Event('auth:unauthorized'))
  }

  if (!response.ok) {
    throw new ApiError(response.status, await parseErrorDetail(response))
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

interface RequestOptions {
  method?: string
  body?: unknown
  auth?: boolean
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = true } = options

  const response = await fetch(`${API_URL}${path}`, {
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
  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(form),
  })

  return handleResponse<T>(response)
}
