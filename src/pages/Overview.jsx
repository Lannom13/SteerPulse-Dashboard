// src/pages/Overview.jsx
import AnimatedPage from '../components/AnimatedPage'

export default function Overview() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🧭 SteerPulse Overview</h1>

        {/* Performance Scenario Row */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <button className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2 rounded-full">
            MTD
          </button>
          <button className="bg-gray-800 text-gray-300 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-700">
            YTD
          </button>
          <div className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded-full">
            📈 Benchmark: Save $500/mo
          </div>
          <div className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded-full">
            🧾 Actual vs Budget: +12%
          </div>
          <div className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded-full">
            📆 This Month vs LY: -8%
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Row 1 – KPI Cards */}
          <div className="bg-gray-800 p-4 rounded-xl shadow">Net Worth</div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">Budget Used</div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">Cash Flow</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Row 2 – Recent Transactions + Smart Insights */}
          <div className="md:col-span-2 bg-gray-800 p-4 rounded-xl shadow">
            Recent Transactions Preview
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            Smart Insights / Alerts
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Row 3 – Debt & Investment Overview */}
          <div className="bg-gray-800 p-4 rounded-xl shadow">Debt Status Ring</div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">Investment Snapshot</div>
        </div>
      </div>
    </AnimatedPage>
  )
}
