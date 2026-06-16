import { apiClient } from '../../../core/api/client'

// Custom Enterprise Plans API
// Created by BigConnect team for specific high-volume clients after discussion
// These do NOT appear on public pricing — only visible to admin + assigned client

export interface CustomEnterprisePlan {
  id: string
  clientId: string
  clientName: string
  planName: string
  // Pricing
  monthlyFee: string
  setupFee: string
  perMinuteRate: string
  currency: string
  billingCycle: string
  // Contract
  contractStartDate: string
  contractEndDate: string
  // Limits
  monthlyMinutes: number
  aiAgentLimit: number
  knowledgeBaseLimit: number
  storageLimit: string
  phoneNumberLimit: string
  smsLimit: number
  whatsappLimit: number
  conversationLimit: number
  // Channels
  allowedChannels: string[]
  // Enterprise features
  enterpriseFeatures: string[]
  // Meta
  status: 'Active' | 'Draft' | 'Expired' | 'Suspended'
  preparedBy: string
  approvedBy: string
  internalNotes: string
  createdAt: string
}

export interface CreateCustomPlanPayload {
  clientId: string
  planName: string
  monthlyFee: string
  setupFee: string
  perMinuteRate: string
  currency: string
  billingCycle: string
  contractStartDate: string
  contractEndDate: string
  monthlyMinutes: number
  aiAgentLimit: number
  knowledgeBaseLimit: number
  storageLimit: string
  phoneNumberLimit: string
  smsLimit: number
  whatsappLimit: number
  conversationLimit: number
  allowedChannels: string[]
  enterpriseFeatures: string[]
  preparedBy: string
  approvedBy: string
  internalNotes: string
}

/**
 * GET /api/v1/admin/custom-enterprise-plans
 * Fetch all custom enterprise plans
 */
export async function fetchCustomPlans(): Promise<CustomEnterprisePlan[]> {
  return apiClient.get<CustomEnterprisePlan[]>('/custom-enterprise-plans')
}

/**
 * POST /api/v1/admin/custom-enterprise-plans
 * Create a new custom enterprise plan for a client
 */
export async function createCustomPlan(data: CreateCustomPlanPayload): Promise<CustomEnterprisePlan> {
  return apiClient.post<CustomEnterprisePlan>('/custom-enterprise-plans', data)
}

/**
 * GET /api/v1/admin/custom-enterprise-plans/:planId
 * View one custom plan
 */
export async function fetchCustomPlanById(planId: string): Promise<CustomEnterprisePlan> {
  return apiClient.get<CustomEnterprisePlan>(`/custom-enterprise-plans/${planId}`)
}

/**
 * PATCH /api/v1/admin/custom-enterprise-plans/:planId
 * Edit a custom enterprise plan
 */
export async function updateCustomPlan(planId: string, data: Partial<CreateCustomPlanPayload>): Promise<CustomEnterprisePlan> {
  return apiClient.patch<CustomEnterprisePlan>(`/custom-enterprise-plans/${planId}`, data)
}

/**
 * POST /api/v1/admin/clients/:clientId/subscription/assign-custom-plan
 * Assign a custom enterprise plan to a client
 */
export async function assignCustomPlan(clientId: string, payload: { customPlanId: string; effectiveDate: string; notes: string }): Promise<void> {
  return apiClient.post(`/clients/${clientId}/subscription/assign-custom-plan`, payload)
}
