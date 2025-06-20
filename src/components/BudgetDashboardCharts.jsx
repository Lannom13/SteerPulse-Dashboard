// BudgetDashboardCharts.jsx
import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell,
  LineChart, Line, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const COLORS = ['#38bdf8', '#60a5fa', '#a78bfa', '#f472b6', '#facc15'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-xs rounded shadow px-3 py-2 border border-sky-500">
        {payload.map((item, idx) => (
          <div key={idx} className="mb-1">
            <span className="font-semibold text-sky-400">{item.name}:</span> ${item.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function BudgetDashboardCharts({ data }) {
  const [viewMode, setViewMode] = useState('month');
  const [showPriorYear, setShowPriorYear] = useState(false);

  const summary = data.map(row => ({
    name: row.category,
    Planned: viewMode === 'month' ? row.planned : row.planned * 6,
    Actual: viewMode === 'month' ? row.actual : row.actual * 6,
  }));

  const monthlyTrend = [
    { month: 'Jan', planned: 1800, actual: 1750, prior: 1600 },
    { month: 'Feb', planned: 1900, actual: 1850, prior: 1700 },
    { month: 'Mar', planned: 2000, actual: 2025, prior: 1800 },
    { month: 'Apr', planned: 1950, actual: 1870, prior: 1750 },
    { month: 'May', planned: 2100, actual: 2100, prior: 1900 },
    { month: 'Jun', planned: 2050, actual: 2000, prior: 1850 },
  ];

  return (
    <div>
      {/* Toggle View Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-1 rounded-md text-sm ${viewMode === 'month' ? 'bg-sky-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            This Month
          </button>
          <button
            onClick={() => setViewMode('ytd')}
            className={`px-3 py-1 rounded-md text-sm ${viewMode === 'ytd' ? 'bg-sky-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
          >
            Year to Date
          </button>
        </div>
        <div className="ml-auto">
          <label className="text-sm text-gray-300 mr-2">Show Prior Year</label>
          <input type="checkbox" checked={showPriorYear} onChange={() => setShowPriorYear(!showPriorYear)} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-4 shadow h-72">
          <h2 className="text-white text-sm font-semibold mb-2">Planned vs Actual</h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={summary} barCategoryGap={20}>
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Legend />
              <Bar dataKey="Planned" fill="#38bdf8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Actual" fill="#facc15" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 shadow h-72">
          <h2 className="text-white text-sm font-semibold mb-2">Spending Breakdown</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={summary}
                dataKey="Actual"
                nameKey="name"
                outerRadius={90}
                innerRadius={40}
                paddingAngle={2}
              >
                {summary.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 shadow h-80 md:col-span-2">
          <h2 className="text-white text-sm font-semibold mb-2">Monthly Trend</h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="planned" stroke="#38bdf8" strokeWidth={2} name="Planned" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="actual" stroke="#facc15" strokeWidth={2} name="Actual" dot={{ r: 4 }} />
              {showPriorYear && <Line type="monotone" dataKey="prior" stroke="#a78bfa" strokeWidth={2} name="Prior Year" strokeDasharray="4 2" />}  
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
