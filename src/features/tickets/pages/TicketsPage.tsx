import { useState } from 'react'
import {
  Ticket,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Download,
  Eye,
  ArrowUpRight,
} from 'lucide-react'
import TicketDetailModal from '../components/TicketDetailModal'
import type { TicketStatus, TicketPriority } from '../types'

const mockTickets = [
  { id: 'TCK-2026-000124', clientName: 'RightShop Ghana', subject: 'WhatsApp channel not connecting', category: 'Channel Issue', priority: 'High' as TicketPriority, status: 'New' as TicketStatus, source: 'Client Platform', assignedTo: 'Unassigned', createdAt: 'Jun 16, 2026', lastUpdated: 'Jun 16, 2026' },
  { id: 'TCK-2026-000123', clientName: 'KFC Ghana', subject: 'AI agent giving incorrect answers about menu', category: 'AI Agent Issue', priority: 'High' as TicketPriority, status: 'In Progress' as TicketStatus, source: 'Client Platform', assignedTo: 'David Mensah', createdAt: 'Jun 15, 2026', lastUpdated: 'Jun 16, 2026' },
  { id: 'TCK-2026-000122', clientName: 'Bloom Advisors', subject: 'Cannot access billing dashboard', category: 'Account Access', priority: 'Medium' as TicketPriority, status: 'Waiting for Client' as TicketStatus, source: 'Client Platform', assignedTo: 'Sarah Osei', createdAt: 'Jun 15, 2026', lastUpdated: 'Jun 15, 2026' },
  { id: 'TCK-2026-000121', clientName: 'Caddyman Logistics', subject: 'Knowledge base upload fails for large PDF', category: 'Knowledge Base', priority: 'Medium' as TicketPriority, status: 'Open' as TicketStatus, source: 'Client Platform', assignedTo: 'Unassigned', createdAt: 'Jun 14, 2026', lastUpdated: 'Jun 14, 2026' },
  { id: 'TCK-2026-000120', clientName: 'Jumia Support', subject: 'Request for custom API integration', category: 'Feature Request', priority: 'Low' as TicketPriority, status: 'Escalated' as TicketStatus, source: 'Client Platform', assignedTo: 'Emmanuel Adu', createdAt: 'Jun 13, 2026', lastUpdated: 'Jun 15, 2026' },
  { id: 'TCK-2026-000119', clientName: 'Melcom Group', subject: 'Invoice amount incorrect for May billing', category: 'Billing Issue', priority: 'High' as TicketPriority, status: 'Resolved' as TicketStatus, source: 'Client Platform', assignedTo: 'Grace Tetteh', createdAt: 'Jun 12, 2026', lastUpdated: 'Jun 14, 2026' },
  { id: 'TCK-2026-000118', clientName: 'RightShop Ghana', subject: 'SMS delivery rate dropped below 50%', category: 'Channel Issue', priority: 'Critical' as TicketPriority, status: 'In Progress' as TicketStatus, source: 'Client Platform', assignedTo: 'David Mensah', createdAt: 'Jun 11, 2026', lastUpdated: 'Jun 16, 2026' },
  { id: 'TCK-2026-000117', clientName: 'KFC Ghana', subject: 'Need to add new FAQ items to knowledge base', category: 'General Inquiry', priority: 'Low' as TicketPriority, status: 'Closed' as TicketStatus, source: 'Client Platform', assignedTo: 'Sarah Osei', createdAt: 'Jun 10, 2026', lastUpdated: 'Jun 12, 2026' },
]

const statusConfig: Record<TicketStatus, { color: string; dot: string; bg: string }> = {
  'New': { color: 'text-blue-700', dot: 'bg-blue-500', bg: 'bg-blue-50' },
  'Open': { color: 'text-blue-700', dot: 'bg-blue-500', bg: 'bg-blue-50' },
  'In Progress': { color: 'text-amber-700', dot: 'bg-amber-500', bg: 'bg-amber-50' },
  'Waiting for Client': { color: 'text-slate-600', dot: 'bg-slate-400', bg: 'bg-slate-100' },
  'Waiting for BigConnect': { color: 'text-violet-700', dot: 'bg-violet-500', bg: 'bg-violet-50' },
  'Escalated': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Resolved': { color: 'text-emerald-700', dot: 'bg-emerald-500', bg: 'bg-emerald-50' },
  'Closed': { color: 'text-slate-500', dot: 'bg-slate-400', bg: 'bg-slate-100' },
  'Cancelled': { color: 'text-slate-500', dot: 'bg-slate-400', bg: 'bg-slate-100' },
  'Reopened': { color: 'text-amber-700', dot: 'bg-amber-500', bg: 'bg-amber-50' },
}

