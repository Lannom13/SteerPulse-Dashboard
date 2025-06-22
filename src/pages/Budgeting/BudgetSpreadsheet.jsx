import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import BudgetRow from '../../components/BudgetRow';
import InsightsPanel from '../../components/InsightsPanel';
import { supabase } from '../../utils/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@supabase/auth-helpers-react';

const monthOptions = [
  '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06',
  '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'
];

export default function BudgetSpreadsheet() {
  const user = useUser();
  const [selectedMonth, setSelectedMonth] = useState('2025-06');
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [selectedCategoryForInsights, setSelectedCategoryForInsights] = useState(null);
  const [rows, setRows] = useState([]);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetchBudget = async () => {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('month', selectedMonth)
        .eq('user_id', user.id);
      if (!error) {
        setRows(data);
      } else {
        console.error('Error fetching budget:', error);
        setRows([]);
      }
    };
    fetchBudget();
  }, [selectedMonth, user]);

  const handleAddRow = async () => {
    if (!user) return;
    const newRow = {
      id: uuidv4(),
      user_id: user.id,
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
      setHasChanges(true);
    }
  };

  const handleRemoveRow = async () => {
    if (!selectedRowId) return;

    const { error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', selectedRowId);

    if (error) {
      console.error('Failed to delete row:', error);
    } else {
      const updatedRows = rows.filter(row => row.id !== selectedRowId);
      setHistory([...history, rows]);
      setRows(updatedRows);
      setFuture([]);
      setSelectedRowId(null);
      setHasChanges(true);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setFuture([rows, ...future]);
      setRows(prev);
      setHistory(history.slice(0, -1));
      setHasChanges(true);
    }
  };

  const handleRedo = () => {
    if (future.length > 0) {
      const next = future[0];
      setHistory([...history, rows]);
      setRows(next);
      setFuture(future.slice(1));
      setHasChanges(true);
    }
  };

  const handleFieldChange = (id, field, value) => {
    setRows(prevRows => prevRows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
    setHasChanges(true);
  };

  const handleSaveChanges = async () => {
    for (const row of rows) {
      const { error } = await supabase
        .from('budgets')
        .update({
          category: row.category,
          planned: row.planned,
          actual: row.actual,
          notes: row.notes,
          group: row.group
        })
        .eq('id', row.id);

      if (error) {
        console.error(`Failed to update row with id ${row.id}:`, error);
      }
    }
    setHasChanges(false);
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
            <button onClick={handleRemoveRow} disabled={!selectedRowId} className="text-white px-3 py-1 hover:bg-sky-700 rounded transition disabled:opacity-50">Remove</button>
            <button onClick={handleUndo} className="text-white px-2 py-1 hover:bg-sky-700 rounded transition">Undo</button>
            <button onClick={handleRedo} className="text-white px-2 py-1 hover:bg-sky-700 rounded transition">Redo</button>
            {hasChanges && (
              <button onClick={handleSaveChanges} className="text-white px-3 py-1 bg-green-600 hover:bg-green-700 rounded transition">Save</button>
            )}
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
                            isEditable={true}
                            isSelected={row.id === selectedRowId}
                            onClickCategory={(category) => setSelectedCategoryForInsights(category)}
                            onFieldChange={handleFieldChange}
                            onRowClick={() => setSelectedRowId(row.id)}
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
