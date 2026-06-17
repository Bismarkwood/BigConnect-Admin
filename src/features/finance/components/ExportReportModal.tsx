import React, { useState } from 'react'
import { X, Calendar } from 'lucide-react'

export interface ExportReportPayload {
  reportType: string
  format: 'pdf' | 'excel'
  datePreset: 'today' | 'custom_date' | 'date_range' | 'last_1_month' | 'last_3_months' | 'last_6_months'
  startDate: string | null
  endDate: string | null
  customDate: string | null
  filters: {
    clientId: string | null
    paymentStatus: string | null
    invoiceStatus: string | null
    gateway: string | null
    paymentMethod: string | null
    currency: string
  }
}

interface ExportReportModalProps {
  open: boolean
  onClose: () => void
  onGenerate: (payload: ExportReportPayload) => void
}

const reportTypes = [
  { id: 'finance_summary', label: 'Finance Summary Report', desc: 'Overview of revenue, active subscriptions, successful and pending payments, and payment channel distributions.' },
  { id: 'payments', label: 'Payments Report', desc: 'All successful, pending, failed, reversed, and refunded payment transactions within the selected period.' },
  { id: 'invoices', label: 'Invoices Report', desc: 'Billed invoices, issued amounts, unpaid invoices, overdue tracking, and payment receipts status.' },
  { id: 'receipts', label: 'Receipts Report', desc: 'Official customer payment receipts, transaction reference linkages, and verified gateway clearing records.' },
  { id: 'failed_payments', label: 'Failed Payments Report', desc: 'Detail logs of transactions that failed processing, payment error classifications, and retry counts.' },
  { id: 'gateway_transactions', label: 'Gateway Transactions Report', desc: 'Raw gateway callbacks, provider logs (Paystack, Hubtel), and external provider references.' },
  { id: 'reconciliation', label: 'Reconciliation Report', desc: 'Provider bank statement reconciliation, clearing matching, and system vs provider mismatches.' },
  { id: 'subscription_revenue', label: 'Subscription Revenue Report', desc: 'Plan tier analytics, recurring MRR charts, expansion revenue, and active paid subscription ratios.' }
]

const gateways = ['Paystack', 'Hubtel', 'Flutterwave', 'Mobile Money Gateway']
const paymentStatuses = ['Pending', 'Processing', 'Successful', 'Failed', 'Cancelled', 'Refunded', 'Reversed', 'Expired']
const invoiceStatuses = ['Draft', 'Issued', 'Paid', 'Partially Paid', 'Overdue', 'Cancelled', 'Refunded']
const paymentMethods = ['Mobile Money', 'Card', 'Bank Transfer', 'USSD', 'Wallet']
const currencies = ['GHS', 'USD', 'EUR']

