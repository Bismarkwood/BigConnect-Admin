import { X, Download, Printer, Send, CheckCircle2 } from 'lucide-react'
import { useRef } from 'react'

interface InvoicePreviewModalProps {
  invoiceId: string | null
  open: boolean
  onClose: () => void
}

// When backend is connected, switch to:
// Preview: GET /api/v1/admin/invoices/{invoiceId}/pdf?mode=inline (iframe)
// Download: GET /api/v1/admin/invoices/{invoiceId}/pdf?mode=download
//
// For now, render an HTML invoice that matches the final PDF template design.
// The Download button prints this exact HTML to PDF via the browser.

const mockInvoice = {
  invoiceNumber: 'INV-2026-00127',
  status: 'Paid',
  issueDate: 'Jun 16, 2026',
  dueDate: 'Jul 16, 2026',
  clientName: 'RightShop Ghana',
  clientContact: 'Kwame Mensah',
  clientEmail: 'accounts@rightshop.com',
  clientPhone: '+233 20 444 5678',
  clientId: 'CLT-00124',
  planName: 'Standard Plan',
  billingCycle: 'Monthly',
  startDate: 'Jun 16, 2026',
  endDate: 'Jul 16, 2026',
  items: [
    { description: 'Standard Plan Monthly Fee', qty: '1', unitPrice: 'GHS 2,100', amount: 'GHS 2,100' },
    { description: 'Setup Fee (One-time)', qty: '1', unitPrice: 'GHS 2,500', amount: 'GHS 2,500' },
    { description: 'Usage Charge (2,000 mins @ GHS 2.40/min)', qty: '2,000', unitPrice: 'GHS 2.40', amount: 'GHS 4,800' },
  ],
  subtotal: 'GHS 9,400',
  discount: 'GHS 0.00',
  tax: 'GHS 0.00',
  total: 'GHS 9,400',
  amountPaid: 'GHS 9,400',
  balance: 'GHS 0.00',
  paymentStatus: 'Successful',
  gateway: 'Paystack',
  method: 'Mobile Money',
  gatewayRef: 'PSK_B3Y830',
  paymentDate: 'Jun 16, 2026 · 1:42 PM',
  transactionId: 'PAY-00127',
}

