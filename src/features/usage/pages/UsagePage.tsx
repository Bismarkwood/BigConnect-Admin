import { BarChart3 } from 'lucide-react'

function UsagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Usage</h2>
        <p className="mt-1 text-sm text-slate-500">Platform usage and analytics</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
        <BarChart3 className="mx-auto h-10 w-10 text-slate-300" strokeWidth={1.5} />
        <p className="mt-4 text-sm font-medium text-slate-600">Usage analytics coming soon</p>
        <p className="mt-1 text-xs text-slate-400">API calls, messages processed, and resource consumption</p>
      </div>
    </div>
  )
}

export default UsagePage