const priorityConfig: Record<TicketPriority, { color: string; bg: string }> = {
  'Low': { color: 'text-slate-600', bg: 'bg-slate-100' },
  'Medium': { color: 'text-amber-700', bg: 'bg-amber-50' },
  'High': { color: 'text-red-700', bg: 'bg-red-50' },
  'Critical': { color: 'text-red-700', bg: 'bg-red-100' },
}

function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTicket, setSelectedTicket] = useState<typeof mockTickets[0] | null>(null)

  const newTickets = mockTickets.filter(t => t.status === 'New').length
  const openTickets = mockTickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length
  const escalated = mockTickets.filter(t => t.status === 'Escalated').length
  const resolved = mockTickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length

  const filtered = mockTickets.filter(t =>
    t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900">Tickets</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">Manage client support requests, escalations, and service issues</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50">
          <Download className="h-4 w-4 text-slate-400" strokeWidth={1.5} />Export
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryCard icon={<Ticket className="h-[18px] w-[18px] text-blue-600" strokeWidth={1.5} />} value={String(newTickets)} label="New" />
        <SummaryCard icon={<Clock className="h-[18px] w-[18px] text-amber-600" strokeWidth={1.5} />} value={String(openTickets)} label="In Progress" />
        <SummaryCard icon={<AlertCircle className="h-[18px] w-[18px] text-red-500" strokeWidth={1.5} />} value={String(escalated)} label="Escalated" />
        <SummaryCard icon={<CheckCircle2 className="h-[18px] w-[18px] text-emerald-600" strokeWidth={1.5} />} value={String(resolved)} label="Resolved" />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 w-80">
            <Search className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tickets..." className="flex-1 bg-transparent text-[13px] text-slate-900 outline-none placeholder:text-slate-400" />
          </div>
          <span className="text-[12px] text-slate-400">{filtered.length} tickets</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Ticket</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Client</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Subject</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Category</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Priority</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Assigned</th>
                <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Created</th>
                <th className="w-16 px-4 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ticket) => {
                const sc = statusConfig[ticket.status]
                const pc = priorityConfig[ticket.priority]
                return (
                  <tr key={ticket.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 text-[12px] font-mono font-medium text-blue-600">{ticket.id}</td>
                    <td className="px-4 py-4 text-[12px] font-medium text-slate-900">{ticket.clientName}</td>
                    <td className="px-4 py-4 text-[12px] text-slate-700 max-w-[200px] truncate">{ticket.subject}</td>
                    <td className="px-4 py-4"><span className="rounded bg-[#F3F7FF] px-1.5 py-0.5 text-[10px] font-medium text-blue-700">{ticket.category}</span></td>
                    <td className="px-4 py-4"><span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${pc.bg} ${pc.color}`}>{ticket.priority}</span></td>
                    <td className="px-4 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.color}`}><span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />{ticket.status}</span></td>
                    <td className="px-4 py-4 text-[11px] text-slate-500">{ticket.assignedTo}</td>
                    <td className="px-4 py-4 text-[11px] text-slate-500">{ticket.createdAt}</td>
                    <td className="px-4 py-4">
                      <button onClick={() => setSelectedTicket(ticket)} className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="View">
                        <Eye className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-[13px] text-slate-500">Showing <span className="font-medium text-blue-600">{filtered.length}</span> of {mockTickets.length} tickets</p>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-600 bg-blue-600 text-[13px] font-medium text-white">1</button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 hover:bg-slate-50">2</button>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/40 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <ArrowUpRight className="h-4 w-4 text-blue-600" strokeWidth={1.5} />
          <span className="text-[12px] font-medium text-[#07152F]">Client-Raised Tickets</span>
        </div>
        <p className="mt-1 text-[11px] text-[#6B7A99]">Tickets are created by clients from the Client Platform. The SaaS backend stores them and the Admin Platform manages resolution, assignment, and communication.</p>
      </div>

      {/* Ticket Detail Modal */}
      <TicketDetailModal
        ticket={selectedTicket as any}
        open={!!selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  )
}

function SummaryCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
      <div className="flex items-center gap-2.5 mb-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50">{icon}</div></div>
      <p className="text-[22px] font-bold text-slate-900">{value}</p>
      <p className="text-[12px] text-slate-500 mt-0.5">{label}</p>
    </div>
  )
}

export default TicketsPage
