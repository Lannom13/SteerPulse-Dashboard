// File: /src/components/GoalCard.tsx
import { useEffect, useState } from 'react';

interface Goal {
  id: number;
  name: string;
  target: number;
  saved: number;
  date: string;
}

interface GoalCardProps {
  goal: Goal;
  onEdit: () => void;
  onDelete: () => void;
}

export default function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const finalPercent = Math.min((goal.saved / goal.target) * 100, 100);
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedPercent(finalPercent), 50);
    return () => clearTimeout(timeout);
  }, [finalPercent]);

  return (
    <div className="bg-gray-800 p-5 rounded-xl shadow transition-transform duration-300 hover:shadow-lg hover:scale-[1.02] relative group">
      <div className="text-xl font-semibold text-white mb-2">{goal.name}</div>
      <div className="text-sm text-gray-400 mb-1">
        Target: ${goal.target.toLocaleString()} by{' '}
        {new Date(goal.date).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric'
        })}
      </div>
      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-sky-500 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${animatedPercent}%` }}
        ></div>
      </div>
      <div className="text-sm text-gray-300 mt-2">
        ${goal.saved.toLocaleString()} saved • {finalPercent.toFixed(0)}% complete
      </div>

      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          title="Edit Goal"
          className="text-xs text-sky-400 hover:text-sky-300"
        >
          ✏️
        </button>
        <button
          onClick={onDelete}
          title="Delete Goal"
          className="text-xs text-red-400 hover:text-red-300"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}
