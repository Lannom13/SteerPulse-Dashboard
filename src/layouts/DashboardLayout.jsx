// src/layouts/DashboardLayout.jsx
import Topbar from '../components/Topbar'

function DashboardLayout({ children }) {
  return (
    <main className="flex-1 flex flex-col">
      <Topbar />
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </main>
  )
}

export default DashboardLayout
