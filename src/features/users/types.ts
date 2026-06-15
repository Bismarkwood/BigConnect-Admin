// Users feature types
export interface UserProfile {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  status: 'active' | 'inactive' | 'suspended'
}
