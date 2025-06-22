const formatCurrency = (val) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

export default function BudgetRow({
  row,
  isVisible,
  showSummary,
  isEditable,
  isSelected,
  onClick,
  onClickCategory,
  onFieldChange,
  onRowClick,
}) {
  const difference = row.planned - row.actual;
  const percent = ((row.actual / (row.planned || 1)) * 100).toFixed(0);
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
      className={`border-t border-gray-700 transition cursor-pointer ${
        isSelected ? 'bg-gray-700' : showSummary ? 'hover:bg-gray-800' : ''
      }`}
      onClick={() => {
        if (showSummary && onClick) onClick();
        if (!showSummary && onRowClick) onRowClick();
      }}
    >
      <td className={`px-4 py-2 ${indentStyle}`}>
        {isEditable && !showSummary ? (
          <input
            value={row.category}
            onChange={(e) => onFieldChange(row.id, 'category', e.target.value)}
            className="bg-transparent text-white w-full border border-gray-600 rounded px-2 py-1 text-sm"
          />
        ) : (
          <span onClick={() => onClickCategory?.(row.category)}>{row.category}</span>
        )}
      </td>
      <td className="px-4 py-2">
        {isEditable && !showSummary ? (
          <input
            type="number"
            value={row.planned}
            onChange={(e) => onFieldChange(row.id, 'planned', parseFloat(e.target.value))}
            className="bg-transparent text-white w-full border border-gray-600 rounded px-2 py-1 text-sm"
          />
        ) : (
          formatCurrency(row.planned)
        )}
      </td>
      <td className="px-4 py-2">
        {isEditable && !showSummary ? (
          <input
            type="number"
            value={row.actual}
            onChange={(e) => onFieldChange(row.id, 'actual', parseFloat(e.target.value))}
            className="bg-transparent text-white w-full border border-gray-600 rounded px-2 py-1 text-sm"
          />
        ) : (
          formatCurrency(row.actual)
        )}
      </td>
      <td className={`px-4 py-2 ${isOver ? 'text-red-400' : 'text-green-400'}`}>
        {isOver ? '-' : '+'}{formatCurrency(Math.abs(difference))}
      </td>
      <td className={`px-4 py-2 ${isOver ? 'text-red-400' : 'text-green-400'}`}>{percent}%</td>
      <td className={`px-4 py-2 ${getStatusColor()}`}>{getStatus()}</td>
      <td className="px-4 py-2">
        {isEditable && !showSummary ? (
          <textarea
            className="bg-transparent text-white border border-gray-600 rounded w-full px-2 py-1 text-sm"
            value={row.notes || ''}
            onChange={(e) => onFieldChange(row.id, 'notes', e.target.value)}
          />
        ) : (
          <span className="text-gray-400">{row.notes}</span>
        )}
      </td>
    </tr>
  ) : null;
}
