import { apiClient } from '../../../core/api/client'

// Finance Report Export API
// Backend generates PDF/Excel using dedicated FinanceReportPDFTemplate
// Preview and download use the same generated file

export interface ExportReportPayload {
  reportType: string
  format: 'pdf' | 'excel'
  datePreset: string | null
  startDate: string | null
  endDate: string | null
  customDate: string | null
  filters: {
    clientId: string | null
    paymentStatus: string | null
    invoiceStatus: string | null
    gateway: string | null
    paymentMethod: string | null
    currency: string
  }
}

export interface ExportReportResponse {
  reportId: string
  status: 'ready' | 'processing' | 'failed'
  format: string
  fileName: string
  downloadUrl: string
  previewUrl: string
}

/**
 * POST /api/v1/admin/finance/reports/export
 * Create a finance report export
 */
export async function exportReport(payload: ExportReportPayload): Promise<ExportReportResponse> {
  return apiClient.post<ExportReportResponse>('/finance/reports/export', payload)
}

/**
 * GET /api/v1/admin/finance/reports
 * Get export history
 */
export async function fetchReportHistory() {
  return apiClient.get('/finance/reports')
}
