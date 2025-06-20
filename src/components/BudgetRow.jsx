// BudgetRow.jsx
import { useState } from 'react';

export default function BudgetRow({ row }) {
  const [planned, setPlanned] = useState(row.planned);
  const [notes, setNotes] = useState(row.notes);

  const difference = planned - row.actual;
  const percent = ((row.actual / planned) * 100).toFixed(0);
  const isOver = row.actual > planned;

  return (
    <tr className="border-t border-gray-700">
      <td className="px-4 py-2">{row.category}</td>
      <td className="px-4 py-2">
        <input
          type="number"
          className="bg-gray-900 text-white px-2 py-1 rounded w-24"
          value={planned}
          onChange={(e) => setPlanned(Number(e.target.value))}
        />
      </td>
      <td className="px-4 py-2">${row.actual}</td>
      <td className={`px-4 py-2 ${isOver ? 'text-red-400' : 'text-green-400'}`}>{isOver ? '-' : '+'}${Math.abs(difference)}</td>
      <td className={`px-4 py-2 ${percent > 100 ? 'text-red-400' : 'text-green-400'}`}>{percent}%</td>
      <td className="px-4 py-2">
        <div className={`w-20 h-2 rounded-full ${percent > 100 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min(percent, 100)}%` }}></div>
      </td>
      <td className={`px-4 py-2 ${isOver ? 'text-red-400' : 'text-green-500'}`}>{isOver ? 'Overspent' : 'On Track'}</td>
      <td className="px-4 py-2">
        <input
          type="text"
          className="bg-gray-900 text-white px-2 py-1 rounded w-full"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </td>
    </tr>
  );
}
