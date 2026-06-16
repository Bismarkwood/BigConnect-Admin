import { useState, useEffect } from 'react'
import { X, Loader2, CreditCard } from 'lucide-react'

interface Plan {
  id: string
  name: string
  monthlyFee: string
  setupFee: string
  rate: string
  volume: string
  aiAgentLimit: number
  knowledgeBases: number
  storage: string
  phoneNumbers: string
  status: string
}

interface EditPlanModalProps {
  plan: Plan | null
  open: boolean
  onClose: () => void
  onSaved: (updated: Plan) => void
}

function EditPlanModal({ plan, open, onClose, onSaved }: EditPlanModalProps) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    monthlyFee: '',
    setupFee: '',
    rate: '',
    volume: '',
    aiAgentLimit: '',
    knowledgeBases: '',
    storage: '',
    phoneNumbers: '',
  })

  useEffect(() => {
    if (plan) {
      setForm({
        name: plan.name,
        monthlyFee: plan.monthlyFee,
        setupFee: plan.setupFee,
        rate: plan.rate,
        volume: plan.volume,
        aiAgentLimit: plan.aiAgentLimit === -1 ? 'Unlimited' : String(plan.aiAgentLimit),
        knowledgeBases: plan.knowledgeBases === -1 ? 'Unlimited' : String(plan.knowledgeBases),
        storage: plan.storage,
        phoneNumbers: plan.phoneNumbers,
      })
    }
  }, [plan])

  if (!open || !plan) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate PATCH /api/v1/admin/subscription-plans/:planId
    setTimeout(() => {
      setLoading(false)
      onSaved({
        ...plan,
        name: form.name,
        monthlyFee: form.monthlyFee,
        setupFee: form.setupFee,
        rate: form.rate,
        volume: form.volume,
        aiAgentLimit: form.aiAgentLimit === 'Unlimited' ? -1 : Number(form.aiAgentLimit),
        knowledgeBases: form.knowledgeBases === 'Unlimited' ? -1 : Number(form.knowledgeBases),
        storage: form.storage,
        phoneNumbers: form.phoneNumbers,
      })
      onClose()
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[#07152F]/25 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#DDE6F5] bg-white p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <CreditCard className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#07152F]">Edit Pricing Plan</h3>
              <p className="text-xs text-[#6B7A99]">{plan.name} Plan</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7A99] transition hover:bg-slate-100">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Plan Identity */}
          <div className="border-b border-[#DDE6F5] pb-4">
            <p className="text-[10px] uppercase tracking-wider text-[#6B7A99] font-semibold mb-3">Plan Identity</p>
            <InputField label="Plan Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
          </div>

          {/* Pricing */}
          <div className="border-b border-[#DDE6F5] pb-4">
            <p className="text-[10px] uppercase tracking-wider text-[#6B7A99] font-semibold mb-3">Pricing</p>
            <div className="grid grid-cols-3 gap-3">
              <InputField label="Per-Minute Rate" value={form.rate} onChange={(v) => setForm({ ...form, rate: v })} required />
              <InputField label="Monthly Fee" value={form.monthlyFee} onChange={(v) => setForm({ ...form, monthlyFee: v })} required />
              <InputField label="Setup Fee" value={form.setupFee} onChange={(v) => setForm({ ...form, setupFee: v })} required />
            </div>
          </div>

          {/* Volume Band */}
          <div className="border-b border-[#DDE6F5] pb-4">
            <p className="text-[10px] uppercase tracking-wider text-[#6B7A99] font-semibold mb-3">Volume Band</p>
            <InputField label="Volume Description" value={form.volume} onChange={(v) => setForm({ ...form, volume: v })} placeholder="e.g. 1,000 – 5,000 mins" required />
          </div>

          {/* Limits */}
          <div className="border-b border-[#DDE6F5] pb-4">
            <p className="text-[10px] uppercase tracking-wider text-[#6B7A99] font-semibold mb-3">Limits</p>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="AI Agent Limit" value={form.aiAgentLimit} onChange={(v) => setForm({ ...form, aiAgentLimit: v })} required />
              <InputField label="Knowledge Bases" value={form.knowledgeBases} onChange={(v) => setForm({ ...form, knowledgeBases: v })} required />
              <InputField label="Storage" value={form.storage} onChange={(v) => setForm({ ...form, storage: v })} required />
              <InputField label="Phone Numbers" value={form.phoneNumbers} onChange={(v) => setForm({ ...form, phoneNumbers: v })} required />
            </div>
          </div>

          {/* Note */}
          <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="text-[11px] text-amber-700">Changes apply to new signups only. Existing clients keep their current subscription unless manually updated.</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl border border-[#DDE6F5] text-[13px] font-medium text-[#6B7A99] transition hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex flex-1 h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 text-[13px] font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70">
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />Saving...</> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, required, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[12px] font-medium text-[#07152F]">{label}</label>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-[#DDE6F5] bg-white px-3 text-[13px] text-[#07152F] outline-none transition focus:border-blue-600 placeholder:text-[#6B7A99]/60"
      />
    </div>
  )
}

export default EditPlanModal
