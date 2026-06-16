import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LoginPage from '../features/auth/pages/LoginPage'
import DashboardPage from '../features/dashboard/pages/DashboardPage'
import ClientsPage from '../features/clients/pages/ClientsPage'
import ClientDetailPage from '../features/clients/pages/ClientDetailPage'
import AIAgentsPage from '../features/ai-agents/pages/AIAgentsPage'
import KnowledgeBasePage from '../features/knowledge-base/pages/KnowledgeBasePage'
import ChannelsPage from '../features/channels/pages/ChannelsPage'
import ConversationsPage from '../features/conversations/pages/ConversationsPage'
import TicketsPage from '../features/tickets/pages/TicketsPage'
import UsagePage from '../features/usage/pages/UsagePage'
import FinancePage from '../features/finance/pages/FinancePage'
import SubscriptionsPage from '../features/subscriptions/pages/SubscriptionsPage'
import ReportsPage from '../features/reports/pages/ReportsPage'
import TeamPage from '../features/team/pages/TeamPage'
import SettingsPage from '../features/settings/pages/SettingsPage'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes with main layout */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:clientId" element={<ClientDetailPage />} />
          <Route path="/ai-agents" element={<AIAgentsPage />} />
          <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
          <Route path="/channels" element={<ChannelsPage />} />
          <Route path="/conversations" element={<ConversationsPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/usage" element={<UsagePage />} />
          <Route path="/finance" element={<FinancePage />} />
          <Route path="/subscriptions" element={<SubscriptionsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
