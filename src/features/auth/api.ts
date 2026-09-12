import { request, requestForm } from '@/api/client'
import type { User } from '@/types/models'
import type { LoginCredentials, RegisterPayload } from './types'

interface TokenResponse {
  access_token: string
  token_type: string
}

export function login(credentials: LoginCredentials): Promise<TokenResponse> {
  return requestForm<TokenResponse>('/auth/login', { ...credentials })
}

export function register(payload: RegisterPayload): Promise<User> {
  return request<User>('/auth/register', { method: 'POST', body: payload, auth: false })
}
