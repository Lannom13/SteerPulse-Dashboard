// BudgetSpreadsheet.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import BudgetRow from '../../components/BudgetRow';
import InsightsPanel from '../../components/InsightsPanel';

export default function BudgetSpreadsheet() {
  const dummyData = [
    { category: 'Income - Austin', planned: 3000, actual: 3000, notes: 'Salary', group: 'Income' },
    { category: 'Income - Megan', planned: 2000, actual: 2000, notes: 'Part-time', group: 'Income' },
    { category: 'Groceries', planned: 500, actual: 420, notes: 'Meal prep', group: 'Food' },
    { category: 'Fast Food', planned: 150, actual: 180, notes: 'Dining out', group: 'Food' },
    { category: 'Mortgage', planned: 1200, actual: 1200, notes: 'Home loan', group: 'Housing' },
    { category: 'Utilities', planned: 250, actual: 230, notes: 'All utilities', group: 'Housing' },
    { category: 'Entertainment', planned: 200, actual: 260, notes: 'Concert', group: 'Lifestyle' },
    { category: 'Subscriptions', planned: 100, actual: 110, notes: 'Annual renewals', group: 'Lifestyle' }
  ];

  const [selectedMonth, setSelectedMonth] = useState('June 2025');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [selectedCategoryForInsights, setSelectedCategoryForInsights] = useState(null);
  const [rows, setRows] = useState([...dummyData]);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const handleAddRow = () => {
    const newRow = { category: 'New Category', planned: 0, actual: 0, notes: '', group: 'Custom' };
    setHistory([...history, rows]);
    setRows([...rows, newRow]);
    setFuture([]);
  };

  const handleRemoveRow = () => {
    setHistory([...history, rows]);
    setRows(rows.slice(0, -1));
    setFuture([]);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setFuture([rows, ...future]);
      setRows(prev);
      setHistory(history.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (future.length > 0) {
      const next = future[0];
      setHistory([...history, rows]);
      setRows(next);
      setFuture(future.slice(1));
    }
  };

  const groups = [...new Set(rows.map(row => row.group))];
  const totals = rows.reduce((acc, row) => {
    acc.planned += row.planned;
    acc.actual += row.actual;
    acc.difference += row.planned - row.actual;
    return acc;
  }, { planned: 0, actual: 0, difference: 0 });

  return (
    <AnimatedPage>
      <div className="text-white">
        <div className="flex justify-between mb-4 border-b border-gray-700 pb-2">
          <nav className="flex gap-4">
            <Link to="/budgeting" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 pb-1">Dashboard</Link>
            <Link to="/budgeting/spreadsheet" className="text-sm text-white border-b-2 border-sky-500 pb-1">Spreadsheet</Link>
          </nav>

          <div className="flex gap-3 text-sm">
            <button onClick={handleAddRow} className="text-white px-3 py-1 hover:bg-sky-700 rounded transition">Add</button>
            <button onClick={handleRemoveRow} className="text-white px-3 py-1 hover:bg-sky-700 rounded transition">Remove</button>
            <button onClick={handleUndo} className="text-white px-2 py-1 hover:bg-sky-700 rounded transition">Undo</button>
            <button onClick={handleRedo} className="text-white px-2 py-1 hover:bg-sky-700 rounded transition">Redo</button>
            <button className="text-white px-3 py-1 hover:bg-sky-700 rounded transition">Save</button>
            <button className="text-white px-3 py-1 hover:bg-sky-700 rounded transition">Export</button>
            <button className="text-white px-3 py-1 hover:bg-sky-700 rounded transition">Help</button>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase border-b border-gray-600">
                <tr>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Planned</th>
                  <th className="px-4 py-2">Actual</th>
                  <th className="px-4 py-2">Difference</th>
                  <th className="px-6 py-2">Usage</th>
                  <th className="px-6 py-2">Status</th>
                  <th className="px-4 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {groups.map(group => {
                  const groupRows = rows.filter(row => row.group === group);
                  const groupPlanned = groupRows.reduce((sum, row) => sum + row.planned, 0);
                  const groupActual = groupRows.reduce((sum, row) => sum + row.actual, 0);

                  return [
                    <BudgetRow
                      key={`summary-${group}`}
                      row={{ category: group, planned: groupPlanned, actual: groupActual }}
                      showSummary={true}
                      isVisible={false}
                      onClick={() => setExpandedGroup(group === expandedGroup ? null : group)}
                    />,
                    ...(expandedGroup === group ? groupRows.map((row, idx) => (
                      <BudgetRow
                        key={`${group}-detail-${idx}`}
                        row={row}
                        showSummary={false}
                        isVisible={true}
                      />
                    )) : [])
                  ];
                })}
              </tbody>
            </table>
          </div>
        </div>

        {selectedCategoryForInsights && (
          <InsightsPanel category={selectedCategoryForInsights} onClose={() => setSelectedCategoryForInsights(null)} />
        )}
      </div>
    </AnimatedPage>
  );
}