function ExportReportModal({ open, onClose, onGenerate }: ExportReportModalProps) {
  const [reportType, setReportType] = useState('finance_summary')
  const [datePreset, setDatePreset] = useState<'today' | 'custom_date' | 'date_range' | 'last_1_month' | 'last_3_months' | 'last_6_months'>('last_3_months')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [customDate, setCustomDate] = useState('')
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf')

  // Filters state
  const [clientId, setClientId] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [invoiceStatus, setInvoiceStatus] = useState('')
  const [gateway, setGateway] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [currency, setCurrency] = useState('GHS')

  if (!open) return null

  const selectedReportInfo = reportTypes.find(r => r.id === reportType)

  const datePeriodLabel = {
    today: 'Today',
    custom_date: `Custom Date: ${customDate || 'Not specified'}`,
    date_range: `Date Range: ${startDate || 'Start'} to ${endDate || 'End'}`,
    last_1_month: 'Last 1 Month (30 Days)',
    last_3_months: 'Last 3 Months (90 Days)',
    last_6_months: 'Last 6 Months (180 Days)'
  }[datePreset]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const payload: ExportReportPayload = {
      reportType,
      format,
      datePreset,
      startDate: datePreset === 'date_range' ? startDate : null,
      endDate: datePreset === 'date_range' ? endDate : null,
      customDate: datePreset === 'custom_date' ? customDate : null,
      filters: {
        clientId: clientId || null,
        paymentStatus: paymentStatus || null,
        invoiceStatus: invoiceStatus || null,
        gateway: gateway || null,
        paymentMethod: paymentMethod || null,
        currency
      }
    }

    onGenerate(payload)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#07152F]/20 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative flex h-[90vh] w-full max-w-[950px] flex-col overflow-hidden rounded-2xl border border-[#DDE6F5] bg-white shadow-xl">
        {/* Header */}
        <div className="flex-shrink-0 border-b border-[#DDE6F5] bg-[#F6F8FC] px-6 py-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[17px] font-bold text-[#07152F]">Export Finance Report</h3>
              <p className="mt-1 text-[12px] text-[#6B7A99]">Generate a branded finance report by selecting report type, date period, filters, and export format.</p>
            </div>
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7A99] hover:bg-white border border-transparent hover:border-[#DDE6F5]">
              <X className="h-4.5 w-4.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Section 1: Report Type */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">1</span>
              <h4 className="text-[13px] font-bold text-[#07152F] uppercase tracking-wider">Report Type</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {reportTypes.map((type) => (
                <label
                  key={type.id}
                  className={`flex flex-col p-3 rounded-xl border text-left cursor-pointer transition ${
                    reportType === type.id
                      ? 'border-blue-600 bg-blue-50/20'
                      : 'border-[#DDE6F5] hover:border-blue-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-[#07152F]">{type.label}</span>
                    <input
                      type="radio"
                      name="reportType"
                      value={type.id}
                      checked={reportType === type.id}
                      onChange={() => setReportType(type.id)}
                      className="h-3.5 w-3.5 text-blue-600"
                    />
                  </div>
                  <span className="mt-1 text-[10px] text-[#6B7A99] leading-relaxed">{type.desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Section 2: Date Selector */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">2</span>
              <h4 className="text-[13px] font-bold text-[#07152F] uppercase tracking-wider">Report Date</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-[#DDE6F5] rounded-xl p-4 bg-[#F8FAFC]">
              <div className="md:col-span-1 flex flex-col gap-2">
                {(['today', 'custom_date', 'date_range', 'last_1_month', 'last_3_months', 'last_6_months'] as const).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDatePreset(preset)}
                    className={`px-3 py-2 text-left text-[11px] font-medium rounded-lg transition ${
                      datePreset === preset
                        ? 'bg-blue-600 text-white'
                        : 'text-[#6B7A99] hover:bg-[#EEF2F6] hover:text-[#07152F]'
                    }`}
                  >
                    {{
                      today: 'Today',
                      custom_date: 'Custom Date',
                      date_range: 'Date Range',
                      last_1_month: 'Last 1 Month',
                      last_3_months: 'Last 3 Months',
                      last_6_months: 'Last 6 Months'
                    }[preset]}
                  </button>
                ))}
              </div>

              <div className="md:col-span-2 flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#DDE6F5] pt-4 md:pt-0 md:pl-4 min-h-[150px]">
                {datePreset === 'today' && (
                  <div className="text-center md:text-left space-y-1">
                    <p className="text-[12px] font-bold text-[#07152F]">Today's Activity</p>
                    <p className="text-[11px] text-[#6B7A99]">Generates report starting from 00:00 to 23:59 of current date.</p>
                  </div>
                )}
                {datePreset === 'custom_date' && (
                  <div className="space-y-3">
                    <p className="text-[12px] font-bold text-[#07152F]">Select Date</p>
                    <div className="flex items-center gap-2 max-w-xs">
                      <Calendar className="h-4 w-4 text-[#6B7A99]" />
                      <input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="flex-1 rounded-lg border border-[#DDE6F5] bg-white px-3 py-2 text-[12px] text-[#07152F] outline-none focus:border-blue-600"
                        required
                      />
                    </div>
                  </div>
                )}
                {datePreset === 'date_range' && (
                  <div className="space-y-3">
                    <p className="text-[12px] font-bold text-[#07152F]">Date Range</p>
                    <div className="grid grid-cols-2 gap-2 max-w-sm">
                      <div>
                        <label className="block text-[9px] font-bold text-[#6B7A99] uppercase mb-1">Start Date</label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full rounded-lg border border-[#DDE6F5] bg-white px-3 py-2 text-[12px] text-[#07152F] outline-none focus:border-blue-600"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-[#6B7A99] uppercase mb-1">End Date</label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full rounded-lg border border-[#DDE6F5] bg-white px-3 py-2 text-[12px] text-[#07152F] outline-none focus:border-blue-600"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
                {datePreset === 'last_1_month' && (
                  <div className="text-center md:text-left space-y-1">
                    <p className="text-[12px] font-bold text-[#07152F]">Last 30 Days</p>
                    <p className="text-[11px] text-[#6B7A99]">Generates report from 30 days ago up to today.</p>
                  </div>
                )}
                {datePreset === 'last_3_months' && (
                  <div className="text-center md:text-left space-y-1">
                    <p className="text-[12px] font-bold text-[#07152F]">Last 90 Days</p>
                    <p className="text-[11px] text-[#6B7A99]">Generates report from 90 days ago up to today.</p>
                  </div>
                )}
                {datePreset === 'last_6_months' && (
                  <div className="text-center md:text-left space-y-1">
                    <p className="text-[12px] font-bold text-[#07152F]">Last 180 Days</p>
                    <p className="text-[11px] text-[#6B7A99]">Generates report from 180 days ago up to today.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Filters */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">3</span>
              <h4 className="text-[13px] font-bold text-[#07152F] uppercase tracking-wider">Filters (Optional)</h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-medium text-[#6B7A99] mb-1">Client</label>
                <input
                  type="text"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="All Clients"
                  className="w-full rounded-lg border border-[#DDE6F5] bg-white px-2.5 py-1.5 text-[11px] text-[#07152F] outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[#6B7A99] mb-1">Payment Status</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full rounded-lg border border-[#DDE6F5] bg-white px-2.5 py-1.5 text-[11px] text-[#07152F] outline-none focus:border-blue-600"
                >
                  <option value="">All Statuses</option>
                  {paymentStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[#6B7A99] mb-1">Invoice Status</label>
                <select
                  value={invoiceStatus}
                  onChange={(e) => setInvoiceStatus(e.target.value)}
                  className="w-full rounded-lg border border-[#DDE6F5] bg-white px-2.5 py-1.5 text-[11px] text-[#07152F] outline-none focus:border-blue-600"
                >
                  <option value="">All Statuses</option>
                  {invoiceStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[#6B7A99] mb-1">Payment Gateway</label>
                <select
                  value={gateway}
                  onChange={(e) => setGateway(e.target.value)}
                  className="w-full rounded-lg border border-[#DDE6F5] bg-white px-2.5 py-1.5 text-[11px] text-[#07152F] outline-none focus:border-blue-600"
                >
                  <option value="">All Gateways</option>
                  {gateways.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[#6B7A99] mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full rounded-lg border border-[#DDE6F5] bg-white px-2.5 py-1.5 text-[11px] text-[#07152F] outline-none focus:border-blue-600"
                >
                  <option value="">All Methods</option>
                  {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-medium text-[#6B7A99] mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-lg border border-[#DDE6F5] bg-white px-2.5 py-1.5 text-[11px] text-[#07152F] outline-none focus:border-blue-600"
                >
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Export Format */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-600">4</span>
              <h4 className="text-[13px] font-bold text-[#07152F] uppercase tracking-wider">Export Format</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex flex-col p-4 rounded-xl border cursor-pointer transition text-left ${
                  format === 'pdf' ? 'border-blue-600 bg-blue-50/20' : 'border-[#DDE6F5] hover:border-blue-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#07152F]">PDF Report</span>
                  <input
                    type="radio"
                    name="format"
                    value="pdf"
                    checked={format === 'pdf'}
                    onChange={() => setFormat('pdf')}
                    className="h-3.5 w-3.5 text-blue-600"
                  />
                </div>
                <span className="mt-1.5 text-[10px] text-[#6B7A99] leading-relaxed">Best for official sharing, printing, board reports, and management review. Includes BigConnect-branded summary sheets and headers.</span>
              </label>

              <label
                className={`flex flex-col p-4 rounded-xl border cursor-pointer transition text-left ${
                  format === 'excel' ? 'border-blue-600 bg-blue-50/20' : 'border-[#DDE6F5] hover:border-blue-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-bold text-[#07152F]">Excel Report</span>
                  <input
                    type="radio"
                    name="format"
                    value="excel"
                    checked={format === 'excel'}
                    onChange={() => setFormat('excel')}
                    className="h-3.5 w-3.5 text-blue-600"
                  />
                </div>
                <span className="mt-1.5 text-[10px] text-[#6B7A99] leading-relaxed">Best for analysis, reconciliation, filtering, and finance operations. Multi-sheet workbook with frozen header rows.</span>
              </label>
            </div>
          </div>

          {/* Section 5: Preview Summary Box */}
          <div className="border border-[#DDE6F5] bg-[#F1F5F9]/60 rounded-xl p-4">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#6B7A99] mb-2">Report Summary Preview</h5>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
              <div className="text-[11px]">
                <span className="text-[#6B7A99]">Report Type:</span> <strong className="text-[#07152F]">{selectedReportInfo?.label}</strong>
              </div>
              <div className="text-[11px]">
                <span className="text-[#6B7A99]">Date Period:</span> <strong className="text-[#07152F]">{datePeriodLabel}</strong>
              </div>
              <div className="text-[11px]">
                <span className="text-[#6B7A99]">Format:</span> <strong className="text-[#07152F] uppercase">{format}</strong>
              </div>
              <div className="text-[11px]">
                <span className="text-[#6B7A99]">Gateway:</span> <strong className="text-[#07152F]">{gateway || 'All Gateways'}</strong>
              </div>
              <div className="text-[11px]">
                <span className="text-[#6B7A99]">Status:</span> <strong className="text-[#07152F]">{paymentStatus || 'All Statuses'}</strong>
              </div>
              <div className="text-[11px]">
                <span className="text-[#6B7A99]">Client:</span> <strong className="text-[#07152F]">{clientId || 'All Clients'}</strong>
              </div>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex-shrink-0 border-t border-[#DDE6F5] bg-[#F6F8FC] px-6 py-4 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#DDE6F5] bg-white px-4 py-2.5 text-[12px] font-semibold text-[#6B7A99] hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-blue-700 transition"
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExportReportModal
