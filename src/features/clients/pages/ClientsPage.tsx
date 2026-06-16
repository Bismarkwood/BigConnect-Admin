import { useState } from 'react'
import {
  Users,
  Plus,
  Search,
  Eye,
  Pencil,
  Ban,
  CheckCircle2,
  Filter,
} from 'lucide-react'
import { mockClients } from '../data/mockClients'
import AddClientModal from '../components/AddClientModal'
import ClientProfileModal from '../components/ClientProfileModal'
import FilterDropdown from '../../../core/components/FilterDropdown'
import { createClient } from '../services/clientApi'
import type { Client, ClientStatus, CreateClientPayload } from '../types'

const statusColors: Record<ClientStatus, string> = {
  'Active': 'bg-emerald-50 text-emerald-700',
  'Pending Setup': 'bg-amber-50 text-amber-700',
  'Trial': 'bg-blue-50 text-blue-700',
  'Suspended': 'bg-red-50 text-red-700',
  'Expired': 'bg-slate-100 text-slate-600',
  'Cancelled': 'bg-slate-100 text-slate-500',
}

const statusDots: Record<ClientStatus, string> = {
  'Active': 'bg-emerald-500',
  'Pending Setup': 'bg-amber-500',
  'Trial': 'bg-blue-500',
  'Suspended': 'bg-red-500',
  'Expired': 'bg-slate-400',
  'Cancelled': 'bg-slate-400',
}

const paymentColors: Record<string, string> = {
  'Paid': 'text-emerald-600',
  'Pending': 'text-amber-600',
  'Overdue': 'text-red-600',
  'None': 'text-slate-400',
}

function ClientsPage() {
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  // Load clients — TODO: Replace with: fetchClients().then(setClients)
  const [clients, setClients] = useState<Client[]>(mockClients)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  // Filter clients
  const filteredClients = clients.filter((client) => {
    const matchesSearch = client.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreateClient = async (data: CreateClientPayload) => {
    try {
      // POST /api/v1/clients — sends data to main SaaS platform
      const newClient = await createClient(data)
      setClients((prev) => [newClient, ...prev])
    } catch {
      // Fallback for now while API is not connected
      const tempClient: Client = {
        id: `client_${Date.now()}`,
        businessName: data.businessName,
        industry: data.industry,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        website: data.website,
        country: data.country,
        city: data.city,
        address: data.address,
        package: 'Starter',
        paymentStatus: 'None',
        status: 'Pending Setup',
        aiAgentsCount: 0,
        channelsCount: 0,
        accountManager: data.accountManager,
        dateAdded: new Date().toISOString().split('T')[0],
      }
      setClients((prev) => [tempClient, ...prev])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900">Clients</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">Manage businesses using BigConnect AI</p>
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Add Client
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden">
        {/* Table toolbar */}
        <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 w-full sm:w-72">
            <Search className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clients..."
              className="flex-1 bg-transparent text-[13px] text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <FilterDropdown
              value={statusFilter}
              onChange={setStatusFilter}
              icon={<Filter className="h-3.5 w-3.5 text-slate-400" strokeWidth={1.5} />}
              placeholder="All Statuses"
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: 'Active', label: 'Active', dot: 'bg-emerald-500' },
                { value: 'Pending Setup', label: 'Pending Setup', dot: 'bg-amber-500' },
                { value: 'Trial', label: 'Trial', dot: 'bg-blue-500' },
                { value: 'Suspended', label: 'Suspended', dot: 'bg-red-500' },
                { value: 'Expired', label: 'Expired', dot: 'bg-slate-400' },
                { value: 'Cancelled', label: 'Cancelled', dot: 'bg-slate-400' },
              ]}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="w-12 px-6 py-4">
                  <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-blue-600" />
                </th>
                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">Business Name</th>
                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">Industry</th>
                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">Package</th>
                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">Payment</th>
                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">Status</th>
                <th className="px-4 py-4 text-left text-[12px] font-semibold uppercase tracking-wide text-slate-500">Manager</th>
                <th className="w-28 px-4 py-4 text-right text-[12px] font-semibold uppercase tracking-wide text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/60">
                  <td className="w-12 px-6 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-blue-600" />
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-[13px] font-medium text-slate-900">{client.businessName}</p>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-slate-600">{client.industry}</td>
                  <td className="px-4 py-4 text-[13px] text-slate-600">{client.package}</td>
                  <td className="px-4 py-4">
                    <span className={`text-[13px] font-medium ${paymentColors[client.paymentStatus]}`}>
                      {client.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${statusColors[client.status]}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${statusDots[client.status]}`} />
                      {client.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-[13px] text-slate-500">{client.accountManager}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        title="View"
                      >
                        <Eye className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => setSelectedClient(client)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                      <button
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        title={client.status === 'Active' ? 'Suspend' : 'Activate'}
                      >
                        {client.status === 'Active' ? (
                          <Ban className="h-4 w-4" strokeWidth={1.5} />
                        ) : (
                          <CheckCircle2 className="h-4 w-4" strokeWidth={1.5} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-[13px] text-slate-500">
            Showing <span className="font-medium text-blue-600">{filteredClients.length}</span> of {clients.length} clients
          </p>
          <div className="flex items-center gap-1">
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-600 bg-blue-600 text-[13px] font-medium text-white">
              1
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50">
              2
            </button>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50">
              3
            </button>
            <span className="px-1 text-slate-400">...</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-[13px] font-medium text-slate-600 transition hover:bg-slate-50">
              &gt;
            </button>
          </div>
        </div>

        {filteredClients.length === 0 && (
          <div className="py-12 text-center">
            <Users className="mx-auto h-10 w-10 text-slate-300" strokeWidth={1.5} />
            <p className="mt-3 text-sm text-slate-500">No clients found</p>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      <AddClientModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSave={handleCreateClient}
      />

      {/* Client Profile Modal */}
      <ClientProfileModal
        client={selectedClient}
        open={!!selectedClient}
        onClose={() => setSelectedClient(null)}
      />
    </div>
  )
}

export default ClientsPage
