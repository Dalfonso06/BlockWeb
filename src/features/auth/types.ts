export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterPayload {
  email: string
  username: string
  password: string
  first_name?: string
  last_name?: string
}
