// File: /pages/investments/overview.tsx
import AnimatedPage from '@/components/AnimatedPage';
import Link from 'next/link';
import { NextPage } from 'next';

const InvestmentsOverview: NextPage = () => {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">📈 Investments Overview</h1>

        {/* Tab Navigation */}
        <nav className="mb-6 flex justify-start gap-4 border-b border-gray-700 pb-3">
          <Link href="/investments/overview" className="text-sm text-white border-b-2 border-sky-500 px-2 pb-1">Overview</Link>
          <Link href="/investments/brokerage" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors">Brokerage</Link>
          <Link href="/investments/retirement" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors">Retirement</Link>
          <Link href="/investments/education" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors">Education</Link>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-white text-lg font-semibold mb-2">Total Balance</h2>
            <p className="text-2xl font-bold text-green-400">$24,870.45</p>
            <p className="text-sm text-gray-400">+1.27% ($312.78 today)</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-white text-lg font-semibold mb-2">Retirement Accounts</h2>
            <p className="text-gray-300">401k: $7,670.45</p>
            <p className="text-gray-300">IRA: $4,500.00</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-white text-lg font-semibold mb-2">Brokerage Holdings</h2>
            <p className="text-gray-300">VTI: $10,400</p>
            <p className="text-gray-300">AAPL: $6,800</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-white text-lg font-semibold mb-2">Performance vs Index</h2>
            <p className="text-sm text-gray-400 mb-1">You are outperforming the S&P 500 by +1.5% YTD.</p>
            <p className="text-sm text-gray-400">vs NASDAQ: +0.3%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-white text-lg font-semibold mb-2">Suggested Insights</h2>
            <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
              <li>Consider rebalancing your large cap exposure</li>
              <li>Your idle cash of $2,300 could be earning 4.8%</li>
              <li>Watchlist: Add SCHD, AMZN for growth potential</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <h2 className="text-white text-lg font-semibold mb-2">📊 AI + Benchmark Analytics (Pro Tier)</h2>
          <p className="text-sm text-gray-400">
            Future insight cards will show how your investment strategy compares to top-performing peers by age group,
            suggest optimal allocation shifts, and rate your portfolio health in real time.
          </p>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default InvestmentsOverview;
