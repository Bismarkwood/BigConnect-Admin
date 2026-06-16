// Centralized API client — all feature services use this
// Admin Platform connects to: /api/v1/admin/...
// SaaS Backend is the single source of truth
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '#dd14ab'

interface RequestConfig extends RequestInit {
  params?: Record<string, string>
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    const token = localStorage.getItem('token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      })
    }
    return url.toString()
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, config?.params), {
      ...config,
      method: 'GET',
      headers: this.getHeaders(),
    })
    if (!response.ok) throw new Error(`GET ${endpoint} failed: ${response.status}`)
    return response.json()
  }

  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, config?.params), {
      ...config,
      method: 'POST',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })
    if (!response.ok) throw new Error(`POST ${endpoint} failed: ${response.status}`)
    return response.json()
  }

  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, config?.params), {
      ...config,
      method: 'PUT',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })
    if (!response.ok) throw new Error(`PUT ${endpoint} failed: ${response.status}`)
    return response.json()
  }

  async patch<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, config?.params), {
      ...config,
      method: 'PATCH',
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    })
    if (!response.ok) throw new Error(`PATCH ${endpoint} failed: ${response.status}`)
    return response.json()
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const response = await fetch(this.buildUrl(endpoint, config?.params), {
      ...config,
      method: 'DELETE',
      headers: this.getHeaders(),
    })
    if (!response.ok) throw new Error(`DELETE ${endpoint} failed: ${response.status}`)
    return response.json()
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
