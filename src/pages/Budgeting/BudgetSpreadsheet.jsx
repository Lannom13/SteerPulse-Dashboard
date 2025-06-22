// ✅ Complete grouped Budget Spreadsheet with structured presets, group rows, add modal injection, delete icons, drag locks, and style polish.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import AnimatedPage from '../../components/AnimatedPage';
import BudgetRow from '../../components/BudgetRow';
import InsightsPanel from '../../components/InsightsPanel';
import { supabase } from '../../utils/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@supabase/auth-helpers-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddRowModal from '../../components/AddRowModal';

const PRESET_STRUCTURE = [
  { group: 'Income', category: 'Salary', planned: 5000 },
  { group: 'Food', category: 'Groceries', planned: 300 },
  { group: 'Food', category: 'Fast Food', planned: 150 },
  { group: 'Housing', category: 'Rent', planned: 1200 },
  { group: 'Housing', category: 'Utilities', planned: 250 },
  { group: 'Lifestyle', category: 'Entertainment', planned: 200 },
  { group: 'Lifestyle', category: 'Streaming', planned: 50 },
  { group: 'Savings', category: 'Emergency Fund', planned: 300 },
  { group: 'Debt', category: 'Credit Card', planned: 200 },
];

export default function BudgetSpreadsheet() {
  const user = useUser();
  const [rows, setRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('2025-06');
  const [showModal, setShowModal] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedCategoryForInsights, setSelectedCategoryForInsights] = useState(null);
  const [lastUsedGroup, setLastUsedGroup] = useState('');

  useEffect(() => {
    if (!user) return;

    const fetchBudget = async () => {
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('month', selectedMonth)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching budget:', error);
        return;
      }

      if (data.length === 0) {
        const seeded = PRESET_STRUCTURE.map((item, index) => ({
          id: uuidv4(),
          user_id: user.id,
          group: item.group,
          category: item.category,
          planned: item.planned,
          actual: 0,
          notes: '',
          month: selectedMonth,
          sort_order: index,
        }));

        const { data: inserted, error: insertError } = await supabase.from('budgets').insert(seeded).select();
        if (insertError) console.error('Error inserting preset:', insertError);
        setRows(inserted || []);
      } else {
        setRows(data.sort((a, b) => a.sort_order - b.sort_order));
      }
    };

    fetchBudget();
  }, [user, selectedMonth]);

  const handleChange = (id, key, value) => {
    setRows(prev => prev.map(row => row.id === id ? { ...row, [key]: value } : row));
    setHasChanges(true);
  };

  const handleDelete = (id) => {
    setRows(prev => prev.filter(row => row.id !== id));
    setHasChanges(true);
  };

  const handleSave = async () => {
    const sorted = rows.map((row, index) => ({ ...row, sort_order: index }));
    const { error } = await supabase.from('budgets').upsert(sorted);
    if (error) console.error('Save failed:', error);
    else setHasChanges(false);
  };

  const handleAddRow = (newRow) => {
    const row = {
      id: uuidv4(),
      user_id: user.id,
      month: selectedMonth,
      actual: 0,
      notes: '',
      sort_order: rows.length,
      ...newRow,
    };

    setRows(prev => {
      const index = prev.findLastIndex(r => r.group === row.group);
      const insertAt = index >= 0 ? index + 1 : prev.length;
      const updated = [...prev];
      updated.splice(insertAt, 0, row);
      return updated;
    });
    setLastUsedGroup(newRow.group);
    setHasChanges(true);
  };

  const groupedRows = rows.reduce((acc, row) => {
    if (!acc[row.group]) acc[row.group] = [];
    acc[row.group].push(row);
    return acc;
  }, {});

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updated = [...rows];
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setRows(updated);
    setHasChanges(true);
  };

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
            <button onClick={() => setShowModal(true)} className="bg-sky-600 hover:bg-sky-700 px-3 py-1 rounded">Add Row</button>
            <button onClick={handleSave} disabled={!hasChanges} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded disabled:opacity-40">Save</button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="budget-table">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {Object.entries(groupedRows).map(([groupName, entries]) => (
                  <table key={groupName} className="w-full mb-6">
                    <thead>
                      <tr className="bg-gray-800 text-left text-white text-sm uppercase">
                        <th colSpan="8" className="px-4 py-2 font-bold">{groupName}</th>
                      </tr>
                      <tr className="bg-gray-700 text-gray-300 text-xs">
                        <th className="px-4 py-2">Category</th>
                        <th className="px-4 py-2">Planned</th>
                        <th className="px-4 py-2">Actual</th>
                        <th className="px-4 py-2">Difference</th>
                        <th className="px-4 py-2">Usage %</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Notes</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {entries.map((row, index) => (
                        <Draggable draggableId={row.id} index={rows.findIndex(r => r.id === row.id)} key={row.id}>
                          {(provided) => (
                            <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <BudgetRow
                                row={row}
                                isVisible
                                showSummary={false}
                                onClick={() => setSelectedCategoryForInsights(row)}
                                onFieldChange={handleChange}
                                onDelete={() => handleDelete(row.id)}
                              />
                              <td className="px-4 py-2 text-right">
                                <button onClick={() => handleDelete(row.id)} className="text-red-400 hover:text-red-600">
                                  <Trash2 size={16} />
                                </button>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                    </tbody>
                  </table>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {selectedCategoryForInsights && (
          <InsightsPanel
            category={selectedCategoryForInsights}
            onClose={() => setSelectedCategoryForInsights(null)}
          />
        )}

        {showModal && (
          <AddRowModal
            onClose={() => setShowModal(false)}
            onAdd={handleAddRow}
            defaultGroup={lastUsedGroup}
          />
        )}
      </div>
    </AnimatedPage>
  );
}
