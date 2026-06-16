import { useState } from 'react'
import {
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Plus,
  Eye,
  Pencil,
  Ban,
  Play,
} from 'lucide-react'
import EditPlanModal from '../components/EditPlanModal'

type PlanStatus = 'Active' | 'Inactive'
type SubStatus = 'Active' | 'Trial' | 'Suspended' | 'Expired' | 'Cancelled'

// Official BigConnect AI Plans
const mockPlans = [
  { id: 'plan_001', name: 'Starter', monthlyFee: 'GHS 1,500', setupFee: 'GHS 2,500', rate: 'GHS 2.50/min', volume: '< 1,000 mins', aiAgentLimit: 5, knowledgeBases: 3, storage: '5GB', phoneNumbers: '1', status: 'Active' as PlanStatus, clientsOnPlan: 3 },
  { id: 'plan_002', name: 'Standard', monthlyFee: 'GHS 2,100', setupFee: 'GHS 2,500', rate: 'GHS 2.40/min', volume: '1,000 – 5,000 mins', aiAgentLimit: 10, knowledgeBases: 10, storage: '10GB', phoneNumbers: 'Multiple', status: 'Active' as PlanStatus, clientsOnPlan: 4 },
  { id: 'plan_003', name: 'Premium', monthlyFee: 'GHS 2,500', setupFee: 'GHS 2,500', rate: 'GHS 2.30/min', volume: '5,000 – 10,000 mins', aiAgentLimit: 15, knowledgeBases: 15, storage: '15GB', phoneNumbers: 'Multiple', status: 'Active' as PlanStatus, clientsOnPlan: 3 },
  { id: 'plan_004', name: 'Enterprise', monthlyFee: 'Custom', setupFee: 'Custom', rate: 'Custom', volume: '> 10,000 mins', aiAgentLimit: -1, knowledgeBases: -1, storage: 'Unlimited', phoneNumbers: 'Unlimited', status: 'Active' as PlanStatus, clientsOnPlan: 2 },
]

// Mock client subscriptions
const mockClientSubs = [
  { id: 'sub_001', clientName: 'KFC Ghana', planName: 'Enterprise', status: 'Active' as SubStatus, agentsUsed: '3 / Unlimited', kbUsed: '5 / Unlimited', minutesUsed: '12,400', rate: 'Custom', billingCycle: 'Monthly', renewalDate: 'Jul 15, 2026' },
  { id: 'sub_002', clientName: 'RightShop', planName: 'Standard', status: 'Active' as SubStatus, agentsUsed: '6 / 10', kbUsed: '4 / 10', minutesUsed: '2,400', rate: 'GHS 2.40/min', billingCycle: 'Monthly', renewalDate: 'Jul 16, 2026' },
  { id: 'sub_003', clientName: 'Bloom Advisors', planName: 'Starter', status: 'Active' as SubStatus, agentsUsed: '2 / 5', kbUsed: '1 / 3', minutesUsed: '320', rate: 'GHS 2.50/min', billingCycle: 'Monthly', renewalDate: 'Jul 20, 2026' },
  { id: 'sub_004', clientName: 'Caddyman Logistics', planName: 'Premium', status: 'Active' as SubStatus, agentsUsed: '4 / 15', kbUsed: '6 / 15', minutesUsed: '5,800', rate: 'GHS 2.30/min', billingCycle: 'Monthly', renewalDate: 'Jul 28, 2026' },
  { id: 'sub_005', clientName: 'Jumia Support', planName: 'Enterprise', status: 'Active' as SubStatus, agentsUsed: '8 / Unlimited', kbUsed: '12 / Unlimited', minutesUsed: '18,200', rate: 'Custom', billingCycle: 'Monthly', renewalDate: 'Jul 10, 2026' },
  { id: 'sub_006', clientName: 'Hubtel Payments', planName: 'Standard', status: 'Suspended' as SubStatus, agentsUsed: '1 / 10', kbUsed: '2 / 10', minutesUsed: '0', rate: 'GHS 2.40/min', billingCycle: 'Monthly', renewalDate: '—' },
  { id: 'sub_007', clientName: 'Zeepay Africa', planName: 'Starter', status: 'Trial' as SubStatus, agentsUsed: '0 / 5', kbUsed: '0 / 3', minutesUsed: '45', rate: 'GHS 2.50/min', billingCycle: 'Monthly', renewalDate: 'Jul 28, 2026' },
  { id: 'sub_008', clientName: 'Melcom Group', planName: 'Premium', status: 'Active' as SubStatus, agentsUsed: '7 / 15', kbUsed: '8 / 15', minutesUsed: '7,200', rate: 'GHS 2.30/min', billingCycle: 'Monthly', renewalDate: 'Jul 5, 2026' },
]

