import { useState } from 'react'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
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
  Trash2,
} from 'lucide-react'
import InvoicePreviewModal from '../components/InvoicePreviewModal'
import ExportReportModal from '../components/ExportReportModal'
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

  const handleDownloadReport = (item: ExportHistoryItem) => {
    if (item.format === 'PDF') {
      const doc = new jsPDF('p', 'mm', 'a4')
      const pageWidth = doc.internal.pageSize.getWidth()

          // Header
          doc.setFillColor(7, 21, 47) // #07152F
          doc.rect(0, 0, pageWidth, 28, 'F')
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(16)
          doc.setTextColor(255, 255, 255)
          doc.text('BIGCONNECT AI', 15, 12)
          doc.setFontSize(9)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(147, 197, 253)
          doc.text('Finance Module', 15, 18)
          doc.setFontSize(12)
          doc.setTextColor(255, 255, 255)
          doc.setFont('helvetica', 'bold')
          doc.text(item.type.toUpperCase(), 15, 25)

          // Right side metadata
          doc.setFontSize(8)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(200, 210, 230)
          doc.text(`Period: ${item.period}`, pageWidth - 15, 12, { align: 'right' })
          doc.text(`Generated By: ${item.generatedBy}`, pageWidth - 15, 17, { align: 'right' })
          doc.text(`Generated At: ${item.generatedAt}`, pageWidth - 15, 22, { align: 'right' })

          // KPI Section
          const kpis = [
            { label: 'TOTAL REVENUE', value: 'GHS 17,700' },
            { label: 'SUCCESSFUL', value: '5' },
            { label: 'FAILED', value: '1' },
            { label: 'PENDING', value: '1' },
            { label: 'ACTIVE SUBS', value: '5' },
            { label: 'REFUNDED', value: 'GHS 0.00' },
          ]

          let y = 36
          doc.setFontSize(10)
          doc.setFont('helvetica', 'bold')
          doc.setTextColor(7, 21, 47)
          doc.text('Report Summary', 15, y)
          y += 6

          kpis.forEach((kpi, i) => {
            const x = 15 + (i % 3) * 60
            const row = Math.floor(i / 3)
            const cardY = y + row * 20

            doc.setFillColor(248, 250, 252)
            doc.setDrawColor(221, 230, 245)
            doc.roundedRect(x, cardY, 55, 16, 2, 2, 'FD')

            // Blue top accent
            doc.setFillColor(49, 91, 255)
            doc.rect(x, cardY, 55, 1.5, 'F')

            doc.setFontSize(7)
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(107, 114, 128)
            doc.text(kpi.label, x + 4, cardY + 6)

            doc.setFontSize(12)
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(7, 21, 47)
            doc.text(kpi.value, x + 4, cardY + 13)
          })

          y += 46

          // Table
          doc.setFontSize(11)
          doc.setFont('helvetica', 'bold')
          doc.setTextColor(7, 21, 47)
          doc.text('Transactions List', 15, y)
          doc.setFontSize(8)
          doc.setFont('helvetica', 'normal')
          doc.setTextColor(107, 114, 128)
          doc.text('Payment transactions captured within the selected reporting period.', 15, y + 5)
          y += 10

          const tableData = [
            ['PAY-00128', 'KFC Ghana', 'Enterprise', 'Paystack', 'GHS 2,500', 'Successful', 'Jun 16, 2026'],
            ['PAY-00127', 'RightShop', 'Standard', 'Paystack', 'GHS 2,100', 'Successful', 'Jun 16, 2026'],
            ['PAY-00126', 'Caddyman', 'Premium', 'Hubtel', 'GHS 2,500', 'Successful', 'Jun 15, 2026'],
            ['PAY-00125', 'Bloom Advisors', 'Starter', 'Paystack', 'GHS 1,500', 'Pending', 'Jun 15, 2026'],
            ['PAY-00124', 'Hubtel Payments', 'Standard', 'Paystack', 'GHS 2,100', 'Failed', 'Jun 14, 2026'],
            ['PAY-00123', 'Melcom Group', 'Premium', 'Hubtel', 'GHS 2,500', 'Successful', 'Jun 14, 2026'],
            ['PAY-00122', 'Jumia Support', 'Enterprise', 'Paystack', 'GHS 8,000', 'Successful', 'Jun 13, 2026'],
          ];

          autoTable(doc, {
            startY: y,
            head: [['Payment ID', 'Client', 'Plan', 'Gateway', 'Amount', 'Status', 'Date']],
            body: tableData,
            headStyles: { fillColor: [7, 21, 47], textColor: 255, fontSize: 8, fontStyle: 'bold' },
            bodyStyles: { fontSize: 8, textColor: [17, 24, 39] },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            columnStyles: { 4: { halign: 'right' } },
            margin: { left: 15, right: 15 },
          })

          // Footer
          const finalY = (doc as any).lastAutoTable.finalY + 15
          doc.setDrawColor(221, 230, 245)
          doc.line(15, finalY, pageWidth - 15, finalY)
          doc.setFontSize(7)
          doc.setTextColor(107, 114, 128)
          doc.text('BigConnect AI · BigData Ghana Limited · Accra, Ghana', 15, finalY + 5)
          doc.text('Generated from BigConnect Finance Module', pageWidth / 2, finalY + 5, { align: 'center' })
          doc.text('Page 1 of 1', pageWidth - 15, finalY + 5, { align: 'right' })

          // Save
          const fileName = `bigconnect-finance-${item.type.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`
          doc.save(fileName)
    } else {
      // Excel (.xlsx) download
      const wb = XLSX.utils.book_new()

        // Sheet 1: Summary
        const summaryData = [
          ['BigConnect AI Finance Report'],
          [''],
          ['Report Type', item.type],
          ['Period', item.period],
          ['Generated By', item.generatedBy],
          ['Generated At', item.generatedAt],
          ['Format', 'Excel'],
          [''],
          ['KPI Summary'],
          ['Total Revenue', 'GHS 17,700'],
          ['Successful Payments', '5'],
          ['Failed Payments', '1'],
          ['Pending Payments', '1'],
          ['Active Subscriptions', '5'],
          ['Refunded Amount', 'GHS 0.00'],
        ]
        const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
        XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary')

        // Sheet 2: Payments
        const paymentsData = [
          ['Payment ID', 'Client', 'Plan', 'Gateway', 'Method', 'Amount', 'Status', 'Reference', 'Payment Date', 'Subscription Status'],
          ['PAY-00128', 'KFC Ghana', 'Enterprise', 'Paystack', 'Mobile Money', 'GHS 2,500', 'Successful', 'PSK_A2X929', 'Jun 16, 2026', 'Activated'],
          ['PAY-00127', 'RightShop', 'Standard', 'Paystack', 'Mobile Money', 'GHS 2,100', 'Successful', 'PSK_B3Y830', 'Jun 16, 2026', 'Activated'],
          ['PAY-00126', 'Caddyman Logistics', 'Premium', 'Hubtel', 'Mobile Money', 'GHS 2,500', 'Successful', 'HBT_C4Z731', 'Jun 15, 2026', 'Activated'],
          ['PAY-00125', 'Bloom Advisors', 'Starter', 'Paystack', 'Bank Transfer', 'GHS 1,500', 'Pending', 'PSK_D5A632', 'Jun 15, 2026', 'Pending Payment'],
          ['PAY-00124', 'Hubtel Payments', 'Standard', 'Paystack', 'Mobile Money', 'GHS 2,100', 'Failed', 'PSK_E6B533', 'Jun 14, 2026', 'Suspended'],
          ['PAY-00123', 'Melcom Group', 'Premium', 'Hubtel', 'Mobile Money', 'GHS 2,500', 'Successful', 'HBT_F7C434', 'Jun 14, 2026', 'Activated'],
          ['PAY-00122', 'Jumia Support', 'Enterprise', 'Paystack', 'Bank Transfer', 'GHS 8,000', 'Successful', 'PSK_G8D335', 'Jun 13, 2026', 'Activated'],
        ]
        const paymentsSheet = XLSX.utils.aoa_to_sheet(paymentsData)
        XLSX.utils.book_append_sheet(wb, paymentsSheet, 'Payments')

        // Sheet 3: Gateway References
        const gatewayData = [
          ['Gateway', 'Reference', 'Event Type', 'Status', 'Received At'],
          ['Paystack', 'PSK_A2X929', 'charge.success', 'Processed', 'Jun 16, 2026 · 2:15 PM'],
          ['Paystack', 'PSK_B3Y830', 'charge.success', 'Processed', 'Jun 16, 2026 · 1:42 PM'],
          ['Hubtel', 'HBT_C4Z731', 'payment.completed', 'Processed', 'Jun 15, 2026 · 4:20 PM'],
          ['Paystack', 'PSK_E6B533', 'charge.failed', 'Processed', 'Jun 14, 2026 · 11:30 AM'],
        ]
        const gatewaySheet = XLSX.utils.aoa_to_sheet(gatewayData)
        XLSX.utils.book_append_sheet(wb, gatewaySheet, 'Gateway References')

        // Download
        const fileName = `bigconnect-finance-payments-report-${new Date().toISOString().split('T')[0]}.xlsx`
        XLSX.writeFile(wb, fileName)
    }
  }

  const handleDeleteReport = (reportId: string) => {
    setExportHistory(prev => prev.filter(r => r.id !== reportId))
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
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-blue-700 shadow-sm"
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
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Report ID</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Report Name</th>
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
                      <td className="px-6 py-4 text-[12px] font-mono font-semibold text-[#07152F]">{item.id}</td>
                      <td className="px-4 py-4 text-[12px] font-medium text-slate-900">{item.name}</td>
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
                        <div className="flex items-center gap-2">
                          {item.status === 'Ready' && (
                            <>
                              <button
                                onClick={() => console.log('Preview:', item.id)}
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition"
                                title="Preview Report PDF"
                              >
                                <Eye className="h-3 w-3" />
                                Preview
                              </button>
                              <button
                                onClick={() => handleDownloadReport(item)}
                                className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-white px-2 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50 transition"
                                title="Download File"
                              >
                                <Download className="h-3 w-3" />
                                Download
                              </button>
                            </>
                          )}
                          {item.status === 'Processing' && (
                            <span className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Loader2 className="h-3 w-3 animate-spin" />
                              Generating...
                            </span>
                          )}
                          {item.status !== 'Processing' && (
                            <button
                              onClick={() => handleDeleteReport(item.id)}
                              className="p-1 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                              title="Delete Report"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
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
