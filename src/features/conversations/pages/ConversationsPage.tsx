import { MessageSquare } from 'lucide-react'

function ConversationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">Conversations</h2>
        <p className="mt-1 text-sm text-slate-500">Monitor active conversations across all channels</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
        <MessageSquare className="mx-auto h-10 w-10 text-slate-300" strokeWidth={1.5} />
        <p className="mt-4 text-sm font-medium text-slate-600">Conversations module coming soon</p>
        <p className="mt-1 text-xs text-slate-400">Real-time conversation monitoring and history</p>
      </div>
    </div>
  )
}

export default ConversationsPage
