// BudgetSpreadsheet.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import BudgetRow from '../../components/BudgetRow';
import InsightsPanel from '../../components/InsightsPanel';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

export default function BudgetSpreadsheet() {
  const dummyData = [
    { category: 'Income - Austin', planned: 3000, actual: 3000, group: 'Income' },
    { category: 'Income - Megan', planned: 2000, actual: 2000, group: 'Income' },
    { category: 'Groceries', planned: 500, actual: 420, group: 'Food' },
    { category: 'Fast Food', planned: 150, actual: 180, group: 'Food' },
    { category: 'Mortgage', planned: 1200, actual: 1200, group: 'Housing' },
    { category: 'Utilities', planned: 250, actual: 230, group: 'Housing' },
    { category: 'Entertainment', planned: 200, actual: 260, group: 'Lifestyle' },
    { category: 'Subscriptions', planned: 100, actual: 110, group: 'Lifestyle' },
    { category: 'Credit Card', planned: 500, actual: 480, group: 'Debt' },
    { category: 'Student Loan', planned: 300, actual: 300, group: 'Debt' },
    { category: 'Emergency Fund', planned: 200, actual: 200, group: 'Savings & Investments' },
    { category: 'Brokerage', planned: 150, actual: 150, group: 'Savings & Investments' },
    { category: 'Medical Bills', planned: 100, actual: 90, group: 'Healthcare' },
    { category: 'Prescriptions', planned: 50, actual: 60, group: 'Healthcare' },
    { category: 'Tithes', planned: 100, actual: 100, group: 'Donations' },
    { category: 'Charity', planned: 50, actual: 50, group: 'Donations' },
    { category: 'Daycare', planned: 400, actual: 400, group: 'Childcare' },
    { category: 'Gas', planned: 150, actual: 140, group: 'Transportation' },
    { category: 'Auto Maintenance', planned: 100, actual: 120, group: 'Transportation' },
    { category: 'Clothing', planned: 200, actual: 190, group: 'Shopping' },
    { category: 'Household Goods', planned: 100, actual: 100, group: 'Shopping' },
    { category: 'Gifts', planned: 80, actual: 90, group: 'Miscellaneous' },
    { category: 'Misc. Spending', planned: 60, actual: 70, group: 'Miscellaneous' },
    { category: 'Health Insurance', planned: 300, actual: 300, group: 'Insurance' },
    { category: 'Car Insurance', planned: 150, actual: 150, group: 'Insurance' }
  ];

  const [selectedMonth, setSelectedMonth] = useState('June 2025');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [selectedCategoryForInsights, setSelectedCategoryForInsights] = useState(null);
  const [rows, setRows] = useState([...dummyData]);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const handleAddRow = () => {
    const newRow = { category: 'New Category', planned: 0, actual: 0, group: 'Custom' };
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

  const COLORS = ['#0284c7', '#06b6d4', '#9333ea', '#facc15', '#f97316', '#ef4444', '#22c55e', '#3b82f6'];
  const pieData = rows.map(row => ({ name: row.category, value: row.actual }));

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

        <div className="bg-gray-800 p-4 rounded-xl shadow mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase border-b border-gray-600">
                <tr>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Planned</th>
                  <th className="px-4 py-2">Actual</th>
                  <th className="px-4 py-2">Difference</th>
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

        <div className="bg-gray-800 p-4 rounded-xl shadow mb-6">
          <h3 className="text-white text-lg font-semibold mb-2">Spending Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {selectedCategoryForInsights && (
          <InsightsPanel category={selectedCategoryForInsights} onClose={() => setSelectedCategoryForInsights(null)} />
        )}
      </div>
    </AnimatedPage>
  );
}
