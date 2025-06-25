// File: /src/components/InsightsPanel.tsx
import { useEffect, useState } from 'react';
import { generateCategoryInsights } from '../utils/generateCategoryInsights';

interface MerchantTransaction {
  date: string;
  amount: number;
}

interface Merchant {
  merchant: string;
  category: string;
  average: number;
  percent: number;
  nextDate: string;
  transactions: MerchantTransaction[];
}

interface InsightsPanelProps {
  category: any;
  onClose: () => void;
}

export default function InsightsPanel({ category, onClose }: InsightsPanelProps) {
  const insights = generateCategoryInsights(category);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const res = await fetch(
          'https://lpczocldblkfrhnlpqgf.functions.supabase.co/get_transactions_by_category',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category: category.category })
          }
        );

        const data = await res.json();
        setMerchants(data.merchants || []);
      } catch (err) {
        console.error('❌ Error fetching merchants for category:', err);
        setMerchants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMerchants();
  }, [category]);

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-gray-900 shadow-lg border-l border-gray-700 z-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">🔍 Insights: {category.category}</h2>
        <button className="text-gray-400 hover:text-white" onClick={onClose}>
          ✕
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-white mb-2">Smart Tips</h3>
        <ul className="list-disc text-sm pl-5 space-y-1 text-gray-300">
          {insights.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Loading merchant insights...</p>
      ) : merchants.length > 0 ? (
        <ul className="space-y-6">
          {merchants.map((m, idx) => (
            <li key={idx} className="bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-white font-medium">{m.merchant}</p>
                  <p className="text-sm text-gray-400">
                    ${m.average.toFixed(2)} • {m.percent}%
                  </p>
                </div>
                <div className="w-1/3 h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-400 h-full"
                    style={{ width: `${m.percent}%` }}
                  ></div>
                </div>
              </div>
              <ul className="ml-2 mt-2 text-sm text-gray-300">
                {m.transactions.map((t, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{t.date}</span>
                    <span>${t.amount.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-400">
          No recent merchant activity found for this category.
        </p>
      )}
    </div>
  );
}
