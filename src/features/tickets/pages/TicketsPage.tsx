import { Ticket, Plus } from 'lucide-react'

function TicketsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Tickets</h2>
          <p className="mt-1 text-sm text-slate-500">Support tickets and escalations</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Create Ticket
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
        <Ticket className="mx-auto h-10 w-10 text-slate-300" strokeWidth={1.5} />
        <p className="mt-4 text-sm font-medium text-slate-600">Tickets module coming soon</p>
        <p className="mt-1 text-xs text-slate-400">Manage support tickets and escalation workflows</p>
      </div>
    </div>
  )
}

export default TicketsPage
