import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';

export default function BudgetSpreadsheet() {
  const dummyData = [
    {
      category: "Groceries",
      planned: 500,
      actual: 420,
      notes: "Meal prep success",
    },
    {
      category: "Mortgage",
      planned: 1200,
      actual: 1200,
      notes: "Fixed monthly payment",
    },
    {
      category: "Entertainment",
      planned: 200,
      actual: 260,
      notes: "Concert tickets",
    },
    {
      category: "Subscriptions",
      planned: 100,
      actual: 110,
      notes: "Annual renewals",
    },
    {
      category: "Utilities",
      planned: 250,
      actual: 230,
      notes: "Mild weather savings",
    }
  ];

  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">📋 Budget Spreadsheet</h1>

        {/* Top Sub Nav */}
        <nav className="mb-8 flex justify-start gap-4 border-b border-gray-700 pb-3">
          <Link to="/budgeting" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors">Dashboard</Link>
          <Link to="/budgeting/spreadsheet" className="text-sm text-white border-b-2 border-sky-500 px-2 pb-1">Spreadsheet</Link>
        </nav>

        {/* Refined Toolbar */}
        <div className="mb-8 flex flex-wrap items-center gap-3 text-sm">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md shadow-sm transition">➕ Add</button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md shadow-sm transition">🗑 Remove</button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md shadow-sm transition">💾 Save</button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md shadow-sm transition">⬅️ Undo</button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md shadow-sm transition">➡️ Redo</button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md shadow-sm transition">🔄 Sync</button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1 rounded-md shadow-sm transition">⬇ Export</button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md shadow-sm transition">❓ Help</button>
        </div>

        {/* Budget Row Table with Dummy Data */}
        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase border-b border-gray-600">
                <tr>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Planned</th>
                  <th className="px-4 py-2">Actual</th>
                  <th className="px-4 py-2">Difference</th>
                  <th className="px-4 py-2">Usage %</th>
                  <th className="px-4 py-2">Trend</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {dummyData.map((row, idx) => {
                  const difference = row.planned - row.actual;
                  const percent = ((row.actual / row.planned) * 100).toFixed(0);
                  const isOver = row.actual > row.planned;
                  return (
                    <tr key={idx} className="border-t border-gray-700">
                      <td className="px-4 py-2">{row.category}</td>
                      <td className="px-4 py-2">${row.planned}</td>
                      <td className="px-4 py-2">${row.actual}</td>
                      <td className={`px-4 py-2 ${isOver ? 'text-red-400' : 'text-green-400'}`}>{isOver ? '-' : '+'}${Math.abs(difference)}</td>
                      <td className={`px-4 py-2 ${percent > 100 ? 'text-red-400' : 'text-green-400'}`}>{percent}%</td>
                      <td className="px-4 py-2">{isOver ? '📈' : '📉'}</td>
                      <td className={`px-4 py-2 ${isOver ? 'text-red-400' : 'text-green-500'}`}>{isOver ? 'Overspent' : 'On Track'}</td>
                      <td className="px-4 py-2">{row.notes}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
