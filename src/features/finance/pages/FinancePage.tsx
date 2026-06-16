import { useState } from 'react'
import {
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Download,
  Eye,
  XCircle,
} from 'lucide-react'
import InvoicePreviewModal from '../components/InvoicePreviewModal'
import type { PaymentStatus, WebhookStatus } from '../types'

// Mock payments
const mockPayments = [
  { id: 'PAY-00128', clientName: 'KFC Ghana', planName: 'Enterprise', invoiceId: 'INV-00128', gateway: 'Paystack', amount: 'GHS 2,500', method: 'Mobile Money', status: 'Successful' as PaymentStatus, gatewayRef: 'PSK_A2X929', date: 'Jun 16, 2026', subStatus: 'Activated' },
  { id: 'PAY-00127', clientName: 'RightShop', planName: 'Standard', invoiceId: 'INV-00127', gateway: 'Paystack', amount: 'GHS 2,100', method: 'Mobile Money', status: 'Successful' as PaymentStatus, gatewayRef: 'PSK_B3Y830', date: 'Jun 16, 2026', subStatus: 'Activated' },
  { id: 'PAY-00126', clientName: 'Caddyman Logistics', planName: 'Premium', invoiceId: 'INV-00126', gateway: 'Hubtel', amount: 'GHS 2,500', method: 'Mobile Money', status: 'Successful' as PaymentStatus, gatewayRef: 'HBT_C4Z731', date: 'Jun 15, 2026', subStatus: 'Activated' },
  { id: 'PAY-00125', clientName: 'Bloom Advisors', planName: 'Starter', invoiceId: 'INV-00125', gateway: 'Paystack', amount: 'GHS 1,500', method: 'Bank Transfer', status: 'Pending' as PaymentStatus, gatewayRef: 'PSK_D5A632', date: 'Jun 15, 2026', subStatus: 'Pending Payment' },
  { id: 'PAY-00124', clientName: 'Hubtel Payments', planName: 'Standard', invoiceId: 'INV-00124', gateway: 'Paystack', amount: 'GHS 2,100', method: 'Mobile Money', status: 'Failed' as PaymentStatus, gatewayRef: 'PSK_E6B533', date: 'Jun 14, 2026', subStatus: 'Suspended' },
  { id: 'PAY-00123', clientName: 'Melcom Group', planName: 'Premium', invoiceId: 'INV-00123', gateway: 'Hubtel', amount: 'GHS 2,500', method: 'Mobile Money', status: 'Successful' as PaymentStatus, gatewayRef: 'HBT_F7C434', date: 'Jun 14, 2026', subStatus: 'Activated' },
  { id: 'PAY-00122', clientName: 'Jumia Support', planName: 'Enterprise', invoiceId: 'INV-00122', gateway: 'Paystack', amount: 'GHS 8,000', method: 'Bank Transfer', status: 'Successful' as PaymentStatus, gatewayRef: 'PSK_G8D335', date: 'Jun 13, 2026', subStatus: 'Activated' },
  { id: 'PAY-00121', clientName: 'Zeepay Africa', planName: 'Starter', invoiceId: 'INV-00121', gateway: 'Paystack', amount: 'GHS 1,500', method: 'Mobile Money', status: 'Expired' as PaymentStatus, gatewayRef: 'PSK_H9E236', date: 'Jun 12, 2026', subStatus: 'Expired' },
]

