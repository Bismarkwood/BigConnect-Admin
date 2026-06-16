import {
  Users,
  Bot,
  MessageSquare,
  Wallet,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Calendar,
  Plus,
  Download,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'
import RevenueChart from '../components/RevenueChart'
import ActivityBarChart from '../components/ActivityBarChart'
import ResolutionGauge from '../components/ResolutionGauge'

const stats = [
  {
    title: 'Active Clients',
    value: '24',
    change: '+15.5%',
    trend: 'up',
    sub: 'vs. 20 last period',
    icon: Users,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
    border: 'border-l-blue-500',
  },
  {
    title: 'Live AI Agents',
    value: '18',
    change: '+8.4%',
    trend: 'up',
    sub: 'vs. 14 last period',
    icon: Bot,
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
    border: 'border-l-violet-500',
  },
  {
    title: 'Conversations',
    value: '2,832',
    change: '-10.5%',
    trend: 'down',
    sub: 'vs. 3,164 last period',
    icon: MessageSquare,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
    border: 'border-l-amber-500',
  },
  {
    title: 'Revenue',
    value: 'GHS 45.2K',
    change: '+4.4%',
    trend: 'up',
    sub: 'vs. GHS 43.3K last period',
    icon: Wallet,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
    border: 'border-l-emerald-500',
  },
]

const topClients = [
  { id: '#BC009', name: 'KFC Ghana', industry: 'Food & Beverage', agents: 3, revenue: 'GHS 4,200', status: 'Active' },
  { id: '#BC008', name: 'RightShop', industry: 'E-Commerce', agents: 2, revenue: 'GHS 3,850', status: 'Active' },
  { id: '#BC007', name: 'Bloom Advisors', industry: 'Finance', agents: 1, revenue: 'GHS 2,100', status: 'Setup' },
  { id: '#BC006', name: 'Caddyman Logistics', industry: 'Logistics', agents: 2, revenue: 'GHS 3,400', status: 'Active' },
  { id: '#BC005', name: 'Jumia Support', industry: 'E-Commerce', agents: 4, revenue: 'GHS 6,200', status: 'Active' },
]

const avatarColors = ['bg-blue-100 text-blue-700', 'bg-violet-100 text-violet-700', 'bg-amber-100 text-amber-700', 'bg-emerald-100 text-emerald-700', 'bg-rose-100 text-rose-700']

function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">Welcome back, here's your platform overview</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
            <Calendar className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
            Last 30 days
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.5} />
          </button>
          <button className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
            <Plus className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
            Add widget
          </button>
          <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-blue-700">
            <Download className="h-4 w-4" strokeWidth={1.5} />
            Export
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.title}
              className={`group rounded-2xl border border-slate-200/70 border-l-4 ${stat.border} bg-white p-5`}
            >
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium text-slate-500">{stat.title}</p>
                <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${stat.iconBg}`}>
                  <Icon className={`h-[18px] w-[18px] ${stat.iconColor}`} strokeWidth={1.5} />
                </div>
              </div>
              <p className="mt-3 text-[26px] font-bold tracking-tight text-slate-900 leading-none">{stat.value}</p>
              <div className="mt-2.5 flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${
                    stat.trend === 'up'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-red-50 text-red-500'
                  }`}
                >
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3" strokeWidth={2} />
                  ) : (
                    <TrendingDown className="h-3 w-3" strokeWidth={2} />
                  )}
                  {stat.change}
                </span>
                <span className="text-[11px] text-slate-400">{stat.sub}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue chart */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/70 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[13px] font-medium text-slate-500">Total Revenue</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">GHS 446.7K</p>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-600">
                  <TrendingUp className="h-3 w-3" strokeWidth={2} />
                  24.4%
                </span>
                <span className="text-[11px] text-slate-400">vs. last period</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-4 text-[11px]">
                <span className="flex items-center gap-1.5 text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-blue-500" /> This month
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-slate-300" /> Last month
                </span>
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-50 hover:text-slate-600">
                <MoreHorizontal className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <RevenueChart />
          </div>

          {/* Client breakdown */}
          <div className="mt-5 rounded-xl bg-slate-50/70 p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
                  <span className="text-[11px] text-slate-500">Enterprise</span>
                </div>
                <p className="mt-1.5 text-xl font-bold text-slate-900">15</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
                  <span className="text-[11px] text-slate-500">Growth</span>
                </div>
                <p className="mt-1.5 text-xl font-bold text-slate-900">6</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-amber-500" />
                  <span className="text-[11px] text-slate-500">Starter</span>
                </div>
                <p className="mt-1.5 text-xl font-bold text-slate-900">3</p>
              </div>
            </div>
            <div className="mt-3 flex h-2 w-full gap-1 overflow-hidden rounded-full">
              <div className="rounded-full bg-blue-500" style={{ width: '62%' }} />
              <div className="rounded-full bg-emerald-500" style={{ width: '25%' }} />
              <div className="rounded-full bg-amber-500" style={{ width: '13%' }} />
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Most Active Days */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-slate-900">Most Active Days</p>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-slate-900">8,162</span>
              <span className="text-[11px] text-slate-400">peak interactions</span>
            </div>
            <ActivityBarChart />
          </div>

          {/* Resolution Rate */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-semibold text-slate-900">Resolution Rate</p>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreHorizontal className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
            <ResolutionGauge />
            <button className="mt-1 w-full rounded-xl border border-slate-200 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50">
              Show details
            </button>
          </div>
        </div>
      </div>

      {/* Bottom grid: table + AI assistant */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Top Clients table */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/70 bg-white">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <p className="text-[15px] font-semibold text-slate-900">Top Clients</p>
            <button className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:underline">
              View all
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Client</th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Industry</th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Agents</th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Revenue</th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {topClients.map((client, i) => (
                  <tr key={client.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition">
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-bold ${avatarColors[i % avatarColors.length]}`}>
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[13px] font-medium text-slate-900">{client.name}</p>
                          <p className="text-[11px] text-slate-400">{client.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 text-[13px] text-slate-500">{client.industry}</td>
                    <td className="px-6 py-3.5 text-[13px] font-medium text-slate-700">{client.agents}</td>
                    <td className="px-6 py-3.5 text-[13px] font-semibold text-slate-900">{client.revenue}</td>
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                        client.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${client.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {client.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Assistant card */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-6">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20">
                  <Sparkles className="h-4 w-4 text-blue-300" strokeWidth={1.5} />
                </div>
                <p className="text-[13px] font-semibold text-white">AI Assistant</p>
              </div>
            </div>

            {/* Glowing orb */}
            <div className="my-8 flex justify-center">
              <div className="relative h-24 w-24">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 blur-md opacity-60 animate-pulse" />
                <div className="relative h-full w-full rounded-full bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700" />
              </div>
            </div>

            <p className="text-center text-xs text-slate-400">
              Ask me about clients, agents, or platform metrics
            </p>

            {/* Input */}
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-slate-500"
              />
              <button className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-500">
                <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
