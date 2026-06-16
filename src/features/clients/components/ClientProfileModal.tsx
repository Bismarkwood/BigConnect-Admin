import { useState } from 'react'
import {
  X,
  Bot,
  Radio,
  MessageSquare,
  Ticket,
  BarChart3,
  Wallet,
  Ban,
  Send,
  PhoneCall,
  Copy,
  CheckCircle2,
  AlertCircle,
  Clock,
  CreditCard,
  Power,
  Plus,
  Mail,
  Globe,
  MapPin,
  UserCog,
  Calendar,
} from 'lucide-react'
import type { Client } from '../types'
import KnowledgeBaseTab from '../../knowledge-base/components/KnowledgeBaseTab'
import CallLogsTab from '../../call-logs/components/CallLogsTab'
import BillingTab from '../../billing/components/BillingTab'
import AIAgentsTab from '../../ai-agents/components/AIAgentsTab'

interface ClientProfileModalProps {
  client: Client | null
  open: boolean
  onClose: () => void
}

type Tab = 'overview' | 'agents' | 'knowledge' | 'channels' | 'call-logs' | 'billing' | 'activity'

const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'agents', label: 'AI Agents' },
  { id: 'knowledge', label: 'Knowledge Base' },
  { id: 'channels', label: 'Channels' },
  { id: 'call-logs', label: 'Call Logs' },
  { id: 'billing', label: 'Billing & Subscription' },
  { id: 'activity', label: 'Activity Log' },
]

const onboardingSteps = [
  { label: 'Client Created', desc: 'Profile created in BigConnect SaaS platform.', completed: true, date: 'Jun 1, 2026' },
  { label: 'Package Assigned', desc: 'Enterprise plan assigned to account.', completed: true, date: 'Jun 1, 2026' },
  { label: 'Payment Confirmed', desc: 'First payment received and confirmed.', completed: true, date: 'Jun 1, 2026' },
  { label: 'AI Agent Created', desc: 'AI assistant configured for the client.', completed: true, date: 'Jun 3, 2026' },
  { label: 'Knowledge Base Uploaded', desc: 'Training documents uploaded and processed.', completed: true, date: 'Jun 5, 2026' },
  { label: 'Channel Connected', desc: 'Connect WhatsApp, SMS, Voice, or Web Chat.', completed: false, date: '' },
  { label: 'Test Completed', desc: 'Run a test conversation to verify behavior.', completed: false, date: '' },
  { label: 'Go-Live Approved', desc: 'Final approval before making agent live.', completed: false, date: '' },
]

const activityLog = [
  { action: 'Created client profile', user: 'David Mensah', module: 'Clients', date: 'Jun 1, 2026', time: '9:24 AM', status: 'completed' },
  { action: 'Payment confirmed', user: 'Finance Admin', module: 'Finance', date: 'Jun 1, 2026', time: '10:15 AM', status: 'completed' },
  { action: 'Enterprise plan assigned', user: 'David Mensah', module: 'Billing', date: 'Jun 1, 2026', time: '10:20 AM', status: 'completed' },
  { action: 'AI agent created', user: 'David Mensah', module: 'AI Agents', date: 'Jun 3, 2026', time: '2:30 PM', status: 'completed' },
  { action: 'Knowledge base uploaded', user: 'David Mensah', module: 'Knowledge Base', date: 'Jun 5, 2026', time: '11:05 AM', status: 'completed' },
  { action: 'WhatsApp channel initiated', user: 'System', module: 'Channels', date: 'Jun 7, 2026', time: '3:45 PM', status: 'pending' },
]

