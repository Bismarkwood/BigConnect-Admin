import { FileText } from 'lucide-react'

function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Reports</h2>
        <p className="mt-1 text-sm text-slate-500">Platform performance reports</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
        <FileText className="mx-auto h-10 w-10 text-slate-300" strokeWidth={1.5} />
        <p className="mt-4 text-sm font-medium text-slate-600">Reports module coming soon</p>
        <p className="mt-1 text-xs text-slate-400">Generate and export platform performance reports</p>
      </div>
    </div>
  )
}

export default ReportsPage
