import {
  CreditCard,
  CheckCircle2,
  CalendarDays,
} from 'lucide-react'
import type { PaymentStatus } from '../types'

// Mock data — will be replaced with fetchSubscription + fetchInvoices
const mockSubscription = {
  plan: 'Enterprise',
  billingCycle: 'Monthly' as const,
  amount: 'GHS 2,500',
  status: 'Active' as const,
  startDate: 'Jan 15, 2026',
  nextBillingDate: 'Jul 15, 2026',
  features: ['Unlimited AI Agents', 'All Channels', 'Priority Support', '10,000 API calls/mo', 'Custom Knowledge Base', 'Call Recording'],
}

const mockInvoices = [
  { id: 'inv_006', invoiceNumber: 'INV-00128', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'Jun 1, 2026', dueDate: 'Jun 15, 2026', paidDate: 'Jun 1, 2026', paymentMethod: 'Mobile Money' },
  { id: 'inv_005', invoiceNumber: 'INV-00119', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'May 1, 2026', dueDate: 'May 15, 2026', paidDate: 'May 2, 2026', paymentMethod: 'Mobile Money' },
  { id: 'inv_004', invoiceNumber: 'INV-00110', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'Apr 1, 2026', dueDate: 'Apr 15, 2026', paidDate: 'Apr 1, 2026', paymentMethod: 'Mobile Money' },
  { id: 'inv_003', invoiceNumber: 'INV-00101', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'Mar 1, 2026', dueDate: 'Mar 15, 2026', paidDate: 'Mar 3, 2026', paymentMethod: 'Bank Transfer' },
  { id: 'inv_002', invoiceNumber: 'INV-00092', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'Feb 1, 2026', dueDate: 'Feb 15, 2026', paidDate: 'Feb 1, 2026', paymentMethod: 'Mobile Money' },
  { id: 'inv_001', invoiceNumber: 'INV-00083', amount: 'GHS 2,500', status: 'Paid' as PaymentStatus, issuedDate: 'Jan 15, 2026', dueDate: 'Jan 30, 2026', paidDate: 'Jan 15, 2026', paymentMethod: 'Mobile Money' },
]

const paymentStatusConfig: Record<PaymentStatus, { color: string; dot: string; bg: string }> = {
  'Paid': { color: 'text-emerald-700', dot: 'bg-emerald-500', bg: 'bg-emerald-50' },
  'Pending': { color: 'text-amber-700', dot: 'bg-amber-500', bg: 'bg-amber-50' },
  'Overdue': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Failed': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Refunded': { color: 'text-slate-600', dot: 'bg-slate-400', bg: 'bg-slate-100' },
}

interface BillingTabProps {
  clientId: string
}

