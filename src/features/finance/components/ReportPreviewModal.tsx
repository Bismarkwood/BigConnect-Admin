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
                .letterhead-header {
                  background-color: #07152F !important;
                  color: #ffffff !important;
                  padding: 18px 22px;
                  border-radius: 8px;
                  margin-bottom: 20px;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                .letterhead-title-left {
                  font-size: 20px;
                  font-weight: 800;
                  color: #ffffff !important;
                  letter-spacing: 0.5px;
                  line-height: 1.2;
                }
                .letterhead-subtitle-left {
                  font-size: 11px;
                  color: #93C5FD !important;
                  font-weight: 500;
                  margin-top: 2px;
                }
                .letterhead-meta-right {
                  text-align: right;
                  font-size: 10px;
                  color: #E2E8F0 !important;
                  line-height: 1.5;
                }
                .letterhead-meta-right strong {
                  color: #ffffff !important;
                }
                .identity-section {
                  background-color: #F8FAFC !important;
                  border: 1px solid #DDE6F5;
                  border-radius: 8px;
                  padding: 12px 16px;
                  margin-bottom: 14px;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
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
                  background-color: #F3F7FF !important;
                  color: #315BFF !important;
                  padding: 2px 8px;
                  border-radius: 12px;
                  font-weight: 600;
                  border: 1px solid #DDE6F5;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                .kpi-grid {
                  display: grid;
                  grid-template-cols: repeat(3, 1fr);
                  gap: 10px;
                  margin-bottom: 16px;
                }
                .kpi-card {
                  border: 1px solid #DDE6F5;
                  border-left: 3px solid #315BFF !important;
                  border-radius: 8px;
                  padding: 10px 12px;
                  background-color: #ffffff;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
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
                  background-color: #F8FAFC !important;
                  border-bottom: 1px solid #DDE6F5;
                  padding: 6px 10px;
                  font-size: 9px;
                  font-weight: 700;
                  color: #07152F;
                  text-transform: uppercase;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
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
                  background-color: #07152F !important;
                  color: #ffffff !important;
                  font-size: 8.5px;
                  font-weight: 700;
                  text-transform: uppercase;
                  text-align: left;
                  padding: 8px 10px;
                  border: 1px solid #07152F;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
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
                  background-color: #F8FAFC !important;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
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
                .badge-success { background-color: #DEF7EC !important; color: #12A66A !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .badge-pending { background-color: #FEF08A !important; color: #F59E0B !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .badge-failed { background-color: #FDE8E8 !important; color: #EF4444 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .badge-expired { background-color: #F1F5F9 !important; color: #64748B !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .badge-info { background-color: #E0F2FE !important; color: #0284C7 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
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
                  background-color: #07152F !important;
                  color: #ffffff !important;
                  font-weight: 800;
                  font-size: 10.5px;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                .totals-row.grand-total .totals-value {
                  color: #ffffff !important;
                }
                .totals-value {
                  font-weight: 700;
                  color: #111827;
                }
                .notes-section {
                  background-color: #F8FAFC !important;
                  border-left: 3px solid #315BFF !important;
                  border-radius: 0 8px 8px 0;
                  padding: 10px 14px;
                  margin-top: 18px;
                  font-size: 8.5px;
                  color: #6B7280;
                  line-height: 1.5;
                  -webkit-print-color-adjust: exact;
                  print-color-adjust: exact;
                }
                .notes-title {
                  font-weight: 700;
                  color: #07152F;
                  margin-bottom: 2px;
                }
                .footer-divider {
                  border-top: 1px solid #07152F !important;
                  border-bottom: 1px solid #07152F !important;
                  height: 2px;
                  margin-top: 30px;
                  margin-bottom: 8px;
                }
                .footer-table {
                  width: 100%;
                  border: none;
                }
                .footer-text {
                  font-size: 8.5px;
                  color: #64748B !important;
                  font-weight: 500;
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
              {/* Solid Deep Blue Letterhead Header Section */}
              <div className="letterhead-header">
                <table className="w-full border-collapse" style={{ border: 'none', margin: 0 }}>
                  <tbody>
                    <tr style={{ background: 'transparent' }}>
                      <td style={{ padding: '0', border: 'none', background: 'transparent', width: '50%' }}>
                        <div className="letterhead-title-left">BIGCONNECT AI</div>
                        <div className="letterhead-subtitle-left">Finance Module</div>
                      </td>
                      <td style={{ padding: '0', border: 'none', background: 'transparent', width: '50%', textAlign: 'right' }}>
                        <div className="letterhead-meta-right">
                          <div><strong>Report Type:</strong> {report.type}</div>
                          <div><strong>Period:</strong> {report.period}</div>
                          <div><strong>Generated By:</strong> {report.generatedBy} (Finance Admin)</div>
                          <div><strong>Generated At:</strong> {report.generatedAt}</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Report Identity Section */}
              <div className="identity-section">
                <div className="identity-grid">
                  <div>
                    <div className="meta-item-label">Report Name</div>
                    <div className="meta-item-value">{report.name}</div>
                  </div>
                  <div>
                    <div className="meta-item-label">Report Type</div>
                    <div className="meta-item-value">{report.type}</div>
                  </div>
                  <div>
                    <div className="meta-item-label">Report ID</div>
                    <div className="meta-item-value">FIN-{report.id}</div>
                  </div>
                  <div>
                    <div className="meta-item-label">Date Range</div>
                    <div className="meta-item-value">Mar 17, 2026 - Jun 17, 2026</div>
                  </div>
                  <div>
                    <div className="meta-item-label">Currency</div>
                    <div className="meta-item-value">GHS</div>
                  </div>
                  <div>
                    <div className="meta-item-label">Total Records</div>
                    <div className="meta-item-value">7 Records</div>
                  </div>
                </div>
              </div>

              {/* Report Summary Strip */}
              <div className="summary-strip">
                <div className="summary-strip-title">Report Summary</div>
                <p className="summary-strip-text">
                  This report summarizes payment transactions, revenue performance, failed payments, pending payments, refunded amounts, and active subscription-related payments for the selected reporting period.
                </p>
                <div className="chip-container">
                  <span className="summary-chip">Period: {report.period}</span>
                  <span className="summary-chip">Currency: GHS</span>
                  <span className="summary-chip">Export Format: PDF</span>
                  <span className="summary-chip">Source: BigConnect SaaS Backend</span>
                </div>
              </div>

              {/* KPI Summary Grid */}
              <div className="kpi-grid">
                <div className="kpi-card" style={{ borderLeftColor: '#315BFF' }}>
                  <div className="kpi-label">Total Revenue</div>
                  <div className="kpi-value">GHS 17,700</div>
                </div>
                <div className="kpi-card" style={{ borderLeftColor: '#12A66A' }}>
                  <div className="kpi-label">Successful Payments</div>
                  <div className="kpi-value">5</div>
                </div>
                <div className="kpi-card" style={{ borderLeftColor: '#EF4444' }}>
                  <div className="kpi-label">Failed Payments</div>
                  <div className="kpi-value">1</div>
                </div>
                <div className="kpi-card" style={{ borderLeftColor: '#F59E0B' }}>
                  <div className="kpi-label">Pending Payments</div>
                  <div className="kpi-value">1</div>
                </div>
                <div className="kpi-card" style={{ borderLeftColor: '#0284C7' }}>
                  <div className="kpi-label">Active Subscriptions</div>
                  <div className="kpi-value">5</div>
                </div>
                <div className="kpi-card" style={{ borderLeftColor: '#64748B' }}>
                  <div className="kpi-label">Refunded Amount</div>
                  <div className="kpi-value">GHS 0.00</div>
                </div>
              </div>

              {/* Financial Breakdown Section */}
              <div className="section-header">
                Financial Breakdown
                <div className="section-header-line"></div>
              </div>
              <div className="breakdown-grid">
                <div className="breakdown-box">
                  <div className="breakdown-box-header">Revenue by Plan</div>
                  <div className="breakdown-row">
                    <span className="breakdown-row-label">Starter</span>
                    <span className="breakdown-row-value">GHS 3,000</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="breakdown-row-label">Standard</span>
                    <span className="breakdown-row-value">GHS 8,400</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="breakdown-row-label">Premium</span>
                    <span className="breakdown-row-value">GHS 6,300</span>
                  </div>
                </div>

                <div className="breakdown-box">
                  <div className="breakdown-box-header">Revenue by Gateway</div>
                  <div className="breakdown-row">
                    <span className="breakdown-row-label">Paystack</span>
                    <span className="breakdown-row-value">GHS 12,500</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="breakdown-row-label">Hubtel</span>
                    <span className="breakdown-row-value">GHS 5,200</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="breakdown-row-label">Flutterwave</span>
                    <span className="breakdown-row-value">GHS 0.00</span>
                  </div>
                </div>

                <div className="breakdown-box">
                  <div className="breakdown-box-header">Payment Status</div>
                  <div className="breakdown-row">
                    <span className="breakdown-row-label">Successful</span>
                    <span className="breakdown-row-value">5</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="breakdown-row-label">Pending</span>
                    <span className="breakdown-row-value">1</span>
                  </div>
                  <div className="breakdown-row">
                    <span className="breakdown-row-label">Failed</span>
                    <span className="breakdown-row-value">1</span>
                  </div>
                </div>
              </div>

              {/* Transactions List */}
              <div className="section-header">
                Transactions List
                <div className="section-header-line"></div>
              </div>
              <div className="table-subtitle">Payment transactions captured within the selected reporting period.</div>
              
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
                    <td style={{ fontWeight: 'bold', color: '#315BFF' }}>PAY-00128</td>
                    <td style={{ fontWeight: 600 }}>KFC Ghana</td>
                    <td>Enterprise</td>
                    <td>Paystack</td>
                    <td>Mobile Money</td>
                    <td className="text-right" style={{ fontWeight: 600 }}>GHS 2,500</td>
                    <td><span className="badge badge-success">Successful</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: '8px', color: '#64748B' }}>PSK_A2X929</td>
                    <td>Jun 16, 2026</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold', color: '#315BFF' }}>PAY-00127</td>
                    <td style={{ fontWeight: 600 }}>RightShop</td>
                    <td>Standard</td>
                    <td>Paystack</td>
                    <td>Mobile Money</td>
                    <td className="text-right" style={{ fontWeight: 600 }}>GHS 2,100</td>
                    <td><span className="badge badge-success">Successful</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: '8px', color: '#64748B' }}>PSK_B3Y830</td>
                    <td>Jun 16, 2026</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold', color: '#315BFF' }}>PAY-00126</td>
                    <td style={{ fontWeight: 600 }}>Caddyman Log.</td>
                    <td>Premium</td>
                    <td>Hubtel</td>
                    <td>Mobile Money</td>
                    <td className="text-right" style={{ fontWeight: 600 }}>GHS 2,500</td>
                    <td><span className="badge badge-success">Successful</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: '8px', color: '#64748B' }}>HBT_C4Z731</td>
                    <td>Jun 15, 2026</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold', color: '#315BFF' }}>PAY-00125</td>
                    <td style={{ fontWeight: 600 }}>Bloom Adv.</td>
                    <td>Starter</td>
                    <td>Paystack</td>
                    <td>Bank Transfer</td>
                    <td className="text-right" style={{ fontWeight: 600 }}>GHS 1,500</td>
                    <td><span className="badge badge-pending">Pending</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: '8px', color: '#64748B' }}>PSK_D5A632</td>
                    <td>Jun 15, 2026</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 'bold', color: '#315BFF' }}>PAY-00124</td>
                    <td style={{ fontWeight: 600 }}>Hubtel Pay.</td>
                    <td>Standard</td>
                    <td>Paystack</td>
                    <td>Mobile Money</td>
                    <td className="text-right" style={{ fontWeight: 600 }}>GHS 2,100</td>
                    <td><span className="badge badge-failed">Failed</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: '8px', color: '#64748B' }}>PSK_E6B533</td>
                    <td>Jun 14, 2026</td>
                  </tr>
                </tbody>
              </table>

              {/* Totals Section */}
              <div className="totals-container">
                <div className="totals-box">
                  <div className="totals-row">
                    <span style={{ color: '#6B7280' }}>Total Successful Amount:</span>
                    <span className="totals-value">GHS 17,700</span>
                  </div>
                  <div className="totals-row">
                    <span style={{ color: '#6B7280' }}>Total Pending Amount:</span>
                    <span className="totals-value">GHS 1,500</span>
                  </div>
                  <div className="totals-row">
                    <span style={{ color: '#6B7280' }}>Total Failed Amount:</span>
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

            {/* Branded Footer Area with Double Deep Blue Strokes */}
            <div>
              <div className="footer-divider" />
              <table className="w-full footer-table" style={{ border: 'none', margin: 0 }}>
                <tbody>
                  <tr style={{ background: 'transparent' }}>
                    <td className="footer-text" style={{ padding: '0', border: 'none', background: 'transparent', width: '33%' }}>
                      BigConnect AI · BigData Ghana Limited
                    </td>
                    <td className="footer-text footer-center" style={{ padding: '0', border: 'none', background: 'transparent', width: '34%' }}>
                      Generated from BigConnect Finance Module
                    </td>
                    <td className="footer-text footer-right" style={{ padding: '0', border: 'none', background: 'transparent', width: '33%' }}>
                      Page 1 of 1
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportPreviewModal
