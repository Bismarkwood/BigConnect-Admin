// Auth feature types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'viewer'
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}
