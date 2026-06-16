import { useState } from 'react'
import {
  Bot,
  CheckCircle2,
  AlertCircle,
  Pause,
  Search,
  Download,
  Radio,
  Eye,
  Play,
  Archive,
  Clock,
} from 'lucide-react'
import type { AgentStatus } from '../types'

// Mock data — all agents across all clients (created by clients)
const mockAllAgents = [
  { id: 'agent_001', name: 'KFC Support Assistant', client: 'KFC Ghana', plan: 'Enterprise', type: 'Customer Support', status: 'Live' as AgentStatus, channels: ['WhatsApp', 'Web Chat'], kbStatus: 'Published', usage: '3 of 5', lastTested: 'Jun 16, 2026', submittedBy: 'Client Admin' },
  { id: 'agent_002', name: 'KFC Order Bot', client: 'KFC Ghana', plan: 'Enterprise', type: 'Sales', status: 'Submitted for Review' as AgentStatus, channels: ['WhatsApp'], kbStatus: 'Published', usage: '3 of 5', lastTested: 'Jun 15, 2026', submittedBy: 'Client Admin' },
  { id: 'agent_003', name: 'KFC FAQ Agent', client: 'KFC Ghana', plan: 'Enterprise', type: 'FAQ', status: 'Live' as AgentStatus, channels: ['Voice', 'SMS'], kbStatus: 'Published', usage: '3 of 5', lastTested: 'Jun 12, 2026', submittedBy: 'Client Admin' },
  { id: 'agent_004', name: 'RightShop Assistant', client: 'RightShop', plan: 'Growth', type: 'Customer Support', status: 'Live' as AgentStatus, channels: ['WhatsApp', 'Web Chat'], kbStatus: 'Published', usage: '2 of 3', lastTested: 'Jun 14, 2026', submittedBy: 'Ama Serwaa' },
  { id: 'agent_005', name: 'RightShop Sales Bot', client: 'RightShop', plan: 'Growth', type: 'Sales', status: 'Needs Changes' as AgentStatus, channels: ['WhatsApp'], kbStatus: 'Ready for Review', usage: '2 of 3', lastTested: 'Jun 10, 2026', submittedBy: 'Ama Serwaa' },
  { id: 'agent_006', name: 'Bloom Support Agent', client: 'Bloom Advisors', plan: 'Growth', type: 'Customer Support', status: 'Draft' as AgentStatus, channels: [], kbStatus: 'Processing', usage: '1 of 3', lastTested: '—', submittedBy: '—' },
  { id: 'agent_007', name: 'Caddyman Logistics Bot', client: 'Caddyman Logistics', plan: 'Enterprise', type: 'Custom', status: 'Live' as AgentStatus, channels: ['WhatsApp', 'Voice', 'Web Chat'], kbStatus: 'Published', usage: '2 of 5', lastTested: 'Jun 15, 2026', submittedBy: 'Kofi Appiah' },
  { id: 'agent_008', name: 'Caddyman FAQ', client: 'Caddyman Logistics', plan: 'Enterprise', type: 'FAQ', status: 'Approved' as AgentStatus, channels: ['Web Chat'], kbStatus: 'Published', usage: '2 of 5', lastTested: 'Jun 13, 2026', submittedBy: 'Kofi Appiah' },
  { id: 'agent_009', name: 'Jumia Customer Care', client: 'Jumia Support', plan: 'Enterprise', type: 'Customer Support', status: 'Live' as AgentStatus, channels: ['WhatsApp', 'Voice', 'Web Chat', 'SMS'], kbStatus: 'Published', usage: '4 of 5', lastTested: 'Jun 16, 2026', submittedBy: 'Abena Owusu' },
  { id: 'agent_010', name: 'Jumia Returns Agent', client: 'Jumia Support', plan: 'Enterprise', type: 'Custom', status: 'Testing' as AgentStatus, channels: ['WhatsApp'], kbStatus: 'Published', usage: '4 of 5', lastTested: 'Jun 16, 2026', submittedBy: 'Abena Owusu' },
  { id: 'agent_011', name: 'Melcom Help Agent', client: 'Melcom Group', plan: 'Enterprise', type: 'Customer Support', status: 'Live' as AgentStatus, channels: ['WhatsApp', 'Web Chat'], kbStatus: 'Published', usage: '3 of 5', lastTested: 'Jun 14, 2026', submittedBy: 'Nana Agyemang' },
  { id: 'agent_012', name: 'Zeepay Test Bot', client: 'Zeepay Africa', plan: 'Starter', type: 'FAQ', status: 'Draft' as AgentStatus, channels: [], kbStatus: 'Draft', usage: '0 of 1', lastTested: '—', submittedBy: '—' },
]

const statusConfig: Record<AgentStatus, { color: string; dot: string; bg: string }> = {
  'Draft': { color: 'text-slate-600', dot: 'bg-slate-400', bg: 'bg-slate-100' },
  'Testing': { color: 'text-blue-700', dot: 'bg-blue-500', bg: 'bg-blue-50' },
  'Submitted for Review': { color: 'text-violet-700', dot: 'bg-violet-500', bg: 'bg-violet-50' },
  'Approved': { color: 'text-emerald-700', dot: 'bg-emerald-500', bg: 'bg-emerald-50' },
  'Live': { color: 'text-emerald-700', dot: 'bg-emerald-500', bg: 'bg-emerald-50' },
  'Needs Changes': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Paused': { color: 'text-amber-700', dot: 'bg-amber-500', bg: 'bg-amber-50' },
  'Archived': { color: 'text-slate-500', dot: 'bg-slate-400', bg: 'bg-slate-100' },
}

