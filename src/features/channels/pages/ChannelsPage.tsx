import { Radio, Plus } from 'lucide-react'

function ChannelsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Channels</h2>
          <p className="mt-1 text-sm text-slate-500">Connected communication channels</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Connect Channel
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center">
        <Radio className="mx-auto h-10 w-10 text-slate-300" strokeWidth={1.5} />
        <p className="mt-4 text-sm font-medium text-slate-600">Channels module coming soon</p>
        <p className="mt-1 text-xs text-slate-400">WhatsApp, Voice, Web Chat, and more</p>
      </div>
    </div>
  )
}

export default ChannelsPage
