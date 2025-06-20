// src/pages/Budgeting.jsx
import AnimatedPage from '../components/AnimatedPage'
import BudgetCategoryCard from '../components/BudgetCategoryCard'
import BudgetBreakdownTable from '../components/BudgetBreakdownTable'

export default function Budgeting() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-2">🧾 Budgeting Dashboard</h1>
<p className="text-gray-400 mb-6 text-sm">Get a real-time pulse on your spending across categories.</p>
<div className="bg-gray-800 p-4 rounded-xl shadow text-sm text-gray-300 mb-6">
  📊 You're currently <span className="text-green-400 font-semibold">$88 under budget</span> across 7 categories.
  Stay the course or shift extra funds to savings?
</div>

        <p className="text-gray-400 mb-4 text-sm">
          See how your spending aligns with your monthly plan and track each category in real time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <BudgetCategoryCard title="Groceries" spent={340} budget={500} color="sky" />
  <BudgetCategoryCard title="Dining Out" spent={290} budget={300} color="red" />
  <BudgetCategoryCard title="Utilities" spent={120} budget={200} color="green" />
</div>

<BudgetBreakdownTable
    data={[
      { category: 'Groceries', budget: 500, spent: 340 },
      { category: 'Dining Out', budget: 300, spent: 290 },
      { category: 'Utilities', budget: 200, spent: 120 }
    ]}
  />
  </div>
  <div className="bg-gray-800 p-4 rounded-xl shadow">
  <h2 className="text-white text-md font-semibold mb-2">💡 Smart Budget Insight</h2>
  <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
    <li>Your utilities budget may be overestimated. You’ve only used 60%.</li>
    <li>Dining out is nearing your limit — 97% spent.</li>
    <li>Groceries still have 32% available — could be used elsewhere.</li>
  </ul>
  <p className="text-xs text-gray-600 mt-3 italic">AI-driven recommendations will adapt to your real-time trends and spending habits.</p>
</div>
</div>

<p className="text-xs text-gray-500 mt-6">
  More categories, AI-driven adjustments, and automated syncing with your bank are coming soon.
</p>
      </div>
    </AnimatedPage>
  )
}