const kbStatusColors: Record<string, string> = {
  'Published': 'text-emerald-600',
  'Ready for Review': 'text-amber-600',
  'Processing': 'text-blue-600',
  'Draft': 'text-slate-500',
}

function AIAgentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter] = useState('all')

  const liveAgents = mockAllAgents.filter((a) => a.status === 'Live').length
  const testingAgents = mockAllAgents.filter((a) => a.status === 'Testing').length
  const reviewAgents = mockAllAgents.filter((a) => a.status === 'Submitted for Review').length
  const needsChanges = mockAllAgents.filter((a) => a.status === 'Needs Changes').length

  const filtered = mockAllAgents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.client.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900">AI Agents</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">Review, approve, test, and monitor AI assistants created by clients</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50">
          <Download className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <SummaryCard icon={<Bot className="h-[18px] w-[18px] text-violet-600" strokeWidth={1.5} />} value={String(mockAllAgents.length)} label="Total Agents" desc="Created by clients" />
        <SummaryCard icon={<CheckCircle2 className="h-[18px] w-[18px] text-emerald-600" strokeWidth={1.5} />} value={String(liveAgents)} label="Live" desc="Active on channels" />
        <SummaryCard icon={<Clock className="h-[18px] w-[18px] text-violet-600" strokeWidth={1.5} />} value={String(reviewAgents)} label="Awaiting Review" desc="Submitted by clients" />
        <SummaryCard icon={<Play className="h-[18px] w-[18px] text-blue-600" strokeWidth={1.5} />} value={String(testingAgents)} label="Testing" desc="Not yet submitted" />
        <SummaryCard icon={<AlertCircle className="h-[18px] w-[18px] text-red-500" strokeWidth={1.5} />} value={String(needsChanges)} label="Needs Changes" desc="Feedback sent to client" />
      </div>

      {/* Plan Awareness */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/40 px-5 py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 text-blue-600" strokeWidth={1.5} />
            <span className="text-[12px] font-medium text-[#07152F]">Subscription Controls</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#6B7A99]">
            <span><span className="font-medium text-[#07152F]">Starter:</span> 1 Agent</span>
            <span><span className="font-medium text-[#07152F]">Growth:</span> 3 Agents</span>
            <span><span className="font-medium text-[#07152F]">Enterprise:</span> 5 Agents</span>
          </div>
        </div>
        <p className="mt-1 text-[11px] text-[#6B7A99]">Clients create agents from their platform. Creation, publishing, and channels are enforced by the SaaS backend based on their subscription plan.</p>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 w-80">
            <Search className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search agent or client..." className="flex-1 bg-transparent text-[13px] text-slate-900 outline-none placeholder:text-slate-400" />
          </div>
          <span className="text-[12px] text-slate-400">{filtered.length} agents</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Agent</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Client</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Plan</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Channels</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">KB</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Usage</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Submitted By</th>
                <th className="w-24 px-4 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((agent) => {
                const sc = statusConfig[agent.status]
                return (
                  <tr key={agent.id} className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/60">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
                          <Bot className="h-4 w-4 text-violet-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[12px] font-medium text-slate-900">{agent.name}</p>
                          <p className="text-[10px] text-slate-400">{agent.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[12px] text-slate-700">{agent.client}</td>
                    <td className="px-4 py-4"><span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[9px] font-medium text-slate-700">{agent.plan}</span></td>
                    <td className="px-4 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.color}`}><span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />{agent.status}</span></td>
                    <td className="px-4 py-4">
                      {agent.channels.length > 0 ? (
                        <div className="flex flex-wrap gap-1">{agent.channels.map((ch) => (<span key={ch} className="rounded border border-slate-200 px-1.5 py-0.5 text-[9px] font-medium text-slate-600"><Radio className="inline h-2.5 w-2.5 mr-0.5" strokeWidth={1.5} />{ch}</span>))}</div>
                      ) : <span className="text-[10px] text-slate-400">None</span>}
                    </td>
                    <td className="px-4 py-4"><span className={`text-[11px] font-medium ${kbStatusColors[agent.kbStatus] || 'text-slate-500'}`}>{agent.kbStatus}</span></td>
                    <td className="px-4 py-4 text-[11px] text-slate-600">{agent.usage}</td>
                    <td className="px-4 py-4 text-[11px] text-slate-500">{agent.submittedBy}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="View"><Eye className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                        {agent.status === 'Live' && <button className="flex h-7 w-7 items-center justify-center rounded-lg text-amber-500 hover:bg-amber-50" title="Pause"><Pause className="h-3.5 w-3.5" strokeWidth={1.5} /></button>}
                        {agent.status !== 'Archived' && agent.status !== 'Live' && <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100" title="Archive"><Archive className="h-3.5 w-3.5" strokeWidth={1.5} /></button>}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-[13px] text-slate-500">Showing <span className="font-medium text-blue-600">{filtered.length}</span> of {mockAllAgents.length} agents</p>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-600 bg-blue-600 text-[13px] font-medium text-white">1</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 hover:bg-slate-50">2</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ icon, value, label, desc }: { icon: React.ReactNode; value: string; label: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
      <div className="flex items-center gap-2.5 mb-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50">{icon}</div></div>
      <p className="text-[22px] font-bold text-slate-900">{value}</p>
      <p className="text-[12px] font-medium text-slate-700 mt-0.5">{label}</p>
      <p className="text-[10px] text-slate-400 mt-0.5">{desc}</p>
    </div>
  )
}

export default AIAgentsPage
