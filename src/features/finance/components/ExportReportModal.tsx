import { useState } from 'react'
import { X, FileText, Download, Loader2 } from 'lucide-react'

interface ExportReportModalProps {
  open: boolean
  onClose: () => void
}

const reportTypes = [
  'Finance Summary Report',
  'Payments Report',
  'Invoices Report',
  'Receipts Report',
  'Failed Payments Report',
  'Gateway Transactions Report',
  'Reconciliation Report',
  'Subscription Revenue Report',
]

const dateOptions = [
  { value: 'today', label: 'Today' },
  { value: 'last_1_month', label: 'Last 1 Month' },
  { value: 'last_3_months', label: 'Last 3 Months' },
  { value: 'last_6_months', label: 'Last 6 Months' },
  { value: 'custom', label: 'Custom Date Range' },
]

function ExportReportModal({ open, onClose }: ExportReportModalProps) {
  const [reportType, setReportType] = useState('Payments Report')
  const [datePeriod, setDatePeriod] = useState('last_3_months')
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ fileName: string; previewUrl: string; downloadUrl: string } | null>(null)

  if (!open) return null

  const handleExport = () => {
    setLoading(true)
    // Simulate POST /api/v1/admin/finance/reports/export
    setTimeout(() => {
      setLoading(false)
      const fileName = `bigconnect-finance-payments-report-${datePeriod.replace(/_/g, '-')}-2026-06-17.${format === 'pdf' ? 'pdf' : 'xlsx'}`
      setResult({
        fileName,
        previewUrl: `/api/v1/admin/finance/reports/FIN-RPT-2026-00031/file?mode=inline`,
        downloadUrl: `/api/v1/admin/finance/reports/FIN-RPT-2026-00031/file?mode=download`,
      })
    }, 1500)
  }

  const handleClose = () => {
    setResult(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#07152F]/20 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-[#DDE6F5] bg-white overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DDE6F5] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
              <FileText className="h-4 w-4 text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#07152F]">Export Finance Report</h3>
              <p className="text-[11px] text-[#6B7A99]">Generate a branded PDF or Excel report</p>
            </div>
          </div>
          <button onClick={handleClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7A99] hover:bg-slate-100">
            <X className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Form */}
        {!result ? (
          <div className="px-6 py-5 space-y-4">
            {/* Report Type */}
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-[#07152F]">Report Type</label>
              <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="h-10 w-full rounded-lg border border-[#DDE6F5] bg-white px-3 text-[12px] text-[#07152F] outline-none focus:border-blue-600">
                {reportTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Date Period */}
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-[#07152F]">Date Period</label>
              <select value={datePeriod} onChange={(e) => setDatePeriod(e.target.value)} className="h-10 w-full rounded-lg border border-[#DDE6F5] bg-white px-3 text-[12px] text-[#07152F] outline-none focus:border-blue-600">
                {dateOptions.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>

            {/* Format */}
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-[#07152F]">Format</label>
              <div className="flex gap-3">
                <button onClick={() => setFormat('pdf')} className={`flex-1 rounded-lg border px-3 py-2.5 text-[12px] font-medium transition ${format === 'pdf' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-[#DDE6F5] text-[#6B7A99] hover:bg-slate-50'}`}>
                  PDF
                </button>
                <button onClick={() => setFormat('excel')} className={`flex-1 rounded-lg border px-3 py-2.5 text-[12px] font-medium transition ${format === 'excel' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-[#DDE6F5] text-[#6B7A99] hover:bg-slate-50'}`}>
                  Excel
                </button>
              </div>
            </div>

            {/* Export Button */}
            <button onClick={handleExport} disabled={loading} className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-blue-600 text-[12px] font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />Generating Report...</> : 'Generate Report'}
            </button>
          </div>
        ) : (
          /* Result */
          <div className="px-6 py-5 space-y-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
              <Download className="mx-auto h-8 w-8 text-emerald-600 mb-2" strokeWidth={1.5} />
              <p className="text-[13px] font-semibold text-emerald-700">Report Ready</p>
              <p className="text-[11px] text-emerald-600 mt-1">{result.fileName}</p>
            </div>
            <div className="flex gap-3">
              <button onClick={handleClose} className="flex-1 h-10 rounded-lg border border-[#DDE6F5] text-[12px] font-medium text-[#6B7A99] hover:bg-slate-50">
                Close
              </button>
              <button className="flex flex-1 h-10 items-center justify-center gap-1.5 rounded-lg bg-blue-600 text-[12px] font-semibold text-white hover:bg-blue-700">
                <Download className="h-3.5 w-3.5" strokeWidth={1.5} />Download
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExportReportModal
