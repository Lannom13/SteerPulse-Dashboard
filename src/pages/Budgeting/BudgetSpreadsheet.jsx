// BudgetSpreadsheet.jsx
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';

export default function BudgetSpreadsheet() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">📋 Budget Spreadsheet</h1>
          <div className="text-sm text-gray-400">Notification Bar | AI Help</div>
        </div>
        <nav className="mb-6 flex flex-wrap gap-2 text-sm border-b border-gray-700 pb-2">
          <Link to="/budgeting" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Dashboard</Link>
          <Link to="/budgeting/spreadsheet" className="px-3 py-1 rounded-md bg-sky-700 text-white">Spreadsheet</Link>
        </nav>

        {/* Toolbar Placeholder */}
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md flex items-center gap-1">
            ➕ Add Category
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md flex items-center gap-1">
            🗑 Remove Category
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md flex items-center gap-1">
            💾 Save
          </button>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1 rounded-md flex items-center gap-1">
            ⬅️ Undo
          </button>
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-1 rounded-md flex items-center gap-1">
            ➡️ Redo
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-md flex items-center gap-1">
            🔄 Update from Plaid
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md flex items-center gap-1">
            🔽 Export
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md flex items-center gap-1">
            ❓ Help
          </button>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-gray-400 text-sm">🧪 Spreadsheet editing coming soon.</p>
        </div>
      </div>
    </AnimatedPage>
  );
}
