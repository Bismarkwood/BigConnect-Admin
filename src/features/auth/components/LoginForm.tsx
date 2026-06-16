import { useState, useCallback } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ForgotPasswordModal from './ForgotPasswordModal'
import Toast, { type ToastMessage } from './Toast'

interface FormErrors {
  email?: string
  password?: string
}

function LoginForm() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const [sessionMessage] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    const msg = params.get('message')
    if (msg === 'session_expired') {
      return 'Your session has expired. Please sign in again.'
    } else if (msg === 'logged_out') {
      return 'You have been logged out successfully.'
    } else if (msg === 'password_updated') {
      return 'Password updated. Please sign in again.'
    }
    return ''
  })

  const addToast = useCallback((type: ToastMessage['type'], text: string) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { id, type, text }])
  }, [])

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Detect Caps Lock
  const handleKeyEvent = (e: React.KeyboardEvent) => {
    if (e.getModifierState) {
      setCapsLockOn(e.getModifierState('CapsLock'))
    }
  }

  // Email validation check (for green check icon)
  const isEmailValid = email.trim() !== '' && /\S+@\S+\.\S+/.test(email)
  const isPasswordValid = password.length >= 8

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!email.trim()) {
      newErrors.email = 'Email address is required.'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email address.'
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    // Simulate login — replace with real API call later
    setTimeout(() => {
      setLoading(false)
      addToast('success', 'Signed in successfully.')
      setTimeout(() => navigate('/dashboard'), 400)
    }, 900)
  }

  return (
    <div className="w-full max-w-md">
      <Toast toasts={toasts} onDismiss={dismissToast} />

      {/* Session message */}
      {sessionMessage && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          <AlertTriangle className="h-4 w-4 shrink-0" strokeWidth={1.5} />
          {sessionMessage}
        </div>
      )}

      {/* Header */}
      <div className="mb-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
          <LockKeyhole className="h-6 w-6" strokeWidth={1.5} />
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
          Welcome back
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Sign in to continue managing your BigConnect AI workspace.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email field */}
        <div>
          <div
            className={`group relative flex h-14 items-center rounded-xl border bg-white px-4 transition-all duration-200 hover:border-blue-300 focus-within:border-blue-600 focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] ${
              errors.email
                ? 'border-red-400 focus-within:border-red-400 focus-within:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
                : isEmailValid
                  ? 'border-emerald-300'
                  : 'border-slate-200'
            }`}
          >
            <Mail className="mr-3 h-[18px] w-[18px] shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600" strokeWidth={1.5} />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
              }}
              placeholder="Email Address"
              className="h-full w-full flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {isEmailValid && !errors.email && (
              <CheckCircle2 className="ml-2 h-[18px] w-[18px] shrink-0 text-emerald-500" strokeWidth={1.5} />
            )}
          </div>

          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
              <span className="inline-block h-1 w-1 rounded-full bg-red-500" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password field */}
        <div>
          <div
            className={`group relative flex h-14 items-center rounded-xl border bg-white px-4 transition-all duration-200 hover:border-blue-300 focus-within:border-blue-600 focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] ${
              errors.password
                ? 'border-red-400 focus-within:border-red-400 focus-within:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]'
                : isPasswordValid
                  ? 'border-emerald-300'
                  : 'border-slate-200'
            }`}
          >
            <LockKeyhole className="mr-3 h-[18px] w-[18px] shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600" strokeWidth={1.5} />
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
              }}
              onKeyUp={handleKeyEvent}
              onKeyDown={handleKeyEvent}
              placeholder="Password"
              className="h-full w-full flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              aria-describedby={errors.password ? 'password-error' : undefined}
              aria-invalid={!!errors.password}
            />
            {isPasswordValid && !errors.password && (
              <CheckCircle2 className="ml-2 h-[18px] w-[18px] shrink-0 text-emerald-500" strokeWidth={1.5} />
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-700"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-[18px] w-[18px]" strokeWidth={1.5} />
              ) : (
                <Eye className="h-[18px] w-[18px]" strokeWidth={1.5} />
              )}
            </button>
          </div>

          {/* Caps Lock warning */}
          {capsLockOn && (
            <p className="mt-1.5 flex items-center gap-1 text-xs text-amber-600">
              <AlertTriangle className="h-3 w-3" strokeWidth={1.5} />
              Caps Lock is on
            </p>
          )}

          {/* Password hint */}
          {password.length > 0 && password.length < 8 && !errors.password && (
            <p className="mt-1.5 text-xs text-slate-400">
              Minimum 8 characters
            </p>
          )}

          {errors.password && (
            <p id="password-error" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
              <span className="inline-block h-1 w-1 rounded-full bg-red-500" />
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember this device & Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 accent-blue-600"
            />
            Remember this device
          </label>

          <button
            type="button"
            onClick={() => setForgotPasswordOpen(true)}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" strokeWidth={1.5} />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <ForgotPasswordModal
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        onToast={addToast}
      />
    </div>
  )
}

export default LoginForm
