import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
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

  const incomeTotal = dummyData.filter(d => d.category.includes('Income')).reduce((sum, item) => sum + item.actual, 0);
  const expenses = dummyData.filter(d => !d.category.includes('Income'));
  const expensesTotal = expenses.reduce((sum, item) => sum + item.actual, 0);
  const savings = incomeTotal - expensesTotal;

  const insights = [];

  expenses.forEach(item => {
    const variance = item.actual - item.planned;
    const percent = (variance / item.planned) * 100;

    if (percent > 10) {
      insights.push(`🚨 You overspent by ${percent.toFixed(0)}% on ${item.category}. Consider reducing this area next month.`);
    } else if (percent < -20) {
      insights.push(`👍 You're spending well below budget on ${item.category}. You may be able to reallocate funds.`);
    }
  });

  if (savings > 0) {
    insights.push(`💡 You're currently saving $${savings.toLocaleString()} this month. Consider putting more into investments or debt payoff.`);
  } else {
    insights.push(`📉 You're currently overspending. Try reducing spending in non-essential categories like Entertainment or Fast Food.`);
  }

  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">📊 Budget Dashboard</h1>
        <nav className="mb-6 flex justify-start gap-4 border-b border-gray-700 pb-3">
          <Link to="/budgeting" className="text-sm text-white border-b-2 border-sky-500 px-2 pb-1">Dashboard</Link>
          <Link to="/budgeting/spreadsheet" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors">Spreadsheet</Link>
        </nav>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Income</p>
            <p className="text-2xl font-bold text-green-400">${incomeTotal.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Expenses</p>
            <p className="text-2xl font-bold text-red-400">${expensesTotal.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Savings</p>
            <p className="text-2xl font-bold text-sky-400">${savings.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-400">Net Difference</p>
            <p className={`text-2xl font-bold ${savings >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {savings >= 0 ? '+' : ''}${savings.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-6">
          <BudgetDashboardCharts data={expenses} />
        </div>

        {/* Smart Suggestions (Dynamic) */}
        <div className="bg-gray-900 p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-semibold mb-2 text-white">🧠 Smart Suggestions</h2>
          <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
            {insights.length > 0 ? (
              insights.map((tip, idx) => <li key={idx}>{tip}</li>)
            ) : (
              <li>You're tracking well! Keep reviewing your budget weekly for small wins.</li>
            )}
          </ul>
        </div>
      </div>
    </AnimatedPage>
  );
}
