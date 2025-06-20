import AnimatedPage from '../components/AnimatedPage'

export default function Budgeting() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-2">🧾 Budgeting Dashboard</h1>
        <p className="text-sm text-gray-400 mb-6">Your 30,000 ft view of your budget.</p>

        <nav className="mb-6 flex flex-wrap gap-2 text-sm">
          <a href="/budgeting" className="px-3 py-1 rounded-md bg-sky-700 text-white">Dashboard</a>
          <a href="/budgeting/spreadsheet" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Spreadsheet</a>
          <a href="/budgeting/insights" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Insights</a>
          <a href="/budgeting/history" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">History</a>
        </nav>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-gray-400 text-sm">This dashboard will summarize your budget status, trends, and high-level insights.</p>
        </div>
      </div>
    </AnimatedPage>
  )
}
