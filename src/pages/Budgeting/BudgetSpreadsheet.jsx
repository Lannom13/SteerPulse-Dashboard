import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedPage from '../../components/AnimatedPage';
import BudgetRow from '../../components/BudgetRow';
import InsightsPanel from '../../components/InsightsPanel';
import { supabase } from '../../utils/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@supabase/auth-helpers-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AddRowModal from '../../components/AddRowModal';

const monthOptions = [
  '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06',
  '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'
];

const defaultTemplate = [
  { category: 'Rent', group: 'Housing', planned: 1200 },
  { category: 'Utilities', group: 'Housing', planned: 250 },
  { category: 'Internet', group: 'Housing', planned: 100 },
  { category: 'Car Payment', group: 'Transportation', planned: 400 },
  { category: 'Gas', group: 'Transportation', planned: 150 },
  { category: 'Health Insurance', group: 'Insurance', planned: 300 },
  { category: 'Daycare', group: 'Childcare', planned: 400 },
  { category: 'Charity', group: 'Donations', planned: 100 },
  { category: 'Groceries', group: 'Food', planned: 500 },
  { category: 'Fast Food', group: 'Food', planned: 200 },
  { category: 'Entertainment', group: 'Entertainment', planned: 200 },
  { category: 'Utilities', group: 'Utilities', planned: 100 },
  { category: 'Miscellaneous', group: 'Miscellaneous', planned: 150 },
  { category: 'Credit Card', group: 'Debt', planned: 300 },
  { category: 'Emergency Fund', group: 'Savings', planned: 300 },
  { category: 'Investments', group: 'Investments', planned: 250 }
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
  const [sortOption, setSortOption] = useState('category');
  const [showModal, setShowModal] = useState(false);

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
        const seeded = defaultTemplate.map((item) => ({
          id: uuidv4(),
          user_id: user.id,
          category: item.category,
          planned: item.planned,
          actual: 0,
          group: item.group,
          month: selectedMonth,
          notes: ''
        }));

        const { data: insertedData, error: insertError } = await supabase
          .from('budgets')
          .insert(seeded)
          .select();

        if (insertError) {
          console.error('Error seeding default data:', insertError);
        } else {
          setRows(insertedData);
        }
      } else {
        setRows(data);
      }
    };

    fetchBudget();
  }, [selectedMonth, user]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newRows = Array.from(rows);
    const [movedRow] = newRows.splice(result.source.index, 1);
    newRows.splice(result.destination.index, 0, movedRow);
    setRows(newRows);
    setHasChanges(true);
  };

  const handleSave = async () => {
    const updates = rows.map(row => ({ id: row.id, ...row }));
    const { error } = await supabase.from('budgets').upsert(updates);
    if (error) console.error('Save error:', error);
    else setHasChanges(false);
  };

  const handleChange = (id, key, value) => {
    setRows(prev => prev.map(row => row.id === id ? { ...row, [key]: value } : row));
    setHasChanges(true);
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (sortOption === 'category') return a.category.localeCompare(b.category);
    if (sortOption === 'group') return a.group.localeCompare(b.group);
    if (sortOption === 'amount') return b.actual - a.actual;
    return 0;
  });

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
            <label htmlFor="sortOption" className="text-gray-300 text-sm mr-2">Sort:</label>
            <select
              id="sortOption"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-gray-800 text-white px-3 py-1 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="category">Category (A-Z)</option>
              <option value="group">Group (A-Z)</option>
              <option value="amount">Actual Amount (High → Low)</option>
            </select>
            <button onClick={() => setShowModal(true)} className="bg-sky-600 hover:bg-sky-700 px-3 py-1 rounded">Add New Row</button>
            <button onClick={handleSave} disabled={!hasChanges} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded disabled:opacity-40">Save</button>
          </div>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="budget-rows">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {sortedRows.map((row, index) => (
                  row && row.id ? (
                    <Draggable key={row.id} draggableId={row.id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <BudgetRow
                            row={row}
                            isVisible
                            showSummary={false}
                            onClick={() => setSelectedCategoryForInsights(row)}
                            onFieldChange={handleChange}
                          />
                        </div>
                      )}
                    </Draggable>
                  ) : null
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
            onAdd={(row) => {
              if (!row || !row.category || !row.group || typeof row.planned !== 'number') {
                console.error("❌ Invalid row submitted:", row);
                alert("Invalid data. Please fill out all fields.");
                return;
              }

              const newRow = {
                id: uuidv4(),
                ...row,
                user_id: user?.id,
                month: selectedMonth,
                actual: 0,
                notes: ''
              };

              console.log("✅ Adding new row:", newRow);

              setRows((prev) => [...prev, newRow]);
              setHasChanges(true);
            }}
          />
        )}
      </div>
    </AnimatedPage>
  );
}
