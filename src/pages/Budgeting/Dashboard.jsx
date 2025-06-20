// Dashboard.jsx
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';

export default function Dashboard() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🧾 Budgeting Dashboard</h1>
        <nav className="mb-8 flex justify-start gap-4 border-b border-gray-700 pb-3">
          <Link to="/budgeting" className="text-sm text-white border-b-2 border-sky-500 px-2 pb-1">Dashboard</Link>
          <Link to="/budgeting/spreadsheet" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors">Spreadsheet</Link>
        </nav>
        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-4 shadow h-64">Bar Chart (Planned vs Actual)</div>
          <div className="bg-gray-800 rounded-xl p-4 shadow h-64">Pie Chart (Spending Breakdown)</div>
          <div className="bg-gray-800 rounded-xl p-4 shadow h-64 md:col-span-2">Line Chart (Monthly Trend)</div>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Welcome to your budget. Choose a tool above to get started.</p>
        </div>
      </div>
    </AnimatedPage>
  );
}
