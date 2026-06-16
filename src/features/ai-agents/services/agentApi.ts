import { apiClient } from '../../../core/api/client'
import type { AIAgent, AgentSummary, CreateAgentPayload, UpdateAgentPayload, AgentTestResult } from '../types'

// AI Agents API service
// Connection flow: Admin Platform → Admin API → SaaS Backend → AI Engine
//
// The admin platform does NOT own the AI agents.
// It sends requests to the SaaS backend which creates and manages them.
// The admin platform only displays the response.
//
// Relationship: clientId → agentId → knowledgeBaseId → channelId → conversations

/**
 * GET /api/v1/admin/clients/:clientId/agents/summary
 * Fetch AI agents summary for quick stats
 * Called when: Client Profile Modal opens
 */
export async function fetchAgentSummary(clientId: string): Promise<AgentSummary> {
  return apiClient.get<AgentSummary>(`/clients/${clientId}/agents/summary`)
}

/**
 * GET /api/v1/admin/clients/:clientId/agents
 * Fetch all AI agents connected to a client
 * Called when: Admin clicks AI Agents tab in client profile
 */
export async function fetchAgents(clientId: string): Promise<AIAgent[]> {
  return apiClient.get<AIAgent[]>(`/clients/${clientId}/agents`)
}

/**
 * GET /api/v1/admin/clients/:clientId/agents/:agentId
 * Fetch single agent full details (config, performance, logs)
 * Called when: Admin clicks on one AI agent
 */
export async function fetchAgentById(clientId: string, agentId: string): Promise<AIAgent> {
  return apiClient.get<AIAgent>(`/clients/${clientId}/agents/${agentId}`)
}

/**
 * POST /api/v1/admin/clients/:clientId/agents
 * Create a new AI agent for the client
 * Called when: Admin clicks "Create AI Agent" in client profile
 *
 * The SaaS backend will:
 * - Create the AI agent
 * - Attach it to the clientId
 * - Set status to Draft or Testing
 * - Prepare it for knowledge base connection
 * - Return the created agentId
 */
export async function createAgent(clientId: string, data: CreateAgentPayload): Promise<AIAgent> {
  return apiClient.post<AIAgent>(`/clients/${clientId}/agents`, data)
}

/**
 * PATCH /api/v1/admin/clients/:clientId/agents/:agentId
 * Update AI agent configuration
 * Called when: Admin edits agent name, type, tone, channels, etc.
 */
export async function updateAgent(clientId: string, agentId: string, data: UpdateAgentPayload): Promise<AIAgent> {
  return apiClient.patch<AIAgent>(`/clients/${clientId}/agents/${agentId}`, data)
}

/**
 * POST /api/v1/admin/clients/:clientId/agents/:agentId/test
 * Test the AI agent before publishing
 * Called when: Admin tests agent to confirm it answers correctly
 *
 * Verifies the AI is using the right client knowledge base
 */
export async function testAgent(
  clientId: string,
  agentId: string,
  payload: { question: string; channelType?: string; knowledgeBaseId?: string }
): Promise<AgentTestResult> {
  return apiClient.post<AgentTestResult>(`/clients/${clientId}/agents/${agentId}/test`, payload)
}

/**
 * POST /api/v1/admin/clients/:clientId/agents/:agentId/publish
 * Publish the agent — set status to Live
 * Called when: Agent is tested and ready to go live
 */
export async function publishAgent(clientId: string, agentId: string): Promise<AIAgent> {
  return apiClient.post<AIAgent>(`/clients/${clientId}/agents/${agentId}/publish`, {})
}

/**
 * POST /api/v1/admin/clients/:clientId/agents/:agentId/pause
 * Pause the agent — temporarily stop it from handling conversations
 * Called when: Admin needs to pause an agent (maintenance, issues, etc.)
 */
export async function pauseAgent(clientId: string, agentId: string, reason?: string): Promise<AIAgent> {
  return apiClient.post<AIAgent>(`/clients/${clientId}/agents/${agentId}/pause`, { reason })
}

/**
 * POST /api/v1/admin/clients/:clientId/agents/:agentId/archive
 * Archive the agent — permanently deactivate it
 * Called when: Agent is no longer needed
 */
export async function archiveAgent(clientId: string, agentId: string, reason?: string): Promise<AIAgent> {
  return apiClient.post<AIAgent>(`/clients/${clientId}/agents/${agentId}/archive`, { reason })
}
