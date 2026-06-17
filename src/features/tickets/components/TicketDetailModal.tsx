import { useState, useEffect } from 'react'
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
import type { Ticket, TicketStatus, TicketMessage } from '../types'

interface TicketDetailModalProps {
  ticket: Ticket | null
  open: boolean
  onClose: () => void
  onUpdateTicket?: (updatedTicket: Ticket) => void
}

// Initial mock messages map by ticket ID to keep conversations persistent per session
const initialMessagesMap: Record<string, TicketMessage[]> = {
  'TCK-2026-000124': [
    { id: 'msg_1', ticketId: 'TCK-2026-000124', senderId: 'client', senderName: 'Client User', senderType: 'client_user', message: 'Our WhatsApp channel stopped sending messages this morning. Customers are complaining.', visibility: 'client_visible', createdAt: 'Jun 16, 2026 · 10:30 AM' }
  ],
  'TCK-2026-000123': [
    { id: 'msg_1', ticketId: 'TCK-2026-000123', senderId: 'client', senderName: 'KFC Ghana Admin', senderType: 'client_user', message: 'AI agent giving incorrect answers about menu. It said KFC offers pizza which we do not.', visibility: 'client_visible', createdAt: 'Jun 15, 2026 · 02:15 PM' },
    { id: 'msg_2', ticketId: 'TCK-2026-000123', senderId: 'admin', senderName: 'David Mensah', senderType: 'admin_user', message: 'We are checking the knowledge base source documents. Will update shortly.', visibility: 'client_visible', createdAt: 'Jun 15, 2026 · 03:00 PM' }
  ],
}

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

