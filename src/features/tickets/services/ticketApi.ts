import { apiClient } from '../../../core/api/client'
import type { Ticket, TicketMessage, TicketAttachment, TicketActivityLog } from '../types'

// Tickets API — full resolution workflow
// Acknowledge → Assign → Reply → Investigate → Internal Notes → Request Info → Escalate → Resolve → Close

// --- Fetching ---

export async function fetchTickets(): Promise<Ticket[]> {
  return apiClient.get<Ticket[]>('/tickets')
}

export async function fetchTicketById(ticketId: string): Promise<Ticket> {
  return apiClient.get<Ticket>(`/tickets/${ticketId}`)
}

export async function fetchTicketMessages(ticketId: string): Promise<TicketMessage[]> {
  return apiClient.get<TicketMessage[]>(`/tickets/${ticketId}/messages`)
}

export async function fetchTicketAttachments(ticketId: string): Promise<TicketAttachment[]> {
  return apiClient.get<TicketAttachment[]>(`/tickets/${ticketId}/attachments`)
}

export async function fetchTicketActivityLogs(ticketId: string): Promise<TicketActivityLog[]> {
  return apiClient.get<TicketActivityLog[]>(`/tickets/${ticketId}/activity-logs`)
}

// --- Resolution Workflow Actions ---

/** POST /api/v1/admin/tickets/:ticketId/acknowledge — New → Open */
export async function acknowledgeTicket(ticketId: string): Promise<Ticket> {
  return apiClient.post<Ticket>(`/tickets/${ticketId}/acknowledge`, {})
}

/** POST /api/v1/admin/tickets/:ticketId/assign */
export async function assignTicket(ticketId: string, payload: { assignedAdminId: string; assignedTeam?: string }): Promise<Ticket> {
  return apiClient.post<Ticket>(`/tickets/${ticketId}/assign`, payload)
}

/** POST /api/v1/admin/tickets/:ticketId/messages — reply to client */
export async function replyToTicket(ticketId: string, message: string, visibility: 'client_visible' | 'internal_only' = 'client_visible'): Promise<void> {
  return apiClient.post(`/tickets/${ticketId}/messages`, { message, visibility })
}

/** POST /api/v1/admin/tickets/:ticketId/internal-notes */
export async function addInternalNote(ticketId: string, note: string): Promise<void> {
  return apiClient.post(`/tickets/${ticketId}/internal-notes`, { note })
}

/** POST /api/v1/admin/tickets/:ticketId/request-info — set Waiting for Client */
export async function requestInfo(ticketId: string, message: string): Promise<Ticket> {
  return apiClient.post<Ticket>(`/tickets/${ticketId}/request-info`, { message })
}

/** POST /api/v1/admin/tickets/:ticketId/escalate */
export async function escalateTicket(ticketId: string, payload: { reason: string; escalationTeam?: string }): Promise<Ticket> {
  return apiClient.post<Ticket>(`/tickets/${ticketId}/escalate`, payload)
}

/** POST /api/v1/admin/tickets/:ticketId/resolve */
export async function resolveTicket(ticketId: string, payload: { resolutionNote: string; notifyClient?: boolean }): Promise<Ticket> {
  return apiClient.post<Ticket>(`/tickets/${ticketId}/resolve`, payload)
}

/** POST /api/v1/admin/tickets/:ticketId/close */
export async function closeTicket(ticketId: string, payload?: { closingNote?: string }): Promise<Ticket> {
  return apiClient.post<Ticket>(`/tickets/${ticketId}/close`, payload || {})
}

/** POST /api/v1/admin/tickets/:ticketId/reopen — Resolved/Closed → In Progress */
export async function reopenTicket(ticketId: string, reason: string): Promise<Ticket> {
  return apiClient.post<Ticket>(`/tickets/${ticketId}/reopen`, { reason })
}

/** PATCH /api/v1/admin/tickets/:ticketId — update status/priority */
export async function updateTicket(ticketId: string, data: Partial<Pick<Ticket, 'status' | 'priority' | 'category'>>): Promise<Ticket> {
  return apiClient.patch<Ticket>(`/tickets/${ticketId}`, data)
}
