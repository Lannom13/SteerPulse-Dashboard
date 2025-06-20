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

        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-gray-400 text-sm">🧪 Spreadsheet editing coming soon.</p>
        </div>
      </div>
    </AnimatedPage>
  );
}

