// Billing & Subscription types — mirrors SaaS platform API schema

export type SubscriptionStatus = 'Active' | 'Trial' | 'Past Due' | 'Cancelled' | 'Expired'
export type PaymentStatus = 'Paid' | 'Pending' | 'Overdue' | 'Failed' | 'Refunded'
export type BillingCycle = 'Monthly' | 'Quarterly' | 'Yearly'

export interface Subscription {
  id: string
  plan: string
  billingCycle: BillingCycle
  amount: string
  currency: string
  status: SubscriptionStatus
  startDate: string
  nextBillingDate: string
  features: string[]
}

export interface Invoice {
  id: string
  invoiceNumber: string
  amount: string
  currency: string
  status: PaymentStatus
  issuedDate: string
  dueDate: string
  paidDate?: string
  paymentMethod?: string
}

export interface BillingSummary {
  currentPlan: string
  billingCycle: BillingCycle
  monthlyAmount: string
  status: SubscriptionStatus
  nextBilling: string
  totalPaid: string
  outstandingBalance: string
  invoiceCount: number
}
