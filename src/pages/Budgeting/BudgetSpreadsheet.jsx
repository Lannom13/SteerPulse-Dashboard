// BudgetSpreadsheet.jsx
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import BudgetRow from '../../components/BudgetRow';

export default function BudgetSpreadsheet() {
  const dummyData = [
    { category: "Income - Austin", planned: 3000, actual: 3000, notes: "Salary" },
    { category: "Income - Megan", planned: 2000, actual: 2000, notes: "Part-time" },
    { category: "Income - Business", planned: 800, actual: 600, notes: "Side gig" },
    { category: "Mortgage", planned: 1200, actual: 1200, notes: "Home loan" },
    { category: "Utilities", planned: 250, actual: 230, notes: "All utilities" },
    { category: "Groceries", planned: 500, actual: 420, notes: "Meal prep" },
    { category: "Entertainment", planned: 200, actual: 260, notes: "Concert" },
    { category: "Subscriptions", planned: 100, actual: 110, notes: "Annual renewals" },
    { category: "Transportation", planned: 300, actual: 280, notes: "Gas & maintenance" },
    { category: "Health Care", planned: 150, actual: 170, notes: "Dental visit" },
  ];

  const totals = dummyData.reduce(
    (acc, row) => {
      acc.planned += row.planned;
      acc.actual += row.actual;
      return acc;
    },
    { planned: 0, actual: 0 }
  );

  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">📋 Budget Spreadsheet</h1>

        {/* Top Sub Nav */}
        <nav className="mb-8 flex justify-start gap-4 border-b border-gray-700 pb-3">
          <Link to="/budgeting" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors">Dashboard</Link>
          <Link to="/budgeting/spreadsheet" className="text-sm text-white border-b-2 border-sky-500 px-2 pb-1">Spreadsheet</Link>
        </nav>

        {/* Toolbar */}
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

        {/* Budget Table with Dummy Data */}
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
                {dummyData.map((row, idx) => (
                  <BudgetRow key={idx} row={row} />
                ))}
                <tr className="border-t border-gray-600 bg-gray-900">
                  <td className="px-4 py-2 font-bold">Totals</td>
                  <td className="px-4 py-2 font-bold">${totals.planned}</td>
                  <td className="px-4 py-2 font-bold">${totals.actual}</td>
                  <td className="px-4 py-2 font-bold text-sky-400" colSpan={5}>Review status & notes above</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
