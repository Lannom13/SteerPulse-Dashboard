// src/pages/Budgeting.jsx
import AnimatedPage from '../components/AnimatedPage'
import BudgetCategoryCard from '../components/BudgetCategoryCard'

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

<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="bg-gray-800 p-4 rounded-xl shadow">
    <h2 className="text-white text-md font-semibold mb-2">📊 Budget Breakdown</h2>
    <table className="w-full text-sm text-left text-gray-300">
      <thead>
        <tr className="border-b border-gray-700 text-gray-400">
          <th className="py-1">Category</th>
          <th className="py-1">Budget</th>
          <th className="py-1">Spent</th>
          <th className="py-1">Δ</th>
          <th className="py-1">% Used</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-700">
          <td>Groceries</td>
          <td>$500</td>
          <td>$340</td>
          <td className="text-green-400">-160</td>
          <td>68%</td>
        </tr>
        <tr className="border-b border-gray-700">
          <td>Dining Out</td>
          <td>$300</td>
          <td>$290</td>
          <td className="text-green-400">-10</td>
          <td>97%</td>
        </tr>
        <tr>
          <td>Utilities</td>
          <td>$200</td>
          <td>$120</td>
          <td className="text-green-400">-80</td>
          <td>60%</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div className="bg-gray-800 p-4 rounded-xl shadow">
    <h2 className="text-white text-md font-semibold mb-2">💡 Smart Budget Insight</h2>
    <p className="text-sm text-gray-400">
      Your utilities budget may be overestimated. You've only used 60% of it. Consider reallocating to savings or a different category.
    </p>
    <p className="text-xs text-gray-600 mt-3 italic">AI insights will refine these suggestions as your trends evolve.</p>
  </div>
</div>

<p className="text-xs text-gray-500 mt-6">
  More categories, AI-driven adjustments, and automated syncing with your bank are coming soon.
</p>
      </div>
    </AnimatedPage>
  )
}
