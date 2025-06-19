// src/pages/Goals.jsx
import AnimatedPage from '../components/AnimatedPage'

export default function Goals() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🎯 Goals Tracker</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sample Goal Card */}
          <div className="bg-gray-800 p-5 rounded-xl shadow">
            <div className="text-xl font-semibold text-white mb-2">Family Vacation</div>
            <div className="text-sm text-gray-400 mb-1">Target: $3,000 by Dec 2025</div>
            <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="text-sm text-gray-300 mt-2">$1,350 saved • 45% complete</div>
          </div>

          <div className="bg-gray-800 p-5 rounded-xl shadow">
            <div className="text-xl font-semibold text-white mb-2">Pay Off Credit Card</div>
            <div className="text-sm text-gray-400 mb-1">Target: $1,200 by Sept 2025</div>
            <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '66%' }}></div>
            </div>
            <div className="text-sm text-gray-300 mt-2">$800 paid • 66% complete</div>
          </div>
        </div>

        {/* Future: Add Goal Modal or Link */}
        <p className="text-sm text-gray-500 mt-6">More goal types, charts, and AI milestone alerts coming soon.</p>
      </div>
    </AnimatedPage>
  )
}
