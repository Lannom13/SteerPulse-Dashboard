// File: /pages/budgeting/charts.tsx
import AnimatedPage from '@/components/AnimatedPage';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from 'recharts';
import { NextPage } from 'next';

const dummyData = [
  { category: 'Groceries', planned: 500, actual: 420 },
  { category: 'Fast Food', planned: 150, actual: 180 },
  { category: 'Mortgage', planned: 1200, actual: 1200 },
  { category: 'Utilities', planned: 250, actual: 230 },
  { category: 'Entertainment', planned: 200, actual: 260 },
  { category: 'Subscriptions', planned: 100, actual: 110 }
];

const COLORS = ['#0284c7', '#06b6d4', '#9333ea', '#facc15', '#f97316', '#ef4444'];

const Charts: NextPage = () => {
  return (
    <AnimatedPage>
      <div className="text-white">
        <h1 className="text-3xl font-bold mb-6">📈 Budget Charts</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pie Chart: Actual Spending Breakdown */}
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Actual Spending by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={dummyData} dataKey="actual" nameKey="category" outerRadius={100} label>
                  {dummyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart: Planned vs Actual */}
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-2">Planned vs Actual</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dummyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" tick={{ fill: 'white', fontSize: 12 }} />
                <YAxis tick={{ fill: 'white', fontSize: 12 }} />
                <Tooltip />
                <Legend wrapperStyle={{ color: 'white' }} />
                <Bar dataKey="planned" fill="#3b82f6" name="Planned" />
                <Bar dataKey="actual" fill="#ef4444" name="Actual" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Charts;