function BillingTab({ clientId: _clientId }: BillingTabProps) {
  const totalPaid = mockInvoices.filter((i) => i.status === 'Paid').length
  const totalAmount = totalPaid * 2500

  return (
    <div className="space-y-5">
      {/* Subscription card + summary */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_340px]">
        {/* Subscription details */}
        <div className="rounded-xl border border-[#DDE6F5] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#DDE6F5]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <CreditCard className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#07152F]">Current Subscription</h4>
                  <p className="text-[11px] text-[#6B7A99] mt-0.5">Active since {mockSubscription.startDate}</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {mockSubscription.status}
              </span>
            </div>

            {/* Plan name + price hero */}
            <div className="rounded-xl border border-[#DDE6F5] bg-[#F3F7FF] p-5 mt-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-blue-600 font-semibold">{mockSubscription.plan} Plan</p>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-[32px] font-bold text-[#07152F] tracking-tight">{mockSubscription.amount}</span>
                    <span className="text-[13px] text-[#6B7A99]">/ month</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-[#6B7A99]">Billing cycle</span>
                  <span className="rounded-md bg-white border border-[#DDE6F5] px-2.5 py-1 text-[11px] font-medium text-[#07152F]">{mockSubscription.billingCycle}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details grid */}
          <div className="px-6 py-5">
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="rounded-lg border border-[#DDE6F5] p-3.5">
                <p className="text-[10px] text-[#6B7A99] uppercase tracking-wide mb-1">Next Billing</p>
                <p className="text-[14px] font-semibold text-[#07152F]">{mockSubscription.nextBillingDate}</p>
              </div>
              <div className="rounded-lg border border-[#DDE6F5] p-3.5">
                <p className="text-[10px] text-[#6B7A99] uppercase tracking-wide mb-1">Total Paid</p>
                <p className="text-[14px] font-semibold text-emerald-600">GHS {totalAmount.toLocaleString()}</p>
              </div>
              <div className="rounded-lg border border-[#DDE6F5] p-3.5">
                <p className="text-[10px] text-[#6B7A99] uppercase tracking-wide mb-1">Invoices</p>
                <p className="text-[14px] font-semibold text-[#07152F]">{mockInvoices.length} issued</p>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-[#DDE6F5] pt-4">
              <p className="text-[10px] uppercase tracking-wider text-[#6B7A99] font-semibold mb-3">Plan Features</p>
              <div className="grid grid-cols-2 gap-2.5">
                {mockSubscription.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" strokeWidth={1.5} />
                    <span className="text-[12px] text-[#07152F]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Billing summary sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[#DDE6F5] p-4">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="h-4 w-4 text-blue-600" strokeWidth={1.5} />
              <span className="text-[12px] font-semibold text-[#07152F]">Billing Summary</span>
            </div>
            <div className="space-y-2.5">
              <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Total invoices</span><span className="font-medium text-[#07152F]">{mockInvoices.length}</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Paid invoices</span><span className="font-medium text-emerald-600">{totalPaid}</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Total paid</span><span className="font-semibold text-[#07152F]">GHS {totalAmount.toLocaleString()}</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Outstanding</span><span className="font-medium text-[#07152F]">GHS 0</span></div>
              <div className="flex justify-between text-[12px]"><span className="text-[#6B7A99]">Payment method</span><span className="font-medium text-[#07152F]">Mobile Money</span></div>
            </div>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" strokeWidth={1.5} />
              <span className="text-[12px] font-medium text-emerald-700">All payments up to date</span>
            </div>
            <p className="text-[11px] text-emerald-600 mt-1">No outstanding balance</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">Next Payment</span>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-medium text-blue-700">Upcoming</span>
            </div>
            <p className="text-[28px] font-bold text-[#07152F] tracking-tight">{mockSubscription.amount}</p>
            <div className="mt-3 flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-blue-600" strokeWidth={1.5} />
              <span className="text-[12px] text-[#07152F]">Due on <span className="font-medium">{mockSubscription.nextBillingDate}</span></span>
            </div>
            <div className="mt-4 h-px bg-blue-200" />
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[10px] text-[#6B7A99]">Billing cycle</span>
              <span className="text-[11px] font-medium text-[#07152F]">{mockSubscription.billingCycle}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices table */}
      <div className="rounded-xl border border-[#DDE6F5] overflow-hidden">
        <div className="flex items-center justify-between bg-[#F3F7FF] px-5 py-3.5 border-b border-[#DDE6F5]">
          <h4 className="text-[13px] font-semibold text-[#07152F]">Invoice History</h4>
          <span className="text-[11px] text-[#6B7A99]">{mockInvoices.length} invoices</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#DDE6F5]">
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Invoice</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Amount</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Status</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Issued</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Paid Date</th>
                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-[#6B7A99]">Method</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map((invoice) => {
                const sc = paymentStatusConfig[invoice.status]
                return (
                  <tr key={invoice.id} className="border-b border-[#F3F7FF] last:border-0 hover:bg-[#F3F7FF]/50 transition">
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] font-medium text-blue-600">{invoice.invoiceNumber}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[12px] font-semibold text-[#07152F]">{invoice.amount}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.color}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[11px] text-[#6B7A99]">{invoice.issuedDate}</td>
                    <td className="px-5 py-3.5 text-[11px] text-[#07152F]">{invoice.paidDate || '—'}</td>
                    <td className="px-5 py-3.5 text-[11px] text-[#6B7A99]">{invoice.paymentMethod || '—'}</td>
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

export default BillingTab
