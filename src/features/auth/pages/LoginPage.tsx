import AuthBrandPanel from '../components/AuthBrandPanel'
import LoginForm from '../components/LoginForm'
import BigConnectLogo from '../components/BigConnectLogo'

function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
      {/* Brand panel — hidden on mobile, shown on desktop */}
      <AuthBrandPanel />

      {/* Login form section */}
      <section className="flex flex-col items-center justify-center px-6 py-10 lg:px-12">
        {/* Mobile-only brand header */}
        <div className="mb-8 flex flex-col items-center lg:hidden">
          <BigConnectLogo variant="full" color="dark" className="h-8 w-auto" />
          <p className="mt-2 text-sm text-slate-500">Admin Portal</p>
        </div>

        <LoginForm />
      </section>
    </main>
  )
}

export default LoginPage
