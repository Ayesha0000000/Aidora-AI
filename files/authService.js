import api from './api'

/**
 * authService — wraps all authentication-related API calls.
 *
 * Expected backend endpoints:
 *   POST /api/auth/login   → { user, token }
 *   POST /api/auth/signup  → { user, token }
 *   POST /api/auth/logout  → 200 OK
 *   GET  /api/auth/me      → { user }
 */
export const authService = {
  /**
   * Login with email and password.
   * Returns { user, token }.
   */
  async login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    return data
  },

  /**
   * Register a new user.
   * Returns { user, token }.
   */
  async signup(name, email, password) {
    const { data } = await api.post('/auth/signup', { name, email, password })
    return data
  },

  /**
   * Logout — invalidates server-side session.
   */
  async logout() {
    await api.post('/auth/logout').catch(() => { /* fire and forget */ })
  },

  /**
   * Get the current authenticated user.
   * Useful for session refresh on load.
   */
  async me() {
    const { data } = await api.get('/auth/me')
    return data
  },
}
