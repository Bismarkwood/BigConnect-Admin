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
  Loader2,
} from 'lucide-react'
import InvoicePreviewModal from '../components/InvoicePreviewModal'
import ExportReportModal, { type ExportReportPayload } from '../components/ExportReportModal'
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

interface ExportHistoryItem {
  id: string
  name: string
  type: string
  format: 'PDF' | 'Excel'
  period: string
  generatedBy: string
  status: 'Processing' | 'Ready' | 'Failed' | 'Expired'
  generatedAt: string
}

const initialHistory: ExportHistoryItem[] = [
  { id: 'RPT-001', name: 'Payments Report Q2', type: 'Payments Report', format: 'Excel', period: 'Last 3 Months', generatedBy: 'David Mensah', status: 'Ready', generatedAt: 'Jun 17, 2026 · 2:30 PM' },
  { id: 'RPT-002', name: 'Finance Summary May', type: 'Finance Summary Report', format: 'PDF', period: 'Custom: May 1 - May 31', generatedBy: 'David Mensah', status: 'Ready', generatedAt: 'Jun 05, 2026 · 11:15 AM' },
  { id: 'RPT-003', name: 'Reconciliation Report', type: 'Reconciliation Report', format: 'Excel', period: 'Last 1 Month', generatedBy: 'Grace Tetteh', status: 'Expired', generatedAt: 'May 31, 2026 · 4:00 PM' }
]

type Tab = 'payments' | 'webhooks' | 'history'

