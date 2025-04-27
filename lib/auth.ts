// This is a mock authentication service
// In a real application, this would connect to a backend API

export interface AuthCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  user?: {
    id: string
    username: string
    name: string
    email: string
  }
}

export async function authenticateUser(credentials: AuthCredentials): Promise<AuthResponse> {
  // Simulate network request
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Simple validation
  if (!credentials.username || !credentials.password) {
    return {
      success: false,
      message: "Username and password are required",
    }
  }

  if (credentials.password.length < 8) {
    return {
      success: false,
      message: "Password must be at least 8 characters",
    }
  }

  // In a real app, you would validate against a backend
  // This is just a mock successful response
  return {
    success: true,
    user: {
      id: "1",
      username: credentials.username,
      name: "GitHub User",
      email: `${credentials.username}@example.com`,
    },
  }
}

export async function authenticateWithGitHub(): Promise<AuthResponse> {
  // Simulate OAuth flow
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock successful response
  return {
    success: true,
    user: {
      id: "github-123",
      username: "github-user",
      name: "GitHub OAuth User",
      email: "oauth-user@example.com",
    },
  }
}
