// Client module types — mirrors the SaaS platform API schema

export type ClientStatus =
  | 'Pending Setup'
  | 'Trial'
  | 'Active'
  | 'Suspended'
  | 'Expired'
  | 'Cancelled'

export interface Client {
  id: string
  businessName: string
  industry: string
  contactPerson: string
  email: string
  phone: string
  website?: string
  country: string
  city: string
  address?: string
  package: string
  paymentStatus: 'Paid' | 'Pending' | 'Overdue' | 'None'
  status: ClientStatus
  aiAgentsCount: number
  channelsCount: number
  accountManager: string
  dateAdded: string
}

export interface ClientDetail extends Client {
  subscription: {
    plan: string
    billingCycle: 'Monthly' | 'Yearly'
    nextBillingDate: string
    amount: string
  }
  onboarding: {
    step: string
    progress: number
    checklist: { label: string; completed: boolean }[]
  }
  usage: {
    conversations: number
    apiCalls: number
    storageUsed: string
    percentage: number
  }
  openTickets: number
  lastActivity: string
}

export interface CreateClientPayload {
  businessName: string
  industry: string
  contactPerson: string
  email: string
  phone: string
  website?: string
  country: string
  city: string
  address?: string
  accountManager: string
}
