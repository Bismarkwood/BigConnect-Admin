// Tickets types — end-to-end ticketing
// Client Platform raises → SaaS stores → Admin manages → Client gets updates

export type TicketStatus =
  | 'New'
  | 'Open'
  | 'In Progress'
  | 'Waiting for Client'
  | 'Waiting for BigConnect'
  | 'Escalated'
  | 'Resolved'
  | 'Closed'
  | 'Cancelled'
  | 'Reopened'

export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical'

export type TicketCategory =
  | 'Account Issue'
  | 'Subscription Issue'
  | 'Payment Issue'
  | 'AI Agent Issue'
  | 'Knowledge Base Issue'
  | 'Channel Issue'
  | 'Voice Call Issue'
  | 'WhatsApp Issue'
  | 'SMS Issue'
  | 'Conversation Issue'
  | 'Technical Issue'
  | 'General Support'

export type TicketSource = 'Client Platform' | 'System Alert' | 'Email' | 'Phone' | 'Internal'

export type MessageVisibility = 'client_visible' | 'internal_only'

export interface Ticket {
  id: string
  clientId: string
  clientName: string
  subject: string
  category: TicketCategory
  priority: TicketPriority
  status: TicketStatus
  source: TicketSource
  assignedTo: string
  description: string
  relatedModule?: string
  relatedRecordId?: string
  createdAt: string
  lastUpdated: string
}

export interface TicketMessage {
  id: string
  ticketId: string
  senderId: string
  senderName: string
  senderType: 'client_user' | 'admin_user' | 'system'
  message: string
  visibility: MessageVisibility
  createdAt: string
}

export interface TicketAttachment {
  id: string
  ticketId: string
  fileName: string
  fileType: string
  fileSize: string
  fileUrl: string
  uploadedBy: string
  createdAt: string
}

export interface TicketActivityLog {
  id: string
  ticketId: string
  actorName: string
  actorType: string
  action: string
  oldValue?: string
  newValue?: string
  createdAt: string
}
