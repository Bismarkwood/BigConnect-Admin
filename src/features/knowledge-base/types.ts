// Knowledge Base types — mirrors SaaS platform API schema

export type KBStatus =
  | 'Draft'
  | 'Processing'
  | 'Ready for Review'
  | 'Approved'
  | 'Published'
  | 'Failed'
  | 'Archived'

export type KBType =
  | 'FAQ'
  | 'PDF Document'
  | 'Word Document'
  | 'CSV File'
  | 'Website URL'
  | 'Product Catalogue'
  | 'Service List'
  | 'Policy Document'
  | 'Branch / Location Info'
  | 'Pricing Information'
  | 'Manual Text Entry'

export interface KnowledgeBaseItem {
  id: string
  title: string
  type: KBType
  status: KBStatus
  linkedAgent: string
  source: string
  uploadedBy: string
  lastUpdated: string
  processingStatus?: string
}

export interface KBSummary {
  totalItems: number
  published: number
  draft: number
  processing: number
  failed: number
  lastUpdated: string
  assignedAgents: number
  healthStatus: 'Healthy' | 'Warning' | 'Critical'
}

export interface KBTestQueryPayload {
  agentId: string
  question: string
}

export interface KBTestQueryResult {
  answer: string
  sourceDocument: string
  confidence: number
  matchedItemId: string
}
