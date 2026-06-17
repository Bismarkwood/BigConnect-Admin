import { useRef } from 'react'
import { X, Printer, Download } from 'lucide-react'

interface ReportPreviewModalProps {
  open: boolean
  onClose: () => void
  report: {
    id: string
    name: string
    type: string
    format: 'PDF' | 'Excel'
    period: string
    generatedBy: string
    generatedAt: string
  } | null
}

function ReportPreviewModal({ open, onClose, report }: ReportPreviewModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null)

  if (!open || !report) return null

  const handlePrint = () => {
    const printContent = printAreaRef.current?.innerHTML
    
    if (printContent) {
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>${report.name}</title>
              <style>
                @page {
                  size: A4 portrait;
                  margin: 28px;
                }
                body {
                  font-family: 'Inter', system-ui, -apple-system, sans-serif;
                  color: #111827;
                  background-color: #ffffff;
                  margin: 0;
                  padding: 0;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                .pdf-container {
                  padding: 0px;
                  max-width: 100%;
                }
                .header-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 5px;
                }
                .header-title-left {
                  font-size: 20px;
                  font-weight: 800;
                  color: #07152F;
                  letter-spacing: 0.5px;
                  line-height: 1.2;
                }
                .header-subtitle-left {
                  font-size: 11px;
                  color: #6B7280;
                  font-weight: 500;
                  margin-top: 2px;
                }
                .header-meta-right {
                  text-align: right;
                  font-size: 10px;
                  color: #6B7280;
                  line-height: 1.5;
                }
                .navy-divider {
                  height: 2.5px;
                  background-color: #07152F;
                  margin: 12px 0;
                  border: none;
                }
                .identity-section {
                  background-color: #F8FAFC;
                  border: 1px solid #DDE6F5;
                  border-radius: 8px;
                  padding: 12px 16px;
                  margin-bottom: 14px;
                }
                .identity-grid {
                  display: grid;
                  grid-template-cols: repeat(3, 1fr);
                  gap: 12px 16px;
                }
                .meta-item-label {
                  font-size: 9px;
                  font-weight: 600;
                  color: #6B7280;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .meta-item-value {
                  font-size: 11px;
                  font-weight: 700;
                  color: #07152F;
                  margin-top: 2px;
                }
                .summary-strip {
                  border: 1px solid #DDE6F5;
                  border-radius: 8px;
                  padding: 10px 14px;
                  margin-bottom: 14px;
                  background-color: #ffffff;
                }
                .summary-strip-title {
                  font-size: 10px;
                  font-weight: 700;
                  color: #315BFF;
                  text-transform: uppercase;
                  margin-bottom: 4px;
                }
                .summary-strip-text {
                  font-size: 10px;
                  color: #6B7280;
                  line-height: 1.5;
                }
                .chip-container {
                  display: flex;
                  gap: 6px;
                  margin-top: 8px;
                  flex-wrap: wrap;
                }
                .summary-chip {
                  font-size: 9px;
                  background-color: #F3F7FF;
                  color: #315BFF;
                  padding: 2px 8px;
                  border-radius: 12px;
                  font-weight: 600;
                  border: 1px solid #DDE6F5;
                }
                .kpi-grid {
                  display: grid;
                  grid-template-cols: repeat(3, 1fr);
                  gap: 10px;
                  margin-bottom: 16px;
                }
                .kpi-card {
                  border: 1px solid #DDE6F5;
                  border-left: 3px solid #315BFF;
                  border-radius: 8px;
                  padding: 10px 12px;
                  background-color: #ffffff;
                }
                .kpi-label {
                  font-size: 8px;
                  font-weight: 700;
                  color: #6B7280;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .kpi-value {
                  font-size: 16px;
                  font-weight: 800;
                  color: #07152F;
                  margin-top: 4px;
                }
                .section-header {
                  font-size: 12px;
                  font-weight: 800;
                  color: #07152F;
                  text-transform: uppercase;
                  margin: 18px 0 8px 0;
                  letter-spacing: 0.5px;
                  display: flex;
                  align-items: center;
                  gap: 6px;
                }
                .section-header-line {
                  flex: 1;
                  height: 1px;
                  background-color: #DDE6F5;
                }
                .breakdown-grid {
                  display: grid;
                  grid-template-cols: repeat(3, 1fr);
                  gap: 12px;
                  margin-bottom: 14px;
                }
                .breakdown-box {
                  border: 1px solid #DDE6F5;
                  border-radius: 8px;
                  background-color: #ffffff;
                  overflow: hidden;
                }
                .breakdown-box-header {
                  background-color: #F8FAFC;
                  border-bottom: 1px solid #DDE6F5;
                  padding: 6px 10px;
                  font-size: 9px;
                  font-weight: 700;
                  color: #07152F;
                  text-transform: uppercase;
                }
                .breakdown-row {
                  display: flex;
                  justify-content: space-between;
                  padding: 6px 10px;
                  font-size: 9.5px;
                  border-bottom: 1px solid #F1F5F9;
                }
                .breakdown-row:last-child {
                  border-bottom: none;
                }
                .breakdown-row-label {
                  color: #6B7280;
                }
                .breakdown-row-value {
                  font-weight: 700;
                  color: #111827;
                }
                .table-subtitle {
                  font-size: 9.5px;
                  color: #6B7280;
                  margin-top: -4px;
                  margin-bottom: 8px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 6px;
                }
                th {
                  background-color: #07152F;
                  color: #ffffff;
                  font-size: 8.5px;
                  font-weight: 700;
                  text-transform: uppercase;
                  text-align: left;
                  padding: 8px 10px;
                  border: 1px solid #07152F;
                }
                td {
                  padding: 8px 10px;
                  border-bottom: 1px solid #DDE6F5;
                  border-left: 1px solid #DDE6F5;
                  border-right: 1px solid #DDE6F5;
                  font-size: 9px;
                  color: #111827;
                  vertical-align: middle;
                }
                tr:nth-child(even) td {
                  background-color: #F8FAFC;
                }
                .text-right {
                  text-align: right;
                }
                .badge {
                  display: inline-block;
                  padding: 2px 6px;
                  border-radius: 4px;
                  font-size: 8px;
                  font-weight: 700;
                  text-transform: uppercase;
                }
                .badge-success { background-color: #DEF7EC; color: #12A66A; }
                .badge-pending { background-color: #FEF08A; color: #F59E0B; }
                .badge-failed { background-color: #FDE8E8; color: #EF4444; }
                .badge-expired { background-color: #F1F5F9; color: #64748B; }
                .badge-info { background-color: #E0F2FE; color: #0284C7; }
                .totals-container {
                  display: flex;
                  justify-content: flex-end;
                  margin-top: 12px;
                }
                .totals-box {
                  width: 40%;
                  border: 1px solid #DDE6F5;
                  border-radius: 8px;
                  overflow: hidden;
                  background-color: #ffffff;
                }
                .totals-row {
                  display: flex;
                  justify-content: space-between;
                  padding: 6px 10px;
                  font-size: 9.5px;
                  border-bottom: 1px solid #F1F5F9;
                }
                .totals-row:last-child {
                  border-bottom: none;
                }
                .totals-row.grand-total {
                  background-color: #07152F;
                  color: #ffffff;
                  font-weight: 800;
                  font-size: 10.5px;
                }
                .totals-row.grand-total .totals-value {
                  color: #ffffff;
                }
                .totals-value {
                  font-weight: 700;
                  color: #111827;
                }
                .notes-section {
                  background-color: #F8FAFC;
                  border-left: 3px solid #315BFF;
                  border-radius: 0 8px 8px 0;
                  padding: 10px 14px;
                  margin-top: 18px;
                  font-size: 8.5px;
                  color: #6B7280;
                  line-height: 1.5;
                }
                .notes-title {
                  font-weight: 700;
                  color: #07152F;
                  margin-bottom: 2px;
                }
                .footer-table {
                  width: 100%;
                  margin-top: 30px;
                  border-top: 1px solid #DDE6F5;
                  padding-top: 8px;
                }
                .footer-text {
                  font-size: 8px;
                  color: #9CA3AF;
                }
                .footer-center {
                  text-align: center;
                }
                .footer-right {
                  text-align: right;
                }
              </style>
            </head>
            <body>
              <div class="pdf-container">
                ${printContent}
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
      }
    }
  }

  const handleDownload = () => {
    // Generate CSV for Excel
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
    
    // Clean formatted name matching the spec
    const cleanName = `bigconnect-finance-payments-report-last-3-months-${new Date().toISOString().split('T')[0]}.csv`
    link.setAttribute('download', cleanName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#07152F]/30 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative flex h-[95vh] w-full max-w-[950px] flex-col overflow-hidden rounded-2xl border border-[#DDE6F5] bg-white shadow-2xl">
        
        {/* Modal Toolbar Header */}
        <div className="flex-shrink-0 border-b border-[#DDE6F5] bg-[#F6F8FC] px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-[#07152F]">Report Preview</h3>
            <p className="text-[11px] text-[#6B7A99] mt-0.5"> Branded template rendering: <span className="font-mono text-blue-600">{report.id}</span> </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#DDE6F5] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#07152F] hover:bg-slate-50 transition"
            >
              <Printer className="h-3.5 w-3.5" />
              Print / Save PDF
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-blue-700 transition"
            >
              <Download className="h-3.5 w-3.5" />
              Download Excel
            </button>
            <div className="h-5 w-[1px] bg-[#DDE6F5] mx-1" />
            <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7A99] hover:bg-slate-100">
              <X className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 overflow-y-auto bg-[#525659] p-8 flex justify-center">
          {/* A4 Paper Container Wrapper */}
          <div
            ref={printAreaRef}
            className="w-[794px] min-h-[1123px] bg-white border border-[#DDE6F5] shadow-lg p-[36px] text-[#111827] flex flex-col justify-between"
            style={{ boxSizing: 'border-box' }}
          >
            <div>
              {/* Document Header Section */}
              <table className="w-full border-collapse" style={{ border: 'none' }}>
                <tbody>
                  <tr style={{ background: 'transparent' }}>
                    <td style={{ padding: '0', border: 'none', background: 'transparent', width: '50%' }}>
                      <div className="text-[20px] font-extrabold text-[#07152F] tracking-tight">BIGCONNECT AI</div>
                      <div className="text-[11px] text-[#6B7280] font-medium mt-0.5">Finance Module</div>
                    </td>
                    <td style={{ padding: '0', border: 'none', background: 'transparent', width: '50%', textAlign: 'right' }}>
                      <div className="text-[10px] text-[#6B7280] leading-relaxed">
                        <div><strong>Report Type:</strong> {report.type}</div>
                        <div><strong>Period:</strong> {report.period}</div>
                        <div><strong>Generated By:</strong> {report.generatedBy} (Finance Admin)</div>
                        <div><strong>Generated At:</strong> {report.generatedAt}</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <hr className="h-[2.5px] bg-[#07152F] my-[12px] border-none" />

              {/* Report Identity Section */}
              <div className="bg-[#F8FAFC] border border-[#DDE6F5] rounded-lg p-[12px] mb-[14px]">
                <div className="grid grid-cols-3 gap-[12px]">
                  <div>
                    <div className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">Report Name</div>
                    <div className="text-[11px] font-bold text-[#07152F] mt-0.5">{report.name}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">Report Type</div>
                    <div className="text-[11px] font-bold text-[#07152F] mt-0.5">{report.type}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">Report ID</div>
                    <div className="text-[11px] font-bold text-[#07152F] mt-0.5">FIN-{report.id}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">Date Range</div>
                    <div className="text-[11px] font-bold text-[#07152F] mt-0.5">Mar 17, 2026 - Jun 17, 2026</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">Currency</div>
                    <div className="text-[11px] font-bold text-[#07152F] mt-0.5">GHS</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider">Total Records</div>
                    <div className="text-[11px] font-bold text-[#07152F] mt-0.5">7 Records</div>
                  </div>
                </div>
              </div>

              {/* Report Summary Strip */}
              <div className="border border-[#DDE6F5] rounded-lg p-[10px] mb-[14px] bg-white">
                <div className="text-[10px] font-bold text-[#315BFF] uppercase mb-[4px]">Report Summary</div>
                <p className="text-[10px] text-[#6B7280] leading-relaxed">
                  This report summarizes payment transactions, revenue performance, failed payments, pending payments, refunded amounts, and active subscription-related payments for the selected reporting period.
                </p>
                <div className="flex flex-wrap gap-[6px] mt-[8px]">
                  <span className="text-[9px] bg-[#F3F7FF] text-[#315BFF] px-[8px] py-[2px] rounded-full font-semibold border border-[#DDE6F5]">Period: {report.period}</span>
                  <span className="text-[9px] bg-[#F3F7FF] text-[#315BFF] px-[8px] py-[2px] rounded-full font-semibold border border-[#DDE6F5]">Currency: GHS</span>
                  <span className="text-[9px] bg-[#F3F7FF] text-[#315BFF] px-[8px] py-[2px] rounded-full font-semibold border border-[#DDE6F5]">Export Format: PDF</span>
                  <span className="text-[9px] bg-[#F3F7FF] text-[#315BFF] px-[8px] py-[2px] rounded-full font-semibold border border-[#DDE6F5]">Source: BigConnect SaaS Backend</span>
                </div>
              </div>

              {/* KPI Summary Grid */}
              <div className="grid grid-cols-3 gap-[10px] mb-[16px]">
                <div className="border border-[#DDE6F5] border-l-[3px] border-l-[#315BFF] rounded-lg p-[10px] bg-white">
                  <div className="text-[8px] font-bold text-[#6B7280] uppercase tracking-wider">Total Revenue</div>
                  <div className="text-[16px] font-black text-[#07152F] mt-[4px]">GHS 17,700</div>
                </div>
                <div className="border border-[#DDE6F5] border-l-[3px] border-l-[#12A66A] rounded-lg p-[10px] bg-white">
                  <div className="text-[8px] font-bold text-[#6B7280] uppercase tracking-wider">Successful Payments</div>
                  <div className="text-[16px] font-black text-[#07152F] mt-[4px]">5</div>
                </div>
                <div className="border border-[#DDE6F5] border-l-[3px] border-l-[#EF4444] rounded-lg p-[10px] bg-white">
                  <div className="text-[8px] font-bold text-[#6B7280] uppercase tracking-wider">Failed Payments</div>
                  <div className="text-[16px] font-black text-[#07152F] mt-[4px]">1</div>
                </div>
                <div className="border border-[#DDE6F5] border-l-[3px] border-l-[#F59E0B] rounded-lg p-[10px] bg-white">
                  <div className="text-[8px] font-bold text-[#6B7280] uppercase tracking-wider">Pending Payments</div>
                  <div className="text-[16px] font-black text-[#07152F] mt-[4px]">1</div>
                </div>
                <div className="border border-[#DDE6F5] border-l-[3px] border-l-[#0284C7] rounded-lg p-[10px] bg-white">
                  <div className="text-[8px] font-bold text-[#6B7280] uppercase tracking-wider">Active Subscriptions</div>
                  <div className="text-[16px] font-black text-[#07152F] mt-[4px]">5</div>
                </div>
                <div className="border border-[#DDE6F5] border-l-[3px] border-l-[#64748B] rounded-lg p-[10px] bg-white">
                  <div className="text-[8px] font-bold text-[#6B7280] uppercase tracking-wider">Refunded Amount</div>
                  <div className="text-[16px] font-black text-[#07152F] mt-[4px]">GHS 0.00</div>
                </div>
              </div>

              {/* Financial Breakdown Section */}
              <div className="text-[12px] font-extrabold text-[#07152F] uppercase mb-[8px] flex items-center gap-[6px]">
                Financial Breakdown
                <div className="flex-1 h-[1px] bg-[#DDE6F5]"></div>
              </div>
              <div className="grid grid-cols-3 gap-[12px] mb-[14px]">
                <div className="border border-[#DDE6F5] rounded-lg bg-white overflow-hidden">
                  <div className="bg-[#F8FAFC] border-b border-[#DDE6F5] px-[10px] py-[6px] text-[9px] font-bold text-[#07152F] uppercase">Revenue by Plan</div>
                  <div className="breakdown-row">
                    <span className="text-[#6B7280]">Starter</span>
                    <span className="font-bold text-[#111827]">GHS 3,000</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="text-[#6B7280]">Standard</span>
                    <span className="font-bold text-[#111827]">GHS 8,400</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="text-[#6B7280]">Premium</span>
                    <span className="font-bold text-[#111827]">GHS 6,300</span>
                  </div>
                </div>

                <div className="border border-[#DDE6F5] rounded-lg bg-white overflow-hidden">
                  <div className="bg-[#F8FAFC] border-b border-[#DDE6F5] px-[10px] py-[6px] text-[9px] font-bold text-[#07152F] uppercase">Revenue by Gateway</div>
                  <div className="breakdown-row">
                    <span className="text-[#6B7280]">Paystack</span>
                    <span className="font-bold text-[#111827]">GHS 12,500</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="text-[#6B7280]">Hubtel</span>
                    <span className="font-bold text-[#111827]">GHS 5,200</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="text-[#6B7280]">Flutterwave</span>
                    <span className="font-bold text-[#111827]">GHS 0.00</span>
                  </div>
                </div>

                <div className="border border-[#DDE6F5] rounded-lg bg-white overflow-hidden">
                  <div className="bg-[#F8FAFC] border-b border-[#DDE6F5] px-[10px] py-[6px] text-[9px] font-bold text-[#07152F] uppercase">Payment Status</div>
                  <div className="breakdown-row">
                    <span className="text-[#6B7280]">Successful</span>
                    <span className="font-bold text-[#111827]">5</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="text-[#6B7280]">Pending</span>
                    <span className="font-bold text-[#111827]">1</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="text-[#6B7280]">Failed</span>
                    <span className="font-bold text-[#111827]">1</span>
                  </div>
                </div>
              </div>

              {/* Transactions List */}
              <div className="text-[12px] font-extrabold text-[#07152F] uppercase mt-[18px] mb-[4px] flex items-center gap-[6px]">
                Transactions List
                <div className="flex-1 h-[1px] bg-[#DDE6F5]"></div>
              </div>
              <div className="text-[9.5px] text-[#6B7280] mb-[8px]">Payment transactions captured within the selected reporting period.</div>
              
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Client</th>
                    <th>Plan</th>
                    <th>Gateway</th>
                    <th>Method</th>
                    <th className="text-right">Amount</th>
                    <th>Status</th>
                    <th>Reference</th>
                    <th>Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-bold text-blue-600">PAY-00128</td>
                    <td className="font-semibold">KFC Ghana</td>
                    <td>Enterprise</td>
                    <td>Paystack</td>
                    <td>Mobile Money</td>
                    <td className="text-right font-semibold">GHS 2,500</td>
                    <td><span className="badge badge-success">Successful</span></td>
                    <td className="font-mono text-[8px] text-[#64748B]">PSK_A2X929</td>
                    <td>Jun 16, 2026</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-blue-600">PAY-00127</td>
                    <td className="font-semibold">RightShop</td>
                    <td>Standard</td>
                    <td>Paystack</td>
                    <td>Mobile Money</td>
                    <td className="text-right font-semibold">GHS 2,100</td>
                    <td><span className="badge badge-success">Successful</span></td>
                    <td className="font-mono text-[8px] text-[#64748B]">PSK_B3Y830</td>
                    <td>Jun 16, 2026</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-blue-600">PAY-00126</td>
                    <td className="font-semibold">Caddyman Log.</td>
                    <td>Premium</td>
                    <td>Hubtel</td>
                    <td>Mobile Money</td>
                    <td className="text-right font-semibold">GHS 2,500</td>
                    <td><span className="badge badge-success">Successful</span></td>
                    <td className="font-mono text-[8px] text-[#64748B]">HBT_C4Z731</td>
                    <td>Jun 15, 2026</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-blue-600">PAY-00125</td>
                    <td className="font-semibold">Bloom Adv.</td>
                    <td>Starter</td>
                    <td>Paystack</td>
                    <td>Bank Transfer</td>
                    <td className="text-right font-semibold">GHS 1,500</td>
                    <td><span className="badge badge-pending">Pending</span></td>
                    <td className="font-mono text-[8px] text-[#64748B]">PSK_D5A632</td>
                    <td>Jun 15, 2026</td>
                  </tr>
                  <tr>
                    <td className="font-bold text-blue-600">PAY-00124</td>
                    <td className="font-semibold">Hubtel Pay.</td>
                    <td>Standard</td>
                    <td>Paystack</td>
                    <td>Mobile Money</td>
                    <td className="text-right font-semibold">GHS 2,100</td>
                    <td><span className="badge badge-failed">Failed</span></td>
                    <td className="font-mono text-[8px] text-[#64748B]">PSK_E6B533</td>
                    <td>Jun 14, 2026</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals Section */}
              <div className="totals-container">
                <div className="totals-box">
                  <div className="totals-row">
                    <span className="text-[#6B7280]">Total Successful Amount:</span>
                    <span className="totals-value">GHS 17,700</span>
                  </div>
                  <div className="totals-row">
                    <span className="text-[#6B7280]">Total Pending Amount:</span>
                    <span className="totals-value">GHS 1,500</span>
                  </div>
                  <div className="totals-row">
                    <span className="text-[#6B7280]">Total Failed Amount:</span>
                    <span className="totals-value">GHS 2,100</span>
                  </div>
                  <div className="totals-row grand-total">
                    <span>Net Revenue:</span>
                    <span>GHS 17,700</span>
                  </div>
                </div>
              </div>

              {/* Report Notes */}
              <div className="notes-section">
                <div className="notes-title">Notes &amp; Audit Metadata</div>
                This report was generated from verified payment records received through configured third-party payment gateway APIs and processed by the BigConnect SaaS backend. Payment values reflect records available at the time of generation.
              </div>
            </div>

            {/* Branded Footer Area */}
            <table className="w-full footer-table" style={{ borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
              <tbody>
                <tr style={{ background: 'transparent' }}>
                  <td className="footer-text" style={{ padding: '0', border: 'none', background: 'transparent' }}>
                    BigConnect AI · BigData Ghana Limited
                  </td>
                  <td className="footer-text footer-center" style={{ padding: '0', border: 'none', background: 'transparent' }}>
                    Generated from BigConnect Finance Module
                  </td>
                  <td className="footer-text footer-right" style={{ padding: '0', border: 'none', background: 'transparent' }}>
                    Page 1 of 1
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportPreviewModal
