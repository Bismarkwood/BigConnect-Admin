import { useState } from 'react'
import {
  X,
  CheckCircle2,
  UserPlus,
  MessageSquare,
  AlertCircle,
  ArrowUpRight,
  Clock,
  FileText,
  Send,
} from 'lucide-react'
import type { Ticket, TicketStatus } from '../types'

interface TicketDetailModalProps {
  ticket: Ticket | null
  open: boolean
  onClose: () => void
}

// Mock messages
const mockMessages = [
  { id: 'msg_1', senderName: 'Client User', senderType: 'client_user', message: 'Our WhatsApp channel stopped sending messages this morning. Customers are complaining.', visibility: 'client_visible', createdAt: 'Jun 16, 2026 · 10:30 AM' },
  { id: 'msg_2', senderName: 'David Mensah', senderType: 'admin_user', message: 'We are checking the WhatsApp webhook and channel connection. Will update shortly.', visibility: 'client_visible', createdAt: 'Jun 16, 2026 · 11:15 AM' },
  { id: 'msg_3', senderName: 'David Mensah', senderType: 'admin_user', message: 'Internal: WhatsApp provider callback URL is timing out. Need to check provider dashboard.', visibility: 'internal_only', createdAt: 'Jun 16, 2026 · 11:20 AM' },
]

const mockActivityLogs = [
  { action: 'Ticket created', actor: 'Client User', time: 'Jun 16, 2026 · 10:30 AM' },
  { action: 'Acknowledged', actor: 'David Mensah', time: 'Jun 16, 2026 · 10:45 AM' },
  { action: 'Assigned to David Mensah', actor: 'System', time: 'Jun 16, 2026 · 10:45 AM' },
  { action: 'Status changed to In Progress', actor: 'David Mensah', time: 'Jun 16, 2026 · 11:00 AM' },
  { action: 'Replied to client', actor: 'David Mensah', time: 'Jun 16, 2026 · 11:15 AM' },
]

type Tab = 'conversation' | 'activity' | 'notes'

function getActionButtons(status: TicketStatus) {
  switch (status) {
    case 'New': return ['Acknowledge', 'Assign', 'Reply', 'Escalate']
    case 'Open': return ['Reply', 'Assign', 'Request Info', 'Escalate']
    case 'In Progress': return ['Reply', 'Request Info', 'Escalate', 'Resolve']
    case 'Waiting for Client': return ['Reply', 'Escalate', 'Resolve']
    case 'Escalated': return ['Reply', 'Assign', 'Resolve']
    case 'Resolved': return ['Reply', 'Reopen', 'Close']
    case 'Closed': return ['Reopen']
    default: return ['Reply']
  }
}

