// src/pages/budgeting/BudgetSpreadsheet.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import BudgetRow from '../../components/BudgetRow';
import InsightsPanel from '../../components/InsightsPanel';

export default function BudgetSpreadsheet() {
  const [selectedMonth, setSelectedMonth] = useState('June 2025');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [selectedCategoryForInsights, setSelectedCategoryForInsights] = useState(null);

  const dummyData = [
    { category: 'Income - Austin', planned: 3000, actual: 3000, notes: 'Salary', group: 'Income' },
    { category: 'Income - Megan', planned: 2000, actual: 2000, notes: 'Part-time', group: 'Income' },
    { category: 'Groceries', planned: 500, actual: 420, notes: 'Meal prep', group: 'Food' },
    { category: 'Fast Food', planned: 150, actual: 180, notes: 'Dining out', group: 'Food' },
    { category: 'Mortgage', planned: 1200, actual: 1200, notes: 'Home loan', group: 'Housing' },
    { category: 'Utilities', planned: 250, actual: 230, notes: 'All utilities', group: 'Housing' },
    { category: 'Entertainment', planned: 200, actual: 260, notes: 'Concert', group: 'Lifestyle' },
    { category: 'Subscriptions', planned: 100, actual: 110, notes: 'Annual renewals', group: 'Lifestyle' }
  ];

  const groups = [...new Set(dummyData.map(row => row.group))];
  const totals = dummyData.reduce((acc, row) => {
    acc.planned += row.planned;
    acc.actual += row.actual;
    acc.difference += row.planned - row.actual;
    return acc;
  }, { planned: 0, actual: 0, difference: 0 });

  return (
    <AnimatedPage>
      <div className="text-white">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">📋 Budget Spreadsheet</h1>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase border-b border-gray-600">
                <tr>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Planned</th>
                  <th className="px-4 py-2">Actual</th>
                  <th className="px-4 py-2">Difference</th>
                  <th className="px-4 py-2 w-32">Usage</th>
                  <th className="px-4 py-2 w-28">Status</th>
                  <th className="px-4 py-2 text-center w-40">% of Total Budget</th>
                </tr>
              </thead>
              <tbody>
                {groups.map(group => {
                  const groupRows = dummyData.filter(row => row.group === group);
                  const groupPlanned = groupRows.reduce((sum, row) => sum + row.planned, 0);
                  const groupActual = groupRows.reduce((sum, row) => sum + row.actual, 0);

                  return [
                    <BudgetRow
                      key={`summary-${group}`}
                      row={{ category: group, planned: groupPlanned, actual: groupActual, percentOfTotal: (groupActual / totals.actual) * 100 }}
                      showSummary={true}
                      isVisible={false}
                      onClick={() => setExpandedGroup(group === expandedGroup ? null : group)}
                    />,
                    ...(expandedGroup === group ? groupRows.map((row, idx) => (
                      <BudgetRow
                        key={`${group}-detail-${idx}`}
                        row={{ ...row, percentOfTotal: (row.actual / totals.actual) * 100 }}
                        showSummary={false}
                        isVisible={true}
                      />
                    )) : [])
                  ];
                })}
                <tr className="border-t border-gray-600 bg-gray-900">
                  <td className="px-4 py-2 font-bold">Totals</td>
                  <td className="px-4 py-2 font-bold">${totals.planned}</td>
                  <td className="px-4 py-2 font-bold">${totals.actual}</td>
                  <td className={`px-4 py-2 font-bold ${totals.difference >= 0 ? 'text-green-400' : 'text-red-400'}`}>${totals.difference}</td>
                  <td colSpan={2}></td>
                  <td className="px-4 py-2 font-bold text-sky-400 text-center">% of Total Budget: 100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {selectedCategoryForInsights && (
          <InsightsPanel category={selectedCategoryForInsights} onClose={() => setSelectedCategoryForInsights(null)} />
        )}
      </div>
    </AnimatedPage>
  );
}
