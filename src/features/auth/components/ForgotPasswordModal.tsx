import { useState, useEffect, useCallback } from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  X,
} from 'lucide-react'

interface ForgotPasswordModalProps {
  open: boolean
  onClose: () => void
  onToast?: (type: 'success' | 'error' | 'info', text: string) => void
}

type Step = 'email' | 'pin' | 'password' | 'success'

function ForgotPasswordModal({ open, onClose, onToast }: ForgotPasswordModalProps) {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendCountdown, setResendCountdown] = useState(0)

  // Resend countdown timer
  useEffect(() => {
    if (resendCountdown <= 0) return
    const timer = setTimeout(() => setResendCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendCountdown])

  const resetModal = useCallback(() => {
    setStep('email')
    setEmail('')
    setPin(['', '', '', '', '', ''])
    setNewPassword('')
    setConfirmPassword('')
    setError('')
    setLoading(false)
    setResendCountdown(0)
    onClose()
  }, [onClose])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') resetModal()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [open, resetModal])

  if (!open) return null

  const handleEmailSubmit = () => {
    setError('')

    if (!email.trim()) {
      setError('Email address is required.')
      return
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Enter a valid email address.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setStep('pin')
      setResendCountdown(45)
      onToast?.('success', 'Reset PIN sent successfully.')
    }, 900)
  }

  const handlePinChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return

    const newPin = [...pin]
    newPin[index] = value.slice(-1)
    setPin(newPin)

    if (value) {
      const nextInput = document.getElementById(`pin-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handlePinKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handlePinPaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length > 0) {
      e.preventDefault()
      const newPin = [...pin]
      for (let i = 0; i < 6; i++) {
        newPin[i] = pasted[i] || ''
      }
      setPin(newPin)
      const lastIndex = Math.min(pasted.length, 5)
      const lastInput = document.getElementById(`pin-${lastIndex}`)
      if (lastInput) lastInput.focus()
    }
  }

  const handleVerifyPin = () => {
    setError('')

    const enteredPin = pin.join('')

    if (enteredPin.length < 6) {
      setError('Enter the 6-digit PIN sent to your email.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setStep('password')
    }, 900)
  }

  const handleResendPin = () => {
    if (resendCountdown > 0) return
    setResendCountdown(45)
    onToast?.('success', 'Reset PIN resent successfully.')
  }

  const handleResetPassword = () => {
    setError('')

    if (!newPassword.trim()) {
      setError('New password is required.')
      return
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setStep('success')
      onToast?.('success', 'Password reset successful.')
    }, 900)
  }

  const goBack = () => {
    setError('')
    if (step === 'pin') setStep('email')
    if (step === 'password') setStep('pin')
  }

  const handleChangeEmail = () => {
    setError('')
    setPin(['', '', '', '', '', ''])
    setStep('email')
  }

  const stepNumber =
    step === 'email' ? 1 : step === 'pin' ? 2 : step === 'password' ? 3 : 4

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 px-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
    >
      <div className="absolute inset-0 bg-slate-950/10" onClick={resetModal} />

      <div className="relative w-full max-w-md rounded-3xl border border-white/70 bg-white/90 p-6 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
        {/* Back button (top) */}
        {(step === 'pin' || step === 'password') && (
          <button
            type="button"
            onClick={goBack}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        )}

        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
              {step === 'email' && <Mail className="h-6 w-6" />}
              {step === 'pin' && <ShieldCheck className="h-6 w-6" />}
              {step === 'password' && <LockKeyhole className="h-6 w-6" />}
              {step === 'success' && <CheckCircle2 className="h-6 w-6" />}
            </div>

            <h3 id="forgot-password-title" className="text-2xl font-semibold text-slate-900">
              {step === 'email' && 'Forgot password?'}
              {step === 'pin' && 'Enter verification PIN'}
              {step === 'password' && 'Create new password'}
              {step === 'success' && 'Password reset successful'}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {step === 'email' &&
                "Enter your email address and we'll send you a reset PIN."}
              {step === 'pin' &&
                `We sent a 6-digit PIN to ${email}. Enter it below to continue.`}
              {step === 'password' &&
                'Set a new secure password for your admin account.'}
              {step === 'success' &&
                'Your password has been updated. You can now sign in with your new password.'}
            </p>
          </div>

          <button
            type="button"
            onClick={resetModal}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step indicator */}
        {step !== 'success' && (
          <div className="mb-6 flex items-center gap-2">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  item <= stepNumber ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div role="alert" className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Step 1: Email */}
        {step === 'email' && (
          <div className="space-y-5">
            <div className="group flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition-all duration-200 hover:border-blue-300 focus-within:border-blue-600 focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.08)]">
              <Mail className="mr-3 h-[18px] w-[18px] shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="h-full w-full flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                autoFocus
              />
            </div>

            <button
              type="button"
              onClick={handleEmailSubmit}
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending PIN...
                </>
              ) : (
                'Send Reset PIN'
              )}
            </button>
          </div>
        )}

        {/* Step 2: PIN */}
        {step === 'pin' && (
          <div className="space-y-5">
            <div className="flex justify-between gap-2" onPaste={handlePinPaste}>
              {pin.map((digit, index) => (
                <input
                  key={index}
                  id={`pin-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(e.target.value, index)}
                  onKeyDown={(e) => handlePinKeyDown(e, index)}
                  className="h-14 w-12 rounded-xl border border-slate-200 bg-white text-center text-lg font-semibold text-slate-900 outline-none transition-all duration-200 focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)]"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleVerifyPin}
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify PIN'
              )}
            </button>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleResendPin}
                disabled={resendCountdown > 0}
                className="text-sm font-medium text-slate-600 transition hover:text-blue-600 disabled:cursor-not-allowed disabled:text-slate-300"
              >
                {resendCountdown > 0
                  ? `Resend PIN in ${resendCountdown}s`
                  : 'Resend PIN'}
              </button>

              <button
                type="button"
                onClick={handleChangeEmail}
                className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
              >
                Change email
              </button>
            </div>
          </div>
        )}

        {/* Step 3: New Password */}
        {step === 'password' && (
          <div className="space-y-5">
            <div className="group flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition-all duration-200 hover:border-blue-300 focus-within:border-blue-600 focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.08)]">
              <LockKeyhole className="mr-3 h-[18px] w-[18px] shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600" />
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="h-full w-full flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-700"
                aria-label={showNewPassword ? 'Hide password' : 'Show password'}
              >
                {showNewPassword ? (
                  <EyeOff className="h-[18px] w-[18px]" />
                ) : (
                  <Eye className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>

            {newPassword.length > 0 && newPassword.length < 8 && (
              <p className="text-xs text-slate-400">Minimum 8 characters</p>
            )}

            <div className="group flex h-14 items-center rounded-xl border border-slate-200 bg-white px-4 transition-all duration-200 hover:border-blue-300 focus-within:border-blue-600 focus-within:shadow-[0_0_0_3px_rgba(37,99,235,0.08)]">
              <LockKeyhole className="mr-3 h-[18px] w-[18px] shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-blue-600" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="h-full w-full flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-700"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-[18px] w-[18px]" />
                ) : (
                  <Eye className="h-[18px] w-[18px]" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating password...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <div className="space-y-5">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-4 text-sm leading-6 text-emerald-700">
              Your password has been reset successfully. Return to the login
              screen and sign in with your new password.
            </div>

            <button
              type="button"
              onClick={resetModal}
              className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPasswordModal
