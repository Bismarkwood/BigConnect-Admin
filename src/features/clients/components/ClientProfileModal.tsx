import { useState } from 'react'
import {
  X,
  Bot,
  Radio,
  MessageSquare,
  Ticket,
  BarChart3,
  Wallet,
  Pencil,
  Ban,
  Mail,
  Phone,
  Globe,
  MapPin,
  UserCog,
  Calendar,
  CheckCircle2,
  Circle,
  AlertCircle,
  Clock,
  BookOpen,
  Activity,
} from 'lucide-react'
import type { Client } from '../types'

interface ClientProfileModalProps {
  client: Client | null
  open: boolean
  onClose: () => void
}

type Tab = 'overview' | 'agents' | 'knowledge' | 'channels' | 'conversations' | 'tickets' | 'finance' | 'activity'

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'agents', label: 'AI Agents' },
  { id: 'knowledge', label: 'Knowledge Base' },
  { id: 'channels', label: 'Channels' },
  { id: 'conversations', label: 'Conversations' },
  { id: 'tickets', label: 'Tickets' },
  { id: 'finance', label: 'Usage & Finance' },
  { id: 'activity', label: 'Activity Log' },
]

const onboardingChecklist = [
  { label: 'Client Created', desc: 'Client profile was created in the BigConnect SaaS platform.', completed: true, date: 'Jun 1, 2026' },
  { label: 'Package Assigned', desc: 'Enterprise plan assigned to the client account.', completed: true, date: 'Jun 1, 2026' },
  { label: 'Payment Confirmed', desc: 'First payment received and confirmed.', completed: true, date: 'Jun 1, 2026' },
  { label: 'AI Agent Created', desc: 'AI assistant configured for the client.', completed: true, date: 'Jun 4, 2026' },
  { label: 'Knowledge Base Uploaded', desc: 'Training documents uploaded and processed.', completed: true, date: 'Jun 5, 2026' },
  { label: 'Channel Connected', desc: 'Connect WhatsApp, SMS, Voice, or Web Chat before go-live.', completed: false, date: '' },
  { label: 'Test Completed', desc: 'Run a test conversation to verify agent behavior.', completed: false, date: '' },
  { label: 'Go-Live Approved', desc: 'Final approval before making the agent live.', completed: false, date: '' },
]

const activityLog = [
  { action: 'David Mensah created client profile.', date: 'Jun 1, 2026 · 9:24 AM' },
  { action: 'Payment confirmed by Finance Admin.', date: 'Jun 1, 2026 · 10:15 AM' },
  { action: 'Enterprise plan assigned.', date: 'Jun 1, 2026 · 10:20 AM' },
  { action: 'AI agent "KFC Support Assistant" created.', date: 'Jun 4, 2026 · 2:30 PM' },
  { action: 'Knowledge base uploaded (3 documents).', date: 'Jun 5, 2026 · 11:05 AM' },
  { action: 'WhatsApp channel connection initiated.', date: 'Jun 7, 2026 · 3:45 PM' },
]

