import { Plus } from 'lucide-react'
import AIAgentsTab from '../components/AIAgentsTab'

function AIAgentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">AI Agents</h2>
          <p className="mt-1 text-sm text-slate-500">Configure and monitor AI assistants</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Create Agent
        </button>
      </div>

      {/* Main content */}
      <AIAgentsTab clientId="" />
    </div>
  )
}

export default AIAgentsPage
