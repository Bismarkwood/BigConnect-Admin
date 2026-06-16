import { apiClient } from '../../../core/api/client'
import type { CallLog, CallLogDetail, CallLogSummary } from '../types'

// Call Logs API service
// Flow: Voice Provider → Webhook → SaaS Backend → Admin API → This Platform
//
// The admin platform does NOT fetch from the voice provider directly.
// The SaaS backend receives call events via webhooks, stores them under clientId,
// and the admin platform reads them through protected admin endpoints.
//
// Relationship: clientId → channelId → agentId → callId → conversationId → ticketId

// --- Viewing Endpoints ---

/**
 * GET /api/v1/admin/clients/:clientId/call-logs/summary
 * Fetch call log summary stats for the client
 */
export async function fetchCallLogSummary(clientId: string): Promise<CallLogSummary> {
  return apiClient.get<CallLogSummary>(`/clients/${clientId}/call-logs/summary`)
}

/**
 * GET /api/v1/admin/clients/:clientId/call-logs
 * Fetch all call logs for a client
 * Used in: Client Profile Modal → Call Logs tab
 */
export async function fetchCallLogs(clientId: string): Promise<CallLog[]> {
  return apiClient.get<CallLog[]>(`/clients/${clientId}/call-logs`)
}

/**
 * GET /api/v1/admin/clients/:clientId/call-logs/:callId
 * Fetch full call log detail (transcript, recording, summary, notes)
 */
export async function fetchCallLogById(clientId: string, callId: string): Promise<CallLogDetail> {
  return apiClient.get<CallLogDetail>(`/clients/${clientId}/call-logs/${callId}`)
}

/**
 * GET /api/v1/admin/clients/:clientId/call-logs/:callId/recording
 * Fetch secure temporary recording URL (expires in ~10 minutes)
 */
export async function fetchCallRecording(clientId: string, callId: string): Promise<{ url: string; expiresAt: string; duration: string; fileType: string }> {
  return apiClient.get(`/clients/${clientId}/call-logs/${callId}/recording`)
}

/**
 * GET /api/v1/admin/clients/:clientId/call-logs/:callId/transcript
 * Fetch call transcript with speaker labels and timestamps
 */
export async function fetchCallTranscript(clientId: string, callId: string): Promise<{ transcript: Array<{ speaker: string; text: string; timestamp: string }>; language: string; confidence: number }> {
  return apiClient.get(`/clients/${clientId}/call-logs/${callId}/transcript`)
}

/**
 * GET /api/v1/admin/clients/:clientId/call-logs/:callId/summary
 * Fetch AI-generated call summary
 */
export async function fetchCallSummary(clientId: string, callId: string): Promise<{ summary: string; intent: string; resolution: string; confidence: number; sentiment: string; nextAction: string; escalationReason?: string }> {
  return apiClient.get(`/clients/${clientId}/call-logs/${callId}/summary`)
}

// --- Admin Action Endpoints ---

/**
 * POST /api/v1/admin/clients/:clientId/call-logs/:callId/flag
 * Flag a call for internal review
 */
export async function flagCallLog(clientId: string, callId: string, payload: { reason: string; flaggedBy: string; priority: 'Low' | 'Medium' | 'High' | 'Urgent' }): Promise<void> {
  return apiClient.post(`/clients/${clientId}/call-logs/${callId}/flag`, payload)
}

/**
 * POST /api/v1/admin/clients/:clientId/call-logs/:callId/notes
 * Add an internal note to a call log
 */
export async function addCallNote(clientId: string, callId: string, payload: { note: string; createdBy: string }): Promise<void> {
  return apiClient.post(`/clients/${clientId}/call-logs/${callId}/notes`, payload)
}

/**
 * POST /api/v1/admin/clients/:clientId/call-logs/:callId/escalate
 * Escalate a call to a ticket
 */
export async function escalateCall(clientId: string, callId: string, payload: { issueType: string; priority: string; assignedTo: string; note: string }): Promise<{ ticketId: string; ticketStatus: string; assignedUser: string }> {
  return apiClient.post(`/clients/${clientId}/call-logs/${callId}/escalate`, payload)
}

/**
 * POST /api/v1/admin/clients/:clientId/call-logs/:callId/archive
 * Archive a call log (does not permanently delete)
 */
export async function archiveCallLog(clientId: string, callId: string, payload: { reason: string; archivedBy: string }): Promise<void> {
  return apiClient.post(`/clients/${clientId}/call-logs/${callId}/archive`, payload)
}