function TicketDetailModal({ ticket, open, onClose }: TicketDetailModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('conversation')
  const [replyText, setReplyText] = useState('')

  if (!open || !ticket) return null

  const actions = getActionButtons(ticket.status)

  const statusColors: Record<string, string> = {
    'New': 'bg-blue-50 text-blue-700 border-blue-200',
    'Open': 'bg-blue-50 text-blue-700 border-blue-200',
    'In Progress': 'bg-amber-50 text-amber-700 border-amber-200',
    'Waiting for Client': 'bg-slate-100 text-slate-600 border-slate-200',
    'Escalated': 'bg-red-50 text-red-700 border-red-200',
    'Resolved': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Closed': 'bg-slate-100 text-slate-500 border-slate-200',
  }

  const priorityColors: Record<string, string> = {
    'Low': 'bg-slate-100 text-slate-600',
    'Medium': 'bg-amber-50 text-amber-700',
    'High': 'bg-red-50 text-red-700',
    'Critical': 'bg-red-100 text-red-700',
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#07152F]/20 backdrop-blur-sm">
      <div className="relative flex h-[90vh] w-[90vw] max-w-[1000px] flex-col overflow-hidden rounded-2xl border border-[#DDE6F5] bg-white">

        {/* Header */}
        <div className="flex-shrink-0 border-b border-[#DDE6F5] bg-[#F6F8FC] px-6 py-5">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-[#07152F]">{ticket.subject}</h3>
              <div className="mt-1.5 flex items-center gap-2 text-[12px] text-[#6B7A99]">
                <span className="font-mono">{ticket.id}</span>
                <span>·</span>
                <span>{ticket.clientName}</span>
                <span>·</span>
                <span>{ticket.category}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusColors[ticket.status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                  {ticket.status}
                </span>
                <span className={`rounded px-2 py-0.5 text-[10px] font-semibold ${priorityColors[ticket.priority] || 'bg-slate-100 text-slate-600'}`}>
                  {ticket.priority}
                </span>
                <span className="rounded bg-[#F3F7FF] px-2 py-0.5 text-[10px] font-medium text-blue-700">{ticket.source}</span>
              </div>
            </div>
            <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7A99] hover:bg-white">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex items-center gap-2 flex-wrap">
            {actions.includes('Acknowledge') && <ActionBtn icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Acknowledge" color="blue" />}
            {actions.includes('Assign') && <ActionBtn icon={<UserPlus className="h-3.5 w-3.5" />} label="Assign" />}
            {actions.includes('Reply') && <ActionBtn icon={<MessageSquare className="h-3.5 w-3.5" />} label="Reply" />}
            {actions.includes('Request Info') && <ActionBtn icon={<Clock className="h-3.5 w-3.5" />} label="Request Info" />}
            {actions.includes('Escalate') && <ActionBtn icon={<ArrowUpRight className="h-3.5 w-3.5" />} label="Escalate" color="red" />}
            {actions.includes('Resolve') && <ActionBtn icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Resolve" color="green" />}
            {actions.includes('Reopen') && <ActionBtn icon={<AlertCircle className="h-3.5 w-3.5" />} label="Reopen" color="amber" />}
            {actions.includes('Close') && <ActionBtn icon={<FileText className="h-3.5 w-3.5" />} label="Close" />}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 px-6 border-b border-[#DDE6F5]">
          <div className="flex gap-1 pt-2">
            {(['conversation', 'activity', 'notes'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-[12px] font-medium border-b-2 transition ${
                  activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-[#6B7A99] hover:text-[#07152F]'
                }`}
              >
                {tab === 'conversation' ? 'Conversation' : tab === 'activity' ? 'Activity Log' : 'Internal Notes'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {activeTab === 'conversation' && (
            <div className="space-y-4">
              {mockMessages.filter(m => m.visibility === 'client_visible').map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.senderType === 'admin_user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                    msg.senderType === 'admin_user' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {msg.senderName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`max-w-[70%] rounded-xl px-4 py-3 ${
                    msg.senderType === 'admin_user' ? 'bg-blue-50 border border-blue-100' : 'bg-[#F6F8FC] border border-[#DDE6F5]'
                  }`}>
                    <p className="text-[12px] font-medium text-[#07152F] mb-1">{msg.senderName}</p>
                    <p className="text-[12px] text-[#6B7A99] leading-relaxed">{msg.message}</p>
                    <p className="text-[10px] text-[#6B7A99] mt-2">{msg.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-3">
              {mockActivityLogs.map((log, i) => (
                <div key={i} className="flex items-start gap-3 border-b border-[#F3F7FF] pb-3 last:border-0">
                  <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                  <div className="flex-1">
                    <p className="text-[12px] text-[#07152F]">{log.action}</p>
                    <p className="text-[10px] text-[#6B7A99] mt-0.5">{log.actor} · {log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-3">
              {mockMessages.filter(m => m.visibility === 'internal_only').map((msg) => (
                <div key={msg.id} className="rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-3">
                  <p className="text-[12px] text-[#07152F]">{msg.message}</p>
                  <p className="text-[10px] text-[#6B7A99] mt-1.5">{msg.senderName} · {msg.createdAt}</p>
                </div>
              ))}
              {mockMessages.filter(m => m.visibility === 'internal_only').length === 0 && (
                <p className="text-[12px] text-[#6B7A99] text-center py-8">No internal notes yet</p>
              )}
            </div>
          )}
        </div>

        {/* Reply input */}
        <div className="flex-shrink-0 border-t border-[#DDE6F5] px-6 py-4 bg-[#F6F8FC]">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type a reply..."
              className="flex-1 rounded-lg border border-[#DDE6F5] bg-white px-4 py-2.5 text-[12px] text-[#07152F] outline-none focus:border-blue-600 placeholder:text-[#6B7A99]/60"
            />
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-blue-700">
              <Send className="h-3.5 w-3.5" strokeWidth={1.5} />Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActionBtn({ icon, label, color }: { icon: React.ReactNode; label: string; color?: string }) {
  const styles = {
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    green: 'bg-emerald-600 text-white hover:bg-emerald-700',
    red: 'border-red-200 text-red-600 hover:bg-red-50',
    amber: 'border-amber-200 text-amber-600 hover:bg-amber-50',
  }
  const base = color && color in styles
    ? styles[color as keyof typeof styles]
    : 'border-[#DDE6F5] text-[#6B7A99] hover:bg-slate-50'

  return (
    <button className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition ${base}`}>
      {icon}{label}
    </button>
  )
}

export default TicketDetailModal
