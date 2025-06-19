// src/components/GoalCard.jsx
export default function GoalCard({ goal, onEdit }) {
  const percent = Math.min((goal.saved / goal.target) * 100, 100)

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] relative group">
      <div className="text-xl font-semibold text-white mb-2">{goal.name}</div>
      <div className="text-sm text-gray-400 mb-1">
        Target: ${goal.target.toLocaleString()} by{' '}
        {new Date(goal.date).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })}
      </div>
      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-300 mt-2">
        ${goal.saved.toLocaleString()} saved • {percent.toFixed(0)}% complete
      </div>

      {/* ✏️ Edit Button (top-right corner) */}
      <button
        onClick={onEdit}
        className="absolute top-2 right-2 text-xs text-sky-400 hover:text-sky-300 hidden group-hover:inline"
        title="Edit Goal"
      >
        ✏️ Edit
      </button>
    </div>
  )
}
