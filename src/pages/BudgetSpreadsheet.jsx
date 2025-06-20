// src/pages/BudgetSpreadsheet.jsx
import AnimatedPage from '../components/AnimatedPage'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BudgetSpreadsheet() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ category: '', budget: '' });

  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">📑 Budget Spreadsheet Editor</h1>
        <p className="text-gray-400 mb-6 text-sm">
          Manage your categories with full editing control. Add, remove, or update budget lines here.
        </p>

        <nav className="mb-6 flex flex-wrap gap-2 text-sm">
          <a href="/budgeting" className="px-3 py-1 rounded-md bg-sky-700 text-white">Dashboard</a>
          <a href="/budgeting/spreadsheet" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Spreadsheet</a>
          <a href="/budgeting/analysis" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Insights</a>
          <a href="/budgeting/history" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">History</a>
        </nav>

        <div className="bg-gray-800 p-4 rounded-xl shadow mb-6 flex flex-wrap items-center gap-4">
          <button onClick={() => setShowModal(true)} className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium">➕ Add Row</button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium">🗑️ Remove Row</button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">💾 Save</button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium">↩️ Undo</button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium">↪️ Redo</button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium">🔄 Update from Plaid</button>
          <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium">📤 Export CSV</button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium">❓ Help</button>
        </div>

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
                <h2 className="text-xl font-semibold text-white mb-4">Add Budget Row</h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    console.log('Saving new row:', formData)
                    setFormData({ category: '', budget: '' })
                    setShowModal(false)
                  }}
                >
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Budget Amount ($)"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-500"
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

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-400">
            Table and inputs coming soon. This layout will house your full category manager with editable fields and real-time syncing.
          </p>
        </div>
      </div>
    </AnimatedPage>
  )
}
