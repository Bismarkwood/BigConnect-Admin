import { useState } from 'react'
import {
  Bot,
  CheckCircle2,
  AlertCircle,
  Search,
  Radio,
  MessageSquare,
  BarChart3,
} from 'lucide-react'
import type { AgentStatus } from '../types'

// Mock data — will be replaced with fetchAgents(clientId)
const mockAgents = [
  { id: 'agent_001', name: 'KFC Support Assistant', type: 'Customer Support', status: 'Live' as AgentStatus, channels: ['WhatsApp', 'Web Chat'], language: 'English', model: 'GPT-4o', knowledgeBaseItems: 12, conversationsHandled: 1240, resolutionRate: 87, lastTested: 'Jun 14, 2026', createdAt: 'Jun 3, 2026', createdBy: 'David Mensah' },
  { id: 'agent_002', name: 'KFC Order Bot', type: 'Sales', status: 'Testing' as AgentStatus, channels: ['WhatsApp'], language: 'English', model: 'GPT-4o', knowledgeBaseItems: 5, conversationsHandled: 45, resolutionRate: 72, lastTested: 'Jun 15, 2026', createdAt: 'Jun 10, 2026', createdBy: 'David Mensah' },
  { id: 'agent_003', name: 'KFC FAQ Agent', type: 'FAQ', status: 'Live' as AgentStatus, channels: ['Voice', 'SMS'], language: 'English', model: 'GPT-4o-mini', knowledgeBaseItems: 8, conversationsHandled: 680, resolutionRate: 94, lastTested: 'Jun 12, 2026', createdAt: 'Jun 5, 2026', createdBy: 'Client Admin' },
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

interface AIAgentsTabProps {
  clientId: string
}

function AIAgentsTab({ clientId }: AIAgentsTabProps) {
  void clientId
  const [searchQuery, setSearchQuery] = useState('')

  const liveAgents = mockAgents.filter((a) => a.status === 'Live').length
  const testingAgents = mockAgents.filter((a) => a.status === 'Testing').length
  const totalConversations = mockAgents.reduce((sum, a) => sum + a.conversationsHandled, 0)

  const filtered = mockAgents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-3">
        <SummaryCard label="Total Agents" value={String(mockAgents.length)} icon={<Bot className="h-3.5 w-3.5" />} accentColor="violet" />
        <SummaryCard label="Live" value={String(liveAgents)} icon={<CheckCircle2 className="h-3.5 w-3.5" />} accentColor="emerald" />
        <SummaryCard label="Testing" value={String(testingAgents)} icon={<AlertCircle className="h-3.5 w-3.5" />} accentColor="blue" />
        <SummaryCard label="Conversations" value={totalConversations.toLocaleString()} icon={<MessageSquare className="h-3.5 w-3.5" />} accentColor="amber" />
        <SummaryCard label="Avg Resolution" value="84%" icon={<BarChart3 className="h-3.5 w-3.5" />} accentColor="blue" />
      </div>

      {/* Agents Table */}
      <div className="rounded-xl border border-[#DDE6F5] overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between bg-[#F3F7FF] px-5 py-3.5 border-b border-[#DDE6F5]">
          <div className="flex items-center gap-2 rounded-lg border border-[#DDE6F5] bg-white px-3 py-2 w-64">
            <Search className="h-3.5 w-3.5 text-[#6B7A99]" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search agents..."
              className="flex-1 bg-transparent text-[12px] text-[#07152F] outline-none placeholder:text-[#6B7A99]/60"
            />
          </div>
          <span className="text-[11px] text-[#6B7A99]">{filtered.length} agents</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#DDE6F5]">
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Agent</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Type</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Status</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Channels</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Conversations</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Resolution</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Last Tested</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((agent) => {
                const sc = statusConfig[agent.status]
                return (
                  <tr key={agent.id} className="border-b border-[#F3F7FF] last:border-0 hover:bg-[#F3F7FF]/50 transition">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50">
                          <Bot className="h-4 w-4 text-violet-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-[12px] font-medium text-[#07152F]">{agent.name}</p>
                          <p className="text-[10px] text-[#6B7A99] mt-0.5">{agent.model} · {agent.knowledgeBaseItems} KB items</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex rounded-md bg-[#F3F7FF] px-2 py-0.5 text-[10px] font-medium text-blue-700">
                        {agent.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                        {agent.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {agent.channels.map((ch) => (
                          <span key={ch} className="inline-flex items-center gap-1 rounded-md border border-[#DDE6F5] bg-white px-1.5 py-0.5 text-[9px] font-medium text-[#6B7A99]">
                            <Radio className="h-2.5 w-2.5" strokeWidth={1.5} />{ch}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[12px] font-medium text-[#07152F]">{agent.conversationsHandled.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${agent.resolutionRate >= 80 ? 'bg-emerald-500' : agent.resolutionRate >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                            style={{ width: `${agent.resolutionRate}%` }}
                          />
                        </div>
                        <span className="text-[11px] font-medium text-[#07152F]">{agent.resolutionRate}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[11px] text-[#6B7A99]">{agent.lastTested}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ label, value, icon, accentColor = 'blue', highlight }: {
  label: string
  value: string
  icon: React.ReactNode
  accentColor?: 'blue' | 'violet' | 'sky' | 'amber' | 'rose' | 'emerald' | 'slate'
  highlight?: boolean
}) {
  const accent = {
    blue: 'bg-blue-50 border-blue-100 text-blue-600',
    violet: 'bg-violet-50 border-violet-100 text-violet-600',
    sky: 'bg-sky-50 border-sky-100 text-sky-600',
    amber: 'bg-amber-50 border-amber-100 text-amber-600',
    rose: 'bg-rose-50 border-rose-100 text-rose-600',
    emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
    slate: 'bg-slate-50 border-slate-100 text-slate-600',
  }[accentColor]

  return (
    <div className={`flex flex-col rounded-xl border bg-white p-4 transition-all duration-200 hover:border-blue-200 ${
      highlight ? 'border-emerald-200 bg-emerald-50/10' : 'border-[#DDE6F5]'
    }`}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7A99]">{label}</span>
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg border ${accent}`}>
          {icon}
        </div>
      </div>
      <div className="mt-2.5">
        <p className={`text-[22px] font-black leading-none tracking-tight ${
          highlight ? 'text-emerald-700' : 'text-[#07152F]'
        }`}>
          {value}
        </p>
      </div>
    </div>
  )
}

export default AIAgentsTab
