// Dashboard.jsx
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';

export default function Dashboard() {
  return (
    <AnimatedPage>
      <div className="text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">🧾 Budgeting Dashboard</h1>
          <div className="text-sm text-gray-400">Notification Bar | AI Help</div>
        </div>
        <nav className="mb-6 flex flex-wrap gap-2 text-sm border-b border-gray-700 pb-2">
          <Link to="/budgeting" className="px-3 py-1 rounded-md bg-sky-700 text-white">Dashboard</Link>
          <Link to="/budgeting/spreadsheet" className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">Spreadsheet</Link>
        </nav>
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <p className="text-gray-400 text-sm">Welcome to your budget. Choose a tool above to get started.</p>
        </div>
      </div>
    </AnimatedPage>
  );
}
