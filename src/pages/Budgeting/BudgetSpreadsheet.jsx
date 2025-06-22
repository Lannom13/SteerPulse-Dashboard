import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import BudgetRow from '../../components/BudgetRow';
import InsightsPanel from '../../components/InsightsPanel';
import { supabase } from '../../utils/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const monthOptions = [
  '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06',
  '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'
];

export default function BudgetSpreadsheet() {
  const [selectedMonth, setSelectedMonth] = useState('2025-06');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [selectedCategoryForInsights, setSelectedCategoryForInsights] = useState(null);
  const [rows, setRows] = useState([]);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const userId = 'demo-user'; // Replace with auth context once added

  useEffect(() => {
    const fetchBudget = async () => {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('month', selectedMonth)
        .eq('user_id', userId);
      if (!error) {
        setRows(data);
      } else {
        console.error('Error fetching budget:', error);
        setRows([]);
      }
    };
    fetchBudget();
  }, [selectedMonth]);

  const handleAddRow = async () => {
    const newRow = {
      id: uuidv4(),
      user_id: userId,
      category: 'New Category',
      planned: 0,
      actual: 0,
      group: 'Custom',
      month: selectedMonth,
      notes: ''
    };

    const { data, error } = await supabase
      .from('budgets')
      .insert([newRow])
      .select();

    if (error) {
      console.error('Failed to insert row:', error);
    } else {
      setHistory([...history, rows]);
      setRows([...rows, ...data]);
      setFuture([]);
    }
  };

  const handleRemoveRow = async () => {
    if (rows.length === 0) return;
    const latestRow = rows[rows.length - 1];

    const { error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', latestRow.id);

    if (error) {
      console.error('Failed to delete row:', error);
    } else {
      setHistory([...history, rows]);
      setRows(rows.slice(0, -1));
      setFuture([]);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setFuture([rows, ...future]);
      setRows(prev);
      setHistory(history.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (future.length > 0) {
      const next = future[0];
      setHistory([...history, rows]);
      setRows(next);
      setFuture(future.slice(1));
    }
  };

  const groups = [...new Set(rows.map(row => row.group))];

  return (
    <AnimatedPage>
      <div className="text-white">
        <div className="flex justify-between mb-4 border-b border-gray-700 pb-2">
          <nav className="flex gap-4">
            <Link to="/budgeting" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 pb-1">Dashboard</Link>
            <Link to="/budgeting/spreadsheet" className="text-sm text-white border-b-2 border-sky-500 pb-1">Spreadsheet</Link>
            <Link to="/budgeting/charts" className="text-sm text-gray-300 hover:text-white border-b-2 border-transparent hover:border-sky-500 pb-1">Charts</Link>
          </nav>

          <div className="flex gap-3 text-sm items-center">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-gray-700 text-white px-2 py-1 rounded"
            >
              {monthOptions.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <button onClick={handleAddRow} className="text-white px-3 py-1 hover:bg-sky-700 rounded transition">Add</button>
            <button onClick={handleRemoveRow} className="text-white px-3 py-1 hover:bg-sky-700 rounded transition">Remove</button>
            <button onClick={handleUndo} className="text-white px-2 py-1 hover:bg-sky-700 rounded transition">Undo</button>
            <button onClick={handleRedo} className="text-white px-2 py-1 hover:bg-sky-700 rounded transition">Redo</button>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-400">
              <thead className="text-xs uppercase border-b border-gray-600">
                <tr>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Planned</th>
                  <th className="px-4 py-2">Actual</th>
                  <th className="px-4 py-2">Difference</th>
                  <th className="px-4 py-2">Usage %</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {groups.map(group => {
                  const groupRows = rows.filter(row => row.group === group);
                  const groupPlanned = groupRows.reduce((sum, row) => sum + row.planned, 0);
                  const groupActual = groupRows.reduce((sum, row) => sum + row.actual, 0);

                  return [
                    <BudgetRow
                      key={`summary-${group}`}
                      row={{ category: group, planned: groupPlanned, actual: groupActual }}
                      showSummary={true}
                      isVisible={false}
                      onClick={() => setExpandedGroup(group === expandedGroup ? null : group)}
                    />,
                    ...(expandedGroup === group
                      ? groupRows.map((row, idx) => (
                          <BudgetRow
                            key={`${group}-detail-${idx}`}
                            row={row}
                            showSummary={false}
                            isVisible={true}
                            onClickCategory={(category) => setSelectedCategoryForInsights(category)}
                          />
                        ))
                      : [])
                  ];
                })}
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
