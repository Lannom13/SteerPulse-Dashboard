import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

const data = [
  { date: 'Jan', value: 112000 },
  { date: 'Feb', value: 115500 },
  { date: 'Mar', value: 118200 },
  { date: 'Apr', value: 120400 },
  { date: 'May', value: 126300 },
  { date: 'Jun', value: 128450 }
]

export default function NetWorthChart() {
  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-white text-lg font-semibold mb-2">📈 Net Worth Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid stroke="#2d2d2d" strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#ccc" />
          <YAxis stroke="#ccc" tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`} />
          <Tooltip
            formatter={(val) => `$${val.toLocaleString()}`}
            contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151' }}
          />
          <Line type="monotone" dataKey="value" stroke="#0EA5E9" strokeWidth={3} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
