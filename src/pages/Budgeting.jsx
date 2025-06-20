// src/pages/Budgeting.jsx
import AnimatedPage from '../components/AnimatedPage'
import BudgetCategoryCard from '../components/BudgetCategoryCard'
import BudgetBreakdownTable from '../components/BudgetBreakdownTable'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
        <div className="flex justify-end mb-4">
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-transform transform hover:scale-105">
            ➕ Add Category
          </button>
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-xl border border-sky-700/30"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Add Budget Category</h2>
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    if (!formData.category || !formData.budget) return;
                    setCategories([...categories, {
                      category: formData.category,
                      budget: parseFloat(formData.budget),
                      spent: 0
                    }]);
                    setFormData({ category: '', budget: '' });
                    setShowModal(false);
                  }}>
                    <input
                      type="text"
                      placeholder="Category Name"
                      className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-500"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                    <input
                      type="number"
                      placeholder="Budget Amount ($)"
                      className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-500"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      required
                    />
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white text-sm"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          </button>
        </div>
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

<BudgetBreakdownTable data={categories}
  />
  <div className="bg-gray-800 p-4 rounded-xl shadow mt-6">
  <h2 className="text-white text-md font-semibold mb-2">💡 Smart Budget Insight</h2>
  <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
    <li>Your utilities budget may be overestimated. You’ve only used 60%.</li>
    <li>Dining out is nearing your limit — 97% spent.</li>
    <li>Groceries still have 32% available — could be used elsewhere.</li>
  </ul>
  <p className="text-xs text-gray-600 mt-3 italic">AI-driven recommendations will adapt to your real-time trends and spending habits.</p>
</div>
<p className="text-xs text-gray-500 mt-6">
  More categories, AI-driven adjustments, and automated syncing with your bank are coming soon.
</p>
      <div className="mt-10">
  <h2 className="text-white text-lg font-semibold mb-4">📆 Monthly Overview</h2>
  <div className="bg-gray-800 p-4 rounded-xl shadow mb-6">
    <select className="w-full bg-gray-900 text-white p-2 rounded-md text-sm">
      <option>June 2025</option>
      <option>May 2025</option>
      <option>April 2025</option>
    </select>
  </div>
  <div className="bg-gray-800 p-4 rounded-xl shadow">
    <h2 className="text-white text-md font-semibold mb-2">📊 Spending vs Income</h2>
    <p className="text-sm text-gray-400">(Chart placeholder) In future, this will be a dynamic bar chart showing your income and expenses over the last 12 months.</p>
    <div className="mt-4 h-48 flex items-center justify-center bg-gray-900 text-gray-600 rounded-md">
      <span>📊 [Chart Goes Here]</span>
    </div>
  </div>
</div>
</div>
        <div id="add-category-modal-root"></div>
      </div>
    </AnimatedPage>
  )
}
