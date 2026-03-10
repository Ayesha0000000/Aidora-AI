import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Sparkles, Mail, Lock, User, AlertCircle } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { authService } from '../../services/authService'
import { useForm } from '../../hooks/useForm'
import Loader from '../common/Loader'

/** ── Field-level validators ─────────────────────── */
const validateLogin = (v) => ({
  email: !v.email ? 'Email is required' : !/\S+@\S+\.\S+/.test(v.email) ? 'Invalid email address' : '',
  password: !v.password ? 'Password is required' : v.password.length < 6 ? 'Minimum 6 characters' : '',
})

const validateSignup = (v) => ({
  name: !v.name ? 'Name is required' : v.name.trim().length < 2 ? 'Name too short' : '',
  email: !v.email ? 'Email is required' : !/\S+@\S+\.\S+/.test(v.email) ? 'Invalid email address' : '',
  password: !v.password ? 'Password is required' : v.password.length < 6 ? 'Minimum 6 characters' : '',
  confirm: !v.confirm ? 'Please confirm your password' : v.confirm !== v.password ? 'Passwords do not match' : '',
})

/** ── Shared input component ─────────────────────── */
function InputField({ icon: Icon, label, error, touched, ...props }) {
  const [show, setShow] = useState(false)
  const isPassword = props.type === 'password'
  const hasError = touched && error

  return (
    <div className="space-y-1.5">
      {label && <label className="block text-xs font-dm font-medium text-silver uppercase tracking-wide">{label}</label>}
      <div className={`
        relative flex items-center rounded-xl border bg-ink transition-all duration-200
        ${hasError ? 'border-ember/60' : 'border-border focus-within:border-accent/60'}
      `}>
        <Icon size={15} className="absolute left-3.5 text-ghost flex-shrink-0" />
        <input
          {...props}
          type={isPassword && show ? 'text' : props.type}
          className="
            w-full bg-transparent pl-10 pr-10 py-3 text-sm text-white placeholder-ghost
            outline-none font-dm rounded-xl
          "
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            className="absolute right-3 text-ghost hover:text-silver transition-colors"
            tabIndex={-1}
          >
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
      {hasError && (
        <p className="flex items-center gap-1.5 text-xs text-ember font-dm animate-fade-in">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
}

/** ─── LOGIN FORM ─────────────────────────────────── */
export function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = location.state?.from?.pathname ?? '/chat'
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { email: '', password: '' },
    validateLogin
  )

  const onSubmit = handleSubmit(async (vals) => {
    setLoading(true)
    setServerError('')
    try {
      const data = await authService.login(vals.email, vals.password)
      login(data.user, data.token)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      // Mock login: accept any valid-looking email/password in dev
      if (import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_URL) {
        const mockUser = { id: '1', name: vals.email.split('@')[0], email: vals.email }
        login(mockUser, 'mock-token')
        navigate(redirectTo, { replace: true })
        return
      }
      setServerError(err.response?.data?.message ?? 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  })

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {serverError && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-ember-dim border border-ember/20 text-ember text-sm font-dm animate-fade-in">
          <AlertCircle size={15} />
          {serverError}
        </div>
      )}
      <InputField
        icon={Mail} label="Email" type="email" name="email"
        placeholder="you@example.com" value={values.email}
        onChange={handleChange} onBlur={handleBlur}
        error={errors.email} touched={touched.email}
        autoComplete="email"
      />
      <InputField
        icon={Lock} label="Password" type="password" name="password"
        placeholder="••••••••" value={values.password}
        onChange={handleChange} onBlur={handleBlur}
        error={errors.password} touched={touched.password}
        autoComplete="current-password"
      />

      <div className="flex justify-end">
        <button type="button" className="text-xs text-accent hover:text-accent-light font-dm transition-colors">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          w-full flex items-center justify-center gap-2 py-3 rounded-xl
          bg-accent hover:bg-accent-light text-white text-sm font-dm font-medium
          transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/40
          hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
        "
      >
        {loading ? <Loader size="sm" /> : null}
        {loading ? 'Signing in…' : 'Sign in'}
      </button>

      <p className="text-center text-sm font-dm text-silver">
        Don't have an account?{' '}
        <Link to="/signup" className="text-accent hover:text-accent-light transition-colors font-medium">
          Create one
        </Link>
      </p>
    </form>
  )
}

/** ─── SIGNUP FORM ────────────────────────────────── */
export function SignupForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { name: '', email: '', password: '', confirm: '' },
    validateSignup
  )

  const onSubmit = handleSubmit(async (vals) => {
    setLoading(true)
    setServerError('')
    try {
      const data = await authService.signup(vals.name, vals.email, vals.password)
      login(data.user, data.token)
      navigate('/chat', { replace: true })
    } catch (err) {
      // Mock signup in dev
      if (import.meta.env.VITE_USE_MOCK === 'true' || !import.meta.env.VITE_API_URL) {
        const mockUser = { id: '1', name: vals.name, email: vals.email }
        login(mockUser, 'mock-token')
        navigate('/chat', { replace: true })
        return
      }
      setServerError(err.response?.data?.message ?? 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  })

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {serverError && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-ember-dim border border-ember/20 text-ember text-sm font-dm animate-fade-in">
          <AlertCircle size={15} />
          {serverError}
        </div>
      )}
      <InputField
        icon={User} label="Full Name" type="text" name="name"
        placeholder="Jane Doe" value={values.name}
        onChange={handleChange} onBlur={handleBlur}
        error={errors.name} touched={touched.name}
        autoComplete="name"
      />
      <InputField
        icon={Mail} label="Email" type="email" name="email"
        placeholder="you@example.com" value={values.email}
        onChange={handleChange} onBlur={handleBlur}
        error={errors.email} touched={touched.email}
        autoComplete="email"
      />
      <InputField
        icon={Lock} label="Password" type="password" name="password"
        placeholder="Min. 6 characters" value={values.password}
        onChange={handleChange} onBlur={handleBlur}
        error={errors.password} touched={touched.password}
        autoComplete="new-password"
      />
      <InputField
        icon={Lock} label="Confirm Password" type="password" name="confirm"
        placeholder="Repeat password" value={values.confirm}
        onChange={handleChange} onBlur={handleBlur}
        error={errors.confirm} touched={touched.confirm}
        autoComplete="new-password"
      />

      <button
        type="submit"
        disabled={loading}
        className="
          w-full flex items-center justify-center gap-2 py-3 rounded-xl
          bg-accent hover:bg-accent-light text-white text-sm font-dm font-medium
          transition-all duration-200 shadow-lg shadow-accent/20 hover:shadow-accent/40
          hover:-translate-y-px disabled:opacity-60 disabled:cursor-not-allowed
        "
      >
        {loading ? <Loader size="sm" /> : null}
        {loading ? 'Creating account…' : 'Create account'}
      </button>

      <p className="text-center text-sm font-dm text-silver">
        Already have an account?{' '}
        <Link to="/login" className="text-accent hover:text-accent-light transition-colors font-medium">
          Sign in
        </Link>
      </p>
    </form>
  )
}
