import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="app-layout">
      <aside className="app-sidebar">
        {/* Sidebar navigation will go here */}
      </aside>
      <div className="app-main">
        <header className="app-header">
          <h2>BigConnect Admin</h2>
        </header>
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
