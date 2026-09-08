import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import { clearStoredToken, getStoredToken, setStoredToken } from '@/api/client'
import type { User } from '@/types/models'
import * as authApi from './api'
import type { LoginCredentials, RegisterPayload } from './types'

export interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

// The backend has no /auth/me endpoint — login only returns a token, so the
// user id is read from the JWT's `sub` claim (not verified client-side; the
// backend is the source of truth for validity) and the profile is fetched
// separately via GET /users/{id}.
function decodeUserId(token: string): number | null {
  try {
    const [, payload] = token.split('.')
    const decoded: unknown = JSON.parse(atob(payload))
    if (decoded && typeof decoded === 'object' && 'sub' in decoded) {
      const sub = (decoded as { sub: unknown }).sub
      const id = Number(sub)
      return Number.isFinite(id) ? id : null
    }
    return null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    clearStoredToken()
    setUser(null)
  }, [])

  useEffect(() => {
    const token = getStoredToken()
    const userId = token ? decodeUserId(token) : null

    if (!userId) {
      setIsLoading(false)
      return
    }

    authApi
      .fetchUser(userId)
      .then(setUser)
      .catch(() => clearStoredToken())
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    window.addEventListener('auth:unauthorized', logout)
    return () => window.removeEventListener('auth:unauthorized', logout)
  }, [logout])

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { access_token } = await authApi.login(credentials)
    setStoredToken(access_token)

    const userId = decodeUserId(access_token)
    if (userId === null) {
      throw new Error('Received an invalid token from the server')
    }

    setUser(await authApi.fetchUser(userId))
  }, [])

  const register = useCallback(async (payload: RegisterPayload) => {
    await authApi.register(payload)
    await login({ username: payload.username, password: payload.password })
  }, [login])

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: user !== null, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
