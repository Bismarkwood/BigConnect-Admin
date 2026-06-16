import { apiClient } from '../../../core/api/client'
import type { Subscription, Invoice, BillingSummary } from '../types'

// Billing & Subscription API service
// Admin platform connects to client's billing data in the main SaaS platform
// Read-only view of subscription and payment history

/**
 * GET /api/v1/admin/clients/:clientId/billing/summary
 * Fetch billing summary for quick overview
 */
export async function fetchBillingSummary(clientId: string): Promise<BillingSummary> {
  return apiClient.get<BillingSummary>(`/clients/${clientId}/billing/summary`)
}

/**
 * GET /api/v1/admin/clients/:clientId/billing/subscription
 * Fetch current subscription details
 */
export async function fetchSubscription(clientId: string): Promise<Subscription> {
  return apiClient.get<Subscription>(`/clients/${clientId}/billing/subscription`)
}

/**
 * GET /api/v1/admin/clients/:clientId/billing/invoices
 * Fetch all invoices for the client
 */
export async function fetchInvoices(clientId: string): Promise<Invoice[]> {
  return apiClient.get<Invoice[]>(`/clients/${clientId}/billing/invoices`)
}

/**
 * GET /api/v1/admin/clients/:clientId/billing/invoices/:invoiceId
 * Fetch single invoice detail
 */
export async function fetchInvoiceById(clientId: string, invoiceId: string): Promise<Invoice> {
  return apiClient.get<Invoice>(`/clients/${clientId}/billing/invoices/${invoiceId}`)
}
