// src/pages/Goals.jsx
import AnimatedPage from '../components/AnimatedPage'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Goals() {
  const [showModal, setShowModal] = useState(false)

  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🎯 Goals Tracker</h1>

        <button
          onClick={() => setShowModal(true)}
          className="mb-6 bg-brand-500 hover:bg-brand-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          + Add Goal
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sample Goal Cards */}
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

        <p className="text-sm text-gray-500 mt-6">More goal types, charts, and AI milestone alerts coming soon.</p>

        {/* Modal Overlay */}
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
                className="bg-gray-900 p-6 rounded-xl w-full max-w-md shadow-xl"
              >
                <h2 className="text-xl font-semibold text-white mb-4">Add New Goal</h2>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Goal Name"
                    className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-500"
                  />
                  <input
                    type="number"
                    placeholder="Target Amount ($)"
                    className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-500"
                  />
                  <input
                    type="date"
                    className="w-full p-2 rounded-md bg-gray-800 text-white"
                  />
                  <input
                    type="number"
                    placeholder="Current Saved"
                    className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-500"
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
                      onClick={(e) => {
                        e.preventDefault()
                        setShowModal(false)
                      }}
                      className="px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-sm"
                    >
                      Save Goal
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedPage>
  )
}
