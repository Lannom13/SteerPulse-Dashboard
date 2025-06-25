// File: src/components/NetWorthChart.tsx
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

interface Snapshot {
  date: string;
  value: number;
}

export default function NetWorthChart() {
  const [data, setData] = useState<Snapshot[]>([]);

  useEffect(() => {
    const fetchSnapshots = async () => {
      try {
        const res = await fetch(
          'https://lpczocldblkfrhnlpqgf.supabase.co/rest/v1/net_worth_snapshots?select=value,recorded_at&order=recorded_at.asc',
          {
            headers: {
              apikey: 'your-anon-key-here',
              Authorization: 'Bearer your-anon-key-here'
            }
          }
        );

        const json = await res.json();

        const formatted = json.map((snap: any) => ({
          date: new Date(snap.recorded_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          }),
          value: snap.value
        }));

        setData(formatted);
      } catch (err) {
        console.error('📉 Failed to load net worth history:', err);
      }
    };

    fetchSnapshots();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-white text-lg font-semibold mb-2">📈 Net Worth Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#2d2d2d" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis
            stroke="#ccc"
            tickFormatter={(val: number) => `$${(val / 1000).toFixed(0)}k`}
          />
          <Tooltip
            formatter={(val: number) => `$${val.toLocaleString()}`}
            contentStyle={{
              backgroundColor: '#1f2937',
              borderColor: '#374151'
            }}
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
