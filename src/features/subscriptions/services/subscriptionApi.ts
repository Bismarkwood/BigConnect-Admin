import { apiClient } from '../../../core/api/client'
import type {
  SubscriptionPlan,
  ClientSubscription,
  SubscriptionEntitlements,
  CreatePlanPayload,
  UpdateClientSubscriptionPayload,
} from '../types'

// Subscriptions & Pricing API service
//
// Admin edits pricing → SaaS backend updates → Signup page reads latest active plans
// Frontend only displays pricing. Backend MUST enforce the plan.
//
// Plan versioning: Don't overwrite old pricing. Existing clients keep their version
// unless manually migrated. Changes apply to new signups by default.

// --- Subscription Plans (Admin manages packages) ---

/**
 * GET /api/v1/admin/subscription-plans
 * Fetch all subscription plans (all statuses)
 */
export async function fetchPlans(): Promise<SubscriptionPlan[]> {
  return apiClient.get<SubscriptionPlan[]>('/subscription-plans')
}

/**
 * POST /api/v1/admin/subscription-plans
 * Create a new subscription plan
 */
export async function createPlan(data: CreatePlanPayload): Promise<SubscriptionPlan> {
  return apiClient.post<SubscriptionPlan>('/subscription-plans', data)
}

/**
 * GET /api/v1/admin/subscription-plans/:planId
 * Get single plan details
 */
export async function fetchPlanById(planId: string): Promise<SubscriptionPlan> {
  return apiClient.get<SubscriptionPlan>(`/subscription-plans/${planId}`)
}

/**
 * PATCH /api/v1/admin/subscription-plans/:planId
 * Edit an existing plan (creates new version for existing subscribers)
 */
export async function updatePlan(planId: string, data: Partial<CreatePlanPayload>): Promise<SubscriptionPlan> {
  return apiClient.patch<SubscriptionPlan>(`/subscription-plans/${planId}`, data)
}

/**
 * POST /api/v1/admin/subscription-plans/:planId/publish
 * Publish plan — makes it visible on signup/public pricing
 */
export async function publishPlan(planId: string): Promise<SubscriptionPlan> {
  return apiClient.post<SubscriptionPlan>(`/subscription-plans/${planId}/publish`, {})
}

/**
 * POST /api/v1/admin/subscription-plans/:planId/deactivate
 * Deactivate plan — removes from signup, existing clients unaffected
 */
export async function deactivatePlan(planId: string): Promise<SubscriptionPlan> {
  return apiClient.post<SubscriptionPlan>(`/subscription-plans/${planId}/deactivate`, {})
}

/**
 * POST /api/v1/admin/subscription-plans/:planId/duplicate
 * Duplicate a plan to create a variant
 */
export async function duplicatePlan(planId: string): Promise<SubscriptionPlan> {
  return apiClient.post<SubscriptionPlan>(`/subscription-plans/${planId}/duplicate`, {})
}

/**
 * GET /api/v1/admin/subscription-plans/:planId/clients
 * View all clients on a specific plan
 */
export async function fetchClientsOnPlan(planId: string): Promise<ClientSubscription[]> {
  return apiClient.get<ClientSubscription[]>(`/subscription-plans/${planId}/clients`)
}

/**
 * GET /api/v1/admin/subscription-plans/history
 * View plan change history (versioning)
 */
export async function fetchPlanHistory(): Promise<unknown[]> {
  return apiClient.get('/subscription-plans/history')
}

// --- Client Subscriptions ---

/**
 * GET /api/v1/admin/client-subscriptions
 * Fetch all client subscriptions across all clients
 */
export async function fetchAllClientSubscriptions(): Promise<ClientSubscription[]> {
  return apiClient.get<ClientSubscription[]>('/client-subscriptions')
}

/**
 * GET /api/v1/admin/clients/:clientId/subscription
 * Fetch one client's current subscription
 */
export async function fetchClientSubscription(clientId: string): Promise<ClientSubscription> {
  return apiClient.get<ClientSubscription>(`/clients/${clientId}/subscription`)
}

/**
 * PATCH /api/v1/admin/clients/:clientId/subscription
 * Edit a client's subscription (upgrade, downgrade, change limits)
 */
export async function updateClientSubscription(clientId: string, data: UpdateClientSubscriptionPayload): Promise<ClientSubscription> {
  return apiClient.patch<ClientSubscription>(`/clients/${clientId}/subscription`, data)
}

/**
 * POST /api/v1/admin/clients/:clientId/subscription/suspend
 * Suspend client subscription access
 */
export async function suspendSubscription(clientId: string, reason: string): Promise<ClientSubscription> {
  return apiClient.post<ClientSubscription>(`/clients/${clientId}/subscription/suspend`, { reason })
}

/**
 * POST /api/v1/admin/clients/:clientId/subscription/reactivate
 * Reactivate a suspended/expired subscription
 */
export async function reactivateSubscription(clientId: string): Promise<ClientSubscription> {
  return apiClient.post<ClientSubscription>(`/clients/${clientId}/subscription/reactivate`, {})
}

/**
 * POST /api/v1/admin/clients/:clientId/subscription/renew
 * Renew subscription for another 30 days
 */
export async function renewSubscription(clientId: string): Promise<ClientSubscription> {
  return apiClient.post<ClientSubscription>(`/clients/${clientId}/subscription/renew`, {})
}

/**
 * POST /api/v1/admin/clients/:clientId/subscription/extend
 * Manually extend subscription end date
 */
export async function extendSubscription(clientId: string, payload: { days: number; reason: string }): Promise<ClientSubscription> {
  return apiClient.post<ClientSubscription>(`/clients/${clientId}/subscription/extend`, payload)
}

/**
 * GET /api/v1/admin/clients/:clientId/subscription/entitlements
 * Get what the client is allowed to use based on their plan
 * This is the MOST IMPORTANT endpoint — tells the system what is allowed
 */
export async function fetchEntitlements(clientId: string): Promise<SubscriptionEntitlements> {
  return apiClient.get<SubscriptionEntitlements>(`/clients/${clientId}/subscription/entitlements`)
}
