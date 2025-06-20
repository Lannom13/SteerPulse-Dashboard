// src/pages/Budgeting.jsx
import AnimatedPage from '../components/AnimatedPage'
import { useState } from 'react'
import BudgetCategoryCard from '../components/BudgetCategoryCard'
import BudgetBreakdownTable from '../components/BudgetBreakdownTable'

export default function Budgeting() {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([
    { category: 'Groceries', budget: 500, spent: 340 },
    { category: 'Dining Out', budget: 300, spent: 290 },
    { category: 'Utilities', budget: 200, spent: 120 }
  ]);
  const [formData, setFormData] = useState({ category: '', budget: '' });

  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-2">🧾 Budgeting Dashboard</h1>
        <p className="text-gray-400 mb-6 text-sm">Get a real-time pulse on your spending across categories.</p>

        <nav className="mb-6 flex flex-wrap gap-2 text-sm">
          <a href="/budgeting" className="px-3 py-1 rounded-md bg-sky-700 text-white">Dashboard</a>
          <a href="/budgeting/spreadsheet" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Spreadsheet</a>
          <a href="/budgeting/analysis" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Insights</a>
          <a href="/budgeting/history" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">History</a>
        </nav>

        <div className="bg-gray-800 p-4 rounded-xl shadow text-sm text-gray-300 mb-6">
          📊 You're currently <span className="text-green-400 font-semibold">$88 under budget</span> across 7 categories. Stay the course or shift extra funds to savings?
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((item) => (
            <BudgetCategoryCard
              key={item.category}
              title={item.category}
              spent={item.spent}
              budget={item.budget}
              color="sky"
              onDelete={() => setCategories(categories.filter(c => c.category !== item.category))}
            />
          ))}
        </div>

        <BudgetBreakdownTable data={categories} />
      </div>
    </AnimatedPage>
  )
}
