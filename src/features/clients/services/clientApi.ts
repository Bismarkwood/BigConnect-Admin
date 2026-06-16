import { apiClient } from '../../../core/api/client'
import type { Client, CreateClientPayload } from '../types'

// Client API service — connects to the main BigConnect AI SaaS platform
// Admin platform = internal control panel
// SaaS platform = source of truth
//
// Flow: Admin Platform → Calls API → SaaS Backend → SaaS Database

/**
 * GET /api/v1/clients
 * Fetch all clients from the SaaS backend
 * Used when: BigConnect team opens the Clients page
 */
export async function fetchClients(): Promise<Client[]> {
  return apiClient.get<Client[]>('/clients')
}

/**
 * GET /api/v1/clients/:clientId
 * Fetch full details of one client
 * Used when: Admin clicks "View Client"
 */
export async function fetchClientById(clientId: string): Promise<Client> {
  return apiClient.get<Client>(`/clients/${clientId}`)
}

/**
 * POST /api/v1/clients
 * Create a new client in the SaaS platform
 * Used when: BigConnect team clicks "Add Client" and submits the form
 *
 * The SaaS backend will:
 * - Create client record
 * - Generate client ID
 * - Create client workspace/tenant
 * - Set status to "Pending Setup"
 * - Prepare onboarding checklist
 */
export async function createClient(data: CreateClientPayload): Promise<Client> {
  return apiClient.post<Client>('/clients', data)
}

/**
 * PATCH /api/v1/clients/:clientId
 * Update client details without recreating the client
 * Used when: Changing phone number, contact person, address, website, or account manager
 */
export async function updateClient(clientId: string, data: Partial<CreateClientPayload>): Promise<Client> {
  return apiClient.patch<Client>(`/clients/${clientId}`, data)
}

/**
 * PATCH /api/v1/clients/:clientId/status
 * Change client status (activate, suspend, cancel, etc.)
 * Used when: Admin suspends, activates, or cancels a client
 *
 * Statuses: Pending Setup | Trial | Active | Suspended | Expired | Cancelled
 */
export async function updateClientStatus(
  clientId: string,
  payload: {
    status: string
    reason: string
    changedBy: string
  }
): Promise<Client> {
  return apiClient.patch<Client>(`/clients/${clientId}/status`, {
    ...payload,
    date: new Date().toISOString(),
  })
}

/**
 * GET /api/v1/clients/:clientId/summary
 * Fetch the full client summary for the detail page
 * Returns everything needed to display the client overview:
 * - Business name, status, subscription plan, payment status
 * - AI agents count, channels connected, knowledge base status
 * - Usage percentage, conversations this month, open tickets
 * - Onboarding progress, last activity
 */
export async function fetchClientSummary(clientId: string) {
  return apiClient.get(`/clients/${clientId}/summary`)
}
