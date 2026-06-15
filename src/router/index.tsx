import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import { dashboardRoutes } from '../features/dashboard/routes'
import { authRoutes } from '../features/auth/routes'

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
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
