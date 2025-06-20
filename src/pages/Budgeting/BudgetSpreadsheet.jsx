// src/pages/budgeting/budgetspreadsheet.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import BudgetRow from '../../components/BudgetRow';
import GroupToggle from '../../components/GroupToggle';

export default function BudgetSpreadsheet() {
  const [selectedMonth, setSelectedMonth] = useState('June 2025');
  const [groupOpen, setGroupOpen] = useState({});

  const dummyData = [
    { category: 'Income - Austin', planned: 3000, actual: 3000, notes: 'Salary', group: 'Income' },
    { category: 'Income - Megan', planned: 2000, actual: 2000, notes: 'Part-time', group: 'Income' },
    { category: 'Income - Business', planned: 800, actual: 600, notes: 'Side gig', group: 'Income' },
    { category: 'Mortgage', planned: 1200, actual: 1200, notes: 'Home loan', group: 'Housing' },
    { category: 'Utilities', planned: 250, actual: 230, notes: 'All utilities', group: 'Housing' },
    { category: 'Electricity', planned: 75, actual: 65, notes: 'TVA', group: 'Utilities' },
    { category: 'Water', planned: 50, actual: 45, notes: 'City of XYZ', group: 'Utilities' },
    { category: 'Groceries', planned: 500, actual: 420, notes: 'Meal prep', group: 'Essentials' },
    { category: 'Entertainment', planned: 200, actual: 260, notes: 'Concert', group: 'Discretionary' },
    { category: 'Subscriptions', planned: 100, actual: 110, notes: 'Annual renewals', group: 'Discretionary' },
    { category: 'Transportation', planned: 300, actual: 280, notes: 'Gas & maintenance', group: 'Essentials' },
    { category: 'Health Care', planned: 150, actual: 170, notes: 'Dental visit', group: 'Essentials' },
    { category: 'Childcare', planned: 400, actual: 400, notes: 'Daycare', group: 'Essentials' },
    { category: 'Savings & Investing', planned: 500, actual: 450, notes: 'Brokerage + HSA', group: 'Savings' },
  ];

  const groups = [...new Set(dummyData.map(row => row.group))];

  const totals = dummyData.reduce(
    (acc, row) => {
      acc.planned += row.planned;
      acc.actual += row.actual;
      return acc;
    },
    { planned: 0, actual: 0 }
  );

  return (
    <AnimatedPage>
      <div className="text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">📋 Budget Spreadsheet</h1>
          <div className="text-sm flex gap-4 items-center">
            <label className="text-gray-400">View Month:</label>
            <select
              className="bg-gray-800 text-white px-3 py-1 rounded"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option>June 2025</option>
              <option>May 2025</option>
              <option>April 2025</option>
              <option>March 2025 (Archived)</option>
            </select>
          </div>
        </div>

        <nav className="mb-8 flex justify-start gap-4 border-b border-gray-700 pb-3">
          <Link to="/budgeting" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 px-2 pb-1 transition-colors">Dashboard</Link>
          <Link to="/budgeting/spreadsheet" className="text-sm text-white border-b-2 border-sky-500 px-2 pb-1">Spreadsheet</Link>
        </nav>

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase border-b border-gray-600">
                <tr>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Planned</th>
                  <th className="px-4 py-2">Actual</th>
                  <th className="px-4 py-2">Difference</th>
                  <th className="px-4 py-2">Usage %</th>
                  <th className="px-4 py-2">Trend</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {groups.map(group => {
                  const groupRows = dummyData.filter(row => row.group === group);
                  const groupPlanned = groupRows.reduce((sum, row) => sum + row.planned, 0);
                  const groupActual = groupRows.reduce((sum, row) => sum + row.actual, 0);
                  const groupPercent = (groupActual / groupPlanned) * 100;

                  return [
                    <GroupToggle key={`toggle-${group}`} label={group} isOpen={!!groupOpen[group]} onToggle={() => setGroupOpen(prev => ({ ...prev, [group]: !prev[group] }))} />,
                    <BudgetRow
                      key={`summary-${group}`}
                      row={{
                        category: group,
                        planned: groupPlanned,
                        actual: groupActual,
                        notes: '',
                        percentOfTotal: (groupActual / totals.actual) * 100
                      }}
                      showSummary={true}
                      isVisible={false}
                    />,
                    ...(groupOpen[group] ?
                      groupRows.map((row, idx) => (
                        <BudgetRow
                          key={`${group}-detail-${idx}`}
                          row={{
                            ...row,
                            percentOfTotal: (row.actual / totals.actual) * 100
                          }}
                          showSummary={false}
                          isVisible={true}
                        />
                      ))
                      : [])
                  ];
                })}
                <tr className="border-t border-gray-600 bg-gray-900">
                  <td className="px-4 py-2 font-bold">Totals</td>
                  <td className="px-4 py-2 font-bold">${totals.planned}</td>
                  <td className="px-4 py-2 font-bold">${totals.actual}</td>
                  <td className="px-4 py-2 font-bold text-sky-400" colSpan={5}>Review status & notes above</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
age>
  );
}
