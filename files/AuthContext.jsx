import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const AuthContext = createContext(null)

/**
 * AuthProvider — wraps the app and provides login/logout state + helpers.
 * In production, swap localStorage for HTTP-only cookie / secure token storage.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // hydrating from storage

  // Hydrate user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('aidora_user')
      if (stored) setUser(JSON.parse(stored))
    } catch {
      localStorage.removeItem('aidora_user')
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback((userData, token) => {
    const payload = { ...userData, token }
    localStorage.setItem('aidora_user', JSON.stringify(payload))
    setUser(payload)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('aidora_user')
    localStorage.removeItem('aidora_conversations')
    setUser(null)
  }, [])

  const value = { user, loading, login, logout, isAuthenticated: !!user }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
