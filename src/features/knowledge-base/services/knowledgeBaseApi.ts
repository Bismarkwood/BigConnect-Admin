import { apiClient } from '../../../core/api/client'
import type { KnowledgeBaseItem, KBSummary, KBTestQueryPayload, KBTestQueryResult } from '../types'

// Knowledge Base API service
// Admin platform connects to client's KB in the main SaaS platform
// Admin does NOT own the KB — it only views, monitors, approves, publishes, or triggers actions

/**
 * GET /api/v1/admin/clients/:clientId/knowledge-base/summary
 * Fetch KB summary for the top stats
 */
export async function fetchKBSummary(clientId: string): Promise<KBSummary> {
  return apiClient.get<KBSummary>(`/clients/${clientId}/knowledge-base/summary`)
}

/**
 * GET /api/v1/admin/clients/:clientId/knowledge-base
 * Fetch all KB items for the client
 */
export async function fetchKBItems(clientId: string): Promise<KnowledgeBaseItem[]> {
  return apiClient.get<KnowledgeBaseItem[]>(`/clients/${clientId}/knowledge-base`)
}

/**
 * GET /api/v1/admin/clients/:clientId/knowledge-base/:kbId
 * View one KB item's full details
 */
export async function fetchKBItemById(clientId: string, kbId: string): Promise<KnowledgeBaseItem> {
  return apiClient.get<KnowledgeBaseItem>(`/clients/${clientId}/knowledge-base/${kbId}`)
}

/**
 * POST /api/v1/admin/clients/:clientId/knowledge-base/:kbId/approve
 * Approve content for publishing or AI use
 */
export async function approveKBItem(clientId: string, kbId: string, payload: { approvedBy: string; note?: string }): Promise<KnowledgeBaseItem> {
  return apiClient.post<KnowledgeBaseItem>(`/clients/${clientId}/knowledge-base/${kbId}/approve`, payload)
}

/**
 * POST /api/v1/admin/clients/:clientId/knowledge-base/:kbId/publish
 * Make content available to the client's AI agent
 */
export async function publishKBItem(clientId: string, kbId: string): Promise<KnowledgeBaseItem> {
  return apiClient.post<KnowledgeBaseItem>(`/clients/${clientId}/knowledge-base/${kbId}/publish`, {})
}

/**
 * POST /api/v1/admin/clients/:clientId/knowledge-base/:kbId/archive
 * Archive outdated content
 */
export async function archiveKBItem(clientId: string, kbId: string, payload: { reason: string; archivedBy: string }): Promise<KnowledgeBaseItem> {
  return apiClient.post<KnowledgeBaseItem>(`/clients/${clientId}/knowledge-base/${kbId}/archive`, payload)
}

/**
 * POST /api/v1/admin/clients/:clientId/knowledge-base/:kbId/reprocess
 * Re-process a failed or outdated document
 */
export async function reprocessKBItem(clientId: string, kbId: string): Promise<KnowledgeBaseItem> {
  return apiClient.post<KnowledgeBaseItem>(`/clients/${clientId}/knowledge-base/${kbId}/reprocess`, {})
}

/**
 * POST /api/v1/admin/clients/:clientId/knowledge-base/test-query
 * Test whether the AI can answer from the KB
 */
export async function testKBQuery(clientId: string, payload: KBTestQueryPayload): Promise<KBTestQueryResult> {
  return apiClient.post<KBTestQueryResult>(`/clients/${clientId}/knowledge-base/test-query`, payload)
}