function InvoicePreviewModal({ invoiceId, open, onClose }: InvoicePreviewModalProps) {
  const printRef = useRef<HTMLDivElement>(null)

  if (!open || !invoiceId) return null

  const inv = mockInvoice

  const handleDownload = () => {
    if (!printRef.current) return
    const content = printRef.current.outerHTML
    const win = window.open('', '_blank')
    if (!win) return
    win.document.write(`<!DOCTYPE html><html><head>
      <title>${inv.invoiceNumber}</title>
      <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Manrope',sans-serif}@page{size:A4;margin:0}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}</style>
    </head><body>${content}</body></html>`)
    win.document.close()
    setTimeout(() => { win.print() }, 600)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#07152F]/20 backdrop-blur-sm">
      <div className="relative flex h-[92vh] w-[90vw] max-w-[1100px] flex-col overflow-hidden rounded-2xl border border-[#DDE6F5] bg-[#F6F8FC]">

        {/* Modal Header */}
        <div className="flex-shrink-0 flex items-center justify-between border-b border-[#DDE6F5] bg-white px-6 py-4">
          <div>
            <h3 className="text-[15px] font-bold text-[#07152F]">Invoice Preview</h3>
            <p className="text-[12px] text-[#6B7A99] mt-0.5">{inv.invoiceNumber} · {inv.clientName}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={handleDownload} className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-[11px] font-semibold text-white transition hover:bg-blue-700">
              <Download className="h-3.5 w-3.5" strokeWidth={1.5} />Download PDF
            </button>
            <button onClick={handleDownload} className="flex items-center gap-1.5 rounded-lg border border-[#DDE6F5] bg-white px-3 py-2 text-[11px] font-medium text-[#6B7A99] transition hover:bg-slate-50">
              <Printer className="h-3.5 w-3.5" strokeWidth={1.5} />Print
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-[#DDE6F5] bg-white px-3 py-2 text-[11px] font-medium text-[#6B7A99] transition hover:bg-slate-50">
              <Send className="h-3.5 w-3.5" strokeWidth={1.5} />Send
            </button>
            <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7A99] transition hover:bg-slate-100">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* PDF Preview — A4 size */}
        <div className="flex-1 overflow-y-auto p-6 flex justify-center">
          <div ref={printRef} style={{ width: '794px', minHeight: '1123px', fontFamily: "'Manrope', sans-serif" }} className="bg-white border border-[#DDE6F5] rounded-lg overflow-hidden">

            {/* Navy Header */}
            <div style={{ background: '#0a2463', padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>BigConnect AI</p>
                <p style={{ fontSize: '11px', color: '#93c5fd', marginTop: '4px' }}>AI-powered customer engagement platform</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '18px', fontWeight: 700, color: 'white', letterSpacing: '2px' }}>INVOICE</p>
                <p style={{ fontSize: '12px', color: '#93c5fd', marginTop: '4px' }}>{inv.invoiceNumber}</p>
              </div>
            </div>

            {/* Status + Dates Strip */}
            <div style={{ background: '#F6F8FC', borderBottom: '1px solid #DDE6F5', padding: '16px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>Issue Date</p><p style={{ fontSize: '12px', fontWeight: 600, color: '#07152F' }}>{inv.issueDate}</p></div>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>Due Date</p><p style={{ fontSize: '12px', fontWeight: 600, color: '#07152F' }}>{inv.dueDate}</p></div>
              </div>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '20px', padding: '4px 12px', fontSize: '11px', fontWeight: 700, color: '#047857' }}>
                <CheckCircle2 style={{ width: '14px', height: '14px' }} />PAID
              </span>
            </div>

            {/* From / Bill To */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', padding: '32px 48px', borderBottom: '1px solid #DDE6F5' }}>
              <div>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#6B7A99', marginBottom: '8px' }}>FROM</p>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#07152F' }}>BigConnect AI</p>
                <p style={{ fontSize: '12px', color: '#6B7A99' }}>BigData Ghana Limited</p>
                <p style={{ fontSize: '12px', color: '#6B7A99' }}>Accra, Ghana</p>
                <p style={{ fontSize: '12px', color: '#6B7A99', marginTop: '6px' }}>billing@bigconnect.ai</p>
              </div>
              <div>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#6B7A99', marginBottom: '8px' }}>BILL TO</p>
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#07152F' }}>{inv.clientName}</p>
                <p style={{ fontSize: '12px', color: '#6B7A99' }}>Contact: {inv.clientContact}</p>
                <p style={{ fontSize: '12px', color: '#6B7A99' }}>{inv.clientEmail}</p>
                <p style={{ fontSize: '12px', color: '#6B7A99' }}>{inv.clientPhone}</p>
                <p style={{ fontSize: '12px', color: '#6B7A99', marginTop: '6px' }}>Client ID: {inv.clientId}</p>
              </div>
            </div>

            {/* Subscription */}
            <div style={{ background: '#F6F8FC', padding: '20px 48px', borderBottom: '1px solid #DDE6F5' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#6B7A99', marginBottom: '10px' }}>SUBSCRIPTION</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px' }}>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>Plan</p><p style={{ fontSize: '12px', fontWeight: 600, color: '#07152F' }}>{inv.planName}</p></div>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>Billing</p><p style={{ fontSize: '12px', fontWeight: 600, color: '#07152F' }}>{inv.billingCycle}</p></div>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>Start</p><p style={{ fontSize: '12px', fontWeight: 600, color: '#07152F' }}>{inv.startDate}</p></div>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>End</p><p style={{ fontSize: '12px', fontWeight: 600, color: '#07152F' }}>{inv.endDate}</p></div>
              </div>
            </div>

            {/* Items Table */}
            <div style={{ padding: '32px 48px', borderBottom: '1px solid #DDE6F5' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #DDE6F5' }}>
                    <th style={{ textAlign: 'left', padding: '10px 0', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#6B7A99' }}>DESCRIPTION</th>
                    <th style={{ textAlign: 'center', padding: '10px 0', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#6B7A99' }}>QTY</th>
                    <th style={{ textAlign: 'right', padding: '10px 0', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#6B7A99' }}>UNIT PRICE</th>
                    <th style={{ textAlign: 'right', padding: '10px 0', fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#6B7A99' }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {inv.items.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #F3F7FF' }}>
                      <td style={{ padding: '14px 0', fontSize: '12px', color: '#07152F' }}>{item.description}</td>
                      <td style={{ padding: '14px 0', fontSize: '12px', color: '#6B7A99', textAlign: 'center' }}>{item.qty}</td>
                      <td style={{ padding: '14px 0', fontSize: '12px', color: '#6B7A99', textAlign: 'right' }}>{item.unitPrice}</td>
                      <td style={{ padding: '14px 0', fontSize: '12px', fontWeight: 600, color: '#07152F', textAlign: 'right' }}>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div style={{ marginTop: '20px', marginLeft: 'auto', width: '260px', borderLeft: '4px solid #2563eb', paddingLeft: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ fontSize: '12px', color: '#6B7A99' }}>Subtotal</span><span style={{ fontSize: '12px', color: '#07152F' }}>{inv.subtotal}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ fontSize: '12px', color: '#6B7A99' }}>Discount</span><span style={{ fontSize: '12px', color: '#07152F' }}>{inv.discount}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ fontSize: '12px', color: '#6B7A99' }}>Tax</span><span style={{ fontSize: '12px', color: '#07152F' }}>{inv.tax}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '2px solid #DDE6F5', marginTop: '8px' }}><span style={{ fontSize: '13px', fontWeight: 700, color: '#07152F' }}>Total Due</span><span style={{ fontSize: '13px', fontWeight: 700, color: '#07152F' }}>{inv.total}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: '12px', color: '#047857' }}>Amount Paid</span><span style={{ fontSize: '12px', fontWeight: 600, color: '#047857' }}>{inv.amountPaid}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: '12px', fontWeight: 700, color: '#07152F' }}>Balance</span><span style={{ fontSize: '12px', fontWeight: 700, color: '#047857' }}>{inv.balance}</span></div>
              </div>
            </div>

            {/* Payment Details */}
            <div style={{ padding: '28px 48px', borderBottom: '1px solid #DDE6F5' }}>
              <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', color: '#6B7A99', marginBottom: '14px' }}>PAYMENT DETAILS</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>Status</p><p style={{ fontSize: '12px', fontWeight: 600, color: '#047857', marginTop: '2px' }}>{inv.paymentStatus}</p></div>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>Gateway</p><p style={{ fontSize: '12px', fontWeight: 500, color: '#07152F', marginTop: '2px' }}>{inv.gateway}</p></div>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>Method</p><p style={{ fontSize: '12px', fontWeight: 500, color: '#07152F', marginTop: '2px' }}>{inv.method}</p></div>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>Reference</p><p style={{ fontSize: '12px', fontWeight: 500, color: '#07152F', marginTop: '2px', fontFamily: 'monospace' }}>{inv.gatewayRef}</p></div>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>Payment Date</p><p style={{ fontSize: '12px', fontWeight: 500, color: '#07152F', marginTop: '2px' }}>{inv.paymentDate}</p></div>
                <div><p style={{ fontSize: '10px', color: '#6B7A99' }}>Transaction ID</p><p style={{ fontSize: '12px', fontWeight: 500, color: '#07152F', marginTop: '2px', fontFamily: 'monospace' }}>{inv.transactionId}</p></div>
              </div>
            </div>

            {/* Navy Footer */}
            <div style={{ background: '#0a2463', padding: '20px 48px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: '#93c5fd' }}>BigConnect AI · BigData Ghana Limited · Accra, Ghana</p>
              <p style={{ fontSize: '10px', color: '#60a5fa', marginTop: '4px', opacity: 0.7 }}>This is a computer-generated invoice. No signature required.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvoicePreviewModal
