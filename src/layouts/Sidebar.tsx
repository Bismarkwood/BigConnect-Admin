import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Bot,
  MessageSquare,
  Ticket,
  BarChart3,
  CreditCard,
  Wallet,
  FileText,
  UserCog,
  Settings,
} from 'lucide-react'
import BigConnectLogo from '../features/auth/components/BigConnectLogo'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Operations',
    items: [
      { name: 'Clients', path: '/clients', icon: Users },
      { name: 'AI Agents', path: '/ai-agents', icon: Bot },
    ],
  },
  {
    label: 'Engagement',
    items: [
      { name: 'Conversations', path: '/conversations', icon: MessageSquare },
      { name: 'Tickets', path: '/tickets', icon: Ticket },
    ],
  },
  {
    label: 'Business',
    items: [
      { name: 'Usage', path: '/usage', icon: BarChart3 },
      { name: 'Subscriptions', path: '/subscriptions', icon: CreditCard },
      { name: 'Finance', path: '/finance', icon: Wallet },
      { name: 'Reports', path: '/reports', icon: FileText },
    ],
  },
  {
    label: 'Admin',
    items: [
      { name: 'Team', path: '/team', icon: UserCog },
      { name: 'Settings', path: '/settings', icon: Settings },
    ],
  },
]

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden lg:flex w-[260px] flex-col bg-[#0a2463]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <BigConnectLogo variant="icon" color="light" className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">BigConnect AI</p>
          <p className="text-[10px] text-blue-300/70">Admin Console</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-blue-300/50">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path

                return (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-150 ${
                        isActive
                          ? 'bg-white text-[#0B2F6B] shadow-sm'
                          : 'text-blue-100/70 hover:bg-white/8 hover:text-white'
                      }`}
                    >
                      <Icon
                        className={`h-[18px] w-[18px] ${
                          isActive ? 'text-blue-600' : 'text-blue-300/60'
                        }`}
                        strokeWidth={1.5}
                      />
                      {item.name}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

    </aside>
  )
}

export default Sidebar
