// BudgetRow.jsx
import React from 'react';

export default function BudgetRow({ row, isVisible, showSummary, onClick }) {
  const difference = row.planned - row.actual;
  const percent = ((row.actual / row.planned) * 100).toFixed(0);
  const isOver = row.actual > row.planned;
  const displayRow = isVisible || showSummary;
  const indentStyle = isVisible ? 'pl-6' : showSummary ? 'font-bold' : '';

  const getStatus = () => {
    if (percent > 110) return 'Needs Review';
    if (percent > 100) return 'Overspent';
    return 'On Track';
  };

  const getStatusColor = () => {
    if (percent > 110) return 'text-yellow-400';
    if (percent > 100) return 'text-red-400';
    return 'text-green-400';
  };

  return displayRow ? (
    <tr
      className={`border-t border-gray-700 ${showSummary ? 'bg-gray-900 text-white cursor-pointer hover:bg-gray-800' : ''}`}
      onClick={showSummary ? onClick : undefined}
    >
      <td className={`px-4 py-2 ${indentStyle}`}>{row.category}</td>
      <td className="px-4 py-2">${row.planned}</td>
      <td className="px-4 py-2">${row.actual}</td>
      <td className={`px-4 py-2 ${isOver ? 'text-red-400' : 'text-green-400'}`}>{isOver ? '-' : '+'}${Math.abs(difference)}</td>
      <td className={`px-4 py-2 ${isOver ? 'text-red-400' : 'text-green-400'}`}>{percent}%</td>
      <td className="px-4 py-2">📈 {/* Placeholder for trend indicator */}</td>
      <td className="px-4 py-2">
        <textarea
          className="bg-transparent text-white border border-gray-600 rounded w-full px-2 py-1 text-sm"
          defaultValue={row.notes || ''}
          placeholder="Add notes..."
        />
      </td>
      <td className={`px-4 py-2 ${getStatusColor()}`}>{getStatus()}</td>
    </tr>
  ) : null;
}
