import { useState } from 'react'
import {
  Phone,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Mic,
} from 'lucide-react'
import type { CallStatus, CallDirection } from '../types'

// Mock data — will be replaced with fetchCallLogs(clientId)
const mockCallLogs = [
  { id: 'call_001', caller: '+233 24 555 1234', callerName: 'Kwame Asante', direction: 'Inbound' as CallDirection, status: 'Completed' as CallStatus, duration: '4:32', agent: 'KFC Support Assistant', channel: 'Voice', date: 'Jun 16, 2026', time: '2:45 PM', recording: true },
  { id: 'call_002', caller: '+233 20 888 5678', callerName: 'Ama Mensah', direction: 'Inbound' as CallDirection, status: 'Completed' as CallStatus, duration: '2:15', agent: 'KFC Support Assistant', channel: 'Voice', date: 'Jun 16, 2026', time: '1:30 PM', recording: true },
  { id: 'call_003', caller: '+233 55 222 9012', callerName: undefined, direction: 'Inbound' as CallDirection, status: 'Missed' as CallStatus, duration: '0:00', agent: 'KFC Support Assistant', channel: 'Voice', date: 'Jun 16, 2026', time: '12:18 PM', recording: false },
  { id: 'call_004', caller: '+233 27 444 3456', callerName: 'Kofi Boateng', direction: 'Outbound' as CallDirection, status: 'Completed' as CallStatus, duration: '6:48', agent: 'KFC Support Assistant', channel: 'Voice', date: 'Jun 15, 2026', time: '4:20 PM', recording: true },
  { id: 'call_005', caller: '+233 50 111 7890', callerName: undefined, direction: 'Inbound' as CallDirection, status: 'Failed' as CallStatus, duration: '0:00', agent: 'KFC Support Assistant', channel: 'Voice', date: 'Jun 15, 2026', time: '3:05 PM', recording: false },
  { id: 'call_006', caller: '+233 24 666 2345', callerName: 'Abena Osei', direction: 'Inbound' as CallDirection, status: 'Completed' as CallStatus, duration: '3:22', agent: 'KFC Support Assistant', channel: 'Voice', date: 'Jun 15, 2026', time: '11:45 AM', recording: true },
  { id: 'call_007', caller: '+233 20 333 6789', callerName: 'Yaw Darko', direction: 'Outbound' as CallDirection, status: 'Completed' as CallStatus, duration: '1:55', agent: 'KFC Support Assistant', channel: 'Voice', date: 'Jun 14, 2026', time: '10:30 AM', recording: true },
  { id: 'call_008', caller: '+233 55 777 0123', callerName: undefined, direction: 'Inbound' as CallDirection, status: 'Voicemail' as CallStatus, duration: '0:45', agent: 'KFC Support Assistant', channel: 'Voice', date: 'Jun 14, 2026', time: '9:15 AM', recording: true },
]

const statusConfig: Record<CallStatus, { color: string; dot: string; bg: string }> = {
  'Incoming': { color: 'text-blue-700', dot: 'bg-blue-500', bg: 'bg-blue-50' },
  'In Progress': { color: 'text-blue-700', dot: 'bg-blue-500', bg: 'bg-blue-50' },
  'Completed': { color: 'text-emerald-700', dot: 'bg-emerald-500', bg: 'bg-emerald-50' },
  'Missed': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Failed': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Escalated': { color: 'text-amber-700', dot: 'bg-amber-500', bg: 'bg-amber-50' },
  'Voicemail': { color: 'text-amber-700', dot: 'bg-amber-500', bg: 'bg-amber-50' },
  'Abandoned': { color: 'text-slate-600', dot: 'bg-slate-400', bg: 'bg-slate-100' },
  'Archived': { color: 'text-slate-500', dot: 'bg-slate-400', bg: 'bg-slate-100' },
}

interface CallLogsTabProps {
  clientId: string
}

function CallLogsTab({ clientId }: CallLogsTabProps) {
  void clientId
  const [searchQuery, setSearchQuery] = useState('')

  const completed = mockCallLogs.filter((c) => c.status === 'Completed').length
  const missed = mockCallLogs.filter((c) => c.status === 'Missed').length
  const failed = mockCallLogs.filter((c) => c.status === 'Failed').length

  const filtered = mockCallLogs.filter((log) =>
    log.caller.includes(searchQuery) ||
    (log.callerName && log.callerName.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-5 gap-3">
        <SummaryCard label="Total Calls" value={String(mockCallLogs.length)} icon={<Phone className="h-3.5 w-3.5" />} accentColor="blue" />
        <SummaryCard label="Completed" value={String(completed)} icon={<CheckCircle2 className="h-3.5 w-3.5" />} accentColor="emerald" />
        <SummaryCard label="Missed" value={String(missed)} icon={<PhoneMissed className="h-3.5 w-3.5" />} accentColor="rose" />
        <SummaryCard label="Failed" value={String(failed)} icon={<XCircle className="h-3.5 w-3.5" />} accentColor="rose" />
        <SummaryCard label="Avg Duration" value="3:42" icon={<Clock className="h-3.5 w-3.5" />} accentColor="slate" />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-[#DDE6F5] overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between bg-[#F3F7FF] px-5 py-3.5 border-b border-[#DDE6F5]">
          <div className="flex items-center gap-2 rounded-lg border border-[#DDE6F5] bg-white px-3 py-2 w-64">
            <Search className="h-3.5 w-3.5 text-[#6B7A99]" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by number or name..."
              className="flex-1 bg-transparent text-[12px] text-[#07152F] outline-none placeholder:text-[#6B7A99]/60"
            />
          </div>
          <span className="text-[11px] text-[#6B7A99]">{filtered.length} calls</span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#DDE6F5]">
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Caller</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Direction</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Status</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Duration</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Agent</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Date & Time</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Recording</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((log) => {
                const sc = statusConfig[log.status]
                return (
                  <tr key={log.id} className="border-b border-[#F3F7FF] last:border-0 hover:bg-[#F3F7FF]/50 transition">
                    <td className="px-5 py-3.5">
                      <p className="text-[12px] font-medium text-[#07152F]">{log.callerName || log.caller}</p>
                      {log.callerName && <p className="text-[10px] text-[#6B7A99] mt-0.5">{log.caller}</p>}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        {log.direction === 'Inbound' ? (
                          <PhoneIncoming className="h-3.5 w-3.5 text-blue-600" strokeWidth={1.5} />
                        ) : (
                          <PhoneOutgoing className="h-3.5 w-3.5 text-violet-600" strokeWidth={1.5} />
                        )}
                        <span className="text-[11px] text-[#07152F]">{log.direction}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                        {log.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] font-mono text-[#07152F]">{log.duration}</span>
                    </td>
                    <td className="px-5 py-3.5 text-[11px] text-[#6B7A99]">{log.agent}</td>
                    <td className="px-5 py-3.5">
                      <p className="text-[11px] text-[#07152F]">{log.date}</p>
                      <p className="text-[10px] text-[#6B7A99]">{log.time}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      {log.recording ? (
                        <Mic className="h-3.5 w-3.5 text-emerald-600" strokeWidth={1.5} />
                      ) : (
                        <span className="text-[10px] text-[#6B7A99]">—</span>
                      )}
                    </td>
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

export default CallLogsTab
