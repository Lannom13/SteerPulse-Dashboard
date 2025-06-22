import AnimatedPage from '../components/AnimatedPage';
import { useState } from 'react';
import KpiCard from '../components/KpiCard';
import BudgetRing from '../components/BudgetRing';
import CashFlowChart from '../components/CashFlowChart';
import InsightCard from '../components/InsightCard';
import TransactionPreview from '../components/TransactionPreview';
import InvestmentSnapshot from '../components/InvestmentSnapshot';
import NetWorthChart from '../components/NetWorthChart';
import PlaidConnectButton from '../components/PlaidConnectButton'; // ✅ added
import useNetWorth from '../hooks/useNetWorth';

export default function Overview() {
  const [scenario, setScenario] = useState('MTD');
  const { netWorth, loading: loadingNetWorth } = useNetWorth();

  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-4">📊 SteerPulse Overview</h1>

        {/* ✅ Re-added Plaid Connect Button */}
        <div className="mb-4">
          <PlaidConnectButton userId="demo-user" />
        </div>

        <div className="text-sm bg-gray-800 p-4 rounded-xl shadow text-gray-300 mb-6">
          💡 You’ve saved <span className="text-green-400 font-semibold">$630</span> more than you’ve spent this month. Great job staying <span className="text-blue-400 font-semibold">12%</span> under budget. Consider reallocating savings to your investment goal.
        </div>

        {/* Performance Toggle */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <button
            onClick={() => setScenario('MTD')}
            className={`${
              scenario === 'MTD' ? 'bg-brand-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            } text-sm font-medium px-4 py-2 rounded-full`}
          >
            MTD
          </button>
          <button
            onClick={() => setScenario('YTD')}
            className={`${
              scenario === 'YTD' ? 'bg-brand-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            } text-sm font-medium px-4 py-2 rounded-full`}
          >
            YTD
          </button>
          <div className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded-full">📈 Benchmark: Save $500/mo</div>
          <div className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded-full">🧾 Actual vs Budget: +12%</div>
          <div className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded-full">📆 This Month vs LY: -8%</div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <KpiCard
            title="Net Worth"
            value={
              loadingNetWorth
                ? 'Loading...'
                : `$${netWorth?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}`
            }
            scenario={scenario}
          />
          <KpiCard title="Budget Used" value="$1,920 / $2,500" scenario={scenario} />
          <KpiCard title="Cash Flow" value="+$630" scenario={scenario} />
        </div>

        {/* Net Worth Chart */}
        <div className="mb-6">
          <NetWorthChart />
        </div>

        {/* Transactions + Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-2 bg-gray-800 p-4 rounded-xl shadow">
            <TransactionPreview />
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow space-y-4">
            <InsightCard
              title="Dining Budget Warning"
              message="You're 85% through your dining budget for the month."
              type="warning"
            />
            <InsightCard
              title="Cash Flow Up"
              message="You brought in $630 more than you spent so far this month."
              type="success"
            />
            <InsightCard
              title="Idle Funds Detected"
              message="You have $2,300 sitting in checking. Consider moving to high-yield savings."
              type="info"
            />
          </div>
        </div>

        {/* Debt & Investment Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <BudgetRing percentage={72} label="Debt Payoff Progress" />
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <InvestmentSnapshot />
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
