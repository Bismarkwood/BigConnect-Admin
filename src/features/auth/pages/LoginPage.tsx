import AuthBrandPanel from '../components/AuthBrandPanel'
import LoginForm from '../components/LoginForm'

function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
      <AuthBrandPanel />
      <section className="flex items-center justify-center px-6 py-10">
        <LoginForm />
      </section>
    </main>
  )
}

export default LoginPage
