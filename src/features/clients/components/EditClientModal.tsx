import { useState } from 'react'
import { X, Loader2, Pencil } from 'lucide-react'
import type { Client, CreateClientPayload } from '../types'
import { updateClient } from '../services/clientApi'

interface EditClientModalProps {
  client: Client | null
  open: boolean
  onClose: () => void
  onSaved: (updated: Client) => void
}

const industries = [
  'E-Commerce', 'Finance', 'Fintech', 'Food & Beverage', 'Healthcare',
  'Logistics', 'Real Estate', 'Retail', 'Technology', 'Telecom', 'Other',
]

const accountManagers = ['David Mensah', 'Sarah Osei', 'Emmanuel Adu', 'Grace Tetteh']

function EditClientModal({ client, open, onClose, onSaved }: EditClientModalProps) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<CreateClientPayload>({
    businessName: '',
    industry: '',
    contactPerson: '',
    email: '',
    phone: '',
    website: '',
    country: '',
    city: '',
    address: '',
    accountManager: '',
  })

  // Keep track of the client we loaded the form for
  const [prevClient, setPrevClient] = useState<Client | null>(null)

  // Adjust form state when the client prop changes
  if (client !== prevClient) {
    setPrevClient(client)
    if (client) {
      setForm({
        businessName: client.businessName,
        industry: client.industry,
        contactPerson: client.contactPerson,
        email: client.email,
        phone: client.phone,
        website: client.website || '',
        country: client.country,
        city: client.city,
        address: client.address || '',
        accountManager: client.accountManager,
      })
    }
  }

  if (!open || !client) return null

  const handleChange = (field: keyof CreateClientPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // PATCH /api/v1/clients/:clientId
      const updated = await updateClient(client.id, form)
      onSaved(updated)
      onClose()
    } catch {
      // Fallback — apply changes locally until API is connected
      const updated: Client = { ...client, ...form }
      onSaved(updated)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-[#07152F]/25 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#DDE6F5] bg-white p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
              <Pencil className="h-5 w-5 text-blue-600" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#07152F]">Edit Client</h3>
              <p className="text-xs text-[#6B7A99]">{client.id} · {client.businessName}</p>
            </div>
          </div>
          <button onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7A99] transition hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Business Name" required value={form.businessName} onChange={(v) => handleChange('businessName', v)} />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[13px] font-medium text-[#07152F]">Industry *</label>
              <select
                required
                value={form.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                className="h-11 w-full rounded-xl border border-[#DDE6F5] bg-white px-3 text-[13px] text-[#07152F] outline-none transition focus:border-blue-600"
              >
                <option value="">Select industry</option>
                {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
              </select>
            </div>
            <InputField label="Contact Person" required value={form.contactPerson} onChange={(v) => handleChange('contactPerson', v)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InputField label="Email Address" required type="email" value={form.email} onChange={(v) => handleChange('email', v)} />
            <InputField label="Phone Number" required type="tel" value={form.phone} onChange={(v) => handleChange('phone', v)} />
          </div>

          <InputField label="Website" type="url" value={form.website || ''} onChange={(v) => handleChange('website', v)} placeholder="https://company.com" />

          <div className="grid grid-cols-2 gap-3">
            <InputField label="Country" required value={form.country} onChange={(v) => handleChange('country', v)} />
            <InputField label="City" required value={form.city} onChange={(v) => handleChange('city', v)} />
          </div>

          <InputField label="Business Address" value={form.address || ''} onChange={(v) => handleChange('address', v)} placeholder="Street address" />

          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-[#07152F]">Account Manager *</label>
            <select
              required
              value={form.accountManager}
              onChange={(e) => handleChange('accountManager', e.target.value)}
              className="h-11 w-full rounded-xl border border-[#DDE6F5] bg-white px-3 text-[13px] text-[#07152F] outline-none transition focus:border-blue-600"
            >
              <option value="">Select account manager</option>
              {accountManagers.map((am) => <option key={am} value={am}>{am}</option>)}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-3 border-t border-[#DDE6F5]">
            <button type="button" onClick={onClose} className="flex-1 h-11 rounded-xl border border-[#DDE6F5] text-[13px] font-medium text-[#6B7A99] transition hover:bg-slate-50">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex flex-1 h-11 items-center justify-center gap-2 rounded-xl bg-blue-600 text-[13px] font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70">
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />Saving...</>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function InputField({ label, value, onChange, required, type = 'text', placeholder }: {
  label: string; value: string; onChange: (v: string) => void; required?: boolean; type?: string; placeholder?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-medium text-[#07152F]">{label}{required && ' *'}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-[#DDE6F5] bg-white px-4 text-[13px] text-[#07152F] outline-none transition focus:border-blue-600 placeholder:text-[#6B7A99]/60"
      />
    </div>
  )
}

export default EditClientModal