const subStatusConfig: Record<SubStatus, { color: string; dot: string; bg: string }> = {
  'Active': { color: 'text-emerald-700', dot: 'bg-emerald-500', bg: 'bg-emerald-50' },
  'Trial': { color: 'text-blue-700', dot: 'bg-blue-500', bg: 'bg-blue-50' },
  'Suspended': { color: 'text-red-700', dot: 'bg-red-500', bg: 'bg-red-50' },
  'Expired': { color: 'text-slate-600', dot: 'bg-slate-400', bg: 'bg-slate-100' },
  'Cancelled': { color: 'text-slate-500', dot: 'bg-slate-400', bg: 'bg-slate-100' },
}

type Tab = 'subscriptions' | 'plans' | 'enterprise' | 'requests'

function SubscriptionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('subscriptions')
  const [searchQuery, setSearchQuery] = useState('')
  const [editPlan, setEditPlan] = useState<typeof mockPlans[0] | null>(null)

  const activeSubs = mockClientSubs.filter((s) => s.status === 'Active').length
  const trialSubs = mockClientSubs.filter((s) => s.status === 'Trial').length
  const suspendedSubs = mockClientSubs.filter((s) => s.status === 'Suspended').length

  const filteredSubs = mockClientSubs.filter((sub) =>
    sub.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900">Subscriptions</h1>
          <p className="mt-0.5 text-[13px] text-slate-500">Manage plans, client subscriptions, and access control</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-blue-700">
          <Plus className="h-4 w-4" strokeWidth={1.5} />
          Create Plan
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <SummaryCard icon={<CheckCircle2 className="h-[18px] w-[18px] text-emerald-600" strokeWidth={1.5} />} value={String(activeSubs)} label="Active" />
        <SummaryCard icon={<Clock className="h-[18px] w-[18px] text-blue-600" strokeWidth={1.5} />} value={String(trialSubs)} label="Trial" />
        <SummaryCard icon={<AlertCircle className="h-[18px] w-[18px] text-red-500" strokeWidth={1.5} />} value={String(suspendedSubs)} label="Suspended" />
        <SummaryCard icon={<CreditCard className="h-[18px] w-[18px] text-violet-600" strokeWidth={1.5} />} value={String(mockPlans.length)} label="Plans" />
      </div>

      {/* Tabs */}
      <div className="inline-flex items-center gap-1 rounded-xl bg-[#F3F7FF] p-1">
        <button onClick={() => setActiveTab('subscriptions')} className={`rounded-lg px-4 py-2 text-[12px] font-medium transition ${activeTab === 'subscriptions' ? 'bg-blue-600 text-white' : 'text-[#6B7A99] hover:text-[#07152F]'}`}>
          Client Subscriptions
        </button>
        <button onClick={() => setActiveTab('plans')} className={`rounded-lg px-4 py-2 text-[12px] font-medium transition ${activeTab === 'plans' ? 'bg-blue-600 text-white' : 'text-[#6B7A99] hover:text-[#07152F]'}`}>
          Plans & Pricing
        </button>
        <button onClick={() => setActiveTab('enterprise')} className={`rounded-lg px-4 py-2 text-[12px] font-medium transition ${activeTab === 'enterprise' ? 'bg-blue-600 text-white' : 'text-[#6B7A99] hover:text-[#07152F]'}`}>
          Custom Enterprise
        </button>
        <button onClick={() => setActiveTab('requests')} className={`rounded-lg px-4 py-2 text-[12px] font-medium transition ${activeTab === 'requests' ? 'bg-blue-600 text-white' : 'text-[#6B7A99] hover:text-[#07152F]'}`}>
          Plan Requests
        </button>
      </div>

      {/* Plans Tab */}
      {activeTab === 'plans' && (
        <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Plan</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Monthly Fee</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Setup Fee</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Rate</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Volume</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">AI Agents</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">KB</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Storage</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Clients</th>
                  <th className="w-16 px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {mockPlans.map((plan) => (
                  <tr key={plan.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition">
                    <td className="px-6 py-4 text-[13px] font-semibold text-slate-900">{plan.name}</td>
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-900">{plan.monthlyFee}</td>
                    <td className="px-4 py-4 text-[12px] text-slate-600">{plan.setupFee}</td>
                    <td className="px-4 py-4 text-[12px] text-slate-700">{plan.rate}</td>
                    <td className="px-4 py-4 text-[11px] text-slate-500">{plan.volume}</td>
                    <td className="px-4 py-4 text-[12px] text-slate-700">{plan.aiAgentLimit === -1 ? 'Unlimited' : plan.aiAgentLimit}</td>
                    <td className="px-4 py-4 text-[12px] text-slate-700">{plan.knowledgeBases === -1 ? 'Unlimited' : plan.knowledgeBases}</td>
                    <td className="px-4 py-4 text-[12px] text-slate-700">{plan.storage}</td>
                    <td className="px-4 py-4 text-[12px] font-medium text-blue-600">{plan.clientsOnPlan}</td>
                    <td className="px-4 py-4"><button onClick={() => setEditPlan(plan)} className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Pencil className="h-3.5 w-3.5" strokeWidth={1.5} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Client Subscriptions Tab */}
      {activeTab === 'subscriptions' && (
        <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/50 px-3 py-2 w-72">
              <Search className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search client..." className="flex-1 bg-transparent text-[13px] text-slate-900 outline-none placeholder:text-slate-400" />
            </div>
            <span className="text-[12px] text-slate-400">{filteredSubs.length} subscriptions</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Client</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Plan</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">AI Agents</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">KB Used</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Minutes</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Rate</th>
                  <th className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Renewal</th>
                  <th className="w-28 px-4 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubs.map((sub) => {
                  const sc = subStatusConfig[sub.status]
                  return (
                    <tr key={sub.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition">
                      <td className="px-6 py-4 text-[13px] font-medium text-slate-900">{sub.clientName}</td>
                      <td className="px-4 py-4"><span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-700">{sub.planName}</span></td>
                      <td className="px-4 py-4"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.color}`}><span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />{sub.status}</span></td>
                      <td className="px-4 py-4 text-[12px] text-slate-700">{sub.agentsUsed}</td>
                      <td className="px-4 py-4 text-[12px] text-slate-700">{sub.kbUsed}</td>
                      <td className="px-4 py-4 text-[12px] text-slate-700">{sub.minutesUsed}</td>
                      <td className="px-4 py-4 text-[11px] text-slate-500">{sub.rate}</td>
                      <td className="px-4 py-4 text-[11px] text-slate-500">{sub.renewalDate}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="View"><Eye className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                          <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700" title="Edit"><Pencil className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                          {sub.status === 'Active' ? (
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500" title="Suspend"><Ban className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                          ) : sub.status === 'Suspended' ? (
                            <button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-emerald-50 hover:text-emerald-600" title="Reactivate"><Play className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Custom Enterprise Tab */}
      {activeTab === 'enterprise' && (
        <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <p className="text-[13px] font-semibold text-slate-900">Custom Enterprise Plans</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Client-specific packages created after discussion</p>
            </div>
            <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-[12px] font-medium text-white transition hover:bg-blue-700">
              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />Create Custom Plan
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Client</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Plan Name</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Monthly</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Rate</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Agents</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Minutes</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Channels</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Contract</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="w-20 px-4 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50/60 transition">
                  <td className="px-6 py-3.5 text-[12px] font-medium text-slate-900">Jumia Support</td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">Jumia Enterprise Custom</td>
                  <td className="px-4 py-3.5 text-[12px] font-medium text-slate-900">GHS 8,000</td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">GHS 2.10/min</td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">50</td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">20,000/mo</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">Voice, WhatsApp, SMS, Web</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">Jun 2026 – Jun 2027</td>
                  <td className="px-4 py-3.5"><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Active</span></td>
                  <td className="px-4 py-3.5"><button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Pencil className="h-3.5 w-3.5" strokeWidth={1.5} /></button></td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50/60 transition">
                  <td className="px-6 py-3.5 text-[12px] font-medium text-slate-900">KFC Ghana</td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">KFC Enterprise Plus</td>
                  <td className="px-4 py-3.5 text-[12px] font-medium text-slate-900">GHS 5,500</td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">GHS 2.15/min</td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">20</td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">15,000/mo</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">Voice, WhatsApp, Web Chat</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">Jan 2026 – Jan 2027</td>
                  <td className="px-4 py-3.5"><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Active</span></td>
                  <td className="px-4 py-3.5"><button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Pencil className="h-3.5 w-3.5" strokeWidth={1.5} /></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Custom Plan Requests Tab */}
      {activeTab === 'requests' && (
        <div className="rounded-2xl border border-slate-200/70 bg-white overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <p className="text-[13px] font-semibold text-slate-900">Custom Plan Requests</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Requests submitted by potential or existing clients for custom enterprise pricing</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Business</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Contact</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Expected Mins</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Agents</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Channels</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Status</th>
                  <th className="px-4 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Submitted</th>
                  <th className="w-20 px-4 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50/60 transition">
                  <td className="px-6 py-3.5 text-[12px] font-medium text-slate-900">Ghana Commercial Bank</td>
                  <td className="px-4 py-3.5"><p className="text-[12px] text-slate-700">Richard Amoah</p><p className="text-[10px] text-slate-400">richard@gcb.com.gh</p></td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">25,000</td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">30</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">Voice, WhatsApp, SMS, Web</td>
                  <td className="px-4 py-3.5"><span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-medium text-blue-700"><span className="h-1.5 w-1.5 rounded-full bg-blue-500" />New</span></td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">Jun 15, 2026</td>
                  <td className="px-4 py-3.5"><button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Eye className="h-3.5 w-3.5" strokeWidth={1.5} /></button></td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50/60 transition">
                  <td className="px-6 py-3.5 text-[12px] font-medium text-slate-900">Stanbic Bank Ghana</td>
                  <td className="px-4 py-3.5"><p className="text-[12px] text-slate-700">Grace Mensah</p><p className="text-[10px] text-slate-400">grace@stanbic.com.gh</p></td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">15,000</td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">20</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">Voice, WhatsApp, Web</td>
                  <td className="px-4 py-3.5"><span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-medium text-amber-700"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" />Under Review</span></td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">Jun 10, 2026</td>
                  <td className="px-4 py-3.5"><button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Eye className="h-3.5 w-3.5" strokeWidth={1.5} /></button></td>
                </tr>
                <tr className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition">
                  <td className="px-6 py-3.5 text-[12px] font-medium text-slate-900">MTN Ghana</td>
                  <td className="px-4 py-3.5"><p className="text-[12px] text-slate-700">Kofi Darko</p><p className="text-[10px] text-slate-400">kofi.darko@mtn.com.gh</p></td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">50,000</td>
                  <td className="px-4 py-3.5 text-[12px] text-slate-700">100</td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">Voice, WhatsApp, SMS, Web, Email</td>
                  <td className="px-4 py-3.5"><span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-medium text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Offer Created</span></td>
                  <td className="px-4 py-3.5 text-[11px] text-slate-500">Jun 5, 2026</td>
                  <td className="px-4 py-3.5"><button className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"><Eye className="h-3.5 w-3.5" strokeWidth={1.5} /></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Plan Modal */}
      <EditPlanModal
        plan={editPlan}
        open={!!editPlan}
        onClose={() => setEditPlan(null)}
        onSaved={(updated) => {
          console.log('PATCH /api/v1/admin/subscription-plans/' + updated.id, updated)
          setEditPlan(null)
        }}
      />
    </div>
  )
}

function SummaryCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white p-4">
      <div className="flex items-center gap-2.5 mb-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50">{icon}</div></div>
      <p className="text-[22px] font-bold text-slate-900">{value}</p>
      <p className="text-[12px] text-slate-500 mt-0.5">{label}</p>
    </div>
  )
}

export default SubscriptionsPage