// Mock webhook logs
const mockWebhooks = [
  { id: 'WH-00195', gateway: 'Paystack', reference: 'PSK_A2X929', eventType: 'charge.success', status: 'Processed' as WebhookStatus, receivedAt: 'Jun 16, 2026 · 2:15 PM', processedAt: 'Jun 16, 2026 · 2:15 PM' },
  { id: 'WH-00194', gateway: 'Paystack', reference: 'PSK_B3Y830', eventType: 'charge.success', status: 'Processed' as WebhookStatus, receivedAt: 'Jun 16, 2026 · 1:42 PM', processedAt: 'Jun 16, 2026 · 1:42 PM' },
  { id: 'WH-00193', gateway: 'Hubtel', reference: 'HBT_C4Z731', eventType: 'payment.completed', status: 'Processed' as WebhookStatus, receivedAt: 'Jun 15, 2026 · 4:20 PM', processedAt: 'Jun 15, 2026 · 4:20 PM' },
  { id: 'WH-00192', gateway: 'Paystack', reference: 'PSK_E6B533', eventType: 'charge.failed', status: 'Processed' as WebhookStatus, receivedAt: 'Jun 14, 2026 · 11:30 AM', processedAt: 'Jun 14, 2026 · 11:30 AM' },
  { id: 'WH-00191', gateway: 'Paystack', reference: 'PSK_X9Z111', eventType: 'charge.success', status: 'Failed' as WebhookStatus, receivedAt: 'Jun 13, 2026 · 9:05 AM', processedAt: '—' },
]

const paymentStatusConfig: Record<PaymentStatus, { color: string; dot: string; bg: string }> = {
  'Pending': { color: 'text-amber-700', dot: 'bg-amber-500', bg: 'bg-amber-50' },
  'Processing': { color: 'text-blue-700', dot: 'bg-blue-500', bg: 'bg-blue-50' },
  'Successful': { color: 'text-emerald-700', dot: 'bg-emerald-500', bg: 'bg-emerald-50' },
  'Failed': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Cancelled': { color: 'text-slate-600', dot: 'bg-slate-400', bg: 'bg-slate-100' },
  'Refunded': { color: 'text-violet-700', dot: 'bg-violet-500', bg: 'bg-violet-50' },
  'Reversed': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Expired': { color: 'text-slate-500', dot: 'bg-slate-400', bg: 'bg-slate-100' },
}

const webhookStatusConfig: Record<WebhookStatus, { color: string; dot: string; bg: string }> = {
  'Received': { color: 'text-blue-700', dot: 'bg-blue-500', bg: 'bg-blue-50' },
  'Verified': { color: 'text-blue-700', dot: 'bg-blue-500', bg: 'bg-blue-50' },
  'Processed': { color: 'text-emerald-700', dot: 'bg-emerald-500', bg: 'bg-emerald-50' },
  'Failed': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Ignored': { color: 'text-slate-600', dot: 'bg-slate-400', bg: 'bg-slate-100' },
  'Duplicate': { color: 'text-amber-700', dot: 'bg-amber-500', bg: 'bg-amber-50' },
}

type Tab = 'payments' | 'webhooks'

