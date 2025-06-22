import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage'; // ✅ fixed path
import BudgetDashboardCharts from '../../components/BudgetDashboardCharts';

export default function Dashboard() {
  const dummyData = [
    { category: 'Income', planned: 5000, actual: 5000 },
    { category: 'Groceries', planned: 500, actual: 420 },
    { category: 'Fast Food', planned: 150, actual: 180 },
    { category: 'Mortgage', planned: 1200, actual: 1200 },
    { category: 'Utilities', planned: 250, actual: 230 },
    { category: 'Entertainment', planned: 200, actual: 260 },
    { category: 'Subscriptions', planned: 100, actual: 110 }
  ];

  const incomeTotal = dummyData
    .filter(d => d.category.includes('Income'))
    .reduce((sum, item) => sum + item.actual, 0);
  const expensesTotal = dummyData
    .filter(d => !d.category.includes('Income'))
    .reduce((sum, item) => sum + item.actual, 0);
  const savings = incomeTotal - expensesTotal;

  return (
    <AnimatedPage>
      <div className="text-white">
        {/* Title & Navigation */}
        <h1 className="text-3xl font-bold mb-6">📊 Budget Dashboard</h1>
        <nav className="mb-6 flex justify-start gap-4 border-b border-gray-700 pb-3">
          <Link
            to="/budgeting"
            className="text-sm text-white border-b-2 border-sky-500 px-2 pb-1"
          >
            Dashboard
          </Link>
          <Link
            to="/budgeting/spreadsheet"
            className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors"
          >
            Spreadsheet
          </Link>
          <Link
            to="/budgeting/charts"
            className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors"
          >
            Charts
          </Link>
        </nav>

        {/* Summary Card Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Income</p>
            <p className="text-2xl font-bold text-green-400">
              ${incomeTotal.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Expenses</p>
            <p className="text-2xl font-bold text-red-400">
              ${expensesTotal.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Savings</p>
            <p className="text-2xl font-bold text-sky-400">
              ${savings.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Net Difference</p>
            <p
              className={`text-2xl font-bold ${
                savings >= 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {savings >= 0 ? '+' : ''}${savings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Charts from BudgetDashboardCharts */}
        <div className="mb-6">
          <BudgetDashboardCharts
            data={dummyData.filter(d => !d.category.includes('Income'))}
          />
        </div>
      </div>
    </AnimatedPage>
  );
}
