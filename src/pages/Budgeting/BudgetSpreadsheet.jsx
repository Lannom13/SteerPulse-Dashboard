// BudgetSpreadsheet.jsx
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';

export default function BudgetSpreadsheet() {
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

        {/* Budget Row Table Mockup */}
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
                <tr className="border-t border-gray-700">
                  <td className="px-4 py-2">Groceries</td>
                  <td className="px-4 py-2">$500</td>
                  <td className="px-4 py-2">$420</td>
                  <td className="px-4 py-2 text-green-400">+$80</td>
                  <td className="px-4 py-2 text-green-400">84%</td>
                  <td className="px-4 py-2">📉</td>
                  <td className="px-4 py-2 text-green-500">On Track</td>
                  <td className="px-4 py-2">Meal prep success</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