function FinancePage() {
  const [activeTab, setActiveTab] = useState<Tab>('payments')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewInvoiceId, setViewInvoiceId] = useState<string | null>(null)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [exportHistory, setExportHistory] = useState<ExportHistoryItem[]>(initialHistory)

  const successful = mockPayments.filter((p) => p.status === 'Successful').length
  const pending = mockPayments.filter((p) => p.status === 'Pending').length
  const failed = mockPayments.filter((p) => p.status === 'Failed').length
  const totalRevenue = mockPayments.filter((p) => p.status === 'Successful').reduce((sum, p) => sum + parseInt(p.amount.replace(/[^\d]/g, '')), 0)

  const filteredPayments = mockPayments.filter((p) =>
    p.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleGenerateReport = (payload: ExportReportPayload) => {
    const reportTypeLabel = {
      finance_summary: 'Finance Summary Report',
      payments: 'Payments Report',
      invoices: 'Invoices Report',
      receipts: 'Receipts Report',
      failed_payments: 'Failed Payments Report',
      gateway_transactions: 'Gateway Transactions Report',
      reconciliation: 'Reconciliation Report',
      subscription_revenue: 'Subscription Revenue Report'
    }[payload.reportType] || 'Finance Report'

    const datePeriodLabel = {
      today: 'Today',
      custom_date: payload.customDate ? `Custom: ${payload.customDate}` : 'Custom Date',
      date_range: payload.startDate && payload.endDate ? `${payload.startDate} to ${payload.endDate}` : 'Date Range',
      last_1_month: 'Last 1 Month',
      last_3_months: 'Last 3 Months',
      last_6_months: 'Last 6 Months'
    }[payload.datePreset]

    const newReportId = `RPT-00${exportHistory.length + 1}`
    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

    const newReport: ExportHistoryItem = {
      id: newReportId,
      name: `${reportTypeLabel} ${datePeriodLabel}`,
      type: reportTypeLabel,
      format: payload.format === 'pdf' ? 'PDF' : 'Excel',
      period: datePeriodLabel,
      generatedBy: 'David Mensah',
      status: 'Processing',
      generatedAt: `${todayStr} · ${timeStr}`
    }

    setExportHistory(prev => [newReport, ...prev])
    setActiveTab('history')

    // Simulate async backend report generation
    setTimeout(() => {
      setExportHistory(prev =>
        prev.map(item => item.id === newReportId ? { ...item, status: 'Ready' } : item)
      )
    }, 2500)
  }

  const handleDownloadReport = (item: ExportHistoryItem) => {
    if (item.format === 'PDF') {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${item.name}</title>
              <style>
                body { font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 40px; color: #07152F; background-color: #ffffff; }
                .header { border-bottom: 2px solid #07152F; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-start; }
                .logo { font-size: 24px; font-weight: 800; color: #1e4ed8; text-transform: uppercase; letter-spacing: 1px; }
                .report-title { font-size: 20px; font-weight: 700; margin-top: 5px; color: #07152F; }
                .metadata { font-size: 11px; text-align: right; color: #6B7A99; line-height: 1.6; }
                .summary-grid { display: grid; grid-template-cols: repeat(3, 1fr); gap: 15px; margin-bottom: 40px; }
                .summary-card { background: #F8FAFC; border: 1px solid #E2E8F0; padding: 15px; border-radius: 8px; }
                .summary-label { font-size: 9px; font-weight: 700; text-transform: uppercase; color: #6B7A99; letter-spacing: 0.5px; }
                .summary-value { font-size: 18px; font-weight: 800; color: #07152F; margin-top: 5px; }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th { background-color: #07152F; color: #ffffff; font-size: 10px; font-weight: 700; text-transform: uppercase; text-align: left; padding: 10px 12px; border: 1px solid #07152F; }
                td { padding: 10px 12px; border-bottom: 1px solid #E2E8F0; font-size: 11px; color: #07152F; }
                tr:nth-child(even) td { background-color: #F8FAFC; }
                .status-badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: 700; }
                .status-successful { background-color: #DEF7EC; color: #03543F; }
                .status-pending { background-color: #FEF08A; color: #713F12; }
                .status-failed { background-color: #FDE8E8; color: #9B1C1C; }
                .footer { border-top: 1px solid #E2E8F0; padding-top: 20px; margin-top: 50px; font-size: 9px; color: #6B7A99; display: flex; justify-content: space-between; }
                @media print {
                  body { padding: 20px; }
                  button { display: none; }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <div>
                  <div class="logo">BigConnect AI</div>
                  <div class="report-title">${item.type}</div>
                </div>
                <div class="metadata">
                  <div><strong>Period:</strong> ${item.period}</div>
                  <div><strong>Generated By:</strong> ${item.generatedBy} (Finance Admin)</div>
                  <div><strong>Generated At:</strong> ${item.generatedAt}</div>
                </div>
              </div>

              <div class="summary-grid">
                <div class="summary-card">
                  <div class="summary-label">Total Revenue</div>
                  <div class="summary-value">GHS 17,700</div>
                </div>
                <div class="summary-card">
                  <div class="summary-label">Successful Payments</div>
                  <div class="summary-value">5</div>
                </div>
                <div class="summary-card">
                  <div class="summary-label">Failed Payments</div>
                  <div class="summary-value">1</div>
                </div>
                <div class="summary-card">
                  <div class="summary-label">Pending Payments</div>
                  <div class="summary-value">1</div>
                </div>
                <div class="summary-card">
                  <div class="summary-label">Active Subscriptions</div>
                  <div class="summary-value">5</div>
                </div>
                <div class="summary-card">
                  <div class="summary-label">Refunded Amount</div>
                  <div class="summary-value">GHS 0.00</div>
                </div>
              </div>

              <div class="report-title" style="font-size: 14px; margin-bottom: 10px;">Transactions List</div>
              <table>
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Client</th>
                    <th>Plan</th>
                    <th>Gateway</th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Reference</th>
                    <th>Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PAY-00128</td>
                    <td>KFC Ghana</td>
                    <td>Enterprise</td>
                    <td>Paystack</td>
                    <td>Mobile Money</td>
                    <td>GHS 2,500</td>
                    <td><span class="status-badge status-successful">Successful</span></td>
                    <td>PSK_A2X929</td>
                    <td>Jun 16, 2026</td>
                  </tr>
                  <tr>
                    <td>PAY-00127</td>
                    <td>RightShop</td>
                    <td>Standard</td>
                    <td>Paystack</td>
                    <td>Mobile Money</td>
                    <td>GHS 2,100</td>
                    <td><span class="status-badge status-successful">Successful</span></td>
                    <td>PSK_B3Y830</td>
                    <td>Jun 16, 2026</td>
                  </tr>
                  <tr>
                    <td>PAY-00126</td>
                    <td>Caddyman Logistics</td>
                    <td>Premium</td>
                    <td>Hubtel</td>
                    <td>Mobile Money</td>
                    <td>GHS 2,500</td>
                    <td><span class="status-badge status-successful">Successful</span></td>
                    <td>HBT_C4Z731</td>
                    <td>Jun 15, 2026</td>
                  </tr>
                  <tr>
                    <td>PAY-00125</td>
                    <td>Bloom Advisors</td>
                    <td>Starter</td>
                    <td>Paystack</td>
                    <td>Bank Transfer</td>
                    <td>GHS 1,500</td>
                    <td><span class="status-badge status-pending">Pending</span></td>
                    <td>PSK_D5A632</td>
                    <td>Jun 15, 2026</td>
                  </tr>
                  <tr>
                    <td>PAY-00124</td>
                    <td>Hubtel Payments</td>
                    <td>Standard</td>
                    <td>Paystack</td>
                    <td>Mobile Money</td>
                    <td>GHS 2,100</td>
                    <td><span class="status-badge status-failed">Failed</span></td>
                    <td>PSK_E6B533</td>
                    <td>Jun 14, 2026</td>
                  </tr>
                </tbody>
              </table>

              <div class="footer">
                <div>BigConnect AI · BigData Ghana Limited</div>
                <div>This report was generated from the BigConnect Finance Module.</div>
              </div>
              <script>
                window.onload = function() { window.print(); }
              </script>
            </body>
          </html>
        `)
        printWindow.document.close()
      }
    } else {
      // Excel/CSV download
      const headers = 'Payment ID,Client,Plan,Gateway,Method,Amount,Status,Reference,Payment Date\n'
      const rows = [
        'PAY-00128,KFC Ghana,Enterprise,Paystack,Mobile Money,GHS 2500,Successful,PSK_A2X929,Jun 16 2026',
        'PAY-00127,RightShop,Standard,Paystack,Mobile Money,GHS 2100,Successful,PSK_B3Y830,Jun 16 2026',
        'PAY-00126,Caddyman Logistics,Premium,Hubtel,Mobile Money,GHS 2500,Successful,HBT_C4Z731,Jun 15 2026',
        'PAY-00125,Bloom Advisors,Starter,Paystack,Bank Transfer,GHS 1500,Pending,PSK_D5A632,Jun 15 2026',
        'PAY-00124,Hubtel Payments,Standard,Paystack,Mobile Money,GHS 2100,Failed,PSK_E6B533,Jun 14 2026'
      ].join('\n')
      const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', `${item.name.toLowerCase().replace(/\s+/g, '_')}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900">Finance</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">Monitor payments, invoices, receipts, gateway transactions, and revenue activity across all client accounts.</p>
        </div>
        <button
          onClick={() => setIsExportModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-blue-700"
        >
          <Download className="h-4 w-4" strokeWidth={1.5} />
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
        <button onClick={() => setActiveTab('history')} className={`rounded-lg px-4 py-2 text-[12px] font-medium transition ${activeTab === 'history' ? 'bg-blue-600 text-white' : 'text-[#6B7A99] hover:text-[#07152F]'}`}>
          Export History
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

      {/* Export History Tab */}
      {activeTab === 'history' && (
        <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <p className="text-[13px] font-semibold text-slate-900">Export History</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Recent financial reports requested and generated</p>
            </div>
            <span className="text-[12px] text-slate-400">{exportHistory.length} reports</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Report Name</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Type</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Format</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Period</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Generated By</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Generated At</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {exportHistory.map((item) => {
                  const statusStyles = {
                    Processing: 'bg-blue-50 text-blue-700 border-blue-200',
                    Ready: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                    Failed: 'bg-red-50 text-red-700 border-red-200',
                    Expired: 'bg-slate-100 text-slate-500 border-slate-200'
                  }[item.status]

                  return (
                    <tr key={item.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition">
                      <td className="px-6 py-4 text-[12px] font-medium text-slate-900">{item.name}</td>
                      <td className="px-4 py-4 text-[11px] text-slate-600">{item.type}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded border px-1.5 py-0.5 text-[9px] font-mono font-bold ${
                          item.format === 'PDF' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                        }`}>
                          {item.format}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[11px] text-slate-600">{item.period}</td>
                      <td className="px-4 py-4 text-[11px] text-slate-500">{item.generatedBy}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1 border px-2.5 py-0.5 rounded-full text-[10px] font-medium ${statusStyles}`}>
                          {item.status === 'Processing' && <Loader2 className="h-3 w-3 animate-spin text-blue-600" />}
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-[11px] text-slate-500">{item.generatedAt}</td>
                      <td className="px-4 py-4">
                        {item.status === 'Ready' ? (
                          <button
                            onClick={() => handleDownloadReport(item)}
                            className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50 transition"
                          >
                            <Download className="h-3 w-3" />
                            Download
                          </button>
                        ) : item.status === 'Processing' ? (
                          <span className="text-[11px] text-slate-400">Generating...</span>
                        ) : (
                          <span className="text-[11px] text-slate-400">—</span>
                        )}
                      </td>
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

      {/* Export Report Modal */}
      <ExportReportModal
        open={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onGenerate={handleGenerateReport}
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
