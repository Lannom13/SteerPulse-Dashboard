import AnimatedPage from '../components/AnimatedPage'

export default function BudgetHistory() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-2">📅 Budget History</h1>
        <p className="text-sm text-gray-400 mb-6">See how your budget has evolved over time.</p>

        <nav className="mb-6 flex flex-wrap gap-2 text-sm">
          <a href="/budgeting" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Dashboard</a>
          <a href="/budgeting/spreadsheet" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Spreadsheet</a>
          <a href="/budgeting/insights" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Insights</a>
          <a href="/budgeting/history" className="px-3 py-1 rounded-md bg-sky-700 text-white">History</a>
        </nav>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Line charts, sliders, and month-by-month budget breakdowns will go here.</p>
        </div>
      </div>
    </AnimatedPage>
  )
}
