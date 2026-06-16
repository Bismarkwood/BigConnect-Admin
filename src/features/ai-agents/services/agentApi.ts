import { apiClient } from '../../../core/api/client'
import type { AIAgent, AgentSummary, UpdateAgentPayload, AgentTestResult } from '../types'

// AI Agents API service — Admin Platform
//
// The client creates agents from the Client Platform.
// The SaaS backend stores them and enforces subscription rules.
// The Admin Platform manages all client-created agents through these protected endpoints.
//
// Flow: Client creates → SaaS stores → Admin fetches/manages → Client sees updated status

// --- Global Agent View (all clients) ---

/**
 * GET /api/v1/admin/agents
 * Fetch all AI agents across all clients
 * Used on: AI Agents sidebar page (main operations view)
 */
export async function fetchAllAgents(): Promise<AIAgent[]> {
  return apiClient.get<AIAgent[]>('/agents')
}

/**
 * GET /api/v1/admin/agents/summary
 * Fetch global agent summary stats
 */
export async function fetchAllAgentsSummary(): Promise<AgentSummary> {
  return apiClient.get<AgentSummary>('/agents/summary')
}

// --- Client-Scoped Agent Endpoints ---

/**
 * GET /api/v1/admin/clients/:clientId/agents
 * Fetch all agents for a specific client
 * Used in: Client Profile Modal → AI Agents tab
 */
export async function fetchClientAgents(clientId: string): Promise<AIAgent[]> {
  return apiClient.get<AIAgent[]>(`/clients/${clientId}/agents`)
}

/**
 * GET /api/v1/admin/clients/:clientId/agents/:agentId
 * Fetch single agent full details
 */
export async function fetchAgentById(clientId: string, agentId: string): Promise<AIAgent> {
  return apiClient.get<AIAgent>(`/clients/${clientId}/agents/${agentId}`)
}

/**
 * PATCH /api/v1/admin/clients/:clientId/agents/:agentId
 * Update agent configuration (name, tone, channels, KB, etc.)
 */
export async function updateAgent(clientId: string, agentId: string, data: UpdateAgentPayload): Promise<AIAgent> {
  return apiClient.patch<AIAgent>(`/clients/${clientId}/agents/${agentId}`, data)
}

// --- Admin Action Endpoints ---

/**
 * POST /api/v1/admin/clients/:clientId/agents/:agentId/approve
 * Approve agent after review — allows publishing
 */
export async function approveAgent(clientId: string, agentId: string): Promise<AIAgent> {
  return apiClient.post<AIAgent>(`/clients/${clientId}/agents/${agentId}/approve`, {})
}

/**
 * POST /api/v1/admin/clients/:clientId/agents/:agentId/publish
 * Publish agent — set status to Live, activate on channels
 */
export async function publishAgent(clientId: string, agentId: string): Promise<AIAgent> {
  return apiClient.post<AIAgent>(`/clients/${clientId}/agents/${agentId}/publish`, {})
}

/**
 * POST /api/v1/admin/clients/:clientId/agents/:agentId/pause
 * Pause agent — temporarily stop handling conversations
 */
export async function pauseAgent(clientId: string, agentId: string, reason?: string): Promise<AIAgent> {
  return apiClient.post<AIAgent>(`/clients/${clientId}/agents/${agentId}/pause`, { reason })
}

/**
 * POST /api/v1/admin/clients/:clientId/agents/:agentId/request-changes
 * Request changes from client before approval/publishing
 */
export async function requestChanges(clientId: string, agentId: string, payload: { feedback: string; requestedBy: string }): Promise<AIAgent> {
  return apiClient.post<AIAgent>(`/clients/${clientId}/agents/${agentId}/request-changes`, payload)
}

/**
 * POST /api/v1/admin/clients/:clientId/agents/:agentId/archive
 * Archive agent — permanently deactivate
 */
export async function archiveAgent(clientId: string, agentId: string, reason?: string): Promise<AIAgent> {
  return apiClient.post<AIAgent>(`/clients/${clientId}/agents/${agentId}/archive`, { reason })
}

/**
 * POST /api/v1/admin/clients/:clientId/agents/:agentId/test
 * Test agent to confirm it answers correctly from KB
 */
export async function testAgent(
  clientId: string,
  agentId: string,
  payload: { question: string; channelType?: string }
): Promise<AgentTestResult> {
  return apiClient.post<AgentTestResult>(`/clients/${clientId}/agents/${agentId}/test`, payload)
}

// --- Performance & Logs ---

/**
 * GET /api/v1/admin/clients/:clientId/agents/:agentId/performance
 * Fetch agent performance metrics
 */
export async function fetchAgentPerformance(clientId: string, agentId: string) {
  return apiClient.get(`/clients/${clientId}/agents/${agentId}/performance`)
}

/**
 * GET /api/v1/admin/clients/:clientId/agents/:agentId/activity-logs
 * Fetch agent activity history
 */
export async function fetchAgentActivityLogs(clientId: string, agentId: string) {
  return apiClient.get(`/clients/${clientId}/agents/${agentId}/activity-logs`)
}
