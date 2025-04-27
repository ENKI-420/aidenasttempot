export interface User {
  id: string
  username: string
  name: string
  email: string
}

export interface LoginFormData {
  username: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
