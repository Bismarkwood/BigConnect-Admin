import { Bot, MessageSquareText, Users, CreditCard } from 'lucide-react'
import BigConnectLogo from './BigConnectLogo'

const features = [
  { title: 'AI Agents', icon: Bot },
  { title: 'Voice & WhatsApp', icon: MessageSquareText },
  { title: 'Client Management', icon: Users },
  { title: 'Usage & Payments', icon: CreditCard },
]

function AuthBrandPanel() {
  return (
    <section className="hidden lg:flex relative overflow-hidden bg-slate-950 text-white px-14 py-12 flex-col justify-between">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.4),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(37,99,235,0.2),_transparent_40%)]" />

      {/* Top section */}
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
          <span className="h-2 w-2 rounded-full bg-blue-400" />
          Admin Portal
        </div>

        <div className="mt-16 max-w-xl">
          <BigConnectLogo variant="full" color="light" className="h-10 w-auto" />
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Manage AI agents, clients, conversations, payments, and support
            channels from one intelligent admin platform.
          </p>
        </div>
      </div>

      {/* Feature cards */}
      <div className="relative z-10 grid grid-cols-2 gap-4">
        {features.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <Icon className="h-6 w-6 text-blue-300" strokeWidth={1.5} />
              <p className="mt-4 text-sm font-medium text-white">
                {item.title}
              </p>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <p className="relative z-10 text-sm text-slate-400">
        © 2026 BigConnect AI. Powered by BigData Ghana.
      </p>
    </section>
  )
}

export default AuthBrandPanel
