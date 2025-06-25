// File: /pages/investments/brokerage.tsx
import AnimatedPage from '@/components/AnimatedPage';
import Link from 'next/link';
import { NextPage } from 'next';

const Brokerage: NextPage = () => {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">📊 Brokerage Accounts</h1>

        {/* Subtab Navigation */}
        <nav className="mb-6 flex justify-start gap-4 border-b border-gray-700 pb-3">
          <Link href="/investments/overview" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1">Overview</Link>
          <Link href="/investments/brokerage" className="text-sm text-white border-b-2 border-sky-500 px-2 pb-1">Brokerage</Link>
          <Link href="/investments/retirement" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1">Retirement</Link>
          <Link href="/investments/education" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1">Education</Link>
        </nav>

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-300">
            This page will eventually show synced brokerage holdings (e.g. Vanguard, Fidelity, Robinhood), asset allocations, and performance breakdowns. You can pull this from Plaid or let users manually input accounts.
          </p>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Brokerage;
