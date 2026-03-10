import axios from 'axios'

/**
 * Base Axios instance.
 * Set VITE_API_URL in your .env file, e.g.: VITE_API_URL=https://api.aidora.ai
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
})

// Attach auth token from localStorage on every request
api.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem('aidora_user') ?? '{}')
    if (user?.token) config.headers.Authorization = `Bearer ${user.token}`
  } catch { /* no-op */ }
  return config
})

// Global response error handler
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Clear stale auth and redirect
      localStorage.removeItem('aidora_user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