function ClientProfileModal({ client, open, onClose }: ClientProfileModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  if (!open || !client) return null

  const completedSteps = onboardingChecklist.filter((s) => s.completed).length
  const progress = Math.round((completedSteps / onboardingChecklist.length) * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
      <div className="relative flex h-[90vh] w-[90vw] max-w-[1400px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white">

        {/* Sticky Header */}
        <div className="flex-shrink-0 border-b border-slate-100 px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-lg font-bold text-blue-600">
                {client.businessName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-slate-900">{client.businessName}</h2>
                  <span className="text-[12px] text-slate-400">{client.id} · {client.industry} · {client.city}, {client.country}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{client.status}
                  </span>
                  <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-medium text-blue-700">{client.package}</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                    client.paymentStatus === 'Paid' ? 'bg-emerald-50 text-emerald-700' :
                    client.paymentStatus === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'
                  }`}>{client.paymentStatus}</span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">{progress}% Setup</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[12px] font-medium text-slate-600 transition hover:bg-slate-50">
                <Pencil className="h-3.5 w-3.5" strokeWidth={1.5} />Edit
              </button>
              <button className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-[12px] font-medium text-red-600 transition hover:bg-red-50">
                <Ban className="h-3.5 w-3.5" strokeWidth={1.5} />Suspend
              </button>
              <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Summary Strip */}
        <div className="flex-shrink-0 grid grid-cols-6 gap-4 border-b border-slate-100 px-8 py-4 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <Bot className="h-4 w-4 text-violet-600" strokeWidth={1.5} />
            <div>
              <p className="text-lg font-bold text-slate-900">{client.aiAgentsCount}</p>
              <p className="text-[10px] text-slate-500">AI Agents</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Radio className="h-4 w-4 text-blue-600" strokeWidth={1.5} />
            <div>
              <p className="text-lg font-bold text-slate-900">{client.channelsCount}</p>
              <p className="text-[10px] text-slate-500">Channels</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="h-4 w-4 text-amber-600" strokeWidth={1.5} />
            <div>
              <p className="text-lg font-bold text-slate-900">142</p>
              <p className="text-[10px] text-slate-500">Conversations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Ticket className="h-4 w-4 text-red-500" strokeWidth={1.5} />
            <div>
              <p className="text-lg font-bold text-slate-900">3</p>
              <p className="text-[10px] text-slate-500">Open Tickets</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BarChart3 className="h-4 w-4 text-blue-600" strokeWidth={1.5} />
            <div>
              <p className="text-lg font-bold text-slate-900">72%</p>
              <p className="text-[10px] text-slate-500">Usage</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Wallet className="h-4 w-4 text-emerald-600" strokeWidth={1.5} />
            <div>
              <p className="text-lg font-bold text-slate-900">Paid</p>
              <p className="text-[10px] text-slate-500">Jun 1, 2026</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex-shrink-0 border-b border-slate-100 px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-4 py-3 text-[13px] font-medium transition border-b-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
              {/* Left: 3 cols */}
              <div className="lg:col-span-3 space-y-6">
                {/* Client Information */}
                <div className="rounded-xl border border-slate-200 p-5">
                  <h3 className="text-[14px] font-semibold text-slate-900 mb-4">Client Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <InfoRow icon={<Globe className="h-4 w-4" strokeWidth={1.5} />} label="Website" value={client.website || '—'} />
                    <InfoRow icon={<MapPin className="h-4 w-4" strokeWidth={1.5} />} label="Location" value={`${client.city}, ${client.country}`} />
                    <InfoRow icon={<UserCog className="h-4 w-4" strokeWidth={1.5} />} label="Account Manager" value={client.accountManager} />
                    <InfoRow icon={<Calendar className="h-4 w-4" strokeWidth={1.5} />} label="Date Added" value={client.dateAdded} />
                  </div>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Primary Contact</p>
                    <div className="grid grid-cols-2 gap-4">
                      <InfoRow icon={<UserCog className="h-4 w-4" strokeWidth={1.5} />} label="Name" value={client.contactPerson} />
                      <InfoRow icon={<Mail className="h-4 w-4" strokeWidth={1.5} />} label="Email" value={client.email} />
                      <InfoRow icon={<Phone className="h-4 w-4" strokeWidth={1.5} />} label="Phone" value={client.phone} />
                    </div>
                  </div>
                </div>

                {/* Onboarding Progress */}
                <div className="rounded-xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[14px] font-semibold text-slate-900">Onboarding Progress</h3>
                    <span className="text-[13px] font-bold text-blue-600">{completedSteps}/{onboardingChecklist.length}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 mb-5">
                    <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="space-y-3">
                    {onboardingChecklist.map((item) => (
                      <div key={item.label} className="flex items-start gap-3">
                        {item.completed ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={1.5} />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" strokeWidth={1.5} />
                        )}
                        <div className="flex-1">
                          <p className={`text-[13px] font-medium ${item.completed ? 'text-slate-900' : 'text-slate-500'}`}>{item.label}</p>
                          <p className="text-[11px] text-slate-400">{item.desc}</p>
                          {item.completed && item.date && (
                            <p className="text-[10px] text-emerald-600 mt-0.5">Completed · {item.date}</p>
                          )}
                          {!item.completed && (
                            <p className="text-[10px] text-amber-600 mt-0.5">Pending</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="rounded-xl border border-slate-200 p-5">
                  <h3 className="text-[14px] font-semibold text-slate-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {activityLog.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                        <div className="flex-1">
                          <p className="text-[13px] text-slate-700">{item.action}</p>
                          <p className="text-[11px] text-slate-400">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: 2 cols */}
              <div className="lg:col-span-2 space-y-6">
                {/* Subscription */}
                <div className="rounded-xl border border-slate-200 p-5">
                  <h3 className="text-[14px] font-semibold text-slate-900 mb-4">Subscription</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[13px]"><span className="text-slate-500">Plan</span><span className="font-medium text-slate-900">{client.package}</span></div>
                    <div className="flex justify-between text-[13px]"><span className="text-slate-500">Billing</span><span className="font-medium text-slate-900">Monthly</span></div>
                    <div className="flex justify-between text-[13px]"><span className="text-slate-500">Amount</span><span className="font-semibold text-slate-900">GHS 2,500/mo</span></div>
                    <div className="flex justify-between text-[13px]"><span className="text-slate-500">Next billing</span><span className="font-medium text-slate-900">Jul 15, 2026</span></div>
                  </div>
                </div>

                {/* Payment */}
                <div className="rounded-xl border border-slate-200 p-5">
                  <h3 className="text-[14px] font-semibold text-slate-900 mb-4">Payment Status</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-[13px]"><span className="text-slate-500">Status</span><span className="font-medium text-emerald-600">Paid</span></div>
                    <div className="flex justify-between text-[13px]"><span className="text-slate-500">Last payment</span><span className="font-medium text-slate-900">Jun 1, 2026</span></div>
                    <div className="flex justify-between text-[13px]"><span className="text-slate-500">Method</span><span className="font-medium text-slate-900">Mobile Money</span></div>
                    <div className="flex justify-between text-[13px]"><span className="text-slate-500">Last invoice</span><span className="font-medium text-blue-600">INV-00123</span></div>
                  </div>
                </div>

                {/* Usage */}
                <div className="rounded-xl border border-slate-200 p-5">
                  <h3 className="text-[14px] font-semibold text-slate-900 mb-3">Usage This Month</h3>
                  <div className="h-2 w-full rounded-full bg-slate-100 mb-2">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: '72%' }} />
                  </div>
                  <p className="text-[11px] text-slate-400 mb-4">4,200 / 6,000 API calls</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[12px]"><span className="text-slate-500">Conversations</span><span className="font-medium text-slate-700">142</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-slate-500">Call minutes</span><span className="font-medium text-slate-700">320</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-slate-500">SMS sent</span><span className="font-medium text-slate-700">800</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-slate-500">WhatsApp messages</span><span className="font-medium text-slate-700">1,120</span></div>
                  </div>
                </div>

                {/* Attention Needed */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-4 w-4 text-amber-600" strokeWidth={1.5} />
                    <h3 className="text-[14px] font-semibold text-slate-900">Attention Needed</h3>
                  </div>
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 text-[12px] text-slate-700"><Clock className="h-3 w-3 text-amber-500" strokeWidth={1.5} />Channel connection is still pending.</p>
                    <p className="flex items-center gap-2 text-[12px] text-slate-700"><Clock className="h-3 w-3 text-amber-500" strokeWidth={1.5} />Test conversation has not been completed.</p>
                    <p className="flex items-center gap-2 text-[12px] text-slate-700"><Clock className="h-3 w-3 text-amber-500" strokeWidth={1.5} />Go-live approval is not yet done.</p>
                    <p className="flex items-center gap-2 text-[12px] text-slate-700"><Ticket className="h-3 w-3 text-amber-500" strokeWidth={1.5} />3 open tickets need review.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Agents Tab */}
          {activeTab === 'agents' && (
            <TabPlaceholder
              icon={<Bot className="h-10 w-10 text-slate-300" strokeWidth={1.5} />}
              title="AI Agents"
              desc="Manage AI assistants assigned to this client."
              action="Create AI Agent"
            />
          )}

          {/* Knowledge Base Tab */}
          {activeTab === 'knowledge' && (
            <TabPlaceholder
              icon={<BookOpen className="h-10 w-10 text-slate-300" strokeWidth={1.5} />}
              title="Knowledge Base"
              desc="Approved business information used by the AI assistant."
              action="Upload Document"
            />
          )}

          {/* Channels Tab */}
          {activeTab === 'channels' && (
            <TabPlaceholder
              icon={<Radio className="h-10 w-10 text-slate-300" strokeWidth={1.5} />}
              title="Channels"
              desc="Manage customer communication channels for this client."
              action="Connect Channel"
            />
          )}

          {/* Conversations Tab */}
          {activeTab === 'conversations' && (
            <TabPlaceholder
              icon={<MessageSquare className="h-10 w-10 text-slate-300" strokeWidth={1.5} />}
              title="Conversations"
              desc="Customer interactions handled by AI agents."
              action=""
            />
          )}

          {/* Tickets Tab */}
          {activeTab === 'tickets' && (
            <TabPlaceholder
              icon={<Ticket className="h-10 w-10 text-slate-300" strokeWidth={1.5} />}
              title="Tickets"
              desc="Escalated issues and support requests."
              action="Create Ticket"
            />
          )}

          {/* Usage & Finance Tab */}
          {activeTab === 'finance' && (
            <TabPlaceholder
              icon={<Wallet className="h-10 w-10 text-slate-300" strokeWidth={1.5} />}
              title="Usage & Finance"
              desc="API usage, billing, invoices, and payment history."
              action="View Invoice"
            />
          )}

          {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div className="rounded-xl border border-slate-200 p-5">
              <h3 className="text-[14px] font-semibold text-slate-900 mb-1">Activity Log</h3>
              <p className="text-[12px] text-slate-500 mb-5">Track actions taken on this client account.</p>
              <div className="space-y-4">
                {activityLog.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                    <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50">
                      <Activity className="h-3.5 w-3.5 text-blue-600" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] text-slate-800">{item.action}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-slate-400">{icon}</span>
      <div>
        <p className="text-[10px] text-slate-400">{label}</p>
        <p className="text-[13px] text-slate-800">{value}</p>
      </div>
    </div>
  )
}

function TabPlaceholder({ icon, title, desc, action }: { icon: React.ReactNode; title: string; desc: string; action: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-12 text-center">
      <div className="flex justify-center">{icon}</div>
      <p className="mt-4 text-[14px] font-medium text-slate-600">{title}</p>
      <p className="mt-1 text-[12px] text-slate-400">{desc}</p>
      {action && (
        <button className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-medium text-white transition hover:bg-blue-700">
          {action}
        </button>
      )}
    </div>
  )
}

export default ClientProfileModal
