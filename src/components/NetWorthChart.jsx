import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { useEffect, useState } from 'react';

export default function NetWorthChart() {
  const [liveNetWorth, setLiveNetWorth] = useState(null);

  useEffect(() => {
    const fetchNetWorth = async () => {
      try {
        const res = await fetch(
          'https://lpczocldblkfrhnlpqgf.functions.supabase.co/get_accounts'
        );
        const data = await res.json();
        const total = data.accounts?.reduce(
          (sum, acc) => sum + (acc.balances?.available || 0),
          0
        );
        setLiveNetWorth(total || null);
      } catch (err) {
        console.error('Net worth chart error:', err);
      }
    };

    fetchNetWorth();
  }, []);

  const simulated = [
    { date: 'Jan', value: 110000 },
    { date: 'Feb', value: 112000 },
    { date: 'Mar', value: 116500 },
    { date: 'Apr', value: 120200 },
    { date: 'May', value: 124000 },
    { date: 'Jun', value: liveNetWorth || 128450 } // 👈 Live value here
  ];

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-white text-lg font-semibold mb-2">📈 Net Worth Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={simulated}>
          <CartesianGrid stroke="#2d2d2d" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis
            stroke="#ccc"
            tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(val) => `$${val.toLocaleString()}`}
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0EA5E9"
            strokeWidth={3}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
