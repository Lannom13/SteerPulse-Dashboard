// src/pages/Overview.jsx
import AnimatedPage from '../components/AnimatedPage'
import { useState } from 'react'
import KpiCard from '../components/KpiCard'
import BudgetRing from '../components/BudgetRing'
import CashFlowChart from '../components/CashFlowChart'
import InsightCard from '../components/InsightCard'
import TransactionPreview from '../components/TransactionPreview'
import InvestmentSnapshot from '../components/InvestmentSnapshot'

export default function Overview() {
  const [scenario, setScenario] = useState('MTD')

  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">🧭 SteerPulse Overview</h1>

        {/* Performance Scenario Row */}
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
          <div className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded-full">
            📈 Benchmark: Save $500/mo
          </div>
          <div className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded-full">
            🧾 Actual vs Budget: +12%
          </div>
          <div className="text-sm bg-gray-800 text-gray-300 px-4 py-2 rounded-full">
            📆 This Month vs LY: -8%
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Row 1 – KPI Cards */}
          <KpiCard title="Net Worth" value="$128,450" scenario={scenario} />
          <KpiCard title="Budget Used" value="$1,920 / $2,500" scenario={scenario} />
          <KpiCard title="Cash Flow" value="+$630" scenario={scenario} />
        </div>

        <div className="mb-6">
          {/* Cash Flow Line Chart */}
          <CashFlowChart />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Row 2 – Recent Transactions + Smart Insights */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Row 3 – Debt & Investment Overview */}
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <BudgetRing percentage={72} label="Debt Payoff Progress" />
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <InvestmentSnapshot />
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}
