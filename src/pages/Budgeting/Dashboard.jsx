// src/pages/budgeting/Dashboard.jsx
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import BudgetDashboardCharts from '../../components/BudgetDashboardCharts';

export default function Dashboard() {
  const dummyData = [
    { category: "Groceries", planned: 500, actual: 420 },
    { category: "Mortgage", planned: 1200, actual: 1200 },
    { category: "Entertainment", planned: 200, actual: 260 },
    { category: "Subscriptions", planned: 100, actual: 110 },
    { category: "Utilities", planned: 250, actual: 230 },
  ];

  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🧾 Budgeting Dashboard</h1>
        <nav className="mb-8 flex justify-start gap-4 border-b border-gray-700 pb-3">
          <Link to="/budgeting" className="text-sm text-white border-b-2 border-sky-500 px-2 pb-1">Dashboard</Link>
          <Link to="/budgeting/spreadsheet" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors">Spreadsheet</Link>
        </nav>
        <BudgetDashboardCharts data={dummyData} />
      </div>
    </AnimatedPage>
  );
}