function ClientProfileModal({ client, open, onClose }: ClientProfileModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')

  if (!open || !client) return null

  const completedSteps = onboardingSteps.filter((s) => s.completed).length
  const progress = Math.round((completedSteps / onboardingSteps.length) * 100)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07152F]/20 backdrop-blur-sm">
      <div className="relative flex h-[96vh] w-[96vw] max-w-[1600px] flex-col overflow-hidden rounded-3xl border border-[#DDE6F5] bg-white">

        {/* Premium Header */}
        <div className="flex-shrink-0 bg-[#F3F7FF] border-b border-[#DDE6F5] px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
                {client.businessName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-[20px] font-bold text-[#07152F]">{client.businessName}</h2>
                  <span className="text-[12px] text-[#6B7A99]">{client.id} · {client.industry} · {client.city}, {client.country}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <StatusChip label={client.status} variant="success" />
                  <StatusChip label={client.package} variant="blue" />
                  <StatusChip label={client.paymentStatus} variant={client.paymentStatus === 'Paid' ? 'success' : 'warning'} />
                  <StatusChip label={`${progress}% Setup`} variant="neutral" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3.5 py-2 text-[12px] font-medium text-red-600 transition hover:bg-red-50">
                <Ban className="h-3.5 w-3.5" strokeWidth={1.5} />Suspend
              </button>
              <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7A99] transition hover:bg-white hover:text-slate-900">
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {/* Client Health Strip */}
        <div className="flex-shrink-0 grid grid-cols-6 divide-x divide-[#DDE6F5] border-b border-[#DDE6F5] bg-white">
          <HealthItem icon={<BarChart3 className="h-4 w-4 text-blue-600" strokeWidth={1.5} />} label="Setup" value={`${progress}%`} context={`${completedSteps} of ${onboardingSteps.length} steps`} />
          <HealthItem icon={<Bot className="h-4 w-4 text-violet-600" strokeWidth={1.5} />} label="AI Agents" value={String(client.aiAgentsCount)} context="2 Live · 1 Testing" />
          <HealthItem icon={<Radio className="h-4 w-4 text-blue-600" strokeWidth={1.5} />} label="Channels" value={String(client.channelsCount)} context="WhatsApp, Voice, Web" />
          <HealthItem icon={<BarChart3 className="h-4 w-4 text-amber-600" strokeWidth={1.5} />} label="Usage" value="72%" context="4,200 / 6,000 calls" />
          <HealthItem icon={<Ticket className="h-4 w-4 text-red-500" strokeWidth={1.5} />} label="Tickets" value="3" context="1 urgent" />
          <HealthItem icon={<Wallet className="h-4 w-4 text-emerald-600" strokeWidth={1.5} />} label="Payment" value={client.paymentStatus} context="Jun 1, 2026" />
        </div>

        {/* Pill Tab Navigation */}
        <div className="flex-shrink-0 px-8 py-3 border-b border-[#DDE6F5]">
          <div className="inline-flex items-center gap-1 rounded-xl bg-[#F3F7FF] p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-4 py-2 text-[12px] font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-[#6B7A99] hover:text-[#07152F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
              {/* Left Column */}
              <div className="space-y-5">
                {/* Client Snapshot */}
                <div className="rounded-xl border border-[#DDE6F5] overflow-hidden">
                  {/* Card header with gradient */}
                  <div className="bg-gradient-to-r from-[#F3F7FF] to-white px-5 py-4 border-b border-[#DDE6F5]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
                        {client.businessName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[15px] font-bold text-[#07152F]">{client.businessName}</h4>
                        <p className="text-[12px] text-[#6B7A99] mt-0.5">{client.industry} · {client.city}, {client.country}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-[#6B7A99]">Client ID</p>
                        <p className="text-[13px] font-mono font-semibold text-blue-600">{client.id}</p>
                      </div>
                    </div>
                  </div>
                  {/* Details grid */}
                  <div className="px-5 py-4">
                    <div className="grid grid-cols-3 gap-y-4 gap-x-6">
                      <SnapshotField icon={<BarChart3 className="h-3.5 w-3.5 text-blue-600" strokeWidth={1.5} />} label="Status" value={client.status} highlight />
                      <SnapshotField icon={<Wallet className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.5} />} label="Package" value={client.package} />
                      <SnapshotField icon={<Calendar className="h-3.5 w-3.5 text-[#6B7A99]" strokeWidth={1.5} />} label="Date Added" value={client.dateAdded} />
                      <SnapshotField icon={<Globe className="h-3.5 w-3.5 text-blue-600" strokeWidth={1.5} />} label="Website" value={client.website || '—'} isLink />
                      <SnapshotField icon={<MapPin className="h-3.5 w-3.5 text-[#6B7A99]" strokeWidth={1.5} />} label="Location" value={`${client.city}, ${client.country}`} />
                      <SnapshotField icon={<UserCog className="h-3.5 w-3.5 text-[#6B7A99]" strokeWidth={1.5} />} label="Account Manager" value={client.accountManager} />
                    </div>
                  </div>
                </div>

                {/* Primary Contact */}
                <div className="rounded-xl border border-[#DDE6F5] overflow-hidden">
                  <div className="px-5 py-3.5 bg-[#F3F7FF] border-b border-[#DDE6F5]">
                    <h4 className="text-[13px] font-semibold text-[#07152F]">Primary Contact</h4>
                  </div>
                  <div className="px-5 py-4">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-[12px] font-bold text-blue-600">
                        {client.contactPerson.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="text-[14px] font-semibold text-[#07152F]">{client.contactPerson}</p>
                        <p className="text-[12px] text-[#6B7A99]">Operations Manager</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2.5 rounded-lg bg-[#F3F7FF] px-3 py-2.5">
                        <Mail className="h-3.5 w-3.5 text-blue-600" strokeWidth={1.5} />
                        <span className="text-[12px] text-[#07152F]">{client.email}</span>
                      </div>
                      <div className="flex items-center gap-2.5 rounded-lg bg-[#F3F7FF] px-3 py-2.5">
                        <PhoneCall className="h-3.5 w-3.5 text-blue-600" strokeWidth={1.5} />
                        <span className="text-[12px] text-[#07152F]">{client.phone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 border-t border-[#DDE6F5] pt-3">
                      <ActionBtn icon={<Send className="h-3.5 w-3.5" strokeWidth={1.5} />} label="Send Email" />
                      <ActionBtn icon={<PhoneCall className="h-3.5 w-3.5" strokeWidth={1.5} />} label="Call" />
                      <ActionBtn icon={<Copy className="h-3.5 w-3.5" strokeWidth={1.5} />} label="Copy Contact" />
                    </div>
                  </div>
                </div>

                {/* Onboarding Progress */}
                <div className="rounded-xl border border-[#DDE6F5] overflow-hidden">
                  {/* Header with progress */}
                  <div className="flex items-center justify-between bg-[#F3F7FF] px-5 py-4 border-b border-[#DDE6F5]">
                    <div>
                      <h4 className="text-[13px] font-semibold text-[#07152F]">Onboarding Progress</h4>
                      <p className="text-[11px] text-[#6B7A99] mt-0.5">{completedSteps} of {onboardingSteps.length} steps completed</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 rounded-full bg-white">
                        <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-[14px] font-bold text-blue-600">{progress}%</span>
                    </div>
                  </div>

                  {/* Steps grid */}
                  <div className="px-5 py-4">
                    <div className="grid grid-cols-4 gap-3">
                      {onboardingSteps.map((step, i) => {
                        const isCurrent = !step.completed && i === completedSteps
                        return (
                          <div
                            key={step.label}
                            className={`relative rounded-xl border p-3.5 transition ${
                              step.completed
                                ? 'border-emerald-200 bg-emerald-50/50'
                                : isCurrent
                                  ? 'border-blue-300 bg-blue-50/50'
                                  : 'border-[#DDE6F5] bg-white'
                            }`}
                          >
                            {/* Step number */}
                            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold mb-2.5 ${
                              step.completed
                                ? 'bg-emerald-500 text-white'
                                : isCurrent
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-[#F3F7FF] text-[#6B7A99]'
                            }`}>
                              {step.completed ? (
                                <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.5} />
                              ) : (
                                i + 1
                              )}
                            </div>

                            {/* Step info */}
                            <p className={`text-[12px] font-semibold leading-tight ${
                              step.completed ? 'text-[#07152F]' : isCurrent ? 'text-blue-700' : 'text-[#6B7A99]'
                            }`}>
                              {step.label}
                            </p>
                            <p className="text-[10px] text-[#6B7A99] mt-1 leading-snug">{step.desc}</p>

                            {/* Status badge */}
                            <div className="mt-2.5">
                              {step.completed && step.date ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-medium text-emerald-700">
                                  <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={2} />{step.date}
                                </span>
                              ) : isCurrent ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-medium text-blue-700">
                                  <Clock className="h-2.5 w-2.5" strokeWidth={2} />In Progress
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-[#6B7A99]">
                                  Pending
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Recent Activity Table */}
                <div className="rounded-xl border border-[#DDE6F5] overflow-hidden">
                  <div className="flex items-center justify-between bg-[#F3F7FF] px-5 py-3.5 border-b border-[#DDE6F5]">
                    <h4 className="text-[13px] font-semibold text-[#07152F]">Recent Activity</h4>
                    <span className="text-[11px] text-[#6B7A99]">{activityLog.length} events</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#DDE6F5]">
                          <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Action</th>
                          <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">User</th>
                          <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Module</th>
                          <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Date</th>
                          <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activityLog.map((item, i) => (
                          <tr key={i} className="border-b border-[#F3F7FF] last:border-0 hover:bg-[#F3F7FF]/50 transition">
                            <td className="px-5 py-3">
                              <p className="text-[12px] font-medium text-[#07152F]">{item.action}</p>
                            </td>
                            <td className="px-5 py-3">
                              <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[9px] font-bold text-blue-600">
                                  {item.user.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="text-[12px] text-[#07152F]">{item.user}</span>
                              </div>
                            </td>
                            <td className="px-5 py-3">
                              <span className="inline-flex rounded-md bg-[#F3F7FF] px-2 py-0.5 text-[10px] font-medium text-blue-700">
                                {item.module}
                              </span>
                            </td>
                            <td className="px-5 py-3">
                              <p className="text-[12px] text-[#07152F]">{item.date}</p>
                              <p className="text-[10px] text-[#6B7A99]">{item.time}</p>
                            </td>
                            <td className="px-5 py-3">
                              <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                item.status === 'completed'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${item.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                {item.status === 'completed' ? 'Done' : 'Pending'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                {/* Attention Needed */}
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="h-4 w-4 text-amber-600" strokeWidth={1.5} />
                    <h4 className="text-[13px] font-semibold text-[#07152F]">Attention Needed</h4>
                  </div>
                  <div className="space-y-2.5 mb-4">
                    <AttentionItem text="Channel connection is still pending." />
                    <AttentionItem text="Test conversation has not been completed." />
                    <AttentionItem text="Go-live approval is not done." />
                    <AttentionItem text="3 open tickets need review." />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <ActionBtn icon={<Radio className="h-3.5 w-3.5" strokeWidth={1.5} />} label="Connect Channel" />
                    <ActionBtn icon={<MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />} label="Run Test" />
                    <ActionBtn icon={<Ticket className="h-3.5 w-3.5" strokeWidth={1.5} />} label="Review Tickets" />
                  </div>
                </div>

                {/* Subscription */}
                <div className="rounded-xl border border-[#DDE6F5] p-5">
                  <h4 className="text-[13px] font-semibold text-[#07152F] mb-3">Subscription</h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Plan</span><span className="font-medium text-[#07152F]">{client.package}</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Billing</span><span className="font-medium text-[#07152F]">Monthly</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Amount</span><span className="font-semibold text-[#07152F]">GHS 2,500/mo</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Next billing</span><span className="font-medium text-[#07152F]">Jul 15, 2026</span></div>
                  </div>
                </div>

                {/* Payment */}
                <div className="rounded-xl border border-[#DDE6F5] p-5">
                  <h4 className="text-[13px] font-semibold text-[#07152F] mb-3">Payment Status</h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Status</span><span className="font-medium text-emerald-600">Paid</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Last payment</span><span className="font-medium text-[#07152F]">Jun 1, 2026</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Method</span><span className="font-medium text-[#07152F]">Mobile Money</span></div>
                    <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Invoice</span><span className="font-medium text-blue-600">INV-00123</span></div>
                  </div>
                  <div className="mt-3 flex gap-2 border-t border-[#DDE6F5] pt-3">
                    <ActionBtn icon={<CreditCard className="h-3.5 w-3.5" strokeWidth={1.5} />} label="View Invoice" />
                    <ActionBtn icon={<Wallet className="h-3.5 w-3.5" strokeWidth={1.5} />} label="Record Payment" />
                  </div>
                </div>

                {/* Usage */}
                <div className="rounded-xl border border-[#DDE6F5] p-5">
                  <h4 className="text-[13px] font-semibold text-[#07152F] mb-3">Usage This Month</h4>
                  <div className="h-2 w-full rounded-full bg-[#F3F7FF] mb-1.5">
                    <div className="h-full rounded-full bg-blue-600" style={{ width: '72%' }} />
                  </div>
                  <p className="text-[10px] text-[#6B7A99] mb-3">4,200 / 6,000 API calls (72%)</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px]"><span className="text-[#6B7A99]">Conversations</span><span className="font-medium text-[#07152F]">142</span></div>
                    <div className="flex justify-between text-[11px]"><span className="text-[#6B7A99]">Call minutes</span><span className="font-medium text-[#07152F]">320</span></div>
                    <div className="flex justify-between text-[11px]"><span className="text-[#6B7A99]">SMS sent</span><span className="font-medium text-[#07152F]">800</span></div>
                    <div className="flex justify-between text-[11px]"><span className="text-[#6B7A99]">WhatsApp</span><span className="font-medium text-[#07152F]">1,120</span></div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl border border-[#DDE6F5] p-5">
                  <h4 className="text-[13px] font-semibold text-[#07152F] mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <QuickAction icon={<Bot className="h-3.5 w-3.5" strokeWidth={1.5} />} label="View Agents" />
                    <QuickAction icon={<Radio className="h-3.5 w-3.5" strokeWidth={1.5} />} label="View Channels" />
                    <QuickAction icon={<CreditCard className="h-3.5 w-3.5" strokeWidth={1.5} />} label="View Invoice" />
                    <QuickAction icon={<Wallet className="h-3.5 w-3.5" strokeWidth={1.5} />} label="Record Payment" />
                    <QuickAction icon={<MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} />} label="Test Agent" />
                    <QuickAction icon={<Power className="h-3.5 w-3.5" strokeWidth={1.5} />} label="Suspend" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs - placeholders */}
          {activeTab === 'agents' && <AIAgentsTab clientId={client.id} />}
          {activeTab === 'knowledge' && <KnowledgeBaseTab clientId={client.id} />}
          {activeTab === 'channels' && <TabPlaceholder icon={<Radio className="h-10 w-10 text-[#DDE6F5]" strokeWidth={1.5} />} title="Channels" desc="Manage customer communication channels for this client." action="Connect Channel" />}
          {activeTab === 'call-logs' && <CallLogsTab clientId={client.id} />}
          {activeTab === 'billing' && <BillingTab clientId={client.id} />}
          {activeTab === 'activity' && (
            <div className="rounded-xl border border-[#DDE6F5] overflow-hidden">
              <div className="flex items-center justify-between bg-[#F3F7FF] px-5 py-3.5 border-b border-[#DDE6F5]">
                <div>
                  <h4 className="text-[13px] font-semibold text-[#07152F]">Activity Log</h4>
                  <p className="text-[11px] text-[#6B7A99] mt-0.5">Track all actions taken on this client account</p>
                </div>
                <span className="text-[11px] text-[#6B7A99]">{activityLog.length} events</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#DDE6F5]">
                      <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Action</th>
                      <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">User</th>
                      <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Module</th>
                      <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Date</th>
                      <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activityLog.map((item, i) => (
                      <tr key={i} className="border-b border-[#F3F7FF] last:border-0 hover:bg-[#F3F7FF]/50 transition">
                        <td className="px-5 py-3.5">
                          <p className="text-[12px] font-medium text-[#07152F]">{item.action}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50 text-[9px] font-bold text-blue-600">
                              {item.user.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-[12px] text-[#07152F]">{item.user}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex rounded-md bg-[#F3F7FF] px-2 py-0.5 text-[10px] font-medium text-blue-700">
                            {item.module}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <p className="text-[12px] text-[#07152F]">{item.date}</p>
                          <p className="text-[10px] text-[#6B7A99]">{item.time}</p>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            item.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${item.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            {item.status === 'completed' ? 'Done' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Footer */}
        <div className="flex-shrink-0 flex items-center justify-between border-t border-[#DDE6F5] bg-[#F3F7FF] px-8 py-3">
          <span className="text-[11px] text-[#6B7A99]">Last updated Jun 15, 2026</span>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-[#DDE6F5] bg-white px-3.5 py-2 text-[12px] font-medium text-[#6B7A99] transition hover:bg-slate-50">Save Note</button>
          </div>
        </div>
      </div>

    </div>
  )
}

// --- Sub-components ---

function StatusChip({ label, variant }: { label: string; variant: 'success' | 'warning' | 'blue' | 'neutral' }) {
  const styles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    neutral: 'bg-slate-100 text-[#6B7A99] border-slate-200',
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${styles[variant]}`}>
      {label}
    </span>
  )
}

function HealthItem({ icon, label, value, context }: { icon: React.ReactNode; label: string; value: string; context: string }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      {icon}
      <div>
        <p className="text-[15px] font-bold text-[#07152F]">{value}</p>
        <p className="text-[10px] text-[#6B7A99]">{label} · {context}</p>
      </div>
    </div>
  )
}

function SnapshotField({ icon, label, value, isLink, highlight }: { icon: React.ReactNode; label: string; value: string; isLink?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="mt-0.5">{icon}</div>
      <div>
        <p className="text-[10px] text-[#6B7A99] uppercase tracking-wide">{label}</p>
        <p className={`text-[13px] mt-0.5 font-medium ${highlight ? 'text-emerald-600' : isLink ? 'text-blue-600' : 'text-[#07152F]'}`}>{value}</p>
      </div>
    </div>
  )
}

function ActionBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDE6F5] bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#6B7A99] transition hover:bg-[#F3F7FF] hover:text-[#07152F]">
      {icon}{label}
    </button>
  )
}

function QuickAction({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-[#DDE6F5] px-3 py-2.5 text-[11px] font-medium text-[#6B7A99] transition hover:bg-[#F3F7FF] hover:text-[#07152F]">
      {icon}{label}
    </button>
  )
}

function AttentionItem({ text }: { text: string }) {
  return (
    <p className="flex items-center gap-2 text-[12px] text-[#07152F]">
      <Clock className="h-3 w-3 shrink-0 text-amber-500" strokeWidth={1.5} />
      {text}
    </p>
  )
}

function TabPlaceholder({ icon, title, desc, action }: { icon: React.ReactNode; title: string; desc: string; action: string }) {
  return (
    <div className="rounded-xl border border-[#DDE6F5] p-12 text-center">
      <div className="flex justify-center">{icon}</div>
      <p className="mt-4 text-[14px] font-semibold text-[#07152F]">{title}</p>
      <p className="mt-1 text-[12px] text-[#6B7A99]">{desc}</p>
      {action && (
        <button className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-[12px] font-medium text-white transition hover:bg-blue-700">
          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />{action}
        </button>
      )}
    </div>
  )
}

export default ClientProfileModal
