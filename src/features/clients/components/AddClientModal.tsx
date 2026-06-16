import { useState } from 'react'
import { X, Loader2, Building2 } from 'lucide-react'
import type { CreateClientPayload } from '../types'

interface AddClientModalProps {
  open: boolean
  onClose: () => void
  onSave: (data: CreateClientPayload) => void
}

const industries = [
  'E-Commerce', 'Finance', 'Fintech', 'Food & Beverage', 'Healthcare',
  'Logistics', 'Real Estate', 'Retail', 'Technology', 'Telecom', 'Other',
]

const accountManagers = ['David Mensah', 'Sarah Osei', 'Emmanuel Adu', 'Grace Tetteh']

function AddClientModal({ open, onClose, onSave }: AddClientModalProps) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<CreateClientPayload>({
    businessName: '',
    industry: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    country: 'Ghana',
    city: '',
    address: '',
    accountManager: '',
  })

  if (!open) return null

  const handleChange = (field: keyof CreateClientPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate POST /api/v1/clients
    setTimeout(() => {
      setLoading(false)
      onSave(form)
      setForm({
        businessName: '', industry: '', contactPerson: '', email: '',
        phone: '', website: '', country: 'Ghana', city: '', address: '', accountManager: '',
      })
      onClose()
    }, 900)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Building2 className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Add New Client</h3>
              <p className="text-xs text-slate-500">Create a new business record on the platform</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-600">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Business Name */}
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-slate-700">Business Name *</label>
            <input
              type="text"
              required
              value={form.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              placeholder="Enter business name"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-900 outline-none transition focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] placeholder:text-slate-400"
            />
          </div>

          {/* Industry + Contact Person */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-slate-700">Industry *</label>
              <select
                required
                value={form.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-900 outline-none transition focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)]"
              >
                <option value="">Select industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-slate-700">Contact Person *</label>
              <input
                type="text"
                required
                value={form.contactPerson}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
                placeholder="Full name"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-900 outline-none transition focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-slate-700">Email Address *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="email@company.com"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-900 outline-none transition focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-slate-700">Phone Number *</label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+233 XX XXX XXXX"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-900 outline-none transition focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-slate-700">Website</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://company.com"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-900 outline-none transition focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] placeholder:text-slate-400"
            />
          </div>

          {/* Country + City */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-slate-700">Country *</label>
              <input
                type="text"
                required
                value={form.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-900 outline-none transition focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] placeholder:text-slate-400"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-slate-700">City *</label>
              <input
                type="text"
                required
                value={form.city}
                onChange={(e) => handleChange('city', e.target.value)}
                placeholder="City"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-900 outline-none transition focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-slate-700">Business Address</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="Street address"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-[13px] text-slate-900 outline-none transition focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)] placeholder:text-slate-400"
            />
          </div>

          {/* Account Manager */}
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-slate-700">Assigned Account Manager *</label>
            <select
              required
              value={form.accountManager}
              onChange={(e) => handleChange('accountManager', e.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-[13px] text-slate-900 outline-none transition focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.08)]"
            >
              <option value="">Select account manager</option>
              {accountManagers.map((am) => (
                <option key={am} value={am}>{am}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-slate-200 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 text-[13px] font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                  Creating...
                </>
              ) : (
                'Add Client'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddClientModal
