// Subscriptions & Pricing types — mirrors SaaS platform API schema
//
// Admin edits pricing plans → SaaS backend updates → Signup page reads latest active plans
// Pricing cards on signup/client website should NOT be hardcoded
//
// Hybrid pricing model: Setup Fee + Monthly Fee + Per-Minute Usage Fee

export type PlanStatus = 'Active' | 'Inactive' | 'Draft' | 'Deprecated'
export type SubscriptionStatus = 'Active' | 'Expiring Soon' | 'Expired' | 'Suspended' | 'Pending Payment' | 'Pending Client Acceptance' | 'Trial' | 'Cancelled'
export type BillingCycle = 'Monthly' | 'Quarterly' | 'Yearly'

export interface SubscriptionPlan {
  id: string
  name: string
  code: string
  description: string
  version: number
  // Pricing
  perMinuteRate: string
  monthlyFee: string
  setupFee: string
  currency: string
  // Volume band
  volumeBand: string
  minMinutes: number
  maxMinutes: number
  // Limits
  aiAgentLimit: number       // -1 = unlimited
  knowledgeBaseLimit: number // -1 = unlimited
  storageLimit: string
  phoneNumberLimit: string
  callMinuteLimit: number
  conversationLimit: number
  // Features
  features: string[]
  // Display
  isRecommended: boolean
  ctaLabel: string
  displayOrder: number
  // Visibility
  showOnSignup: boolean
  showOnPublicPricing: boolean
  allowClientSignup: boolean
  adminOnly: boolean
  // Status
  status: PlanStatus
  publishedAt?: string
  clientsOnPlan: number
  createdAt: string
  updatedAt: string
}

export interface ClientSubscription {
  id: string
  clientId: string
  clientName: string
  planId: string
  planName: string
  planVersion: number
  status: SubscriptionStatus
  billingCycle: BillingCycle
  // 30-day validity
  startDate: string
  endDate: string
  durationDays: number // always 30
  renewalDate: string
  gracePeriodDays: number
  autoDisable: boolean
  renewalReminderSent: boolean
  // Usage
  aiAgentsUsed: number
  aiAgentLimit: number
  knowledgeBasesUsed: number
  knowledgeBaseLimit: number
  minutesUsed: number
  minuteLimit: number
  storageUsed: string
  storageLimit: string
  // Pricing
  perMinuteRate: string
  monthlyFee: string
  setupFee: string
  currency: string
}

export interface SubscriptionEntitlements {
  planName: string
  monthlyFee: string
  setupFee: string
  perMinuteRate: string
  volumeBand: string
  aiAgentLimit: number
  aiAgentsUsed: number
  knowledgeBaseLimit: number
  knowledgeBasesUsed: number
  storageLimit: string
  storageUsed: string
  phoneNumberLimit: string
  phoneNumbersUsed: number
  callMinuteLimit: number
  callMinutesUsed: number
  conversationLimit: number
  conversationsUsed: number
  features: string[]
}

export interface CreatePlanPayload {
  name: string
  code: string
  description: string
  perMinuteRate: string
  monthlyFee: string
  setupFee: string
  currency: string
  volumeBand: string
  minMinutes: number
  maxMinutes: number
  aiAgentLimit: number
  knowledgeBaseLimit: number
  storageLimit: string
  phoneNumberLimit: string
  callMinuteLimit: number
  conversationLimit: number
  features: string[]
  isRecommended: boolean
  ctaLabel: string
  displayOrder: number
  showOnSignup: boolean
  showOnPublicPricing: boolean
  allowClientSignup: boolean
  adminOnly: boolean
}

export interface UpdateClientSubscriptionPayload {
  planId?: string
  billingCycle?: BillingCycle
  renewalDate?: string
  aiAgentLimit?: number
  knowledgeBaseLimit?: number
  storageLimit?: string
  callMinuteLimit?: number
  conversationLimit?: number
  perMinuteRate?: string
  monthlyFee?: string
  status?: SubscriptionStatus
  note?: string
}
