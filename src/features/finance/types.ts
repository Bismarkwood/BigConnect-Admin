// Finance types — fully API-driven, no manual payment confirmation
// Flow: Client pays → Gateway webhook → SaaS verifies → Records update → Admin monitors

export type PaymentStatus = 'Pending' | 'Processing' | 'Successful' | 'Failed' | 'Cancelled' | 'Refunded' | 'Reversed' | 'Expired'
export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Cancelled' | 'Refunded'
export type WebhookStatus = 'Received' | 'Verified' | 'Processed' | 'Failed' | 'Ignored' | 'Duplicate'
export type ReconciliationStatus = 'Matched' | 'Unmatched' | 'Gateway Paid / System Pending' | 'Amount Mismatch' | 'Duplicate Transaction' | 'Under Review' | 'Resolved'

export interface Payment {
  id: string
  clientName: string
  planName: string
  invoiceId: string
  gateway: string
  amount: string
  currency: string
  method: string
  status: PaymentStatus
  gatewayReference: string
  paymentDate: string
  subscriptionStatus: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  clientName: string
  amount: string
  currency: string
  status: InvoiceStatus
  issuedDate: string
  dueDate: string
  paidDate?: string
}

export interface WebhookLog {
  id: string
  gateway: string
  reference: string
  eventType: string
  status: WebhookStatus
  receivedAt: string
  processedAt?: string
}

export interface FinanceOverview {
  totalRevenue: string
  successfulPayments: number
  pendingPayments: number
  failedPayments: number
  activeSubscriptions: number
  expiredSubscriptions: number
  gatewayErrors: number
  webhookFailures: number
}
