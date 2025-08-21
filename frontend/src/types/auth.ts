export type AuthMethod = 'phone' | 'email' | 'admin'
export type AuthStep = 'method' | 'login' | 'verification' | 'authenticated'

export interface AuthState {
  step: AuthStep
  method: AuthMethod | null
  credential: string // phone number or email
  accessToken: string
}

export interface AuthContextType {
  authState: AuthState
  setAuthMethod: (method: AuthMethod) => void
  setCredential: (credential: string) => void
  setAccessToken: (token: string) => void
  setStep: (step: AuthStep) => void
  reset: () => void
}
