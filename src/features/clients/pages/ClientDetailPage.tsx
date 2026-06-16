import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Mail,
  Phone,
  Globe,
  MapPin,
  Bot,
  Radio,
  MessageSquare,
  Ticket,
  BarChart3,
  CheckCircle2,
  Circle,
  UserCog,
} from 'lucide-react'
import { mockClients } from '../data/mockClients'

const onboardingChecklist = [
  { label: 'Client Created', completed: true },
  { label: 'Package Assigned', completed: true },
  { label: 'Payment Confirmed', completed: true },
  { label: 'AI Agent Created', completed: true },
  { label: 'Knowledge Base Uploaded', completed: true },
  { label: 'Channel Connected', completed: false },
  { label: 'Test Completed', completed: false },
  { label: 'Go-Live Approved', completed: false },
]

function ClientDetailPage() {
  const { clientId } = useParams()
  const navigate = useNavigate()
  const client = mockClients.find((c) => c.id === clientId)

  if (!client) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-slate-500">Client not found</p>
        <button onClick={() => navigate('/clients')} className="mt-3 text-sm font-medium text-blue-600 hover:underline">
          Back to Clients
        </button>
      </div>
    )
  }

  const completedSteps = onboardingChecklist.filter((s) => s.completed).length
  const progress = Math.round((completedSteps / onboardingChecklist.length) * 100)

  return (
    <div className="space-y-6">
      {/* Back button + header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/clients')}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
        </button>
        <div>
          <h1 className="text-[22px] font-bold text-slate-900">{client.businessName}</h1>
          <p className="text-[13px] text-slate-500">{client.id} · {client.industry}</p>
        </div>
      </div>

      {/* Client overview grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl font-bold text-blue-600">
              {client.businessName.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">{client.businessName}</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {client.status}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 text-[13px]">
              <Mail className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
              <span className="text-slate-600">{client.email}</span>
            </div>
            <div className="flex items-center gap-3 text-[13px]">
              <Phone className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
              <span className="text-slate-600">{client.phone}</span>
            </div>
            {client.website && (
              <div className="flex items-center gap-3 text-[13px]">
                <Globe className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
                <span className="text-blue-600">{client.website}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-[13px]">
              <MapPin className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
              <span className="text-slate-600">{client.city}, {client.country}</span>
            </div>
            <div className="flex items-center gap-3 text-[13px]">
              <UserCog className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
              <span className="text-slate-600">{client.accountManager}</span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
              <Bot className="h-5 w-5 text-violet-600" strokeWidth={1.5} />
              <p className="mt-2 text-2xl font-bold text-slate-900">{client.aiAgentsCount}</p>
              <p className="text-[11px] text-slate-500">AI Agents</p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
              <Radio className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
              <p className="mt-2 text-2xl font-bold text-slate-900">{client.channelsCount}</p>
              <p className="text-[11px] text-slate-500">Channels</p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
              <MessageSquare className="h-5 w-5 text-amber-600" strokeWidth={1.5} />
              <p className="mt-2 text-2xl font-bold text-slate-900">142</p>
              <p className="text-[11px] text-slate-500">Conversations</p>
            </div>
            <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
              <Ticket className="h-5 w-5 text-red-600" strokeWidth={1.5} />
              <p className="mt-2 text-2xl font-bold text-slate-900">3</p>
              <p className="text-[11px] text-slate-500">Open Tickets</p>
            </div>
          </div>

          {/* Usage */}
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" strokeWidth={1.5} />
                <p className="text-[13px] font-semibold text-slate-900">Usage</p>
              </div>
              <span className="text-[11px] font-medium text-slate-400">72%</span>
            </div>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-blue-600" style={{ width: '72%' }} />
            </div>
            <p className="mt-2 text-[11px] text-slate-400">4,200 / 6,000 API calls used this month</p>
          </div>
        </div>

        {/* Subscription + Payment */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200/70 bg-white p-5">
            <p className="text-[13px] font-semibold text-slate-900">Subscription</p>
            <div className="mt-3 space-y-2.5">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500">Plan</span>
                <span className="font-medium text-slate-900">{client.package}</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500">Billing</span>
                <span className="font-medium text-slate-900">Monthly</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500">Next billing</span>
                <span className="font-medium text-slate-900">Jul 15, 2026</span>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-slate-500">Amount</span>
                <span className="font-semibold text-slate-900">GHS 2,500/mo</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/70 bg-white p-5">
            <p className="text-[13px] font-semibold text-slate-900">Payment Status</p>
            <div className="mt-3 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium ${
                client.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' :
                client.paymentStatus === 'Pending' ? 'bg-amber-50 text-amber-700' :
                'bg-red-50 text-red-700'
              }`}>
                {client.paymentStatus}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">Last payment: Jun 1, 2026</p>
          </div>
        </div>
      </div>

      {/* Onboarding Progress */}
      <div className="rounded-2xl border border-slate-200/70 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] font-semibold text-slate-900">Onboarding Progress</p>
            <p className="mt-0.5 text-[13px] text-slate-500">Setup completion: {progress}%</p>
          </div>
          <span className="text-sm font-bold text-blue-600">{completedSteps}/{onboardingChecklist.length}</span>
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {onboardingChecklist.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              {item.completed ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" strokeWidth={1.5} />
              ) : (
                <Circle className="h-4 w-4 text-slate-300" strokeWidth={1.5} />
              )}
              <span className={`text-[12px] ${item.completed ? 'text-slate-700' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ClientDetailPage
