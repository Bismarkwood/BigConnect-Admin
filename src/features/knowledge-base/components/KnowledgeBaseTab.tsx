import { useState } from 'react'
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Bot,
} from 'lucide-react'
import type { KBStatus } from '../types'

// Mock data — will be replaced with fetchKBItems(clientId)
const mockKBItems = [
  { id: 'kb_001', title: 'KFC Menu & Pricing', type: 'PDF Document', status: 'Published' as KBStatus, linkedAgent: 'KFC Support Assistant', source: 'Client Upload', uploadedBy: 'Client Admin', lastUpdated: 'Jun 12, 2026' },
  { id: 'kb_002', title: 'Opening Hours & Locations', type: 'Manual Text Entry', status: 'Published' as KBStatus, linkedAgent: 'KFC Support Assistant', source: 'Manual Entry', uploadedBy: 'David Mensah', lastUpdated: 'Jun 10, 2026' },
  { id: 'kb_003', title: 'Delivery Policy', type: 'Policy Document', status: 'Published' as KBStatus, linkedAgent: 'KFC Support Assistant', source: 'Client Upload', uploadedBy: 'Client Admin', lastUpdated: 'Jun 8, 2026' },
  { id: 'kb_004', title: 'Customer FAQ', type: 'FAQ', status: 'Approved' as KBStatus, linkedAgent: 'KFC Support Assistant', source: 'Manual Entry', uploadedBy: 'David Mensah', lastUpdated: 'Jun 14, 2026' },
  { id: 'kb_005', title: 'Promotions June 2026', type: 'CSV File', status: 'Processing' as KBStatus, linkedAgent: 'KFC Support Assistant', source: 'Client Upload', uploadedBy: 'Client Admin', lastUpdated: 'Jun 16, 2026' },
  { id: 'kb_006', title: 'Complaint Handling Guide', type: 'Word Document', status: 'Ready for Review' as KBStatus, linkedAgent: 'KFC Support Assistant', source: 'Client Upload', uploadedBy: 'Client Admin', lastUpdated: 'Jun 15, 2026' },
  { id: 'kb_007', title: 'Old Menu (2025)', type: 'PDF Document', status: 'Archived' as KBStatus, linkedAgent: 'KFC Support Assistant', source: 'Client Upload', uploadedBy: 'Client Admin', lastUpdated: 'Mar 1, 2026' },
  { id: 'kb_008', title: 'Branch Contacts', type: 'Branch / Location Info', status: 'Failed' as KBStatus, linkedAgent: 'KFC Support Assistant', source: 'CSV Import', uploadedBy: 'System', lastUpdated: 'Jun 14, 2026' },
]

const statusConfig: Record<KBStatus, { color: string; dot: string; bg: string }> = {
  'Draft': { color: 'text-slate-600', dot: 'bg-slate-400', bg: 'bg-slate-50' },
  'Processing': { color: 'text-blue-700', dot: 'bg-blue-500', bg: 'bg-blue-50' },
  'Ready for Review': { color: 'text-amber-700', dot: 'bg-amber-500', bg: 'bg-amber-50' },
  'Approved': { color: 'text-violet-700', dot: 'bg-violet-500', bg: 'bg-violet-50' },
  'Published': { color: 'text-emerald-700', dot: 'bg-emerald-500', bg: 'bg-emerald-50' },
  'Failed': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Archived': { color: 'text-slate-500', dot: 'bg-slate-400', bg: 'bg-slate-100' },
}

interface KnowledgeBaseTabProps {
  clientId: string
}

function KnowledgeBaseTab({ clientId: _clientId }: KnowledgeBaseTabProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const published = mockKBItems.filter((i) => i.status === 'Published').length
  const processing = mockKBItems.filter((i) => i.status === 'Processing').length
  const failed = mockKBItems.filter((i) => i.status === 'Failed').length

  const filtered = mockKBItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-5">
      {/* Summary strip */}
      <div className="grid grid-cols-5 gap-3">
        <SummaryCard label="Total Items" value={String(mockKBItems.length)} icon={<FileText className="h-4 w-4 text-blue-600" strokeWidth={1.5} />} />
        <SummaryCard label="Published" value={String(published)} icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" strokeWidth={1.5} />} />
        <SummaryCard label="Processing" value={String(processing)} icon={<Clock className="h-4 w-4 text-blue-600" strokeWidth={1.5} />} />
        <SummaryCard label="Failed" value={String(failed)} icon={<AlertCircle className="h-4 w-4 text-red-500" strokeWidth={1.5} />} />
        <SummaryCard label="Health" value="Healthy" icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" strokeWidth={1.5} />} highlight />
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
              placeholder="Search content..."
              className="flex-1 bg-transparent text-[12px] text-[#07152F] outline-none placeholder:text-[#6B7A99]/60"
            />
          </div>
          <span className="text-[11px] text-[#6B7A99]">{filtered.length} items</span>
        </div>

        {/* Table content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#DDE6F5]">
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Content</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Type</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Status</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Linked Agent</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Updated</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const sc = statusConfig[item.status]
                return (
                  <tr key={item.id} className="border-b border-[#F3F7FF] last:border-0 hover:bg-[#F3F7FF]/50 transition">
                    <td className="px-5 py-3.5">
                      <p className="text-[12px] font-medium text-[#07152F]">{item.title}</p>
                      <p className="text-[10px] text-[#6B7A99] mt-0.5">{item.source} · {item.uploadedBy}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex rounded-md bg-[#F3F7FF] px-2 py-0.5 text-[10px] font-medium text-blue-700">
                        {item.type}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                        {item.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <Bot className="h-3 w-3 text-violet-500" strokeWidth={1.5} />
                        <span className="text-[11px] text-[#07152F]">{item.linkedAgent}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[11px] text-[#6B7A99]">{item.lastUpdated}</td>
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

function SummaryCard({ label, value, icon, highlight }: { label: string; value: string; icon: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`rounded-xl border p-3.5 ${highlight ? 'border-emerald-200 bg-emerald-50/50' : 'border-[#DDE6F5] bg-white'}`}>
      <div className="flex items-center gap-2 mb-2">{icon}<span className="text-[10px] text-[#6B7A99]">{label}</span></div>
      <p className={`text-[16px] font-bold ${highlight ? 'text-emerald-700' : 'text-[#07152F]'}`}>{value}</p>
    </div>
  )
}

export default KnowledgeBaseTab
