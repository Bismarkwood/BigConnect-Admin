// Environment configuration
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  appName: import.meta.env.VITE_APP_NAME || 'BigConnect Admin',
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const
