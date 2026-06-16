import { Wallet } from 'lucide-react'

function FinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Finance</h2>
        <p className="mt-1 text-sm text-slate-500">Payments, invoices, and billing</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
        <Wallet className="mx-auto h-10 w-10 text-slate-300" strokeWidth={1.5} />
        <p className="mt-4 text-sm font-medium text-slate-600">Finance module coming soon</p>
        <p className="mt-1 text-xs text-slate-400">Track payments, generate invoices, and manage billing</p>
      </div>
    </div>
  )
}

export default FinancePage
