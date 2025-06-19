// src/layouts/DashboardLayout.jsx
function DashboardLayout({ children }) {
  return (
    <main className="flex-1 p-6 overflow-auto">
      <header className="text-2xl font-semibold mb-4">SteerPulse Dashboard</header>
      {children}
    </main>
  )
}

export default DashboardLayout
