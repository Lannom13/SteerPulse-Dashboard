// File: /src/components/CashFlowChart.tsx
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

const data = [
  { month: 'Jan', cashflow: 1200 },
  { month: 'Feb', cashflow: 900 },
  { month: 'Mar', cashflow: 1450 },
  { month: 'Apr', cashflow: 1000 },
  { month: 'May', cashflow: 1700 },
  { month: 'Jun', cashflow: 1100 }
];

export default function CashFlowChart() {
  return (
    <div className="w-full h-64 bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-white text-lg font-semibold mb-2">💸 Cash Flow Trend</h2>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid stroke="#2d2d2d" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }} />
          <Line type="monotone" dataKey="cashflow" stroke="#0EA5E9" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
