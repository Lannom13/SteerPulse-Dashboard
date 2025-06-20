// src/pages/Budgeting.jsx
import AnimatedPage from '../components/AnimatedPage'

export default function Budgeting() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🧾 Budgeting Dashboard</h1>

        <p className="text-gray-400 mb-4 text-sm">
          See how your spending aligns with your monthly plan and track each category in real time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-white text-md font-semibold mb-1">Groceries</h2>
            <p className="text-sm text-gray-300 mb-1">$340 of $500</p>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-sky-500 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-white text-md font-semibold mb-1">Dining Out</h2>
            <p className="text-sm text-gray-300 mb-1">$290 of $300</p>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-red-500 rounded-full" style={{ width: '97%' }}></div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-white text-md font-semibold mb-1">Utilities</h2>
            <p className="text-sm text-gray-300 mb-1">$120 of $200</p>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          More categories, AI-driven adjustments, and automated syncing with your bank are coming soon.
        </p>
      </div>
    </AnimatedPage>
  )
}
