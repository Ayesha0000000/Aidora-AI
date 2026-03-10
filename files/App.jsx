import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'
import ProtectedRoute from './components/common/ProtectedRoute'

// Pages
import LandingPage  from './pages/LandingPage'
import LoginPage    from './pages/LoginPage'
import SignupPage   from './pages/SignupPage'
import ChatPage     from './pages/ChatPage'
import NotFoundPage from './pages/NotFoundPage'

/**
 * App — root component.
 * Sets up React Router and wraps the tree with global context providers.
 *
 * Route map:
 *   /          → Landing page (public)
 *   /login     → Login page  (public)
 *   /signup    → Signup page (public)
 *   /chat      → Chat interface (protected — requires auth)
 *   *          → 404
 */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/"       element={<LandingPage />} />
            <Route path="/login"  element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected routes */}
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*"    element={<Navigate to="/404" replace />} />
          </Routes>
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
