// AI Agents types — mirrors SaaS platform API schema

export type AgentStatus = 'Live' | 'Testing' | 'Paused' | 'Draft' | 'Archived'
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
  conversationsHandled: number
  resolutionRate: number
  lastTested: string
  createdAt: string
  createdBy: string
}

export interface AgentSummary {
  totalAgents: number
  live: number
  testing: number
  paused: number
  totalConversations: number
  avgResolutionRate: number
}

export interface CreateAgentPayload {
  name: string
  type: AgentType
  tone: string
  language: string
  channels: string[]
  fallbackMessage: string
  escalationRule: string
  operatingHours: string
  knowledgeBaseId: string
  createdBy: string
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
