// BudgetRow.jsx
import { useState, useEffect } from 'react';

export default function BudgetRow({ row, isVisible, showSummary, onClick }) {
  const [planned, setPlanned] = useState(row.planned);
  const [notes, setNotes] = useState(row.notes);
  const [usageColor, setUsageColor] = useState('bg-sky-500');

  const difference = planned - row.actual;
  const percent = ((row.actual / planned) * 100).toFixed(0);
  const isOver = row.actual > planned;
  const percentOfTotal = row.percentOfTotal || 0;

  useEffect(() => {
    if (percent > 100) setUsageColor('bg-sky-700');
    else if (percent > 80) setUsageColor('bg-sky-600');
    else setUsageColor('bg-sky-500');
  }, [percent]);

  const displayRow = isVisible || showSummary;
  const indentStyle = isVisible ? 'pl-6' : showSummary ? 'font-bold' : '';

  return displayRow ? (
    <tr
      className={`border-t border-gray-700 ${
        showSummary ? 'bg-gray-900 text-white cursor-pointer hover:bg-gray-800' : ''
      }`}
      onClick={showSummary ? onClick : undefined}
    >
      <td className={`px-4 py-2 ${indentStyle}`}>{row.category}</td>
      <td className="px-4 py-2">${planned}</td>
      <td className="px-4 py-2">${row.actual}</td>
      <td className={`px-4 py-2 ${isOver ? 'text-red-400' : 'text-green-400'}`}>
        {isOver ? '-' : '+'}${Math.abs(difference)}
      </td>
      <td className="px-4 py-2">
        <div className="w-full bg-gray-700 h-5 rounded relative">
          <div
            className={`${usageColor} h-full rounded`}
            style={{ width: `${Math.min(percent, 100)}%` }}
          ></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs text-white font-semibold">
            {percent}%
          </div>
        </div>
      </td>
      <td className={`px-4 py-2 ${isOver ? 'text-red-400' : 'text-green-500'}`}>
        {isOver ? 'Overspent' : 'On Track'}
      </td>
      <td className="px-4 py-2 text-right text-sm text-gray-400">
        {percentOfTotal.toFixed(1)}%
      </td>
      <td className="px-4 py-2 text-gray-500 italic">{notes}</td>
    </tr>
  ) : null;
}
