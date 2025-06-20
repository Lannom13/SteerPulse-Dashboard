import AnimatedPage from '../../components/AnimatedPage'

export default function Dashboard() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">🧾 Budgeting Dashboard</h1>
        <p className="text-sm text-gray-400 mb-6">
          This dashboard gives you a high-level overview of your budget status and trends.
        </p>
        <nav className="mb-6 flex flex-wrap gap-2 text-sm">
          <a href="/budgeting" className="px-3 py-1 rounded-md bg-sky-700 text-white">Dashboard</a>
          <a href="/budgeting/spreadsheet" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Spreadsheet</a>
        </nav>
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Welcome to your budget. Choose a tool above to get started.</p>
        </div>
      </div>
    </AnimatedPage>
  )
}