function FinancePage() {
  const [activeTab, setActiveTab] = useState<Tab>('payments')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewInvoiceId, setViewInvoiceId] = useState<string | null>(null)

  const successful = mockPayments.filter((p) => p.status === 'Successful').length
  const pending = mockPayments.filter((p) => p.status === 'Pending').length
  const failed = mockPayments.filter((p) => p.status === 'Failed').length
  const totalRevenue = mockPayments.filter((p) => p.status === 'Successful').reduce((sum, p) => sum + parseInt(p.amount.replace(/[^\d]/g, '')), 0)

  const filteredPayments = mockPayments.filter((p) =>
    p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900">Finance</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">Monitor payments, invoices, and gateway transactions</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50">
          <Download className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
          Export Report
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryCard icon={<DollarSign className="h-[18px] w-[18px] text-emerald-600" strokeWidth={1.5} />} value={`GHS ${totalRevenue.toLocaleString()}`} label="Total Revenue" />
        <SummaryCard icon={<CheckCircle2 className="h-[18px] w-[18px] text-emerald-600" strokeWidth={1.5} />} value={String(successful)} label="Successful" />
        <SummaryCard icon={<Clock className="h-[18px] w-[18px] text-amber-600" strokeWidth={1.5} />} value={String(pending)} label="Pending" />
        <SummaryCard icon={<XCircle className="h-[18px] w-[18px] text-red-500" strokeWidth={1.5} />} value={String(failed)} label="Failed" />
      </div>

      {/* Tabs */}
      <div className="inline-flex items-center gap-1 rounded-xl bg-[#F3F7FF] p-1">
        <button onClick={() => setActiveTab('payments')} className={`rounded-lg px-4 py-2 text-[12px] font-medium transition ${activeTab === 'payments' ? 'bg-blue-600 text-white' : 'text-[#6B7A99] hover:text-[#07152F]'}`}>
          Payments
        </button>
        <button onClick={() => setActiveTab('webhooks')} className={`rounded-lg px-4 py-2 text-[12px] font-medium transition ${activeTab === 'webhooks' ? 'bg-blue-600 text-white' : 'text-[#6B7A99] hover:text-[#07152F]'}`}>
          Webhook Logs
        </button>
      </div>

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 w-72">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search payment or client..." className="flex-1 bg-transparent text-[13px] text-slate-900 outline-none placeholder:text-slate-400" />
            </div>
            <span className="text-[12px] text-slate-400">{filteredPayments.length} payments</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Payment ID</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Client</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Plan</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Gateway</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Amount</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Method</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Reference</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Date</th>
                  <th className="w-16 px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => {
                  const sc = paymentStatusConfig[payment.status]
                  return (
                    <tr key={payment.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition">
                      <td className="px-6 py-4 text-[12px] font-medium text-blue-600">{payment.id}</td>
                      <td className="px-4 py-4 text-[12px] font-medium text-slate-900">{payment.clientName}</td>
                      <td className="px-4 py-4"><span className="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[9px] font-medium text-slate-700">{payment.planName}</span></td>
                      <td className="px-4 py-4 text-[11px] text-slate-600">{payment.gateway}</td>
                      <td className="px-4 py-4 text-[12px] font-semibold text-slate-900">{payment.amount}</td>
                      <td className="px-4 py-4 text-[11px] text-slate-600">{payment.method}</td>
                      <td className="px-4 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.color}`}><span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />{payment.status}</span></td>
                      <td className="px-4 py-4 text-[10px] font-mono text-slate-500">{payment.gatewayRef}</td>
                      <td className="px-4 py-4 text-[11px] text-slate-500">{payment.date}</td>
                      <td className="px-4 py-4"><button onClick={() => setViewInvoiceId(payment.invoiceId)} className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Eye className="h-3.5 w-3.5" strokeWidth={1.5} /></button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Webhook Logs Tab */}
      {activeTab === 'webhooks' && (
        <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <p className="text-[13px] font-semibold text-slate-900">Webhook Events</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Events received from payment providers</p>
            </div>
            <span className="text-[12px] text-slate-400">{mockWebhooks.length} events</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Event ID</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Gateway</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Reference</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Event Type</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Received</th>
                  <th className="w-16 px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {mockWebhooks.map((wh) => {
                  const sc = webhookStatusConfig[wh.status]
                  return (
                    <tr key={wh.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition">
                      <td className="px-6 py-4 text-[12px] font-medium text-slate-700">{wh.id}</td>
                      <td className="px-4 py-4 text-[12px] text-slate-600">{wh.gateway}</td>
                      <td className="px-4 py-4 text-[10px] font-mono text-slate-500">{wh.reference}</td>
                      <td className="px-4 py-4"><span className="rounded bg-slate-50 border border-slate-200 px-1.5 py-0.5 text-[10px] font-mono text-slate-700">{wh.eventType}</span></td>
                      <td className="px-4 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.color}`}><span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />{wh.status}</span></td>
                      <td className="px-4 py-4 text-[11px] text-slate-500">{wh.receivedAt}</td>
                      <td className="px-4 py-4"><button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Eye className="h-3.5 w-3.5" strokeWidth={1.5} /></button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Info banner */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/40 px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="h-4 w-4 text-blue-600" strokeWidth={1.5} />
          <span className="text-[12px] font-medium text-[#07152F]">Fully API-Driven</span>
        </div>
        <p className="mt-1 text-[11px] text-[#6B7A99]">Payments are processed through third-party gateways (Paystack, Hubtel). The SaaS backend verifies each transaction via webhook before updating records. No manual payment confirmation is needed.</p>
      </div>

      {/* Invoice Preview Modal */}
      <InvoicePreviewModal
        invoiceId={viewInvoiceId}
        open={!!viewInvoiceId}
        onClose={() => setViewInvoiceId(null)}
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

export default FinancePage
