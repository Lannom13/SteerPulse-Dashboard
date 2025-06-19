// src/pages/Goals.jsx
import AnimatedPage from '../components/AnimatedPage'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GoalCard from '../components/GoalCard'

export default function Goals() {
  const [showModal, setShowModal] = useState(false)
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: 'Family Vacation',
      target: 3000,
      saved: 1350,
      date: '2025-12-31',
    },
    {
      id: 2,
      name: 'Pay Off Credit Card',
      target: 1200,
      saved: 800,
      date: '2025-09-30',
    },
  ])

  const [formData, setFormData] = useState({ name: '', target: '', saved: '', date: '' })

  const handleSaveGoal = (e) => {
    e.preventDefault()
    const newGoal = {
      id: Date.now(),
      name: formData.name,
      target: parseFloat(formData.target),
      saved: parseFloat(formData.saved),
      date: formData.date,
    }
    setGoals([...goals, newGoal])
    setFormData({ name: '', target: '', saved: '', date: '' })
    setShowModal(false)
  }

  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🎯 Goals Tracker</h1>

        <button
          onClick={() => setShowModal(true)}
          className="mb-6 flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          <span className="text-lg">➕</span>
          Add Goal
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
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
                <form className="space-y-4" onSubmit={handleSaveGoal}>
                  <input
                    type="text"
                    placeholder="Goal Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Target Amount ($)"
                    value={formData.target}
                    onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    className="w-full p-2 rounded-md bg-gray-800 text-white placeholder-gray-500"
                    required
                  />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2 rounded-md bg-gray-800 text-white"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Current Saved"
                    value={formData.saved}
                    onChange={(e) => setFormData({ ...formData, saved: e.target.value })}
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
