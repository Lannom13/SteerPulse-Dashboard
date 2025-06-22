// src/pages/Recurring.jsx
import { useEffect, useState } from 'react';
import AnimatedPage from '../components/AnimatedPage';

export default function Recurring() {
  const [recurrings, setRecurrings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecurringMerchants = async () => {
      try {
        const res = await fetch('https://lpczocldblkfrhnlpqgf.functions.supabase.co/get_recurring_merchants');
        const data = await res.json();
        setRecurrings(data.recurrings || []);
      } catch (err) {
        console.error('Failed to load recurring data:', err);
        setRecurrings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecurringMerchants();
  }, []);

  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">📆 Recurring Transactions</h1>

        {loading ? (
          <p className="text-sm text-gray-400">Loading recurring data...</p>
        ) : recurrings.length === 0 ? (
          <p className="text-sm text-gray-400">No recurring transactions found yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recurrings.map((item, idx) => (
              <div key={idx} className="bg-gray-800 rounded-xl p-4 shadow">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">{item.merchant}</h2>
                  <span className="text-sm text-gray-400">{item.category}</span>
                </div>
                <p className="text-sm text-gray-300 mb-1">
                  <strong>Average Amount:</strong> ${item.average.toFixed(2)}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  <strong>Frequency:</strong> {item.frequency}
                </p>
                <p className="text-sm text-gray-300">
                  <strong>Next Estimated:</strong> {item.nextDate}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AnimatedPage>
  );
}