function TicketDetailModal({ ticket, open, onClose, onUpdateTicket }: TicketDetailModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('conversation')
  const [replyText, setReplyText] = useState('')
  const [messages, setMessages] = useState<TicketMessage[]>([])
  const [activityLogs, setActivityLogs] = useState<{ action: string; actor: string; time: string }[]>([])

  // Load / initialize ticket-specific messages and activity logs
  useEffect(() => {
    if (ticket) {
      // Load messages
      const existing = initialMessagesMap[ticket.id] || [
        { id: 'msg_default', ticketId: ticket.id, senderId: 'client', senderName: 'Client User', senderType: 'client_user', message: ticket.description || 'No description provided.', visibility: 'client_visible', createdAt: ticket.createdAt + ' · 10:00 AM' }
      ]
      setMessages(existing)

      // Load activity logs
      setActivityLogs([
        { action: 'Ticket created', actor: 'Client User', time: ticket.createdAt + ' · 10:00 AM' },
        { action: `Status initialized as ${ticket.status}`, actor: 'System', time: ticket.createdAt + ' · 10:05 AM' }
      ])
    }
  }, [ticket])

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

  const handleAction = (action: string) => {
    let nextStatus: TicketStatus = ticket.status
    let logMsg = ''

    switch (action) {
      case 'Acknowledge':
        nextStatus = 'Open'
        logMsg = 'Acknowledged ticket and set status to Open'
        break
      case 'Assign':
        nextStatus = 'In Progress'
        logMsg = 'Assigned ticket to David Mensah'
        break
      case 'Resolve':
        nextStatus = 'Resolved'
        logMsg = 'Resolved ticket'
        break
      case 'Close':
        nextStatus = 'Closed'
        logMsg = 'Closed ticket'
        break
      case 'Reopen':
        nextStatus = 'Open'
        logMsg = 'Reopened ticket'
        break
      case 'Escalate':
        nextStatus = 'Escalated'
        logMsg = 'Escalated ticket'
        break
      case 'Request Info':
        nextStatus = 'Waiting for Client'
        logMsg = 'Requested more information from client'
        break
      default:
        return
    }

    const updated: Ticket = {
      ...ticket,
      status: nextStatus,
      assignedTo: action === 'Assign' ? 'David Mensah' : ticket.assignedTo,
      lastUpdated: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    // Update parent list
    if (onUpdateTicket) {
      onUpdateTicket(updated)
    }

    // Add log
    const nowStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    setActivityLogs(prev => [
      ...prev,
      { action: logMsg, actor: 'David Mensah (Admin)', time: `${todayStr} · ${nowStr}` }
    ])
  }

  const handleSend = () => {
    if (!replyText.trim()) return

    const nowStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    const newMsg: TicketMessage = {
      id: `msg_${Date.now()}`,
      ticketId: ticket.id,
      senderId: 'admin_david',
      senderName: 'David Mensah',
      senderType: 'admin_user',
      message: replyText,
      visibility: activeTab === 'notes' ? 'internal_only' : 'client_visible',
      createdAt: `${todayStr} · ${nowStr}`
    }

    // Add message
    const updatedMsgs = [...messages, newMsg]
    setMessages(updatedMsgs)
    initialMessagesMap[ticket.id] = updatedMsgs

    // Add activity log
    const logAction = activeTab === 'notes' ? 'Added internal note' : 'Replied to client'
    setActivityLogs(prev => [
      ...prev,
      { action: logAction, actor: 'David Mensah (Admin)', time: `${todayStr} · ${nowStr}` }
    ])

    // If we sent a reply to client and the status is New or Open, let's mark it as In Progress or update it
    if (activeTab === 'conversation' && (ticket.status === 'New' || ticket.status === 'Open')) {
      const updated: Ticket = {
        ...ticket,
        status: 'In Progress',
        assignedTo: ticket.assignedTo === 'Unassigned' ? 'David Mensah' : ticket.assignedTo,
        lastUpdated: todayStr
      }
      if (onUpdateTicket) {
        onUpdateTicket(updated)
      }
    }

    setReplyText('')
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
            {actions.includes('Acknowledge') && <ActionBtn icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Acknowledge" color="blue" onClick={() => handleAction('Acknowledge')} />}
            {actions.includes('Assign') && <ActionBtn icon={<UserPlus className="h-3.5 w-3.5" />} label="Assign" onClick={() => handleAction('Assign')} />}
            {actions.includes('Reply') && <ActionBtn icon={<MessageSquare className="h-3.5 w-3.5" />} label="Reply" onClick={() => setActiveTab('conversation')} />}
            {actions.includes('Request Info') && <ActionBtn icon={<Clock className="h-3.5 w-3.5" />} label="Request Info" onClick={() => handleAction('Request Info')} />}
            {actions.includes('Escalate') && <ActionBtn icon={<ArrowUpRight className="h-3.5 w-3.5" />} label="Escalate" color="red" onClick={() => handleAction('Escalate')} />}
            {actions.includes('Resolve') && <ActionBtn icon={<CheckCircle2 className="h-3.5 w-3.5" />} label="Resolve" color="green" onClick={() => handleAction('Resolve')} />}
            {actions.includes('Reopen') && <ActionBtn icon={<AlertCircle className="h-3.5 w-3.5" />} label="Reopen" color="amber" onClick={() => handleAction('Reopen')} />}
            {actions.includes('Close') && <ActionBtn icon={<FileText className="h-3.5 w-3.5" />} label="Close" onClick={() => handleAction('Close')} />}
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
              {messages.filter(m => m.visibility === 'client_visible').map((msg) => (
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
                    <p className="text-[12px] text-[#6B7A99] leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                    <p className="text-[10px] text-[#6B7A99] mt-2">{msg.createdAt}</p>
                  </div>
                </div>
              ))}
              {messages.filter(m => m.visibility === 'client_visible').length === 0 && (
                <p className="text-[12px] text-[#6B7A99] text-center py-8">No messages yet</p>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-3">
              {activityLogs.map((log, i) => (
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
              {messages.filter(m => m.visibility === 'internal_only').map((msg) => (
                <div key={msg.id} className="rounded-lg border border-amber-200 bg-amber-50/50 px-4 py-3">
                  <p className="text-[12px] text-[#07152F] whitespace-pre-wrap">{msg.message}</p>
                  <p className="text-[10px] text-[#6B7A99] mt-1.5">{msg.senderName} · {msg.createdAt}</p>
                </div>
              ))}
              {messages.filter(m => m.visibility === 'internal_only').length === 0 && (
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
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend() }}
              placeholder={activeTab === 'notes' ? "Type an internal note..." : "Type a reply to the client..."}
              className="flex-1 rounded-lg border border-[#DDE6F5] bg-white px-4 py-2.5 text-[12px] text-[#07152F] outline-none focus:border-blue-600 placeholder:text-[#6B7A99]/60"
            />
            <button onClick={handleSend} className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-[11px] font-semibold text-white hover:bg-blue-700">
              <Send className="h-3.5 w-3.5" strokeWidth={1.5} />Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ActionBtn({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color?: string; onClick?: () => void }) {
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
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-medium transition ${base}`}>
      {icon}{label}
    </button>
  )
}

export default TicketDetailModal
