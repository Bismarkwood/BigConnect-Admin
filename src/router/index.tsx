import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { authRoutes } from '../features/auth/routes'
import { dashboardRoutes } from '../features/dashboard/routes'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        {authRoutes}

        {/* Protected routes with layout */}
        <Route element={<MainLayout />}>
          {dashboardRoutes}
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
