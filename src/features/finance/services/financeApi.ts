import { apiClient } from '../../../core/api/client'
import type { Payment, Invoice, WebhookLog, FinanceOverview } from '../types'

// Finance API service — monitoring & reconciliation dashboard
// NO manual mark-as-paid. Everything is API-driven through payment gateways.
//
// Flow: Gateway webhook → SaaS verifies → Records update → Admin monitors

// --- Overview ---

/**
 * GET /api/v1/admin/finance/overview
 * Dashboard summary stats
 */
export async function fetchFinanceOverview(): Promise<FinanceOverview> {
  return apiClient.get<FinanceOverview>('/finance/overview')
}

// --- Payments ---

/**
 * GET /api/v1/admin/payments
 * All payment transactions received through third-party gateway
 */
export async function fetchPayments(): Promise<Payment[]> {
  return apiClient.get<Payment[]>('/payments')
}

/**
 * GET /api/v1/admin/payments/:paymentId
 * Single payment detail
 */
export async function fetchPaymentById(paymentId: string): Promise<Payment> {
  return apiClient.get<Payment>(`/payments/${paymentId}`)
}

// --- Invoices ---

/**
 * GET /api/v1/admin/invoices
 * All invoices across all clients
 */
export async function fetchInvoices(): Promise<Invoice[]> {
  return apiClient.get<Invoice[]>('/invoices')
}

/**
 * GET /api/v1/admin/invoices/:invoiceId
 * Single invoice detail
 */
export async function fetchInvoiceById(invoiceId: string): Promise<Invoice> {
  return apiClient.get<Invoice>(`/invoices/${invoiceId}`)
}

// --- Receipts ---

/**
 * GET /api/v1/admin/receipts
 * All receipts (generated after successful payment)
 */
export async function fetchReceipts() {
  return apiClient.get('/receipts')
}

/**
 * GET /api/v1/admin/receipts/:receiptId
 */
export async function fetchReceiptById(receiptId: string) {
  return apiClient.get(`/receipts/${receiptId}`)
}

// --- Gateway Transactions ---

/**
 * GET /api/v1/admin/payment-gateway-transactions
 * Raw transactions from all gateways
 */
export async function fetchGatewayTransactions() {
  return apiClient.get('/payment-gateway-transactions')
}

// --- Webhook Logs ---

/**
 * GET /api/v1/admin/payment-webhook-logs
 * All webhook events received from payment providers
 */
export async function fetchWebhookLogs(): Promise<WebhookLog[]> {
  return apiClient.get<WebhookLog[]>('/payment-webhook-logs')
}

// --- Reconciliation ---

/**
 * GET /api/v1/admin/finance/reconciliation
 * Compare gateway records with internal system records
 */
export async function fetchReconciliation() {
  return apiClient.get('/finance/reconciliation')
}

// --- Reports ---

/**
 * GET /api/v1/admin/finance/reports
 * Finance reports and exports
 */
export async function fetchFinanceReports() {
  return apiClient.get('/finance/reports')
}

// --- Payment Gateway Management ---

/**
 * GET /api/v1/admin/payment-gateways
 * List all configured payment gateways
 */
export async function fetchPaymentGateways() {
  return apiClient.get('/payment-gateways')
}

/**
 * POST /api/v1/admin/payment-gateways/:gatewayId/enable
 */
export async function enableGateway(gatewayId: string) {
  return apiClient.post(`/payment-gateways/${gatewayId}/enable`, {})
}

/**
 * POST /api/v1/admin/payment-gateways/:gatewayId/disable
 */
export async function disableGateway(gatewayId: string) {
  return apiClient.post(`/payment-gateways/${gatewayId}/disable`, {})
}

/**
 * POST /api/v1/admin/payment-gateways/:gatewayId/test
 */
export async function testGateway(gatewayId: string) {
  return apiClient.post(`/payment-gateways/${gatewayId}/test`, {})
}
