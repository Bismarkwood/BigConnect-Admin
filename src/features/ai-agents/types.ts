// AI Agents types — mirrors SaaS platform API schema
//
// Flow: Client creates agent → SaaS stores it → Admin manages it
// Client Platform creates the agent.
// SaaS Backend stores it and enforces subscription rules.
// Admin Platform manages it through protected APIs.

export type AgentStatus =
  | 'Draft'
  | 'Testing'
  | 'Submitted for Review'
  | 'Approved'
  | 'Live'
  | 'Needs Changes'
  | 'Paused'
  | 'Archived'

export type AgentType = 'Customer Support' | 'Sales' | 'FAQ' | 'Appointment Booking' | 'Custom'

export interface AIAgent {
  id: string
  name: string
  type: AgentType
  status: AgentStatus
  channels: string[]
  language: string
  model: string
  tone: string
  fallbackMessage: string
  escalationRule: string
  operatingHours: string
  knowledgeBaseId: string
  knowledgeBaseItems: number
  knowledgeBaseStatus: string
  conversationsHandled: number
  resolutionRate: number
  lastTested: string
  createdAt: string
  createdBy: string
  submittedBy?: string
  clientId: string
  clientName: string
  clientPlan: string
  agentUsage: string // e.g. "2 of 3"
}

export interface AgentSummary {
  totalAgents: number
  live: number
  testing: number
  submittedForReview: number
  paused: number
  needsChanges: number
  totalConversations: number
  avgResolutionRate: number
}

export interface UpdateAgentPayload {
  name?: string
  type?: AgentType
  tone?: string
  language?: string
  channels?: string[]
  fallbackMessage?: string
  escalationRule?: string
  operatingHours?: string
  knowledgeBaseId?: string
}

export interface AgentTestResult {
  response: string
  confidence: number
  sourceUsed: string
  matchedKBItem: string
  status: 'success' | 'no_match' | 'error'
}
