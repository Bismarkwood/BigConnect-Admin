import { apiClient } from '../../../core/api/client'

// Custom Plan Request API
// Flow: Client submits request → SaaS stores → Admin reviews → Admin creates custom plan → Sends offer

export type RequestStatus = 'New' | 'Under Review' | 'Offer Created' | 'Sent to Client' | 'Accepted' | 'Rejected' | 'Expired'

export interface CustomPlanRequest {
  id: string
  businessName: string
  contactPerson: string
  email: string
  phone: string
  industry: string
  expectedMinutes: number
  agentsNeeded: number
  channelsNeeded: string[]
  knowledgeBaseSize: string
  numberOfUsers: number
  specialRequirements: string
  status: RequestStatus
  submittedAt: string
}

/**
 * GET /api/v1/admin/custom-plan-requests
 * Fetch all custom plan requests from clients
 */
export async function fetchCustomPlanRequests(): Promise<CustomPlanRequest[]> {
  return apiClient.get<CustomPlanRequest[]>('/custom-plan-requests')
}

/**
 * GET /api/v1/admin/custom-plan-requests/:requestId
 * View one request detail
 */
export async function fetchCustomPlanRequestById(requestId: string): Promise<CustomPlanRequest> {
  return apiClient.get<CustomPlanRequest>(`/custom-plan-requests/${requestId}`)
}

/**
 * PATCH /api/v1/admin/custom-plan-requests/:requestId
 * Update request status (Under Review, etc.)
 */
export async function updateRequestStatus(requestId: string, status: RequestStatus): Promise<CustomPlanRequest> {
  return apiClient.patch<CustomPlanRequest>(`/custom-plan-requests/${requestId}`, { status })
}

/**
 * POST /api/v1/admin/clients/:clientId/subscription/custom-offer
 * Send custom plan offer to client
 */
export async function sendCustomOffer(clientId: string, payload: { customPlanId: string; offerNote: string; expiryDate: string }): Promise<void> {
  return apiClient.post(`/clients/${clientId}/subscription/custom-offer`, payload)
}

/**
 * POST /api/v1/admin/clients/:clientId/subscription/custom-offer/:offerId/activate
 * Activate a custom offer after client accepts
 */
export async function activateCustomOffer(clientId: string, offerId: string): Promise<void> {
  return apiClient.post(`/clients/${clientId}/subscription/custom-offer/${offerId}/activate`, {})
}
