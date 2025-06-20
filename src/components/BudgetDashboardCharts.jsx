// BudgetDashboardCharts.jsx
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell, LineChart, Line, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#38bdf8', '#60a5fa', '#a78bfa', '#f472b6', '#facc15'];

export default function BudgetDashboardCharts({ data }) {
  const summary = data.map(row => ({
    name: row.category,
    Planned: row.planned,
    Actual: row.actual,
  }));

  const monthlyTrend = [
    { month: 'Jan', spent: 1800 },
    { month: 'Feb', spent: 1950 },
    { month: 'Mar', spent: 2025 },
    { month: 'Apr', spent: 1870 },
    { month: 'May', spent: 2100 },
    { month: 'Jun', spent: 2000 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-gray-800 rounded-xl p-4 shadow h-64">
        <h2 className="text-white text-sm font-semibold mb-2">Planned vs Actual</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={summary}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="Planned" fill="#38bdf8" />
            <Bar dataKey="Actual" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 shadow h-64">
        <h2 className="text-white text-sm font-semibold mb-2">Spending Breakdown</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={summary} dataKey="Actual" nameKey="name" outerRadius={80}>
              {summary.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 shadow h-64 md:col-span-2">
        <h2 className="text-white text-sm font-semibold mb-2">Monthly Trend</h2>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyTrend}>
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Line type="monotone" dataKey="spent" stroke="#a78bfa" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
