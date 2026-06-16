// Call Logs types — mirrors SaaS platform API schema
// Data flows: Voice Provider → Webhook → SaaS Backend → Admin/Client APIs

export type CallStatus =
  | 'Incoming'
  | 'In Progress'
  | 'Completed'
  | 'Missed'
  | 'Failed'
  | 'Escalated'
  | 'Voicemail'
  | 'Abandoned'
  | 'Archived'

export type CallDirection = 'Inbound' | 'Outbound'

export type CallOutcome =
  | 'Resolved by AI'
  | 'Escalated to Human'
  | 'Customer Dropped'
  | 'No Response'
  | 'Failed Processing'
  | 'Follow-up Required'
  | 'Ticket Created'

export type CallSentiment = 'Positive' | 'Neutral' | 'Negative'

export interface CallLog {
  id: string
  clientId: string
  caller: string
  callerName?: string
  agentId: string
  agentName: string
  channelId: string
  direction: CallDirection
  status: CallStatus
  duration: string
  outcome: CallOutcome
  sentiment: CallSentiment
  escalated: boolean
  ticketId?: string
  date: string
  time: string
  recording: boolean
}

export interface CallLogDetail extends CallLog {
  provider: string
  callStartTime: string
  callEndTime: string
  recordingUrl?: string
  recordingExpiry?: string
  transcript?: TranscriptEntry[]
  aiSummary?: string
  customerIntent?: string
  escalationDetails?: string
  notes: CallNote[]
  flags: CallFlag[]
}

export interface TranscriptEntry {
  speaker: 'Customer' | 'AI Agent'
  text: string
  timestamp: string
}

export interface CallNote {
  id: string
  note: string
  createdBy: string
  createdAt: string
}

export interface CallFlag {
  id: string
  reason: string
  flaggedBy: string
  priority: 'Low' | 'Medium' | 'High' | 'Urgent'
  flaggedAt: string
}

export interface CallLogSummary {
  totalCalls: number
  answered: number
  missed: number
  failed: number
  escalated: number
  avgDuration: string
  totalMinutes: number
  callsThisMonth: number
  lastCallDate: string
}
